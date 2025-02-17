export const convertDefaultValueInputString = (value: string) => {
  if (!value?.trim()) return undefined;
  return value.trim();
};
