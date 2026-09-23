import assert from "node:assert/strict";
import test from "node:test";

import {
  deriveDirectoryView,
  stateForCategory,
  stateForSearch,
  stateForShowAll,
} from "../assets/js/directory.mjs";

const resources = [
  { id: "cloud-security", title: "Cloud Security Ninja", description: "Recursos de seguridad en la nube.", category: "Seguridad" },
  { id: "lambda-course", title: "Tunea tus funciones Lambda", description: "Mejora tus funciones de AWS Lambda.", category: "Serverless" },
  { id: "gerardo", title: "Gerardo.dev", description: "Aprende sobre Lambdas y desarrollo cloud.", category: "Blog" },
  { id: "iot-lights", title: "Control Remoto Luces IoT", description: "Conecta un dispositivo IoT con AWS Lambda.", category: "Internet de las Cosas" },
  { id: "lambda-4", title: "Lambda en producción 4", description: "Buenas prácticas Lambda.", category: "Operaciones" },
  { id: "lambda-5", title: "Lambda en producción 5", description: "Buenas prácticas Lambda.", category: "Herramientas" },
  { id: "lambda-6", title: "Lambda en producción 6", description: "Buenas prácticas Lambda.", category: "Seguridad" },
  { id: "lambda-7", title: "Lambda en producción 7", description: "Buenas prácticas Lambda.", category: "Blog" },
  { id: "lambda-8", title: "Lambda en contenedores", description: "Una integración con Lambda.", category: "Contenedores" },
  ...Array.from({ length: 9 }, (_, index) => ({
    id: `serverless-${index + 1}`,
    title: `Recurso Serverless ${index + 1}`,
    description: "Arquitectura y servicios sin servidor.",
    category: "Serverless",
  })),
];

test("shows the first eight records initially and expands all on request", () => {
  const state = { query: "", category: "", expanded: false };
  const initial = deriveDirectoryView(resources, state);

  assert.equal(initial.total, resources.length);
  assert.equal(initial.visible.length, 8);
  assert.equal(initial.canShowAll, true);

  const expanded = deriveDirectoryView(resources, stateForShowAll(state));
  assert.equal(expanded.visible.length, resources.length);
  assert.equal(expanded.canShowAll, false);
});

test("search matches titles and descriptions without regard to case", () => {
  const state = stateForSearch("lAmBdA");
  const view = deriveDirectoryView(resources, state);
  const titles = view.visible.map((resource) => resource.title);

  assert.equal(state.category, "");
  assert.equal(view.total, 8);
  assert.ok(titles.includes("Tunea tus funciones Lambda"));
  assert.ok(titles.includes("Gerardo.dev"));
  assert.ok(titles.includes("Control Remoto Luces IoT"));
});

test("category and text search replace each other, and clearing a category reveals the full set", () => {
  const queryState = stateForSearch("Lambda");
  const serverlessState = stateForCategory(queryState, "Serverless");
  const serverless = deriveDirectoryView(resources, serverlessState);

  assert.equal(serverlessState.query, "");
  assert.equal(serverless.total, 10);
  assert.ok(serverless.visible.every((resource) => resource.category === "Serverless"));
  assert.ok(!serverless.visible.some((resource) => resource.title === "Gerardo.dev"));

  const allState = stateForCategory(serverlessState, "Serverless");
  const all = deriveDirectoryView(resources, allState);
  assert.equal(allState.expanded, true);
  assert.equal(all.visible.length, resources.length);

  const searchAgain = stateForSearch("Lambda");
  const matches = deriveDirectoryView(resources, searchAgain);
  assert.equal(searchAgain.category, "");
  assert.equal(matches.total, 8);
  assert.ok(matches.visible.some((resource) => resource.title === "Gerardo.dev"));
});

test("shows no matches and reveals the full set when search is cleared", () => {
  const noMatches = deriveDirectoryView(resources, stateForSearch("no such learning resource"));
  assert.equal(noMatches.isEmpty, true);
  assert.equal(noMatches.visible.length, 0);

  const cleared = deriveDirectoryView(resources, stateForSearch(""));
  assert.equal(cleared.visible.length, resources.length);
  assert.equal(cleared.canShowAll, false);
});
