export const formatWeight = (grams: number) =>
  grams < 1 ? `${(grams * 1000).toFixed(2)} mg` : `${grams.toFixed(4)} g`;

