export const randomUUID = (prefix: string): string =>
  prefix + (Math.random() + 1).toString(36).substring(3);
