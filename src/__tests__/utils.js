export function sleep(time) {
  return new Promise((f) => setTimeout(f, time));
}
