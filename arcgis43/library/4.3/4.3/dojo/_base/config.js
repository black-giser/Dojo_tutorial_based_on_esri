//>>built
define(["../has", "require"], function(a, b) { a = {};
    b = b.rawConfig;
    for (var c in b) a[c] = b[c];!a.locale && "undefined" != typeof navigator && (c = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || navigator.userLanguage) && (a.locale = c.toLowerCase());
    return a });
