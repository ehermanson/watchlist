export const getImage = ({ id, size }: { id: string; size: string }) =>
  `https://image.tmdb.org/t/p/${size}${id}`;
