export const INITIAL_VISIBLE_COUNT = 8;

function normalized(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function stateForSearch(query) {
  const value = String(query ?? "");
  return {
    query: value,
    category: "",
    expanded: value.trim() === "",
  };
}

export function stateForCategory(state, category) {
  const nextCategory = state.category === category ? "" : category;
  return {
    query: "",
    category: nextCategory,
    expanded: !nextCategory,
  };
}

export function stateForShowAll(state) {
  return { ...state, expanded: true };
}

export function deriveDirectoryView(resources, state) {
  const query = normalized(state.query);
  const category = String(state.category ?? "");
  const filtered = resources.filter((resource) => {
    const matchesCategory = !category || resource.category === category;
    const searchableText = `${resource.title ?? ""} ${resource.description ?? ""} ${resource.category ?? ""}`;
    const matchesQuery = !query || normalized(searchableText).includes(query);
    return matchesCategory && matchesQuery;
  });
  const initialSubset = !query && !category && !state.expanded;
  const visible = initialSubset ? filtered.slice(0, INITIAL_VISIBLE_COUNT) : filtered;

  return {
    filtered,
    visible,
    total: filtered.length,
    isEmpty: filtered.length === 0,
    canShowAll: initialSubset && filtered.length > INITIAL_VISIBLE_COUNT,
  };
}

function initializeDirectory() {
  document.documentElement.classList.add("js");

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("#site-navigation");
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
      navigation.classList.toggle("is-open", !isOpen);
    });
  }

  const directory = document.querySelector("[data-directory]");
  if (!directory) return;

  const cards = [...directory.querySelectorAll("[data-resource-card]")];
  const resources = cards.map((card) => ({
    id: card.dataset.resourceId,
    category: card.dataset.category,
    title: card.querySelector("h2")?.textContent ?? "",
    description: card.querySelector("p")?.textContent ?? "",
    element: card,
  }));
  const search = directory.querySelector("[data-search]");
  const categoryButtons = [...directory.querySelectorAll("[data-category-button]")];
  const showAll = directory.querySelector("[data-show-all]");
  const empty = directory.querySelector("[data-empty]");
  const status = directory.querySelector("[data-status]");
  let state = { query: "", category: "", expanded: false };

  const render = () => {
    const view = deriveDirectoryView(resources, state);
    const visible = new Set(view.visible.map((resource) => resource.id));
    for (const resource of resources) {
      resource.element.hidden = !visible.has(resource.id);
    }

    for (const button of categoryButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.categoryButton === state.category));
    }

    empty.hidden = !view.isEmpty;
    if (view.isEmpty) {
      empty.textContent = state.query
        ? `No encontramos recursos para “${state.query}”.`
        : "No encontramos recursos en esta categoría.";
    }
    showAll.hidden = !view.canShowAll;

    const hasFilter = Boolean(normalized(state.query) || state.category);
    status.textContent = hasFilter ? `${view.total} ${view.total === 1 ? "recurso" : "recursos"}` : "";
  };

  search.addEventListener("input", () => {
    state = stateForSearch(search.value);
    render();
  });

  for (const button of categoryButtons) {
    button.addEventListener("click", () => {
      state = stateForCategory(state, button.dataset.categoryButton);
      search.value = "";
      render();
    });
  }

  showAll.addEventListener("click", () => {
    state = stateForShowAll(state);
    render();
  });

  render();
}

if (typeof document !== "undefined") {
  initializeDirectory();
}
