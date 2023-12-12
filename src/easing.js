const Easing = {
  easeLinear(n) {
    return n;
  },

  easeInQuad(n) {
    return n * n;
  },

  easeOutQuad(n) {
    return n * (2 - n);
  },

  easeInOutQuad(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return -0.5 * (--n * (n - 2) - 1);
  },

  easeInCubic(n) {
    return n * n * n;
  },

  easeOutCubic(n) {
    return --n * n * n + 1;
  },

  easeInOutCubic(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n;
    return 0.5 * ((n -= 2) * n * n + 2);
  },

  easeInQuart(n) {
    return n * n * n * n;
  },

  easeOutQuart(n) {
    return 1 - --n * n * n * n;
  },

  easeInOutQuart(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n;
    return -0.5 * ((n -= 2) * n * n * n - 2);
  },

  easeInQuint(n) {
    return n * n * n * n * n;
  },

  easeOutQuint(n) {
    return --n * n * n * n * n + 1;
  },

  easeInOutQuint(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n * n;
    return 0.5 * ((n -= 2) * n * n * n * n + 2);
  },

  easeInSine(n) {
    return 1 - Math.cos((n * Math.PI) / 2);
  },

  easeOutSine(n) {
    return Math.sin((n * Math.PI) / 2);
  },

  easeInOutSine(n) {
    return 0.5 * (1 - Math.cos(Math.PI * n));
  },

  easeInExpo(n) {
    return n === 0 ? 0 : Math.pow(1024, n - 1);
  },

  easeOutExpo(n) {
    return n === 1 ? n : 1 - Math.pow(2, -10 * n);
  },

  easeInOutExpo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if ((n *= 2) < 1) return 0.5 * Math.pow(1024, n - 1);
    return 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  },

  easeInCirc(n) {
    return 1 - Math.sqrt(1 - n * n);
  },

  easeOutCirc(n) {
    return Math.sqrt(1 - --n * n);
  },

  easeInOutCirc(n) {
    n *= 2;
    if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  },

  easeInBounce(n) {
    return 1 - this.easeOutBounce(1 - n);
  },

  easeOutBounce(n) {
    if (n < 1 / 2.75) {
      return 7.5625 * n * n;
    } else if (n < 2 / 2.75) {
      return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
    } else if (n < 2.5 / 2.75) {
      return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
    }
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },

  easeInOutBounce(n) {
    if (n < 0.5) return this.easeInBounce(n * 2) * 0.5;
    return this.easeOutBounce(n * 2 - 1) * 0.5 + 0.5;
  }
};

export default Easing;
