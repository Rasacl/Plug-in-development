 function getField(data, fields, pattern) {
    const arr = fields.split('/');
    const key = arr.shift();
    const value = data[key];

    if (value == null) {
        return value;
    } if (arr.length === 0) {
        if (!pattern) return value;
        const type = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '');
        if (pattern === true) {
            return type;
        } if (!pattern) {
            return value;
        }
        return type === pattern;
    }

    const result = getField(value, arr.join('/'), pattern);
    return result;
}


 function clone (obj) {
    let copy = null;

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (Array.isArray(obj)) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i += 1) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object || Object.prototype.toString.call(obj) === '[object Object]') {
        copy = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const attr in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
};

function getBase(num, base) {
    return num.toString(base).toUpperCase();
}

function getRand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function getIntegerBits(val, start, end) {
    const base16 = getBase(val, 16);
    const quadArray = [];
    let quadString = '';
    let i = 0;
    for (i = 0; i < base16.length; i += 1) {
        quadArray.push(base16.substring(i, i + 1));
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i += 1) {
        if (!quadArray[i] || quadArray[i] === '') {
            quadString += '0';
        } else {
            quadString += quadArray[i];
        }
    }
    return quadString;
}

 function createUUID() {
    const dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    const dc = new Date();
    const t = dc.getTime() - dg.getTime();
    const tl = getIntegerBits(t, 0, 31);
    const tm = getIntegerBits(t, 32, 47);
    const thv = getIntegerBits(t, 48, 59) + 1; // version 1, security version is 2
    const csar = getIntegerBits(getRand(4095), 0, 7);
    const csl = getIntegerBits(getRand(4095), 0, 7);
    const n = getIntegerBits(getRand(8191), 0, 7)
        + getIntegerBits(getRand(8191), 8, 15)
        + getIntegerBits(getRand(8191), 0, 7)
        + getIntegerBits(getRand(8191), 8, 15)
        + getIntegerBits(getRand(8191), 0, 15); // this last number is two octets long
    return tl + tm + thv + csar + csl + n;
}

function rgbaToColor(color) {
    if (color.length === 0) {
      return [0, 0, 0, 0];
    }
    const arr = color.split('rgba(')[1].split(',');
    if (arr[3]) {
      arr[3] = arr[3].split(')')[0];
    }
    // return [arr[0] / 255, arr[1] / 255, arr[2] / 255, parseFloat(arr[3])];
    return [arr[0] - 0, arr[1] - 0, arr[2] - 0, parseFloat(arr[3])];
  }

function deepCopy(obj, cache = []) {
    return JSON.parse(JSON.stringify(obj));
}
  
function throttle(fn, delay, ctx) {
    var timer = null;
    return function () {
        delay = delay || 500;
        var context = ctx || this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

export {
    getField,
    clone,
    createUUID,
    rgbaToColor,
    deepCopy,
    throttle
}