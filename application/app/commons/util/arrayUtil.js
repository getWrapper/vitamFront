function isArray(arrayToEvaluate) {
    return Object.prototype.toString.call(arrayToEvaluate) === '[object Array]';
}

function convertToArray(arrayToConvert) {
    if(!isArray(arrayToConvert)) {
        arrayToConvert = jQuery.makeArray(arrayToConvert);
    }
    return arrayToConvert;
}