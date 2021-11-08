export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const sides = [
  { name: "top", opposite: "bottom" },
  { name: "bottom", opposite: "top" },
  { name: "right", opposite: "left" },
  { name: "left", opposite: "right" },
];
