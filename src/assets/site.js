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

if (location.hostname === 'awsforengineers.com') {
  let adsStarted = false;
  let animationFramesScheduled = false;

  const loadAds = () => {
    if (adsStarted || document.hidden) return;

    if (!animationFramesScheduled) {
      animationFramesScheduled = true;
      window.requestAnimationFrame(() => {
        if (document.hidden) {
          animationFramesScheduled = false;
          return;
        }

        window.requestAnimationFrame(() => {
          animationFramesScheduled = false;
          if (document.hidden || adsStarted) return;

          adsStarted = true;
          const script = document.createElement('script');
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9639896081226655';
          document.head.appendChild(script);
        });
      });
    }
  };

  if (document.readyState === 'complete') {
    loadAds();
  } else {
    window.addEventListener('load', loadAds, { once: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.readyState === 'complete' && !document.hidden) {
      // Browsers may pause or discard a pending animation frame in a hidden tab.
      animationFramesScheduled = false;
      loadAds();
    }
  });
}
