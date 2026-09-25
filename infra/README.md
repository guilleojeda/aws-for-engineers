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

## Public domain

The production stack is `aws-for-engineers-site` in account `719535286359`, region `us-east-1`. Its CloudFront distribution is `E2C3QM5K1YI7HT` (`dodm2697vnuos.cloudfront.net`). The ACM certificate covers `awsforengineers.com` and `www.awsforengineers.com`. CloudFront redirects `www` to the apex. The distribution uses pay-as-you-go pricing and has IPv6 enabled.

The Route 53 public hosted zone is `Z1028403UTGTEDDP2XLG`. Its four authoritative nameservers are:

```text
ns-826.awsdns-39.net
ns-381.awsdns-47.com
ns-2033.awsdns-62.co.uk
ns-1379.awsdns-44.org
```

The zone has apex and `www` A/AAAA aliases to CloudFront. It also preserves the five Google Workspace MX records, the apex SPF and Google verification TXT records, the SPF include TXT record, and GoDaddy's `_domainconnect` CNAME from the pre-cutover zone. ACM validation CNAMEs for both hostnames remain in Route 53 for certificate renewal. Do not replace the zone's Route 53 NS or SOA records with the old GoDaddy values.

When updating the existing CloudFormation stack, pass both the existing OIDC provider and the production certificate. The template defaults are for a new preview stack and would remove the public aliases if used for an update:

```sh
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name aws-for-engineers-site \
  --template-file infra/site.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    ExistingGitHubOidcProviderArn=arn:aws:iam::719535286359:oidc-provider/token.actions.githubusercontent.com \
    CertificateArn=arn:aws:acm:us-east-1:719535286359:certificate/8d3034a6-7775-4895-ad45-15919e4fbe22
```

The registration remains at GoDaddy. The original GoDaddy DNS zone has been left intact as a rollback option: restore `ns03.domaincontrol.com` and `ns04.domaincontrol.com` at the registrar while the old site is still active. Keep the old subscription until public-domain checks, ad and analytics requests, and publishing have been verified. DNS caches can continue using the previous nameservers after the registrar update.

Temporary access keys must not be committed or put into GitHub secrets; the publishing workflow uses the OIDC role.
