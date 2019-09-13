const MIN_WIDTH = 2560;

export const getWorldWidth = () => {
  const width = window.innerWidth * 2;
  return width < MIN_WIDTH ? MIN_WIDTH : width;
};