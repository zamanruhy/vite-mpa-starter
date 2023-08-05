import { c as createSignal, a as createEffect, o as onCleanup, s as splitProps, b as createMemo, d as onMount, e as spread, f as createRenderEffect, t as template, g as classList, i as insert, h as createComponent, m as mergeProps, j as createContext, u as useContext, k as memo, l as style, n as setAttribute, p as delegateEvents, D as Dynamic, I as IMask, S as Show, q as addEventListener } from "./vendor.js";
const MEDIA = /* @__PURE__ */ new Map();
function getMediaMatcher(query) {
  const media = MEDIA.get(query);
  if (media)
    return media;
  const newMedia = window.matchMedia(query);
  MEDIA.set(query, newMedia);
  return newMedia;
}
function useMediaQuery(query) {
  if (typeof window === "undefined") {
    return () => false;
  }
  const media = getMediaMatcher(query);
  const [state, setState] = createSignal(media.matches);
  createEffect(() => {
    const callback = () => {
      setState(media.matches);
    };
    media.addEventListener("change", callback, false);
    onCleanup(() => {
      media.removeEventListener("change", callback, false);
    });
  });
  return state;
}
const _tmpl$$g = /* @__PURE__ */ template(`<label class="relative isolate flex w-fit cursor-pointer select-none items-center"><input class="sr-only" type="checkbox"><span class="relative h-5 w-12 shrink-0 rounded-full bg-slate-300 transition" aria-hidden="true"><span class="absolute top-1/2 left-1/2 -z-10 h-full min-h-9 w-full min-w-9 -translate-y-1/2 -translate-x-1/2 rounded-[inherit]"></span><span class="absolute -top-1.5 -left-0.5 flex h-8 w-8 items-center justify-center
        rounded-[inherit] bg-slate-800 shadow transition dark:translate-x-5
        dark:bg-blue-800 [input:focus-visible+*>&amp;]:ring-[6px] [input:focus-visible+*>&amp;]:ring-slate-500/40
        dark:[input:focus-visible+*>&amp;]:ring-slate-100/40"><svg class="hidden h-5 w-5 fill-white dark:inline" viewBox="0 0 20 20"><path d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"></path></svg><svg class="h-5 w-5 fill-white dark:hidden" viewBox="0 0 20 20"><path d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"></path></svg></span></span><span class="sr-only">Enable <span class="dark:hidden">dark</span><span class="hidden dark:inline">light</span> theme</span></label>`);
