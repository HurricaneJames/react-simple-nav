import { isArray } from './compat';

var merge = function() {
  var currentStyle
    , mergedStyles = {};
  for(var i = 0, len = arguments.length; i < len; i++) {
    currentStyle = arguments[i];
    if(isArray(currentStyle)) { currentStyle = merge.apply(null, currentStyle); }
    if(typeof currentStyle === 'object') {
      for(var style in currentStyle) {
        if(currentStyle.hasOwnProperty(style)) {
          mergedStyles[style] = currentStyle[style];
        }
      }
    }
  }
  return mergedStyles;
};

export default {
  merge: merge,
  button: {
    large: {
      img: {
        width: 64, height: 64
      }
    },
    small: {
      img: {
        width: 16, height: 16
      }
    }
  }
};