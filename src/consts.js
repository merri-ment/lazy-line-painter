export const PROJECT_NAME = "lazy-line-painter";

export const PROP = {
  EASE: "ease",
  PROGRESS: "progress",
  DELAY: "delay",
  REVERSE: "reverse",
  REPEAT: "repeat"
};

export const CALLBACK = {
  START: "start",
  PAUSE: "pause",
  RESUME: "resume",
  ERASE: "erase",
  UPDATE: "update",
  COMPLETE: "complete"
};

export const WARNING = {
  DEPRECATED: {
    SET: (prop) =>
      `${PROJECT_NAME} - .set() function deprecated, will be removed in future release. Please use .${prop}() instead`,
    SET_PROP: (prop) => `${PROJECT_NAME} - property ${prop} can not be set`
  },
  UNCOMPOSED:
    "This lazy line is uncomposed! Visit https://lazylinepainter.com/#composer to compose your masterpiece!",
  PROGRESS_CLAMPED: (val, clamped) =>
    `${PROJECT_NAME} - progress value ${val} outside of range [0-1], clamped to ${clamped}`,
  PROGRESS: (val) => `${PROJECT_NAME} - progress value ${val} not type Number`,
  DELAY: (val) => `${PROJECT_NAME} - delay value ${val} not type Number`,
  REVERSE: (val) => `${PROJECT_NAME} - reverse value ${val} not type Boolean`,
  EASE: (val) => `${PROJECT_NAME} - ease value ${val} not type String`,
  REPEAT: (val) => `${PROJECT_NAME} - repeat value ${val} not type Number`
};
