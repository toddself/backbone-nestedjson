'use strict';

(function() {

  /**
   * Enumerate on the `attributes` hash and determine if there are models that
   * we should unravel
   * @method  toJSON
   * @returns {object} object for passing into `JSON.stringify`
   */
  function ToJSON(){
    var model = this;
    var simpleObj = {};
    Object.keys(model.attributes).forEach(function(key){
      var attr = model.attributes[key];
      if(typeof attr === 'object' && !Array.isArray(attr) && typeof attr.toJSON === 'function'){
        simpleObj[key] = attr.toJSON();
      } else {
        simpleObj[key] = attr;
      }
    });

    return simpleObj;
  }

  // module dance
  if (typeof exports !== 'undefined') {
    module.exports = ToJSON;
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return ToJSON;
    });
  } else {
    window.Backbone.toJSON = ToJSON;
  }


  // SHIM ES5 METHODS
  if (!Object.keys) {
    Object.keys = (function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
          toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [],
          prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
      var i, len;
      for (i = 0, len = this.length; i < len; ++i) {
        if (i in this) {
          fn.call(scope, this[i], i, this);
        }
      }
    };
  }

  if(!Array.isArray) {
      Array.isArray = function (vArg) {
        return Object.prototype.toString.call(vArg) === '[object Array]';
      };
    }
})();