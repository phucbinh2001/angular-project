export const tryParseJson = <T>(value: string) => {
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    return null;
  }
};
