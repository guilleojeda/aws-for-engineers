export const PRODUCTION_HOSTNAME = "dondeaprendoaws.com";
export const GA4_MEASUREMENT_ID = "G-3NXS6QFKHZ";

export function initializeAnalytics(hostname, documentRef, windowRef) {
  if (hostname !== PRODUCTION_HOSTNAME || !documentRef?.head || !windowRef) return false;

  windowRef.dataLayer = windowRef.dataLayer || [];
  windowRef.gtag = function gtag() {
    windowRef.dataLayer.push(arguments);
  };
  windowRef.gtag("js", new Date());
  windowRef.gtag("config", GA4_MEASUREMENT_ID);

  const script = documentRef.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  documentRef.head.appendChild(script);
  return true;
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  initializeAnalytics(window.location.hostname, document, window);
}
