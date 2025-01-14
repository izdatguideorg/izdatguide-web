export const formatEstablishedTime = (timestamp: string): string => {
  const now = new Date();
  let date = now;
  if (timestamp) date = new Date(timestamp);

  const YYYY = date.getFullYear();

  return `${YYYY}`;
};