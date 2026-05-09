export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isServer() {
  return typeof window === "undefined";
}
