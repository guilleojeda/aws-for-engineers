import unittest
from pathlib import Path
import re
import json
import shutil
import subprocess


TEMPLATE = Path(__file__).resolve().parents[1] / "infra" / "cloudformation.yaml"
WORKFLOW = Path(__file__).resolve().parents[1] / ".github" / "workflows" / "publish.yml"


class InfrastructureContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.template = TEMPLATE.read_text(encoding="utf-8")

    def test_bucket_is_private_and_retained(self) -> None:
        bucket = self.template.split("  SiteBucket:\n", 1)[1].split("\n  SiteOriginAccessControl:\n", 1)[0]
        self.assertIn("DeletionPolicy: Retain", bucket)
        self.assertIn("UpdateReplacePolicy: Retain", bucket)
        self.assertIn("BlockPublicAcls: true", bucket)
        self.assertIn("BlockPublicPolicy: true", bucket)
        self.assertIn("IgnorePublicAcls: true", bucket)
        self.assertIn("RestrictPublicBuckets: true", bucket)
        self.assertIn("ObjectOwnership: BucketOwnerEnforced", bucket)

    def test_distribution_uses_private_origin_root_and_preview_noindex(self) -> None:
        distribution = self.template.split("  SiteDistribution:\n", 1)[1].split("\n  SiteBucketPolicy:\n", 1)[0]
        self.assertIn("DefaultRootObject: index.html", distribution)
        self.assertIn("OriginAccessControlId: !GetAtt SiteOriginAccessControl.Id", distribution)
        self.assertIn("ViewerProtocolPolicy: redirect-to-https", distribution)
        self.assertIn("ResponseHeadersPolicyId: !Ref NoIndexResponseHeaders", distribution)
        self.assertIn("ResponsePagePath: /404.html", distribution)
        self.assertIn("ResponseCode: 404", distribution)
        default_behavior = distribution.split("DefaultCacheBehavior:\n", 1)[1].split("\n        CacheBehaviors:", 1)[0]
        self.assertIn("FunctionAssociations:", default_behavior)
        self.assertIn("EventType: viewer-request", default_behavior)
        self.assertIn("FunctionARN: !GetAtt BlogRoutingFunction.FunctionARN", default_behavior)
        self.assertIn("Value: noindex, nofollow, noarchive", self.template)

    def test_blog_function_is_inline_and_auto_published(self) -> None:
        function = self.template.split("  BlogRoutingFunction:\n", 1)[1].split("\n  SiteDistribution:\n", 1)[0]
        self.assertIn("Type: AWS::CloudFront::Function", function)
        self.assertIn("Runtime: cloudfront-js-2.0", function)
        self.assertIn("AutoPublish: true", function)
        self.assertIn("FunctionCode: |", function)

    def test_publisher_trust_and_permissions_are_scoped_to_repo_main_and_site(self) -> None:
        self.assertIn("GitHubOidcProviderArn:", self.template)
        self.assertIn("GitHubOidcSubjectPrefix:", self.template)
        self.assertIn("repo:guilleojeda@18320860/aws-for-engineers@1382498072", self.template)
        self.assertIn('"${GitHubOidcSubjectPrefix}:ref:refs/heads/main"', self.template)
        role = self.template.split("  GitHubPublisherRole:\n", 1)[1].split("\nOutputs:\n", 1)[0]
        self.assertIn("sts:AssumeRoleWithWebIdentity", role)
        self.assertIn("token.actions.githubusercontent.com:aud: sts.amazonaws.com", role)
        self.assertIn("s3:ListBucket", role)
        self.assertIn("s3:PutObject", role)
        self.assertIn("s3:DeleteObject", role)
        self.assertIn("s3:AbortMultipartUpload", role)
        self.assertIn("cloudfront:CreateInvalidation", role)
        self.assertIn("cloudfront:GetInvalidation", role)
        self.assertNotIn("iam:", role)
        self.assertNotIn("route53:", role)
        self.assertNotIn("cloudformation:", role)
        self.assertNotIn("s3:GetObject", role)


class WorkflowContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.workflow = WORKFLOW.read_text(encoding="utf-8")

    def test_actions_are_pinned_and_automatic_publish_is_main_only(self) -> None:
        actions = re.findall(r"^\s+uses: ([^\s]+)", self.workflow, re.MULTILINE)
        self.assertGreater(len(actions), 0)
        for action in actions:
            self.assertRegex(action, r"^[^@]+@[0-9a-f]{40}$", action)
        publish = self.workflow.split("  publish:\n", 1)[1].split("  reject-restore-from-other-branch:\n", 1)[0]
        self.assertIn("if: github.event_name == 'push' && github.ref == 'refs/heads/main'", publish)
        self.assertIn("id-token: write", publish)
        self.assertIn("scripts/publish.py publish", publish)

    def test_checks_have_no_aws_identity_and_restore_shares_production_lock(self) -> None:
        validate = self.workflow.split("  validate:\n", 1)[1].split("  publish:\n", 1)[0]
        self.assertNotIn("id-token: write", validate)
        self.assertNotIn("configure-aws-credentials", validate)
        self.assertIn("cancel-in-progress: false", self.workflow)
        self.assertIn("github.run_id", self.workflow.split("concurrency:\n", 1)[1].split("\n\njobs:", 1)[0])
        restore = self.workflow.split("  restore:\n", 1)[1]
        self.assertIn("event_name == 'workflow_dispatch'", restore)
        self.assertIn('.conclusion == "success"', restore)
        self.assertIn("actions/download-artifact", restore)
        self.assertIn("run-id: ${{ inputs.source_run_id }}", restore)
        self.assertIn("--restore", restore)


class BlogRoutingBehaviorTests(unittest.TestCase):
    @unittest.skipUnless(shutil.which("node"), "Node.js is required to execute the CloudFront Function locally")
    def test_cloudfront_function_redirects_and_rewrites_only_canonical_blog_paths(self) -> None:
        template = TEMPLATE.read_text(encoding="utf-8")
        lines = template.splitlines()
        marker = "      FunctionCode: |"
        start = lines.index(marker) + 1
        code_lines = []
        for line in lines[start:]:
            if line.strip() and not line.startswith("        "):
                break
            code_lines.append(line[8:] if line.startswith("        ") else "")
        function_code = "\n".join(code_lines).rstrip()
        self.assertIn("function handler(event)", function_code)

        harness = r"""
const assert = require('node:assert/strict');
const vm = require('node:vm');
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  const handler = vm.runInNewContext(JSON.parse(input).source + '\nhandler', {});
  function request(uri, rawQueryString, querystring) {
    return {uri, rawQueryString: () => rawQueryString, querystring};
  }
  function assertRewrite(uri, expectedUri, rawQueryString, querystring) {
    const originalQuery = JSON.parse(JSON.stringify(querystring));
    const current = request(uri, rawQueryString, querystring);
    const result = handler({request: current});
    assert.equal(result, current);
    assert.equal(result.uri, expectedUri);
    assert.deepEqual(result.querystring, originalQuery);
  }
  function assertRedirect(uri, location, rawQueryString) {
    const result = handler({request: request(uri, rawQueryString, {})});
    assert.equal(result.statusCode, 301);
    assert.equal(result.statusDescription, 'Moved Permanently');
    assert.equal(result.headers.location.value, location);
  }

  assertRewrite('/blog/', '/blog/index.html', 'probe=1', {probe: {value: '1'}});
  assertRewrite('/blog/como-reducir-costos-de-transferencia-intra-region-en-aws/', '/blog/como-reducir-costos-de-transferencia-intra-region-en-aws/index.html', '', {});
  assertRedirect('/blog', '/blog/', undefined);
  assertRedirect('/blog', '/blog/?probe=1', 'probe=1');
  assertRedirect('/blog/como-reducir-costos-de-transferencia-intra-region-en-aws', '/blog/como-reducir-costos-de-transferencia-intra-region-en-aws/?probe=1&tag=a%2Fb&tag=dos', 'probe=1&tag=a%2Fb&tag=dos');

  for (const uri of [
    '/',
    '/assets/site.css',
    '/blog/post.jpg',
    '/blog/post/index.html',
    '/blog/index.html',
    '/blog/post.json',
    '/blog/Not-Lower/',
    '/blog/año/',
    '/blog/with_under/',
    '/blog/nested/path/',
    '/blog//'
  ]) {
    assertRewrite(uri, uri, 'keep=this', {keep: {value: 'this'}});
  }
});
"""
        result = subprocess.run(
            [shutil.which("node"), "-e", harness],
            input=json.dumps({"source": function_code}),
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
