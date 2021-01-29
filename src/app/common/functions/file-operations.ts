export const createEmptyFile = (name) => {
  const blob  = new Blob();
  return new File([blob], name, blob);
};
