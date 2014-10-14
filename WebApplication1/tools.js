$.fn.hasClassStartsWith = function (className) {
    return this.filter('[class^=\'' + className + '\'], [class*=\'' + className + '\']');
}
