;(function() {
    var dfltPluginCfg = {
        "sourceFile": "download",
        "info": true
    };
    var dfltGlobalCfg = {
        "site": 596068,
        "log": "",
        "logSSL": "",
        "domain": "ati-host.net",
        "collectDomain": "logw363.ati-host.net",
        "collectDomainSSL": "logws1363.ati-host.net",
        "secure": true,
        "pixelPath": "/hit.xiti",
        "disableCookie": false,
        "disableStorage": false,
        "cookieSecure": false,
        "cookieDomain": "",
        "preview": false,
        "plgs": ["Campaigns", "Clicks", "ClientSideUserId", "ContextVariables", "Offline", "OnSiteAds", "Page", "RichMedia"],
        "lazyLoadingPath": "",
        "documentLevel": "document",
        "redirect": false,
        "activateCallbacks": true,
        "medium": "",
        "ignoreEmptyChapterValue": true,
        "base64Storage": false,
        "sendHitWhenOptOut": true
    };
    (function(a) {
        a.ATInternet = a.ATInternet || {};
        a.ATInternet.Tracker = a.ATInternet.Tracker || {};
        a.ATInternet.Tracker.Plugins = a.ATInternet.Tracker.Plugins || {}
    }
    )(window);
    var Utils = function() {
        function a(m) {
            var c = typeof m;
            if ("object" !== c || null === m)
                return "string" === c && (m = '"' + m + '"'),
                String(m);
            var b, d, f = [], e = m && m.constructor === Array;
            for (b in m)
                m.hasOwnProperty(b) && (d = m[b],
                c = typeof d,
                "function" !== c && "undefined" !== c && ("string" === c ? d = '"' + d.replace(/[^\\]"/g, '\\"') + '"' : "object" === c && null !== d && (d = a(d)),
                f.push((e ? "" : '"' + b + '":') + String(d))));
            return (e ? "[" : "{") + String(f) + (e ? "]" : "}")
        }
        function g(a) {
            return null === a ? "" : (a + "").replace(l, "")
        }
        function k(a) {
            var c, b = null;
            return (a = g(a + "")) && !g(a.replace(d, function(a, m, d, e) {
                c && m && (b = 0);
                if (0 === b)
                    return a;
                c = d || m;
                b += !e - !d;
                return ""
            })) ? Function("return " + a)() : null
        }
        var e = this
          , d = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g
          , l = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");
        e.isLocalStorageAvailable = function() {
            try {
                var a = localStorage;
                a.setItem("__storage_test__", "__storage_test__");
                a.removeItem("__storage_test__");
                return !0
            } catch (c) {
                return !1
            }
        }
        ;
        e.Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(a) {
                var c = "", b, d, f, q, n, h, l = 0;
                for (a = e.Base64._utf8_encode(a); l < a.length; )
                    b = a.charCodeAt(l++),
                    d = a.charCodeAt(l++),
                    f = a.charCodeAt(l++),
                    q = b >> 2,
                    b = (b & 3) << 4 | d >> 4,
                    n = (d & 15) << 2 | f >> 6,
                    h = f & 63,
                    isNaN(d) ? n = h = 64 : isNaN(f) && (h = 64),
                    c = c + this._keyStr.charAt(q) + this._keyStr.charAt(b) + this._keyStr.charAt(n) + this._keyStr.charAt(h);
                return c
            },
            decode: function(a) {
                var c = "", b, d, f, q, n, h = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length; )
                    b = this._keyStr.indexOf(a.charAt(h++)),
                    d = this._keyStr.indexOf(a.charAt(h++)),
                    q = this._keyStr.indexOf(a.charAt(h++)),
                    n = this._keyStr.indexOf(a.charAt(h++)),
                    b = b << 2 | d >> 4,
                    d = (d & 15) << 4 | q >> 2,
                    f = (q & 3) << 6 | n,
                    c += String.fromCharCode(b),
                    64 != q && (c += String.fromCharCode(d)),
                    64 != n && (c += String.fromCharCode(f));
                return c = e.Base64._utf8_decode(c)
            },
            _utf8_encode: function(a) {
                a = a.replace(/\r\n/g, "\n");
                for (var c = "", b = 0; b < a.length; b++) {
                    var d = a.charCodeAt(b);
                    128 > d ? c += String.fromCharCode(d) : (127 < d && 2048 > d ? c += String.fromCharCode(d >> 6 | 192) : (c += String.fromCharCode(d >> 12 | 224),
                    c += String.fromCharCode(d >> 6 & 63 | 128)),
                    c += String.fromCharCode(d & 63 | 128))
                }
                return c
            },
            _utf8_decode: function(a) {
                for (var c = "", b = 0, d, f, e; b < a.length; )
                    d = a.charCodeAt(b),
                    128 > d ? (c += String.fromCharCode(d),
                    b++) : 191 < d && 224 > d ? (f = a.charCodeAt(b + 1),
                    c += String.fromCharCode((d & 31) << 6 | f & 63),
                    b += 2) : (f = a.charCodeAt(b + 1),
                    e = a.charCodeAt(b + 2),
                    c += String.fromCharCode((d & 15) << 12 | (f & 63) << 6 | e & 63),
                    b += 3);
                return c
            }
        };
        e.loadScript = function(a, c) {
            var b;
            c = c || function() {}
            ;
            b = document.createElement("script");
            b.type = "text/javascript";
            b.src = a.url;
            b.async = !1;
            b.defer = !1;
            b.onload = b.onreadystatechange = function(a) {
                a = a || window.event;
                if ("load" === a.type || /loaded|complete/.test(b.readyState) && (!document.documentMode || 9 > document.documentMode))
                    b.onload = b.onreadystatechange = b.onerror = null,
                    c(null, a)
            }
            ;
            b.onerror = function(a) {
                b.onload = b.onreadystatechange = b.onerror = null;
                c({
                    msg: "script not loaded",
                    event: a
                })
            }
            ;
            var d = document.head || document.getElementsByTagName("head")[0];
            d.insertBefore(b, d.lastChild)
        }
        ;
        e.cloneSimpleObject = function(a, c) {
            if ("object" !== typeof a || null === a || a instanceof Date)
                return a;
            var b = new a.constructor, d;
            for (d in a)
                a.hasOwnProperty(d) && (void 0 === d || c && void 0 === a[d] || (b[d] = e.cloneSimpleObject(a[d])));
            return b
        }
        ;
        e.jsonSerialize = function(d) {
            try {
                return "undefined" !== typeof JSON && JSON.stringify ? JSON.stringify(d) : a(d)
            } catch (c) {
                return null
            }
        }
        ;
        e.jsonParse = function(a) {
            try {
                return "undefined" !== typeof JSON && JSON.parse ? JSON.parse(a + "") : k(a)
            } catch (c) {
                return null
            }
        }
        ;
        e.arrayIndexOf = function(a, c) {
            return Array.indexOf ? a.indexOf(c) : function(a) {
                if (null == this)
                    throw new TypeError;
                var c = Object(this)
                  , d = c.length >>> 0;
                if (0 === d)
                    return -1;
                var m = 0;
                1 < arguments.length && (m = Number(arguments[1]),
                m != m ? m = 0 : 0 != m && Infinity != m && -Infinity != m && (m = (0 < m || -1) * Math.floor(Math.abs(m))));
                if (m >= d)
                    return -1;
                for (m = 0 <= m ? m : Math.max(d - Math.abs(m), 0); m < d; m++)
                    if (m in c && c[m] === a)
                        return m;
                return -1
            }
            .apply(a, [c])
        }
        ;
        e.uuid = function() {
            return {
                v4: function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                        var c = 16 * Math.random() | 0;
                        return ("x" === a ? c : c & 3 | 8).toString(16)
                    })
                },
                num: function(a) {
                    var c = new Date
                      , b = function(a) {
                        a -= 100 * Math.floor(a / 100);
                        return 10 > a ? "0" + a : String(a)
                    };
                    return b(c.getHours()) + "" + b(c.getMinutes()) + "" + b(c.getSeconds()) + "" + function(a) {
                        return Math.floor((9 * Math.random() + 1) * Math.pow(10, a - 1))
                    }(a - 6)
                }
            }
        }
        ;
        e.getObjectKeys = function(a) {
            var c = [], b;
            for (b in a)
                a.hasOwnProperty(b) && c.push(b);
            return c
        }
        ;
        e.completeFstLevelObj = function(a, c, b) {
            if (a) {
                if (c)
                    for (var d in c)
                        !c.hasOwnProperty(d) || a[d] && !b || (a[d] = c[d])
            } else
                a = c;
            return a
        }
        ;
        e.isPreview = function() {
            return window.navigator && "preview" === window.navigator.loadPurpose
        }
        ;
        e.isPrerender = function(a) {
            var c, b = !1, d = ["webkit", "ms"];
            if ("prerender" === document.visibilityState)
                c = "visibilitychange";
            else
                for (var f = 0; f < d.length; f++)
                    "prerender" === document[d[f] + "VisibilityState"] && (c = d[f] + "visibilitychange");
            if ("undefined" !== typeof c) {
                var q = function(b) {
                    a(b);
                    e.removeEvtListener(document, c, q)
                };
                e.addEvtListener(document, c, q);
                b = !0
            }
            return b
        }
        ;
        var h = e.addEvtListener = function(a, c, b) {
            a.addEventListener ? a.addEventListener(c, b, !1) : a.attachEvent && a.attachEvent("on" + c, b)
        }
          , f = e.removeEvtListener = function(a, c, b) {
            a.removeEventListener ? a.removeEventListener(c, b, !1) : a.detachEvent && a.detachEvent("on" + c, b)
        }
        ;
        e.hashcode = function(a) {
            var c = 0;
            if (0 === a.length)
                return c;
            for (var b = 0; b < a.length; b++)
                var d = a.charCodeAt(b)
                  , c = (c << 5) - c + d
                  , c = c | 0;
            return c
        }
        ;
        e.setLocation = function(a) {
            var c = a.location;
            a = window[a.target] || window;
            c && (a.location.href = c)
        }
        ;
        e.dispatchCallbackEvent = function(a) {
            var c;
            if ("function" === typeof window.Event)
                c = new Event("ATCallbackEvent");
            else
                try {
                    c = document.createEvent("Event"),
                    c.initEvent && c.initEvent("ATCallbackEvent", !0, !0)
                } catch (b) {}
            c && "function" === typeof document.dispatchEvent && (c.name = a,
            document.dispatchEvent(c))
        }
        ;
        e.addCallbackEvent = function(a) {
            h(document, "ATCallbackEvent", a)
        }
        ;
        (function() {
            function a(c, b) {
                b = b || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var d;
                try {
                    d = document.createEvent("CustomEvent"),
                    d.initCustomEvent(c, b.bubbles, b.cancelable, b.detail)
                } catch (f) {}
                return d
            }
            if ("function" === typeof window.CustomEvent)
                return window.ATCustomEvent = window.CustomEvent,
                !1;
            "function" === typeof window.Event && (a.prototype = window.Event.prototype);
            window.ATCustomEvent = a
        }
        )();
        e.addEvent = function(a, c, b, d) {
            e[a] = new ATCustomEvent(a,{
                detail: {
                    name: c,
                    id: b
                }
            });
            h(document, a, d)
        }
        ;
        e.removeEvent = function(a, c) {
            f(document, a, c)
        }
        ;
        e.dispatchEvent = function(a, c) {
            e[a] = e[a] || new ATCustomEvent(a,{
                detail: {
                    name: c,
                    id: -1
                }
            });
            try {
                document.dispatchEvent(e[a])
            } catch (b) {}
        }
        ;
        e.addOptOutEvent = function(a, c) {
            e.addEvent("ATOptOutEvent", "clientsideuserid", a, c)
        }
        ;
        e.removeOptOutEvent = function(a) {
            e.removeEvent("ATOptOutEvent", a)
        }
        ;
        e.dispatchOptOutEvent = function(a) {
            e.optedOut = a;
            e.dispatchEvent("ATOptOutEvent", "clientsideuserid")
        }
        ;
        e.userOptedOut = function() {
            e.dispatchOptOutEvent(!0)
        }
        ;
        e.userOptedIn = function() {
            e.dispatchOptOutEvent(!1)
        }
        ;
        e.isOptedOut = function() {
            if (null === e.optedOut) {
                var a;
                a: {
                    a = null;
                    e.isLocalStorageAvailable() && (a = localStorage.getItem("atoptedout"));
                    if (!a) {
                        var c = /(?:^| )atoptedout=([^;]+)/.exec(document.cookie) || null;
                        c && (a = c[1])
                    }
                    if (a = decodeURIComponent(a))
                        if (a = e.jsonParse(a) || e.jsonParse(e.Base64.decode(a))) {
                            a = !!a.val;
                            break a
                        }
                    a = !1
                }
                e.optedOut = a
            }
            return !!e.optedOut
        }
        ;
        e.optedOut = null;
        e.consentReceived = function(a) {
            e.consent = !!a
        }
        ;
        e.consent = !0
    };
    window.ATInternet.Utils = new Utils;
    var BuildManager = function(a) {
        var g = this
          , k = ["stc", "dz"]
          , e = function(a, c, b, d, f, e) {
            a = "&" + a + "=";
            return {
                param: a,
                paramSize: a.length,
                str: c,
                strSize: c.length,
                truncate: !!b,
                multihit: !!d,
                separator: f || "",
                encode: !!e
            }
        }
          , d = function(d, c) {
            var b = "", f = 0, e = !0, q;
            for (q in d)
                if (d.hasOwnProperty(q)) {
                    var n = d[q];
                    if (n) {
                        var e = !1
                          , h = c - f;
                        if (n.strSize + n.paramSize < h)
                            b += n.param + n.str,
                            f += n.strSize + n.paramSize,
                            n.multihit || (d[q] = void 0),
                            e = !0;
                        else {
                            n.truncate ? (f = h,
                            n.separator && (h = n.str.substr(0, h),
                            f = n.encode ? h.lastIndexOf(encodeURIComponent(n.separator)) || f : h.lastIndexOf(n.separator) || f),
                            b += n.param + n.str.substr(0, f),
                            d[q].str = n.str.substr(f, n.strSize - 1),
                            d[q].strSize = d[q].str.length) : n.strSize + n.paramSize > c && (a.emit("Tracker:Hit:Build:Error", {
                                lvl: "ERROR",
                                msg: 'Too long parameter "' + n.param + '"',
                                details: {
                                    value: n.str
                                }
                            }),
                            d[q].str = d[q].str.substr(0, c - n.paramSize - 1),
                            d[q].strSize = d[q].str.length);
                            break
                        }
                    } else
                        e = !0
                }
            return [b, e ? null : d]
        }
          , l = function(f, c, b, h) {
            var p = function(a) {
                if (a === {})
                    return "";
                var c = [], b;
                b = {};
                var t = 0, f = !1, s = void 0, h, q, p;
                for (p in a)
                    if (a.hasOwnProperty(p)) {
                        var n = a[p].value;
                        "function" === typeof n && (n = n());
                        n = n instanceof Array ? n.join(a[p].options.separator || ",") : "object" === typeof n ? window.ATInternet.Utils.jsonSerialize(n) : "undefined" === typeof n ? "undefined" : n.toString();
                        a[p].options.encode && (n = encodeURIComponent(n));
                        var m = e(p, n, -1 < ATInternet.Utils.arrayIndexOf(k, p) || a[p].options.truncate, a[p].options.multihit, a[p].options.separator, a[p].options.encode)
                          , t = t + (m.paramSize + m.strSize);
                        if (a[p].options.last)
                            1490 < n.length && n.substr(0, 1490),
                            h = p,
                            q = m;
                        else if (b[p] = m,
                        1500 < b[p].paramSize + b[p].strSize && !b[p].truncate) {
                            f = !0;
                            s = p;
                            break
                        }
                    }
                h && (b[h] = q);
                b = [b, t, f, s];
                a = b[0];
                if (b[2])
                    b = b[3],
                    a = a[b],
                    a.str = a.str.substr(0, 1450),
                    a.strSize = 1450,
                    t = {},
                    t.mherr = e("mherr", "1", !1),
                    t[b] = a,
                    c.push(d(t, 1500)[0]);
                else if (b = d(a, 1500),
                null === b[1])
                    c = b[0];
                else
                    for (c.push(b[0]); null !== b[1]; )
                        b = d(a, 1500),
                        c.push(b[0]);
                return c
            }
              , q = "";
            a.buffer.presentInFilters(b, "hitType") || (b = a.buffer.addInFilters(b, "hitType", ["page"]));
            b = a.buffer.addInFilters(b, "hitType", ["all"]);
            var n;
            if ("object" === typeof f && null !== f) {
                b = a.buffer.addInFilters(b, "permanent", !0);
                b = a.buffer.get(b, !0);
                var l, g, s, t;
                for (n in f)
                    if (f.hasOwnProperty(n)) {
                        q = f[n];
                        l = {};
                        if (c && "object" === typeof f[n]) {
                            s = g = !1;
                            for (t in f[n])
                                f[n].hasOwnProperty(t) && ("value" === t ? g = !0 : "options" === t && "object" === typeof f[n].options && null !== f[n].options && (s = !0));
                            g && s && (q = f[n].value,
                            l = f[n].options)
                        }
                        b[n] = {
                            value: q,
                            options: l
                        }
                    }
                q = p(b)
            } else
                for (n in b = a.buffer.get(b, !0),
                q = p(b),
                b)
                    b.hasOwnProperty(n) && !b[n].options.permanent && a.buffer.del(n);
            h && h(q)
        }
          , h = function(d, c) {
            var b = a.getConfig("secure")
              , f = "";
            if (d)
                f = d;
            else
                var f = "https:" === document.location.protocol
                  , e = (f = b || f) ? a.getConfig("logSSL") : a.getConfig("log")
                  , h = a.getConfig("domain")
                  , f = e && h ? e + "." + h : f ? a.getConfig("collectDomainSSL") : a.getConfig("collectDomain");
            e = a.getConfig("baseURL");
            (h = (h = a.getConfig("pixelPath")) || "/") && "/" !== h.charAt(0) && (h = "/" + h);
            var n = a.getConfig("site");
            (e || f && h) && n ? c && c(null, (e ? e : (b ? "https://" : "//") + f + h) + ("?s=" + n)) : c && c({
                message: "Config error"
            })
        }
          , f = function(a, c, b, d, f) {
            h(d, function(d, e) {
                d ? f && f(d) : l(a, c, b, function(a) {
                    var b = []
                      , c = ATInternet.Utils.uuid().num(13);
                    if (a instanceof Array)
                        if (1 === a.length)
                            b.push(e + "&mh=1-2-" + c + a[0]);
                        else
                            for (var d = 1; d <= a.length; d++)
                                b.push(e + "&mh=" + d + "-" + a.length + "-" + c + a[d - 1]);
                    else
                        b.push(e + a);
                    f && f(null, b)
                })
            })
        };
        g.send = function(d, c, b, e, h) {
            f(d, h, c, e, function(c, d) {
                if (c)
                    a.emit("Tracker:Hit:Build:Error", {
                        lvl: "ERROR",
                        msg: c.message,
                        details: {
                            hits: d
                        }
                    }),
                    b && b();
                else
                    for (var f = 0; f < d.length; f++)
                        g.sendUrl(d[f], b)
            })
        }
        ;
        g.sendUrl = function(d, c) {
            var b = function(b, d, f) {
                return function() {
                    return function(e) {
                        a.emit(b, {
                            lvl: f,
                            details: {
                                hit: d,
                                event: e
                            }
                        });
                        c && c()
                    }
                }()
            };
            if (ATInternet.Utils.isOptedOut() && !a.getConfig("sendHitWhenOptOut"))
                b("Tracker:Hit:Sent:NoTrack", d, "INFO")();
            else {
                var f = new Image;
                f.onload = b("Tracker:Hit:Sent:Ok", d, "INFO");
                f.onerror = b("Tracker:Hit:Sent:Error", d, "ERROR");
                f.src = d
            }
        }
    }
      , TriggersManager = function() {
        function a(a, e, h) {
            for (var f = [], m = 0; m < a.length; m++)
                a[m].callback(e, h),
                a[m].singleUse || f.push(a[m]);
            return f
        }
        function g(a, e, h, f) {
            var m = a.shift();
            if ("*" === m)
                return e["*"] = e["*"] || [],
                e["*"].push({
                    callback: h,
                    singleUse: f
                }),
                e["*"].length - 1;
            if (0 === a.length)
                return g([m, "*"], e, h, f);
            e["*"] = e["*"] || [];
            e[m] = e[m] || {};
            return g(a, e[m], h, f)
        }
        function k(d, e, h, f) {
            var m = e.shift();
            "*" !== m && (0 === e.length ? k(d, [m, "*"], h, f) : h[m] && (h[m]["*"] = a(h[m]["*"], d, f),
            k(d, e, h[m], f)))
        }
        var e = {};
        this.on = function(a, l, h) {
            h = h || !1;
            return g(a.split(":"), e, l, h)
        }
        ;
        this.emit = function(d, g) {
            e["*"] && (e["*"] = a(e["*"], d, g));
            k(d, d.split(":"), e, g)
        }
    }
      , PluginsManager = function(a) {
        var g = {}
          , k = {}
          , e = 0
          , d = {}
          , l = 0
          , h = this.unload = function(b) {
            g[b] ? (g[b] = void 0,
            a.emit("Tracker:Plugin:Unload:" + b + ":Ok", {
                lvl: "INFO"
            })) : a.emit("Tracker:Plugin:Unload:" + b + ":Error", {
                lvl: "ERROR",
                msg: "not a known plugin"
            });
            return a
        }
          , f = this.load = function(b, c) {
            "function" === typeof c ? "undefined" === typeof a.getConfig.plgAllowed || 0 === a.getConfig.plgAllowed.length || -1 < a.getConfig.plgAllowed.indexOf(b) ? (g[b] = new c(a),
            k[b] && g[b] && (k[b] = !1,
            e--,
            g[b + "_ll"] && h(b + "_ll"),
            0 === e && a.emit("Tracker:Plugin:Lazyload:File:Complete", {
                lvl: "INFO",
                msg: "LazyLoading triggers are finished"
            })),
            a.emit("Tracker:Plugin:Load:" + b + ":Ok", {
                lvl: "INFO"
            })) : a.emit("Tracker:Plugin:Load:" + b + ":Error", {
                lvl: "ERROR",
                msg: "Plugin not allowed",
                details: {}
            }) : a.emit("Tracker:Plugin:Load:" + b + ":Error", {
                lvl: "ERROR",
                msg: "not a function",
                details: {
                    obj: c
                }
            });
            return a
        }
          , m = this.isLazyloading = function(a) {
            return a ? !0 === k[a] : 0 !== e
        }
          , c = function(a) {
            return !g[a] && !m(a) && (g[a + "_ll"] ? !0 : !1)
        }
          , b = function(b) {
            k[b] = !0;
            e++;
            ATInternet.Utils.loadScript({
                url: a.getConfig("lazyLoadingPath") + b + ".js"
            })
        }
          , r = function(a) {
            return c(a) ? (b(a),
            !0) : !1
        }
          , p = function(a) {
            d[a] ? d[a]++ : d[a] = 1;
            l++
        };
        this.isExecWaitingLazyloading = function() {
            return 0 !== l
        }
        ;
        a.exec = this.exec = function(f, e, h, r) {
            var s = null
              , t = function(a, b, c, d) {
                b = b.split(".");
                g[a] && g[a][b[0]] && (s = 1 < b.length && g[a][b[0]][b[1]] ? g[a][b[0]][b[1]].apply(g[a], c) : g[a][b[0]].apply(g[a], c));
                d && d(s)
            }
              , w = function(b, c, f, e) {
                p(b);
                a.onTrigger("Tracker:Plugin:Load:" + b + ":Ok", function() {
                    t(b, c, f, function(c) {
                        d[b]--;
                        l--;
                        0 === l && a.emit("Tracker:Plugin:Lazyload:Exec:Complete", {
                            lvl: "INFO",
                            msg: "All exec waiting for lazyloading are done"
                        });
                        e && e(c)
                    })
                }, !0)
            };
            c(f) ? (w(f, e, h, r),
            b(f)) : m(f) ? w(f, e, h, r) : t(f, e, h, r)
        }
        ;
        this.waitForDependencies = function(b, c) {
            var d = function(a) {
                for (var b = {
                    mcount: 0,
                    plugins: {}
                }, c = 0; c < a.length; c++)
                    g.hasOwnProperty(a[c]) || (b.mcount++,
                    b.plugins[a[c]] = !0);
                return b
            }(b);
            if (0 === d.mcount)
                a.emit("Tracker:Plugin:Dependencies:Loaded", {
                    lvl: "INFO",
                    details: {
                        dependencies: b
                    }
                }),
                c();
            else
                for (var f in d.plugins)
                    d.plugins.hasOwnProperty(f) && (a.emit("Tracker:Plugin:Dependencies:Error", {
                        lvl: "WARNING",
                        msg: "Missing plugin " + f
                    }),
                    a.onTrigger("Tracker:Plugin:Load:" + f, function(a, b) {
                        var f = a.split(":")
                          , e = f[3];
                        "Ok" === f[4] && (d.plugins[e] = !1,
                        d.mcount--,
                        0 === d.mcount && c())
                    }, !0),
                    r(f))
        }
        ;
        this.init = function() {
            for (var a in ATInternet.Tracker.pluginProtos)
                ATInternet.Tracker.pluginProtos.hasOwnProperty(a) && f(a, ATInternet.Tracker.pluginProtos[a])
        }
    }
      , CallbacksManager = function(a) {
        var g = {}
          , k = this.load = function(e, d) {
            "function" === typeof d ? (new d(a),
            a.emit("Tracker:Callback:Load:" + e + ":Ok", {
                lvl: "INFO",
                details: {
                    obj: d
                }
            })) : a.emit("Tracker:Callback:Load:" + e + ":Error", {
                lvl: "ERROR",
                msg: "not a function",
                details: {
                    obj: d
                }
            });
            return a
        }
        ;
        this.init = function() {
            if (a.getConfig("activateCallbacks")) {
                var e = a.getConfig("callbacks");
                (function() {
                    if ("undefined" !== typeof e && e.include instanceof Array)
                        for (var a = 0; a < e.include.length; a++)
                            ATInternet.Callbacks && ATInternet.Callbacks.hasOwnProperty(e.include[a]) && (g[e.include[a]] = {
                                "function": ATInternet.Callbacks[e.include[a]]
                            },
                            ATInternet.Tracker.callbackProtos[e.include[a]] || (ATInternet.Tracker.callbackProtos[e.include[a]] = g[e.include[a]]));
                    else
                        for (a in ATInternet.Callbacks)
                            ATInternet.Callbacks.hasOwnProperty(a) && (g[a] = {
                                "function": ATInternet.Callbacks[a]
                            },
                            ATInternet.Tracker.callbackProtos[a] || (ATInternet.Tracker.callbackProtos[a] = g[a]));
                    if ("undefined" !== typeof e && e.exclude instanceof Array)
                        for (a = 0; a < e.exclude.length; a++)
                            g[e.exclude[a]] && (g[e.exclude[a]] = void 0);
                    for (var l in g)
                        g.hasOwnProperty(l) && g[l] && k(l, g[l]["function"])
                }
                )();
                ATInternet.Utils.addCallbackEvent(function(a) {
                    if (a.name) {
                        var g = !0;
                        "undefined" !== typeof e && (e.include instanceof Array && -1 === ATInternet.Utils.arrayIndexOf(e.include, a.name) && (g = !1),
                        e.exclude instanceof Array && -1 !== ATInternet.Utils.arrayIndexOf(e.exclude, a.name) && (g = !1));
                        if (ATInternet.Callbacks && ATInternet.Callbacks.hasOwnProperty(a.name)) {
                            var h = {};
                            h[a.name] = {
                                "function": ATInternet.Callbacks[a.name]
                            };
                            g && k(a.name, h[a.name]["function"]);
                            ATInternet.Tracker.callbackProtos[a.name] || (ATInternet.Tracker.callbackProtos[a.name] = h[a.name])
                        }
                    }
                })
            }
        }
    }
      , BufferManager = function(a) {
        var g = {};
        this.set = function(a, e, h) {
            h = h || {};
            h.hitType = h.hitType || ["page"];
            g[a] = {
                value: e,
                options: h
            }
        }
        ;
        var k = function(a, e, h) {
            return (a = window.ATInternet.Utils.cloneSimpleObject(a[e])) && !h ? a.value : a
        }
          , e = function l(a, f) {
            if (!(a && f instanceof Array && a instanceof Array))
                return [];
            if (0 === a.length)
                return f;
            var e = a[0], c, b = [], r = window.ATInternet.Utils.cloneSimpleObject(a);
            r.shift();
            for (var p = 0; p < f.length; p++)
                if ("object" !== typeof e[1])
                    g[f[p]] && g[f[p]].options[e[0]] === e[1] && b.push(f[p]);
                else {
                    c = e[1].length;
                    for (var q = 0; q < c; q++)
                        if (g[f[p]] && g[f[p]].options[e[0]]instanceof Array && 0 <= window.ATInternet.Utils.arrayIndexOf(g[f[p]].options[e[0]], e[1][q])) {
                            b.push(f[p]);
                            break
                        }
                }
            return l(r, b)
        };
        this.get = function(a, h) {
            var f = {};
            if ("string" === typeof a)
                f = k(g, a, h);
            else
                for (var m = e(a, window.ATInternet.Utils.getObjectKeys(g)), c = 0; c < m.length; c++)
                    f[m[c]] = k(g, m[c], h);
            return f
        }
        ;
        this.presentInFilters = function h(a, e) {
            return a && 0 !== a.length ? a[0][0] === e ? !0 : h(a.slice(1), e) : !1
        }
        ;
        this.addInFilters = function f(a, c, b, e) {
            if (!a || 0 === a.length)
                return e ? [] : [[c, b]];
            var p = a[0][0]
              , g = a[0][1];
            p === c && (g instanceof Array && !(-1 < window.ATInternet.Utils.arrayIndexOf(g, b[0])) && g.push(b[0]),
            e = !0);
            return [[p, g]].concat(f(a.slice(1), c, b, e))
        }
        ;
        this.del = function(a) {
            g[a] = void 0
        }
        ;
        this.clear = function() {
            g = {}
        }
    }
      , Tag = function(a, g, k) {
        g = g || {};
        var e = this;
        e.version = "5.16.0";
        var d = window.ATInternet.Utils.cloneSimpleObject(g);
        e.triggers = new TriggersManager(e);
        e.emit = e.triggers.emit;
        e.onTrigger = e.triggers.on;
        var l = window.ATInternet.Utils.cloneSimpleObject(dfltGlobalCfg) || {}, h;
        for (h in a)
            a.hasOwnProperty(h) && (l[h] = a[h]);
        e.getConfig = function(a) {
            return l[a]
        }
        ;
        e.setConfig = function(a, d, c) {
            void 0 !== l[a] && c || (e.emit("Tracker:Config:Set:" + a, {
                lvl: "INFO",
                details: {
                    bef: l[a],
                    aft: d
                }
            }),
            l[a] = d)
        }
        ;
        e.configPlugin = function(a, d, c) {
            l[a] = l[a] || {};
            for (var b in d)
                d.hasOwnProperty(b) && void 0 === l[a][b] && (l[a][b] = d[b]);
            c && (c(l[a]),
            e.onTrigger("Tracker:Config:Set:" + a, function(a, b) {
                c(b.details.aft)
            }));
            return l[a]
        }
        ;
        e.getContext = function(a) {
            return d[a]
        }
        ;
        e.setContext = function(a, h) {
            e.emit("Tracker:Context:Set:" + a, {
                lvl: "INFO",
                details: {
                    bef: d[a],
                    aft: h
                }
            });
            d[a] = h
        }
        ;
        e.delContext = function(a, h) {
            e.emit("Tracker:Context:Deleted:" + a + ":" + h, {
                lvl: "INFO",
                details: {
                    key1: a,
                    key2: h
                }
            });
            if (a)
                d.hasOwnProperty(a) && (h ? d[a] && d[a].hasOwnProperty(h) && (d[a][h] = void 0) : d[a] = void 0);
            else if (h)
                for (var c in d)
                    d.hasOwnProperty(c) && d[c] && d[c].hasOwnProperty(h) && (d[c][h] = void 0)
        }
        ;
        e.plugins = new PluginsManager(e);
        e.buffer = new BufferManager(e);
        e.setParam = e.buffer.set;
        e.getParams = function(a) {
            return e.buffer.get(a, !1)
        }
        ;
        e.getParam = e.buffer.get;
        e.delParam = e.buffer.del;
        e.builder = new BuildManager(e);
        e.sendHit = e.builder.send;
        e.sendUrl = e.builder.sendUrl;
        e.callbacks = new CallbacksManager(e);
        e.setParam("ts", function() {
            return (new Date).getTime()
        }, {
            permanent: !0,
            hitType: ["all"]
        });
        (e.getConfig("disableCookie") || e.getConfig("disableStorage")) && e.setParam("idclient", "Consent-NO", {
            permanent: !0,
            hitType: ["all"]
        });
        e.getConfig("medium") && e.setParam("medium", e.getConfig("medium"), {
            permanent: !0,
            hitType: ["all"]
        });
        e.plugins.init();
        e.callbacks.init();
        ATInternet.Tracker.instances.push(e);
        e.emit("Tracker:Ready", {
            lvl: "INFO",
            msg: "Tracker initialized",
            details: {
                tracker: e,
                args: {
                    config: a,
                    context: g,
                    callback: k
                }
            }
        });
        k && k(e)
    };
    ATInternet.Tracker.Tag = Tag;
    ATInternet.Tracker.instances = [];
    ATInternet.Tracker.pluginProtos = {};
    ATInternet.Tracker.addPlugin = function(a, g) {
        g = g || ATInternet.Tracker.Plugins[a];
        if (!ATInternet.Tracker.pluginProtos[a]) {
            ATInternet.Tracker.pluginProtos[a] = g;
            for (var k = 0; k < ATInternet.Tracker.instances.length; k++)
                ATInternet.Tracker.instances[k].plugins.load(a, g)
        }
    }
    ;
    ATInternet.Tracker.delPlugin = function(a) {
        if (ATInternet.Tracker.pluginProtos[a]) {
            ATInternet.Tracker.pluginProtos[a] = void 0;
            for (var g = 0; g < ATInternet.Tracker.instances.length; g++)
                ATInternet.Tracker.instances[g].plugins.unload(a)
        }
    }
    ;
    ATInternet.Tracker.callbackProtos = {};
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "lifetime": 30,
        "lastPersistence": true,
        "listEventsForExec": [],
        "domainAttribution": true,
        "info": true
    };
    var dfltGlobalCfg = {
        "visitLifetime": 30,
        "redirectionLifetime": 30
    };
    window.ATInternet.Tracker.Plugins.Campaigns = function(a) {
        a.setConfig("visitLifetime", dfltGlobalCfg.visitLifetime, !0);
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var g = {}, k, e;
        a.configPlugin("Campaigns", dfltPluginCfg || {}, function(a) {
            g = a
        });
        var d, l, h, f, m, c, b, r, p, q, n, u, v, s = function(b, c, d) {
            var e = null;
            a.plugins.exec(b, c, d, function(a) {
                e = a
            });
            return e
        }, t = function(a, b) {
            return s("Storage", a, b)
        }, w = function(a, b) {
            return s("Utils", a, b)
        }, y = function(a, b) {
            var c = t(e, [a]);
            if (null !== c)
                return "object" === typeof c && !(c instanceof Array);
            t(k, [a, {}, b]);
            return !0
        }, z = function(b, c) {
            var d = a.getContext("campaigns") || {};
            d[b] = c;
            a.setContext("campaigns", d)
        };
        (function() {
            a.plugins.waitForDependencies(["Storage", "Utils"], function() {
                k = "set" + (g.domainAttribution ? "" : "Private");
                e = "get" + (g.domainAttribution ? "" : "Private");
                d = t(e, [["atredir", "gopc"]]);
                l = t(e, [["atredir", "gopc_err"]]);
                h = t(e, [["atredir", "camp"]]);
                t("del", [["atredir", "gopc"]]);
                t("del", [["atredir", "gopc_err"]]);
                t("del", [["atredir", "camp"]]);
                f = t(e, [["atsession", "histo_camp"]]);
                m = t(e, [["atreman", "camp"]]);
                c = t(e, [["atreman", "date"]]);
                var s = w("getLocation", []);
                b = w("getQueryStringValue", ["xtor", s]);
                r = w("getQueryStringValue", ["xtdt", s]);
                p = w("getQueryStringValue", ["xts", s]);
                q = a.getContext("forcedCampaign");
                n = !!a.getConfig("redirect");
                if (u = b && r && p ? !0 : !1)
                    s = (new Date).getTime() / 6E4,
                    v = !n && p !== a.getConfig("site") || 0 > s - r || s - r >= a.getConfig("visitLifetime") ? !0 : !1;
                s = q || h || b;
                if (n && s && y("atredir", {
                    path: "/",
                    end: a.getConfig("redirectionLifetime")
                })) {
                    t(k, [["atredir", "camp"], s]);
                    var A = s = !1;
                    q || (h ? (s = d,
                    A = l) : (u && (s = !0),
                    v && (A = !0)));
                    t(k, [["atredir", "gopc"], s]);
                    t(k, [["atredir", "gopc_err"], A])
                }
                !n && m && (z("xtor", m),
                s = (new Date).getTime() / 36E5,
                s = Math.floor(s - c),
                z("roinbh", 0 <= s ? s : 0));
                n || (s = void 0,
                s = h ? d ? q || s : q || h : u ? q || s : q || b || s,
                f && f instanceof Array && -1 < f.indexOf(s) && (s = void 0),
                s && z("xto", s));
                if (!n && !q) {
                    var x;
                    h ? l && (x = h) : v && (x = b);
                    x && z("pgt", x)
                }
                n || !(x = h ? q || h : q || b || void 0) || !q && !h && u && v || !q && h && d && l || ((!f || f instanceof Array && 0 > f.indexOf(x)) && y("atsession", {
                    path: "/",
                    session: 60 * a.getConfig("visitLifetime")
                }) && t(k, [["atsession", "histo_camp"], f && f.push(x) ? f : [x]]),
                m && !g.lastPersistence || !y("atreman", {
                    path: "/",
                    session: 86400 * g.lifetime
                }) || (t(k, [["atreman", "camp"], x]),
                t(k, [["atreman", "date"], (new Date).getTime() / 36E5])));
                a.emit("Campaigns:process:done", {
                    lvl: "INFO"
                })
            })
        }
        )()
    }
    ;
    window.ATInternet.Tracker.addPlugin("Campaigns");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "info": true
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.Clicks = function(a) {
        var g = function(a) {
            var e = "";
            switch (a) {
            case "exit":
                e = "S";
                break;
            case "download":
                e = "T";
                break;
            case "action":
                e = "A";
                break;
            case "navigation":
                e = "N"
            }
            return e
        }
          , k = function(d) {
            var e = d.name;
            a.exec("Utils", "manageChapters", [d, "chapter", 3], function(a) {
                e = a + (e ? e : "")
            });
            return e
        }
          , e = function(d) {
            var e = {
                p: k(d),
                s2: d.level2 || "",
                click: g(d.type) || ""
            }
              , h = a.getContext("page") || {};
            e.pclick = k(h);
            e.s2click = h.level2 || "";
            d.customObject && a.exec("Utils", "customObjectToString", [d.customObject], function(a) {
                e.stc = a
            });
            a.sendHit(e, [["hitType", ["click"]]], d.callback)
        };
        a.click = {};
        a.clickListener = this.clickListener = {};
        a.click.send = this.send = function(d) {
            var g = !0;
            a.plugins.exec("TechClicks", "manageClick", [d.elem, d.event], function(a) {
                g = a
            });
            e(d);
            return g
        }
        ;
        a.clickListener.send = this.clickListener.send = function(d) {
            if (d.elem) {
                var g;
                a.plugins.exec("TechClicks", "isFormSubmit", [d.elem], function(a) {
                    g = a ? "submit" : "click"
                });
                ATInternet.Utils.addEvtListener(d.elem, g, function(h) {
                    a.plugins.exec("TechClicks", "manageClick", [d.elem, h]);
                    e(d)
                })
            }
        }
        ;
        a.click.set = this.set = function(d) {
            a.dispatchSubscribe("click");
            a.setContext("click", {
                name: k(d),
                level2: d.level2 || "",
                customObject: d.customObject
            });
            a.setParam("click", g(d.type) || "", {
                hitType: ["click"]
            })
        }
        ;
        a.click.onDispatch = this.onDispatch = function(d) {
            var e = {
                hitType: ["click"]
            };
            a.setParam("p", a.getContext("click").name, e);
            a.setParam("s2", a.getContext("click").level2, e);
            var h = a.getContext("click").customObject;
            h && a.setParam("stc", h, {
                hitType: ["click"],
                encode: !0
            });
            h = a.getContext("page") || {};
            a.setParam("pclick", k(h), e);
            a.setParam("s2click", h.level2 || "", e);
            a.sendHit(null, [["hitType", ["click"]]], d);
            a.setContext("click", void 0)
        }
    }
    ;
    window.ATInternet.Tracker.addPlugin("Clicks");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "clientSideMode": "always",
        "userIdCookieDuration": 397,
        "userIdExpirationMode": "relative",
        "optOut": "OPT-OUT",
        "userIdStorageName": "atuserid",
        "optOutStorageName": "atoptedout",
        "info": true
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.ClientSideUserId = function(a) {
        var g = {}
          , k = void 0
          , e = null
          , d = !1
          , l = !1
          , h = !1
          , f = ""
          , m = ""
          , c = !1
          , b = !1
          , r = -1;
        a.configPlugin("ClientSideUserId", dfltPluginCfg || {}, function(a) {
            g = a
        });
        var p = function() {
            if ("relative" === g.userIdExpirationMode || "fixed" === g.userIdExpirationMode && null === e || c) {
                var d = new Date;
                d.setTime(d.getTime() + 864E5 * g.userIdCookieDuration);
                a.storage.set(m, f, {
                    end: d,
                    path: "/"
                }, b);
                d = a.storage.get(m, !0);
                ATInternet.Utils.consent && !c && f !== d && a.setParam("idclient", f + "-NO", {
                    multihit: !0,
                    permanent: !0,
                    hitType: ["all"]
                })
            }
        }
          , q = function() {
            a.setParam("idclient", f, {
                multihit: !0,
                permanent: !0,
                hitType: ["all"]
            });
            p()
        }
          , n = function() {
            k = a.getContext("userIdentifier");
            e = a.storage.get("atuserid");
            var p = !1;
            if ("required" === g.clientSideMode) {
                var s = "";
                window.navigator && (s = window.navigator.userAgent);
                if (/Safari/.test(s) && !/Chrome/.test(s) || /iPhone|iPod|iPad/.test(s))
                    p = !0
            } else
                "always" === g.clientSideMode && (p = !0);
            d = p;
            p = !1;
            s = ATInternet.Utils.optedOut;
            !1 === s && (a.storage.del("atoptedout"),
            a.getParam("idclient") === g.optOut && a.delParam("idclient"));
            var t = a.storage.get("atoptedout", !0);
            if (!0 === s || t === g.optOut)
                p = !0;
            p && (ATInternet.Utils.optedOut = !0);
            l = p;
            h = "undefined" !== typeof k;
            if (d || l || h)
                m = g.userIdStorageName,
                b = c = !1,
                l ? (f = g.optOut,
                m = g.optOutStorageName,
                b = c = !0) : a.getConfig("disableCookie") || a.getConfig("disableStorage") ? (f = a.getParam("idclient"),
                c = !0) : h ? (f = k,
                c = !0) : f = null !== e ? e : ATInternet.Utils.uuid().v4(),
                q()
        }
          , u = function(a) {
            a && (a = a.detail) && "clientsideuserid" === a.name && a.id === r && n()
        };
        (function() {
            a.plugins.waitForDependencies(["Storage"], function() {
                var a = ATInternet.Utils.uuid();
                r = parseInt(a.num(8));
                ATInternet.Utils.removeOptOutEvent(u);
                ATInternet.Utils.addOptOutEvent(r, u);
                n()
            })
        }
        )();
        a.clientSideUserId = {};
        a.clientSideUserId.set = function(a) {
            l || (f = a,
            c = !0,
            m = g.userIdStorageName,
            b = !1,
            q())
        }
        ;
        a.clientSideUserId.store = function() {
            b = c = !0;
            p()
        }
        ;
        a.clientSideUserId.get = function() {
            return f
        }
    }
    ;
    window.ATInternet.Tracker.addPlugin("ClientSideUserId");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "domainAttribution": true,
        "info": true
    };
    var dfltGlobalCfg = {
        "redirectionLifetime": 30
    };
    window.ATInternet.Tracker.Plugins.ContextVariables = function(a) {
        var g = "", k = null, e, d = "", l = "", h = {};
        a.configPlugin("ContextVariables", dfltPluginCfg || {}, function(a) {
            h = a
        });
        a.setConfig("redirectionLifetime", dfltGlobalCfg.redirectionLifetime, !0);
        var f = function(b, c, d) {
            var e = null;
            a.plugins.exec(b, c, d, function(a) {
                e = a
            });
            return e
        }
          , m = function(a, b) {
            return f("Utils", a, b)
        }
          , c = function(b, c) {
            var d = null;
            a.plugins.exec("Storage", b, c, function(a) {
                d = a
            });
            return d
        }
          , b = function() {
            a.setParam("hl", function() {
                var a = new Date;
                return a.getHours() + "x" + a.getMinutes() + "x" + a.getSeconds()
            }, {
                permanent: !0,
                hitType: ["all"]
            })
        }
          , r = function(a) {
            var b = "";
            e ? b = e : "acc_dir" === g ? b = "" : null !== g ? b = g : "acc_dir" === k ? b = "" : k ? b = k : a && (b = a.referrer);
            b && (b = b.replace(/[<>]/g, "").substring(0, 1600).replace(/&/g, "$"));
            return b
        };
        a.plugins.waitForDependencies(["Storage", "Utils"], function() {
            d = "set" + (h.domainAttribution ? "" : "Private");
            l = "get" + (h.domainAttribution ? "" : "Private");
            var f = m("getLocation", []);
            g = m("getQueryStringValue", ["xtref", f]);
            void 0 === g && (g = "");
            e = a.getContext("forcedReferer");
            if (a.getConfig("redirect")) {
                var f = m("getDocumentLevel", []), f = e ? e : null !== g ? g : f ? f.referrer : "acc_dir", q;
                if (q = f) {
                    q = {
                        path: "/",
                        end: a.getConfig("redirectionLifetime")
                    };
                    var n = c(l, ["atredir"]);
                    null !== n ? q = "object" === typeof n && !(n instanceof Array) : (c(d, ["atredir", {}, q]),
                    q = !0)
                }
                q && c(d, [["atredir", "ref"], f])
            } else {
                k = c(l, [["atredir", "ref"]]);
                c("del", [["atredir", "ref"]]);
                a.setParam("vtag", a.version, {
                    permanent: !0,
                    hitType: ["all"]
                });
                a.setParam("ptag", "js", {
                    permanent: !0,
                    hitType: ["all"]
                });
                f = "";
                try {
                    f += window.screen.width + "x" + window.screen.height + "x" + window.screen.pixelDepth + "x" + window.screen.colorDepth
                } catch (u) {}
                a.setParam("r", f, {
                    permanent: !0,
                    hitType: ["all"]
                });
                f = "";
                window.innerWidth ? f += window.innerWidth + "x" + window.innerHeight : document.body && document.body.offsetWidth && (f += document.body.offsetWidth + "x" + document.body.offsetHeight);
                a.setParam("re", f, {
                    permanent: !0,
                    hitType: ["all"]
                });
                b();
                window.navigator && a.setParam("lng", window.navigator.language || window.navigator.userLanguage, {
                    permanent: !0,
                    hitType: ["all"]
                });
                f = ATInternet.Utils.uuid().num(13);
                a.setParam("idp", f, {
                    permanent: !0,
                    hitType: ["page", "clickzone"]
                });
                window.navigator && a.setParam("jv", window.navigator.javaEnabled() ? "1" : "0", {
                    hitType: ["page"]
                });
                f = m("getDocumentLevel", []);
                a.setParam("ref", r(f), {
                    permanent: !0,
                    last: !0,
                    hitType: ["page"]
                })
            }
            a.emit("ContextVariables:Ready", {
                lvl: "INFO"
            })
        })
    }
    ;
    window.ATInternet.Tracker.addPlugin("ContextVariables");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "storageCapacity": 1,
        "storageMode": "required",
        "timeout": 500,
        "info": true
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.Offline = function(a) {
        var g = {};
        a.configPlugin("Offline", dfltPluginCfg || {}, function(a) {
            g = a
        });
        var k = function() {
            var a = localStorage.getItem("ATOffline")
              , b = {
                hits: [],
                length: 0
            };
            if (a) {
                var e = ATInternet.Utils.jsonParse(a) || {
                    hits: []
                };
                b.hits = e.hits;
                b.length = a.length
            }
            return b
        }
          , e = function(a) {
            try {
                localStorage.setItem("ATOffline", ATInternet.Utils.jsonSerialize(a))
            } catch (b) {}
        }
          , d = function() {
            return k().hits
        }
          , l = function(a) {
            if (a) {
                a = a.split(/&ref=\.*/i);
                var b = "&cn=offline&olt=" + String(Math.floor((new Date).getTime() / 1E3));
                a = a[0] + b + "&ref=" + (a[1] || "")
            }
            return a
        }
          , h = function(a) {
            var b = k()
              , d = a.length
              , f = !0;
            if (4 * ((b.length || 11) + d) > 1048576 * g.storageCapacity) {
                var f = !1
                  , h = b.hits.shift();
                if ("undefined" !== typeof h)
                    for (var f = !0, n = h.length; n < d; )
                        if (h = b.hits.shift(),
                        "undefined" !== typeof h)
                            n += h.length;
                        else {
                            f = !1;
                            break
                        }
            }
            f && (b.hits.push(a),
            e({
                hits: b.hits
            }))
        }
          , f = function(c, b) {
            if (window.navigator && window.navigator.onLine) {
                var r = d();
                if (0 < r.length) {
                    var p = r.shift();
                    e({
                        hits: r
                    });
                    a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        f(c, b)
                    }, !0);
                    a.onTrigger("Tracker:Hit:Sent:Error", function() {
                        f(c, b)
                    }, !0);
                    a.sendUrl(p)
                } else if (c) {
                    var m = null;
                    a.plugins.exec("Utils", "getQueryStringValue", ["a", c], function(a) {
                        m = a
                    });
                    m ? setTimeout(function() {
                        a.sendUrl(c, b)
                    }, g.timeout) : a.sendUrl(c, b)
                }
            } else
                c && (h(l(c)),
                b && b())
        }
          , m = function(c) {
            a.builder.sendUrl = function(a, e) {
                c || window.navigator && !window.navigator.onLine ? (h(l(a)),
                e && e()) : f(a, e)
            }
        };
        a.offline = {};
        a.offline.getLength = function() {
            return 4 * k().length
        }
        ;
        a.offline.remove = function() {
            e({
                hits: []
            })
        }
        ;
        a.offline.get = d;
        a.offline.send = function() {
            f(null, null)
        }
        ;
        a.plugins.waitForDependencies(["Utils"], function() {
            var c = ATInternet.Utils.isLocalStorageAvailable(), b;
            window.navigator && (b = window.navigator.onLine);
            c && "undefined" !== typeof b && ("required" === g.storageMode ? m(!1) : "always" === g.storageMode && m(!0));
            a.emit("Offline:Ready", {
                lvl: "INFO",
                details: {
                    isLocalStorageAvailable: c,
                    storageMode: g.storageMode,
                    isOnline: b
                }
            })
        })
    }
    ;
    window.ATInternet.Tracker.addPlugin("Offline");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "info": true
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.OnSiteAds = function(a) {
        var g = ""
          , k = function(b) {
            var c = b.name;
            a.exec("Utils", "manageChapters", [b, "chapter", 3], function(a) {
                c = a + (c ? c : "")
            });
            return c
        }
          , e = function(a, c) {
            return a[c] ? a[c] : ""
        }
          , d = function(a, c) {
            var d = e(a, c);
            if (d) {
                var f = e(a, "prefix");
                if (d.campaignId) {
                    var f = f || "PUB"
                      , g = e(d, "campaignId")
                      , h = e(d, "creation")
                      , m = e(d, "variant")
                      , l = e(d, "format")
                      , k = e(d, "generalPlacement")
                      , w = e(d, "detailedPlacement")
                      , y = e(d, "advertiserId")
                      , d = e(d, "url");
                    return f + "-" + g + "-" + h + "-" + m + "-" + l + "-" + k + "-" + w + "-" + y + "-" + d
                }
                if (d.adId)
                    return f = f || "INT",
                    g = e(d, "adId"),
                    h = e(d, "format"),
                    d = e(d, "productId"),
                    f + "-" + g + "-" + h + "||" + d
            }
            return ""
        }
          , l = function(b) {
            var c = ["onSiteAdsClick"]
              , e = a.getContext("page") || {}
              , f = {};
            f.atc = {
                value: d(b, "click"),
                options: {
                    truncate: !0
                }
            };
            f.type = "AT";
            f.patc = k(e);
            f.s2atc = e.level2 || "";
            if (e = b.customObject)
                e = a.processObject("stc", c, e),
                f.stc = {
                    value: ATInternet.Utils.jsonSerialize(e),
                    options: {
                        encode: !0
                    }
                };
            a.sendHit(f, [["hitType", c]], b.callback, null, !0)
        }
          , h = function(b) {
            var c = ["onSiteAdsImpression"]
              , e = {};
            e.ati = {
                value: d(b, "impression"),
                options: {
                    truncate: !0
                }
            };
            e.type = "AT";
            ATInternet.Utils.isPreview() && a.getConfig("preview") && (e.pvw = 1);
            var f = b.customObject;
            f && (f = a.processObject("stc", c, f),
            e.stc = {
                value: ATInternet.Utils.jsonSerialize(f),
                options: {
                    encode: !0
                }
            });
            a.manageSend(function() {
                a.sendHit(e, [["hitType", c]], b.callback, null, !0)
            })
        }
          , f = function(b, c) {
            var e = a.buffer.get("ati", !0) || {};
            e.value = "string" === typeof e.value ? [e.value] : e.value || [];
            e.options = e.options || {
                truncate: !0,
                hitType: [c, "page"]
            };
            e.value.push(b);
            a.buffer.set("ati", e.value, e.options)
        }
          , m = function(b, c) {
            b.click ? a.setParam("atc", d(b, "click"), {
                truncate: !0,
                hitType: [c, "page"]
            }) : b.impression && a.setParam("ati", d(b, "impression"), {
                truncate: !0,
                hitType: [c, "page"]
            });
            if (b.customObject) {
                a.setContext("onsiteads", {
                    customObject: b.customObject
                });
                var e = a.getContext("page") || {};
                e.customObject = ATInternet.Utils.completeFstLevelObj(e.customObject, b.customObject, !1);
                a.setContext("page", e)
            }
            a.dispatchSubscribe("onSiteAds")
        };
        a.selfPromotion = this.selfPromotion = {};
        a.publisher = this.publisher = {};
        a.publisher.set = this.publisher.set = function(a) {
            m(a, "publisher")
        }
        ;
        a.selfPromotion.set = this.selfPromotion.set = function(a) {
            m(a, "selfPromotion")
        }
        ;
        a.publisher.add = this.publisher.add = function(b) {
            f(d(b, "impression"), "publisher");
            a.dispatchSubscribe("onSiteAds")
        }
        ;
        a.selfPromotion.add = this.selfPromotion.add = function(b) {
            f(d(b, "impression"), "selfPromotion");
            a.dispatchSubscribe("onSiteAds")
        }
        ;
        var c = this.advertEvent = function(b) {
            var c = !0;
            a.exec("TechClicks", "manageClick", [b.elem, b.event], function(a) {
                c = a
            });
            b.click ? l(b) : b.impression && h(b);
            return c
        }
        ;
        a.publisher.send = this.publisher.send = function(a) {
            return c(a)
        }
        ;
        a.selfPromotion.send = this.selfPromotion.send = function(a) {
            return c(a)
        }
        ;
        a.onSiteAds = {};
        a.onSiteAds.onDispatch = this.onDispatch = function(b) {
            if (!a.dispatchSubscribed("page")) {
                a.setParam("type", "AT", {
                    hitType: ["publisher", "selfPromotion"]
                });
                var c = a.getContext("page") || {};
                a.getParam("atc") && (a.setParam("patc", k(c), {
                    hitType: ["publisher", "selfPromotion"]
                }),
                a.setParam("s2atc", c.level2 || "", {
                    hitType: ["publisher", "selfPromotion"]
                }));
                ATInternet.Utils.isPreview() && a.getConfig("preview") && a.setParam("pvw", 1);
                c = (a.getContext("onsiteads") || {}).customObject;
                a.processObjectAndSendHit("stc", ["publisher", "selfPromotion"], c, b)
            }
        }
        ;
        a.plugins.waitForDependencies(["Utils", "TechClicks"], function() {
            g = document.location.href;
            a.plugins.exec("Utils", "getQueryStringValue", ["xtatc", g], function(b) {
                b && a.setParam("atc", b, {
                    hitType: ["publisher", "selfPromotion", "page"]
                })
            });
            a.emit("OnSiteAds:Ready", {
                lvl: "INFO",
                details: {
                    href: g
                }
            })
        })
    }
    ;
    window.ATInternet.Tracker.addPlugin("OnSiteAds");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "info": true
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.Page = function(a) {
        var g = ["pageId", "chapterLabel", "update"]
          , k = ["pid", "pchap", "pidt"]
          , e = ["page", "site"]
          , d = ["f", "x"]
          , l = function(b) {
            var c = b.name;
            a.exec("Utils", "manageChapters", [b, "chapter", 3], function(a) {
                c = a + (c ? c : "")
            });
            return c
        }
          , h = function(a, b, c) {
            b ? a = b : a || "undefined" === typeof c || (a = c);
            return a
        }
          , f = function(a, b, c) {
            b.hasOwnProperty(c) && (a[c] = h(a[c], b[c]))
        }
          , m = function(b) {
            if (!ATInternet.Utils.isPreview() || a.getConfig("preview"))
                ATInternet.Utils.isPrerender(function(a) {
                    b(a)
                }) || b()
        }
          , c = function(b, c, f) {
            if (c)
                for (var g = 0; g < e.length; g++)
                    if (c.hasOwnProperty(e[g]) && c[e[g]])
                        for (var h in c[e[g]])
                            c[e[g]].hasOwnProperty(h) && (f ? b[d[g] + h] = c[e[g]][h] : a.setParam(d[g] + h, c[e[g]][h]))
        }
          , b = function(b, c, e) {
            if (c) {
                a.exec("Utils", "manageChapters", [c, "chapter", 3], function(a) {
                    a && (c.chapterLabel = a.replace(/::$/gi, ""))
                });
                for (var d = 0; d < k.length; d++)
                    c.hasOwnProperty(g[d]) && (e ? b[k[d]] = c[g[d]] : a.setParam(k[d], c[g[d]]))
            }
        }
          , r = function(b, c, e) {
            if (c && c.keywords instanceof Array) {
                var d = c.keywords.length;
                if (0 < d) {
                    for (var f = "", g = 0; g < d; g++)
                        f += "[" + c.keywords[g] + "]" + (g < d - 1 ? "|" : "");
                    e ? b.tag = f : a.setParam("tag", f)
                }
            }
        }
          , p = function(b, c, e) {
            if (c) {
                var d, f = function(a) {
                    return a ? a : "0"
                };
                d = "" + (f(c.category1) + "-");
                d += f(c.category2) + "-";
                d += f(c.category3);
                e ? b.ptype = d : a.setParam("ptype", d)
            }
        }
          , q = function(b, c, e) {
            if (c)
                for (var d in c)
                    c.hasOwnProperty(d) && "undefined" !== typeof c[d] && (e ? b[d] = c[d] : a.setParam(d, c[d]))
        };
        a.customVars = this.customVars = {};
        a.customVars.set = this.customVars.set = function(b) {
            var c = a.getContext("page") || {}
              , d = c.customVars;
            if (d) {
                if (b)
                    for (var e in b)
                        b.hasOwnProperty(e) && (d[e] = ATInternet.Utils.completeFstLevelObj(d[e], b[e], !0))
            } else
                d = b;
            c.customVars = d;
            a.setContext("page", c)
        }
        ;
        a.dynamicLabel = this.dynamicLabel = {};
        a.dynamicLabel.set = this.dynamicLabel.set = function(b) {
            var c = a.getContext("page") || {};
            c.dynamicLabel = ATInternet.Utils.completeFstLevelObj(c.dynamicLabel, b, !0);
            a.setContext("page", c)
        }
        ;
        a.tags = this.tags = {};
        a.tags.set = this.tags.set = function(b) {
            var c = a.getContext("page") || {};
            c.tags = ATInternet.Utils.completeFstLevelObj(c.tags, b, !0);
            a.setContext("page", c)
        }
        ;
        a.customTreeStructure = this.customTreeStructure = {};
        a.customTreeStructure.set = this.customTreeStructure.set = function(b) {
            var c = a.getContext("page") || {};
            c.customTreeStructure = ATInternet.Utils.completeFstLevelObj(c.customTreeStructure, b, !0);
            a.setContext("page", c)
        }
        ;
        a.page = {};
        a.page.reset = this.reset = function() {
            a.setContext("page", void 0)
        }
        ;
        a.page.set = this.set = function(b) {
            a.dispatchSubscribe("page");
            var c = a.getContext("page") || {};
            c.name = h(c.name, b.name, "");
            c.level2 = h(c.level2, b.level2, "");
            f(c, b, "chapter1");
            f(c, b, "chapter2");
            f(c, b, "chapter3");
            c.customObject = ATInternet.Utils.completeFstLevelObj(c.customObject, b.customObject, !0);
            a.setContext("page", c)
        }
        ;
        a.page.send = this.send = function(d) {
            var e = {
                p: l(d),
                s2: d.level2 || ""
            }
              , g = !0
              , k = d.customObject;
            k && (k = a.processObject("stc", ["page"], k),
            a.exec("Utils", "customObjectToString", [k], function(a) {
                e.stc = a
            }));
            k = a.getContext("page") || {};
            k.vrn && (e.vrn = k.vrn,
            k.vrn = void 0,
            a.setContext("page", k));
            var t = a.getContext("InternalSearch") || {};
            "undefined" !== typeof t.keyword && (e.mc = ATInternet.Utils.cloneSimpleObject(t.keyword),
            "undefined" !== typeof t.resultPageNumber && (e.np = ATInternet.Utils.cloneSimpleObject(t.resultPageNumber)),
            a.setContext("InternalSearch", void 0));
            ATInternet.Utils.isPreview() && a.getConfig("preview") && (e.pvw = 1);
            c(e, d.customVars, !0);
            b(e, d.dynamicLabel, !0);
            r(e, d.tags, !0);
            p(e, d.customTreeStructure, !0);
            t = a.getContext("campaigns") || {};
            q(e, t, !0);
            a.setContext("campaigns", void 0);
            a.exec("TechClicks", "manageClick", [d.elem, d.event], function(a) {
                g = a
            });
            m(function() {
                a.sendHit(e, null, d.callback)
            });
            k.name = h(k.name, d.name, "");
            k.level2 = h(k.level2, d.level2, "");
            f(k, d, "chapter1");
            f(k, d, "chapter2");
            f(k, d, "chapter3");
            a.setContext("page", k);
            return g
        }
        ;
        a.page.onDispatch = this.onDispatch = function(d) {
            var e = a.getContext("page") || {}
              , f = a.getContext("InternalSearch") || {};
            a.setParam("p", l(e));
            a.setParam("s2", e.level2 || "");
            e.vrn && (a.setParam("vrn", e.vrn),
            e.vrn = void 0,
            a.setContext("page", e));
            "undefined" !== typeof f.keyword && (a.setParam("mc", ATInternet.Utils.cloneSimpleObject(f.keyword)),
            "undefined" !== typeof f.resultPageNumber && a.setParam("np", ATInternet.Utils.cloneSimpleObject(f.resultPageNumber)),
            a.setContext("InternalSearch", void 0));
            ATInternet.Utils.isPreview() && a.getConfig("preview") && a.setParam("pvw", 1);
            c(null, e.customVars, !1);
            b(null, e.dynamicLabel, !1);
            r(null, e.tags, !1);
            p(null, e.customTreeStructure, !1);
            f = a.getContext("campaigns") || {};
            q(null, f, !1);
            a.setContext("campaigns", void 0);
            a.processObjectAndSendHit("stc", ["page"], e.customObject, d)
        }
    }
    ;
    window.ATInternet.Tracker.addPlugin("Page");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "info": true
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.RichMedia = function(a) {
        var g = function(a, b) {
            var e = parseInt(a, 10);
            return e ? Math.max(e, b) : 0
        }
          , k = new function() {
            this.timeout = {};
            this.setTimeout = function(c, b, e) {
                this.timeout[c] = this.timeout[c] || {};
                this.timeout[c][b] && window.clearTimeout(this.timeout[c][b]);
                this.timeout[c][b] = window.setTimeout(function() {
                    a.richMedia.send({
                        action: "refresh",
                        playerId: c,
                        mediaLabel: b
                    })
                }, 1E3 * e)
            }
            ;
            this.setTimeoutObject = function(c, b, d) {
                this.timeout[c] = this.timeout[c] || {};
                if ("undefined" === typeof this.timeout[c][b]) {
                    var f = [], h;
                    for (h in d)
                        d.hasOwnProperty(h) && f.push({
                            delay: g(h, 0),
                            refresh: g(d[h], 5)
                        });
                    f.sort(function(a, b) {
                        return a.delay < b.delay ? -1 : a.delay > b.delay ? 1 : 0
                    });
                    this.timeout[c][b] = {
                        refreshTab: f,
                        backupRefreshTab: ATInternet.Utils.cloneSimpleObject(f),
                        delayConfiguration: {}
                    }
                }
                d = this.timeout[c][b];
                if (0 < d.refreshTab.length && (f = d.refreshTab[0].delay,
                h = d.refreshTab[0].refresh,
                "number" === typeof f && "number" === typeof h && 0 < h)) {
                    d.delayConfiguration[f] = d.delayConfiguration[f] || {};
                    var m = void 0;
                    "undefined" !== typeof d.refreshTab[1] && (m = d.refreshTab[1].delay);
                    var l = 0;
                    "undefined" === typeof m ? l = 1 : "number" === typeof d.delayConfiguration[f].number ? l = "refresh" === e.getMediaValue(c, b, "a") ? Math.max(d.delayConfiguration[f].number - 1, 0) : d.delayConfiguration[f].number : "number" === typeof m && (l = Math.floor(60 * (m - f) / h) - 1);
                    d.delayConfiguration[f].number = l;
                    d.delayConfiguration[f].timeout && window.clearTimeout(d.delayConfiguration[f].timeout);
                    0 < l ? d.delayConfiguration[f].timeout = window.setTimeout(function() {
                        a.richMedia.send({
                            action: "refresh",
                            playerId: c,
                            mediaLabel: b
                        })
                    }, 1E3 * h) : (d.delayConfiguration[f].number = void 0,
                    d.delayConfiguration[f].timeout = void 0,
                    d.refreshTab.splice(0, 1),
                    window.setTimeout(function() {
                        a.richMedia.send({
                            action: "refresh",
                            playerId: c,
                            mediaLabel: b
                        })
                    }, 1E3 * h));
                    this.timeout[c][b] = d
                }
            }
            ;
            this.clearTimeout = function(a, b, d) {
                this.timeout[a] = this.timeout[a] || {};
                var e = this.timeout[a][b];
                if ("object" === typeof e) {
                    if ("object" === typeof e.delayConfiguration) {
                        var f, g;
                        for (g in e.delayConfiguration)
                            e.delayConfiguration.hasOwnProperty(g) && (f = e.delayConfiguration[g].number,
                            "undefined" !== typeof f && 0 < f && (e.delayConfiguration[g].timeout && window.clearTimeout(e.delayConfiguration[g].timeout),
                            e.delayConfiguration[g].timeout = void 0));
                        d && (e.refreshTab = ATInternet.Utils.cloneSimpleObject(e.backupRefreshTab));
                        this.timeout[a][b] = e
                    }
                } else
                    e && window.clearTimeout(e)
            }
            ;
            this.removePlayer = function(c) {
                for (var b in this.timeout[c])
                    if (this.timeout[c].hasOwnProperty(b)) {
                        this.clearTimeout(c, b, !1);
                        var d = e.getMediaValue(c, b, "a");
                        "undefined" !== typeof this.timeout[c][b] && "stop" !== d && a.richMedia.send({
                            action: "stop",
                            playerId: c,
                            mediaLabel: b
                        })
                    }
                this.timeout[c] = {}
            }
            ;
            this.removeAll = function() {
                for (var a in this.timeout)
                    this.timeout.hasOwnProperty(a) && this.removePlayer(a);
                this.timeout = {}
            }
        }
          , e = new function() {
            this.media = function() {
                this.type = void 0;
                this.plyr = 0;
                this.clnk = this.s2 = void 0;
                this.p = "";
                this.m9 = this.m6 = this.m5 = this.m1 = this.rfsh = this.buf = this.a = void 0
            }
            ;
            this.mediaAll = {};
            this.setMediaValue = function(a, b, d, e) {
                "undefined" !== typeof e && (this.mediaAll[a] = this.mediaAll[a] || {},
                this.mediaAll[a][b] = this.mediaAll[a][b] || new this.media,
                this.mediaAll[a][b][d] = e)
            }
            ;
            this.getMediaValue = function(a, b, d) {
                if (this.mediaAll[a] && this.mediaAll[a][b])
                    return this.mediaAll[a][b][d]
            }
            ;
            this.removePlayer = function(a) {
                this.mediaAll[a] = {}
            }
            ;
            this.removeAll = function() {
                this.mediaAll = {}
            }
        }
          , d = function(c, b, d) {
            var e = c[d] || "";
            a.exec("Utils", "manageChapters", [c, b, 3], function(a) {
                e = a + e
            });
            return e
        }
          , l = function(a, b, d, e) {
            var f = a[b];
            "boolean" === typeof a[b] && (f = a[b] ? e : d);
            return f
        }
          , h = function(a) {
            var b = 0;
            /^(\-|\+)?([0-9]+)$/.test(a) && (b = Number(a));
            return b
        }
          , f = function(a, b, d, f, g) {
            b = e.getMediaValue(b, d, f);
            "undefined" !== typeof b && (a[f] = g ? encodeURIComponent(b) : b)
        }
          , m = function(a, b, d) {
            "undefined" !== typeof d && (a[b] = d)
        };
        a.richMedia = {};
        a.richMedia.add = function(a) {
            a = a || {};
            var b = h(a.playerId)
              , f = d(a, "mediaTheme", "mediaLabel")
              , g = l(a, "isEmbedded", "int", "ext");
            e.setMediaValue(b, f, "plyr", b);
            e.setMediaValue(b, f, "type", a.mediaType);
            e.setMediaValue(b, f, "s2", a.mediaLevel2);
            e.setMediaValue(b, f, "p", f);
            e.setMediaValue(b, f, "clnk", a.linkedContent || a.previousMedia);
            e.setMediaValue(b, f, "a", a.action);
            e.setMediaValue(b, f, "rfsh", a.refreshDuration);
            e.setMediaValue(b, f, "m1", a.duration);
            e.setMediaValue(b, f, "m5", g);
            e.setMediaValue(b, f, "m6", a.broadcastMode);
            e.setMediaValue(b, f, "m9", a.webdomain)
        }
        ;
        a.richMedia.send = function(c) {
            c = c || {};
            var b = h(c.playerId)
              , r = d(c, "mediaTheme", "mediaLabel")
              , p = c.action;
            e.setMediaValue(b, r, "a", p);
            var q = {
                plyr: b,
                p: r
            };
            f(q, b, r, "a", !1);
            f(q, b, r, "type", !1);
            f(q, b, r, "s2", !1);
            f(q, b, r, "m1", !1);
            f(q, b, r, "m5", !1);
            f(q, b, r, "m6", !1);
            if ("play" === p || "info" === p) {
                c = l(c, "isBuffering", "0", "1");
                var n = a.getContext("page") || {}
                  , u = d(n, "chapter", "name") || void 0
                  , n = n.level2 || void 0;
                m(q, "buf", c);
                m(q, "prich", u);
                m(q, "s2rich", n);
                f(q, b, r, "clnk", !1);
                f(q, b, r, "m9", !0)
            }
            a.sendHit(q, [["hitType", ["richmedia"]]]);
            "pause" === p ? k.clearTimeout(b, r, !1) : "stop" === p && k.clearTimeout(b, r, !0);
            if ("play" === p || "refresh" === p)
                p = e.getMediaValue(b, r, "rfsh"),
                "object" === typeof p && null !== p ? k.setTimeoutObject(b, r, p) : (p = g(p, 5),
                0 !== p && k.setTimeout(b, r, p))
        }
        ;
        a.richMedia.remove = function(a) {
            k.removePlayer(a);
            e.removePlayer(a)
        }
        ;
        a.richMedia.removeAll = function() {
            k.removeAll();
            e.removeAll()
        }
    }
    ;
    window.ATInternet.Tracker.addPlugin("RichMedia");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "storageMode": "cookie",
        "info": false
    };
    var dfltGlobalCfg = {};
    ATInternet.Tracker.Plugins.Cookies = ATInternet.Tracker.Plugins.Storage = function(a) {
        var g = this
          , k = {}
          , e = !1
          , d = null;
        a.configPlugin("Storage", dfltPluginCfg || {}, function(a) {
            k = a;
            "localStorage" === k.storageMode && (e = ATInternet.Utils.isLocalStorageAvailable())
        });
        var l = {}
          , h = function(b) {
            return a.getConfig("base64Storage") ? ATInternet.Utils.Base64.encode(b) : encodeURIComponent(b)
        }
          , f = function(b) {
            return a.getConfig("base64Storage") ? ATInternet.Utils.Base64.decode(b) : decodeURIComponent(b)
        }
          , m = function() {
            this.getData = function(a) {
                var b = null;
                (a = RegExp("(?:^| )" + a + "=([^;]+)").exec(document.cookie) || null) && (b = f(a[1]));
                return b
            }
            ;
            this.setData = function(b) {
                var c = !1;
                if (b.name && "string" === typeof b.name) {
                    var d = b.options || {}
                      , e = d.end || {}
                      , f = d.domain || a.getConfig("cookieDomain")
                      , g = d.secure || a.getConfig("cookieSecure")
                      , l = ATInternet.Utils.jsonSerialize(b)
                      , l = b.name + "=" + h(l)
                      , l = l + (d.path && "string" === typeof d.path ? ";path=" + d.path : "")
                      , l = l + (f && "string" === typeof f ? ";domain=" + f : "") + (g && "boolean" === typeof g ? ";secure" : "");
                    "function" === typeof e.toUTCString ? l += ";expires=" + e.toUTCString() : "number" === typeof e && (l += ";max-age=" + e.toString());
                    document.cookie = l;
                    this.getData(b.name) && (c = !0)
                }
                return c
            }
        };
        d = e ? new function() {
            var a = function(a) {
                var b = +new Date, c = !1, d;
                a.options && ("undefined" !== typeof a.options.expires ? d = a.options.expires : (a = a.options.end || {},
                "function" === typeof a.getTime ? d = a.getTime() : "number" === typeof a && (d = b + 1E3 * a)));
                "number" === typeof d && b >= d && (c = !0);
                return {
                    itemToDelete: c,
                    timestamp: d
                }
            }
              , b = function(a) {
                var b = !1;
                try {
                    localStorage.removeItem(a),
                    b = !0
                } catch (c) {}
                return b
            };
            this.getData = function(c) {
                var d = null
                  , e = localStorage.getItem(c);
                e && (d = f(e),
                (e = ATInternet.Utils.jsonParse(d)) && "object" === typeof e && (a(e).itemToDelete && b(c) ? d = null : (delete e.options.expires,
                d = ATInternet.Utils.jsonSerialize(e))));
                return d
            }
            ;
            this.setData = function(c) {
                var d = !1;
                if (c.name && "string" === typeof c.name) {
                    var e = a(c);
                    "number" === typeof e.timestamp && (c.options.expires = e.timestamp);
                    var f = ATInternet.Utils.jsonSerialize(c);
                    if (e.itemToDelete)
                        d = b(c.name);
                    else
                        try {
                            localStorage.setItem(c.name, h(f)),
                            d = !0
                        } catch (g) {}
                }
                return d
            }
        }
        : new m;
        var c = function(b, c) {
            var e = !1;
            !ATInternet.Utils.consent && !c || a.getConfig("disableCookie") || a.getConfig("disableStorage") || !b || "object" !== typeof b || (e = d.setData(b));
            return e
        }
          , b = function(a, b, c) {
            a = {
                name: a,
                val: b
            };
            c && c.session && "number" === typeof c.session && (c.end = c.session);
            a.options = c || {};
            return a
        }
          , r = function(b) {
            var c = null
              , e = null;
            a.getConfig("disableCookie") || a.getConfig("disableStorage") || !b || "string" !== typeof b || (e = d.getData(b));
            (b = e) && (c = ATInternet.Utils.jsonParse(b));
            return c
        }
          , p = function(a, b) {
            var d = ATInternet.Utils.cloneSimpleObject(a);
            return c(d, b) ? ATInternet.Utils.jsonParse(ATInternet.Utils.jsonSerialize(a)) : null
        }
          , q = function(a, b, c) {
            if (!c && l[a])
                c = l[a];
            else if (c = r(a))
                c.options = c.options || {},
                c.options.session && "number" === typeof c.options.session && (c.options.end = c.options.session,
                p(c, !1)),
                l[a] = c;
            return c ? b ? (a = null,
            !c || "object" !== typeof c.val || c.val instanceof Array || void 0 === c.val[b] || (a = c.val[b]),
            a) : c.val : null
        }
          , n = function(a, c, d, e, f) {
            if (c) {
                if (f = r(a))
                    !f || "object" !== typeof f.val || f.val instanceof Array ? f = null : "undefined" === typeof d ? delete f.val[c] : f.val[c] = d,
                    f && (f = p(f, e))
            } else
                f = f || {},
                f = b(a, d, f),
                f = p(f, e);
            return f ? (l[a] = f,
            f.val) : null
        }
          , u = function(a, d) {
            if (d)
                n(a, d, void 0, !1, null);
            else {
                l[a] = void 0;
                var e = b(a, "", {
                    end: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
                    path: "/"
                });
                c(e, !1)
            }
        };
        a.storage = {};
        a.storage.get = g.get = function(a, b) {
            b = !!b;
            return a instanceof Array ? q(a[0], a[1], b) : q(a, "", b)
        }
        ;
        a.storage.getPrivate = g.getPrivate = function(b, c) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            return g.get(b, c)
        }
        ;
        a.storage.set = g.set = function(a, b, c, d) {
            return a instanceof Array ? n(a[0], a[1], b, d, null) : n(a, null, b, d, c)
        }
        ;
        a.storage.setPrivate = g.setPrivate = function(b, c, d) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            return g.set(b, c, d)
        }
        ;
        a.storage.del = g.del = function(a) {
            a instanceof Array ? u(a[0], a[1]) : u(a, "")
        }
        ;
        a.storage.delPrivate = g.delPrivate = function(b) {
            b instanceof Array ? b[0] += a.getConfig("site") : b += a.getConfig("site");
            g.del(b)
        }
        ;
        a.storage.cacheInvalidation = g.cacheInvalidation = function() {
            l = {}
        }
    }
    ;
    ATInternet.Tracker.addPlugin("Storage");
    ATInternet.Tracker.addPlugin("Cookies");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "clicksAutoManagementEnabled": true,
        "clicksAutoManagementTimeout": 500,
        "info": false
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.TechClicks = function(a) {
        var g = this, k, e;
        a.configPlugin("TechClicks", dfltPluginCfg || {}, function(a) {
            k = a.clicksAutoManagementEnabled;
            e = a.clicksAutoManagementTimeout
        });
        g.deactivateAutoManagement = function() {
            k = !1
        }
        ;
        var d = function(a) {
            switch (a.target) {
            case "_top":
                window.top.location.href = a.url;
                break;
            case "_parent":
                window.parent.location.href = a.url;
                break;
            default:
                window.location.href = a.url
            }
        }
          , l = function(a) {
            var c = a.timeout;
            a.mailto ? g.timeout = setTimeout(function() {
                window.location.href = a.mailto
            }, c) : a.form ? g.timeout = setTimeout(function() {
                a.form.submit()
            }, c) : a.url && (g.timeout = setTimeout(function() {
                d({
                    url: a.url,
                    target: a.target
                })
            }, c))
        }
          , h = function(b) {
            for (var c, f = "_self", h = b.timeoutonly; b; ) {
                if (b.href && 0 === b.href.indexOf("http")) {
                    c = b.href.split('"').join('\\"');
                    f = b.target ? b.target : f;
                    break
                }
                b = b.parentNode
            }
            if (c) {
                if (!h)
                    a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        g.timeout && clearTimeout(g.timeout);
                        d({
                            url: c,
                            target: f
                        })
                    });
                l({
                    url: c,
                    target: f,
                    timeout: e
                })
            }
        }
          , f = function(b) {
            var c = b;
            for (b = c.timeoutonly; c && "FORM" !== c.nodeName; )
                c = c.parentNode;
            if (c) {
                if (!b)
                    a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        g.timeout && clearTimeout(g.timeout);
                        c.submit()
                    });
                l({
                    form: c,
                    timeout: e
                })
            }
        }
          , m = function(b) {
            var c = b;
            for (b = c.timeoutonly; c && !(c.href && 0 <= c.href.indexOf("mailto:")); )
                c = c.parentNode;
            if (c) {
                if (!b)
                    a.onTrigger("Tracker:Hit:Sent:Ok", function() {
                        g.timeout && clearTimeout(g.timeout);
                        window.location.href = c.href
                    });
                l({
                    mailto: c.href,
                    timeout: e
                })
            }
        }
          , c = function(a) {
            for (; a; ) {
                if (a.href) {
                    if (0 <= a.href.indexOf("mailto:"))
                        return "mailto";
                    if (0 === a.href.indexOf("http"))
                        return "redirection"
                } else if ("FORM" === a.nodeName)
                    return "form";
                a = a.parentNode
            }
            return ""
        };
        g.manageClick = function(a, d) {
            var e = !0;
            if (k && a) {
                var g;
                a: {
                    for (g = a; g; ) {
                        if ("function" === typeof g.getAttribute && ("_blank" === g.getAttribute("target") || "no" === g.getAttribute("data-atclickmanagement"))) {
                            g = !0;
                            break a
                        }
                        g = g.parentNode
                    }
                    g = a;
                    for (var l = window.location.href, u; g; ) {
                        if ((u = g.href) && 0 <= u.indexOf("#") && l.substring(0, 0 <= l.indexOf("#") ? l.indexOf("#") : l.length) === u.substring(0, u.indexOf("#"))) {
                            g = !0;
                            break a
                        }
                        g = g.parentNode
                    }
                    g = !1
                }
                l = c(a);
                if (!g && l)
                    switch (l) {
                    case "mailto":
                        m(a);
                        e = !1;
                        break;
                    case "form":
                        f(a);
                        e = !1;
                        break;
                    case "redirection":
                        h(a),
                        e = !1
                    }
            }
            d && (g = d.defaultPrevented,
            "function" === typeof d.isDefaultPrevented && (g = d.isDefaultPrevented()),
            g || d.preventDefault && d.preventDefault());
            return e
        }
    }
    ;
    window.ATInternet.Tracker.addPlugin("TechClicks");
}
).call(window);
;(function() {
    var dfltPluginCfg = {
        "info": false
    };
    var dfltGlobalCfg = {};
    window.ATInternet.Tracker.Plugins.Utils = function(a) {
        var g = this
          , k = {};
        g.getQueryStringValue = function(a, d) {
            var e = window.ATInternet.Utils.hashcode(d).toString();
            if (!k[e]) {
                k[e] = {};
                var g = RegExp("[&#?]{1}([^&=#?]*)=([^&#]*)?", "g")
                  , c = g.exec(d);
                if (null !== c)
                    for (; null !== c; )
                        k[e][c[1]] = c[2],
                        c = g.exec(d)
            }
            return k[e].hasOwnProperty(a) ? k[e][a] : null
        }
        ;
        g.customObjectToString = function(a) {
            return encodeURIComponent(window.ATInternet.Utils.jsonSerialize(a))
        }
        ;
        g.manageChapters = function(d, e, f) {
            var g = a.getConfig("ignoreEmptyChapterValue")
              , c = "";
            if (d) {
                f = parseInt(f, 10);
                for (var b = 1; b < f + 1; b++)
                    var k = d[e + b] || ""
                      , c = g ? c + (k ? k + "::" : "") : c + (d.hasOwnProperty(e + b) ? k + "::" : "")
            }
            return c
        }
        ;
        g.getDocumentLevel = function() {
            var d = a.getConfig("documentLevel");
            if (0 > d.indexOf("."))
                return window[d] || document;
            d = d.split(".");
            return window[d[0]][d[1]] || document
        }
        ;
        g.getLocation = function() {
            return g.getDocumentLevel().location.href
        }
        ;
        a.dispatchIndex = {};
        a.dispatchStack = [];
        a.dispatchEventFor = {};
        var e = 0;
        a.dispatchSubscribe = function(d) {
            return a.dispatchIndex[d] ? !1 : (a.dispatchStack.push(d),
            a.dispatchIndex[d] = !0)
        }
        ;
        a.dispatchSubscribed = function(d) {
            return !0 === a.dispatchIndex[d]
        }
        ;
        a.addSpecificDispatchEventFor = function(d) {
            return a.dispatchEventFor[d] ? !1 : (a.dispatchEventFor[d] = !0,
            e++,
            !0)
        }
        ;
        a.processSpecificDispatchEventFor = function(d) {
            a.dispatchEventFor[d] && (a.dispatchEventFor[d] = !1,
            e--,
            0 === e && (a.dispatchEventFor = {},
            a.emit("Tracker:Plugin:SpecificEvent:Exec:Complete", {
                lvl: "INFO"
            })))
        }
        ;
        a.dispatch = function(d) {
            var g = function() {
                for (var e = "", c = null; 0 < a.dispatchStack.length; )
                    e = a.dispatchStack.pop(),
                    0 === a.dispatchStack.length && (c = d),
                    a[e].onDispatch(c);
                a.dispatchIndex = {};
                a.delContext(void 0, "customObject")
            }
              , f = function() {
                if (a.plugins.isExecWaitingLazyloading())
                    a.onTrigger("Tracker:Plugin:Lazyload:Exec:Complete", function() {
                        g()
                    }, !0);
                else
                    g()
            };
            if (0 === e)
                f();
            else
                a.onTrigger("Tracker:Plugin:SpecificEvent:Exec:Complete", function() {
                    f()
                }, !0)
        }
        ;
        a.dispatchRedirect = function(d) {
            var e = !0
              , f = null;
            d && (d.elem && (d.elem.timeoutonly = !0,
            a.plugins.exec("TechClicks", "manageClick", [d.elem, d.event], function(a) {
                e = a
            })),
            f = d.callback);
            a.dispatch(f);
            return e
        }
        ;
        var d = a.manageSend = function(d) {
            if (!ATInternet.Utils.isPreview() || a.getConfig("preview"))
                ATInternet.Utils.isPrerender(function(a) {
                    d(a)
                }) || d()
        }
        ;
        a.processObject = function(d, e, f) {
            if ((d = a.getParam(d, !0)) && d.options.permanent) {
                for (var g = !1, c = d.options.hitType || [], b = 0; b < c.length; b++)
                    if (-1 !== ATInternet.Utils.arrayIndexOf(e.concat("all"), c[b])) {
                        g = !0;
                        break
                    }
                g && (f = ATInternet.Utils.completeFstLevelObj(d.value || {}, f, !0))
            }
            return f
        }
        ;
        a.processObjectAndSendHit = function(e, g, f, k) {
            if (f) {
                var c = a.getParam(e, !0);
                if (c) {
                    for (var b = !1, r = c.options.hitType || [], p = 0; p < r.length; p++)
                        if (-1 !== ATInternet.Utils.arrayIndexOf(g.concat("all"), r[p])) {
                            b = !0;
                            break
                        }
                    b ? (b = ATInternet.Utils.cloneSimpleObject(c),
                    b.value = ATInternet.Utils.completeFstLevelObj(b.value || {}, f, !0),
                    a.setParam(e, b.value, {
                        encode: !0,
                        hitType: g
                    }),
                    d(function() {
                        a.sendHit(null, [["hitType", g]], k)
                    }),
                    c.options.permanent && a.setParam(e, c.value, c.options)) : (a.setParam(e, f, {
                        encode: !0,
                        hitType: g
                    }),
                    d(function() {
                        a.sendHit(null, [["hitType", g]], k)
                    }),
                    a.setParam(e, c.value, c.options))
                } else
                    a.setParam(e, f, {
                        encode: !0,
                        hitType: g
                    }),
                    d(function() {
                        a.sendHit(null, [["hitType", g]], k)
                    })
            } else
                d(function() {
                    a.sendHit(null, [["hitType", g]], k)
                })
        }
    }
    ;
    window.ATInternet.Tracker.addPlugin("Utils");
}
).call(window);
if (typeof window.ATInternet.onTrackerLoad === 'function') {
    window.ATInternet.onTrackerLoad();
}
