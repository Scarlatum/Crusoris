export function css(data: TemplateStringsArray): string {
  return String(data);
};

export const enum Status {
  idle,
  active,
  await
}