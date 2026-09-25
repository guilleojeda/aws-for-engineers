# AWS deployment

The CloudFormation template in `site.yaml` creates a private S3 bucket, CloudFront distribution, clean URL function, GitHub OIDC publishing role, and a preview URL. It is intended to run in `us-east-1`; the public domain later needs an ACM certificate from that region.

## Preview setup

Authenticate the AWS CLI to the intended AWS account. Check the identity before creating resources:

```sh
aws sts get-caller-identity
```

Check whether this account already has `https://token.actions.githubusercontent.com` as an IAM OIDC provider. If it does, pass its ARN as `ExistingGitHubOidcProviderArn`. The template creates the provider only when that parameter is omitted. Deploy the stack:

```sh
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name aws-for-engineers-site \
  --template-file infra/site.yaml \
  --capabilities CAPABILITY_NAMED_IAM
```

The template's default GitHub subject is scoped to this repository's immutable owner and repository IDs and the `main` branch. If the repository identity changes, verify the current GitHub OIDC subject before updating the role trust policy.

Read these stack outputs: `BucketName`, `DistributionId`, `PreviewUrl`, and `GitHubRoleArn`. Set GitHub repository variables with those values:

| GitHub variable | Stack output |
| --- | --- |
| `SITE_BUCKET_NAME` | `BucketName` |
| `SITE_DISTRIBUTION_ID` | `DistributionId` |
| `SITE_PREVIEW_URL` | `PreviewUrl` |
| `AWS_PUBLISH_ROLE_ARN` | `GitHubRoleArn` |

The [publish workflow](../.github/workflows/publish.yml) runs on each push to `main` and can also be started manually. It uses OIDC and stores no AWS access keys in GitHub. Its role can only list/write/delete this site's objects and invalidate this distribution.

## Public domain cutover

The live site and its DNS must remain in place until preview checks pass. Request an ACM certificate in `us-east-1` for `awsforengineers.com` and `www.awsforengineers.com`, validate it through the current GoDaddy DNS, then update the stack with `CertificateArn`. Copy the full existing DNS zone into Route 53, including mail and verification records, and create apex and `www` alias records to the distribution. Only after checking those records should the registrar nameservers change. The domain registration stays at GoDaddy. After propagation, verify the public site, ads, analytics, email, and publishing workflow before canceling Unicorn Platform.

Temporary access keys must not be committed or put into GitHub secrets; the publishing workflow uses the OIDC role.
