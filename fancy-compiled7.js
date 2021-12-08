(function () {
  /*

   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
  var h, aa = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? {
          done: !1,
          value: a[b++]
        } : {
          done: !0
        }
      }
    },
    ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
      if (a == Array.prototype || a == Object.prototype) return a;
      a[b] = c.value;
      return a
    },
    da = function (a) {
      a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
      }
      throw Error("Cannot find global object");
    },
    ea = da(this),
    fa = function (a, b) {
      if (b) a: {
        var c = ea;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
          configurable: !0,
          writable: !0,
          value: b
        })
      }
    };
  fa("Symbol", function (a) {
    if (a) return a;
    var b = function (f, g) {
      this.Ff = f;
      ba(this, "description", {
        configurable: !0,
        writable: !0,
        value: g
      })
    };
    b.prototype.toString = function () {
      return this.Ff
    };
    var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
      d = 0,
      e = function (f) {
        if (this instanceof e) throw new TypeError("Symbol is not a constructor");
        return new b(c + (f || "") + "_" + d++, f)
      };
    return e
  });
  fa("Symbol.iterator", function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
      var d = ea[b[c]];
      "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
          return ha(aa(this))
        }
      })
    }
    return a
  });
  var ha = function (a) {
      a = {
        next: a
      };
      a[Symbol.iterator] = function () {
        return this
      };
      return a
    },
    n = function (a) {
      var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : {
        next: aa(a)
      }
    },
    ia = function (a) {
      for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
      return c
    },
    ja = "function" == typeof Object.create ? Object.create : function (a) {
      var b = function () {};
      b.prototype = a;
      return new b
    },
    ka;
  if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;
  else {
    var la;
    a: {
      var ma = {
          a: !0
        },
        na = {};
      try {
        na.__proto__ = ma;
        la = na.a;
        break a
      } catch (a) {}
      la = !1
    }
    ka = la ? function (a, b) {
      a.__proto__ = b;
      if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
      return a
    } : null
  }
  var oa = ka,
    pa = function (a, b) {
      a.prototype = ja(b.prototype);
      a.prototype.constructor = a;
      if (oa) oa(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d)
            } else a[c] = b[c];
      a.v = b.prototype
    },
    qa = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
      return b
    },
    ra = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    };
  fa("WeakMap", function (a) {
    function b() {}

    function c(l) {
      var m = typeof l;
      return "object" === m && null !== l || "function" === m
    }

    function d(l) {
      if (!ra(l, f)) {
        var m = new b;
        ba(l, f, {
          value: m
        })
      }
    }

    function e(l) {
      var m = Object[l];
      m && (Object[l] = function (p) {
        if (p instanceof b) return p;
        Object.isExtensible(p) && d(p);
        return m(p)
      })
    }
    if (function () {
        if (!a || !Object.seal) return !1;
        try {
          var l = Object.seal({}),
            m = Object.seal({}),
            p = new a([
              [l, 2],
              [m, 3]
            ]);
          if (2 != p.get(l) || 3 != p.get(m)) return !1;
          p.delete(l);
          p.set(m, 4);
          return !p.has(l) && 4 == p.get(m)
        } catch (q) {
          return !1
        }
      }()) return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
      k = function (l) {
        this.Ka = (g += Math.random() + 1).toString();
        if (l) {
          l = n(l);
          for (var m; !(m = l.next()).done;) m = m.value, this.set(m[0], m[1])
        }
      };
    k.prototype.set = function (l, m) {
      if (!c(l)) throw Error("Invalid WeakMap key");
      d(l);
      if (!ra(l, f)) throw Error("WeakMap key fail: " + l);
      l[f][this.Ka] = m;
      return this
    };
    k.prototype.get = function (l) {
      return c(l) && ra(l, f) ? l[f][this.Ka] : void 0
    };
    k.prototype.has = function (l) {
      return c(l) && ra(l, f) && ra(l[f],
        this.Ka)
    };
    k.prototype.delete = function (l) {
      return c(l) && ra(l, f) && ra(l[f], this.Ka) ? delete l[f][this.Ka] : !1
    };
    return k
  });
  fa("Map", function (a) {
    if (function () {
        if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
          var k = Object.seal({
              x: 4
            }),
            l = new a(n([
              [k, "s"]
            ]));
          if ("s" != l.get(k) || 1 != l.size || l.get({
              x: 4
            }) || l.set({
              x: 4
            }, "t") != l || 2 != l.size) return !1;
          var m = l.entries(),
            p = m.next();
          if (p.done || p.value[0] != k || "s" != p.value[1]) return !1;
          p = m.next();
          return p.done || 4 != p.value[0].x || "t" != p.value[1] || !m.next().done ? !1 : !0
        } catch (q) {
          return !1
        }
      }()) return a;
    var b = new WeakMap,
      c = function (k) {
        this.Nb = {};
        this.V =
          f();
        this.size = 0;
        if (k) {
          k = n(k);
          for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
        }
      };
    c.prototype.set = function (k, l) {
      k = 0 === k ? 0 : k;
      var m = d(this, k);
      m.list || (m.list = this.Nb[m.id] = []);
      m.P ? m.P.value = l : (m.P = {
        next: this.V,
        Aa: this.V.Aa,
        head: this.V,
        key: k,
        value: l
      }, m.list.push(m.P), this.V.Aa.next = m.P, this.V.Aa = m.P, this.size++);
      return this
    };
    c.prototype.delete = function (k) {
      k = d(this, k);
      return k.P && k.list ? (k.list.splice(k.index, 1), k.list.length || delete this.Nb[k.id], k.P.Aa.next = k.P.next, k.P.next.Aa = k.P.Aa, k.P.head =
        null, this.size--, !0) : !1
    };
    c.prototype.clear = function () {
      this.Nb = {};
      this.V = this.V.Aa = f();
      this.size = 0
    };
    c.prototype.has = function (k) {
      return !!d(this, k).P
    };
    c.prototype.get = function (k) {
      return (k = d(this, k).P) && k.value
    };
    c.prototype.entries = function () {
      return e(this, function (k) {
        return [k.key, k.value]
      })
    };
    c.prototype.keys = function () {
      return e(this, function (k) {
        return k.key
      })
    };
    c.prototype.values = function () {
      return e(this, function (k) {
        return k.value
      })
    };
    c.prototype.forEach = function (k, l) {
      for (var m = this.entries(), p; !(p = m.next()).done;) p =
        p.value, k.call(l, p[1], p[0], this)
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function (k, l) {
        var m = l && typeof l;
        "object" == m || "function" == m ? b.has(l) ? m = b.get(l) : (m = "" + ++g, b.set(l, m)) : m = "p_" + l;
        var p = k.Nb[m];
        if (p && ra(k.Nb, m))
          for (k = 0; k < p.length; k++) {
            var q = p[k];
            if (l !== l && q.key !== q.key || l === q.key) return {
              id: m,
              list: p,
              index: k,
              P: q
            }
          }
        return {
          id: m,
          list: p,
          index: -1,
          P: void 0
        }
      },
      e = function (k, l) {
        var m = k.V;
        return ha(function () {
          if (m) {
            for (; m.head != k.V;) m = m.Aa;
            for (; m.next != m.head;) return m = m.next, {
              done: !1,
              value: l(m)
            };
            m = null
          }
          return {
            done: !0,
            value: void 0
          }
        })
      },
      f = function () {
        var k = {};
        return k.Aa = k.next = k.head = k
      },
      g = 0;
    return c
  });
  fa("Array.prototype.find", function (a) {
    return a ? a : function (b, c) {
      a: {
        var d = this;d instanceof String && (d = String(d));
        for (var e = d.length, f = 0; f < e; f++) {
          var g = d[f];
          if (b.call(c, g, f, d)) {
            b = g;
            break a
          }
        }
        b = void 0
      }
      return b
    }
  });
  fa("String.prototype.startsWith", function (a) {
    return a ? a : function (b, c) {
      if (null == this) throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");
      if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");
      var d = this + "";
      b += "";
      var e = d.length,
        f = b.length;
      c = Math.max(0, Math.min(c | 0, d.length));
      for (var g = 0; g < f && c < e;)
        if (d[c++] != b[g++]) return !1;
      return g >= f
    }
  });
  var sa = function (a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return {
              value: b(f, a[f]),
              done: !1
            }
          }
          d = !0;
          return {
            done: !0,
            value: void 0
          }
        }
      };
    e[Symbol.iterator] = function () {
      return e
    };
    return e
  };
  fa("Array.prototype.entries", function (a) {
    return a ? a : function () {
      return sa(this, function (b, c) {
        return [b, c]
      })
    }
  });
  fa("Array.prototype.keys", function (a) {
    return a ? a : function () {
      return sa(this, function (b) {
        return b
      })
    }
  });
  fa("Array.from", function (a) {
    return a ? a : function (b, c, d) {
      c = null != c ? c : function (k) {
        return k
      };
      var e = [],
        f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
      if ("function" == typeof f) {
        b = f.call(b);
        for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
      } else
        for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
      return e
    }
  });
  fa("Object.entries", function (a) {
    return a ? a : function (b) {
      var c = [],
        d;
      for (d in b) ra(b, d) && c.push([d, b[d]]);
      return c
    }
  });
  var ta = ta || {},
    r = this || self,
    ua = function () {},
    va = function (a) {
      var b = typeof a;
      return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    },
    wa = function (a) {
      var b = va(a);
      return "array" == b || "object" == b && "number" == typeof a.length
    },
    xa = function (a) {
      var b = typeof a;
      return "object" == b && null != a || "function" == b
    },
    Aa = function (a) {
      return Object.prototype.hasOwnProperty.call(a, ya) && a[ya] || (a[ya] = ++za)
    },
    ya = "closure_uid_" + (1E9 * Math.random() >>> 0),
    za = 0,
    Ba = function (a, b, c) {
      return a.call.apply(a.bind, arguments)
    },
    Ca = function (a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
          var e = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(e, d);
          return a.apply(b, e)
        }
      }
      return function () {
        return a.apply(b, arguments)
      }
    },
    Da = function (a, b, c) {
      Da = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ba : Ca;
      return Da.apply(null, arguments)
    },
    Ea = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function () {
        var d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d)
      }
    },
    t = function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.v = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.dj = function (d, e, f) {
        for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
        return b.prototype[e].apply(d, g)
      }
    },
    Fa = function (a) {
      return a
    };
  var Ga = function (a, b, c) {
    var d = void 0 === d ? window : d;
    this.Eg = void 0 === a ? 200 : a;
    this.hg = void 0 === b ? 300 : b;
    this.Tg = void 0 === c ? ".centered-bottom" : c;
    this.Pg = d
  };
  var Ha = function () {
    this.Uf = new Ga(void 0, void 0, ".hero-image")
  };
  var Ia;

  function Ja(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Ja);
    else {
      var b = Error().stack;
      b && (this.stack = b)
    }
    a && (this.message = String(a))
  }
  t(Ja, Error);
  Ja.prototype.name = "CustomError";
  var Ka = function (a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    Ja.call(this, c + a[d])
  };
  t(Ka, Ja);
  Ka.prototype.name = "AssertionError";
  var La = function (a, b, c, d) {
      var e = "Assertion failed";
      if (c) {
        e += ": " + c;
        var f = d
      } else a && (e += ": " + a, f = b);
      throw new Ka("" + e, f || []);
    },
    u = function (a, b, c) {
      a || La("", null, b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Ma = function (a, b) {
      throw new Ka("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    Na = function (a, b, c) {
      "number" !== typeof a && La("Expected number but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Oa = function (a, b, c) {
      "string" !== typeof a && La("Expected string but got %s: %s.",
        [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Pa = function (a, b, c) {
      "function" !== typeof a && La("Expected function but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Qa = function (a, b, c) {
      xa(a) || La("Expected object but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ra = function (a, b, c) {
      "boolean" !== typeof a && La("Expected boolean but got %s: %s.", [va(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    };
  var Sa = Array.prototype.indexOf ? function (a, b) {
      u(null != a.length);
      return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
      if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
      for (var c = 0; c < a.length; c++)
        if (c in a && a[c] === b) return c;
      return -1
    },
    Ta = Array.prototype.forEach ? function (a, b, c) {
      u(null != a.length);
      Array.prototype.forEach.call(a, b, c)
    } : function (a, b, c) {
      for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    },
    Ua = Array.prototype.map
    ? function (a, b) {
      u(null != a.length);
      return Array.prototype.map.call(a, b, void 0)
    } : function (a, b) {
      for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
      return d
    },
    Va = Array.prototype.some ? function (a, b) {
      u(null != a.length);
      return Array.prototype.some.call(a, b, void 0)
    } : function (a, b) {
      for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
        if (e in d && b.call(void 0, d[e], e, a)) return !0;
      return !1
    };

  function Wa(a, b) {
    var c = 0;
    Ta(a, function (d, e, f) {
      b.call(void 0, d, e, f) && ++c
    }, void 0);
    return c
  }

  function Xa(a, b) {
    for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
      if (e in d && b.call(void 0, d[e], e, a)) return e;
    return -1
  }

  function Ya(a, b) {
    for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
      if (d in c && b.call(void 0, c[d], d, a)) return d;
    return -1
  }

  function Za(a, b) {
    return 0 <= Sa(a, b)
  }

  function $a(a, b) {
    b = Sa(a, b);
    var c;
    if (c = 0 <= b) u(null != a.length), Array.prototype.splice.call(a, b, 1);
    return c
  }

  function ab(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c
    }
    return []
  }

  function bb(a, b, c) {
    u(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
  };
  var cb = String.prototype.trim ? function (a) {
      return a.trim()
    } : function (a) {
      return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    },
    kb = function (a, b) {
      if (b) a = a.replace(db, "&amp;").replace(eb, "&lt;").replace(fb, "&gt;").replace(gb, "&quot;").replace(hb, "&#39;").replace(ib, "&#0;");
      else {
        if (!jb.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(db, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(eb, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(fb, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(gb, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(hb,
          "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(ib, "&#0;"))
      }
      return a
    },
    db = /&/g,
    eb = /</g,
    fb = />/g,
    gb = /"/g,
    hb = /'/g,
    ib = /\x00/g,
    jb = /[\x00&<>"']/,
    mb = function (a, b) {
      var c = 0;
      a = cb(String(a)).split(".");
      b = cb(String(b)).split(".");
      for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
        var f = a[e] || "",
          g = b[e] || "";
        do {
          f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
          if (0 == f[0].length && 0 == g[0].length) break;
          c = lb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10))
            || lb(0 == f[2].length, 0 == g[2].length) || lb(f[2], g[2]);
          f = f[3];
          g = g[3]
        } while (0 == c)
      }
      return c
    },
    lb = function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0
    };

  function nb() {
    var a = r.navigator;
    return a && (a = a.userAgent) ? a : ""
  }

  function v(a) {
    return -1 != nb().indexOf(a)
  };

  function ob() {
    return v("Trident") || v("MSIE")
  }

  function pb() {
    return v("Firefox") || v("FxiOS")
  }

  function qb() {
    return v("Safari") && !(rb() || v("Coast") || v("Opera") || v("Edge") || v("Edg/") || v("OPR") || pb() || v("Silk") || v("Android"))
  }

  function rb() {
    return (v("Chrome") || v("CriOS")) && !v("Edge") || v("Silk")
  };

  function sb() {
    return v("iPhone") && !v("iPod") && !v("iPad")
  }

  function tb() {
    return sb() || v("iPad") || v("iPod")
  };
  var ub = function (a) {
    ub[" "](a);
    return a
  };
  ub[" "] = ua;
  var vb = function (a, b) {
      try {
        return ub(a[b]), !0
      } catch (c) {}
      return !1
    },
    wb = function (a, b, c, d) {
      d = d ? d(b) : b;
      return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
    };
  var xb = v("Opera"),
    x = ob(),
    yb = v("Edge"),
    zb = yb || x,
    z = v("Gecko") && !(-1 != nb().toLowerCase().indexOf("webkit") && !v("Edge")) && !(v("Trident") || v("MSIE")) && !v("Edge"),
    C = -1 != nb().toLowerCase().indexOf("webkit") && !v("Edge"),
    Ab = v("Macintosh"),
    Bb = v("Windows"),
    Cb = v("Android"),
    Db = sb(),
    Eb = v("iPad"),
    Fb = v("iPod"),
    Gb = tb(),
    Hb = function () {
      var a = r.document;
      return a ? a.documentMode : void 0
    },
    Ib;
  a: {
    var Jb = "",
      Kb = function () {
        var a = nb();
        if (z) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (yb) return /Edge\/([\d\.]+)/.exec(a);
        if (x) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (C) return /WebKit\/(\S+)/.exec(a);
        if (xb) return /(?:Version)[ \/]?(\S+)/.exec(a)
      }();Kb && (Jb = Kb ? Kb[1] : "");
    if (x) {
      var Lb = Hb();
      if (null != Lb && Lb > parseFloat(Jb)) {
        Ib = String(Lb);
        break a
      }
    }
    Ib = Jb
  }
  var Mb = Ib,
    Nb = {},
    Ob = function (a) {
      return wb(Nb, a, function () {
        return 0 <= mb(Mb, a)
      })
    },
    Pb;
  if (r.document && x) {
    var Qb = Hb();
    Pb = Qb ? Qb : parseInt(Mb, 10) || void 0
  } else Pb = void 0;
  var Rb = Pb;
  var Sb = function (a, b) {
    a: {
      try {
        var c = a && a.ownerDocument,
          d = c && (c.defaultView || c.parentWindow);
        d = d || r;
        if (d.Element && d.Location) {
          var e = d;
          break a
        }
      } catch (g) {}
      e = null
    }
    if (e && "undefined" != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element))) {
      if (xa(a)) try {
        var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
      } catch (g) {
        f = "<object could not be stringified>"
      } else f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
      Ma("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
        b, f)
    }
  };
  var Tb = function (a) {
      var b = !1,
        c;
      return function () {
        b || (c = a(), b = !0);
        return c
      }
    },
    Ub = function (a, b, c) {
      var d = 0,
        e = !1,
        f = [],
        g = function () {
          d = 0;
          e && (e = !1, k())
        },
        k = function () {
          d = r.setTimeout(g, b);
          var l = f;
          f = [];
          a.apply(c, l)
        };
      return function (l) {
        f = arguments;
        d ? e = !0 : k()
      }
    };

  function Vb(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
  }

  function Wb(a, b) {
    for (var c in a)
      if (b.call(void 0, a[c], c, a)) return !0;
    return !1
  }

  function Xb(a, b) {
    for (var c in a)
      if (a[c] == b) return !0;
    return !1
  }
  var Yb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

  function Zb(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < Yb.length; f++) c = Yb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }

  function $b(a) {
    var b = arguments.length;
    if (1 == b && Array.isArray(arguments[0])) return $b.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c
  };
  var ac, bc = function () {
    if (void 0 === ac) {
      var a = null,
        b = r.trustedTypes;
      if (b && b.createPolicy) try {
        a = b.createPolicy("goog#html", {
          createHTML: Fa,
          createScript: Fa,
          createScriptURL: Fa
        })
      } catch (c) {
        r.console && r.console.error(c.message)
      }
      ac = a
    }
    return ac
  };
  var ec = function (a, b) {
    this.ae = a === cc && b || "";
    this.Gf = dc
  };
  ec.prototype.Va = !0;
  ec.prototype.Ua = function () {
    return this.ae
  };
  ec.prototype.toString = function () {
    return "Const{" + this.ae + "}"
  };
  var fc = function (a) {
      if (a instanceof ec && a.constructor === ec && a.Gf === dc) return a.ae;
      Ma("expected object of type Const, got '" + a + "'");
      return "type_error:Const"
    },
    dc = {},
    cc = {};
  var hc = function (a, b) {
    this.Qd = b === gc ? a : ""
  };
  h = hc.prototype;
  h.Va = !0;
  h.Ua = function () {
    return this.Qd.toString()
  };
  h.Bd = !0;
  h.yc = function () {
    return 1
  };
  h.toString = function () {
    return this.Qd + ""
  };
  var ic = function (a) {
      if (a instanceof hc && a.constructor === hc) return a.Qd;
      Ma("expected object of type TrustedResourceUrl, got '" + a + "' of type " + va(a));
      return "type_error:TrustedResourceUrl"
    },
    gc = {},
    jc = function (a) {
      var b = bc();
      a = b ? b.createScriptURL(a) : a;
      return new hc(a, gc)
    };
  var lc = function (a, b) {
    this.Pd = b === kc ? a : ""
  };
  h = lc.prototype;
  h.Va = !0;
  h.Ua = function () {
    return this.Pd.toString()
  };
  h.Bd = !0;
  h.yc = function () {
    return 1
  };
  h.toString = function () {
    return this.Pd.toString()
  };
  var mc = function (a) {
      if (a instanceof lc && a.constructor === lc) return a.Pd;
      Ma("expected object of type SafeUrl, got '" + a + "' of type " + va(a));
      return "type_error:SafeUrl"
    },
    nc = RegExp('^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$', "i"),
    oc = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    pc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    qc = function (a) {
      if (a instanceof lc) return a;
      a = "object" == typeof a && a.Va ? a.Ua() : String(a);
      u(pc.test(a), "%s does not match the safe URL pattern", a) || (a = "about:invalid#zClosurez");
      return new lc(a, kc)
    },
    kc = {},
    rc = new lc("about:invalid#zClosurez", kc);
  var sc = {},
    tc = function (a, b, c) {
      this.Od = c === sc ? a : "";
      this.Yf = b;
      this.Va = this.Bd = !0
    };
  tc.prototype.yc = function () {
    return this.Yf
  };
  tc.prototype.Ua = function () {
    return this.Od.toString()
  };
  tc.prototype.toString = function () {
    return this.Od.toString()
  };
  var uc = function (a) {
      if (a instanceof tc && a.constructor === tc) return a.Od;
      Ma("expected object of type SafeHtml, got '" + a + "' of type " + va(a));
      return "type_error:SafeHtml"
    },
    vc = function (a, b) {
      var c = bc();
      a = c ? c.createHTML(a) : a;
      return new tc(a, b, sc)
    },
    wc = new tc(r.trustedTypes && r.trustedTypes.emptyHTML || "", 0, sc);
  var xc = {
      MATH: !0,
      SCRIPT: !0,
      STYLE: !0,
      SVG: !0,
      TEMPLATE: !0
    },
    yc = Tb(function () {
      if ("undefined" === typeof document) return !1;
      var a = document.createElement("div"),
        b = document.createElement("div");
      b.appendChild(document.createElement("div"));
      a.appendChild(b);
      if (!a.firstChild) return !1;
      b = a.firstChild.firstChild;
      a.innerHTML = uc(wc);
      return !b.parentElement
    }),
    zc = function (a, b) {
      if (a.tagName && xc[a.tagName.toUpperCase()]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
      if (yc())
        for (; a.lastChild;) a.removeChild(a.lastChild);
      a.innerHTML = uc(b)
    },
    Ac = function (a, b, c, d) {
      a = a instanceof lc ? a : qc(a);
      b = b || r;
      c = c instanceof ec ? fc(c) : c || "";
      return void 0 !== d ? b.open(mc(a), c, d) : b.open(mc(a), c)
    };
  var E = function (a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0
  };
  E.prototype.clone = function () {
    return new E(this.x, this.y)
  };
  E.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")"
  };
  var Bc = function (a, b) {
    return new E(a.x - b.x, a.y - b.y)
  };
  h = E.prototype;
  h.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
  };
  h.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
  };
  h.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
  };
  h.translate = function (a, b) {
    a instanceof E ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
    return this
  };
  h.scale = function (a, b) {
    this.x *= a;
    this.y *= "number" === typeof b ? b : a;
    return this
  };
  var Cc = function (a, b) {
    this.width = a;
    this.height = b
  };
  h = Cc.prototype;
  h.clone = function () {
    return new Cc(this.width, this.height)
  };
  h.toString = function () {
    return "(" + this.width + " x " + this.height + ")"
  };
  h.aspectRatio = function () {
    return this.width / this.height
  };
  h.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
  };
  h.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
  };
  h.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
  };
  h.scale = function (a, b) {
    this.width *= a;
    this.height *= "number" === typeof b ? b : a;
    return this
  };
  var Dc = function (a) {
      return String(a).replace(/\-([a-z])/g, function (b, c) {
        return c.toUpperCase()
      })
    },
    Ec = function (a) {
      return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {
        return c + d.toUpperCase()
      })
    };
  var Gc = function (a) {
      return a ? new Fc(F(a)) : Ia || (Ia = new Fc)
    },
    Ic = function (a, b) {
      var c = b || document;
      return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : Hc(document, "*", a, b)
    },
    G = function (a, b) {
      var c = b || document;
      if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
      else {
        c = document;
        var d = b || c;
        a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : Hc(c, "*", a, b)[0] || null
      }
      return a || null
    },
    Hc = function (a, b, c, d) {
      a = d || a;
      b = b && "*" != b ? String(b).toUpperCase() : "";
      if (a.querySelectorAll
        && a.querySelector && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
      if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
          d = {};
          for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
          d.length = e;
          return d
        }
        return a
      }
      a = a.getElementsByTagName(b || "*");
      if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && Za(b.split(/\s+/), c) && (d[e++] = g);
        d.length = e;
        return d
      }
      return a
    },
    Kc = function (a, b) {
      Vb(b, function (c, d) {
        c && "object" == typeof c && c.Va && (c = c.Ua());
        "style" == d ? a.style.cssText = c : "class"
          == d ? a.className = c : "for" == d ? a.htmlFor = c : Jc.hasOwnProperty(d) ? a.setAttribute(Jc[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
      })
    },
    Jc = {
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      colspan: "colSpan",
      frameborder: "frameBorder",
      height: "height",
      maxlength: "maxLength",
      nonce: "nonce",
      role: "role",
      rowspan: "rowSpan",
      type: "type",
      usemap: "useMap",
      valign: "vAlign",
      width: "width"
    },
    Mc = function (a) {
      a = a.document;
      a = Lc(a) ? a.documentElement : a.body;
      return new Cc(a.clientWidth, a.clientHeight)
    },
    Oc = function (a) {
      var b = Nc(a);
      a = a.parentWindow || a.defaultView;
      return x && Ob("10") && a.pageYOffset != b.scrollTop ? new E(b.scrollLeft, b.scrollTop) : new E(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    },
    Nc = function (a) {
      return a.scrollingElement ? a.scrollingElement : !C && Lc(a) ? a.documentElement : a.body || a.documentElement
    },
    Pc = function (a) {
      return a ? a.parentWindow || a.defaultView : window
    },
    Rc = function (a, b, c) {
      return Qc(document, arguments)
    },
    Qc = function (a, b) {
      var c = b[1],
        d = Sc(a, String(b[0]));
      c && ("string" === typeof c
        ? d.className = c : Array.isArray(c) ? d.className = c.join(" ") : Kc(d, c));
      2 < b.length && Tc(a, d, b, 2);
      return d
    },
    Tc = function (a, b, c, d) {
      function e(k) {
        k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
      }
      for (; d < c.length; d++) {
        var f = c[d];
        if (!wa(f) || xa(f) && 0 < f.nodeType) e(f);
        else {
          a: {
            if (f && "number" == typeof f.length) {
              if (xa(f)) {
                var g = "function" == typeof f.item || "string" == typeof f.item;
                break a
              }
              if ("function" === typeof f) {
                g = "function" == typeof f.item;
                break a
              }
            }
            g = !1
          }
          Ta(g ? ab(f) : f, e)
        }
      }
    },
    Sc = function (a, b) {
      b = String(b);
      "application/xhtml+xml"
      === a.contentType && (b = b.toLowerCase());
      return a.createElement(b)
    },
    Lc = function (a) {
      return "CSS1Compat" == a.compatMode
    },
    Uc = function (a, b) {
      u(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
      a.appendChild(b)
    },
    Vc = function (a, b) {
      Tc(F(a), a, arguments, 1)
    },
    Wc = function (a) {
      for (var b; b = a.firstChild;) a.removeChild(b)
    },
    Xc = function (a, b) {
      u(null != a && null != b, "goog.dom.insertSiblingBefore expects non-null arguments");
      b.parentNode && b.parentNode.insertBefore(a, b)
    },
    Yc = function (a, b) {
      u(null != a && null != b, "goog.dom.insertSiblingAfter expects non-null arguments");
      b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    },
    Zc = function (a) {
      return a && a.parentNode ? a.parentNode.removeChild(a) : null
    },
    $c = function (a, b) {
      u(null != a && null != b, "goog.dom.copyContents expects non-null arguments");
      b = b.cloneNode(!0).childNodes;
      for (Wc(a); b.length;) a.appendChild(b[0])
    },
    ad = function (a, b) {
      if (!a || !b) return !1;
      if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
      if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
      for (; b && a != b;) b = b.parentNode;
      return b == a
    },
    F = function (a) {
      u(a, "Node cannot be null or undefined.");
      return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    cd = function (a) {
      return bd(a, function (b) {
        return "string" === typeof b.className && Za(b.className.split(/\s+/), "comment")
      })
    },
    bd = function (a, b) {
      for (var c = 0; a;) {
        u("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        c++
      }
      return null
    },
    Fc = function (a) {
      this.l = a || r.document || document
    };
  h = Fc.prototype;
  h.F = Gc;
  h.m = function () {};
  h.getElementsByTagName = function (a, b) {
    return (b || this.l).getElementsByTagName(String(a))
  };
  h.T = function (a, b, c) {
    return Qc(this.l, arguments)
  };
  h.createElement = function (a) {
    return Sc(this.l, a)
  };
  h.createTextNode = function (a) {
    return this.l.createTextNode(String(a))
  };
  var dd = function (a) {
    a = a.l;
    return a.parentWindow || a.defaultView
  };
  h = Fc.prototype;
  h.appendChild = Uc;
  h.append = Vc;
  h.canHaveChildren = function (a) {
    if (1 != a.nodeType) return !1;
    switch (a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return !1
    }
    return !0
  };
  h.Te = Xc;
  h.removeNode = Zc;
  var ed = function (a) {
    return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function (b) {
      return 1 == b.nodeType
    })
  };
  Fc.prototype.contains = ad;
  Fc.prototype.qf = function (a) {
    u(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = void 0;
    else if (3 == a.nodeType) a.data = "undefined";
    else if (a.firstChild && 3 == a.firstChild.nodeType) {
      for (; a.lastChild != a.firstChild;) a.removeChild(u(a.lastChild));
      a.firstChild.data = "undefined"
    } else {
      Wc(a);
      var b = F(a);
      a.appendChild(b.createTextNode("undefined"))
    }
  };
  var fd = function () {
    if (!r.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, "passive", {
        get: function () {
          a = !0
        }
      });
    try {
      r.addEventListener("test", ua, b), r.removeEventListener("test", ua, b)
    } catch (c) {}
    return a
  }();
  var gd;
  gd = C ? "webkitTransitionEnd" : "transitionend";
  var hd = function (a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
  };
  h = hd.prototype;
  h.Ee = function () {
    return this.bottom - this.top
  };
  h.clone = function () {
    return new hd(this.top, this.right, this.bottom, this.left)
  };
  h.toString = function () {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
  };
  h.contains = function (a) {
    return this && a ? a instanceof hd ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
  };
  h.expand = function (a, b, c, d) {
    xa(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
    return this
  };
  h.ceil = function () {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
  };
  h.floor = function () {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
  };
  h.round = function () {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
  };
  h.translate = function (a, b) {
    a instanceof E ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Na(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
    return this
  };
  h.scale = function (a, b) {
    b = "number" === typeof b ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= b;
    this.bottom *= b;
    return this
  };
  var id = function (a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
  };
  h = id.prototype;
  h.clone = function () {
    return new id(this.left, this.top, this.width, this.height)
  };
  h.toString = function () {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
  };
  h.contains = function (a) {
    return a instanceof E ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
  };
  h.ceil = function () {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
  };
  h.floor = function () {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
  };
  h.round = function () {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
  };
  h.translate = function (a, b) {
    a instanceof E ? (this.left += a.x, this.top += a.y) : (this.left += Na(a), "number" === typeof b && (this.top += b));
    return this
  };
  h.scale = function (a, b) {
    b = "number" === typeof b ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= b;
    this.height *= b;
    return this
  };
  var kd = function (a, b, c) {
      if ("string" === typeof b)(b = jd(a, b)) && (a.style[b] = c);
      else
        for (var d in b) {
          c = a;
          var e = b[d],
            f = jd(c, d);
          f && (c.style[f] = e)
        }
    },
    ld = {},
    jd = function (a, b) {
      var c = ld[b];
      if (!c) {
        var d = Dc(b);
        c = d;
        void 0 === a.style[d] && (d = (C ? "Webkit" : z ? "Moz" : x ? "ms" : null) + Ec(d), void 0 !== a.style[d] && (c = d));
        ld[b] = c
      }
      return c
    },
    H = function (a, b) {
      var c = F(a);
      return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
    },
    md = function (a, b) {
      return H(a, b) || (a.currentStyle
        ? a.currentStyle[b] : null) || a.style && a.style[b]
    },
    nd = function (a) {
      return md(a, "position")
    },
    pd = function (a, b, c) {
      if (b instanceof E) {
        var d = b.x;
        b = b.y
      } else d = b, b = c;
      a.style.left = od(d, !1);
      a.style.top = od(b, !1)
    },
    qd = function (a) {
      try {
        return a.getBoundingClientRect()
      } catch (b) {
        return {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    rd = function (a) {
      if (x && !(8 <= Number(Rb))) return u(a && "offsetParent" in a), a.offsetParent;
      var b = F(a),
        c = md(a, "position"),
        d = "fixed" == c || "absolute" == c;
      for (a = a.parentNode; a && a != b; a = a.parentNode)
        if (11 == a.nodeType
          && a.host && (a = a.host), c = md(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
      return null
    },
    td = function (a) {
      for (var b = new hd(0, Infinity, Infinity, 0), c = Gc(a), d = c.l.body, e = c.l.documentElement, f = Nc(c.l); a = rd(a);)
        if (!(x && 0 == a.clientWidth || C && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != md(a, "overflow")) {
          var g = sd(a),
            k = new E(a.clientLeft, a.clientTop);
          g.x += k.x;
          g.y += k.y;
          b.top = Math.max(b.top,
            g.y);
          b.right = Math.min(b.right, g.x + a.clientWidth);
          b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
          b.left = Math.max(b.left, g.x)
        } d = f.scrollLeft;
      f = f.scrollTop;
      b.left = Math.max(b.left, d);
      b.top = Math.max(b.top, f);
      c = Mc(dd(c) || window);
      b.right = Math.min(b.right, d + c.width);
      b.bottom = Math.min(b.bottom, f + c.height);
      return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    },
    sd = function (a) {
      var b = F(a);
      Qa(a, "Parameter is required");
      var c = new E(0, 0);
      var d = b ? F(b) : document;
      d = !x || 9 <= Number(Rb) || Lc(Gc(d).l) ? d.documentElement
        : d.body;
      if (a == d) return c;
      a = qd(a);
      b = Oc(Gc(b).l);
      c.x = a.left + b.x;
      c.y = a.top + b.y;
      return c
    },
    vd = function (a, b, c) {
      if (b instanceof Cc) c = b.height, b = b.width;
      else if (void 0 == c) throw Error("missing height argument");
      a.style.width = od(b, !0);
      ud(a, c)
    },
    od = function (a, b) {
      "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
      return a
    },
    ud = function (a, b) {
      a.style.height = od(b, !0)
    },
    xd = function (a) {
      var b = wd;
      if ("none" != md(a, "display")) return b(a);
      var c = a.style,
        d = c.display,
        e = c.visibility,
        f = c.position;
      c.visibility = "hidden";
      c.position =
        "absolute";
      c.display = "inline";
      a = b(a);
      c.display = d;
      c.position = f;
      c.visibility = e;
      return a
    },
    wd = function (a) {
      var b = a.offsetWidth,
        c = a.offsetHeight,
        d = C && !b && !c;
      return (void 0 === b || d) && a.getBoundingClientRect ? (a = qd(a), new Cc(a.right - a.left, a.bottom - a.top)) : new Cc(b, c)
    },
    yd = function (a, b) {
      u(a);
      a = a.style;
      "opacity" in a ? a.opacity = b : "MozOpacity" in a ? a.MozOpacity = b : "filter" in a && (a.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
    },
    I = function (a, b) {
      a.style.display = b ? "" : "none"
    },
    zd = function (a) {
      return "rtl" == md(a, "direction")
    },
    Ad = function (a, b) {
      if (/^\d+px?$/.test(b)) return parseInt(b, 10);
      var c = a.style.left,
        d = a.runtimeStyle.left;
      a.runtimeStyle.left = a.currentStyle.left;
      a.style.left = b;
      b = a.style.pixelLeft;
      a.style.left = c;
      a.runtimeStyle.left = d;
      return +b
    },
    Bd = function (a, b) {
      return (b = a.currentStyle ? a.currentStyle[b] : null) ? Ad(a, b) : 0
    },
    Cd = {
      thin: 2,
      medium: 4,
      thick: 6
    },
    Dd = function (a, b) {
      if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null)) return 0;
      b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
      return b in Cd ? Cd[b] : Ad(a, b)
    },
    Ed = function (a) {
      if (x
        && !(9 <= Number(Rb))) {
        var b = Dd(a, "borderLeft"),
          c = Dd(a, "borderRight"),
          d = Dd(a, "borderTop");
        a = Dd(a, "borderBottom");
        return new hd(d, c, a, b)
      }
      b = H(a, "borderLeftWidth");
      c = H(a, "borderRightWidth");
      d = H(a, "borderTopWidth");
      a = H(a, "borderBottomWidth");
      return new hd(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };
  var Fd = !1,
    Gd = !1,
    Hd = function (a) {
      var b = document.createElement("div");
      a = n(a);
      for (var c = a.next(); !c.done; c = a.next())
        if (null != b.style[c.value]) return !0;
      return !1
    };
  Hd(["WebkitAnimation", "MozAnimation", "OAnimation", "animation"]);
  var L = Hd(["WebkitTransition", "MozTransition", "OTransition", "transition"]) ? gd : null,
    Id = function () {
      if (Gd) return Fd;
      var a = Sc(document, "DETAILS");
      if (!("open" in a)) return !1;
      Vc(a, Rc("SUMMARY", null, "a"), "b");
      kd(a, "display", "block");
      document.body.appendChild(a);
      var b = a.offsetHeight;
      a.setAttribute("open", !0);
      b = a.offsetHeight != b;
      Zc(a);
      Fd = b;
      Gd = !0;
      return b
    };
  var M = {
    hb: !1,
    De: function (a) {
      return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    },
    get: function (a) {
      return M.hb || a.classList ? a.classList : M.De(a).match(/\S+/g) || []
    },
    set: function (a, b) {
      "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    },
    contains: function (a, b) {
      return M.hb || a.classList ? a.classList.contains(b) : Za(M.get(a), b)
    },
    add: function (a, b) {
      if (M.hb || a.classList) a.classList.add(b);
      else if (!M.contains(a, b)) {
        var c = M.De(a);
        M.set(a, c + (0
          < c.length ? " " + b : b))
      }
    },
    addAll: function (a, b) {
      if (M.hb || a.classList) Array.prototype.forEach.call(b, function (e) {
        M.add(a, e)
      });
      else {
        var c = {};
        Array.prototype.forEach.call(M.get(a), function (e) {
          c[e] = !0
        });
        Array.prototype.forEach.call(b, function (e) {
          c[e] = !0
        });
        b = "";
        for (var d in c) b += 0 < b.length ? " " + d : d;
        M.set(a, b)
      }
    },
    remove: function (a, b) {
      M.hb || a.classList ? a.classList.remove(b) : M.contains(a, b) && M.set(a, Array.prototype.filter.call(M.get(a), function (c) {
        return c != b
      }).join(" "))
    },
    ja: function (a, b) {
      M.hb || a.classList ? Array.prototype.forEach.call(b,
        function (c) {
          M.remove(a, c)
        }) : M.set(a, Array.prototype.filter.call(M.get(a), function (c) {
        return !Za(b, c)
      }).join(" "))
    },
    enable: function (a, b, c) {
      c ? M.add(a, b) : M.remove(a, b)
    },
    fj: function (a, b, c) {
      (c ? M.addAll : M.ja)(a, b)
    },
    kj: function (a, b, c) {
      return M.contains(a, b) ? (M.remove(a, b), M.add(a, c), !0) : !1
    },
    toggle: function (a, b) {
      var c = !M.contains(a, b);
      M.enable(a, b, c);
      return c
    },
    cj: function (a, b, c) {
      M.remove(a, b);
      M.add(a, c)
    }
  };
  var Jd = Object.freeze || function (a) {
    return a
  };

  function Kd(a) {
    a && "function" == typeof a.wa && a.wa()
  };

  function Ld(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
      var d = arguments[b];
      wa(d) ? Ld.apply(null, d) : Kd(d)
    }
  };
  var Md = function () {
    this.Ra = this.Ra;
    this.Ya = this.Ya
  };
  Md.prototype.Ra = !1;
  Md.prototype.wa = function () {
    this.Ra || (this.Ra = !0, this.B())
  };
  Md.prototype.B = function () {
    if (this.Ya)
      for (; this.Ya.length;) this.Ya.shift()()
  };
  var N = function (a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.Xb = !1
  };
  N.prototype.stopPropagation = function () {
    this.Xb = !0
  };
  N.prototype.preventDefault = function () {
    this.defaultPrevented = !0
  };
  var Nd = function (a) {
    a.preventDefault()
  };
  var Od = function (a, b) {
    N.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.ra = null;
    a && this.ia(a, b)
  };
  t(Od, N);
  var Pd = Jd({
    2: "touch",
    3: "pen",
    4: "mouse"
  });
  Od.prototype.ia = function (a, b) {
    var c = this.type = a.type,
      d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    (b = a.relatedTarget) ? z && (vb(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.offsetX = C || void 0 !== a.offsetX
      ? a.offsetX : a.layerX, this.offsetY = C || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType
      ? a.pointerType : Pd[a.pointerType] || "";
    this.state = a.state;
    this.ra = a;
    a.defaultPrevented && Od.v.preventDefault.call(this)
  };
  Od.prototype.stopPropagation = function () {
    Od.v.stopPropagation.call(this);
    this.ra.stopPropagation ? this.ra.stopPropagation() : this.ra.cancelBubble = !0
  };
  Od.prototype.preventDefault = function () {
    Od.v.preventDefault.call(this);
    var a = this.ra;
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
  };
  var Qd = "closure_listenable_" + (1E6 * Math.random() | 0),
    Rd = function (a) {
      return !(!a || !a[Qd])
    };
  var Sd = 0;
  var Td = function (a, b, c, d, e) {
      this.listener = a;
      this.proxy = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.Bc = e;
      this.key = ++Sd;
      this.Cb = this.lc = !1
    },
    Ud = function (a) {
      a.Cb = !0;
      a.listener = null;
      a.proxy = null;
      a.src = null;
      a.Bc = null
    };
  var Vd = function (a) {
    this.src = a;
    this.H = {};
    this.fc = 0
  };
  Vd.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.H[f];
    a || (a = this.H[f] = [], this.fc++);
    var g = Wd(a, b, d, e); - 1 < g ? (b = a[g], c || (b.lc = !1)) : (b = new Td(b, this.src, f, !!d, e), b.lc = c, a.push(b));
    return b
  };
  Vd.prototype.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.H)) return !1;
    var e = this.H[a];
    b = Wd(e, b, c, d);
    return -1 < b ? (Ud(e[b]), u(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.H[a], this.fc--), !0) : !1
  };
  var Xd = function (a, b) {
    var c = b.type;
    if (!(c in a.H)) return !1;
    var d = $a(a.H[c], b);
    d && (Ud(b), 0 == a.H[c].length && (delete a.H[c], a.fc--));
    return d
  };
  Vd.prototype.ja = function (a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.H)
      if (!a || c == a) {
        for (var d = this.H[c], e = 0; e < d.length; e++) ++b, Ud(d[e]);
        delete this.H[c];
        this.fc--
      } return b
  };
  Vd.prototype.Pb = function (a, b, c, d) {
    a = this.H[a.toString()];
    var e = -1;
    a && (e = Wd(a, b, c, d));
    return -1 < e ? a[e] : null
  };
  Vd.prototype.hasListener = function (a, b) {
    var c = void 0 !== a,
      d = c ? a.toString() : "",
      e = void 0 !== b;
    return Wb(this.H, function (f) {
      for (var g = 0; g < f.length; ++g)
        if (!(c && f[g].type != d || e && f[g].capture != b)) return !0;
      return !1
    })
  };
  var Wd = function (a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.Cb && f.listener == b && f.capture == !!c && f.Bc == d) return e
    }
    return -1
  };
  var Yd = "closure_lm_" + (1E6 * Math.random() | 0),
    Zd = {},
    $d = 0,
    O = function (a, b, c, d, e) {
      if (d && d.once) return ae(a, b, c, d, e);
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) O(a, b[f], c, d, e);
        return null
      }
      c = be(c);
      return Rd(a) ? a.D(b, c, xa(d) ? !!d.capture : !!d, e) : ce(a, b, c, !1, d, e)
    },
    ce = function (a, b, c, d, e, f) {
      if (!b) throw Error("Invalid event type");
      var g = xa(e) ? !!e.capture : !!e,
        k = de(a);
      k || (a[Yd] = k = new Vd(a));
      c = k.add(b, c, d, g, f);
      if (c.proxy) return c;
      d = ee();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) fd || (e = g), void 0 === e
        && (e = !1), a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(fe(b.toString()), d);
      else if (a.addListener && a.removeListener) u("change" === b, "MediaQueryList only has a change event"), a.addListener(d);
      else throw Error("addEventListener and attachEvent are unavailable.");
      $d++;
      return c
    },
    ee = function () {
      var a = ge,
        b = function (c) {
          return a.call(b.src, b.listener, c)
        };
      return b
    },
    ae = function (a, b, c, d, e) {
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) ae(a, b[f], c, d, e);
        return null
      }
      c = be(c);
      return Rd(a)
        ? a.Id(b, c, xa(d) ? !!d.capture : !!d, e) : ce(a, b, c, !0, d, e)
    },
    P = function (a, b, c, d, e) {
      if (Array.isArray(b))
        for (var f = 0; f < b.length; f++) P(a, b[f], c, d, e);
      else d = xa(d) ? !!d.capture : !!d, c = be(c), Rd(a) ? a.hc(b, c, d, e) : a && (a = de(a)) && (b = a.Pb(b, c, d, e)) && Q(b)
    },
    Q = function (a) {
      if ("number" === typeof a || !a || a.Cb) return !1;
      var b = a.src;
      if (Rd(b)) return Xd(b.$, a);
      var c = a.type,
        d = a.proxy;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(fe(c), d) : b.addListener && b.removeListener && b.removeListener(d);
      $d--;
      (c = de(b)) ? (Xd(c, a), 0 == c.fc && (c.src = null, b[Yd] = null)) : Ud(a);
      return !0
    },
    R = function (a, b) {
      if (a)
        if (Rd(a)) a.$ && a.$.ja(b);
        else if (a = de(a)) {
        var c = 0;
        b = b && b.toString();
        for (var d in a.H)
          if (!b || d == b)
            for (var e = a.H[d].concat(), f = 0; f < e.length; ++f) Q(e[f]) && ++c
      }
    },
    fe = function (a) {
      return a in Zd ? Zd[a] : Zd[a] = "on" + a
    },
    je = function (a, b) {
      var c = window;
      if (Rd(c)) he(c, a, !1, b);
      else if (c = de(c))
        if (a = c.H[a.toString()])
          for (a = a.concat(), c = 0; c < a.length; c++) {
            var d = a[c];
            d && 0 == d.capture && !d.Cb && ie(d, b)
          }
    },
    ie = function (a, b) {
      var c = a.listener,
        d = a.Bc || a.src;
      a.lc && Q(a);
      return c.call(d, b)
    },
    ge = function (a, b) {
      return a.Cb ? !0 : ie(a, new Od(b, this))
    },
    de = function (a) {
      a = a[Yd];
      return a instanceof Vd ? a : null
    },
    ke = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    be = function (a) {
      u(a, "Listener can not be null.");
      if ("function" === typeof a) return a;
      u(a.handleEvent, "An object listener must have handleEvent method.");
      a[ke] || (a[ke] = function (b) {
        return a.handleEvent(b)
      });
      return a[ke]
    };
  var le = function (a) {
    Md.call(this);
    this.U = a;
    this.xb = {}
  };
  t(le, Md);
  var me = [];
  le.prototype.D = function (a, b, c, d) {
    Array.isArray(b) || (b && (me[0] = b.toString()), b = me);
    for (var e = 0; e < b.length; e++) {
      var f = O(a, b[e], c || this.handleEvent, d || !1, this.U || this);
      if (!f) break;
      this.xb[f.key] = f
    }
    return this
  };
  le.prototype.Id = function (a, b, c, d) {
    return ne(this, a, b, c, d)
  };
  var ne = function (a, b, c, d, e, f) {
    if (Array.isArray(c))
      for (var g = 0; g < c.length; g++) ne(a, b, c[g], d, e, f);
    else {
      b = ae(b, c, d || a.handleEvent, e, f || a.U || a);
      if (!b) return a;
      a.xb[b.key] = b
    }
    return a
  };
  le.prototype.hc = function (a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0; f < b.length; f++) this.hc(a, b[f], c, d, e);
    else c = c || this.handleEvent, d = xa(d) ? !!d.capture : !!d, e = e || this.U || this, c = be(c), d = !!d, b = Rd(a) ? a.Pb(b, c, d, e) : a ? (a = de(a)) ? a.Pb(b, c, d, e) : null : null, b && (Q(b), delete this.xb[b.key]);
    return this
  };
  le.prototype.ja = function () {
    Vb(this.xb, function (a, b) {
      this.xb.hasOwnProperty(b) && Q(a)
    }, this);
    this.xb = {}
  };
  le.prototype.B = function () {
    le.v.B.call(this);
    this.ja()
  };
  le.prototype.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var S = function () {
    Md.call(this);
    this.$ = new Vd(this);
    this.Jf = this;
    this.Qc = null
  };
  t(S, Md);
  S.prototype[Qd] = !0;
  h = S.prototype;
  h.Sd = function (a) {
    this.Qc = a
  };
  h.addEventListener = function (a, b, c, d) {
    O(this, a, b, c, d)
  };
  h.removeEventListener = function (a, b, c, d) {
    P(this, a, b, c, d)
  };
  h.dispatchEvent = function (a) {
    oe(this);
    var b = this.Qc;
    if (b) {
      var c = [];
      for (var d = 1; b; b = b.Qc) c.push(b), u(1E3 > ++d, "infinite loop")
    }
    b = this.Jf;
    d = a.type || a;
    if ("string" === typeof a) a = new N(a, b);
    else if (a instanceof N) a.target = a.target || b;
    else {
      var e = a;
      a = new N(d, b);
      Zb(a, e)
    }
    e = !0;
    if (c)
      for (var f = c.length - 1; !a.Xb && 0 <= f; f--) {
        var g = a.currentTarget = c[f];
        e = he(g, d, !0, a) && e
      }
    a.Xb || (g = a.currentTarget = b, e = he(g, d, !0, a) && e, a.Xb || (e = he(g, d, !1, a) && e));
    if (c)
      for (f = 0; !a.Xb && f < c.length; f++) g = a.currentTarget = c[f], e = he(g, d, !1, a) && e;
    return e
  };
  h.B = function () {
    S.v.B.call(this);
    this.$ && this.$.ja(void 0);
    this.Qc = null
  };
  h.D = function (a, b, c, d) {
    oe(this);
    return this.$.add(String(a), b, !1, c, d)
  };
  h.Id = function (a, b, c, d) {
    return this.$.add(String(a), b, !0, c, d)
  };
  h.hc = function (a, b, c, d) {
    return this.$.remove(String(a), b, c, d)
  };
  var he = function (a, b, c, d) {
    b = a.$.H[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.Cb && g.capture == c) {
        var k = g.listener,
          l = g.Bc || g.src;
        g.lc && Xd(a.$, g);
        e = !1 !== k.call(l, d) && e
      }
    }
    return e && !d.defaultPrevented
  };
  S.prototype.Pb = function (a, b, c, d) {
    return this.$.Pb(String(a), b, c, d)
  };
  S.prototype.hasListener = function (a, b) {
    return this.$.hasListener(void 0 !== a ? String(a) : void 0, b)
  };
  var oe = function (a) {
    u(a.$, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
  };
  var pe = new WeakMap,
    qe = function (a, b) {
      a = [a];
      for (var c = b.length - 1; 0 <= c; --c) a.push(typeof b[c], b[c]);
      return a.join("\x0B")
    };
  var re = function (a, b) {
    this.ng = 100;
    this.Xf = a;
    this.Og = b;
    this.Mc = 0;
    this.V = null
  };
  re.prototype.get = function () {
    if (0 < this.Mc) {
      this.Mc--;
      var a = this.V;
      this.V = a.next;
      a.next = null
    } else a = this.Xf();
    return a
  };
  re.prototype.put = function (a) {
    this.Og(a);
    this.Mc < this.ng && (this.Mc++, a.next = this.V, this.V = a)
  };
  var se, te = function () {
    var a = r.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !v("Presto") && (a = function () {
      var e = Sc(document, "IFRAME");
      e.style.display = "none";
      document.documentElement.appendChild(e);
      var f = e.contentWindow;
      e = f.document;
      e.open();
      e.close();
      var g = "callImmediate" + Math.random(),
        k = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
      e = Da(function (l) {
          if (("*" == k || l.origin == k) && l.data == g) this.port1.onmessage()
        },
        this);
      f.addEventListener("message", e, !1);
      this.port1 = {};
      this.port2 = {
        postMessage: function () {
          f.postMessage(g, k)
        }
      }
    });
    if ("undefined" !== typeof a && !ob()) {
      var b = new a,
        c = {},
        d = c;
      b.port1.onmessage = function () {
        if (void 0 !== c.next) {
          c = c.next;
          var e = c.se;
          c.se = null;
          e()
        }
      };
      return function (e) {
        d.next = {
          se: e
        };
        d = d.next;
        b.port2.postMessage(0)
      }
    }
    return function (e) {
      r.setTimeout(e, 0)
    }
  };

  function ue(a) {
    r.setTimeout(function () {
      throw a;
    }, 0)
  };
  var ve = function () {
    this.gd = this.gb = null
  };
  ve.prototype.add = function (a, b) {
    var c = we.get();
    c.set(a, b);
    this.gd ? this.gd.next = c : (u(!this.gb), this.gb = c);
    this.gd = c
  };
  ve.prototype.remove = function () {
    var a = null;
    this.gb && (a = this.gb, this.gb = this.gb.next, this.gb || (this.gd = null), a.next = null);
    return a
  };
  var we = new re(function () {
      return new xe
    }, function (a) {
      return a.reset()
    }),
    xe = function () {
      this.next = this.scope = this.xa = null
    };
  xe.prototype.set = function (a, b) {
    this.xa = a;
    this.scope = b;
    this.next = null
  };
  xe.prototype.reset = function () {
    this.next = this.scope = this.xa = null
  };
  var Ce = function (a, b) {
      ye || ze();
      Ae || (ye(), Ae = !0);
      Be.add(a, b)
    },
    ye, ze = function () {
      if (r.Promise && r.Promise.resolve) {
        var a = r.Promise.resolve(void 0);
        ye = function () {
          a.then(De)
        }
      } else ye = function () {
        var b = De;
        "function" !== typeof r.setImmediate || r.Window && r.Window.prototype && !v("Edge") && r.Window.prototype.setImmediate == r.setImmediate ? (se || (se = te()), se(b)) : r.setImmediate(b)
      }
    },
    Ae = !1,
    Be = new ve,
    De = function () {
      for (var a; a = Be.remove();) {
        try {
          a.xa.call(a.scope)
        } catch (b) {
          ue(b)
        }
        we.put(a)
      }
      Ae = !1
    };
  var T = function (a) {
      this.da = 0;
      this.mf = void 0;
      this.lb = this.ua = this.R = null;
      this.zc = this.wd = !1;
      if (a != ua) try {
        var b = this;
        a.call(void 0, function (c) {
          Ee(b, 2, c)
        }, function (c) {
          if (!(c instanceof Fe)) try {
            if (c instanceof Error) throw c;
            throw Error("Promise rejected.");
          } catch (d) {}
          Ee(b, 3, c)
        })
      } catch (c) {
        Ee(this, 3, c)
      }
    },
    Ge = function () {
      this.next = this.context = this.Ab = this.Za = this.Pa = null;
      this.jc = !1
    };
  Ge.prototype.reset = function () {
    this.context = this.Ab = this.Za = this.Pa = null;
    this.jc = !1
  };
  var He = new re(function () {
      return new Ge
    }, function (a) {
      a.reset()
    }),
    Ie = function (a, b, c) {
      var d = He.get();
      d.Za = a;
      d.Ab = b;
      d.context = c;
      return d
    },
    Je = function (a) {
      if (a instanceof T) return a;
      var b = new T(ua);
      Ee(b, 2, a);
      return b
    },
    Ke = function (a) {
      return new T(function (b, c) {
        c(a)
      })
    },
    Me = function (a, b, c) {
      Le(a, b, c, null) || Ce(Ea(b, a))
    },
    Ne = function (a) {
      return new T(function (b, c) {
        var d = a.length,
          e = [];
        if (d)
          for (var f = function (m, p) {
              d--;
              e[m] = p;
              0 == d && b(e)
            }, g = function (m) {
              c(m)
            }, k = 0, l; k < a.length; k++) l = a[k], Me(l, Ea(f, k), g);
        else b(e)
      })
    };
  T.prototype.then = function (a, b, c) {
    null != a && Pa(a, "opt_onFulfilled should be a function.");
    null != b && Pa(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    return Oe(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
  };
  T.prototype.$goog_Thenable = !0;
  T.prototype.Zc = function (a, b) {
    return Oe(this, null, a, b)
  };
  T.prototype.catch = T.prototype.Zc;
  T.prototype.cancel = function (a) {
    if (0 == this.da) {
      var b = new Fe(a);
      Ce(function () {
        Pe(this, b)
      }, this)
    }
  };
  var Pe = function (a, b) {
      if (0 == a.da)
        if (a.R) {
          var c = a.R;
          if (c.ua) {
            for (var d = 0, e = null, f = null, g = c.ua; g && (g.jc || (d++, g.Pa == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
            e && (0 == c.da && 1 == d ? Pe(c, b) : (f ? (d = f, u(c.ua), u(null != d), d.next == c.lb && (c.lb = d), d.next = d.next.next) : Qe(c), Re(c, e, 3, b)))
          }
          a.R = null
        } else Ee(a, 3, b)
    },
    Te = function (a, b) {
      a.ua || 2 != a.da && 3 != a.da || Se(a);
      u(null != b.Za);
      a.lb ? a.lb.next = b : a.ua = b;
      a.lb = b
    },
    Oe = function (a, b, c, d) {
      var e = Ie(null, null, null);
      e.Pa = new T(function (f, g) {
        e.Za = b ? function (k) {
            try {
              var l = b.call(d, k);
              f(l)
            } catch (m) {
              g(m)
            }
          }
          : f;
        e.Ab = c ? function (k) {
          try {
            var l = c.call(d, k);
            void 0 === l && k instanceof Fe ? g(k) : f(l)
          } catch (m) {
            g(m)
          }
        } : g
      });
      e.Pa.R = a;
      Te(a, e);
      return e.Pa
    };
  T.prototype.ah = function (a) {
    u(1 == this.da);
    this.da = 0;
    Ee(this, 2, a)
  };
  T.prototype.bh = function (a) {
    u(1 == this.da);
    this.da = 0;
    Ee(this, 3, a)
  };
  var Ee = function (a, b, c) {
      0 == a.da && (a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself")), a.da = 1, Le(c, a.ah, a.bh, a) || (a.mf = c, a.da = b, a.R = null, Se(a), 3 != b || c instanceof Fe || Ue(a, c)))
    },
    Le = function (a, b, c, d) {
      if (a instanceof T) return null != b && Pa(b, "opt_onFulfilled should be a function."), null != c && Pa(c, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), Te(a, Ie(b || ua, c || null, d)), !0;
      if (a) try {
        var e = !!a.$goog_Thenable
      } catch (g) {
        e = !1
      } else e = !1;
      if (e) return a.then(b,
        c, d), !0;
      if (xa(a)) try {
        var f = a.then;
        if ("function" === typeof f) return Ve(a, f, b, c, d), !0
      } catch (g) {
        return c.call(d, g), !0
      }
      return !1
    },
    Ve = function (a, b, c, d, e) {
      var f = !1,
        g = function (l) {
          f || (f = !0, c.call(e, l))
        },
        k = function (l) {
          f || (f = !0, d.call(e, l))
        };
      try {
        b.call(a, g, k)
      } catch (l) {
        k(l)
      }
    },
    Se = function (a) {
      a.wd || (a.wd = !0, Ce(a.ag, a))
    },
    Qe = function (a) {
      var b = null;
      a.ua && (b = a.ua, a.ua = b.next, b.next = null);
      a.ua || (a.lb = null);
      null != b && u(null != b.Za);
      return b
    };
  T.prototype.ag = function () {
    for (var a; a = Qe(this);) Re(this, a, this.da, this.mf);
    this.wd = !1
  };
  var Re = function (a, b, c, d) {
      if (3 == c && b.Ab && !b.jc)
        for (; a && a.zc; a = a.R) a.zc = !1;
      if (b.Pa) b.Pa.R = null, We(b, c, d);
      else try {
        b.jc ? b.Za.call(b.context) : We(b, c, d)
      } catch (e) {
        Xe.call(null, e)
      }
      He.put(b)
    },
    We = function (a, b, c) {
      2 == b ? a.Za.call(a.context, c) : a.Ab && a.Ab.call(a.context, c)
    },
    Ue = function (a, b) {
      a.zc = !0;
      Ce(function () {
        a.zc && Xe.call(null, b)
      })
    },
    Xe = ue,
    Fe = function (a) {
      Ja.call(this, a)
    };
  t(Fe, Ja);
  Fe.prototype.name = "cancel";
  var Ye = function (a, b, c) {
    if ("function" === typeof a) c && (a = Da(a, c));
    else if (a && "function" == typeof a.handleEvent) a = Da(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0)
  };
  var Ze = function (a, b) {
    b = void 0 === b ? qe : b;
    var c = Aa(a),
      d = function (f) {
        f = n(f);
        f.next();
        f = ia(f);
        return b(c, f)
      },
      e = function (f) {
        var g = n(f);
        f = g.next().value;
        g = ia(g);
        return a.apply(f, g)
      };
    return function () {
      var f = qa.apply(0, arguments),
        g = this || r,
        k = pe.get(g);
      k || (k = {}, pe.set(g, k));
      return wb(k, [this].concat(f instanceof Array ? f : ia(n(f))), e, d)
    }
  }(function () {
    return x ? 8 <= Number(Rb) : "onhashchange" in r
  });
  var $e = function (a, b) {
    this.name = a;
    this.value = b
  };
  $e.prototype.toString = function () {
    return this.name
  };
  var af = new $e("OFF", Infinity),
    bf = new $e("SEVERE", 1E3),
    cf = new $e("WARNING", 900),
    df = new $e("INFO", 800),
    ef = new $e("CONFIG", 700),
    ff = new $e("FINE", 500),
    gf = function () {
      this.nc = 0;
      this.clear()
    },
    hf;
  gf.prototype.clear = function () {
    this.pe = Array(this.nc);
    this.we = -1;
    this.Ve = !1
  };
  var jf = function (a, b, c) {
    this.uc = void 0;
    this.reset(a || af, b, c, void 0, void 0)
  };
  jf.prototype.reset = function (a, b, c, d) {
    this.Bf = d || Date.now();
    this.Ye = a;
    this.tg = b;
    this.Ze = c;
    this.uc = void 0
  };
  var kf = function (a, b) {
      this.level = null;
      this.Le = [];
      this.parent = (void 0 === b ? null : b) || null;
      this.children = [];
      this.sa = {
        qb: function () {
          return a
        }
      }
    },
    lf = function (a) {
      if (a.level) return a.level;
      if (a.parent) return lf(a.parent);
      Ma("Root logger has no level set.");
      return af
    },
    mf = function (a, b) {
      for (; a;) a.Le.forEach(function (c) {
        c(b)
      }), a = a.parent
    },
    nf = function () {
      this.entries = {};
      var a = new kf("");
      a.level = ef;
      this.entries[""] = a
    },
    of , pf = function (a, b, c) {
      var d = a.entries[b];
      if (d) return void 0 !== c && (d.level = c), d;
      d = pf(a, b.substr(0,
        b.lastIndexOf(".")));
      var e = new kf(b, d);
      a.entries[b] = e;
      d.children.push(e);
      void 0 !== c && (e.level = c);
      return e
    },
    qf = function () {
      of || ( of = new nf);
      return of
    },
    U = function (a) {
      return pf(qf(), a, void 0).sa
    },
    rf = function (a, b, c, d) {
      var e;
      if (e = a)
        if (e = a && b) {
          e = b.value;
          var f = a ? lf(pf(qf(), a.qb())) : af;
          e = e >= f.value
        } if (e) {
        b = b || af;
        e = pf(qf(), a.qb());
        "function" === typeof c && (c = c());
        hf || (hf = new gf);
        f = hf;
        a = a.qb();
        if (0 < f.nc) {
          var g = (f.we + 1) % f.nc;
          f.we = g;
          f.Ve ? (f = f.pe[g], f.reset(b, c, a), a = f) : (f.Ve = g == f.nc - 1, a = f.pe[g] = new jf(b, c, a))
        } else a =
          new jf(b, c, a);
        a.uc = d;
        mf(e, a)
      }
    },
    V = function (a, b, c) {
      a && rf(a, bf, b, c)
    },
    sf = function (a, b) {
      a && rf(a, cf, b, void 0)
    },
    W = function (a, b) {
      a && rf(a, df, b, void 0)
    },
    tf = function (a, b) {
      a && rf(a, ff, b, void 0)
    };
  var uf = pb(),
    vf = sb() || v("iPod"),
    wf = v("iPad"),
    xf = v("Android") && !(rb() || pb() || v("Opera") || v("Silk")),
    yf = rb(),
    zf = qb() && !tb();
  var Af = function (a) {
      return (a = a.exec(nb())) ? a[1] : ""
    },
    Bf = function () {
      if (uf) return Af(/Firefox\/([0-9.]+)/);
      if (x || yb || xb) return Mb;
      if (yf) {
        if (tb() || v("Macintosh")) {
          var a = Af(/CriOS\/([0-9.]+)/);
          if (a) return a
        }
        return Af(/Chrome\/([0-9.]+)/)
      }
      if (zf && !tb()) return Af(/Version\/([0-9.]+)/);
      if (vf || wf) {
        if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(nb())) return a[1] + "." + a[2]
      } else if (xf) return (a = Af(/Android\s+([0-9.]+)/)) ? a : Af(/Version\/([0-9.]+)/);
      return ""
    }();
  var Cf = Tb(function () {
      return !x || 0 <= mb(Bf, 9)
    }),
    Df = Tb(function () {
      return C || yb || z && 0 <= mb(Bf, 10) || x && 0 <= mb(Bf, 10)
    }),
    Ff = function (a, b) {
      Cf() && (b = Df() ? "translate3d(0px," + b + "px,0px)" : "translate(0px," + b + "px)", kd(a, Ef(), b))
    },
    Ef = Tb(function () {
      return x && 9 == Rb ? "-ms-transform" : "transform"
    });
 
  var Qf = function (a, b, c, d, e, f) {
      if (Ab && e) return Of(a);
      if (e && !d) return !1;
      if (!z) {
        "number" === typeof b && (b = Pf(b));
        var g = 17 == b || 18 == b || Ab && 91 == b;
        if ((!c || Ab) && g || Ab && 16 == b && (d || f)) return !1
      }
      if ((C || yb) && d && c) switch (a) {
        case 220:
        case 219:
        case 221:
        case 192:
        case 186:
        case 189:
        case 187:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
          return !1
      }
      if (x && d && b == a) return !1;
      switch (a) {
        case 13:
          return z ? f || e ? !1 : !(c && d) : !0;
        case 27:
          return !(C || yb || z)
      }
      return z && (d || e || f) ? !1 : Of(a)
    },
    Of = function (a) {
      if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a
        && 90 >= a || (C || yb) && 0 == a) return !0;
      switch (a) {
        case 32:
        case 43:
        case 63:
        case 64:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
        case 163:
        case 58:
          return !0;
        case 173:
          return z;
        default:
          return !1
      }
    },
    Pf = function (a) {
      if (z) a = Rf(a);
      else if (Ab && C) switch (a) {
        case 93:
          a = 91
      }
      return a
    },
    Rf = function (a) {
      switch (a) {
        case 61:
          return 187;
        case 59:
          return 186;
        case 173:
          return 189;
        case 224:
          return 91;
        case 0:
          return 224;
        default:
          return a
      }
    };
  var Sf = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "caps-lock",
    27: "esc",
    32: "space",
    33: "pg-up",
    34: "pg-down",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    59: "semicolon",
    61: "equals",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    93: "context",
    96: "num-0",
    97: "num-1",
    98: "num-2",
    99: "num-3",
    100: "num-4",
    101: "num-5",
    102: "num-6",
    103: "num-7",
    104: "num-8",
    105: "num-9",
    106: "num-multiply",
    107: "num-plus",
    109: "num-minus",
    110: "num-period",
    111: "num-division",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    186: "semicolon",
    187: "equals",
    189: "dash",
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "open-square-bracket",
    220: "\\",
    221: "close-square-bracket",
    222: "single-quote",
    224: "win"
  };
  var Tf = function (a, b, c, d, e, f, g, k, l, m) {
    this.G = a;
    this.Ic = b;
    this.Vc = c;
    this.ma = d;
    this.nb = e;
    this.Vb = f;
    this.cc = g;
    this.Tc = k;
    this.cb = l;
    this.Yc = m
  };
  Tf.prototype.getKey = function () {
    return this.Ic
  };
  var Zf = function (a) {
      var b = a.ra;
      b = (b = b && "composed" in b && b && "composedPath" in b && b.composed && b.composedPath()) && 0 < b.length ? b[0] : a.target;
      return Uf(Vf(Wf(Xf((new Yf).keyCode(a.keyCode || 0).key(a.key || "").shiftKey(!!a.shiftKey).altKey(!!a.altKey).ctrlKey(!!a.ctrlKey).metaKey(!!a.metaKey).target(a.target), b), function () {
        return a.preventDefault()
      }), function () {
        return a.stopPropagation()
      }))
    },
    Yf = function () {
      this.G = null;
      this.Ic = "";
      this.Yc = this.cb = this.Tc = this.cc = this.Vb = this.nb = this.ma = this.Vc = null
    };
  h = Yf.prototype;
  h.keyCode = function (a) {
    this.G = a;
    return this
  };
  h.key = function (a) {
    this.Ic = a;
    return this
  };
  h.shiftKey = function (a) {
    this.Vc = a;
    return this
  };
  h.altKey = function (a) {
    this.ma = a;
    return this
  };
  h.ctrlKey = function (a) {
    this.nb = a;
    return this
  };
  h.metaKey = function (a) {
    this.Vb = a;
    return this
  };
  h.target = function (a) {
    this.cc = a;
    return this
  };
  var Xf = function (a, b) {
      a.Tc = b;
      return a
    },
    Wf = function (a, b) {
      a.cb = b;
      return a
    },
    Vf = function (a, b) {
      a.Yc = b;
      return a
    },
    Uf = function (a) {
      return new Tf(Na(a.G), a.Ic, Ra(a.Vc), Ra(a.ma), Ra(a.nb), Ra(a.Vb), u(a.cc), u(a.Tc), Pa(a.cb), Pa(a.Yc))
    };
  var $f = function (a, b, c) {
    N.call(this, a, c);
    this.identifier = b
  };
  t($f, N);
  var cg = function (a) {
      S.call(this);
      this.Mb = this.ac = {};
      this.Jc = 0;
      this.eg = $b(ag);
      this.Zg = $b(bg);
      this.Nf = !0;
      this.Lf = this.Of = !1;
      this.sg = !0;
      this.Mf = !1;
      this.ld = null;
      this.ba = a;
      O(this.ba, "keydown", this.Fe, void 0, this);
      O(this.ba, "synthetic-keydown", this.He, void 0, this);
      Bb && (O(this.ba, "keypress", this.Je, void 0, this), O(this.ba, "synthetic-keypress", this.Ke, void 0, this));
      O(this.ba, "keyup", this.Ge, void 0, this);
      O(this.ba, "synthetic-keyup", this.Ie, void 0, this)
    },
    dg;
  t(cg, S);
  var eg = function (a) {
      this.Vd = a || null;
      this.next = a ? null : {}
    },
    ag = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 19],
    bg = "color date datetime datetime-local email month number password search tel text time url week".split(" ");
  cg.prototype.Mg = function (a, b) {
    fg(this.ac, gg(arguments), a)
  };
  var gg = function (a) {
    if ("string" === typeof a[1]) a = hg(a[1]).map(function (d) {
      Na(d.keyCode, "A non-modifier key is needed in each stroke.");
      return ig(d.key || "", d.keyCode, d.modifiers)
    });
    else {
      var b = a,
        c = 1;
      Array.isArray(a[1]) && (b = a[1], c = 0);
      for (a = []; c < b.length; c += 2) a.push(ig("", b[c], b[c + 1]))
    }
    return a
  };
  cg.prototype.B = function () {
    cg.v.B.call(this);
    this.ac = {};
    P(this.ba, "keydown", this.Fe, !1, this);
    P(this.ba, "synthetic-keydown", this.He, !1, this);
    Bb && (P(this.ba, "keypress", this.Je, !1, this), P(this.ba, "synthetic-keypress", this.Ke, !1, this));
    P(this.ba, "keyup", this.Ge, !1, this);
    P(this.ba, "synthetic-keyup", this.Ie, !1, this);
    this.ba = null
  };
  var hg = function (a) {
    a = a.replace(/[ +]*\+[ +]*/g, "+").replace(/[ ]+/g, " ").toLowerCase();
    a = a.split(" ");
    for (var b = [], c, d = 0; c = a[d]; d++) {
      var e = c.split("+"),
        f = null,
        g = null;
      c = 0;
      for (var k, l = 0; k = e[l]; l++) {
        switch (k) {
          case "shift":
            c |= 1;
            continue;
          case "ctrl":
            c |= 2;
            continue;
          case "alt":
            c |= 4;
            continue;
          case "meta":
            c |= 8;
            continue
        }
        null !== g && Ma("At most one non-modifier key can be in a stroke.");
        e = void 0;
        f = k;
        if (!dg) {
          g = {};
          for (e in Sf) g[Sf[e]] = Pf(parseInt(e, 10));
          dg = g
        }
        g = dg[f];
        Na(g, "Key name not found in goog.events.KeyNames: "
          + k);
        f = k;
        break
      }
      b.push({
        key: f,
        keyCode: g,
        modifiers: c
      })
    }
    return b
  };
  cg.prototype.Ge = function (a) {
    a = Zf(a);
    z && jg(this, a);
    Bb && !this.Dc && kg(a) && this.rb(a, !0)
  };
  cg.prototype.Ie = function (a) {
    a = a.getData();
    z && jg(this, a);
    Bb && !this.Dc && kg(a) && this.rb(a, !0)
  };
  var jg = function (a, b) {
      32 == a.ld && 32 == b.G && (0, b.cb)();
      a.ld = null
    },
    kg = function (a) {
      return Bb && a.nb && a.ma
    };
  cg.prototype.Je = function (a) {
    a = Zf(a);
    32 < a.G && kg(a) && (this.Dc = !0)
  };
  cg.prototype.Ke = function (a) {
    a = a.getData();
    32 < a.G && kg(a) && (this.Dc = !0)
  };
  var fg = function (a, b, c) {
      var d = b.shift();
      d.forEach(function (e) {
        if ((e = a[e]) && (0 == b.length || e.Vd)) throw Error("Keyboard shortcut conflicts with existing shortcut: " + e.Vd);
      });
      b.length ? d.forEach(function (e) {
        e = e.toString();
        var f = new eg;
        e = e in a ? a[e] : a[e] = f;
        f = b.slice(0);
        fg(u(e.next, "An internal node must have a next map"), f, c)
      }) : d.forEach(function (e) {
        a[e] = new eg(c)
      })
    },
    lg = function (a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = a[b[c]];
        if (d) return d
      }
    },
    ig = function (a, b, c) {
      c = c || 0;
      b = ["c_" + b + "_" + c];
      "" != a && b.push("n_" + a
        + "_" + c);
      return b
    };
  cg.prototype.Fe = function (a) {
    this.rb(Zf(a))
  };
  cg.prototype.He = function (a) {
    this.rb(a.getData())
  };
  cg.prototype.rb = function (a, b) {
    a: {
      var c = a.G;
      if ("" != a.getKey()) {
        var d = a.getKey();
        if ("Control" == d || "Shift" == d || "Meta" == d || "AltGraph" == d) {
          c = !1;
          break a
        }
      } else if (16 == c || 17 == c || 18 == c) {
        c = !1;
        break a
      }
      d = a.Tc;
      var e = "TEXTAREA" == d.tagName || "INPUT" == d.tagName || "BUTTON" == d.tagName || "SELECT" == d.tagName,
        f = !e && (d.isContentEditable || d.ownerDocument && "on" == d.ownerDocument.designMode);c = !e && !f || this.eg[c] || this.Lf ? !0 : f ? !1 : this.sg && (a.ma || a.nb || a.Vb) ? !0 : "INPUT" == d.tagName && this.Zg[d.type] ? 13 == c : "INPUT" == d.tagName || "BUTTON"
        == d.tagName ? this.Mf ? !0 : 32 != c : !1
    }
    if (c)
      if (!b && kg(a)) this.Dc = !1;
      else {
        b = Pf(a.G);
        c = a.getKey();
        c = ig(c, b, (a.Vc ? 1 : 0) | (a.nb ? 2 : 0) | (a.ma ? 4 : 0) | (a.Vb ? 8 : 0));
        d = lg(this.Mb, c);
        if (!d || 1500 <= Date.now() - this.Jc) this.Mb = this.ac, this.Jc = Date.now();
        (d = lg(this.Mb, c)) && d.next && (this.Mb = d.next, this.Jc = Date.now());
        d && (d.next ? (0, a.cb)() : (this.Mb = this.ac, this.Jc = Date.now(), this.Nf && (0, a.cb)(), this.Of && (0, a.Yc)(), c = Oa(d.Vd, "A terminal node must have a string shortcut identifier."), d = this.dispatchEvent(new $f("shortcut", c, a.cc)),
          (d &= this.dispatchEvent(new $f("shortcut_" + c, c, a.cc))) || (0, a.cb)(), z && (this.ld = b)))
      }
  };
  var ng = function () {
      var a = this;
      var b = void 0 === b ? !0 : b;
      this.g = U("blogger.templates.responsive.Search");
      W(this.g, "Initializing Search.");
      try {
        if (this.Lb = document.querySelector(".centered-top-container")) {
          var c = this.Lb.querySelector(".search");
          if (c) {
            this.Ma = c;
            var d = this.Lb.querySelectorAll(".search-expand");
            (this.eb = d && Array.prototype.slice.call(d, 0)) && 0 != this.eb.length ? (this.$b = this.Lb.querySelector(".search-close"), this.K = b && Nf(this.Ma, function () {
                return a.ee()
              }) || null, (this.qd = this.Lb.querySelector(".centered-top"))
              ? (this.nf = this.Ma.querySelector(".search-action"), (this.fb = this.Ma.querySelector(".search-input input")) ? (this.We = new cg(document), mg(this), W(this.g, "Finished initializing search section.")) : V(this.g, "There was an error initializing the search section. search input not found.")) : V(this.g, "There was an error initializing the search section. centered-top not found.")) : sf(this.g, "There was an error initializing the search section. No search buttons found.")
          } else V(this.g, "There was an error initializing the search section. search section not found.")
        } else V(this.g,
          "There was an error initializing the search section. container not found.")
      } catch (e) {
        V(this.g, "Error initializing section. Uncaught exception.", e), this.h()
      }
    },
    mg = function (a) {
      if (a.eb)
        for (var b = n(a.eb), c = b.next(); !c.done; c = b.next()) O(c.value, "click", a.ee, !1, a);
      a.$b && O(a.$b, "click", a.ee, !1, a);
      b = function () {
        a.nf && (a.nf.disabled = "" == a.fb.value)
      };
      O(a.fb, "input", b);
      b();
      a.We.Mg("showSearch", 191, 0);
      O(a.We, "shortcut", a.Ce, !1, a)
    };
  ng.prototype.ee = function () {
    M.contains(this.Ma, "focused") ? M.contains(this.Ma, "focused") && (M.remove(this.Ma, "focused"), M.remove(this.qd, "search-focused"), this.K && this.K.Qb()) : this.Ce()
  };
  ng.prototype.Ce = function () {
    M.contains(this.Ma, "focused") || (M.add(this.qd, "search-focused"), M.add(this.Ma, "focused"), this.K && this.K.show());
    this.fb.focus()
  };
  ng.prototype.h = function () {
    this.K && (this.K.aa(), this.K = null);
    if (this.eb) {
      for (var a = n(this.eb), b = a.next(); !b.done; b = a.next()) R(b.value, "click");
      this.eb = null
    }
    this.$b && (R(this.$b, "click"), this.$b = null);
    this.fb && (R(this.fb, "input"), this.fb = null)
  };
  var og = function () {};
  og.prototype.O = function () {};
  var pg = function () {
    if (Bb) {
      var a = /Windows NT ([0-9.]+)/;
      return (a = a.exec(nb())) ? a[1] : "0"
    }
    return Ab ? (a = /1[0|1][_.][0-9_.]+/, (a = a.exec(nb())) ? a[0].replace(/_/g, ".") : "10") : Cb ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(nb())) ? a[1] : "") : Db || Eb || Fb ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(nb())) ? a[1].replace(/_/g, ".") : "") : ""
  }();
  var sg = function (a, b, c, d, e, f, g, k, l) {
      u(c);
      var m;
      if (m = c.offsetParent) {
        var p = "HTML" == m.tagName || "BODY" == m.tagName;
        if (!p || "static" != nd(m)) {
          var q = sd(m);
          if (!p) {
            p = zd(m);
            var y;
            if (y = p) {
              y = zf && 0 <= mb(Bf, 10);
              var w;
              if (w = Gb) w = 0 <= mb(pg, 10);
              var A = yf && 0 <= mb(Bf, 85);
              y = z || y || w || A
            }
            p = y ? -m.scrollLeft : p && !zb && "visible" != md(m, "overflowX") ? m.scrollWidth - m.clientWidth - m.scrollLeft : m.scrollLeft;
            q = Bc(q, new E(p, m.scrollTop))
          }
        }
      }
      m = q || new E;
      q = sd(a);
      p = xd(a);
      q = new id(q.x, q.y, p.width, p.height);
      if (p = td(a)) A = new id(p.left, p.top, p.right
        - p.left, p.bottom - p.top), p = Math.max(q.left, A.left), y = Math.min(q.left + q.width, A.left + A.width), p <= y && (w = Math.max(q.top, A.top), A = Math.min(q.top + q.height, A.top + A.height), w <= A && (q.left = p, q.top = w, q.width = y - p, q.height = A - w));
      p = Gc(a);
      w = Gc(c);
      if (p.l != w.l) {
        y = p.l.body;
        w = dd(w);
        A = new E(0, 0);
        var D = Pc(F(y));
        if (vb(D, "parent")) {
          var B = y;
          do {
            if (D == w) var J = sd(B);
            else J = u(B), J = qd(J), J = new E(J.left, J.top);
            A.x += J.x;
            A.y += J.y
          } while (D && D != w && D != D.parent && (B = D.frameElement) && (D = D.parent))
        }
        y = Bc(A, sd(y));
        !x || 9 <= Number(Rb) || Lc(p.l)
          || (y = Bc(y, Oc(p.l)));
        q.left += y.x;
        q.top += y.y
      }
      a = qg(a, b);
      b = q.left;
      a & 4 ? b += q.width : a & 2 && (b += q.width / 2);
      b = new E(b, q.top + (a & 1 ? q.height : 0));
      b = Bc(b, m);
      e && (b.x += (a & 4 ? -1 : 1) * e.x, b.y += (a & 1 ? -1 : 1) * e.y);
      if (g)
        if (l) var K = l;
        else if (K = td(c)) K.top -= m.y, K.right -= m.x, K.bottom -= m.y, K.left -= m.x;
      return rg(b, c, d, f, K, g, k)
    },
    rg = function (a, b, c, d, e, f, g) {
      a = a.clone();
      var k = qg(b, c);
      c = xd(b);
      g = g ? g.clone() : c.clone();
      a = a.clone();
      g = g.clone();
      var l = 0;
      if (d || 0 != k) k & 4 ? a.x -= g.width + (d ? d.right : 0) : k & 2 ? a.x -= g.width / 2 : d && (a.x += d.left), k & 1 ? a.y -= g.height
        + (d ? d.bottom : 0) : d && (a.y += d.top);
      if (f) {
        if (e) {
          d = a;
          k = g;
          l = 0;
          65 == (f & 65) && (d.x < e.left || d.x >= e.right) && (f &= -2);
          132 == (f & 132) && (d.y < e.top || d.y >= e.bottom) && (f &= -5);
          d.x < e.left && f & 1 && (d.x = e.left, l |= 1);
          if (f & 16) {
            var m = d.x;
            d.x < e.left && (d.x = e.left, l |= 4);
            d.x + k.width > e.right && (k.width = Math.min(e.right - d.x, m + k.width - e.left), k.width = Math.max(k.width, 0), l |= 4)
          }
          d.x + k.width > e.right && f & 1 && (d.x = Math.max(e.right - k.width, e.left), l |= 1);
          f & 2 && (l |= (d.x < e.left ? 16 : 0) | (d.x + k.width > e.right ? 32 : 0));
          d.y < e.top && f & 4 && (d.y = e.top, l |= 2);
          f & 32
            && (m = d.y, d.y < e.top && (d.y = e.top, l |= 8), d.y + k.height > e.bottom && (k.height = Math.min(e.bottom - d.y, m + k.height - e.top), k.height = Math.max(k.height, 0), l |= 8));
          d.y + k.height > e.bottom && f & 4 && (d.y = Math.max(e.bottom - k.height, e.top), l |= 2);
          f & 8 && (l |= (d.y < e.top ? 64 : 0) | (d.y + k.height > e.bottom ? 128 : 0));
          e = l
        } else e = 256;
        l = e
      }
      f = new id(0, 0, 0, 0);
      f.left = a.x;
      f.top = a.y;
      f.width = g.width;
      f.height = g.height;
      e = l;
      if (e & 496) return e;
      pd(b, new E(f.left, f.top));
      g = new Cc(f.width, f.height);
      c == g || c && g && c.width == g.width && c.height == g.height || (c = g, g = F(b),
        a = Lc(Gc(g).l), !x || Ob("10") || a ? (b = b.style, z ? b.MozBoxSizing = "border-box" : C ? b.WebkitBoxSizing = "border-box" : b.boxSizing = "border-box", b.width = Math.max(c.width, 0) + "px", b.height = Math.max(c.height, 0) + "px") : (g = b.style, a ? (x ? (a = Bd(b, "paddingLeft"), f = Bd(b, "paddingRight"), d = Bd(b, "paddingTop"), k = Bd(b, "paddingBottom"), a = new hd(d, f, k, a)) : (a = H(b, "paddingLeft"), f = H(b, "paddingRight"), d = H(b, "paddingTop"), k = H(b, "paddingBottom"), a = new hd(parseFloat(d), parseFloat(f), parseFloat(k), parseFloat(a))), b = Ed(b), g.pixelWidth = c.width
          - b.left - a.left - a.right - b.right, g.pixelHeight = c.height - b.top - a.top - a.bottom - b.bottom) : (g.pixelWidth = c.width, g.pixelHeight = c.height)));
      return e
    },
    qg = function (a, b) {
      return (b & 8 && zd(a) ? b ^ 4 : b) & -9
    };
  var tg = function (a, b) {
    this.Vf = a instanceof E ? a : new E(a, b)
  };
  t(tg, og);
  tg.prototype.O = function (a, b, c, d) {
    rg(this.Vf, a, b, c, null, null, d)
  };
  var ug, vg = {
    hh: "activedescendant",
    mh: "atomic",
    nh: "autocomplete",
    ph: "busy",
    sh: "checked",
    th: "colindex",
    yh: "controls",
    zh: "current",
    Bh: "describedby",
    Eh: "disabled",
    Gh: "dropeffect",
    Hh: "expanded",
    Ih: "flowto",
    Kh: "grabbed",
    Oh: "haspopup",
    Qh: "hidden",
    Sh: "invalid",
    Th: "label",
    Uh: "labelledby",
    Vh: "level",
    $h: "live",
    ji: "multiline",
    ki: "multiselectable",
    oi: "orientation",
    pi: "owns",
    ri: "posinset",
    ti: "pressed",
    xi: "readonly",
    zi: "relevant",
    Ai: "required",
    Ei: "rowindex",
    Hi: "selected",
    Ji: "setsize",
    Li: "sort",
    Zi: "valuemax",
    $i: "valuemin",
    aj: "valuenow",
    bj: "valuetext"
  };
  var wg = {
    ih: "alert",
    jh: "alertdialog",
    kh: "application",
    lh: "article",
    oh: "banner",
    qh: "button",
    rh: "checkbox",
    uh: "columnheader",
    vh: "combobox",
    wh: "complementary",
    xh: "contentinfo",
    Ah: "definition",
    Ch: "dialog",
    Dh: "directory",
    Fh: "document",
    Jh: "form",
    Lh: "grid",
    Mh: "gridcell",
    Nh: "group",
    Ph: "heading",
    Rh: "img",
    Wh: "link",
    Xh: "list",
    Yh: "listbox",
    Zh: "listitem",
    ai: "log",
    bi: "main",
    ci: "marquee",
    di: "math",
    ei: "menu",
    fi: "menubar",
    gi: "menuitem",
    hi: "menuitemcheckbox",
    ii: "menuitemradio",
    li: "navigation",
    mi: "note",
    ni: "option",
    si: "presentation",
    ui: "progressbar",
    vi: "radio",
    wi: "radiogroup",
    yi: "region",
    Bi: "row",
    Ci: "rowgroup",
    Di: "rowheader",
    Fi: "scrollbar",
    Gi: "search",
    Ii: "separator",
    Ki: "slider",
    Mi: "spinbutton",
    Ni: "status",
    Oi: "tab",
    Pi: "tablist",
    Qi: "tabpanel",
    Ri: "textbox",
    Si: "textinfo",
    Ti: "timer",
    Ui: "toolbar",
    Vi: "tooltip",
    Wi: "tree",
    Xi: "treegrid",
    Yi: "treeitem"
  };
  var xg = function (a, b) {
      b ? (u(Xb(wg, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
    },
    X = function (a, b, c) {
      Array.isArray(c) && (c = c.join(" "));
      var d = yg(b);
      "" === c || void 0 == c ? (ug || (ug = {
        atomic: !1,
        autocomplete: "none",
        dropeffect: "none",
        haspopup: !1,
        live: "off",
        multiline: !1,
        multiselectable: !1,
        orientation: "vertical",
        readonly: !1,
        relevant: "additions text",
        required: !1,
        sort: "none",
        busy: !1,
        disabled: !1,
        hidden: !1,
        invalid: "false"
      }), c = ug, b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d,
        c)
    },
    Ag = function (a, b) {
      var c = zg(a, b);
      /^[\s\xa0]*$/.test(null == c ? "" : String(c)) || "true" == c || "false" == c ? X(a, b, "true" == c ? "false" : "true") : a.removeAttribute(yg(b))
    },
    zg = function (a, b) {
      a = a.getAttribute(yg(b));
      return null == a || void 0 == a ? "" : String(a)
    },
    yg = function (a) {
      u(a, "ARIA attribute cannot be empty.");
      u(Xb(vg, a), "No such ARIA attribute " + a);
      return "aria-" + a
    };
  var Bg = function (a, b) {
    if ("FORM" == a.tagName)
      for (var c = a.elements, d = 0; a = c.item(d); d++) Bg(a, b);
    else 1 == b && a.blur(), a.disabled = b
  };
  var Cg = function () {
      this.Jb = this.wg = ""
    },
    Dg = /"/g,
    Eg = /\\/g,
    Fg = RegExp("^[+a-zA-Z0-9_.!#$%&'*\\/=?^`{|}~-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z0-9]{2,63}$");
  Cg.prototype.qb = function () {
    return this.wg
  };
  Cg.prototype.toString = function () {
    var a = this.qb();
    a = a.replace(Dg, "");
    var b;
    a: {
      for (b = 0; 13 > b; b++)
        if (-1 != a.indexOf('()<>@:\\".[],;' [b])) {
          b = !0;
          break a
        } b = !1
    }
    b && (a = '"' + a.replace(Eg, "\\\\") + '"');
    return "" == a ? this.Jb : "" == this.Jb ? a : a + " <" + this.Jb + ">"
  };
  var Hg = function (a, b) {
    S.call(this);
    this.U = new le(this);
    a = a || null;
    Gg(this);
    this.i = a;
    b && (this.Hb = b)
  };
  t(Hg, S);
  h = Hg.prototype;
  h.i = null;
  h.oe = !0;
  h.me = null;
  h.ne = null;
  h.wb = !1;
  h.Sg = !1;
  h.Hd = -1;
  h.Ne = !1;
  h.Zf = !0;
  h.Hb = "toggle_display";
  h.getType = function () {
    return this.Hb
  };
  h.m = function () {
    return this.i
  };
  var Ig = function (a) {
      Gg(a);
      a.oe = !0
    },
    Jg = function (a) {
      Gg(a);
      a.Ne = !0
    };
  Hg.prototype.rf = function (a, b) {
    this.Fb = a;
    this.ub = b
  };
  Hg.prototype.Ia = function () {
    return this.U
  };
  var Gg = function (a) {
    if (a.wb) throw Error("Can not change this state of the popup while showing.");
  };
  h = Hg.prototype;
  h.isVisible = function () {
    return this.wb
  };
  h.I = function (a) {
    this.Fb && this.Fb.stop();
    this.ub && this.ub.stop();
    a ? this.Wd() : this.vb()
  };
  h.O = ua;
  h.Wd = function () {
    if (!this.wb && this.dispatchEvent("beforeshow")) {
      if (!this.i) throw Error("Caller must call setElement before trying to show the popup");
      this.O();
      var a = F(this.i);
      this.Ne && this.U.D(a, "keydown", this.zg, !0);
      if (this.oe)
        if (this.U.D(a, "mousedown", this.bf, !0), x) {
          try {
            var b = a.activeElement
          } catch (d) {}
          for (; b && "IFRAME" == b.nodeName;) {
            try {
              var c = b.contentDocument || b.contentWindow.document
            } catch (d) {
              break
            }
            a = c;
            b = a.activeElement
          }
          this.U.D(a, "mousedown", this.bf, !0);
          this.U.D(a, "deactivate", this.af)
        } else this.U.D(a,
          "blur", this.af);
      "toggle_display" == this.Hb ? (this.i.style.visibility = "visible", I(this.i, !0)) : "move_offscreen" == this.Hb && this.O();
      this.wb = !0;
      this.Hd = Date.now();
      this.Fb ? (ae(this.Fb, "end", this.$a, !1, this), this.Fb.play()) : this.$a()
    }
  };
  h.vb = function (a) {
    if (!this.wb || !this.dispatchEvent({
        type: "beforehide",
        target: a
      })) return !1;
    this.U && this.U.ja();
    this.wb = !1;
    this.ub ? (ae(this.ub, "end", Ea(this.ve, a), !1, this), this.ub.play()) : this.ve(a);
    return !0
  };
  h.ve = function (a) {
    "toggle_display" == this.Hb ? this.Sg ? Ye(this.Oe, 0, this) : this.Oe() : "move_offscreen" == this.Hb && (this.i.style.top = "-10000px");
    this.zb(a)
  };
  h.Oe = function () {
    this.i.style.visibility = "hidden";
    I(this.i, !1)
  };
  h.$a = function () {
    this.dispatchEvent("show")
  };
  h.zb = function (a) {
    this.dispatchEvent({
      type: "hide",
      target: a
    })
  };
  h.bf = function (a) {
    a = a.target;
    ad(this.i, a) || Kg(this, a) || this.ne && !ad(this.ne, a) || 150 > Date.now() - this.Hd || this.vb(a)
  };
  h.zg = function (a) {
    27 == a.keyCode && this.vb(a.target) && (a.preventDefault(), a.stopPropagation())
  };
  h.af = function (a) {
    if (this.Zf) {
      var b = F(this.i);
      if ("undefined" != typeof document.activeElement) {
        if (a = b.activeElement, !a || ad(this.i, a) || "BODY" == a.tagName || Kg(this, a)) return
      } else if (a.target != b) return;
      150 > Date.now() - this.Hd || this.vb()
    }
  };
  var Kg = function (a, b) {
    return Va(a.me || [], function (c) {
      return b === c || ad(c, b)
    })
  };
  Hg.prototype.B = function () {
    Hg.v.B.call(this);
    this.U.wa();
    Kd(this.Fb);
    Kd(this.ub);
    delete this.i;
    delete this.U;
    delete this.me
  };
  var Lg = function (a, b) {
    this.Md = 8;
    this.Nd = b || void 0;
    Hg.call(this, a)
  };
  t(Lg, Hg);
  Lg.prototype.setPosition = function (a) {
    this.Nd = a || void 0;
    this.isVisible() && this.O()
  };
  Lg.prototype.O = function () {
    if (this.Nd) {
      var a = !this.isVisible() && "move_offscreen" != this.getType(),
        b = this.m();
      a && (b.style.visibility = "hidden", I(b, !0));
      this.Nd.O(b, this.Md, this.hj);
      a && I(b, !1)
    }
  };
  var Ng = function () {
    this.g = U("blogger.templates.responsive.Subscribe");
    W(this.g, "Initializing Subscribe.");
    try {
      if (this.Rf = ".centered-top", this.s = document.body && Nf(document.body, null, "subscribe-dim-overlay"), this.A = document.querySelector(".centered-top-container"))
        if (this.M = this.A.querySelector(".subscribe-popup"))
          if (this.u = new Lg(this.M), this.be = this.A.querySelector(".subscribe-popup-container"))
            if (this.bc = this.A.querySelector(".subscribe-button"))
              if (this.ya = this.M.querySelector(".follow-by-email-address")) {
                if (this.pb =
                  this.M.querySelector(".follow-by-email-submit")) O(this.ya, "input", this.Df, !1, this), Mg(this, !0), this.Df(), this.Td(), W(this.g, "Finished initializing Subscribe.")
              } else V(this.g, 'There was an error initializing the subscribe section. ".follow-by-email-address" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ".subscribe-button" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ."subscribe-popup-container" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ".subscribe-popup" not found.');
      else V(this.g, 'There was an error initializing the subscribe section. ".centered-top-container" not found.')
    } catch (a) {
      V(this.g, "Error initializing Subscribe. Uncaught exception.", a), this.h()
    }
  };
  Ng.prototype.Df = function () {
    var a = "function" == typeof document.createElement("input").checkValidity,
      b;
    if (b = "" != this.ya.value)(a = a && this.ya.validity.valid) || (a = new Cg, a.Jb = this.ya.value.trim(), a = Fg.test(a.Jb)), b = a;
    Mg(this, !b)
  };
  var Mg = function (a, b) {
    a.pb && (Bg(a.pb, b), X(a.pb, "disabled", b))
  };
  Ng.prototype.Td = function () {
    var a = this;
    Jg(this.u);
    Ig(this.u);
    O(window, "resize", this.hf, !1, this);
    O(this.bc, "click", this.Eb, !1, this);
    O(this.u, "hide", this.tb, !1, this);
    O(this.pb, "click", function () {
      !a.pb.disabled && a.tb()
    }, !1, this)
  };
  Ng.prototype.tb = function () {
    this.ya && this.ya.blur();
    M.add(this.M, "hidden");
    document.body.removeChild(this.M);
    this.be.appendChild(this.M);
    this.s.Qb();
    this.bc.focus()
  };
  Ng.prototype.hf = function () {
    this.u && this.u.isVisible() && (Og(this), this.u.O())
  };
  var Og = function (a) {
    a.M.style.visibility = "hidden";
    var b = M.contains(a.M, "hidden");
    M.remove(a.M, "hidden");
    var c = a.M.clientWidth;
    var d = a.M.clientHeight;
    b && M.add(a.M, "hidden");
    a.M.style.visibility = "visible";
    c = new Cc(c, d);
    b = c.width;
    c = c.height;
    d = a.Rf;
    var e = document.querySelector(void 0 === d ? ".centered" : d).getBoundingClientRect();
    d = e.left;
    e = e.width;
    var f = window.innerHeight;
    b = ("ltr" == document.documentElement.getAttribute("dir") ? -1 : 1) * b / 2;
    a.u.setPosition(new tg(d + e / 2 + b, f / 2 - c / 2))
  };
  Ng.prototype.Eb = function () {
    this.be.removeChild(this.M);
    document.body.appendChild(this.M);
    this.u.I(!1);
    M.remove(this.M, "hidden");
    this.u.I(!0);
    Og(this);
    this.s.show();
    (this.u.m().querySelector("input:not([type=hidden])") || this.u.m()).focus()
  };
  Ng.prototype.h = function () {
    this.s && (this.s.aa(), this.s = null);
    P(window, "resize", this.hf, !1, this);
    this.u && (this.u.wa(), this.u = null);
    this.ya && R(this.ya, "input");
    this.bc && R(this.bc, "click")
  };
  var Pg = function (a) {
    this.g = U("blogger.templates.fancy.ActionBar");
    W(this.g, "Initializing fancy actionbar.");
    try {
      a = a || new Ha, this.ue = new Hf(a.Uf), this.Af = new Ng, this.pf = new ng, W(this.g, "Finished initializing fancy actionbar.")
    } catch (b) {
      V(this.g, "Error initializing fancy actionbar. Uncaught exception.", b), this.h()
    }
  };
  Pg.prototype.h = function () {
    this.ue.h();
    this.Af.h();
    this.pf.h();
    this.pf = this.Af = this.ue = null
  };
  var Qg = function () {
    this.If = new Ha
  };

  function Rg(a, b, c, d) {
    b = void 0 === b ? 10 : b;
    c = void 0 === c ? 1E3 : c;
    d = void 0 === d ? null : d;
    var e = 0,
      f = function () {
        e++ < c ? a() || setTimeout(f, b) : d && d()
      };
    f()
  }
  var Tg = function () {
    var a = Sg();
    var b = void 0 === b ? 10 : b;
    var c = void 0 === c ? 1E3 : c;
    return new T(function (d, e) {
      var f = !1;
      Rg(a, b, c, function () {
        f = !0;
        e()
      });
      f || d()
    })
  };
  var Ug = function () {
      this.g = U("blogger.templates.fancy.Layout");
      this.Ub = null
    },
    Vg = function (a) {
      M.contains(document.body, "feed-view") && Rg(function () {
        W(a.g, "Checking if Masonry has loaded.");
        return window.imagesLoaded && window.Masonry ? (W(a.g, "Masonry has loaded."), window.imagesLoaded(".blog-posts", function () {
          W(a.g, "Images have loaded. Setting up Masonry");
          window.addEventListener && window.dispatchEvent ? window.addEventListener("skinUpdated", function () {
              return window.dispatchEvent(new Event("resize"))
            }) : window.attachEvent
            && window.fireEvent && window.attachEvent("skinUpdated", function () {
              return window.fireEvent(new Event("resize"))
            });
          var b = "ltr" === r.document.documentElement.getAttribute("dir");
          a.Ub = new window.Masonry(".blog-posts", {
            gutter: 20,
            isOriginLeft: b,
            itemSelector: ".post-outer-container",
            transitionDuration: 0
          });
          document.body.setAttribute("data-js-layout", "complete");
          setTimeout(function () {
            return a.Ub.layout()
          }, 1E3)
        }), !0) : !1
      }, 10, 1E3, function () {
        V(a.g, "Timed out waiting for Masonry to load.")
      })
    };
  Ug.prototype.h = function () {
    this.Ub && (this.Ub.destroy(), this.Ub = null)
  };
  var Wg = function () {};
  Wg.prototype.ia = function () {
    throw Error('Component "init" method must be implemented.');
  };
  Wg.prototype.h = function () {
    throw Error('Component "teardown" method must be implemented.');
  };
  var Xg = function (a, b, c, d) {
    d = void 0 === d ? [] : d;
    this.Kb = a;
    this.mb = b;
    this.dh = c;
    this.ib = d
  };
  var Yg = function (a) {
      this.g = U("blogger.templates.responsive.OverflowDetector");
      W(this.g, "Initializing overflow detector.");
      try {
        this.o = a;
        this.o.ib.push("load");
        this.o.ib.push("resize");
        for (var b = n(this.o.ib), c = b.next(); !c.done; c = b.next()) O(window, c.value, this.Uc, !1, this);
        this.Uc();
        W(this.g, "Finished initializing overflow detector.")
      } catch (d) {
        V(this.g, "Error initializing overflow detector. Uncaught exception.", d), this.h()
      }
    },
    Zg = function (a, b) {
      return (a = G(a.o.mb, b)) ? a.offsetHeight > b.offsetHeight : !1
    };
  Yg.prototype.Uc = function () {
    for (var a = n(Array.prototype.slice.call(document.querySelectorAll("." + this.o.Kb), 0)), b = a.next(); !b.done; b = a.next()) {
      b = b.value;
      var c = G(this.o.mb, b);
      c && this.o.dh(b, c.offsetHeight > b.offsetHeight)
    }
  };
  Yg.prototype.h = function () {
    P(window, "resize", this.Uc);
    P(window, "load", this.Uc)
  };
  var $g = function () {
    this.Kb = "overflowable-container";
    this.mb = "overflowable-contents";
    this.Fc = "overflowable-item";
    this.qe = "overflow-button";
    this.Wf = "overflow-count";
    this.Lg = 50;
    this.ib = []
  };
  var ah = function (a, b, c) {
    this.element = a;
    this.td = b;
    this.Hg = c
  };
  t(ah, og);
  ah.prototype.O = function (a, b, c) {
    sg(this.element, this.td, a, b, void 0, c, this.Hg)
  };
  var bh = function (a, b, c, d) {
    ah.call(this, a, b);
    this.mg = c ? 5 : 0;
    this.Kd = d || void 0
  };
  t(bh, ah);
  bh.prototype.O = function (a, b, c, d) {
    var e = sg(this.element, this.td, a, b, null, c, 10, d, this.Kd);
    if (e & 496) {
      var f = ch(e, this.td);
      b = ch(e, b);
      e = sg(this.element, f, a, b, null, c, 10, d, this.Kd);
      e & 496 && (f = ch(e, f), b = ch(e, b), sg(this.element, f, a, b, null, c, this.mg, d, this.Kd))
    }
  };
  var ch = function (a, b) {
    a & 48 && (b ^= 4);
    a & 192 && (b ^= 1);
    return b
  };
  var dh = function (a, b) {
    this.g = U("blogger.templates.responsive.Overflowable");
    this.o = b || new $g;
    this.pa = a;
    this.s = this.kc = this.Sc = this.u = this.ea = this.Xa = this.Ea = this.od = this.Qa = null;
    this.Qf = this.o.qe + "-container";
    this.ta = null
  };
  pa(dh, Wg);
  dh.prototype.ia = function () {
    var a = this;
    W(this.g, "Initializing overflowable.");
    try {
      this.Qa = G(this.o.mb, this.pa);
      if (!this.Qa) return V(this.g, "There was an error initializing an overflowable. content element not found."), Ke();
      this.Ea = G(this.o.qe, this.pa);
      this.od = eh(this);
      Yc(this.od, this.Qa);
      M.contains(this.pa, "overflowable-no-popup") || (this.ea = Sc(document, "DIV"), M.add(this.ea, "overflow-popup"), I(this.ea, !1), Yc(this.ea, this.pa));
      this.Sc = O(window, "resize", this.Dg);
      this.Td();
      fh(this);
      var b = "overflowable-"
        + Aa(this);
      M.add(this.pa, b);
      this.ta = new Yg(new Xg(b, "overflowable-backup-content", Ub(function (c, d) {
        return a.Oc(c, d)
      }, this.o.Lg, this), this.o.ib));
      this.Oc(this.pa, Zg(this.ta, this.pa));
      W(this.g, "Finished initializing overflowable.");
      return Je()
    } catch (c) {
      return V(this.g, "Error initializing overflowable. Uncaught exception.", c), Ke(c)
    }
  };
  var eh = function (a) {
    var b = Sc(document, "DIV");
    M.add(b, "overflowable-backup");
    X(b, "hidden", !0);
    b.style.position = "absolute";
    b.style.visibility = "hidden";
    b.style.bottom = "0";
    b.style.left = "0";
    b.style.right = "0";
    b.style.top = "0";
    a = a.Qa.cloneNode(!0);
    M.add(a, "overflowable-backup-content");
    b.appendChild(a);
    return b
  };
  dh.prototype.Td = function () {
    var a = this;
    this.Ea && this.ea && ($c(this.ea, this.Qa), this.u = new Lg(this.ea), Jg(this.u), Ig(this.u), this.kc = O(this.Ea, "click", function (b) {
      a.Eb();
      b.preventDefault()
    }), O(this.u, "hide", this.Bg, !1, this))
  };
  var fh = function (a) {
    var b = Ic(a.o.Fc, a.Qa);
    if (a.Ea && 0 < b.length) {
      b = b[b.length - 1];
      var c = Sc(document, b.tagName);
      M.add(c, a.Qf);
      I(c, !1);
      M.remove(a.Ea, "hidden");
      Uc(c, a.Ea);
      Xc(c, b);
      a.Xa = c
    }
  };
  h = dh.prototype;
  h.Oc = function (a, b) {
    var c = this;
    if (this.ta) {
      var d = Ic(this.o.Fc, this.Qa);
      this.Xa && (I(this.Xa, b), X(this.Xa, "hidden", !b));
      var e = 0;
      if (b) {
        var f = Ic(this.o.Fc, this.od);
        b = this.ea ? Ic(this.o.Fc, this.ea) : [];
        var g = function (l) {
          return l.offsetTop >= a.offsetHeight
        };
        e = Wa(f, g);
        g = Xa(f, g);
        f = Ya(bb(f, 0, g + 1), function (l) {
          Xc(c.Xa, l);
          return 0 == c.Xa.offsetTop
        });
        Xc(this.Xa, d[f]);
        for (g = 0; g < d.length; g++) {
          var k = g >= f;
          g < b.length && (I(b[g], k), X(b[g], "hidden", !k));
          I(d[g], !k);
          X(d[g], "hidden", k)
        }
      } else Ta(d, function (l) {
        I(l, !0);
        X(l, "hidden",
          !1)
      });
      if (d = G(this.o.Wf, a)) d.innerText = e.toString()
    }
  };
  h.Eb = function () {
    this.u.I(!1);
    var a = this.u;
    a.Md = 4;
    a.isVisible() && a.O();
    this.Ea && this.u.setPosition(new bh(this.Ea, 4));
    this.u.I(!0);
    this.s = Nf(this.pa, null, "overflowable-dim-overlay");
    this.s.show()
  };
  h.Dg = function () {
    this.u && this.u.isVisible() && this.u.O()
  };
  h.Bg = function () {
    this.ea && this.ea.style.left && (this.ea.style.left = "0");
    this.s && (this.s.aa(), this.s = null)
  };
  h.h = function () {
    this.s && (this.s.aa(), this.s = null);
    Kd(this.u);
    this.u = null;
    this.Sc && (Q(this.Sc), this.Sc = null);
    this.kc && (Q(this.kc), this.kc = null);
    this.ta && (this.ta.h(), this.ta = null);
    return Je()
  };
  var gh = function (a) {
    return Ua(Ic(a.Kb), function (b) {
      return new dh(b, a)
    })
  };
  var hh = null,
    jh = function () {
      return ih("blog").then(function (a) {
        return a.bloggerUrl
      })
    },
    kh = function (a) {
      return ih("features").then(function (b) {
        return b[a] && "TRUE" == b[a].toUpperCase()
      })
    };

  function ih(a) {
    return hh ? Je(hh[a]) : Tg().then(function () {
      var b = _WidgetManager._GetAllData(),
        c = {},
        d;
      for (d in b) c[d] = b[d];
      hh = c;
      return hh[a]
    })
  }

  function Sg() {
    return function () {
      return "undefined" !== typeof _WidgetManager && _WidgetManager ? !0 : !1
    }
  };
  var lh = function (a) {
    if ("undefined" !== typeof _WidgetManager && _WidgetManager) {
      var b = _WidgetManager._GetAllData();
      if (b && b.messages && b.messages[a]) return b.messages[a]
    }
    return null
  };
  var mh = function () {
    this.ze = !0;
    this.Pe = this.wf = null;
    this.sf = "sharing-platform-button";
    this.Pf = !0
  };
  var nh = function (a) {
    this.g = U("blogger.templates.responsive.Collapsible");
    this.pa = a;
    this.ge = this.ce = this.Ob = this.Na = this.C = null
  };
  pa(nh, Wg);
  nh.prototype.ia = function () {
    W(this.g, "Initializing collapsible.");
    try {
      var a = (this.pa || document).getElementsByTagName("DETAILS");
      if (1 != a.length) return V(this.g, "Collapsible did not contain exactly one details element."), Je();
      this.C = a[0];
      var b = (this.C || document).getElementsByTagName("SUMMARY");
      if (1 != b.length) return V(this.g, "Collapsible did not contain exactly one summary element."), Je();
      this.Na = b[0];
      this.Ob = "b-details-" + Aa(this.C);
      Id() || (this.C.id = this.Ob, xg(this.Na, "button"), X(this.Na, "controls", this.Ob),
        X(this.C, "expanded", !1), X(this.Na, "expanded", !1), ab(document.querySelectorAll("#" + this.Ob + " > :not(summary)")).forEach(function (c) {
          return X(c, "hidden", !0)
        }));
      this.ce = O(this.Na, "click", this.bd, !1, this)
    } catch (c) {
      return V(this.g, "Error initializing collapsible. Uncaught exception.", c), this.h().then(function () {
        return Ke()
      })
    }
    W(this.g, "Finished initializing collapsible.");
    return Je()
  };
  nh.prototype.bd = function (a) {
    var b = this;
    a.preventDefault();
    var c = H(this.Na, "height");
    if (this.C.hasAttribute("open")) L ? (R(this.C, L), ud(this.C, H(this.C, "height")), this.C.removeAttribute("open"), setTimeout(function () {
      ud(b.C, c)
    }, 0)) : this.C.removeAttribute("open");
    else if (ud(this.C, "auto"), this.C.setAttribute("open", "open"), L) {
      var d = H(this.C, "height");
      ud(this.C, c);
      setTimeout(function () {
        ud(b.C, d);
        b.ge = O(b.C, L, function () {
          ud(b.C, "auto");
          R(b.C, L)
        })
      }, 0)
    }
    Id() || (this.C && Ag(this.C, "expanded"), this.Na && Ag(this.Na,
      "expanded"), ab(document.querySelectorAll("#" + this.Ob + " > :not(summary)")).forEach(function (e) {
      return Ag(e, "hidden")
    }))
  };
  nh.prototype.h = function () {
    this.ce && Q(this.ce);
    this.ge && Q(this.ge);
    return Je()
  };
  var oh = function (a) {
    a = document.querySelectorAll(a);
    for (var b = [], c = 0; a && c < a.length; c++) b.push(new nh(a[c]));
    return b
  };
  var ph = function (a, b, c) {
    this.g = U("blogger.templates.responsive.Extendable");
    W(this.g, "Initializing extendable.");
    try {
      this.L = a, this.Wc = b, this.Db = c ? c : null, O(b, "click", this.bd, !1, this), c && O(c, "click", this.bd, !1, this)
    } catch (d) {
      V(this.g, "Error initializing extendable. Uncaught exception.", d), this.h()
    }
    W(this.g, "Finished initializing extendable.")
  };
  ph.prototype.bd = function () {
    var a = this;
    if (M.contains(this.L, "expanded")) L && (R(this.L, L), ud(this.L, H(this.L, "height")), setTimeout(function () {
      ud(a.L, 0)
    }, 0)), M.remove(this.L, "expanded"), M.remove(this.Wc, "hidden"), this.Db && M.add(this.Db, "hidden");
    else {
      ud(this.L, "auto");
      if (L) {
        var b = H(this.L, "height");
        ud(this.L, 0);
        setTimeout(function () {
          ud(a.L, b);
          O(a.L, L, function () {
            ud(a.L, "auto");
            R(a.L, L)
          })
        }, 0)
      }
      M.add(this.L, "expanded");
      M.add(this.Wc, "hidden");
      this.Db && M.remove(this.Db, "hidden")
    }
  };
  ph.prototype.h = function () {
    this.Wc && R(this.Wc, "click");
    this.Db && R(this.Db, "click");
    this.L && (R(this.L, L), R(this.L, "click"))
  };
  var qh = function (a) {
    a = document.querySelectorAll(".widget." + a);
    for (var b = [], c = 0; a && c < a.length; c++) {
      var d = a[c],
        e = G("show-more", d),
        f = G("show-less", d);
      d = G("remaining-items", d);
      e && d && b.push(new ph(d, e, f))
    }
    return b
  };
  var rh = function () {
    this.g = U("blogger.templates.responsive.Archive");
    this.Ha = this.Z = null;
    W(this.g, "Initializing archive.")
  };
  pa(rh, Wg);
  rh.prototype.ia = function () {
    var a = this;
    this.Z = oh(".widget.BlogArchive");
    return Ne(this.Z.map(function (b) {
      return b.ia()
    })).then(function () {
      a.Ha = qh("BlogArchive");
      W(a.g, "Finished initializing archive.");
      return Je()
    }).Zc(function (b) {
      V(a.g, "Error initializing archive. Uncaught exception.", b instanceof Error ? b : null);
      return a.h().then(function () {
        return Ke()
      })
    })
  };
  rh.prototype.h = function () {
    var a = this;
    return (this.Z && Ne(this.Z.map(function (b) {
      return b.h()
    })) || Je()).then(function () {
      a.Ha && a.Ha.forEach(function (b) {
        return b.h()
      });
      a.Z = null;
      a.Ha = null
    })
  };
  var sh = function () {
    this.g = U("blogger.templates.responsive.AsyncCss");
    "loading" != document.readyState ? this.Dd() : O(window, "load", this.Dd)
  };
  sh.prototype.Dd = function () {
    this.g && W(this.g, "Initializing async CSS.");
    for (var a = n(Array.prototype.slice.call(document.getElementsByTagName("link"), 0)), b = a.next(); !b.done; b = a.next()) b = b.value, "true" == b.getAttribute("data-async-css") && "none" == b.getAttribute("media") && b.setAttribute("media", "all");
    this.g && W(this.g, "Finished initializing async CSS.")
  };
  sh.prototype.h = function () {
    P(window, "load", this.Dd)
  };
  var th = function (a, b) {
    this.g = U("blogger.templates.responsive.AvatarReplacer");
    W(this.g, "Initializing avatar replacer.");
    this.ud = Gc();
    if (!a) {
      a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      M.add(a, "svg-icon-24");
      M.add(a, "avatar-icon");
      var c = document.createElementNS("http://www.w3.org/2000/svg", "use");
      c.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/responsive/sprite_v1_6.css.svg#ic_person_black_24dp");
      a.appendChild(c)
    }
    this.Ng = a;
    this.eh = b || /(?:https?:)?\/\/img[12]\.blogblog\.com\/img\/blank\.gif/;
    W(this.g, "Finished initializing avatar replacer.")
  };
  th.prototype.replace = function () {
    for (var a = document.querySelectorAll("#comments .comment .avatar-image-container"), b = 0; a && b < a.length; b++) {
      var c = Hc(this.ud.l, "img", null, a[b]);
      for (var d = 0; c && d < c.length; d++) c[d].src && this.eh.test(c[d].src) && (this.ud.removeNode(c[d]), this.ud.appendChild(a[b], this.Ng.cloneNode(!0)))
    }
  };
  var uh = function () {
    var a = Sc(document, "IMG");
    a.src = "https://www.blogger.com/img/blogger_logo_round_35.png";
    M.add(a, "blogger-icon");
    return new th(a, /(?:https?:)?\/\/img[12]\.blogblog\.com\/img\/b16-rounded\.gif/)
  };
  var vh = function (a) {
    this.La = a
  };
  vh.prototype.show = function () {
    this.La && M.remove(this.La, "hidden")
  };
  vh.prototype.Qb = function () {
    this.La && M.add(this.La, "hidden")
  };
  vh.prototype.aa = function () {
    this.La && (this.La.parentNode.removeChild(this.La), this.La = null)
  };
  var wh = function (a, b, c) {
    c = Rc("DIV", ["loading-spinner-large", "mspin-" + c + "-large", "hidden"], Rc("DIV", "", Rc("DIV")));
    Uc(document.body, c);
    c.style.left = a - 24 + "px";
    c.style.top = b - 24 + "px";
    return new vh(c)
  };
  var xh = !x && !qb();
  var zh = function () {
      var a = this;
      this.Ad = this.zd = this.ca = null;
      var b = document.getElementById("comment-editor"),
        c = document.querySelector(".page_body .centered-bottom");
      b && c && window.addEventListener && ((/-[a-z]/.test("resized") ? 0 : xh && b.dataset ? "resized" in b.dataset : b.hasAttribute ? b.hasAttribute("data-" + "resized".replace(/([A-Z])/g, "-$1").toLowerCase()) : b.getAttribute("data-" + "resized".replace(/([A-Z])/g, "-$1").toLowerCase())) || this.ca || (this.ca = yh(), this.ca.show()), this.zd = O(b, "iframeMoved", function () {
        a.ca
          && a.ca.aa();
        a.ca = yh();
        a.ca.show();
        for (var d = document.querySelectorAll(".comment-actions"), e = 0; e < d.length; e++) M.remove(d[e], "invisible");
        (d = (d = cd(b)) && d.querySelector(".comment-actions")) && M.add(d, "invisible")
      }), this.Ad = O(window, "message", function (d) {
        d = d.ra.data;
        "string" === typeof d && 0 == d.indexOf("set-comment-editor-height") && a.ca && (a.ca.aa(), a.ca = null)
      }))
    },
    yh = function () {
      var a = document.getElementById("comment-editor"),
        b = document.querySelector(".page_body .centered-bottom");
      if (a && b) {
        b = a.getBoundingClientRect();
        a = b.left + window.pageXOffset + b.width / 2;
        b = b.top + window.pageYOffset + b.height / 2;
        var c = document.querySelector(".centered-bottom .sharing-button");
        c = "rgb(255,255,255)" == (c && window.getComputedStyle(c).getPropertyValue("fill")) ? "white" : "grey_54";
        var d = wh(a, b, c);
        setTimeout(function () {
          d && d.aa()
        }, 1E4);
        return d
      }
      return null
    };
  zh.prototype.h = function () {
    this.ca && (this.ca.aa(), this.ca = null);
    this.zd && Q(this.zd);
    this.Ad && Q(this.Ad)
  };
  var Ah = function () {
    this.g = U("blogger.templates.responsive.Labels");
    W(this.g, "Initializing labels.");
    try {
      this.Z = oh(".widget.Label"), this.Z.map(function (a) {
        return a.ia()
      }), this.Ha = qh("Label"), W(this.g, "Finished initializing labels.")
    } catch (a) {
      V(this.g, "Error initializing labels. Uncaught exception.", a), this.h()
    }
  };
  Ah.prototype.h = function () {
    this.Z && this.Z.forEach(function (a) {
      return a.h()
    });
    this.Ha && this.Ha.forEach(function (a) {
      return a.h()
    });
    this.Ha = this.Z = null
  };
  var Bh = function () {};
  Bh.prototype.re = null;
  var Dh = function (a) {
    var b;
    (b = a.re) || (b = {}, Ch(a) && (b[0] = !0, b[1] = !0), b = a.re = b);
    return b
  };
  var Eh, Fh = function () {};
  t(Fh, Bh);
  var Gh = function (a) {
      return (a = Ch(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    },
    Ch = function (a) {
      if (!a.Se && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
        for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
          var d = b[c];
          try {
            return new ActiveXObject(d), a.Se = d
          } catch (e) {}
        }
        throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
      }
      return a.Se
    };
  Eh = new Fh;
  var Hh = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  var Y = function (a) {
    S.call(this);
    this.headers = new Map;
    this.jd = a || null;
    this.Da = !1;
    this.hd = this.j = null;
    this.Sb = this.Xe = this.Tb = "";
    this.Wa = this.Cd = this.Cc = this.vd = !1;
    this.ec = 0;
    this.$c = null;
    this.lf = "";
    this.dd = this.Jg = this.Ef = !1;
    this.he = null
  };
  t(Y, S);
  Y.prototype.g = U("goog.net.XhrIo");
  var Ih = /^https?$/i,
    Jh = ["POST", "PUT"],
    Kh = [],
    Lh = function (a, b) {
      var c = new Y;
      Kh.push(c);
      b && c.D("complete", b);
      c.Id("ready", c.Tf);
      c.send(a, "HEAD", void 0, void 0)
    };
  Y.prototype.Tf = function () {
    this.wa();
    $a(Kh, this)
  };
  Y.prototype.setTrustToken = function (a) {
    this.he = a
  };
  Y.prototype.send = function (a, b, c, d) {
    if (this.j) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Tb + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.Tb = a;
    this.Sb = "";
    this.Xe = b;
    this.vd = !1;
    this.Da = !0;
    this.j = this.jd ? Gh(this.jd) : Gh(Eh);
    this.hd = this.jd ? Dh(this.jd) : Dh(Eh);
    this.j.onreadystatechange = Da(this.df, this);
    this.Jg && "onprogress" in this.j && (this.j.onprogress = Da(function (g) {
      this.cf(g, !0)
    }, this), this.j.upload && (this.j.upload.onprogress = Da(this.cf, this)));
    try {
      tf(this.g, Mh(this, "Opening Xhr")),
        this.Cd = !0, this.j.open(b, String(a), !0), this.Cd = !1
    } catch (g) {
      tf(this.g, Mh(this, "Error opening Xhr: " + g.message));
      Nh(this, g);
      return
    }
    a = c || "";
    c = new Map(this.headers);
    if (d)
      if (Object.getPrototypeOf(d) === Object.prototype)
        for (var e in d) c.set(e, d[e]);
      else if ("function" === typeof d.keys && "function" === typeof d.get) {
      e = n(d.keys());
      for (var f = e.next(); !f.done; f = e.next()) f = f.value, c.set(f, d.get(f))
    } else throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(c.keys()).find(function (g) {
      return "content-type"
        == g.toLowerCase()
    });
    e = r.FormData && a instanceof r.FormData;
    !Za(Jh, b) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    b = n(c);
    for (d = b.next(); !d.done; d = b.next()) c = n(d.value), d = c.next().value, c = c.next().value, this.j.setRequestHeader(d, c);
    this.lf && (this.j.responseType = this.lf);
    "withCredentials" in this.j && this.j.withCredentials !== this.Ef && (this.j.withCredentials = this.Ef);
    if ("setTrustToken" in this.j && this.he) try {
      this.j.setTrustToken(this.he)
    } catch (g) {
      tf(this.g, Mh(this, "Error SetTrustToken: "
        + g.message))
    }
    try {
      Oh(this), 0 < this.ec && (this.dd = Ph(this.j), tf(this.g, Mh(this, "Will abort after " + this.ec + "ms if incomplete, xhr2 " + this.dd)), this.dd ? (this.j.timeout = this.ec, this.j.ontimeout = Da(this.Cf, this)) : this.$c = Ye(this.Cf, this.ec, this)), tf(this.g, Mh(this, "Sending request")), this.Cc = !0, this.j.send(a), this.Cc = !1
    } catch (g) {
      tf(this.g, Mh(this, "Send error: " + g.message)), Nh(this, g)
    }
  };
  var Ph = function (a) {
    return x && Ob(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
  };
  Y.prototype.Cf = function () {
    "undefined" != typeof ta && this.j && (this.Sb = "Timed out after " + this.ec + "ms, aborting", tf(this.g, Mh(this, this.Sb)), this.dispatchEvent("timeout"), this.abort(8))
  };
  var Nh = function (a, b) {
      a.Da = !1;
      a.j && (a.Wa = !0, a.j.abort(), a.Wa = !1);
      a.Sb = b;
      Qh(a);
      Rh(a)
    },
    Qh = function (a) {
      a.vd || (a.vd = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
  Y.prototype.abort = function () {
    this.j && this.Da && (tf(this.g, Mh(this, "Aborting")), this.Da = !1, this.Wa = !0, this.j.abort(), this.Wa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Rh(this))
  };
  Y.prototype.B = function () {
    this.j && (this.Da && (this.Da = !1, this.Wa = !0, this.j.abort(), this.Wa = !1), Rh(this, !0));
    Y.v.B.call(this)
  };
  Y.prototype.df = function () {
    this.Ra || (this.Cd || this.Cc || this.Wa ? Sh(this) : this.Cg())
  };
  Y.prototype.Cg = function () {
    Sh(this)
  };
  var Sh = function (a) {
    if (a.Da && "undefined" != typeof ta)
      if (a.hd[1] && 4 == Th(a) && 2 == Uh(a)) tf(a.g, Mh(a, "Local request error detected and ignored"));
      else if (a.Cc && 4 == Th(a)) Ye(a.df, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == Th(a)) {
      tf(a.g, Mh(a, "Request complete"));
      a.Da = !1;
      try {
        if (Vh(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
        else {
          try {
            var b = 2 < Th(a) ? a.j.statusText : ""
          } catch (c) {
            tf(a.g, "Can not get status: " + c.message), b = ""
          }
          a.Sb = b + " [" + Uh(a) + "]";
          Qh(a)
        }
      } finally {
        Rh(a)
      }
    }
  };
  Y.prototype.cf = function (a, b) {
    u("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(Wh(a, "progress"));
    this.dispatchEvent(Wh(a, b ? "downloadprogress" : "uploadprogress"))
  };
  var Wh = function (a, b) {
      return {
        type: b,
        lengthComputable: a.lengthComputable,
        loaded: a.loaded,
        total: a.total
      }
    },
    Rh = function (a, b) {
      if (a.j) {
        Oh(a);
        var c = a.j,
          d = a.hd[0] ? ua : null;
        a.j = null;
        a.hd = null;
        b || a.dispatchEvent("ready");
        try {
          c.onreadystatechange = d
        } catch (e) {
          V(a.g, "Problem encountered resetting onreadystatechange: " + e.message)
        }
      }
    },
    Oh = function (a) {
      a.j && a.dd && (a.j.ontimeout = null);
      a.$c && (r.clearTimeout(a.$c), a.$c = null)
    },
    Vh = function (a) {
      var b = Uh(a);
      a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
          var c = !0;
          break a;
        default:
          c = !1
      }
      if (!c) {
        if (b = 0 === b) a = String(a.Tb).match(Hh)[1] || null, !a && r.self && r.self.location && (a = r.self.location.protocol, a = a.substr(0, a.length - 1)), b = !Ih.test(a ? a.toLowerCase() : "");
        c = b
      }
      return c
    },
    Th = function (a) {
      return a.j ? a.j.readyState : 0
    },
    Uh = function (a) {
      try {
        return 2 < Th(a) ? a.j.status : -1
      } catch (b) {
        return -1
      }
    };
  Y.prototype.getResponseHeader = function (a) {
    if (this.j && 4 == Th(this)) return a = this.j.getResponseHeader(a), null === a ? void 0 : a
  };
  Y.prototype.getAllResponseHeaders = function () {
    return this.j && 4 == Th(this) ? this.j.getAllResponseHeaders() || "" : ""
  };
  var Mh = function (a, b) {
    return b + " [" + a.Xe + " " + a.Tb + " " + Uh(a) + "]"
  };
  var Xh = function () {
      this.g = U("blogger.templates.responsive.SourcesetEnhancer")
    },
    Zh = function () {
      var a = new Xh;
      W(a.g, "Initializing sourceset enhancer.");
      try {
        for (var b = n(document.querySelectorAll("img[data-ess]")), c = b.next(); !c.done; c = b.next()) {
          var d = c.value;
          if (d.srcset) {
            for (var e = /.*(\d+)w$/, f = 0, g = !1, k = n(d.srcset.trim().split(",")), l = k.next(); !l.done; l = k.next()) {
              var m = l.value;
              if (e.test(m)) {
                var p = parseInt(e.exec(m)[1], 10);
                f = Math.max(f, p)
              } else /\s+/.test(m) || (g = !0)
            }
            if (!g && f > d.clientWidth) {
              W(a.g, "Not fetching enchanced sourceset for image "
                + d.id + " which has a srcset width " + f + ", which is bigger than its size of " + d.clientWidth);
              return
            }
          }
          Yh(a, d)
        }
        W(a.g, "Finished initializing sourceset enhancer.")
      } catch (q) {
        V(a.g, "Error enhancing sourcesets.", q)
      }
    },
    Yh = function (a, b) {
      var c = b.getAttribute("data-ess");
      Lh(c, function (d) {
        d = d.target;
        if (Vh(d)) {
          d = String(d.Tb);
          var e = b.srcset || "";
          e.trim() && (e += ", ");
          b.setAttribute("srcset", e + d);
          W(a.g, "Successfully loaded image " + d + " for image " + b.id)
        }
      });
      W(a.g, "Fetching higher-res image " + c + " for image " + b.id)
    };
  var $h = function () {
    this.g = U("blogger.templates.responsive.Video")
  };
  pa($h, Wg);
  $h.prototype.ia = function () {
    W(this.g, "Initializing video support.");
    window.addEventListener ? window.addEventListener("message", this.Nc, !1) : window.attachEvent("onmessage", this.Nc);
    return Je()
  };
  $h.prototype.Nc = function (a) {
    var b = a.data;
    b && "video_resize" === b.name && b.iframe_id && jh().then(function (c) {
      if (a.origin === c && (c = document.getElementById(b.iframe_id)))
        if (b.widescreen) {
          var d = c.width || 320,
            e = c.height || 266;
          c.setAttribute("data-original-width", d);
          c.setAttribute("data-original-height", e);
          var f = c.parentElement.offsetWidth;
          c.height = e * f / d;
          c.width = f
        } else c.width = c.getAttribute("data-original-width"), c.height = c.getAttribute("data-original-height")
    })
  };
  $h.prototype.h = function () {
    window.removeEventListener ? window.removeEventListener("message", this.Nc) : window.detachEvent("onmessage", this.Nc);
    return Je()
  };
  var ai = function () {
      this.gf = Date.now()
    },
    bi = null;
  ai.prototype.set = function (a) {
    this.gf = a
  };
  ai.prototype.reset = function () {
    this.set(Date.now())
  };
  ai.prototype.get = function () {
    return this.gf
  };
  var ci = function (a) {
    this.Ig = a || "";
    bi || (bi = new ai);
    this.Xg = bi
  };
  h = ci.prototype;
  h.le = !0;
  h.tf = !0;
  h.Vg = !0;
  h.Ug = !0;
  h.vf = !1;
  h.Wg = !1;
  var di = function (a) {
      return 10 > a ? "0" + a : String(a)
    },
    ei = function (a) {
      ci.call(this, a)
    };
  t(ei, ci);
  var fi = function (a, b) {
    var c = [];
    c.push(a.Ig, " ");
    if (a.tf) {
      var d = new Date(b.Bf);
      c.push("[", di(d.getFullYear() - 2E3) + di(d.getMonth() + 1) + di(d.getDate()) + " " + di(d.getHours()) + ":" + di(d.getMinutes()) + ":" + di(d.getSeconds()) + "." + di(Math.floor(d.getMilliseconds() / 10)), "] ")
    }
    if (a.Vg) {
      d = c.push;
      var e = a.Xg.get();
      e = (b.Bf - e) / 1E3;
      var f = e.toFixed(3),
        g = 0;
      if (1 > e) g = 2;
      else
        for (; 100 > e;) g++, e *= 10;
      for (; 0 < g--;) f = " " + f;
      d.call(c, "[", f, "s] ")
    }
    a.Ug && c.push("[", b.Ze, "] ");
    a.Wg && c.push("[", b.Ye.name, "] ");
    c.push(b.tg);
    a.vf && (b = b.uc,
      void 0 !== b && c.push("\n", b instanceof Error ? b.message : String(b)));
    a.le && c.push("\n");
    return c.join("")
  };
  var gi = function () {
      this.Kg = Da(this.Kf, this);
      this.vc = new ei;
      this.vc.tf = !1;
      this.vc.vf = !1;
      this.Ue = this.vc.le = !1;
      this.cg = {}
    },
    ii = function () {
      var a = hi;
      if (1 != a.Ue) {
        var b = pf(qf(), "").sa,
          c = a.Kg;
        b && pf(qf(), b.qb()).Le.push(c);
        a.Ue = !0
      }
    };
  gi.prototype.Kf = function (a) {
    function b(f) {
      if (f) {
        if (f.value >= bf.value) return "error";
        if (f.value >= cf.value) return "warn";
        if (f.value >= ef.value) return "log"
      }
      return "debug"
    }
    if (!this.cg[a.Ze]) {
      var c = fi(this.vc, a),
        d = ji;
      if (d) {
        var e = b(a.Ye);
        ki(d, e, c, a.uc)
      }
    }
  };
  var hi = null,
    ji = r.console,
    ki = function (a, b, c, d) {
      if (a[b]) a[b](c, void 0 === d ? "" : d);
      else a.log(c, void 0 === d ? "" : d)
    };
  /*

   CC0 1.0 Universal License
   Public Domain Dedication

   The person(s) who associated a work with this deed has dedicated the work to
   the public domain by waiving all of his or her rights to the work worldwide
   under copyright law, including all related and neighboring rights, to the
   extent allowed by law.

   You can copy, modify, distribute and perform the work, even for commercial
   purposes, all without asking permission.

   In no way are the patent or trademark rights of any person affected by CC0,
   nor are the rights that other persons may have in the work or in how the work
   is used, such as publicity or privacy rights.

   Unless expressly stated otherwise, the person(s) who associated a work with
   this deed makes no warranties about the work, and disclaims liability for all
   uses of the work, to the fullest extent permitted by applicable law.

   When using or citing the work, you should not imply endorsement by the author
   or the affirmer.

   This is a human-readable summary of the Legal Code (read the full text).
   svg4everybody v2.1.8 | github.com/jonathantneal/svg4everybody */
  function li(a, b, c) {
    if (c) {
      var d = document.createDocumentFragment(),
        e = !b.hasAttribute("viewBox") && c.getAttribute("viewBox");
      e && b.setAttribute("viewBox", e);
      for (b = c.cloneNode(!0); b.childNodes.length;) d.appendChild(b.firstChild);
      a.appendChild(d)
    }
  }

  function mi(a) {
    a.onreadystatechange = function () {
      if (4 === a.readyState) {
        var b = a.Hf;
        b || (b = a.Hf = document.implementation.createHTMLDocument(""), b.body.innerHTML = a.responseText, a.je = {});
        a.ke.splice(0).map(function (c) {
          var d = a.je[c.id];
          d || (d = a.je[c.id] = b.getElementById(c.id));
          li(c.parent, c.Yg, d)
        })
      }
    };
    a.onreadystatechange()
  }

  function ni() {
    return "undefined" != typeof LEGACY_SUPPORT && LEGACY_SUPPORT
  }
  var oi = function () {
    function a() {
      for (var A = 0; A < y.length;) {
        var D = y[A],
          B = D.parentNode,
          J;
        for (J = B;
          "svg" !== J.nodeName.toLowerCase() && (J = J.parentNode, J););
        if (J) {
          var K = D.getAttribute("xlink:href") || D.getAttribute("href");
          !K && b.attributeName && (K = D.getAttribute(b.attributeName));
          if (ni() && d) {
            var ca = document.createElement("img");
            ca.style.cssText = "display:inline-block;height:100%;width:100%";
            ca.setAttribute("width", J.getAttribute("width") || J.clientWidth);
            ca.setAttribute("height", J.getAttribute("height") || J.clientHeight);
            ca.src = c(K, J, D);
            B.replaceChild(ca, D)
          } else p && (!b.validate || b.validate(K, J, D) ? (B.removeChild(D), K = K.split("#"), D = K.shift(), K = K.join("#"), D.length ? (ca = q[D], ca || (ca = q[D] = new XMLHttpRequest, ca.open("GET", D), ca.send(), ca.ke = []), ca.ke.push({
            parent: B,
            Yg: J,
            id: K
          }), mi(ca)) : li(B, J, document.getElementById(K))) : (++A, ++w))
        } else ++A
      }
      if (!y.length || 0 < y.length - w) window.requestAnimationFrame ? window.requestAnimationFrame(a) : setTimeout(a, 67)
    }
    var b = Object(void 0);
    if (ni()) {
      var c = b.gj || function (A) {
        return A.replace(/\?[^#]+/,
          "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(A) || [""])[0]
      };
      var d = "nosvg" in b ? b.ij : /\bMSIE [1-8]\b/.test(navigator.userAgent)
    }
    var e = /\bMSIE [1-8]\.0\b/,
      f = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
      g = /\bAppleWebKit\/(\d+)\b/,
      k = /\bEdge\/12\.(\d+)\b/,
      l = /\bEdge\/.(\d+)\b/,
      m = window.top !== window.self;
    var p = "polyfill" in b ? b.jj : ni() ? e.test(navigator.userAgent) || f.test(navigator.userAgent) || 10547 > (navigator.userAgent.match(k) || [])[1] || 537 > (navigator.userAgent.match(g) || [])[1] || l.test(navigator.userAgent)
      && m : f.test(navigator.userAgent) || 10547 > (navigator.userAgent.match(k) || [])[1] || 537 > (navigator.userAgent.match(g) || [])[1] || l.test(navigator.userAgent) && m;
    var q = {},
      y = document.getElementsByTagName("use"),
      w = 0;
    p && a()
  };
  var ri = function () {
      var a = this;
      r.console && (hi || (hi = new gi), r.location && -1 != r.location.href.indexOf("Debug=true") && ii());
      this.sa = U("blogger.templates.responsive.Template");
      try {
        W(this.sa, "Initializing responsive template."), this.rd = new zh, this.archive = new rh, this.archive.ia().Zc(function (b) {
          return pi(a, b)
        }), this.Z = oh(".widget.collapsible"), this.labels = new Ah, Zh(), (new th).replace(), uh().replace(), oi(), this.md = new sh, qi(), this.ed = new $h, this.ed.ia().Zc(function (b) {
          return pi(a, b)
        }), W(this.sa, "Finished initializing responsive template.")
      } catch (b) {
        pi(this,
          b), this.h()
      }
    },
    pi = function (a, b) {
      a.sa && V(a.sa, "Error initializing responsive template. Uncaught exception.", b)
    },
    qi = function () {
      if (ob() && "rtl" == document.documentElement.getAttribute("dir"))
        for (var a = 0; a < document.styleSheets.length; a++) {
          var b = document.styleSheets[a];
          if (b.cssRules)
            for (var c = 0; c < b.cssRules.length; c++) {
              var d = b.cssRules[c];
              if (d.style && (d.style.font && -1 != d.style.font.indexOf("Montserrat") || d.style["font-family"] && -1 != d.style["font-family"].indexOf("Montserrat"))) {
                var e = d.style.cssText.replace("Montserrat",
                  "sans-serif");
                d.style.cssText = e
              }
            }
        }
    };
  ri.prototype.h = function () {
    var a = this;
    return (this.Z && Ne(this.Z.map(function (b) {
      return b.h()
    })) || Je()).then(function () {
      a.archive && a.archive.h();
      a.labels && a.labels.h();
      a.rd && a.rd.h();
      a.md && a.md.h();
      a.ed && a.ed.h();
      a.archive = null;
      a.labels = null;
      a.rd = null;
      a.md = null;
      a.ed = null
    })
  };
  var si = function () {
    a: {
      var a = M.get(document.body);a = n(Array.prototype.slice.call(a, 0));
      for (var b = a.next(); !b.done; b = a.next())
        if (b = b.value, b.startsWith("version-")) {
          a = b.substring(8);
          b = new RegExp("-".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"), "g");
          a = a.replace(b, ".".replace(/\$/g, "$$$$"));
          break a
        } a = null
    }
    a = a || "LATEST";b = "1.2.0";
    return a == b ? 0 : "LATEST" == a || "LATEST" == b ? "LATEST" == a ? 1 : -1 : mb(a, b)
  };
  var ti = function (a) {
    return function () {
      M.toggle(a, "sidebar-invisible")
    }
  };

  function ui(a, b) {
    var c = function (d) {
      var e = 0;
      do e += d.offsetTop; while (d = d.offsetParent);
      return e
    };
    b = c(b);
    c = c(a);
    Math.abs(c - b) >= window.innerHeight ? M.remove(a, "invisible") : M.add(a, "invisible")
  };
  var vi = function (a, b, c, d) {
    Od.call(this, d);
    this.type = "key";
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c
  };
  t(vi, Od);
  var wi = function (a, b) {
    S.call(this);
    a && (this.Hc && this.detach(), this.i = a, this.Gc = O(this.i, "keypress", this, b), this.Fd = O(this.i, "keydown", this.rb, b, this), this.Hc = O(this.i, "keyup", this.fg, b, this))
  };
  t(wi, S);
  h = wi.prototype;
  h.i = null;
  h.Gc = null;
  h.Fd = null;
  h.Hc = null;
  h.W = -1;
  h.G = -1;
  h.ma = !1;
  var xi = {
      3: 13,
      12: 144,
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63236: 112,
      63237: 113,
      63238: 114,
      63239: 115,
      63240: 116,
      63241: 117,
      63242: 118,
      63243: 119,
      63244: 120,
      63245: 121,
      63246: 122,
      63247: 123,
      63248: 44,
      63272: 46,
      63273: 36,
      63275: 35,
      63276: 33,
      63277: 34,
      63289: 144,
      63302: 45
    },
    yi = {
      Up: 38,
      Down: 40,
      Left: 37,
      Right: 39,
      Enter: 13,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      "U+007F": 46,
      Home: 36,
      End: 35,
      PageUp: 33,
      PageDown: 34,
      Insert: 45
    },
    zi = Ab && z;
  h = wi.prototype;
  h.rb = function (a) {
    if (C || yb)
      if (17 == this.W && !a.ctrlKey || 18 == this.W && !a.altKey || Ab && 91 == this.W && !a.metaKey) this.G = this.W = -1; - 1 == this.W && (a.ctrlKey && 17 != a.keyCode ? this.W = 17 : a.altKey && 18 != a.keyCode ? this.W = 18 : a.metaKey && 91 != a.keyCode && (this.W = 91));
    Qf(a.keyCode, this.W, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.G = Pf(a.keyCode), zi && (this.ma = a.altKey)) : this.handleEvent(a)
  };
  h.fg = function (a) {
    this.G = this.W = -1;
    this.ma = a.altKey
  };
  h.handleEvent = function (a) {
    var b = a.ra,
      c = b.altKey;
    if (x && "keypress" == a.type) {
      var d = this.G;
      var e = 13 != d && 27 != d ? b.keyCode : 0
    } else(C || yb) && "keypress" == a.type ? (d = this.G, e = 0 <= b.charCode && 63232 > b.charCode && Of(d) ? b.charCode : 0) : ("keypress" == a.type ? (zi && (c = this.ma), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.G, e = b.charCode) : (d = b.keyCode || this.G, e = b.charCode || 0)) : (d = b.keyCode || this.G, e = b.charCode || 0), Ab && 63 == e && 224 == d && (d = 191));
    var f = d = Pf(d);
    d ? 63232 <= d && d in xi ? f = xi[d] : 25 == d && a.shiftKey && (f = 9)
      : b.keyIdentifier && b.keyIdentifier in yi && (f = yi[b.keyIdentifier]);
    if (!z || "keypress" != a.type || Qf(f, this.W, a.shiftKey, a.ctrlKey, c, a.metaKey)) a = f == this.W, this.W = f, b = new vi(f, e, a, b), b.altKey = c, this.dispatchEvent(b)
  };
  h.m = function () {
    return this.i
  };
  h.detach = function () {
    this.Gc && (Q(this.Gc), Q(this.Fd), Q(this.Hc), this.Hc = this.Fd = this.Gc = null);
    this.i = null;
    this.G = this.W = -1
  };
  h.B = function () {
    wi.v.B.call(this);
    this.detach()
  };
  var Bi = function (a, b, c) {
    S.call(this);
    this.target = a;
    this.yd = b || a;
    this.Lc = c || new id(NaN, NaN, NaN, NaN);
    this.l = F(a);
    this.qa = new le(this);
    a = Ea(Kd, this.qa);
    this.Ra ? a() : (this.Ya || (this.Ya = []), this.Ya.push(a));
    this.deltaY = this.deltaX = this.zf = this.yf = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.Ae = !0;
    this.Sa = !1;
    this.ff = !0;
    this.Re = 0;
    this.ie = this.kg = !1;
    O(this.yd, ["touchstart", "mousedown"], this.xf, !1, this);
    this.cd = Ai
  };
  t(Bi, S);
  var Ai = r.document && r.document.documentElement && !!r.document.documentElement.setCapture && !!r.document.releaseCapture;
  Bi.prototype.Ia = function () {
    return this.qa
  };
  Bi.prototype.B = function () {
    Bi.v.B.call(this);
    P(this.yd, ["touchstart", "mousedown"], this.xf, !1, this);
    this.qa.ja();
    this.cd && this.l.releaseCapture();
    this.yd = this.target = null
  };
  var Ci = function (a) {
    void 0 === a.Rd && (a.Rd = zd(a.target));
    return a.Rd
  };
  Bi.prototype.xf = function (a) {
    var b = "mousedown" == a.type;
    if (!this.Ae || this.Sa || b && (0 != a.ra.button || Ab && a.ctrlKey)) this.dispatchEvent("earlycancel");
    else {
      if (0 == this.Re)
        if (this.dispatchEvent(new Di("start", this, a.clientX, a.clientY, a))) this.Sa = !0, this.ff && b && a.preventDefault();
        else return;
      else this.ff && b && a.preventDefault();
      b = this.l;
      var c = b.documentElement,
        d = !this.cd;
      this.qa.D(b, ["touchmove", "mousemove"], this.gg, {
        capture: d,
        passive: !1
      });
      this.qa.D(b, ["touchend", "mouseup"], this.tc, d);
      this.cd ? (c.setCapture(!1),
        this.qa.D(c, "losecapture", this.tc)) : this.qa.D(Pc(b), "blur", this.tc);
      x && this.kg && this.qa.D(b, "dragstart", Nd);
      this.Qg && this.qa.D(this.Qg, "scroll", this.Fg, d);
      this.clientX = this.yf = a.clientX;
      this.clientY = this.zf = a.clientY;
      this.screenX = a.screenX;
      this.screenY = a.screenY;
      this.ie ? (a = this.target, b = a.offsetLeft, c = a.offsetParent, c || "fixed" != nd(a) || (c = F(a).documentElement), c ? (z && !Ob(58) ? (d = Ed(c), b += d.left) : 8 <= Number(Rb) && !(9 <= Number(Rb)) && (d = Ed(c), b -= d.left), a = zd(c) ? c.clientWidth - (b + a.offsetWidth) : b) : a = b) : a = this.target.offsetLeft;
      this.deltaX = a;
      this.deltaY = this.target.offsetTop;
      this.Ld = Oc(Gc(this.l).l)
    }
  };
  Bi.prototype.tc = function (a, b) {
    this.qa.ja();
    this.cd && this.l.releaseCapture();
    this.Sa ? (this.Sa = !1, this.dispatchEvent(new Di("end", this, a.clientX, a.clientY, a, Ei(this, this.deltaX), Fi(this, this.deltaY), b || "touchcancel" == a.type))) : this.dispatchEvent("earlycancel")
  };
  Bi.prototype.gg = function (a) {
    if (this.Ae) {
      var b = (this.ie && Ci(this) ? -1 : 1) * (a.clientX - this.clientX),
        c = a.clientY - this.clientY;
      this.clientX = a.clientX;
      this.clientY = a.clientY;
      this.screenX = a.screenX;
      this.screenY = a.screenY;
      if (!this.Sa) {
        var d = this.yf - this.clientX,
          e = this.zf - this.clientY;
        if (d * d + e * e > this.Re)
          if (this.dispatchEvent(new Di("start", this, a.clientX, a.clientY, a))) this.Sa = !0;
          else {
            this.Ra || this.tc(a);
            return
          }
      }
      c = Gi(this, b, c);
      b = c.x;
      c = c.y;
      this.Sa && this.dispatchEvent(new Di("beforedrag", this, a.clientX, a.clientY,
        a, b, c)) && (Hi(this, a, b, c), a.preventDefault())
    }
  };
  var Gi = function (a, b, c) {
    var d = Oc(Gc(a.l).l);
    b += d.x - a.Ld.x;
    c += d.y - a.Ld.y;
    a.Ld = d;
    a.deltaX += b;
    a.deltaY += c;
    return new E(Ei(a, a.deltaX), Fi(a, a.deltaY))
  };
  Bi.prototype.Fg = function (a) {
    var b = Gi(this, 0, 0);
    a.clientX = this.clientX;
    a.clientY = this.clientY;
    Hi(this, a, b.x, b.y)
  };
  var Hi = function (a, b, c, d) {
      a.ie && Ci(a) ? a.target.style.right = c + "px" : a.target.style.left = c + "px";
      a.target.style.top = d + "px";
      a.dispatchEvent(new Di("drag", a, b.clientX, b.clientY, b, c, d))
    },
    Ei = function (a, b) {
      var c = a.Lc;
      a = isNaN(c.left) ? null : c.left;
      c = isNaN(c.width) ? 0 : c.width;
      return Math.min(null != a ? a + c : Infinity, Math.max(null != a ? a : -Infinity, b))
    },
    Fi = function (a, b) {
      var c = a.Lc;
      a = isNaN(c.top) ? null : c.top;
      c = isNaN(c.height) ? 0 : c.height;
      return Math.min(null != a ? a + c : Infinity, Math.max(null != a ? a : -Infinity, b))
    },
    Di = function (a,
      b, c, d, e, f, g) {
      N.call(this, a);
      this.clientX = c;
      this.clientY = d;
      this.left = void 0 !== f ? f : b.deltaX;
      this.top = void 0 !== g ? g : b.deltaY
    };
  t(Di, N);
  var Ii = function (a) {
    this.za = new Map;
    var b = arguments.length;
    if (1 < b) {
      if (b % 2) throw Error("Uneven number of arguments");
      for (var c = 0; c < b; c += 2) this.set(arguments[c], arguments[c + 1])
    } else a && this.addAll(a)
  };
  h = Ii.prototype;
  h.clear = function () {
    this.za.clear()
  };
  h.remove = function (a) {
    return this.za.delete(a)
  };
  h.get = function (a, b) {
    return this.za.has(a) ? this.za.get(a) : b
  };
  h.set = function (a, b) {
    this.za.set(a, b);
    return this
  };
  h.addAll = function (a) {
    if (a instanceof Ii) {
      a = n(a.za);
      for (var b = a.next(); !b.done; b = a.next()) {
        var c = n(b.value);
        b = c.next().value;
        c = c.next().value;
        this.za.set(b, c)
      }
    } else if (a)
      for (a = n(Object.entries(a)), b = a.next(); !b.done; b = a.next()) c = n(b.value), b = c.next().value, c = c.next().value, this.za.set(b, c)
  };
  h.forEach = function (a, b) {
    var c = this;
    b = void 0 === b ? this : b;
    this.za.forEach(function (d, e) {
      return a.call(b, d, e, c)
    })
  };
  h.clone = function () {
    return new Ii(this)
  };
  (function () {
    for (var a = ["ms", "moz", "webkit", "o"], b, c = 0; b = a[c] && !r.requestAnimationFrame; ++c) r.requestAnimationFrame = r[b + "RequestAnimationFrame"], r.cancelAnimationFrame = r[b + "CancelAnimationFrame"] || r[b + "CancelRequestAnimationFrame"];
    if (!r.requestAnimationFrame) {
      var d = 0;
      r.requestAnimationFrame = function (e) {
        var f = (new Date).getTime(),
          g = Math.max(0, 16 - (f - d));
        d = f + g;
        return r.setTimeout(function () {
          e(f + g)
        }, g)
      };
      r.cancelAnimationFrame || (r.cancelAnimationFrame = function (e) {
        clearTimeout(e)
      })
    }
  })();
  var Ji = [
      [],
      []
    ],
    Ki = 0,
    Li = !1,
    Mi = 0,
    Oi = function (a, b) {
      var c = Mi++,
        d = {
          rg: {
            id: c,
            xa: a.measure,
            context: b
          },
          vg: {
            id: c,
            xa: a.ug,
            context: b
          },
          state: {},
          Y: void 0,
          Ec: !1
        };
      return function () {
        0 < arguments.length ? (d.Y || (d.Y = []), d.Y.length = 0, d.Y.push.apply(d.Y, arguments), d.Y.push(d.state)) : d.Y && 0 != d.Y.length ? (d.Y[0] = d.state, d.Y.length = 1) : d.Y = [d.state];
        d.Ec || (d.Ec = !0, Ji[Ki].push(d));
        Li || (Li = !0, window.requestAnimationFrame(Ni))
      }
    },
    Ni = function () {
      Li = !1;
      var a = Ji[Ki],
        b = a.length;
      Ki = (Ki + 1) % 2;
      for (var c, d = 0; d < b; ++d) {
        c = a[d];
        var e = c.rg;
        c.Ec = !1;
        e.xa && e.xa.apply(e.context, c.Y)
      }
      for (d = 0; d < b; ++d) c = a[d], e = c.vg, c.Ec = !1, e.xa && e.xa.apply(e.context, c.Y), c.state = {};
      a.length = 0
    };
  var Pi = x ? jc(fc(new ec(cc, 'javascript:""'))) : jc(fc(new ec(cc, "about:blank")));
  ic(Pi);
  var Qi = x ? jc(fc(new ec(cc, 'javascript:""'))) : jc(fc(new ec(cc, "javascript:undefined")));
  ic(Qi);
  var Ri = function (a) {
    S.call(this);
    this.i = a;
    a = x ? "focusout" : "blur";
    this.og = O(this.i, x ? "focusin" : "focus", this, !x);
    this.pg = O(this.i, a, this, !x)
  };
  t(Ri, S);
  Ri.prototype.handleEvent = function (a) {
    var b = new Od(a.ra);
    b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
    this.dispatchEvent(b)
  };
  Ri.prototype.B = function () {
    Ri.v.B.call(this);
    Q(this.og);
    Q(this.pg);
    delete this.i
  };
  var Si = function () {};
  Si.Ed = void 0;
  Si.dg = function () {
    return Si.Ed ? Si.Ed : Si.Ed = new Si
  };
  Si.prototype.xg = 0;
  Si.prototype.jg = "";
  var Ui = function (a) {
    S.call(this);
    this.Fa = a || Gc();
    this.Rd = Ti;
    this.Ka = null;
    this.ha = !1;
    this.i = null;
    this.Ja = void 0;
    this.oc = this.pc = this.R = null;
    this.gh = !1
  };
  t(Ui, S);
  Ui.prototype.ig = Si.dg();
  var Ti = null,
    Vi = function (a) {
      var b;
      (b = a.Ka) || (b = a.ig, b = b.jg + ":" + (b.xg++).toString(36), b = a.Ka = b);
      return b
    };
  h = Ui.prototype;
  h.m = function () {
    return this.i
  };
  h.Ia = function () {
    this.Ja || (this.Ja = new le(this));
    return u(this.Ja)
  };
  h.getParent = function () {
    return this.R
  };
  h.Sd = function (a) {
    if (this.R && this.R != a) throw Error("Method not supported");
    Ui.v.Sd.call(this, a)
  };
  h.F = function () {
    return this.Fa
  };
  h.T = function () {
    this.i = this.Fa.createElement("DIV")
  };
  h.Yb = function () {
    if (this.ha) throw Error("Component already rendered");
    this.i || this.T();
    this.Fa.l.body.appendChild(this.i);
    this.R && !this.R.ha || this.ob()
  };
  h.ob = function () {
    this.ha = !0;
    Wi(this, function (a) {
      !a.ha && a.m() && a.ob()
    })
  };
  h.Ta = function () {
    Wi(this, function (a) {
      a.ha && a.Ta()
    });
    this.Ja && this.Ja.ja();
    this.ha = !1
  };
  h.B = function () {
    this.ha && this.Ta();
    this.Ja && (this.Ja.wa(), delete this.Ja);
    Wi(this, function (a) {
      a.wa()
    });
    !this.gh && this.i && Zc(this.i);
    this.R = this.i = this.oc = this.pc = null;
    Ui.v.B.call(this)
  };
  var Wi = function (a, b) {
    a.pc && a.pc.forEach(b, void 0)
  };
  Ui.prototype.removeChild = function (a, b) {
    if (a) {
      var c = "string" === typeof a ? a : Vi(a);
      this.oc && c ? (a = this.oc, a = (null !== a && c in a ? a[c] : void 0) || null) : a = null;
      if (c && a) {
        var d = this.oc;
        c in d && delete d[c];
        $a(this.pc, a);
        b && (a.Ta(), a.i && Zc(a.i));
        b = a;
        if (null == b) throw Error("Unable to set parent component");
        b.R = null;
        Ui.v.Sd.call(b, null)
      }
    }
    if (!a) throw Error("Child is not in parent component");
    return a
  };
  var Xi = function (a, b) {
    this.i = a;
    this.Fa = b
  };
  var Yi = function (a, b) {
    Ui.call(this, b);
    this.fh = !!a;
    this.yb = null;
    this.kf = Oi({
      ug: this.Rc
    }, this)
  };
  t(Yi, Ui);
  h = Yi.prototype;
  h.xd = null;
  h.fd = !1;
  h.S = null;
  h.N = null;
  h.ka = null;
  h.pd = !1;
  h.xc = function () {
    return "goog-modalpopup"
  };
  h.wc = function () {
    return this.S
  };
  h.T = function () {
    Yi.v.T.call(this);
    var a = this.m();
    u(a);
    M.addAll(a, cb(this.xc()).split(" "));
    a.tabIndex = 0;
    I(a, !1);
    this.fh && !this.N && (a = this.F().T("IFRAME", {
      frameborder: 0,
      style: "border:0;vertical-align:bottom;"
    }), Sb(a, "HTMLIFrameElement"), a.src = ic(Pi).toString(), this.N = a, this.N.className = this.xc() + "-bg", I(this.N, !1), yd(this.N, 0));
    this.S || (this.S = this.F().T("DIV", this.xc() + "-bg"), I(this.S, !1));
    this.ka || (this.ka = this.F().createElement("SPAN"), I(this.ka, !1), this.ka.tabIndex = 0, this.ka.style.position = "absolute")
  };
  h.jf = function () {
    this.pd = !1
  };
  h.ob = function () {
    u(!!this.S, "Background element must not be null.");
    this.N && Xc(this.N, this.m());
    Xc(this.S, this.m());
    Yi.v.ob.call(this);
    Yc(this.ka, this.m());
    this.xd = new Ri(this.F().l);
    this.Ia().D(this.xd, "focusin", this.Ag);
    Zi(this, !1)
  };
  h.Ta = function () {
    this.isVisible() && this.I(!1);
    Kd(this.xd);
    Yi.v.Ta.call(this);
    Zc(this.N);
    Zc(this.S);
    Zc(this.ka)
  };
  h.I = function (a) {
    u(this.ha, "ModalPopup must be rendered first.");
    a != this.fd && (this.bb && this.bb.stop(), this.kb && this.kb.stop(), this.ab && this.ab.stop(), this.jb && this.jb.stop(), this.ha && Zi(this, a), a ? this.Wd() : this.vb())
  };
  var Zi = function (a, b) {
    if (!a.$e) {
      var c = a.i;
      u(c, "Can not call getElementStrict before rendering/decorating.");
      a.$e = new Xi(c, a.Fa)
    }
    a = a.$e;
    if (b)
      for (a.sb || (a.sb = []), b = ed(a.Fa.l.body), c = 0; c < b.length; c++) {
        var d = b[c];
        d == a.i || zg(d, "hidden") || (X(d, "hidden", !0), a.sb.push(d))
      } else if (a.sb) {
        for (c = 0; c < a.sb.length; c++) a.sb[c].removeAttribute(yg("hidden"));
        a.sb = null
      }
  };
  Yi.prototype.rf = function (a, b) {
    this.bb = a;
    this.ab = b;
    this.jb = this.kb = void 0
  };
  Yi.prototype.Wd = function () {
    if (this.dispatchEvent("beforeshow")) {
      try {
        this.yb = this.F().l.activeElement
      } catch (a) {}
      this.Rc();
      this.O();
      this.Ia().D(dd(this.F()), "resize", this.Rc).D(dd(this.F()), "orientationchange", this.kf);
      $i(this, !0);
      this.focus();
      this.fd = !0;
      this.bb && this.kb ? (ae(this.bb, "end", this.$a, !1, this), this.kb.play(), this.bb.play()) : this.$a()
    }
  };
  Yi.prototype.vb = function () {
    if (this.dispatchEvent("beforehide")) {
      this.Ia().hc(dd(this.F()), "resize", this.Rc).hc(dd(this.F()), "orientationchange", this.kf);
      this.fd = !1;
      this.ab && this.jb ? (ae(this.ab, "end", this.zb, !1, this), this.jb.play(), this.ab.play()) : this.zb();
      a: {
        try {
          var a = this.F(),
            b = a.l.body,
            c = a.l.activeElement || b;
          if (!this.yb || this.yb == b) {
            this.yb = null;
            break a
          }(c == b || a.contains(this.m(), c)) && this.yb.focus()
        } catch (d) {}
        this.yb = null
      }
    }
  };
  var $i = function (a, b) {
    a.N && I(a.N, b);
    a.S && I(a.S, b);
    I(a.m(), b);
    I(a.ka, b)
  };
  h = Yi.prototype;
  h.$a = function () {
    this.dispatchEvent("show")
  };
  h.zb = function () {
    $i(this, !1);
    this.dispatchEvent("hide")
  };
  h.isVisible = function () {
    return this.fd
  };
  h.focus = function () {
    this.Be()
  };
  h.Rc = function () {
    this.N && I(this.N, !1);
    this.S && I(this.S, !1);
    var a = this.F().l,
      b = Mc(Pc(a) || window || window),
      c = Math.max(b.width, Math.max(a.body.scrollWidth, a.documentElement.scrollWidth));
    a = Math.max(b.height, Math.max(a.body.scrollHeight, a.documentElement.scrollHeight));
    this.N && (I(this.N, !0), vd(this.N, c, a));
    this.S && (I(this.S, !0), vd(this.S, c, a))
  };
  h.O = function () {
    var a = this.F().l,
      b = Pc(a) || window;
    if ("fixed" == nd(this.m())) var c = a = 0;
    else c = Oc(this.F().l), a = c.x, c = c.y;
    var d = xd(this.m());
    b = Mc(b || window);
    a = Math.max(a + b.width / 2 - d.width / 2, 0);
    c = Math.max(c + b.height / 2 - d.height / 2, 0);
    pd(this.m(), a, c);
    pd(this.ka, a, c)
  };
  h.Ag = function (a) {
    this.pd ? this.jf() : a.target == this.ka && Ye(this.Be, 0, this)
  };
  h.Be = function () {
    try {
      x && this.F().l.body.focus(), this.m().focus()
    } catch (a) {}
  };
  h.B = function () {
    Kd(this.bb);
    this.bb = null;
    Kd(this.ab);
    this.ab = null;
    Kd(this.kb);
    this.kb = null;
    Kd(this.jb);
    this.jb = null;
    Yi.v.B.call(this)
  };
  var Z = function (a, b, c) {
    Yi.call(this, b, c);
    this.va = a || "modal-dialog";
    this.oa = aj(aj(new bj, cj, !0), dj, !1, !0)
  };
  t(Z, Yi);
  h = Z.prototype;
  h.$f = !0;
  h.Me = !0;
  h.Jd = !0;
  h.ye = !0;
  h.nd = .5;
  h.$g = "";
  h.sd = null;
  h.Ga = null;
  h.xe = !1;
  h.Gb = null;
  h.ad = null;
  h.de = null;
  h.Ba = null;
  h.rc = null;
  h.na = null;
  h.ef = "dialog";
  h.lg = !1;
  h.xc = function () {
    return this.va
  };
  h.qf = function (a) {
    if (!(a instanceof tc)) {
      if (!(a instanceof tc)) {
        var b = "object" == typeof a,
          c = null;
        b && a.Bd && (c = a.yc());
        a = vc(kb(b && a.Va ? a.Ua() : String(a)), c)
      }
      a = vc(uc(a).toString().replace(/(\r\n|\r|\n)/g, "<br>"), a.yc())
    }
    this.sd = a;
    this.rc && zc(this.rc, a)
  };
  h.wc = function () {
    this.m() || this.Yb();
    return Z.v.wc.call(this)
  };
  var ej = function (a, b) {
      a.Jd = b;
      if (a.ha) {
        var c = a.F(),
          d = a.wc(),
          e = a.N;
        b ? (e && c.Te(e, a.m()), c.Te(d, a.m())) : (c.removeNode(e), c.removeNode(d))
      }
      a.isVisible() && Zi(a, b)
    },
    fj = function (a, b) {
      var c = cb(a.va + "-title-draggable").split(" ");
      a.m() && (b ? M.addAll(u(a.Gb), c) : M.ja(u(a.Gb), c));
      b && !a.Ga ? (b = new Bi(a.m(), a.Gb), a.Ga = b, M.addAll(u(a.Gb), c), O(a.Ga, "start", a.Rg, !1, a)) : !b && a.Ga && (a.Ga.wa(), a.Ga = null)
    };
  h = Z.prototype;
  h.T = function () {
    Z.v.T.call(this);
    var a = this.m();
    u(a, "getElement() returns null");
    var b = this.F();
    this.de = Vi(this);
    var c = Vi(this) + ".contentEl";
    this.Gb = b.T("DIV", this.va + "-title", this.ad = b.T("SPAN", {
      className: this.va + "-title-text",
      id: this.de
    }, this.$g), this.Ba = b.T("SPAN", this.va + "-title-close"));
    Vc(a, this.Gb, this.rc = b.T("DIV", {
      className: this.va + "-content",
      id: c
    }), this.na = b.T("DIV", this.va + "-buttons"));
    xg(this.ad, "heading");
    xg(this.Ba, "button");
    this.Ba.tabIndex = 0;
    X(this.Ba, "label", "Close");
    xg(a, this.ef);
    X(a, "labelledby", this.de || "");
    this.sd && (zc(this.rc, this.sd), this.lg && c && X(a, "describedby", c));
    I(this.Ba, this.Me);
    this.oa && gj(this.oa, this.na);
    I(this.na, !!this.oa);
    this.nd = this.nd;
    this.m() && (a = this.wc()) && yd(a, this.nd)
  };
  h.ob = function () {
    Z.v.ob.call(this);
    this.Ia().D(this.m(), "keydown", this.Wb).D(this.m(), "keypress", this.Wb);
    this.Ia().D(this.na, "click", this.yg);
    fj(this, this.ye);
    this.Ia().D(this.Ba, "click", this.Gg);
    var a = this.m();
    u(a, "The DOM element for dialog cannot be null");
    xg(a, this.ef);
    "" !== this.ad.id && X(a, "labelledby", this.ad.id);
    this.Jd || ej(this, !1)
  };
  h.Ta = function () {
    this.isVisible() && this.I(!1);
    fj(this, !1);
    Z.v.Ta.call(this)
  };
  h.I = function (a) {
    a != this.isVisible() && (this.ha || this.Yb(), Z.v.I.call(this, a))
  };
  h.$a = function () {
    Z.v.$a.call(this);
    this.dispatchEvent("aftershow")
  };
  h.zb = function () {
    Z.v.zb.call(this);
    this.dispatchEvent("afterhide");
    this.xe && this.wa()
  };
  h.Rg = function () {
    var a = this.F().l,
      b = Mc(Pc(a) || window || window),
      c = Math.max(a.body.scrollWidth, b.width);
    a = Math.max(a.body.scrollHeight, b.height);
    var d = xd(this.m());
    "fixed" == nd(this.m()) ? this.Ga.Lc = new id(0, 0, Math.max(0, b.width - d.width), Math.max(0, b.height - d.height)) : this.Ga.Lc = new id(0, 0, c - d.width, a - d.height)
  };
  h.Gg = function () {
    hj(this)
  };
  var hj = function (a) {
    if (a.Me) {
      var b = a.oa,
        c = b && b.mc;
      c ? (b = b.get(c), a.dispatchEvent(new ij(c, b)) && a.I(!1)) : a.I(!1)
    }
  };
  Z.prototype.B = function () {
    this.na = this.Ba = null;
    Z.v.B.call(this)
  };
  Z.prototype.yg = function (a) {
    a: {
      for (a = a.target; null != a && a != this.na;) {
        if ("BUTTON" == a.tagName) break a;
        a = a.parentNode
      }
      a = null
    }
    if (a && !a.disabled) {
      a = a.name;
      var b = this.oa.get(a);
      this.dispatchEvent(new ij(a, b)) && this.I(!1)
    }
  };
  Z.prototype.Wb = function (a) {
    var b = !1,
      c = !1,
      d = this.oa,
      e = a.target;
    if ("keydown" == a.type)
      if (this.$f && 27 == a.keyCode) {
        var f = d && d.mc;
        e = "SELECT" == e.tagName && !e.disabled;
        f && !e ? (c = !0, b = d.get(f), b = this.dispatchEvent(new ij(f, b))) : e || (b = !0)
      } else {
        if (9 == a.keyCode && a.shiftKey && e == this.m()) {
          this.pd = !0;
          try {
            this.ka.focus()
          } catch (l) {}
          Ye(this.jf, 0, this)
        }
      }
    else if (13 == a.keyCode) {
      if ("BUTTON" == e.tagName && !e.disabled) f = e.name;
      else if (e == this.Ba) hj(this);
      else if (d) {
        var g = d.sc,
          k = g && jj(d, g);
        e = ("TEXTAREA" == e.tagName || "SELECT"
          == e.tagName || "A" == e.tagName) && !e.disabled;
        !k || k.disabled || e || (f = g)
      }
      f && d && (c = !0, b = this.dispatchEvent(new ij(f, String(d.get(f)))))
    } else e != this.Ba || 32 != a.keyCode && " " != a.key || hj(this);
    if (b || c) a.stopPropagation(), a.preventDefault();
    b && this.I(!1)
  };
  var ij = function (a, b) {
    this.type = "dialogselect";
    this.key = a;
    this.caption = b
  };
  t(ij, N);
  var bj = function (a) {
    Ii.call(this);
    this.Fa = a || Gc();
    this.va = "goog-buttonset";
    this.mc = this.i = this.sc = null
  };
  t(bj, Ii);
  bj.prototype.clear = function () {
    Ii.prototype.clear.call(this);
    this.sc = this.mc = null
  };
  bj.prototype.set = function (a, b, c, d) {
    Ii.prototype.set.call(this, a, b);
    c && (this.sc = a);
    d && (this.mc = a);
    return this
  };
  var aj = function (a, b, c, d) {
      return a.set(b.key, b.caption, c, d)
    },
    gj = function (a, b) {
      a.i = b;
      a.Yb()
    };
  bj.prototype.Yb = function () {
    if (this.i) {
      zc(this.i, wc);
      var a = Gc(this.i);
      this.forEach(function (b, c) {
        b = a.T("BUTTON", {
          name: c
        }, b);
        c == this.sc && (b.className = this.va + "-default");
        this.i.appendChild(b)
      }, this)
    }
  };
  bj.prototype.m = function () {
    return this.i
  };
  bj.prototype.F = function () {
    return this.Fa
  };
  var jj = function (a, b) {
      a = (u(a.i) || document).getElementsByTagName("BUTTON");
      for (var c = 0, d; d = a[c]; c++)
        if (d.name == b || d.id == b) return d;
      return null
    },
    cj = {
      key: "ok",
      caption: "OK"
    },
    dj = {
      key: "cancel",
      caption: "Cancel"
    },
    kj = {
      key: "yes",
      caption: "Yes"
    },
    lj = {
      key: "no",
      caption: "No"
    },
    mj = {
      key: "save",
      caption: "Save"
    },
    nj = {
      key: "continue",
      caption: "Continue"
    };
  "undefined" != typeof document && (aj(new bj, cj, !0, !0), aj(aj(new bj, cj, !0), dj, !1, !0), aj(aj(new bj, kj, !0), lj, !1, !0), aj(aj(aj(new bj, kj), lj, !0), dj, !1, !0), aj(aj(aj(new bj, nj), mj), dj, !0, !0));
  var pj = function () {
      this.g = U("blogger.templates.responsive.Sharing");
      W(this.g, "Initializing Sharing.");
      try {
        this.o = new mh;
        this.Bb = [];
        this.s = null;
        this.Zb = [];
        oj(this);
        if (this.o.Pf) {
          var a = document.querySelector(".post-share-buttons-top"),
            b = document.querySelector(".post-share-buttons-bottom");
          a && b && ui(b, a)
        }
        W(this.g, "Finished initializing sharing.")
      } catch (c) {
        V(this.g, "Error initializing sharing. Uncaught exception.", c), this.h()
      }
    },
    oj = function (a) {
      kh("sharing_native").then(function (b) {
        for (var c = {}, d = n(Array.prototype.slice.call(document.querySelectorAll(".sharing"),
            0)), e = d.next(); !e.done; c = {
            J: c.J,
            Oa: c.Oa,
            la: c.la,
            Ca: c.Ca,
            X: c.X,
            Ib: c.Ib
          }, e = d.next())
          if (c.Oa = e.value, c.X = G("sharing-button", c.Oa), c.Ca = G("share-buttons-container", c.Oa), c.la = G("share-buttons", c.Oa), c.Ca && c.la && c.X) {
            c.J = new Lg(c.la);
            e = function (l) {
              return function () {
                l.J && l.J.isVisible() && l.J.O()
              }
            }(c);
            var f = function (l) {
              return function () {
                var m = l.J,
                  p = l.la,
                  q = l.Ca,
                  y = l.X;
                m && !m.isVisible() ? a.Eb(m, p, q, y) : a.tb(m, p, q, y)
              }
            }(c);
            Jg(c.J);
            Ig(c.J);
            var g = a.o.wf && a.o.wf(c.J.m()),
              k = a.o.Pe && a.o.Pe(c.J.m());
            c.J.rf(g, k);
            O(window,
              "resize", e);
            O(c.X, "click", f);
            O(c.J, "hide", function (l) {
              return function () {
                return a.tb(l.J, l.la, l.Ca, l.X)
              }
            }(c));
            f = new wi(c.X);
            O(f, "key", function (l) {
              return function (m) {
                return a.Wb(l.J, l.la, l.Ca, l.X, m)
              }
            }(c));
            f = new wi(c.la);
            O(f, "key", function (l) {
              return function (m) {
                return a.Wb(l.J, l.la, l.Ca, l.X, m)
              }
            }(c));
            xg(c.X, "button");
            X(c.X, "expanded", !1);
            X(c.X, "haspopup", !0);
            b && void 0 !== navigator.share && (c.Ib = G("sharing-element-other", c.Oa), f = c.Ib.parentElement, M.remove(f, "hidden"), f.removeAttribute("aria-hidden"), O(c.Ib,
              "click",
              function (l) {
                return function () {
                  var m = l.Oa.getAttribute("data-title"),
                    p = l.Ib.getAttribute("data-url");
                  null != m && p && (navigator.share({
                    title: m,
                    url: p
                  }), a.tb(l.J, l.la, l.Ca, l.X))
                }
              }(c)));
            a.Bb.push(c.J);
            a.Zb.push(e)
          }
      })
    };
  pj.prototype.te = function () {
    if (this.Bb)
      for (var a = n(this.Bb), b = a.next(); !b.done; b = a.next())(b = b.value) && b.I(!1)
  };
  pj.prototype.Eb = function (a, b, c, d) {
    b && c && (c.removeChild(b), document.body.appendChild(b), a.I(!1), M.add(d, "sharing-open"), M.remove(b, "hidden"), X(b, "expanded", !0), X(b, "hidden", !1), c = "ltr" == r.document.documentElement.getAttribute("dir") ? 4 : 0, a.Md = c, a.isVisible() && a.O(), d && (X(d, "expanded", !0), a.setPosition(new bh(d, c))), a.I(!0), this.o.ze && (this.s = Nf(document.body, null, "sharing-dim-overlay"), this.s.show()), qj(this, b))
  };
  pj.prototype.tb = function (a, b, c, d) {
    b && c && (M.remove(d, "sharing-open"), M.add(b, "hidden"), X(b, "expanded", !1), X(b, "hidden", !0), document.body.removeChild(b), c.appendChild(b), d && X(d, "expanded", !1), this.o.ze && (this.s.aa(), this.s = null))
  };
  pj.prototype.Wb = function (a, b, c, d, e) {
    b && c && (38 == e.keyCode || 40 == e.keyCode) && (a.isVisible() || this.Eb(a, b, c, d), a = Array.prototype.slice.call(b.querySelectorAll("." + this.o.sf)), b = a.indexOf(document.activeElement), b += 40 == e.keyCode ? 1 : -1, b = (b + a.length) % a.length, a[b].focus(), e.preventDefault())
  };
  var qj = function (a, b) {
      if (!M.contains(b, "btns-init")) {
        for (var c = b.querySelectorAll("." + a.o.sf), d = Da(a.te, a), e = {}, f = 0; f < c.length; e = {
            ic: e.ic
          }, f++) e.ic = c[f],
          function (g) {
            return function (k) {
              var l = new wi(k);
              if (M.contains(k, "sharing-element-link")) rj(a, k), O(l, "key", function (p) {
                if (32 == p.keyCode || 13 == p.keyCode) k.click(), p.preventDefault()
              });
              else {
                var m = function () {
                  var p = g.ic;
                  if ("undefined" !== typeof ga) {
                    var q = p.querySelector(".platform-sharing-text");
                    q = q ? q.innerText : "Unknown";
                    p = p.getAttribute("data-url");
                    ga("blogger.send", {
                      hitType: "social",
                      socialNetwork: q,
                      socialAction: "Share",
                      socialTarget: p,
                      transport: "beacon"
                    })
                  }
                  var y = k.getAttribute("data-href");
                  p = {
                    target: "_blank",
                    height: 430,
                    width: 640
                  };
                  q = window;
                  if (y instanceof lc) var w = y;
                  else {
                    w = "undefined" != typeof y.href ? y.href : String(y);
                    if (!(w instanceof lc))
                      if (w = "object" == typeof w && w.Va ? w.Ua() : String(w), pc.test(w)) w = new lc(w, kc);
                      else {
                        w = String(w);
                        w = w.replace(/(%0A|%0D)/g, "");
                        var A = w.match(oc);
                        w = A && nc.test(A[1]) ? new lc(w, kc) : null
                      } w = w || rc
                  }
                  A = void 0 !== self.ej;
                  var D = "strict-origin-when-cross-origin";
                  window.Request && (D = (new Request("/")).referrerPolicy);
                  D = "unsafe-url" === D;
                  if (A && p.noreferrer) {
                    if (D) throw Error("Cannot use the noreferrer option on a page that sets a referrer-policy of `unsafe-url` in modern browsers!");
                    p.noreferrer = !1
                  }
                  y = p.target || y.target;
                  A = [];
                  for (var B in p) switch (B) {
                    case "width":
                    case "height":
                    case "top":
                    case "left":
                      A.push(B + "=" + p[B]);
                      break;
                    case "target":
                    case "noopener":
                    case "noreferrer":
                      break;
                    default:
                      A.push(B + "=" + (p[B] ? 1 : 0))
                  }
                  B = A.join(",");
                  tb() && q.navigator && q.navigator.standalone
                    && y && "_self" != y ? (B = Sc(document, "A"), Sb(B, "HTMLAnchorElement"), w = w instanceof lc ? w : qc(w), B.href = mc(w), B.setAttribute("target", y), p.noreferrer && B.setAttribute("rel", "noreferrer"), p = document.createEvent("MouseEvent"), p.initMouseEvent("click", !0, !0, q, 1), B.dispatchEvent(p)) : p.noreferrer ? (q = Ac("", q, y, B), B = mc(w), q && (zb && -1 != B.indexOf(";") && (B = "'" + B.replace(/'/g, "%27") + "'"), q.opener = null, p = new ec(cc, "b/12014412, meta tag with sanitized URL"), B = kb(B, void 0), B = '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url='
                      + B + '">', Oa(fc(p), "must provide justification"), u(!/^[\s\xa0]*$/.test(fc(p)), "must provide non-empty justification"), p = vc(B, null), (q = q.document) && q.write && (q.write(uc(p)), q.close()))) : (q = Ac(w, q, y, B)) && p.noopener && (q.opener = null);
                  d();
                  return !1
                };
                O(l, "key", function (p) {
                  if (32 == p.keyCode || 13 == p.keyCode) m(), p.preventDefault()
                });
                O(k, "click", m)
              }
            }
          }(e)(e.ic);
        M.add(b, "btns-init")
      }
    },
    rj = function (a, b) {
      if (b && "undefined" !== typeof ClipboardJS && ClipboardJS) {
        b = new ClipboardJS(b, {
          text: function (e) {
            return e.getAttribute("data-url")
          }
        });
        var c = Da(a.te, a),
          d = lh("postUrl") || "Post Link";
        b.on("error", function (e) {
          window.prompt(d, e.trigger.getAttribute("data-url"));
          c();
          return !1
        });
        b.on("success", function () {
          var e = lh("linkCopiedToClipboard") || "Link copied to clipboard.";
          kh("sharing_get_link_dialog").then(function (f) {
            if (f && 0 <= si()) {
              f = lh("ok") || "Ok";
              var g = new Z,
                k = Nf(document.body, function () {
                  g.I(!1)
                }, "getlink-dim-overlay");
              k.show();
              var l = (new bj).set(f, f, !0, !0);
              g.oa = l;
              g.na && (g.oa ? gj(g.oa, g.na) : zc(g.na, wc), I(g.na, !!g.oa));
              g.qf(e);
              g.ye = !1;
              fj(g,
                !1);
              g.xe = !0;
              1 != g.Jd && ej(g, !0);
              g.Yb();
              M.add(jj(l, f), "flat-button");
              M.add(g.m(), "dialog");
              M.add(g.m(), "link-copied-dialog");
              g.I(!0);
              O(g, "hide", function () {
                k.aa()
              })
            } else window.alert(e);
            c()
          });
          return !1
        })
      } else sf(a.g, "ClipboardJS not initialized.")
    };
  pj.prototype.h = function () {
    this.s && (this.s.aa(), this.s = null);
    this.Bb && Ld(this.Bb);
    this.Bb = null;
    if (this.Zb)
      for (var a = 0; a < this.Zb.length; a++) P(window, "resize", this.Zb[a]);
    this.Zb = null;
    a = document.querySelectorAll(".sharing .share-buttons .sharing-platform-button");
    for (var b = 0; b < a.length; b++) R(a[b], "click");
    a = document.querySelectorAll(".sharing");
    for (b = 0; b < a.length; b++) {
      var c = G("sharing-button", a[b]);
      R(c, "click")
    }
  };
  var sj = function () {
    var a = this;
    this.g = U("blogger.templates.responsive.SidebarToggle");
    W(this.g, "Initializing SidebarToggle.");
    try {
      var b = document.querySelector(".sidebar-container");
      if (b) {
        this.Zd = b;
        var c = this.Zd.parentElement;
        this.s = c && Nf(c, function () {
          return a.fe()
        });
        (this.Xc = document.querySelector(".sidebar-back")) && O(this.Xc, "click", this.fe, !1, this);
        (this.Ac = document.querySelector(".centered-top-container .hamburger-menu")) && O(this.Ac, "click", this.fe, !1, this);
        W(this.g, "Finished initializing sidebar toggle.")
      } else V(this.g,
        "There was an error initializing the sidebar toggle section. sidebar not found.")
    } catch (d) {
      V(this.g, "Error initializing sidebar toggle. Uncaught exception.", d), this.h()
    }
  };
  sj.prototype.fe = function () {
    ti(this.Zd)();
    M.contains(this.Zd, "sidebar-invisible") ? (this.s && this.s.Qb(), M.remove(document.body, "sidebar-visible")) : (this.s && this.s.show(), M.add(document.body, "sidebar-visible"))
  };
  sj.prototype.h = function () {
    this.Ac && R(this.Ac, "click");
    this.Xc && R(this.Xc, "click");
    this.s && (this.s.aa(), this.s = null)
  };
  var tj = function () {
    this.Kb = "r-snippet-container";
    this.mb = "r-snippetized";
    this.bg = "r-snippet-fade"
  };
  var uj = function () {
    var a = this;
    this.g = U("blogger.templates.responsive.Snippets");
    W(this.g, "Initializing Snippets.");
    try {
      this.o = new tj, this.ta = new Yg(new Xg(this.o.Kb, this.o.mb, function (b, c) {
        return a.Oc(b, c)
      })), W(this.g, "Finished initializing Snippets.")
    } catch (b) {
      V(this.g, "Error initializing Snippets. Uncaught exception.", b), this.h()
    }
  };
  uj.prototype.Oc = function (a, b) {
    (a = G(this.o.bg, a)) && M.enable(a, "hidden", !b)
  };
  uj.prototype.h = function () {
    this.ta && (this.ta.h(), this.ta = null)
  };
  var vj = function (a) {
    ri.call(this);
    a = a || new Qg;
    W(this.sa, "Initializing fancy template.");
    try {
      this.kd = new Pg(a.If);
      this.Kc = new Ug;
      this.Yd = new sj;
      this.Ud = new pj;
      var b = new $g;
      b.ib = ["collapsed-header-show", "collapsed-header-hide"];
      this.Pc = gh(b);
      this.Pc.forEach(function (c) {
        return c.ia()
      });
      this.$d = new uj;
      Vg(this.Kc);
      W(this.sa, "Finished initializing fancy template.")
    } catch (c) {
      V(this.sa, "Error initializing fancy template. Uncaught exception.", c), this.h()
    }
  };
  pa(vj, ri);
  vj.prototype.h = function () {
    var a = this;
    return ri.prototype.h.call(this).then(function () {
      a.kd && a.kd.h();
      a.Kc && a.Kc.h();
      a.Yd && a.Yd.h();
      a.Ud && a.Ud.h();
      a.Pc && a.Pc.forEach(function (b) {
        return b.h()
      });
      a.$d && a.$d.h();
      a.kd = null;
      a.Kc = null;
      a.Yd = null;
      a.Ud = null;
      a.Pc = null;
      a.$d = null
    })
  };
  (function (a) {
    var b = function () {
      document.body.setAttribute("data-js-state", "loading");
      a();
      document.body.setAttribute("data-js-state", "loaded")
    };
    "loading" != document.readyState ? b() : O(window, "DOMContentLoaded", b)
  })(function () {
    return new vj
  });
}).call(this);
