export const isNumber = (val) => {
  return typeof val === "number";
};

export const isBoolean = (val) => {
  return typeof val === "boolean";
};

export const isString = (val) => {
  return typeof val === "string";
};

export const clamp = (num, min = 0, max = 1) => {
  return num < min ? min : num > max ? max : num;
};
