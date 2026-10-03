import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { articleOutline } from "./scripts/article-outline.mjs";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    widths: [320, 640, 960, 1280, "auto"],
    urlPath: "/assets/images/",
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "(max-width: 600px) calc(100vw - 32px), (max-width: 728px) calc(100vw - 48px), 680px",
      },
    },
  });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/ads.txt": "ads.txt" });
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  eleventyConfig.addGlobalData("buildYear", () => new Date().getUTCFullYear());
  eleventyConfig.addGlobalData("stylesheetVersion", () =>
    createHash("sha256").update(readFileSync("src/assets/site.css")).digest("hex").slice(0, 12),
  );

  eleventyConfig.addFilter("latest", (posts, count) =>
    [...posts]
      .sort((a, b) => String(b.data.datePublished).localeCompare(String(a.data.datePublished)))
      .slice(0, count),
  );
  eleventyConfig.addFilter("humanDate", (value) =>
    new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }),
  );
  eleventyConfig.addFilter("jsonScript", (value) =>
    JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e"),
  );
  eleventyConfig.addFilter("archivePageCount", (posts) => Math.ceil(posts.length / 15));
  eleventyConfig.addFilter("articleOutline", articleOutline);
  eleventyConfig.addFilter("sectionHref", (id) => `#${encodeURIComponent(id).replace(/'/g, "%27")}`);
  eleventyConfig.addFilter("postBySlug", (slug, posts) => {
    const post = posts.find((item) => item.url === `/blog/${slug}/`);
    if (!post) throw new Error(`Topic guide references an unknown article: ${slug}`);
    return post;
  });
  eleventyConfig.addFilter("topicArticleCount", (topic) =>
    topic.sections.reduce((count, section) => count + section.slugs.length, 0),
  );
  eleventyConfig.addFilter("topicsForArticle", (topics, url) =>
    topics.filter((topic) => topic.sections.some((section) =>
      section.slugs.some((slug) => url === `/blog/${slug}/`),
    )),
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: false,
  };
}
