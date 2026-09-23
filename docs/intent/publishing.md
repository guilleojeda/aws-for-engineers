# Build, publish, and recover the site

The repository is the source of truth. Hugo builds `public/`; pull requests run the same local checks without AWS credentials. Each push to `main` saves that exact build, assumes a short-lived AWS role through GitHub OIDC, publishes it to the private S3 bucket, invalidates CloudFront, waits for completion, and checks both `/` and `/revision.json` over HTTPS.

The automatic publisher verifies that its commit is still `origin/main` before its first AWS request. It lists existing S3 keys, skips content-hashed assets already present, uploads missing hashed assets with immutable caching, then uploads other assets and pages with short revalidation caching. Independent files within each group upload concurrently; groups finish in that order. It removes obsolete non-asset keys but never deletes keys under `assets/`. Blog image filenames carry a SHA-256 content hash, so an existing key represents the same immutable bytes; replacing an image means using its new hash-based filename. Any upload, delete, invalidation, or served-revision failure fails the workflow. Publishing is not an atomic whole-site swap; after a partial publish failure, restore a successful build artifact or publish the current main revision before treating the site as healthy.

## Local checks

Install Hugo 0.166.0, Python 3.11 or newer, and Node.js 22. Then run the same combined build and validation command used in CI:

```sh
HUGO=/path/to/hugo scripts/check.sh
```

With the Hugo binary in `PATH`, use `scripts/check.sh`. The command clears stale generated files, runs `hugo --minify`, validates the generated site, runs the directory JavaScript tests with Node's built-in test runner, and runs the publishing and infrastructure tests with Python's standard library. It does not publish. To attach a revision marker to a built site for inspection:

```sh
python3 scripts/publish.py prepare --site-dir public --revision "$(git rev-parse HEAD)"
```

For resource and article formats and site behavior, see [site behavior and content conventions](site.md). Preview the current content and layout locally with `hugo server`; validate it with `scripts/check.sh`. Commit a content change on a branch, open a pull request against `main`, then merge after its checks pass. The push to `main` runs the production publisher automatically. An article body, front matter, or image edit follows the same path as a resource edit.

## GitHub publishing configuration

After the CloudFormation stack is ready, set these **repository variables** from its outputs and the selected distribution hostname:

| Variable | Value |
| --- | --- |
| `AWS_ROLE_ARN` | `PublisherRoleArn` stack output |
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET` | `SiteBucketName` stack output |
| `CLOUDFRONT_DISTRIBUTION_ID` | `DistributionId` stack output |
| `SITE_URL` | `https://` followed by `DistributionDomainName` |

Set them in the repository's **Settings → Secrets and variables → Actions → Variables** page. These values identify the AWS deployment; the role ARN is not a secret.

The IAM role trusts only the existing `token.actions.githubusercontent.com` provider and this repository's immutable subject on `main`: `repo:guilleojeda@18320860/aws-for-engineers@1382498072:ref:refs/heads/main`. Its permissions cover S3 site-object listing, upload, deletion and failed-multipart cleanup, plus invalidation creation and status for this distribution. It cannot change the bucket policy, IAM, DNS, or CloudFormation.

Pull requests do not receive an AWS role. Main-branch publishing and manual artifact restores share one non-canceling production concurrency group. A PR uses a run-specific concurrency key and cannot replace a pending production publish.

## Restore a verified build

Open the `Publish site` workflow, choose **Run workflow** on `main`, and enter the run ID of a completed, successful `Publish site` run from a push to `main`. The workflow rejects any other event, branch, workflow, or unsuccessful run; it downloads the retained artifact associated with that run's commit, checks the artifact's `revision.json`, and uses the same serialized publisher. Restore bypasses only the current-main freshness check because returning to the explicitly selected older revision is its purpose. It still verifies the served revision after invalidation. The artifact remains available for 90 days.

A normal content rollback should be made as a Git revert and published through the usual pull-request and main workflow. Use artifact restore to recover a previously successful build when the current build needs immediate recovery. From a checkout with GitHub CLI authenticated, start the restore workflow with:

```sh
RUN_ID=123456789 # Replace with the successful main-branch publish run ID.
gh workflow run publish.yml --ref main -f source_run_id="$RUN_ID"
```

## Manually create or update the core stack

Infrastructure changes are applied manually; GitHub Actions never applies CloudFormation or changes DNS. Use AWS CLI v2 in `us-east-1`, confirm the intended AWS identity, and review the proposed change set before executing it. The current account-specific bucket name is `dondeaprendoaws-719535286359-us-east-1`; do not reuse that name for another account.

```sh
aws sts get-caller-identity --region us-east-1
CHANGE_SET_TYPE=CREATE # Use UPDATE when the stack already exists.
CHANGE_SET_NAME="dondeaprendoaws-$(date +%Y%m%d%H%M%S)"
aws cloudformation create-change-set \
  --stack-name dondeaprendoaws \
  --change-set-name "$CHANGE_SET_NAME" \
  --change-set-type "$CHANGE_SET_TYPE" \
  --template-body file://infra/cloudformation.yaml \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM \
  --parameters \
    ParameterKey=BucketName,ParameterValue=dondeaprendoaws-719535286359-us-east-1 \
    ParameterKey=GitHubOidcProviderArn,ParameterValue=arn:aws:iam::719535286359:oidc-provider/token.actions.githubusercontent.com \
    ParameterKey=GitHubOidcSubjectPrefix,ParameterValue=repo:guilleojeda@18320860/aws-for-engineers@1382498072
aws cloudformation wait change-set-create-complete \
  --stack-name dondeaprendoaws \
  --change-set-name "$CHANGE_SET_NAME" \
  --region us-east-1
aws cloudformation describe-change-set \
  --stack-name dondeaprendoaws \
  --change-set-name "$CHANGE_SET_NAME" \
  --region us-east-1
```

Set `CHANGE_SET_TYPE=CREATE` only if `dondeaprendoaws` does not yet exist; use `UPDATE` for an existing stack. Keep the same shell open so `CHANGE_SET_TYPE` and `CHANGE_SET_NAME` remain available. After reviewing the change set, execute it and wait for CloudFormation:

```sh
aws cloudformation execute-change-set \
  --stack-name dondeaprendoaws \
  --change-set-name "$CHANGE_SET_NAME" \
  --region us-east-1
if [ "$CHANGE_SET_TYPE" = CREATE ]; then
  STACK_WAITER=stack-create-complete
else
  STACK_WAITER=stack-update-complete
fi
aws cloudformation wait "$STACK_WAITER" \
  --stack-name dondeaprendoaws \
  --region us-east-1
```

Read `SiteBucketName`, `DistributionId`, `DistributionDomainName`, and `PublisherRoleArn` from the stack outputs and set the repository variables above. Keep the bucket and its publication when deleting or replacing the stack; CloudFormation is configured to retain the bucket. The current preview uses the CloudFront hostname and default certificate. A viewer-request CloudFront Function maps `/blog/` and `/blog/<slug>/` to their generated `index.html` objects in private S3. It redirects the observed slashless variants to trailing-slash URLs while preserving query strings; direct file and asset paths bypass this rewrite. The function is part of the manually managed stack and is not applied by GitHub Actions. A custom production domain and its certificate are separate later work.
