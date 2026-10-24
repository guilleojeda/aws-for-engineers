const approvedAffiliateCode = "212820_ppf2onij";

function fail(category, message) {
  throw new Error(`Course recommendation ${category}: ${message}`);
}

function courseDestination(product, key) {
  if (typeof product.url !== "string") {
    fail("URL", `product "${key}" must have a canonical URL`);
  }

  let destination;
  try {
    destination = new URL(product.url);
  } catch {
    fail("URL", `product "${key}" has a malformed destination`);
  }

  if (
    destination.protocol !== "https:" ||
    destination.origin !== "https://learn.cantrill.io" ||
    !/^\/p\/[^/]+$/.test(destination.pathname) ||
    destination.username ||
    destination.password ||
    destination.search ||
    destination.hash
  ) {
    fail("URL", `product "${key}" must point directly to an HTTPS learn.cantrill.io course page`);
  }

  return destination;
}

export function resolveCourseRecommendations(recommendations, catalog) {
  if (!Array.isArray(recommendations)) {
    fail("selection", "expected a list of selected courses");
  }
  if (catalog?.affiliateCode !== approvedAffiliateCode) {
    fail("affiliate code", `catalog must use ${approvedAffiliateCode}`);
  }
  if (!catalog.products || typeof catalog.products !== "object" || Array.isArray(catalog.products)) {
    fail("catalog", "products must be a keyed object");
  }

  const selected = new Set();
  return recommendations.map((recommendation) => {
    const key = recommendation?.course;
    if (typeof key !== "string" || !Object.hasOwn(catalog.products, key)) {
      fail("selection", `unknown course key "${String(key)}"`);
    }
    if (selected.has(key)) {
      fail("selection", `course "${key}" is selected more than once on this page`);
    }
    selected.add(key);

    if (typeof recommendation.reason !== "string" || !recommendation.reason.trim()) {
      fail("explanation", `course "${key}" needs a non-empty reason`);
    }

    const product = catalog.products[key];
    if (typeof product.name !== "string" || !product.name.trim()) {
      fail("catalog", `product "${key}" needs a name`);
    }
    if (product.instructor !== undefined && (typeof product.instructor !== "string" || !product.instructor.trim())) {
      fail("catalog", `product "${key}" has an invalid instructor`);
    }
    if (product.qualification !== undefined && (typeof product.qualification !== "string" || !product.qualification.trim())) {
      fail("catalog", `product "${key}" has an invalid qualification`);
    }

    const destination = courseDestination(product, key);
    destination.searchParams.set("affcode", catalog.affiliateCode);

    return {
      key,
      ...product,
      reason: recommendation.reason,
      pathTitle: recommendation.pathTitle,
      examUrl: recommendation.examUrl,
      examLinkText: recommendation.examLinkText,
      affiliateUrl: destination.href,
    };
  });
}
