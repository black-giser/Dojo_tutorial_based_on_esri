//>>built
define("./_base/config ./_base/lang ./sniff ./dom ./dom-construct ./_base/window require".split(" "), function(k, C, m, D, E, F, x) {
    function f() {
        var a = c.pop();
        if (a) {
            var b = c[c.length - 1];
            b || 0 != c.length || (b = n);
            b && (b.kwArgs.back ? b.kwArgs.back() : b.kwArgs.backButton ? b.kwArgs.backButton() : b.kwArgs.handle && b.kwArgs.handle("back"));
            e.push(a) } }

    function h() {
        var a = e.pop();
        a && (a.kwArgs.forward ? a.kwArgs.forward() : a.kwArgs.forwardButton ? a.kwArgs.forwardButton() : a.kwArgs.handle && a.kwArgs.handle("forward"), c.push(a)) }

    function p(a,
        b, c) {
        return { url: a, kwArgs: b, urlHash: c } }

    function r(a) { a = a.split("?");
        return 2 > a.length ? null : a[1] }

    function y() {
        var a = (k.dojoIframeHistoryUrl || x.toUrl("./resources/iframe_history.html")) + "?" + (new Date).getTime();
        t = !0;
        l && (m("webkit") ? l.location = a : window.frames[l.name].location = a);
        return a }

    function G() {
        if (!u) {
            var a = c.length,
                b = q();
            b !== z && window.location.href != A || 1 != a ? 0 < e.length && e[e.length - 1].urlHash === b ? h() : 2 <= a && c[a - 2] && c[a - 2].urlHash === b && f() : f() } }
    var d = {};
    C.setObject("dojo.back", d);
    var q = d.getHash = function() {
            var a =
                window.location.hash;
            "#" == a.charAt(0) && (a = a.substring(1));
            return m("mozilla") ? a : decodeURIComponent(a)
        },
        v = d.setHash = function(a) { a || (a = "");
            window.location.hash = encodeURIComponent(a) },
        A = "undefined" !== typeof window ? window.location.href : "",
        z = "undefined" !== typeof window ? q() : "",
        n = null,
        B = null,
        w = null,
        l = null,
        e = [],
        c = [],
        t = !1,
        u = !1;
    d.goBack = f;
    d.goForward = h;
    d.init = function() {
        if (!D.byId("dj_history")) {
            var a = k.dojoIframeHistoryUrl || x.toUrl("./resources/iframe_history.html");
            k.afterOnLoad ? console.error("dojo/back::init() must be called before the DOM has loaded. Include dojo/back in a build layer.") :
                document.write('\x3ciframe style\x3d"border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name\x3d"dj_history" id\x3d"dj_history" src\x3d"' + a + '"\x3e\x3c/iframe\x3e')
        }
    };
    d.setInitialState = function(a) { n = p(A, a, z) };
    d.addToHistory = function(a) {
        e = [];
        var b = null,
            d = null;
        l || (k.useXDomain && !k.dojoIframeHistoryUrl && console.warn("dojo/back: When using cross-domain Dojo builds, please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl to the path on your domain to iframe_history.html"),
            l = window.frames.dj_history);
        w || (w = E.create("a", { style: { display: "none" } }, F.body()));
        if (a.changeUrl) {
            b = "" + (!0 !== a.changeUrl ? a.changeUrl : (new Date).getTime());
            if (0 == c.length && n.urlHash == b) { n = p(d, a, b);
                return }
            if (0 < c.length && c[c.length - 1].urlHash == b) { c[c.length - 1] = p(d, a, b);
                return }
            u = !0;
            setTimeout(function() { v(b);
                u = !1 }, 1);
            w.href = b;
            if (m("ie")) {
                var d = y(),
                    f = a.back || a.backButton || a.handle,
                    g = function(a) { "" != q() && setTimeout(function() { v(b) }, 1);
                        f.apply(this, [a]) };
                a.back ? a.back = g : a.backButton ? a.backButton = g : a.handle &&
                    (a.handle = g);
                var h = a.forward || a.forwardButton || a.handle,
                    g = function(a) { "" != q() && v(b);
                        h && h.apply(this, [a]) };
                a.forward ? a.forward = g : a.forwardButton ? a.forwardButton = g : a.handle && (a.handle = g)
            } else m("ie") || B || (B = setInterval(G, 200))
        } else d = y();
        c.push(p(d, a, b))
    };
    d._iframeLoaded = function(a, b) { a = r(b.href);
        null == a ? 1 == c.length && f() : t ? t = !1 : 2 <= c.length && a == r(c[c.length - 2].url) ? f() : 0 < e.length && a == r(e[e.length - 1].url) && h() };
    return d
});
