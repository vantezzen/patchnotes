export function trackEvent(name: string) {
  if (typeof window !== "undefined") {
    try {
      window.gtag("event", name);
    } catch (e) {
      console.error(e);
    }
  }
}
