document.querySelectorAll('[data-post-search]').forEach((input) => {
  const cards = [...document.querySelectorAll('[data-search-card]')];
  const status = document.querySelector('[data-search-status]');
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase();
    let count = 0;
    for (const card of cards) {
      const shown = card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !shown;
      if (shown) count++;
    }
    if (status) status.textContent = `${count} article${count === 1 ? '' : 's'} shown`;
  });
});