function ThemeSwitcher(props) {
  const [, rest] = splitProps(props, ["class", "classList"]);
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [forcedTheme, setForcedTheme] = createSignal(null);
  const theme = createMemo(() => forcedTheme() || (prefersDark() ? "dark" : "light"));
  let colorSchemeEl, themeColorEl;
  onMount(() => {
    colorSchemeEl = document.head.querySelector('meta[name="color-scheme"]');
    themeColorEl = document.head.querySelector('meta[name="theme-color"]');
    setForcedTheme(window.localStorage.getItem("theme"));
  });
  createEffect(() => {
    forcedTheme() ? window.localStorage.setItem("theme", forcedTheme()) : window.localStorage.removeItem("theme");
  });
  createEffect(() => {
    document.documentElement.classList.toggle("dark", theme() === "dark");
    colorSchemeEl && (colorSchemeEl.content = theme());
    themeColorEl && (themeColorEl.content = theme() === "dark" ? "#333333" : "#bbbbbb");
  });
  function onChange(e) {
    const {
      checked
    } = e.target;
    if (checked !== prefersDark()) {
      setForcedTheme(checked ? "dark" : "light");
    } else {
      setForcedTheme(null);
    }
  }
  return (() => {
    const _el$ = _tmpl$$g.cloneNode(true), _el$2 = _el$.firstChild;
    _el$2.addEventListener("change", onChange);
    spread(_el$2, rest, false, false);
    createRenderEffect((_$p) => classList(_el$, {
      [props.class]: Boolean(props.class),
      ...props.classList,
      "pointer-events-none opacity-60": props.disabled
    }, _$p));
    createRenderEffect(() => _el$2.checked = theme() === "dark");
    return _el$;
  })();
}
const _tmpl$$f = /* @__PURE__ */ template(`<div role="radiogroup"></div>`);
const RadioGroupContext = createContext({});
function RadioGroup(props) {
  const [, rest] = splitProps(props, ["name", "value", "onChange"]);
  const [localValue, setLocalValue] = createSignal(props.value);
  createEffect(() => setLocalValue(props.value));
  return (() => {
    const _el$ = _tmpl$$f.cloneNode(true);
    spread(_el$, rest, false, true);
    insert(_el$, createComponent(RadioGroupContext.Provider, {
      get value1() {
        return mergeProps(props, {
          value: localValue()
        });
      },
      value: {
        get name() {
          return props.name;
        },
        get value() {
          return localValue();
        },
        onChange(e) {
          var _a;
          setLocalValue(e.target.value);
          (_a = props.onChange) == null ? void 0 : _a.call(props, e);
        }
      },
      get children() {
        return props.children;
      }
    }));
    return _el$;
  })();
}
const _tmpl$$e = /* @__PURE__ */ template(`<label class="relative isolate flex w-fit cursor-pointer select-none items-center"><input class="peer sr-only" type="radio"><span class="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 peer-focus-visible:ring peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2" aria-hidden="true"><span class="absolute top-1/2 left-1/2 -z-10 h-full min-h-9 w-full min-w-9 -translate-y-1/2 -translate-x-1/2 rounded-[inherit]"></span></span></label>`), _tmpl$2$7 = /* @__PURE__ */ template(`<span class="h-2 w-2 shrink-0 rounded-[inherit] bg-white"></span>`), _tmpl$3$4 = /* @__PURE__ */ template(`<span class="ml-2"></span>`);
function Checkbox$1(props) {
  const [, rest] = splitProps(props, ["class", "classList", "style", "label", "checked", "disabled", "value", "name", "onChange"]);
  const context = useContext(RadioGroupContext);
  const checked = createMemo(() => "value" in context ? props.value === context.value : props.checked);
  const [localChecked, setLocalChecked] = createSignal(checked());
  createEffect(() => setLocalChecked(checked()));
  return (() => {
    const _el$ = _tmpl$$e.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    _el$3.firstChild;
    _el$2.addEventListener("change", (e) => {
      var _a, _b, _c;
      setLocalChecked(e.target.checked);
      (_c = (_a = context.onChange) == null ? void 0 : _a.call(context, e)) != null ? _c : (_b = props.onChange) == null ? void 0 : _b.call(props, e);
    });
    spread(_el$2, rest, false, false);
    insert(_el$3, (() => {
      const _c$ = memo(() => !!localChecked(), true);
      return () => _c$() && _tmpl$2$7.cloneNode(true);
    })(), null);
    insert(_el$, (() => {
      const _c$2 = memo(() => !!props.label, true);
      return () => _c$2() && (() => {
        const _el$6 = _tmpl$3$4.cloneNode(true);
        insert(_el$6, () => props.label);
        createRenderEffect(() => _el$6.classList.toggle("opacity-60", !!props.disabled));
        return _el$6;
      })();
    })(), null);
    createRenderEffect((_p$) => {
      var _a;
      const _v$ = {
        [props.class]: Boolean(props.class),
        ...props.classList,
        "pointer-events-none": props.disabled
      }, _v$2 = props.style, _v$3 = props.disabled, _v$4 = (_a = context.name) != null ? _a : props.name, _v$5 = !!props.disabled, _v$6 = !!(localChecked() && props.disabled), _v$7 = !!(localChecked() && !props.disabled), _v$8 = !!localChecked();
      _p$._v$ = classList(_el$, _v$, _p$._v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && (_el$2.disabled = _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && setAttribute(_el$2, "name", _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && _el$3.classList.toggle("border-slate-200", _p$._v$5 = _v$5);
      _v$6 !== _p$._v$6 && _el$3.classList.toggle("bg-slate-200", _p$._v$6 = _v$6);
      _v$7 !== _p$._v$7 && _el$3.classList.toggle("bg-blue-500", _p$._v$7 = _v$7);
      _v$8 !== _p$._v$8 && _el$3.classList.toggle("border-0", _p$._v$8 = _v$8);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0,
      _v$7: void 0,
      _v$8: void 0
    });
    createRenderEffect(() => _el$2.checked = localChecked());
    createRenderEffect(() => _el$2.value = props.value);
    return _el$;
  })();
}
const _tmpl$$d = /* @__PURE__ */ template(`<label class="relative isolate flex w-fit cursor-pointer select-none items-center"><input class="peer sr-only" type="checkbox"><span class="relative h-5 w-10 shrink-0 rounded-full transition peer-focus-visible:ring peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2" aria-hidden="true"><span class="absolute top-1/2 left-1/2 -z-10 h-full min-h-9 w-full min-w-9 -translate-y-1/2 -translate-x-1/2 rounded-[inherit]"></span><span class="absolute top-0.5 left-0.5 h-4 w-4 rounded-[inherit] bg-white transition"></span></span></label>`), _tmpl$2$6 = /* @__PURE__ */ template(`<span class="ml-2"></span>`);
function Switch(props) {
  const [, rest] = splitProps(props, ["class", "classList", "style", "label", "checked", "disabled", "onChange"]);
  const [localChecked, setLocalChecked] = createSignal(props.checked);
  createEffect(() => setLocalChecked(props.checked));
  return (() => {
    const _el$ = _tmpl$$d.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling;
    _el$2.addEventListener("change", (e) => {
      var _a;
      setLocalChecked(e.target.checked);
      (_a = props.onChange) == null ? void 0 : _a.call(props, e);
    });
    spread(_el$2, rest, false, false);
    insert(_el$, (() => {
      const _c$ = memo(() => !!props.label, true);
      return () => _c$() && (() => {
        const _el$6 = _tmpl$2$6.cloneNode(true);
        insert(_el$6, () => props.label);
        return _el$6;
      })();
    })(), null);
    createRenderEffect((_p$) => {
      const _v$ = {
        [props.class]: Boolean(props.class),
        ...props.classList,
        "pointer-events-none cursor-default opacity-60": props.disabled
      }, _v$2 = props.style, _v$3 = props.disabled, _v$4 = !localChecked(), _v$5 = !!localChecked(), _v$6 = !!localChecked();
      _p$._v$ = classList(_el$, _v$, _p$._v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && (_el$2.disabled = _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && _el$3.classList.toggle("bg-slate-300", _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && _el$3.classList.toggle("bg-blue-500", _p$._v$5 = _v$5);
      _v$6 !== _p$._v$6 && _el$5.classList.toggle("translate-x-5", _p$._v$6 = _v$6);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0
    });
    createRenderEffect(() => _el$2.checked = localChecked());
    return _el$;
  })();
}
const _tmpl$$c = /* @__PURE__ */ template(`<label class="relative isolate flex w-fit cursor-pointer select-none items-center"><input class="peer sr-only" type="checkbox"><span class="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border border-slate-300 peer-focus-visible:ring peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2" aria-hidden="true"><span class="absolute top-1/2 left-1/2 -z-10 h-full min-h-9 w-full min-w-9 -translate-y-1/2 -translate-x-1/2 rounded-[inherit]"></span></span></label>`), _tmpl$2$5 = /* @__PURE__ */ template(`<svg viewBox="0 0 16 16" class="h-full w-full fill-white"><path d="M3 7h10v2H3z"></path></svg>`), _tmpl$3$3 = /* @__PURE__ */ template(`<svg viewBox="0 0 16 16" class="h-full w-full fill-white"><path d="M6 13 1 8l1.41-1.41L6 10.17l7.59-7.59L15 4Z"></path></svg>`), _tmpl$4$2 = /* @__PURE__ */ template(`<span class="ml-2"></span>`);
function Checkbox(props) {
  const [, rest] = splitProps(props, ["class", "classList", "style", "label", "checked", "onChange", "disabled", "indeterminate"]);
  const [localChecked, setLocalChecked] = createSignal(props.checked);
  createEffect(() => setLocalChecked(props.checked));
  return (() => {
    const _el$ = _tmpl$$c.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    _el$3.firstChild;
    _el$2.addEventListener("change", (e) => {
      var _a;
      setLocalChecked(e.target.checked);
      (_a = props.onChange) == null ? void 0 : _a.call(props, e);
    });
    spread(_el$2, rest, false, false);
    insert(_el$3, (() => {
      const _c$ = memo(() => !!props.indeterminate, true);
      return () => _c$() && _tmpl$2$5.cloneNode(true) || localChecked() && _tmpl$3$3.cloneNode(true);
    })(), null);
    insert(_el$, (() => {
      const _c$2 = memo(() => !!props.label, true);
      return () => _c$2() && (() => {
        const _el$7 = _tmpl$4$2.cloneNode(true);
        insert(_el$7, () => props.label);
        createRenderEffect(() => _el$7.classList.toggle("opacity-60", !!props.disabled));
        return _el$7;
      })();
    })(), null);
    createRenderEffect((_p$) => {
      const _v$ = {
        [props.class]: Boolean(props.class),
        ...props.classList,
        "pointer-events-none": props.disabled
      }, _v$2 = props.style, _v$3 = props.disabled, _v$4 = props.indeterminate, _v$5 = !!props.disabled, _v$6 = !!((localChecked() || props.indeterminate) && props.disabled), _v$7 = !!((localChecked() || props.indeterminate) && !props.disabled), _v$8 = !!(localChecked() || props.indeterminate);
      _p$._v$ = classList(_el$, _v$, _p$._v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && (_el$2.disabled = _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && (_el$2.indeterminate = _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && _el$3.classList.toggle("border-slate-200", _p$._v$5 = _v$5);
      _v$6 !== _p$._v$6 && _el$3.classList.toggle("bg-slate-200", _p$._v$6 = _v$6);
      _v$7 !== _p$._v$7 && _el$3.classList.toggle("bg-blue-500", _p$._v$7 = _v$7);
      _v$8 !== _p$._v$8 && _el$3.classList.toggle("border-0", _p$._v$8 = _v$8);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0,
      _v$7: void 0,
      _v$8: void 0
    });
    createRenderEffect(() => _el$2.checked = localChecked());
    return _el$;
  })();
}
const _tmpl$$b = /* @__PURE__ */ template(`<button class="pointer-events-none fixed right-5 bottom-5 z-fixed flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white opacity-0 shadow transition duration-200 hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 active:bg-blue-600 md:right-10 md:bottom-10" type="button" aria-label="Scroll to top"></button>`), _tmpl$2$4 = /* @__PURE__ */ template(`<svg class="h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path></svg>`);
function ToTop(props) {
  const [, rest] = splitProps(props, ["class", "offset", "children"]);
  const [scrollTop, setScrollTop] = createSignal(0);
  const active = createMemo(() => scrollTop() > (props.offset || 600));
  function scrollToTop() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 0) {
      requestAnimationFrame(scrollToTop);
      window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
    }
  }
  onMount(() => {
    function onScroll() {
      setScrollTop(window.pageYOffset);
    }
    window.addEventListener("scroll", onScroll);
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });
  return (() => {
    const _el$ = _tmpl$$b.cloneNode(true);
    _el$.$$click = scrollToTop;
    spread(_el$, rest, false, true);
    insert(_el$, () => props.children || _tmpl$2$4.cloneNode(true));
    createRenderEffect((_$p) => classList(_el$, {
      [props.class]: Boolean(props.class),
      "pointer-events-auto opacity-100": active()
    }, _$p));
    return _el$;
  })();
}
delegateEvents(["click"]);
const _tmpl$$a = /* @__PURE__ */ template(`<div class="relative" role="progressbar"><svg class="absolute top-0 left-0 h-full w-full animate-[spin_0.8s_linear_infinite]" fill="transparent"><circle class="opacity-20" cx="50%" cy="50%" stroke="currentColor"></circle><circle cx="50%" cy="50%" stroke="currentColor" pathLength="1" stroke-dasharray="0.4 0.6"></circle></svg></div>`);
function Spinner(props) {
  props = mergeProps({
    size: 40,
    thickness: 4
  }, props);
  const [, rest] = splitProps(props, ["size", "thickness", "class", "classList", "style"]);
  return (() => {
    const _el$ = _tmpl$$a.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
    spread(_el$, rest, false, true);
    createRenderEffect((_p$) => {
      const _v$ = {
        [props.class]: Boolean(props.class),
        ...props.classList
      }, _v$2 = {
        ...props.style,
        width: `${props.size}px`,
        height: `${props.size}px`
      }, _v$3 = `${(props.size - props.thickness) / 2}px`, _v$4 = `${props.thickness}px`, _v$5 = `${(props.size - props.thickness) / 2}px`, _v$6 = `${props.thickness}px`;
      _p$._v$ = classList(_el$, _v$, _p$._v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && setAttribute(_el$3, "r", _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && setAttribute(_el$3, "stroke-width", _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && setAttribute(_el$4, "r", _p$._v$5 = _v$5);
      _v$6 !== _p$._v$6 && setAttribute(_el$4, "stroke-width", _p$._v$6 = _v$6);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0
    });
    return _el$;
  })();
}
const _tmpl$$9 = /* @__PURE__ */ template(`<span class="invisible contents"></span>`), _tmpl$2$3 = /* @__PURE__ */ template(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>`);
function Button(props) {
  props = mergeProps({
    as: "button"
  }, props);
  const [, rest] = splitProps(props, ["class", "classList", "as", "variant", "size", "disabled", "loading", "spinner", "children", "href"]);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return props.as;
    },
    "class": "relative inline-flex cursor-pointer items-center justify-center text-center align-middle transition focus:outline-none",
    get classList() {
      return {
        [props.class]: Boolean(props.class),
        ...props.classList,
        "bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 active:bg-blue-600": props.variant === "primary" && !props.disabled,
        "text-slate-500 bg-slate-300 pointer-events-none": props.disabled,
        "pointer-events-none": props.loading,
        "min-h-10 py-1 px-5 text-base rounded": props.size === "md"
      };
    },
    get href() {
      return props.disabled || props.loading ? null : props.href;
    },
    get disabled() {
      return props.disabled || props.loading;
    }
  }, rest, {
    get children() {
      return memo(() => !!props.loading, true)() ? [(() => {
        const _el$ = _tmpl$$9.cloneNode(true);
        insert(_el$, () => props.children);
        return _el$;
      })(), (() => {
        const _el$2 = _tmpl$2$3.cloneNode(true);
        insert(_el$2, () => props.spinner || createComponent(Spinner, {
          size: 22,
          thickness: 2
        }));
        return _el$2;
      })()] : props.children;
    }
  }));
}
const _tmpl$$8 = /* @__PURE__ */ template(`<button class="box-content flex h-[20px] w-[24px] flex-col justify-between rounded py-2.5 px-2 transition focus:outline-none focus-visible:ring focus-visible:ring-blue-500/50" type="button" aria-label="Toggle menu"><span class="h-[2px] w-[24px] bg-current transition"></span><span class="h-[2px] w-[24px] bg-current transition"></span><span class="h-[2px] w-[24px] bg-current transition"></span></button>`);
function Hamburger(props) {
  const [, rest] = splitProps(props, ["active", "class", "classList"]);
  return (() => {
    const _el$ = _tmpl$$8.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
    spread(_el$, rest, false, true);
    createRenderEffect((_p$) => {
      const _v$ = {
        [props.class]: Boolean(props.class),
        ...props.classList
      }, _v$2 = {
        "translate-y-[9px] rotate-45 scale-x-110": props.active
      }, _v$3 = !!props.active, _v$4 = {
        "-translate-y-[9px] -rotate-45 scale-x-110": props.active
      };
      _p$._v$ = classList(_el$, _v$, _p$._v$);
      _p$._v$2 = classList(_el$2, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && _el$3.classList.toggle("opacity-0", _p$._v$3 = _v$3);
      _p$._v$4 = classList(_el$4, _v$4, _p$._v$4);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    });
    return _el$;
  })();
}
const _tmpl$$7 = /* @__PURE__ */ template(`<input class="block min-h-10 w-full rounded border
        border-slate-300 bg-white px-4 py-1
        placeholder-slate-400 placeholder-opacity-100 transition
        focus:border-blue-500 focus:outline-none
        focus:ring-1 focus:ring-blue-500" type="text">`);
function Input(props) {
  const [, rest] = splitProps(props, ["class", "classList", "invalid"]);
  return (() => {
    const _el$ = _tmpl$$7.cloneNode(true);
    spread(_el$, rest, false, false);
    createRenderEffect((_$p) => classList(_el$, {
      [props.class]: Boolean(props.class),
      ...props.classList,
      "border-red-600": props.invalid
    }, _$p));
    return _el$;
  })();
}
const _tmpl$$6 = /* @__PURE__ */ template(`<div class="relative flex"><div class="absolute inset-y-0 right-0 flex w-[74px] items-center justify-center"><button class="h-7 rounded bg-slate-200 px-3 text-sm font-semibold text-gray-700" type="button"></button></div></div>`);
function PasswordInput(props) {
  const [show, setShow] = createSignal(false);
  return (() => {
    const _el$ = _tmpl$$6.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild;
    insert(_el$, createComponent(Input, mergeProps({
      "class": "pr-[74px]"
    }, props, {
      get type() {
        return show() ? "text" : "password";
      }
    })), _el$2);
    _el$3.$$click = () => setShow(!show());
    insert(_el$3, () => show() ? "Hide" : "Show");
    return _el$;
  })();
}
delegateEvents(["click"]);
function MaskedInput(props) {
  const [, rest] = splitProps(props, [...MASK_OPTIONS_KEYS, "value", "unmask", "onAccept", "onComplete", "onInput", "ref"]);
  let ref;
  let maskRef;
  const maskOptions = createMemo(() => {
    return MASK_OPTIONS_KEYS.reduce((acc, key) => key in props ? {
      ...acc,
      [key]: props[key]
    } : acc, {});
  });
  function getMaskValue() {
    if (props.unmask === "typed")
      return maskRef.typedValue;
    if (props.unmask)
      return maskRef.unmaskedValue;
    return maskRef.value;
  }
  function initMask() {
    maskRef = new IMask(ref, maskOptions()).on("accept", (e) => {
      var _a, _b;
      (_a = props.onAccept) == null ? void 0 : _a.call(props, getMaskValue(), maskRef, e);
      (_b = props.onInput) == null ? void 0 : _b.call(props, {
        target: {
          name: rest.name,
          value: getMaskValue()
        }
      });
    }).on("complete", (e) => {
      var _a;
      (_a = props.onComplete) == null ? void 0 : _a.call(props, getMaskValue(), maskRef, e);
    });
  }
  function destroyMask() {
    if (maskRef) {
      maskRef.destroy();
      maskRef = void 0;
    }
  }
  createEffect(() => {
    var _a;
    const value = (_a = props.value) != null ? _a : "";
    if (!maskRef)
      return ref.value = value;
    if (props.unmask === "typed")
      maskRef.typedValue = value;
    else if (props.unmask)
      maskRef.unmaskedValue = value;
    else
      maskRef.value = value;
  });
  createEffect(() => {
    if (maskOptions().mask) {
      if (maskRef) {
        maskRef.updateOptions(maskOptions());
      } else {
        initMask();
      }
    } else {
      destroyMask();
    }
  });
  onCleanup(destroyMask);
  return createComponent(Input, mergeProps({
    ref: (node) => {
      var _a;
      ref = node;
      (_a = props.ref) == null ? void 0 : _a.call(props, node);
    }
  }, rest));
}
const MASK_OPTIONS_KEYS = ["mask", "prepare", "commit", "overwrite", "eager", "placeholderChar", "lazy", "definitions", "blocks", "pattern", "format", "parse", "autofix", "radix", "thousandsSeparator", "mapToRadix", "scale", "signed", "normalizeZeros", "padFractionalZeros", "min", "max", "dispatch"];
delegateEvents(["click", "keydown"]);
const TransitionRootContext = createContext();
function useTransitionRootContext(componentName) {
  const context = useContext(TransitionRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Transition>`);
}
function addClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}
function TransitionChild(props) {
  const values = useTransitionRootContext("TransitionChild");
  const [visible, setVisible] = createSignal(values.show);
  const [ref, setRef] = createSignal();
  let initial = true;
  function transition(element, shouldEnter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    if (shouldEnter) {
      if (initial) {
        const enter2 = (_b = (_a = props.enter) == null ? void 0 : _a.split(" ")) != null ? _b : [];
        const enterFrom = (_d = (_c = props.enterFrom) == null ? void 0 : _c.split(" ")) != null ? _d : [];
        const enterTo = (_f = (_e = props.enterTo) == null ? void 0 : _e.split(" ")) != null ? _f : [];
        const entered = (_h = (_g = props.entered) == null ? void 0 : _g.split(" ")) != null ? _h : [];
        const endTransition = () => {
          var _a2;
          removeClassList(element, enter2);
          removeClassList(element, enterTo);
          addClassList(element, entered);
          (_a2 = props.afterEnter) == null ? void 0 : _a2.call(props);
        };
        (_i = props.beforeEnter) == null ? void 0 : _i.call(props);
        addClassList(element, enter2);
        addClassList(element, enterFrom);
        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          addClassList(element, enterTo);
          element.addEventListener("transitionend", endTransition, {
            once: true
          });
          element.addEventListener("animationend", endTransition, {
            once: true
          });
        });
      }
    } else {
      const leave = (_k = (_j = props.leave) == null ? void 0 : _j.split(" ")) != null ? _k : [];
      const leaveFrom = (_m = (_l = props.leaveFrom) == null ? void 0 : _l.split(" ")) != null ? _m : [];
      const leaveTo = (_o = (_n = props.leaveTo) == null ? void 0 : _n.split(" ")) != null ? _o : [];
      const entered = (_q = (_p = props.entered) == null ? void 0 : _p.split(" ")) != null ? _q : [];
      (_r = props.beforeLeave) == null ? void 0 : _r.call(props);
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        addClassList(element, leaveTo);
      });
      const endTransition = () => {
        var _a2;
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        (_a2 = props.afterLeave) == null ? void 0 : _a2.call(props);
      };
      element.addEventListener("transitionend", endTransition, {
        once: true
      });
      element.addEventListener("animationend", endTransition, {
        once: true
      });
    }
  }
  createEffect(() => {
    const shouldShow = values.show;
    if (shouldShow) {
      setVisible(true);
    }
    const internalRef = ref();
    if (internalRef instanceof HTMLElement) {
      transition(internalRef, shouldShow);
    } else {
      initial = true;
    }
  });
  return createComponent(Show, {
    get when() {
      var _a;
      return (_a = props.unmount) != null ? _a : true;
    },
    get fallback() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        }
      }, () => omitProps(props, ["as", "enter", "enterFrom", "enterTo", "leave", "leaveFrom", "leaveTo", "unmount", "afterEnter", "afterLeave", "appear", "beforeEnter", "beforeLeave", "entered", "ref"]), {
        ref(r$) {
          const _ref$2 = createRef(props, (e) => {
            setRef(() => e);
          });
          typeof _ref$2 === "function" && _ref$2(r$);
        },
        get children() {
          return props.children;
        }
      }));
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return visible();
        },
        get children() {
          return createComponent(Dynamic, mergeProps({
            get component() {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            }
          }, () => omitProps(props, ["as", "enter", "enterFrom", "enterTo", "leave", "leaveFrom", "leaveTo", "unmount", "afterEnter", "afterLeave", "appear", "beforeEnter", "beforeLeave", "entered", "ref"]), {
            ref(r$) {
              const _ref$ = createRef(props, (e) => {
                setRef(() => e);
              });
              typeof _ref$ === "function" && _ref$(r$);
            },
            get children() {
              return props.children;
            }
          }));
        }
      });
    }
  });
}
function Transition(props) {
  const excludedProps = omitProps(props, ["show"]);
  return createComponent(TransitionRootContext.Provider, {
    value: {
      get show() {
        return props.show;
      }
    },
    get children() {
      return createComponent(TransitionChild, excludedProps);
    }
  });
}
function isRefFunction(callback) {
  return typeof callback === "function";
}
function createRef(props, callback) {
  return (e) => {
    if ("ref" in props && isRefFunction(props.ref)) {
      props.ref(e);
    }
    callback(e);
  };
}
function omitProps(value, keys) {
  const newObject = {};
  const currentKeys = Object.keys(value);
  for (let i = 0, len = currentKeys.length; i < len; i += 1) {
    const key = currentKeys[i];
    if (!keys.includes(key)) {
      Object.defineProperty(newObject, key, {
        get() {
          return value[key];
        },
        configurable: true,
        enumerable: true
      });
    }
  }
  return newObject;
}
const modals = /* @__PURE__ */ new Set();
let top = 0;
function useModal() {
  return { registerModal, unregisterModal, trapFocus };
}
function registerModal(modal) {
  if (modals.has(modal))
    return;
  modals.add(modal);
  if (modals.size === 1) {
    enter();
  }
}
function unregisterModal(modal) {
  if (!modals.has(modal))
    return;
  modals.delete(modal);
  if (modals.size === 0) {
    exit();
  }
}
function enter() {
  document.documentElement.style.setProperty(
    "--scrollbar-visible-width",
    `${window.innerWidth - document.documentElement.clientWidth}px`
  );
  top = window.scrollY;
  Object.assign(document.body.style, {
    paddingRight: "var(--scrollbar-visible-width)",
    overflow: "hidden",
    position: "fixed",
    width: "100%",
    top: `${top * -1}px`
  });
}
function exit() {
  document.documentElement.style.removeProperty("--scrollbar-visible-width");
  Object.assign(document.body.style, {
    paddingRight: "",
    overflow: "",
    position: "",
    width: "",
    top: ""
  });
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  document.documentElement.style.scrollBehavior = "";
}
function getFocusable(node) {
  const selector = [
    "a[href]",
    "area[href]",
    'input:not([type="hidden"]):not([type="radio"]):not([disabled])',
    'input[type="radio"]:not([disabled]):checked',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "audio[controls]",
    "video[controls]",
    "[contenteditable]",
    "[tabindex]"
  ].map((s) => `${s}:not([tabindex^="-"])`).join(", ");
  return Array.from(node.querySelectorAll(selector)).filter(
    (el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length
  );
}
function trapFocus(e) {
  if (e.key !== "Tab")
    return;
  const focusable = getFocusable(e.currentTarget);
  if (focusable.length === 0) {
    e.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (e.shiftKey) {
    if (active === first || active === e.currentTarget) {
      last.focus();
      e.preventDefault();
    }
  } else {
    if (active === last) {
      first.focus();
      e.preventDefault();
    }
  }
}
const _tmpl$$5 = /* @__PURE__ */ template(`<div class="relative flex w-[710px] max-w-full flex-col rounded bg-white shadow-xl"><button class="absolute top-4 right-4 z-10 rounded p-3 transition hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/50" type="button" aria-label="Close"><svg class="h-4 w-4" viewBox="0 0 371.23 371.23" aria-hidden="true"><path d="M371.23 21.213L350.018 0 185.615 164.402 21.213 0 0
                      21.213l164.402 164.402L0 350.018l21.213 21.212
                      164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z"></path></svg></button><div class="grow overflow-y-auto overflow-x-hidden py-2 px-6"></div></div>`), _tmpl$2$2 = /* @__PURE__ */ template(`<span><div class="fixed inset-0 z-[2000] flex overflow-x-hidden p-2 outline-0 [scrollbar-gutter:both-edges_stable] sm:p-6" role="dialog" aria-modal="true" tabindex="-1"></div></span>`), _tmpl$3$2 = /* @__PURE__ */ template(`<div class="flex shrink-0 items-center justify-between rounded-tl-[inherit] rounded-tr-[inherit] py-4 px-6"></div>`), _tmpl$4$1 = /* @__PURE__ */ template(`<div class="flex shrink-0 items-center justify-end rounded-bl-[inherit] rounded-br-[inherit] py-4 px-6"></div>`);
function Dialog(props) {
  props = mergeProps({
    open: false,
    closeOnBackdrop: true,
    closeOnEscape: true,
    scrollable: false
  }, props);
  const [, rest] = splitProps(props, ["class", "classList", "open", "closeOnBackdrop", "closeOnEscape", "scrollable", "header", "children", "footer"]);
  const [mounted, setMounted] = createSignal(false);
  const open = createMemo(() => props.open && mounted());
  const {
    registerModal: registerModal2,
    unregisterModal: unregisterModal2,
    trapFocus: trapFocus2
  } = useModal();
  let el;
  let contentEl;
  let returnFocusEl = null;
  const dialog = {};
  async function onBeforeEnter() {
    var _a;
    (_a = props.onOpen) == null ? void 0 : _a.call(props);
    queueMicrotask(() => {
      returnFocusEl = returnFocusEl || document.activeElement;
      registerModal2(dialog);
    });
  }
  function onAfterEnter() {
    var _a;
    (_a = props.onOpened) == null ? void 0 : _a.call(props);
    setFocus();
  }
  function onBeforeLeave() {
    var _a;
    (_a = props.onClose) == null ? void 0 : _a.call(props);
  }
  async function onAfterLeave() {
    var _a, _b;
    (_a = props.onClosed) == null ? void 0 : _a.call(props);
    (_b = returnFocusEl.focus) == null ? void 0 : _b.call(returnFocusEl);
    returnFocusEl = null;
    unregisterModal2(dialog);
  }
  function onClickOut(e) {
    if (props.closeOnBackdrop && !contentEl.contains(e.target)) {
      props.onClose();
    }
  }
  function onEscape(e) {
    if (props.closeOnEscape && e.key === "Escape") {
      props.onClose();
    }
  }
  function setFocus() {
    if (!el.contains(document.activeElement)) {
      el.focus();
    }
  }
  onMount(() => {
    setMounted(true);
    onCleanup(() => {
      unregisterModal2(dialog);
    });
  });
  return createComponent(Transition, {
    get show() {
      return open();
    },
    get children() {
      return [createComponent(TransitionChild, {}), (() => {
        const _el$ = _tmpl$2$2.cloneNode(true), _el$2 = _el$.firstChild;
        _el$2.$$keydown = (e) => {
          onEscape(e);
          trapFocus2(e);
        };
        _el$2.$$click = onClickOut;
        const _ref$ = el;
        typeof _ref$ === "function" ? _ref$(_el$2) : el = _el$2;
        spread(_el$2, rest, false, true);
        insert(_el$2, createComponent(TransitionChild, {
          "class": "m-auto min-w-0",
          get classList() {
            return {
              "flex max-h-full": props.scrollable
            };
          },
          enter: "transition duration-200 ease-out",
          enterFrom: "scale-90 opacity-0",
          enterTo: "scale-100 opacity-100",
          leave: "transition duration-150 ease-in",
          leaveFrom: "scale-100 opacity-100",
          leaveTo: "scale-90 opacity-0",
          beforeEnter: onBeforeEnter,
          afterEnter: onAfterEnter,
          beforeLeave: onBeforeLeave,
          afterLeave: onAfterLeave,
          get children() {
            const _el$3 = _tmpl$$5.cloneNode(true), _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling;
            const _ref$2 = contentEl;
            typeof _ref$2 === "function" ? _ref$2(_el$3) : contentEl = _el$3;
            insert(_el$3, (() => {
              const _c$ = memo(() => !!props.header, true);
              return () => _c$() && (() => {
                const _el$6 = _tmpl$3$2.cloneNode(true);
                insert(_el$6, () => props.header);
                return _el$6;
              })();
            })(), _el$4);
            addEventListener(_el$4, "click", props.onClose, true);
            insert(_el$5, () => props.children);
            insert(_el$3, (() => {
              const _c$2 = memo(() => !!props.footer, true);
              return () => _c$2() && (() => {
                const _el$7 = _tmpl$4$1.cloneNode(true);
                insert(_el$7, () => props.footer);
                return _el$7;
              })();
            })(), null);
            createRenderEffect((_$p) => classList(_el$5, {
              "overflow-y-auto overflow-x-hidden": props.scrollable
            }, _$p));
            return _el$3;
          }
        }));
        createRenderEffect((_$p) => classList(_el$2, {
          [props.class]: Boolean(props.class),
          ...props.classList
        }, _$p));
        return _el$;
      })()];
    }
  });
}
delegateEvents(["click", "keydown"]);
const _tmpl$$4 = /* @__PURE__ */ template(`<div class="container"><div class="-mx-4 mb-4 rounded px-4 pt-4 pb-6 transition-colors dark:bg-slate-800 dark:text-slate-100"><h2 class="mb-3 text-xl">Theme Switcher</h2></div></div>`), _tmpl$2$1 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">RadioGroup</h2></div>`), _tmpl$3$1 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">Switch</h2><div class="flex flex-wrap gap-4"></div></div>`), _tmpl$4 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">Checkbox</h2><div class="flex flex-wrap gap-4"></div></div>`), _tmpl$5 = /* @__PURE__ */ template(`<svg class="mr-1.5 h-4 fill-current" aria-hidden="true" viewBox="0 0 17 13"><path d="M13.8 7.29v4.73c0 .17-.06.32-.19.44a.58.58 0 0 1-.45.19H9.33V8.86H6.77v3.79H2.94a.58.58 0 0 1-.45-.19.58.58 0 0 1-.19-.44V7.26l.01-.03 5.74-4.68 5.74 4.68.01.06zm2.23-.68-.62.73a.35.35 0 0 1-.21.1h-.03a.33.33 0 0 1-.21-.06L8.05 1.69 1.14 7.38a.36.36 0 0 1-.24.06.35.35 0 0 1-.21-.1l-.62-.73A.34.34 0 0 1 0 6.37a.3.3 0 0 1 .11-.21L7.29.26C7.5.09 7.76 0 8.05 0c.29 0 .55.09.76.26l2.44 2.01V.35c0-.1.03-.17.09-.23a.3.3 0 0 1 .23-.09h2.91c.1 0 .17.03.23.09a.3.3 0 0 1 .09.23v4.02l2.19 1.79c.07.05.1.13.11.21a.34.34 0 0 1-.07.24z"></path></svg>`), _tmpl$6 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">Switch</h2><div class="flex flex-wrap gap-3"></div></div>`), _tmpl$7 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">Hamburger</h2></div>`), _tmpl$8 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">Spinner</h2></div>`), _tmpl$9 = /* @__PURE__ */ template(`<div class="mb-10"><h2 class="mb-3 text-xl">Input</h2><div class="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"><div class="flex"><div class="flex items-center rounded-l border border-r-0 border-slate-300 bg-slate-100 px-4">@</div></div><div class="flex"></div><div class="relative flex"><div class="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-content-center"><svg viewBox="0 0 14 14" class="ml-0.5 h-4 fill-slate-300"><path d="M2.2.01a.49.49 0 0 0-.28.02C.87.43.22 1.93.06 2.96c-.49 3.33 2.15 6.21 4.57 8.1 2.15 1.7 6.27 4.46 8.71 1.79.31-.33.68-.81.66-1.3-.06-.81-.81-1.4-1.4-1.84-.44-.33-1.37-1.24-1.95-1.22-.52.02-.85.57-1.18.9l-.58.58c-.1.1-1.34-.72-1.47-.82a9.88 9.88 0 0 1-2.56-2.42c-.1-.13-.9-1.32-.81-1.41 0 0 .67-.74.87-1.03.4-.62.71-1.1.25-1.84a4.33 4.33 0 0 0-.62-.71c-.4-.4-.81-.8-1.28-1.13a2.7 2.7 0 0 0-1.06-.6Z"></path></svg></div><div class="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center"><svg viewBox="0 0 14 14" class="mr-0.5 h-4 fill-green-600"><path d="M5.5 12 14 3.5 12.5 2l-7 7-4-4L0 6.5z"></path></svg></div></div><div class="relative"><label for="with-label" class="mb-2 block text-sm font-bold text-gray-700">With label</label><div class="mt-1.5 text-xs text-slate-400" id="with-hint">Some useful hint under input</div></div><div class="relative"><div class="mt-1.5 text-xs text-red-600" id="with-error">Please select your currency</div></div></div></div>`);
function About() {
  return (() => {
    const _el$ = _tmpl$$4.cloneNode(true), _el$2 = _el$.firstChild;
    _el$2.firstChild;
    insert(_el$2, createComponent(ThemeSwitcher, {}), null);
    insert(_el$, createComponent(RadioGroupSection, {}), null);
    insert(_el$, createComponent(SwitchSection, {}), null);
    insert(_el$, createComponent(CheckboxSection, {}), null);
    insert(_el$, createComponent(ButtonSection, {}), null);
    insert(_el$, createComponent(HamburgerSection, {}), null);
    insert(_el$, createComponent(SpinnerSection, {}), null);
    insert(_el$, createComponent(InputSection, {}), null);
    insert(_el$, createComponent(DialogSection, {}), null);
    insert(_el$, createComponent(ToTop, {
      "class": "mr-[var(--scrollbar-visible-width,0)]"
    }), null);
    return _el$;
  })();
}
function RadioGroupSection() {
  const [radioValue, setRadioValue] = createSignal("three");
  return (() => {
    const _el$4 = _tmpl$2$1.cloneNode(true);
    _el$4.firstChild;
    insert(_el$4, createComponent(RadioGroup, {
      "class": "flex flex-wrap gap-4",
      name: "radio-group",
      "aria-label": "Radio Group",
      get value() {
        return radioValue();
      },
      onChange: (e) => setRadioValue(e.target.value),
      get children() {
        return [createComponent(Checkbox$1, {
          label: "Default",
          value: "one"
        }), createComponent(Checkbox$1, {
          label: "Another",
          value: "two"
        }), createComponent(Checkbox$1, {
          label: "Disabled",
          value: "three",
          disabled: true
        })];
      }
    }), null);
    return _el$4;
  })();
}
function SwitchSection() {
  const [switchChecked, setSwitchChecked] = createSignal(false);
  return (() => {
    const _el$6 = _tmpl$3$1.cloneNode(true), _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling;
    insert(_el$8, createComponent(Switch, {
      get checked() {
        return switchChecked();
      },
      onChange: (e) => setSwitchChecked(e.target.checked),
      label: "Default"
    }), null);
    insert(_el$8, createComponent(Switch, {
      get checked() {
        return switchChecked();
      },
      onChange: (e) => setSwitchChecked(e.target.checked),
      label: "Disabled",
      disabled: true
    }), null);
    return _el$6;
  })();
}
function CheckboxSection() {
  const [checked, setChecked] = createSignal(false);
  const [indeterminate, setIndeterminate] = createSignal(true);
  return (() => {
    const _el$9 = _tmpl$4.cloneNode(true), _el$10 = _el$9.firstChild, _el$11 = _el$10.nextSibling;
    insert(_el$11, createComponent(Checkbox, {
      get checked() {
        return checked();
      },
      onChange: (e) => setChecked(e.target.checked),
      label: "Default"
    }), null);
    insert(_el$11, createComponent(Checkbox, {
      get checked() {
        return checked();
      },
      onChange: (e) => {
        setChecked(e.target.checked);
        setIndeterminate(e.target.indeterminate);
      },
      label: "Indeterminate",
      get indeterminate() {
        return indeterminate();
      }
    }), null);
    insert(_el$11, createComponent(Checkbox, {
      get checked() {
        return checked();
      },
      onChange: (e) => setChecked(e.target.checked),
      label: "Disabled&Indeterminate",
      disabled: true,
      get indeterminate() {
        return indeterminate();
      }
    }), null);
    insert(_el$11, createComponent(Checkbox, {
      get checked() {
        return checked();
      },
      onChange: (e) => setChecked(e.target.checked),
      label: "Disabled",
      disabled: true
    }), null);
    return _el$9;
  })();
}
function ButtonSection() {
  return (() => {
    const _el$12 = _tmpl$6.cloneNode(true), _el$13 = _el$12.firstChild, _el$14 = _el$13.nextSibling;
    insert(_el$14, createComponent(Button, {
      type: "button",
      variant: "primary",
      size: "md",
      children: "Button"
    }), null);
    insert(_el$14, createComponent(Button, {
      as: "a",
      href: "#",
      variant: "primary",
      size: "md",
      disabled: true,
      children: "Button"
    }), null);
    insert(_el$14, createComponent(Button, {
      as: "a",
      href: "#",
      variant: "primary",
      size: "md",
      loading: true,
      children: "Button"
    }), null);
    insert(_el$14, createComponent(Button, {
      type: "button",
      variant: "primary",
      size: "md",
      get children() {
        return [_tmpl$5.cloneNode(true), "Button"];
      }
    }), null);
    return _el$12;
  })();
}
function HamburgerSection() {
  const [active, setActive] = createSignal(false);
  return (() => {
    const _el$16 = _tmpl$7.cloneNode(true);
    _el$16.firstChild;
    insert(_el$16, createComponent(Hamburger, {
      get active() {
        return active();
      },
      onClick: () => setActive(!active())
    }), null);
    return _el$16;
  })();
}
function SpinnerSection() {
  return (() => {
    const _el$18 = _tmpl$8.cloneNode(true);
    _el$18.firstChild;
    insert(_el$18, createComponent(Spinner, {
      size: 50,
      thickness: 3
    }), null);
    return _el$18;
  })();
}
function InputSection() {
  const [mInputValue, setMInputValue] = createSignal("+7(523) 4");
  const [maskPattern, setMaskPattern] = createSignal("{+7}(#00) 000-0000");
  return (() => {
    const _el$20 = _tmpl$9.cloneNode(true), _el$21 = _el$20.firstChild, _el$22 = _el$21.nextSibling, _el$23 = _el$22.firstChild;
    _el$23.firstChild;
    const _el$25 = _el$23.nextSibling, _el$26 = _el$25.nextSibling, _el$27 = _el$26.firstChild, _el$28 = _el$27.nextSibling, _el$29 = _el$26.nextSibling, _el$30 = _el$29.firstChild, _el$31 = _el$30.nextSibling, _el$32 = _el$29.nextSibling, _el$33 = _el$32.firstChild;
    insert(_el$22, createComponent(Input, {
      placeholder: "Some placeholder"
    }), _el$23);
    insert(_el$23, createComponent(Input, {
      "class": "rounded-l-none",
      type: "email",
      placeholder: "Enter email"
    }), null);
    insert(_el$25, createComponent(Input, {
      "class": "-mr-px rounded-r-none border-r-transparent bg-clip-padding focus:z-10",
      type: "text",
      placeholder: "Close to button"
    }), null);
    insert(_el$25, createComponent(Button, {
      "class": "rounded-l-none",
      type: "button",
      variant: "primary",
      size: "md",
      children: "Send"
    }), null);
    insert(_el$26, createComponent(Input, {
      "class": "pl-10 pr-10",
      type: "tel",
      placeholder: "Phone number"
    }), _el$28);
    insert(_el$22, createComponent(PasswordInput, {
      placeholder: "Enter password",
      value: "Secret"
    }), _el$29);
    insert(_el$29, createComponent(Input, {
      get value() {
        return mInputValue();
      },
      onInput: (e) => setMInputValue(e.target.value),
      id: "with-label",
      placeholder: "With label and hint",
      "aria-describedby": "with-hint"
    }), _el$31);
    insert(_el$32, createComponent(Input, {
      get value() {
        return maskPattern();
      },
      onInput: (e) => setMaskPattern(e.target.value),
      invalid: true,
      placeholder: "With error",
      "aria-describedby": "with-error"
    }), _el$33);
    insert(_el$22, createComponent(MaskedInput, {
      get value() {
        return mInputValue();
      },
      onInput: (e) => setMInputValue(e.target.value),
      get mask() {
        return maskPattern();
      },
      definitions: {
        "#": /[5-8]/
      },
      name: "masked-input",
      placeholder: "Masked input"
    }), null);
    insert(_el$22, mInputValue, null);
    return _el$20;
  })();
}
function DialogSection() {
  const [open, setOpen] = createSignal(true);
  return [createComponent(Button, {
    type: "button",
    variant: "primary",
    size: "md",
    onClick: () => setOpen(true),
    children: "Open Dialog"
  }), createComponent(Dialog, {
    get open() {
      return open();
    },
    onClose: () => setOpen(false),
    children: "Content"
  })];
}
const _tmpl$$3 = /* @__PURE__ */ template(`<svg viewBox="0 0 17 13"><path d="M13.8 7.29v4.73c0 .17-.06.32-.19.44a.58.58 0 0 1-.45.19H9.33V8.86H6.77v3.79H2.94a.58.58 0 0 1-.45-.19.58.58 0 0 1-.19-.44V7.26l.01-.03 5.74-4.68 5.74 4.68.01.06zm2.23-.68-.62.73a.35.35 0 0 1-.21.1h-.03a.33.33 0 0 1-.21-.06L8.05 1.69 1.14 7.38a.36.36 0 0 1-.24.06.35.35 0 0 1-.21-.1l-.62-.73A.34.34 0 0 1 0 6.37a.3.3 0 0 1 .11-.21L7.29.26C7.5.09 7.76 0 8.05 0c.29 0 .55.09.76.26l2.44 2.01V.35c0-.1.03-.17.09-.23a.3.3 0 0 1 .23-.09h1.91c.1 0 .17.03.23.09a.3.3 0 0 1 .09.23v4.02l2.19 1.79c.07.05.1.13.11.21a.34.34 0 0 1-.07.24z"></path></svg>`);
const HouseIcon = (props = {}) => (() => {
  const _el$ = _tmpl$$3.cloneNode(true);
  spread(_el$, props, true, true);
  return _el$;
})();
const _tmpl$$2 = /* @__PURE__ */ template(`<svg viewBox="0 0 371.23 371.23"><path d="M371.23 21.21 350.02 0l-164.4 164.4L21.22 0 0 21.21l164.4 164.4L0 350.01l21.21 21.22 164.4-164.4 164.4 164.4 21.22-21.21-164.4-164.4z"></path></svg>`);
const CloseIcon = (props = {}) => (() => {
  const _el$ = _tmpl$$2.cloneNode(true);
  spread(_el$, props, true, true);
  return _el$;
})();
const _tmpl$$1 = /* @__PURE__ */ template(`<img>`), _tmpl$2 = /* @__PURE__ */ template(`<picture></picture>`), _tmpl$3 = /* @__PURE__ */ template(`<source>`);
const maxWidth = 1280;
const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
function getIndex(a) {
  const order = ["avif", "webp"];
  const i = order.indexOf(a);
  return i === -1 ? order.length : i;
}
function normalizeScr(src) {
  return src.startsWith("/") ? src.slice(1) : src;
}
function formatSizes(sizes) {
  if (sizes.includes(","))
    return sizes;
  return sizes.trim().split(/\s+/).reverse().reduce((acc, cur, i) => {
    const m = cur.match(/^(\w+):(\w+)$/);
    return m ? [...i === 0 && m[2].replace(/([\d.]+)/, "") === "vw" && maxWidth > screens[m[1]] ? [`(min-width: ${maxWidth}px) ${Math.round(maxWidth / (100 / parseFloat(m[2])))}px`] : acc, `(min-width: ${screens[m[1]]}px) ${m[2]}`] : [...acc, cur];
  }, []).join(", ");
}
function Image({
  src,
  sizes,
  ...rest
}) {
  if (!Array.isArray(src)) {
    const obj = typeof src === "string" ? {
      src: normalizeScr(src)
    } : {
      src: normalizeScr(src.src),
      width: src.width,
      height: Math.round(src.height)
    };
    return (() => {
      const _el$ = _tmpl$$1.cloneNode(true);
      spread(_el$, obj, false, false);
      spread(_el$, rest, false, false);
      return _el$;
    })();
  }
  const formatEntries = Object.entries(src.reduce((acc, cur) => {
    acc[cur.format] = (acc[cur.format] || []).concat(cur).sort((a, b) => a.width - b.width);
    return acc;
  }, {})).sort((a, b) => getIndex(a[0]) - getIndex(b[0]));
  if (formatEntries.length === 1) {
    const arr = formatEntries[0][1];
    return (() => {
      const _el$2 = _tmpl$$1.cloneNode(true);
      spread(_el$2, () => ({
        src: normalizeScr(arr[arr.length - 1].src),
        srcset: arr.map((o) => `${normalizeScr(o.src)} ${o.width}w`).join(", "),
        sizes: sizes ? formatSizes(sizes) : null,
        width: arr[arr.length - 1].width,
        height: Math.round(arr[arr.length - 1].height)
      }), false, false);
      spread(_el$2, rest, false, false);
      return _el$2;
    })();
  }
  return (() => {
    const _el$3 = _tmpl$2.cloneNode(true);
    insert(_el$3, () => formatEntries.map(([format, arr], i) => formatEntries.length - 1 > i ? (() => {
      const _el$4 = _tmpl$3.cloneNode(true);
      setAttribute(_el$4, "type", `image/${format}`);
      createRenderEffect(() => setAttribute(_el$4, "srcset", arr.length > 1 ? arr.map((o) => `${normalizeScr(o.src)} ${o.width}w`).join(", ") : arr[0].src));
      return _el$4;
    })() : (() => {
      const _el$5 = _tmpl$$1.cloneNode(true);
      spread(_el$5, () => ({
        src: normalizeScr(arr[arr.length - 1].src),
        srcset: arr.length > 1 ? arr.map((o) => `${normalizeScr(o.src)} ${o.width}w`).join(", ") : null,
        sizes: sizes ? formatSizes(sizes) : null,
        width: arr[arr.length - 1].width,
        height: Math.round(arr[arr.length - 1].height)
      }), false, false);
      spread(_el$5, rest, false, false);
      return _el$5;
    })()));
    return _el$3;
  })();
}
const coverImage = [
  {
    format: "webp",
    width: 1e3,
    height: 398.91975308641975,
    src: "/static/img/cover.webp"
  },
  {
    format: "jpg",
    width: 1e3,
    height: 398.91975308641975,
    src: "/static/img/cover.jpg"
  },
  {
    format: "webp",
    width: 500,
    height: 199.45987654320987,
    src: "/static/img/cover2.webp"
  },
  {
    format: "jpg",
    width: 500,
    height: 199.45987654320987,
    src: "/static/img/cover2.jpg"
  },
  {
    format: "webp",
    width: 2e3,
    height: 797.8395061728395,
    src: "/static/img/cover3.webp"
  },
  {
    format: "jpg",
    width: 2e3,
    height: 797.8395061728395,
    src: "/static/img/cover3.jpg"
  }
];
const _tmpl$ = /* @__PURE__ */ template(`<div class="container"><h1 class="mb-3 text-xl">Icons</h1><div class="mt-4 flex items-center gap-4"></div><div class="my-5"></div></div>`);
function script() {
}
function Home() {
  onMount(script);
  return (() => {
    const _el$ = _tmpl$.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
    insert(_el$3, createComponent(HouseIcon, {
      "class": "h-7 fill-current",
      "aria-hidden": "true"
    }), null);
    insert(_el$3, createComponent(CloseIcon, {
      "class": "h-7 fill-current",
      "aria-hidden": "true"
    }), null);
    insert(_el$4, () => JSON.stringify(coverImage), null);
    insert(_el$4, createComponent(Image, {
      src: coverImage,
      sizes: "100vw sm:50vw md:33vw lg:25vw",
      alt: "#",
      loading: "lazy"
    }), null);
    return _el$;
  })();
}
const base = "";
const components = "";
const Header = "";
const utilities = "";
const pages = /* @__PURE__ */ Object.assign({ "./pages/About.jsx": About, "./pages/Home.jsx": Home });
const pathsToPages = Object.entries(pages).map(([key, Page]) => {
  const path = key.replace(/.+\/|\.jsx/g, "").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return [path === "home" ? "/" : `/${path}`, Page];
});
console.log(pages, pathsToPages);
(() => {
  const el = document.querySelector(".header");
  if (!el)
    return;
  el.addEventListener("click", (e) => {
    console.log("I am header el wwwwwwww fdfsdfas", el);
  });
})();
