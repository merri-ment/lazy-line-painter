/**
 * @File:      ployfill Low version browser
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:     2019/2/19 上午11:41:45
 * https://github.com/huarxia/lazy-line-painter
 * Licensed under the MIT license.
 */
let ployfill = {};
/**
 * Attribute set of elements
 * ele.dataset ---> ele.attributes
 */

ployfill.getDataset = function (ele) {
  if (ele.dataset) {
    return ele.dataset;
  }
  // Attribute set of elements
  let attrs = ele.attributes,
    dataset = {},
    name,
    matchStr,
    i;

  for (i = 0; i < attrs.length; i++) {
    // Is it data- start?
    matchStr = attrs[i].name.match(/^data-(.+)/);
    if (matchStr) {
      // data-auto-play Conversion to Hump autoPlay
      name = matchStr[1].replace(/-([\da-z])/gi, (all, letter) => {
        return letter.toUpperCase();
      });
      dataset[name] = attrs[i].value;
    }
  }
  return dataset;
};

export default ployfill;
