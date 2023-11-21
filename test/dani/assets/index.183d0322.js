(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) l(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const u of r.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && l(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerpolicy && (r.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function l(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r);
  }
})();
function z() {}
function A(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function Ie(t) {
  return t();
}
function je() {
  return Object.create(null);
}
function Y(t) {
  t.forEach(Ie);
}
function pe(t) {
  return typeof t == "function";
}
function C(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == "object") || typeof t == "function";
}
let ie;
function x(t, e) {
  return ie || (ie = document.createElement("a")), (ie.href = e), t === ie.href;
}
function Re(t) {
  return Object.keys(t).length === 0;
}
function te(t, e, n, l) {
  if (t) {
    const s = Me(t, e, n, l);
    return t[0](s);
  }
}
function Me(t, e, n, l) {
  return t[1] && l ? A(n.ctx.slice(), t[1](l(e))) : n.ctx;
}
function ne(t, e, n, l) {
  if (t[2] && l) {
    const s = t[2](l(n));
    if (e.dirty === void 0) return s;
    if (typeof s == "object") {
      const r = [],
        u = Math.max(e.dirty.length, s.length);
      for (let f = 0; f < u; f += 1) r[f] = e.dirty[f] | s[f];
      return r;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function le(t, e, n, l, s, r) {
  if (s) {
    const u = Me(e, n, l, r);
    t.p(u, s);
  }
}
function se(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let l = 0; l < n; l++) e[l] = -1;
    return e;
  }
  return -1;
}
function _e(t) {
  const e = {};
  for (const n in t) n[0] !== "$" && (e[n] = t[n]);
  return e;
}
function R(t, e) {
  const n = {};
  e = new Set(e);
  for (const l in t) !e.has(l) && l[0] !== "$" && (n[l] = t[l]);
  return n;
}
function He(t) {
  const e = {};
  for (const n in t) e[n] = !0;
  return e;
}
function ye(t) {
  return t && pe(t.destroy) ? t.destroy : z;
}
function E(t, e) {
  t.appendChild(e);
}
function $(t, e, n) {
  t.insertBefore(e, n || null);
}
function w(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function j(t) {
  return document.createElement(t);
}
function O(t) {
  return document.createTextNode(t);
}
function P() {
  return O(" ");
}
function ke() {
  return O("");
}
function q(t, e, n, l) {
  return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l);
}
function S(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function M(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const l in e)
    e[l] == null
      ? t.removeAttribute(l)
      : l === "style"
      ? (t.style.cssText = e[l])
      : l === "__value"
      ? (t.value = t[l] = e[l])
      : n[l] && n[l].set
      ? (t[l] = e[l])
      : S(t, l, e[l]);
}
function X(t, e) {
  Object.keys(e).forEach((n) => {
    qe(t, n, e[n]);
  });
}
function qe(t, e, n) {
  e in t ? (t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n) : S(t, e, n);
}
function Ue(t) {
  return Array.from(t.childNodes);
}
function K(t, e) {
  (e = "" + e), t.wholeText !== e && (t.data = e);
}
function I(t, e, n, l) {
  n === null
    ? t.style.removeProperty(e)
    : t.style.setProperty(e, n, l ? "important" : "");
}
function T(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
let ee;
function Z(t) {
  ee = t;
}
function Fe() {
  if (!ee) throw new Error("Function called outside component initialization");
  return ee;
}
function Ge(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((l) => l.call(this, e));
}
const Q = [],
  V = [],
  ue = [],
  Be = [],
  Ke = Promise.resolve();
let be = !1;
function Xe() {
  be || ((be = !0), Ke.then(De));
}
function ve(t) {
  ue.push(t);
}
const me = new Set();
let oe = 0;
function De() {
  const t = ee;
  do {
    for (; oe < Q.length; ) {
      const e = Q[oe];
      oe++, Z(e), Ye(e.$$);
    }
    for (Z(null), Q.length = 0, oe = 0; V.length; ) V.pop()();
    for (let e = 0; e < ue.length; e += 1) {
      const n = ue[e];
      me.has(n) || (me.add(n), n());
    }
    ue.length = 0;
  } while (Q.length);
  for (; Be.length; ) Be.pop()();
  (be = !1), me.clear(), Z(t);
}
function Ye(t) {
  if (t.fragment !== null) {
    t.update(), Y(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(ve);
  }
}
const fe = new Set();
let U;
function ae() {
  U = { r: 0, c: [], p: U };
}
function ce() {
  U.r || Y(U.c), (U = U.p);
}
function v(t, e) {
  t && t.i && (fe.delete(t), t.i(e));
}
function y(t, e, n, l) {
  if (t && t.o) {
    if (fe.has(t)) return;
    fe.add(t),
      U.c.push(() => {
        fe.delete(t), l && (n && t.d(1), l());
      }),
      t.o(e);
  } else l && l();
}
function re(t, e) {
  const n = {},
    l = {},
    s = { $$scope: 1 };
  let r = t.length;
  for (; r--; ) {
    const u = t[r],
      f = e[r];
    if (f) {
      for (const o in u) o in f || (l[o] = 1);
      for (const o in f) s[o] || ((n[o] = f[o]), (s[o] = 1));
      t[r] = f;
    } else for (const o in u) s[o] = 1;
  }
  for (const u in l) u in n || (n[u] = void 0);
  return n;
}
function N(t) {
  t && t.c();
}
function B(t, e, n, l) {
  const { fragment: s, after_update: r } = t.$$;
  s && s.m(e, n),
    l ||
      ve(() => {
        const u = t.$$.on_mount.map(Ie).filter(pe);
        t.$$.on_destroy ? t.$$.on_destroy.push(...u) : Y(u),
          (t.$$.on_mount = []);
      }),
    r.forEach(ve);
}
function L(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (Y(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function Je(t, e) {
  t.$$.dirty[0] === -1 && (Q.push(t), Xe(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function F(t, e, n, l, s, r, u, f = [-1]) {
  const o = ee;
  Z(t);
  const i = (t.$$ = {
    fragment: null,
    ctx: [],
    props: r,
    update: z,
    not_equal: s,
    bound: je(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (o ? o.$$.context : [])),
    callbacks: je(),
    dirty: f,
    skip_bound: !1,
    root: e.target || o.$$.root,
  });
  u && u(i.root);
  let m = !1;
  if (
    ((i.ctx = n
      ? n(t, e.props || {}, (d, c, ...a) => {
          const h = a.length ? a[0] : c;
          return (
            i.ctx &&
              s(i.ctx[d], (i.ctx[d] = h)) &&
              (!i.skip_bound && i.bound[d] && i.bound[d](h), m && Je(t, d)),
            c
          );
        })
      : []),
    i.update(),
    (m = !0),
    Y(i.before_update),
    (i.fragment = l ? l(i.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const d = Ue(e.target);
      i.fragment && i.fragment.l(d), d.forEach(w);
    } else i.fragment && i.fragment.c();
    e.intro && v(t.$$.fragment),
      B(t, e.target, e.anchor, e.customElement),
      De();
  }
  Z(o);
}
class D {
  $destroy() {
    L(this, 1), (this.$destroy = z);
  }
  $on(e, n) {
    if (!pe(n)) return z;
    const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      l.push(n),
      () => {
        const s = l.indexOf(n);
        s !== -1 && l.splice(s, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !Re(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
function Ve(t, e = []) {
  let n,
    l = [];
  return (
    (t.$on = (s, r) => {
      let u = () => {};
      if (e.includes(s)) {
        const f = t.$$.callbacks[s] || (t.$$.callbacks[s] = []);
        return (
          f.push(r),
          () => {
            const o = f.indexOf(r);
            o !== -1 && f.splice(o, 1);
          }
        );
      }
      return n ? (u = n(s, r)) : l.push([s, r]), () => u();
    }),
    (s) => {
      const r = [],
        u = {},
        f = (o) => Ge(t, o);
      n = (o, i) => {
        const c = q(s, o, i, !1),
          a = () => {
            c();
            const h = r.indexOf(a);
            h > -1 && r.splice(h, 1);
          };
        return r.push(a), o in u || (u[o] = q(s, o, f)), a;
      };
      for (const o of l) n(o[0], o[1]);
      return {
        destroy: () => {
          for (const o of r) o();
          for (let o of Object.entries(u)) o[1]();
        },
      };
    }
  );
}
function de(t) {
  let e, n, l, s, r, u, f;
  const o = t[8].default,
    i = te(o, t, t[7], null);
  let m = [
      { role: (n = t[2] && !t[3] ? "button" : void 0) },
      { href: (l = t[2] && !t[3] ? t[2] : void 0) },
      { class: (s = "button style-" + t[1] + " " + t[4]) },
      t[6],
    ],
    d = {};
  for (let c = 0; c < m.length; c += 1) d = A(d, m[c]);
  return {
    c() {
      (e = j(t[2] && !t[3] ? "a" : "button")),
        i && i.c(),
        /-/.test(t[2] && !t[3] ? "a" : "button") ? X(e, d) : M(e, d),
        T(e, "disabled", t[3]),
        T(e, "svelte-1ulhukx", !0);
    },
    m(c, a) {
      $(c, e, a),
        i && i.m(e, null),
        t[9](e),
        (r = !0),
        u || ((f = ye(t[5].call(null, e))), (u = !0));
    },
    p(c, a) {
      i &&
        i.p &&
        (!r || a & 128) &&
        le(i, o, c, c[7], r ? ne(o, c[7], a, null) : se(c[7]), null),
        (d = re(m, [
          (!r || (a & 12 && n !== (n = c[2] && !c[3] ? "button" : void 0))) && {
            role: n,
          },
          (!r || (a & 12 && l !== (l = c[2] && !c[3] ? c[2] : void 0))) && {
            href: l,
          },
          (!r ||
            (a & 18 && s !== (s = "button style-" + c[1] + " " + c[4]))) && {
            class: s,
          },
          a & 64 && c[6],
        ])),
        /-/.test(c[2] && !c[3] ? "a" : "button") ? X(e, d) : M(e, d),
        T(e, "disabled", c[3]),
        T(e, "svelte-1ulhukx", !0);
    },
    i(c) {
      r || (v(i, c), (r = !0));
    },
    o(c) {
      y(i, c), (r = !1);
    },
    d(c) {
      c && w(e), i && i.d(c), t[9](null), (u = !1), f();
    },
  };
}
function Qe(t) {
  let e = t[2] && !t[3] ? "a" : "button",
    n,
    l,
    s = (t[2] && !t[3] ? "a" : "button") && de(t);
  return {
    c() {
      s && s.c(), (n = ke());
    },
    m(r, u) {
      s && s.m(r, u), $(r, n, u), (l = !0);
    },
    p(r, [u]) {
      r[2] && r[3],
        e
          ? C(e, r[2] && !r[3] ? "a" : "button")
            ? (s.d(1), (s = de(r)), s.c(), s.m(n.parentNode, n))
            : s.p(r, u)
          : ((s = de(r)), s.c(), s.m(n.parentNode, n)),
        (e = r[2] && !r[3] ? "a" : "button");
    },
    i(r) {
      l || (v(s), (l = !0));
    },
    o(r) {
      y(s), (l = !1);
    },
    d(r) {
      r && w(n), s && s.d(r);
    },
  };
}
function Ze(t, e, n) {
  const l = ["variant", "href", "disabled", "class", "element"];
  let s = R(e, l),
    { $$slots: r = {}, $$scope: u } = e,
    { variant: f = "standard" } = e,
    { href: o = "" } = e,
    { disabled: i = !1 } = e,
    { class: m = "" } = e,
    { element: d = null } = e;
  const c = Ve(Fe());
  function a(h) {
    V[h ? "unshift" : "push"](() => {
      (d = h), n(0, d);
    });
  }
  return (
    (t.$$set = (h) => {
      (e = A(A({}, e), _e(h))),
        n(6, (s = R(e, l))),
        "variant" in h && n(1, (f = h.variant)),
        "href" in h && n(2, (o = h.href)),
        "disabled" in h && n(3, (i = h.disabled)),
        "class" in h && n(4, (m = h.class)),
        "element" in h && n(0, (d = h.element)),
        "$$scope" in h && n(7, (u = h.$$scope));
    }),
    [d, f, o, i, m, c, s, u, r, a]
  );
}
class We extends D {
  constructor(e) {
    super(),
      F(this, e, Ze, Qe, C, {
        variant: 1,
        href: 2,
        disabled: 3,
        class: 4,
        element: 0,
      });
  }
}
function ge(t) {
  let e, n, l;
  const s = t[7].default,
    r = te(s, t, t[6], null);
  let u = [
      { class: (n = "text-block type-" + t[4][t[1]].name + " " + t[3]) },
      t[5],
    ],
    f = {};
  for (let o = 0; o < u.length; o += 1) f = A(f, u[o]);
  return {
    c() {
      (e = j(t[2] ? t[2] : t[4][t[1]].tag)),
        r && r.c(),
        /-/.test(t[2] ? t[2] : t[4][t[1]].tag) ? X(e, f) : M(e, f),
        T(e, "svelte-zxj483", !0);
    },
    m(o, i) {
      $(o, e, i), r && r.m(e, null), t[8](e), (l = !0);
    },
    p(o, i) {
      r &&
        r.p &&
        (!l || i & 64) &&
        le(r, s, o, o[6], l ? ne(s, o[6], i, null) : se(o[6]), null),
        (f = re(u, [
          (!l ||
            (i & 10 &&
              n !==
                (n = "text-block type-" + o[4][o[1]].name + " " + o[3]))) && {
            class: n,
          },
          i & 32 && o[5],
        ])),
        /-/.test(o[2] ? o[2] : o[4][o[1]].tag) ? X(e, f) : M(e, f),
        T(e, "svelte-zxj483", !0);
    },
    i(o) {
      l || (v(r, o), (l = !0));
    },
    o(o) {
      y(r, o), (l = !1);
    },
    d(o) {
      o && w(e), r && r.d(o), t[8](null);
    },
  };
}
function xe(t) {
  let e = t[2] ? t[2] : t[4][t[1]].tag,
    n,
    l,
    s = (t[2] ? t[2] : t[4][t[1]].tag) && ge(t);
  return {
    c() {
      s && s.c(), (n = ke());
    },
    m(r, u) {
      s && s.m(r, u), $(r, n, u), (l = !0);
    },
    p(r, [u]) {
      (r[2] ? r[2] : r[4][r[1]].tag)
        ? e
          ? C(e, r[2] ? r[2] : r[4][r[1]].tag)
            ? (s.d(1), (s = ge(r)), s.c(), s.m(n.parentNode, n))
            : s.p(r, u)
          : ((s = ge(r)), s.c(), s.m(n.parentNode, n))
        : e && (s.d(1), (s = null)),
        (e = r[2] ? r[2] : r[4][r[1]].tag);
    },
    i(r) {
      l || (v(s), (l = !0));
    },
    o(r) {
      y(s), (l = !1);
    },
    d(r) {
      r && w(n), s && s.d(r);
    },
  };
}
function et(t, e, n) {
  const l = ["variant", "tag", "class", "element"];
  let s = R(e, l),
    { $$slots: r = {}, $$scope: u } = e,
    { variant: f = "body" } = e,
    { tag: o = void 0 } = e,
    { class: i = "" } = e,
    { element: m = null } = e;
  const d = {
    caption: { tag: "span", name: "caption" },
    body: { tag: "span", name: "body" },
    bodyStrong: { tag: "h5", name: "body-strong" },
    bodyLarge: { tag: "h5", name: "body-large" },
    subtitle: { tag: "h4", name: "subtitle" },
    title: { tag: "h3", name: "title" },
    titleLarge: { tag: "h2", name: "title-large" },
    display: { tag: "h1", name: "display" },
  };
  function c(a) {
    V[a ? "unshift" : "push"](() => {
      (m = a), n(0, m);
    });
  }
  return (
    (t.$$set = (a) => {
      (e = A(A({}, e), _e(a))),
        n(5, (s = R(e, l))),
        "variant" in a && n(1, (f = a.variant)),
        "tag" in a && n(2, (o = a.tag)),
        "class" in a && n(3, (i = a.class)),
        "element" in a && n(0, (m = a.element)),
        "$$scope" in a && n(6, (u = a.$$scope));
    }),
    [m, f, o, i, d, s, u, r, c]
  );
}
class G extends D {
  constructor(e) {
    super(),
      F(this, e, et, xe, C, { variant: 1, tag: 2, class: 3, element: 0 });
  }
}
const tt = (t) => ({}),
  Le = (t) => ({});
function nt(t) {
  let e, n, l;
  const s = t[10].default,
    r = te(s, t, t[9], null),
    u = r || st(t);
  let f = [{ class: (n = "person-picture " + t[5]) }, t[7]],
    o = {};
  for (let i = 0; i < f.length; i += 1) o = A(o, f[i]);
  return {
    c() {
      (e = j("div")), u && u.c(), M(e, o), T(e, "svelte-p3ps28", !0);
    },
    m(i, m) {
      $(i, e, m), u && u.m(e, null), t[13](e), (l = !0);
    },
    p(i, m) {
      r
        ? r.p &&
          (!l || m & 512) &&
          le(r, s, i, i[9], l ? ne(s, i[9], m, null) : se(i[9]), null)
        : u && u.p && (!l || m & 16) && u.p(i, l ? m : -1),
        M(
          e,
          (o = re(f, [
            (!l || (m & 32 && n !== (n = "person-picture " + i[5]))) && {
              class: n,
            },
            m & 128 && i[7],
          ]))
        ),
        T(e, "svelte-p3ps28", !0);
    },
    i(i) {
      l || (v(u, i), (l = !0));
    },
    o(i) {
      y(u, i), (l = !1);
    },
    d(i) {
      i && w(e), u && u.d(i), t[13](null);
    },
  };
}
function lt(t) {
  let e,
    n,
    l,
    s,
    r,
    u = [
      { class: (n = "person-picture " + t[5]) },
      { width: t[2] },
      { height: t[2] },
      { src: (l = t[3]) },
      { alt: t[4] },
      t[7],
    ],
    f = {};
  for (let o = 0; o < u.length; o += 1) f = A(f, u[o]);
  return {
    c() {
      (e = j("img")), M(e, f), T(e, "svelte-p3ps28", !0);
    },
    m(o, i) {
      $(o, e, i), t[11](e), s || ((r = q(e, "error", t[12])), (s = !0));
    },
    p(o, i) {
      M(
        e,
        (f = re(u, [
          i & 32 && n !== (n = "person-picture " + o[5]) && { class: n },
          i & 4 && { width: o[2] },
          i & 4 && { height: o[2] },
          i & 8 && !x(e.src, (l = o[3])) && { src: l },
          i & 16 && { alt: o[4] },
          i & 128 && o[7],
        ]))
      ),
        T(e, "svelte-p3ps28", !0);
    },
    i: z,
    o: z,
    d(o) {
      o && w(e), t[11](null), (s = !1), r();
    },
  };
}
function st(t) {
  var l, s;
  let e =
      ((s =
        (l = t[4]) == null
          ? void 0
          : l.split(" ").map(Ne).join("").toUpperCase()) != null
        ? s
        : "") + "",
    n;
  return {
    c() {
      n = O(e);
    },
    m(r, u) {
      $(r, n, u);
    },
    p(r, u) {
      var f, o;
      u & 16 &&
        e !==
          (e =
            ((o =
              (f = r[4]) == null
                ? void 0
                : f.split(" ").map(Ne).join("").toUpperCase()) != null
              ? o
              : "") + "") &&
        K(n, e);
    },
    d(r) {
      r && w(n);
    },
  };
}
function Pe(t) {
  let e, n;
  const l = t[10].badge,
    s = te(l, t, t[9], Le);
  return {
    c() {
      (e = j("span")),
        s && s.c(),
        S(e, "class", "person-picture-badge svelte-p3ps28");
    },
    m(r, u) {
      $(r, e, u), s && s.m(e, null), (n = !0);
    },
    p(r, u) {
      s &&
        s.p &&
        (!n || u & 512) &&
        le(s, l, r, r[9], n ? ne(l, r[9], u, tt) : se(r[9]), Le);
    },
    i(r) {
      n || (v(s, r), (n = !0));
    },
    o(r) {
      y(s, r), (n = !1);
    },
    d(r) {
      r && w(e), s && s.d(r);
    },
  };
}
function rt(t) {
  let e, n, l, s, r;
  const u = [lt, nt],
    f = [];
  function o(m, d) {
    return m[3] && !m[6] ? 0 : 1;
  }
  (n = o(t)), (l = f[n] = u[n](t));
  let i = t[8].badge && Pe(t);
  return {
    c() {
      (e = j("div")),
        l.c(),
        (s = P()),
        i && i.c(),
        S(e, "class", "person-picture-container svelte-p3ps28"),
        I(e, "--fds-person-picture-size", t[2] + "px");
    },
    m(m, d) {
      $(m, e, d),
        f[n].m(e, null),
        E(e, s),
        i && i.m(e, null),
        t[14](e),
        (r = !0);
    },
    p(m, [d]) {
      let c = n;
      (n = o(m)),
        n === c
          ? f[n].p(m, d)
          : (ae(),
            y(f[c], 1, 1, () => {
              f[c] = null;
            }),
            ce(),
            (l = f[n]),
            l ? l.p(m, d) : ((l = f[n] = u[n](m)), l.c()),
            v(l, 1),
            l.m(e, s)),
        m[8].badge
          ? i
            ? (i.p(m, d), d & 256 && v(i, 1))
            : ((i = Pe(m)), i.c(), v(i, 1), i.m(e, null))
          : i &&
            (ae(),
            y(i, 1, 1, () => {
              i = null;
            }),
            ce()),
        (!r || d & 4) && I(e, "--fds-person-picture-size", m[2] + "px");
    },
    i(m) {
      r || (v(l), v(i), (r = !0));
    },
    o(m) {
      y(l), y(i), (r = !1);
    },
    d(m) {
      m && w(e), f[n].d(), i && i.d(), t[14](null);
    },
  };
}
const Ne = (t) => t.charAt(0);
function it(t, e, n) {
  const l = ["size", "src", "alt", "class", "element", "containerElement"];
  let s = R(e, l),
    { $$slots: r = {}, $$scope: u } = e;
  const f = He(r);
  let { size: o = 72 } = e,
    { src: i = void 0 } = e,
    { alt: m = void 0 } = e,
    { class: d = "" } = e,
    { element: c = null } = e,
    { containerElement: a = null } = e,
    h = !1;
  function g(p) {
    V[p ? "unshift" : "push"](() => {
      (c = p), n(0, c);
    });
  }
  const k = () => n(6, (h = !0));
  function _(p) {
    V[p ? "unshift" : "push"](() => {
      (c = p), n(0, c);
    });
  }
  function b(p) {
    V[p ? "unshift" : "push"](() => {
      (a = p), n(1, a);
    });
  }
  return (
    (t.$$set = (p) => {
      (e = A(A({}, e), _e(p))),
        n(7, (s = R(e, l))),
        "size" in p && n(2, (o = p.size)),
        "src" in p && n(3, (i = p.src)),
        "alt" in p && n(4, (m = p.alt)),
        "class" in p && n(5, (d = p.class)),
        "element" in p && n(0, (c = p.element)),
        "containerElement" in p && n(1, (a = p.containerElement)),
        "$$scope" in p && n(9, (u = p.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 8 && i && n(6, (h = !1));
    }),
    [c, a, o, i, m, d, h, s, f, u, r, g, k, _, b]
  );
}
class ot extends D {
  constructor(e) {
    super(),
      F(this, e, it, rt, C, {
        size: 2,
        src: 3,
        alt: 4,
        class: 5,
        element: 0,
        containerElement: 1,
      });
  }
}
function he(t) {
  let e, n, l, s, r, u, f;
  const o = t[7].default,
    i = te(o, t, t[6], null);
  let m = [
      { role: (n = t[1] && !t[2] ? "button" : void 0) },
      { href: (l = t[1] && !t[2] ? t[1] : void 0) },
      { class: (s = "icon-button " + t[3]) },
      t[5],
    ],
    d = {};
  for (let c = 0; c < m.length; c += 1) d = A(d, m[c]);
  return {
    c() {
      (e = j(t[1] && !t[2] ? "a" : "button")),
        i && i.c(),
        /-/.test(t[1] && !t[2] ? "a" : "button") ? X(e, d) : M(e, d),
        T(e, "disabled", t[2]),
        T(e, "svelte-1iys5lx", !0);
    },
    m(c, a) {
      $(c, e, a),
        i && i.m(e, null),
        t[8](e),
        (r = !0),
        u || ((f = ye(t[4].call(null, e))), (u = !0));
    },
    p(c, a) {
      i &&
        i.p &&
        (!r || a & 64) &&
        le(i, o, c, c[6], r ? ne(o, c[6], a, null) : se(c[6]), null),
        (d = re(m, [
          (!r || (a & 6 && n !== (n = c[1] && !c[2] ? "button" : void 0))) && {
            role: n,
          },
          (!r || (a & 6 && l !== (l = c[1] && !c[2] ? c[1] : void 0))) && {
            href: l,
          },
          (!r || (a & 8 && s !== (s = "icon-button " + c[3]))) && { class: s },
          a & 32 && c[5],
        ])),
        /-/.test(c[1] && !c[2] ? "a" : "button") ? X(e, d) : M(e, d),
        T(e, "disabled", c[2]),
        T(e, "svelte-1iys5lx", !0);
    },
    i(c) {
      r || (v(i, c), (r = !0));
    },
    o(c) {
      y(i, c), (r = !1);
    },
    d(c) {
      c && w(e), i && i.d(c), t[8](null), (u = !1), f();
    },
  };
}
function ut(t) {
  let e = t[1] && !t[2] ? "a" : "button",
    n,
    l,
    s = (t[1] && !t[2] ? "a" : "button") && he(t);
  return {
    c() {
      s && s.c(), (n = ke());
    },
    m(r, u) {
      s && s.m(r, u), $(r, n, u), (l = !0);
    },
    p(r, [u]) {
      r[1] && r[2],
        e
          ? C(e, r[1] && !r[2] ? "a" : "button")
            ? (s.d(1), (s = he(r)), s.c(), s.m(n.parentNode, n))
            : s.p(r, u)
          : ((s = he(r)), s.c(), s.m(n.parentNode, n)),
        (e = r[1] && !r[2] ? "a" : "button");
    },
    i(r) {
      l || (v(s), (l = !0));
    },
    o(r) {
      y(s), (l = !1);
    },
    d(r) {
      r && w(n), s && s.d(r);
    },
  };
}
function ft(t, e, n) {
  const l = ["href", "disabled", "class", "element"];
  let s = R(e, l),
    { $$slots: r = {}, $$scope: u } = e,
    { href: f = "" } = e,
    { disabled: o = !1 } = e,
    { class: i = "" } = e,
    { element: m = null } = e;
  const d = Ve(Fe());
  function c(a) {
    V[a ? "unshift" : "push"](() => {
      (m = a), n(0, m);
    });
  }
  return (
    (t.$$set = (a) => {
      (e = A(A({}, e), _e(a))),
        n(5, (s = R(e, l))),
        "href" in a && n(1, (f = a.href)),
        "disabled" in a && n(2, (o = a.disabled)),
        "class" in a && n(3, (i = a.class)),
        "element" in a && n(0, (m = a.element)),
        "$$scope" in a && n(6, (u = a.$$scope));
    }),
    [m, f, o, i, d, s, u, r, c]
  );
}
class H extends D {
  constructor(e) {
    super(),
      F(this, e, ft, ut, C, { href: 1, disabled: 2, class: 3, element: 0 });
  }
}
function at(t) {
  let e;
  return {
    c() {
      e = O("Rocksdanister");
    },
    m(n, l) {
      $(n, e, l);
    },
    d(n) {
      n && w(e);
    },
  };
}
function ct(t) {
  let e, n;
  return {
    c() {
      (e = j("i")),
        (n = O("\xA0awoo.git@gmail.com")),
        S(e, "class", "icon fa fa-envelope svelte-1n1wvs0");
    },
    m(l, s) {
      $(l, e, s), $(l, n, s);
    },
    p: z,
    d(l) {
      l && w(e), l && w(n);
    },
  };
}
function _t(t) {
  let e;
  return {
    c() {
      (e = j("i")), S(e, "class", "icon brands fa-github svelte-1n1wvs0");
    },
    m(n, l) {
      $(n, e, l);
    },
    p: z,
    d(n) {
      n && w(e);
    },
  };
}
function mt(t) {
  let e;
  return {
    c() {
      (e = j("i")), S(e, "class", "icon brands fa-linkedin svelte-1n1wvs0");
    },
    m(n, l) {
      $(n, e, l);
    },
    p: z,
    d(n) {
      n && w(e);
    },
  };
}
function dt(t) {
  let e;
  return {
    c() {
      (e = j("i")), S(e, "class", "icon brands fa-twitter svelte-1n1wvs0");
    },
    m(n, l) {
      $(n, e, l);
    },
    p: z,
    d(n) {
      n && w(e);
    },
  };
}
function gt(t) {
  let e;
  return {
    c() {
      (e = j("i")), S(e, "class", "icon brands fa-reddit svelte-1n1wvs0");
    },
    m(n, l) {
      $(n, e, l);
    },
    p: z,
    d(n) {
      n && w(e);
    },
  };
}
function ht(t) {
  let e;
  return {
    c() {
      (e = j("i")), S(e, "class", "icon brands fa-youtube svelte-1n1wvs0");
    },
    m(n, l) {
      $(n, e, l);
    },
    p: z,
    d(n) {
      n && w(e);
    },
  };
}
function bt(t) {
  let e, n, l, s, r, u, f, o, i, m, d, c, a, h, g, k;
  return (
    (n = new G({
      props: {
        variant: "titleLarge",
        class: "font",
        $$slots: { default: [at] },
        $$scope: { ctx: t },
      },
    })),
    (s = new H({
      props: {
        title: "Email",
        href: "mailto:awoo.git@gmail.com",
        target: "_blank",
        $$slots: { default: [ct] },
        $$scope: { ctx: t },
      },
    })),
    (f = new H({
      props: {
        title: "GitHub",
        href: "https://github.com/rocksdanister",
        target: "_blank",
        $$slots: { default: [_t] },
        $$scope: { ctx: t },
      },
    })),
    (i = new H({
      props: {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/dani-john-490a44200/",
        target: "_blank",
        $$slots: { default: [mt] },
        $$scope: { ctx: t },
      },
    })),
    (d = new H({
      props: {
        title: "Twitter",
        href: "https://twitter.com/rocksdanister",
        target: "_blank",
        $$slots: { default: [dt] },
        $$scope: { ctx: t },
      },
    })),
    (a = new H({
      props: {
        title: "Reddit",
        href: "https://reddit.com/u/rocksdanister",
        target: "_blank",
        $$slots: { default: [gt] },
        $$scope: { ctx: t },
      },
    })),
    (g = new H({
      props: {
        title: "YouTube",
        href: "https://www.youtube.com/@rocksdanister",
        target: "_blank",
        $$slots: { default: [ht] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = j("main")),
          N(n.$$.fragment),
          (l = P()),
          N(s.$$.fragment),
          (r = P()),
          (u = j("div")),
          N(f.$$.fragment),
          (o = P()),
          N(i.$$.fragment),
          (m = P()),
          N(d.$$.fragment),
          (c = P()),
          N(a.$$.fragment),
          (h = P()),
          N(g.$$.fragment),
          S(e, "class", "svelte-1n1wvs0");
      },
      m(_, b) {
        $(_, e, b),
          B(n, e, null),
          E(e, l),
          B(s, e, null),
          E(e, r),
          E(e, u),
          B(f, u, null),
          E(u, o),
          B(i, u, null),
          E(u, m),
          B(d, u, null),
          E(u, c),
          B(a, u, null),
          E(u, h),
          B(g, u, null),
          (k = !0);
      },
      p(_, [b]) {
        const p = {};
        b & 1 && (p.$$scope = { dirty: b, ctx: _ }), n.$set(p);
        const W = {};
        b & 1 && (W.$$scope = { dirty: b, ctx: _ }), s.$set(W);
        const J = {};
        b & 1 && (J.$$scope = { dirty: b, ctx: _ }), f.$set(J);
        const we = {};
        b & 1 && (we.$$scope = { dirty: b, ctx: _ }), i.$set(we);
        const $e = {};
        b & 1 && ($e.$$scope = { dirty: b, ctx: _ }), d.$set($e);
        const Ee = {};
        b & 1 && (Ee.$$scope = { dirty: b, ctx: _ }), a.$set(Ee);
        const Se = {};
        b & 1 && (Se.$$scope = { dirty: b, ctx: _ }), g.$set(Se);
      },
      i(_) {
        k ||
          (v(n.$$.fragment, _),
          v(s.$$.fragment, _),
          v(f.$$.fragment, _),
          v(i.$$.fragment, _),
          v(d.$$.fragment, _),
          v(a.$$.fragment, _),
          v(g.$$.fragment, _),
          (k = !0));
      },
      o(_) {
        y(n.$$.fragment, _),
          y(s.$$.fragment, _),
          y(f.$$.fragment, _),
          y(i.$$.fragment, _),
          y(d.$$.fragment, _),
          y(a.$$.fragment, _),
          y(g.$$.fragment, _),
          (k = !1);
      },
      d(_) {
        _ && w(e), L(n), L(s), L(f), L(i), L(d), L(a), L(g);
      },
    }
  );
}
class vt extends D {
  constructor(e) {
    super(), F(this, e, null, bt, C, {});
  }
}
function pt(t) {
  let e, n, l, s, r, u, f;
  return (
    (s = new ot({
      props: {
        src: "https://avatars.githubusercontent.com/rocksdanister",
        alt: "rocksdanister profile picture",
        size: 120,
        class: "profilePic",
      },
    })),
    (u = new vt({})),
    {
      c() {
        (e = j("main")),
          (n = j("div")),
          (l = j("div")),
          N(s.$$.fragment),
          (r = P()),
          N(u.$$.fragment),
          S(l, "class", "flex alignCenter svelte-181yzvm"),
          S(n, "class", "flex svelte-181yzvm"),
          S(e, "class", "svelte-181yzvm");
      },
      m(o, i) {
        $(o, e, i),
          E(e, n),
          E(n, l),
          B(s, l, null),
          E(l, r),
          B(u, l, null),
          (f = !0);
      },
      p: z,
      i(o) {
        f || (v(s.$$.fragment, o), v(u.$$.fragment, o), (f = !0));
      },
      o(o) {
        y(s.$$.fragment, o), y(u.$$.fragment, o), (f = !1);
      },
      d(o) {
        o && w(e), L(s), L(u);
      },
    }
  );
}
class yt extends D {
  constructor(e) {
    super(), F(this, e, null, pt, C, {});
  }
}
function kt(t) {
  let e;
  return {
    c() {
      e = O(t[2]);
    },
    m(n, l) {
      $(n, e, l);
    },
    p(n, l) {
      l & 4 && K(e, n[2]);
    },
    d(n) {
      n && w(e);
    },
  };
}
function Te(t) {
  let e, n;
  return {
    c() {
      (e = j("img")),
        x(e.src, (n = "./assets/thinking_fluent.svg")) || S(e, "src", n),
        S(e, "class", "background svelte-1x3e3xx"),
        I(e, "width", "75px"),
        I(e, "height", "75px"),
        I(e, "position", "inherit"),
        S(e, "alt", "Thinking Emoji");
    },
    m(l, s) {
      $(l, e, s);
    },
    d(l) {
      l && w(e);
    },
  };
}
function wt(t) {
  let e;
  return {
    c() {
      e = O(t[5]);
    },
    m(n, l) {
      $(n, e, l);
    },
    p(n, l) {
      l & 32 && K(e, n[5]);
    },
    d(n) {
      n && w(e);
    },
  };
}
function ze(t) {
  let e, n;
  return (
    (e = new We({
      props: {
        variant: "hyperlink",
        href: t[3],
        target: "_blank",
        $$slots: { default: [$t] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        N(e.$$.fragment);
      },
      m(l, s) {
        B(e, l, s), (n = !0);
      },
      p(l, s) {
        const r = {};
        s & 8 && (r.href = l[3]),
          s & 80 && (r.$$scope = { dirty: s, ctx: l }),
          e.$set(r);
      },
      i(l) {
        n || (v(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        y(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        L(e, l);
      },
    }
  );
}
function $t(t) {
  let e;
  return {
    c() {
      e = O(t[4]);
    },
    m(n, l) {
      $(n, e, l);
    },
    p(n, l) {
      l & 16 && K(e, n[4]);
    },
    d(n) {
      n && w(e);
    },
  };
}
function Et(t) {
  let e, n, l, s, r, u, f, o, i, m, d, c;
  s = new G({
    props: {
      class: "textBlock",
      variant: "titleLarge",
      $$slots: { default: [kt] },
      $$scope: { ctx: t },
    },
  });
  let a = t[1] == "redacted" && Te();
  o = new G({
    props: {
      variant: "bodyLarge",
      $$slots: { default: [wt] },
      $$scope: { ctx: t },
    },
  });
  let h = t[3] !== "" && t[4] !== "" && ze(t);
  return {
    c() {
      (e = j("mainShow")),
        (n = j("div")),
        (l = P()),
        N(s.$$.fragment),
        (r = P()),
        a && a.c(),
        (u = P()),
        (f = j("div")),
        N(o.$$.fragment),
        (i = P()),
        (m = j("br")),
        (d = P()),
        h && h.c(),
        S(n, "class", "background svelte-1x3e3xx"),
        I(n, "background-image", "url(" + t[0] + ")"),
        S(f, "class", "slot svelte-1x3e3xx"),
        S(e, "class", "svelte-1x3e3xx");
    },
    m(g, k) {
      $(g, e, k),
        E(e, n),
        E(e, l),
        B(s, e, null),
        E(e, r),
        a && a.m(e, null),
        E(e, u),
        E(e, f),
        B(o, f, null),
        E(f, i),
        E(f, m),
        E(f, d),
        h && h.m(f, null),
        (c = !0);
    },
    p(g, [k]) {
      (!c || k & 1) && I(n, "background-image", "url(" + g[0] + ")");
      const _ = {};
      k & 68 && (_.$$scope = { dirty: k, ctx: g }),
        s.$set(_),
        g[1] == "redacted"
          ? a || ((a = Te()), a.c(), a.m(e, u))
          : a && (a.d(1), (a = null));
      const b = {};
      k & 96 && (b.$$scope = { dirty: k, ctx: g }),
        o.$set(b),
        g[3] !== "" && g[4] !== ""
          ? h
            ? (h.p(g, k), k & 24 && v(h, 1))
            : ((h = ze(g)), h.c(), v(h, 1), h.m(f, null))
          : h &&
            (ae(),
            y(h, 1, 1, () => {
              h = null;
            }),
            ce());
    },
    i(g) {
      c || (v(s.$$.fragment, g), v(o.$$.fragment, g), v(h), (c = !0));
    },
    o(g) {
      y(s.$$.fragment, g), y(o.$$.fragment, g), y(h), (c = !1);
    },
    d(g) {
      g && w(e), L(s), a && a.d(), L(o), h && h.d();
    },
  };
}
function St(t, e, n) {
  let { background: l } = e,
    { type: s } = e,
    { title: r } = e,
    { url: u = "" } = e,
    { urlText: f = "" } = e,
    { summary: o } = e;
  return (
    (t.$$set = (i) => {
      "background" in i && n(0, (l = i.background)),
        "type" in i && n(1, (s = i.type)),
        "title" in i && n(2, (r = i.title)),
        "url" in i && n(3, (u = i.url)),
        "urlText" in i && n(4, (f = i.urlText)),
        "summary" in i && n(5, (o = i.summary));
    }),
    [l, s, r, u, f, o]
  );
}
class Ae extends D {
  constructor(e) {
    super(),
      F(this, e, St, Et, C, {
        background: 0,
        type: 1,
        title: 2,
        url: 3,
        urlText: 4,
        summary: 5,
      });
  }
}
function jt(t) {
  let e;
  return {
    c() {
      (e = j("i")), S(e, "class", "icon brands fa-osi");
    },
    m(n, l) {
      $(n, e, l);
    },
    p: z,
    d(n) {
      n && w(e);
    },
  };
}
function Bt(t) {
  let e, n, l;
  return (
    (n = new H({
      props: {
        title: "Attribution",
        href: "https://github.com/rocksdanister/rocksdanister.github.io",
        target: "_blank",
        $$slots: { default: [jt] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = j("main")), N(n.$$.fragment), S(e, "class", "svelte-1yxvf7m");
      },
      m(s, r) {
        $(s, e, r), B(n, e, null), (l = !0);
      },
      p(s, [r]) {
        const u = {};
        r & 1 && (u.$$scope = { dirty: r, ctx: s }), n.$set(u);
      },
      i(s) {
        l || (v(n.$$.fragment, s), (l = !0));
      },
      o(s) {
        y(n.$$.fragment, s), (l = !1);
      },
      d(s) {
        s && w(e), L(n);
      },
    }
  );
}
class Lt extends D {
  constructor(e) {
    super(), F(this, e, null, Bt, C, {});
  }
}
function Pt(t) {
  let e;
  return {
    c() {
      e = O(t[3]);
    },
    m(n, l) {
      $(n, e, l);
    },
    p(n, l) {
      l & 8 && K(e, n[3]);
    },
    d(n) {
      n && w(e);
    },
  };
}
function Ce(t) {
  let e, n;
  return {
    c() {
      (e = j("img")),
        x(e.src, (n = "./assets/thinking_fluent.svg")) || S(e, "src", n),
        S(e, "class", "background svelte-2jj57i"),
        I(e, "width", "75px"),
        I(e, "height", "75px"),
        I(e, "position", "inherit"),
        S(e, "alt", "Thinking Emoji");
    },
    m(l, s) {
      $(l, e, s);
    },
    d(l) {
      l && w(e);
    },
  };
}
function Nt(t) {
  let e;
  return {
    c() {
      e = O(t[6]);
    },
    m(n, l) {
      $(n, e, l);
    },
    p(n, l) {
      l & 64 && K(e, n[6]);
    },
    d(n) {
      n && w(e);
    },
  };
}
function Oe(t) {
  let e, n;
  return (
    (e = new We({
      props: {
        variant: "hyperlink",
        href: t[4],
        target: "_blank",
        $$slots: { default: [Tt] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        N(e.$$.fragment);
      },
      m(l, s) {
        B(e, l, s), (n = !0);
      },
      p(l, s) {
        const r = {};
        s & 16 && (r.href = l[4]),
          s & 4128 && (r.$$scope = { dirty: s, ctx: l }),
          e.$set(r);
      },
      i(l) {
        n || (v(e.$$.fragment, l), (n = !0));
      },
      o(l) {
        y(e.$$.fragment, l), (n = !1);
      },
      d(l) {
        L(e, l);
      },
    }
  );
}
function Tt(t) {
  let e;
  return {
    c() {
      e = O(t[5]);
    },
    m(n, l) {
      $(n, e, l);
    },
    p(n, l) {
      l & 32 && K(e, n[5]);
    },
    d(n) {
      n && w(e);
    },
  };
}
function zt(t) {
  let e, n, l, s, r, u, f, o, i, m, d, c, a, h, g;
  r = new G({
    props: {
      class: "textBlock",
      variant: "titleLarge",
      $$slots: { default: [Pt] },
      $$scope: { ctx: t },
    },
  });
  let k = t[2] == "redacted" && Ce();
  i = new G({
    props: {
      variant: "bodyLarge",
      $$slots: { default: [Nt] },
      $$scope: { ctx: t },
    },
  });
  let _ = t[4] !== "" && t[5] !== "" && Oe(t);
  return {
    c() {
      (e = j("mainShow")),
        (n = j("video")),
        (s = P()),
        N(r.$$.fragment),
        (u = P()),
        k && k.c(),
        (f = P()),
        (o = j("div")),
        N(i.$$.fragment),
        (m = P()),
        (d = j("br")),
        (c = P()),
        _ && _.c(),
        S(n, "class", "background svelte-2jj57i"),
        x(n.src, (l = t[0])) || S(n, "src", l),
        S(n, "poster", t[1]),
        (n.muted = !0),
        (n.autoplay = !0),
        S(o, "class", "slot svelte-2jj57i"),
        S(e, "class", "svelte-2jj57i");
    },
    m(b, p) {
      $(b, e, p),
        E(e, n),
        t[11](n),
        E(e, s),
        B(r, e, null),
        E(e, u),
        k && k.m(e, null),
        E(e, f),
        E(e, o),
        B(i, o, null),
        E(o, m),
        E(o, d),
        E(o, c),
        _ && _.m(o, null),
        (a = !0),
        h ||
          ((g = [
            ye(t[10].call(null, n)),
            q(e, "mouseover", t[8]),
            q(e, "focus", t[8]),
            q(e, "mouseout", t[9]),
            q(e, "blur", t[9]),
          ]),
          (h = !0));
    },
    p(b, [p]) {
      (!a || (p & 1 && !x(n.src, (l = b[0])))) && S(n, "src", l),
        (!a || p & 2) && S(n, "poster", b[1]);
      const W = {};
      p & 4104 && (W.$$scope = { dirty: p, ctx: b }),
        r.$set(W),
        b[2] == "redacted"
          ? k || ((k = Ce()), k.c(), k.m(e, f))
          : k && (k.d(1), (k = null));
      const J = {};
      p & 4160 && (J.$$scope = { dirty: p, ctx: b }),
        i.$set(J),
        b[4] !== "" && b[5] !== ""
          ? _
            ? (_.p(b, p), p & 48 && v(_, 1))
            : ((_ = Oe(b)), _.c(), v(_, 1), _.m(o, null))
          : _ &&
            (ae(),
            y(_, 1, 1, () => {
              _ = null;
            }),
            ce());
    },
    i(b) {
      a || (v(r.$$.fragment, b), v(i.$$.fragment, b), v(_), (a = !0));
    },
    o(b) {
      y(r.$$.fragment, b), y(i.$$.fragment, b), y(_), (a = !1);
    },
    d(b) {
      b && w(e),
        t[11](null),
        L(r),
        k && k.d(),
        L(i),
        _ && _.d(),
        (h = !1),
        Y(g);
    },
  };
}
function At(t, e, n) {
  let { background: l } = e,
    { poster: s } = e,
    { type: r } = e,
    { title: u } = e,
    { url: f = "" } = e,
    { urlText: o = "" } = e,
    { summary: i } = e,
    m;
  function d() {
    m.play();
  }
  function c() {
    m.pause();
  }
  const a = (g) => {
    const k = g.play();
    k !== void 0 &&
      k
        .then(() => {
          g.pause();
        })
        .catch((_) => {
          console.error(_);
        });
  };
  function h(g) {
    V[g ? "unshift" : "push"](() => {
      (m = g), n(7, m);
    });
  }
  return (
    (t.$$set = (g) => {
      "background" in g && n(0, (l = g.background)),
        "poster" in g && n(1, (s = g.poster)),
        "type" in g && n(2, (r = g.type)),
        "title" in g && n(3, (u = g.title)),
        "url" in g && n(4, (f = g.url)),
        "urlText" in g && n(5, (o = g.urlText)),
        "summary" in g && n(6, (i = g.summary));
    }),
    [l, s, r, u, f, o, i, m, d, c, a, h]
  );
}
class Ct extends D {
  constructor(e) {
    super(),
      F(this, e, At, zt, C, {
        background: 0,
        poster: 1,
        type: 2,
        title: 3,
        url: 4,
        urlText: 5,
        summary: 6,
      });
  }
}
function Ot(t) {
  let e;
  return {
    c() {
      e = O("Hi, I'm Dani");
    },
    m(n, l) {
      $(n, e, l);
    },
    d(n) {
      n && w(e);
    },
  };
}
function It(t) {
  let e;
  return {
    c() {
      e = O("I make fun software like");
    },
    m(n, l) {
      $(n, e, l);
    },
    d(n) {
      n && w(e);
    },
  };
}
function Mt(t) {
  let e, n, l, s, r, u, f, o, i, m, d, c, a, h, g, k;
  return (
    (n = new yt({})),
    (s = new G({
      props: {
        variant: "title",
        style: "margin:2rem 0 0",
        $$slots: { default: [Ot] },
        $$scope: { ctx: t },
      },
    })),
    (u = new G({
      props: {
        variant: "subtitle",
        style: "margin: 0 0 .5rem",
        $$slots: { default: [It] },
        $$scope: { ctx: t },
      },
    })),
    (i = new Ae({
      props: {
        background: "./assets/lively_promo.webp",
        type: "Lively",
        title: "Lively Wallpaper",
        url: "https://livelywallpaper.net/",
        urlText: "Find Out More!",
        summary: "Animated desktop wallpapers, bring your desktop to life!",
      },
    })),
    (d = new Ct({
      props: {
        background: "./assets/weather_promo.mp4",
        poster: "./assets/drizzle_promo.webp",
        type: "Weather",
        title: "Lively Weather",
        url: "https://www.rocksdanister.com/weather/",
        urlText: "Find Out More!",
        summary: "Real weather, real time. Powered by DirectX.",
      },
    })),
    (a = new Ae({
      props: {
        background: "./assets/shimmer_promo.webp",
        type: "redacted",
        title: "Shimmer?",
        summary: "Coming Soon \u{1F609}",
      },
    })),
    (g = new Lt({})),
    {
      c() {
        (e = j("main")),
          N(n.$$.fragment),
          (l = P()),
          N(s.$$.fragment),
          (r = P()),
          N(u.$$.fragment),
          (f = P()),
          (o = j("div")),
          N(i.$$.fragment),
          (m = P()),
          N(d.$$.fragment),
          (c = P()),
          N(a.$$.fragment),
          (h = P()),
          N(g.$$.fragment),
          S(o, "class", "card svelte-wk91o4"),
          S(e, "class", "svelte-wk91o4");
      },
      m(_, b) {
        $(_, e, b),
          B(n, e, null),
          E(e, l),
          B(s, e, null),
          E(e, r),
          B(u, e, null),
          E(e, f),
          E(e, o),
          B(i, o, null),
          E(o, m),
          B(d, o, null),
          E(o, c),
          B(a, o, null),
          E(o, h),
          B(g, o, null),
          (k = !0);
      },
      p(_, [b]) {
        const p = {};
        b & 1 && (p.$$scope = { dirty: b, ctx: _ }), s.$set(p);
        const W = {};
        b & 1 && (W.$$scope = { dirty: b, ctx: _ }), u.$set(W);
      },
      i(_) {
        k ||
          (v(n.$$.fragment, _),
          v(s.$$.fragment, _),
          v(u.$$.fragment, _),
          v(i.$$.fragment, _),
          v(d.$$.fragment, _),
          v(a.$$.fragment, _),
          v(g.$$.fragment, _),
          (k = !0));
      },
      o(_) {
        y(n.$$.fragment, _),
          y(s.$$.fragment, _),
          y(u.$$.fragment, _),
          y(i.$$.fragment, _),
          y(d.$$.fragment, _),
          y(a.$$.fragment, _),
          y(g.$$.fragment, _),
          (k = !1);
      },
      d(_) {
        _ && w(e), L(n), L(s), L(u), L(i), L(d), L(a), L(g);
      },
    }
  );
}
class Ft extends D {
  constructor(e) {
    super(), F(this, e, null, Mt, C, {});
  }
}
new Ft({ target: document.getElementById("app") });
