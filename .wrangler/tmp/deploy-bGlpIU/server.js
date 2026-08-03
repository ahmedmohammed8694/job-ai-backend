var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(rawHeaders, "rawHeaders");
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type2) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type2) {
        return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
      }
      getEntriesByType(type2) {
        return this._entries.filter((e) => e.entryType === type2);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type2, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/request.mjs
import { Socket } from "node:net";
import { Readable } from "node:stream";
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(Boolean);
    }
  }
  return d;
}
var IncomingMessage;
var init_request = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/request.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    IncomingMessage = class extends Readable {
      static {
        __name(this, "IncomingMessage");
      }
      __unenv__ = {};
      aborted = false;
      httpVersion = "1.1";
      httpVersionMajor = 1;
      httpVersionMinor = 1;
      complete = true;
      connection;
      socket;
      headers = {};
      trailers = {};
      method = "GET";
      url = "/";
      statusCode = 200;
      statusMessage = "";
      closed = false;
      errored = null;
      readable = false;
      constructor(socket) {
        super();
        this.socket = this.connection = socket || new Socket();
      }
      get rawHeaders() {
        return rawHeaders(this.headers);
      }
      get rawTrailers() {
        return [];
      }
      setTimeout(_msecs, _callback) {
        return this;
      }
      get headersDistinct() {
        return _distinct(this.headers);
      }
      get trailersDistinct() {
        return _distinct(this.trailers);
      }
      _read() {
      }
    };
    __name(_distinct, "_distinct");
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/response.mjs
import { Writable as Writable2 } from "node:stream";
var ServerResponse;
var init_response = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/response.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ServerResponse = class extends Writable2 {
      static {
        __name(this, "ServerResponse");
      }
      __unenv__ = true;
      statusCode = 200;
      statusMessage = "";
      upgrading = false;
      chunkedEncoding = false;
      shouldKeepAlive = false;
      useChunkedEncodingByDefault = false;
      sendDate = false;
      finished = false;
      headersSent = false;
      strictContentLength = false;
      connection = null;
      socket = null;
      req;
      _headers = {};
      constructor(req) {
        super();
        this.req = req;
      }
      assignSocket(socket) {
        socket._httpMessage = this;
        this.socket = socket;
        this.connection = socket;
        this.emit("socket", socket);
        this._flush();
      }
      _flush() {
        this.flushHeaders();
      }
      detachSocket(_socket) {
      }
      writeContinue(_callback) {
      }
      writeHead(statusCode, arg1, arg2) {
        if (statusCode) {
          this.statusCode = statusCode;
        }
        if (typeof arg1 === "string") {
          this.statusMessage = arg1;
          arg1 = void 0;
        }
        const headers = arg2 || arg1;
        if (headers) {
          if (Array.isArray(headers)) {
          } else {
            for (const key in headers) {
              this.setHeader(key, headers[key]);
            }
          }
        }
        this.headersSent = true;
        return this;
      }
      writeProcessing() {
      }
      setTimeout(_msecs, _callback) {
        return this;
      }
      appendHeader(name, value) {
        name = name.toLowerCase();
        const current = this._headers[name];
        const all = [...Array.isArray(current) ? current : [current], ...Array.isArray(value) ? value : [value]].filter(Boolean);
        this._headers[name] = all.length > 1 ? all : all[0];
        return this;
      }
      setHeader(name, value) {
        this._headers[name.toLowerCase()] = Array.isArray(value) ? [...value] : value;
        return this;
      }
      setHeaders(headers) {
        for (const [key, value] of headers.entries()) {
          this.setHeader(key, value);
        }
        return this;
      }
      getHeader(name) {
        return this._headers[name.toLowerCase()];
      }
      getHeaders() {
        return this._headers;
      }
      getHeaderNames() {
        return Object.keys(this._headers);
      }
      hasHeader(name) {
        return name.toLowerCase() in this._headers;
      }
      removeHeader(name) {
        delete this._headers[name.toLowerCase()];
      }
      addTrailers(_headers) {
      }
      flushHeaders() {
      }
      writeEarlyHints(_headers, cb) {
        if (typeof cb === "function") {
          cb();
        }
      }
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/agent.mjs
import { EventEmitter as EventEmitter2 } from "node:events";
var Agent;
var init_agent = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/agent.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Agent = class extends EventEmitter2 {
      static {
        __name(this, "Agent");
      }
      __unenv__ = {};
      maxFreeSockets = 256;
      maxSockets = Infinity;
      maxTotalSockets = Infinity;
      freeSockets = {};
      sockets = {};
      requests = {};
      options;
      constructor(opts = {}) {
        super();
        this.options = opts;
      }
      destroy() {
      }
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/constants.mjs
var METHODS2, STATUS_CODES, maxHeaderSize;
var init_constants = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/http/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    METHODS2 = [
      "ACL",
      "BIND",
      "CHECKOUT",
      "CONNECT",
      "COPY",
      "DELETE",
      "GET",
      "HEAD",
      "LINK",
      "LOCK",
      "M-SEARCH",
      "MERGE",
      "MKACTIVITY",
      "MKCALENDAR",
      "MKCOL",
      "MOVE",
      "NOTIFY",
      "OPTIONS",
      "PATCH",
      "POST",
      "PRI",
      "PROPFIND",
      "PROPPATCH",
      "PURGE",
      "PUT",
      "REBIND",
      "REPORT",
      "SEARCH",
      "SOURCE",
      "SUBSCRIBE",
      "TRACE",
      "UNBIND",
      "UNLINK",
      "UNLOCK",
      "UNSUBSCRIBE"
    ];
    STATUS_CODES = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a Teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Too Early",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
    };
    maxHeaderSize = 16384;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/http.mjs
var createServer, request, get, Server, OutgoingMessage, ClientRequest, globalAgent, validateHeaderName, validateHeaderValue, setMaxIdleHTTPParsers, _connectionListener, WebSocket, CloseEvent, MessageEvent, http_default;
var init_http = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/http.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_request();
    init_response();
    init_agent();
    init_constants();
    init_request();
    init_response();
    createServer = /* @__PURE__ */ notImplemented("http.createServer");
    request = /* @__PURE__ */ notImplemented("http.request");
    get = /* @__PURE__ */ notImplemented("http.get");
    Server = /* @__PURE__ */ notImplementedClass("http.Server");
    OutgoingMessage = /* @__PURE__ */ notImplementedClass("http.OutgoingMessage");
    ClientRequest = /* @__PURE__ */ notImplementedClass("http.ClientRequest");
    globalAgent = new Agent();
    validateHeaderName = /* @__PURE__ */ notImplemented("http.validateHeaderName");
    validateHeaderValue = /* @__PURE__ */ notImplemented("http.validateHeaderValue");
    setMaxIdleHTTPParsers = /* @__PURE__ */ notImplemented("http.setMaxIdleHTTPParsers");
    _connectionListener = /* @__PURE__ */ notImplemented("http._connectionListener");
    WebSocket = globalThis.WebSocket || /* @__PURE__ */ notImplementedClass("WebSocket");
    CloseEvent = globalThis.CloseEvent || /* @__PURE__ */ notImplementedClass("CloseEvent");
    MessageEvent = globalThis.MessageEvent || /* @__PURE__ */ notImplementedClass("MessageEvent");
    http_default = {
      METHODS: METHODS2,
      STATUS_CODES,
      maxHeaderSize,
      IncomingMessage,
      ServerResponse,
      WebSocket,
      CloseEvent,
      MessageEvent,
      createServer,
      request,
      get,
      Server,
      OutgoingMessage,
      ClientRequest,
      Agent,
      globalAgent,
      validateHeaderName,
      validateHeaderValue,
      setMaxIdleHTTPParsers,
      _connectionListener
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants2 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants2();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs.mjs
var fs_default;
var init_fs2 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants2();
    init_constants2();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node-built-in-modules:fs
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_fs2();
    module.exports = fs_default;
  }
});

// node-built-in-modules:path
import libDefault from "path";
var require_path = __commonJS({
  "node-built-in-modules:path"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/os/constants.mjs
var UV_UDP_REUSEADDR, dlopen2, errno, signals, priority;
var init_constants3 = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/os/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_UDP_REUSEADDR = 4;
    dlopen2 = {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    };
    errno = {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    };
    signals = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31
    };
    priority = {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    };
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/os.mjs
var constants2, NUM_CPUS, availableParallelism, arch2, machine, endianness, cpus, getPriority, setPriority, homedir, tmpdir, devNull, freemem, totalmem, loadavg, uptime2, hostname, networkInterfaces, platform2, type, release2, version2, userInfo, EOL, os_default;
var init_os = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/os.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_constants3();
    constants2 = {
      UV_UDP_REUSEADDR,
      dlopen: dlopen2,
      errno,
      signals,
      priority
    };
    NUM_CPUS = 8;
    availableParallelism = /* @__PURE__ */ __name(() => NUM_CPUS, "availableParallelism");
    arch2 = /* @__PURE__ */ __name(() => "", "arch");
    machine = /* @__PURE__ */ __name(() => "", "machine");
    endianness = /* @__PURE__ */ __name(() => "LE", "endianness");
    cpus = /* @__PURE__ */ __name(() => {
      const info3 = {
        model: "",
        speed: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      };
      return Array.from({ length: NUM_CPUS }, () => info3);
    }, "cpus");
    getPriority = /* @__PURE__ */ __name(() => 0, "getPriority");
    setPriority = /* @__PURE__ */ notImplemented("os.setPriority");
    homedir = /* @__PURE__ */ __name(() => "/", "homedir");
    tmpdir = /* @__PURE__ */ __name(() => "/tmp", "tmpdir");
    devNull = "/dev/null";
    freemem = /* @__PURE__ */ __name(() => 0, "freemem");
    totalmem = /* @__PURE__ */ __name(() => 0, "totalmem");
    loadavg = /* @__PURE__ */ __name(() => [
      0,
      0,
      0
    ], "loadavg");
    uptime2 = /* @__PURE__ */ __name(() => 0, "uptime");
    hostname = /* @__PURE__ */ __name(() => "", "hostname");
    networkInterfaces = /* @__PURE__ */ __name(() => {
      return { lo0: [
        {
          address: "127.0.0.1",
          netmask: "255.0.0.0",
          family: "IPv4",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "127.0.0.1/8"
        },
        {
          address: "::1",
          netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "::1/128",
          scopeid: 0
        },
        {
          address: "fe80::1",
          netmask: "ffff:ffff:ffff:ffff::",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "fe80::1/64",
          scopeid: 1
        }
      ] };
    }, "networkInterfaces");
    platform2 = /* @__PURE__ */ __name(() => "linux", "platform");
    type = /* @__PURE__ */ __name(() => "Linux", "type");
    release2 = /* @__PURE__ */ __name(() => "", "release");
    version2 = /* @__PURE__ */ __name(() => "", "version");
    userInfo = /* @__PURE__ */ __name((opts) => {
      const encode = /* @__PURE__ */ __name((str) => {
        if (opts?.encoding) {
          const buff = Buffer.from(str);
          return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
        }
        return str;
      }, "encode");
      return {
        gid: 1e3,
        uid: 1e3,
        homedir: encode("/"),
        shell: encode("/bin/sh"),
        username: encode("root")
      };
    }, "userInfo");
    EOL = "\n";
    os_default = {
      arch: arch2,
      availableParallelism,
      constants: constants2,
      cpus,
      EOL,
      endianness,
      devNull,
      freemem,
      getPriority,
      homedir,
      hostname,
      loadavg,
      machine,
      networkInterfaces,
      platform: platform2,
      release: release2,
      setPriority,
      tmpdir,
      totalmem,
      type,
      uptime: uptime2,
      userInfo,
      version: version2
    };
  }
});

// node-built-in-modules:os
var require_os = __commonJS({
  "node-built-in-modules:os"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_os();
    module.exports = os_default;
  }
});

// node-built-in-modules:crypto
import libDefault2 from "crypto";
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var fs = require_fs();
    var path = require_path();
    var os = require_os();
    var crypto3 = require_crypto();
    var packageJson = require_package();
    var version3 = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match2;
      while ((match2 = LINE.exec(lines)) != null) {
        const key = match2[1];
        let value = match2[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    __name(parse, "parse");
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error3) {
          if (i + 1 >= length) {
            throw error3;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    __name(_parseVault, "_parseVault");
    function _warn(message) {
      console.log(`[dotenv@${version3}][WARN] ${message}`);
    }
    __name(_warn, "_warn");
    function _debug(message) {
      console.log(`[dotenv@${version3}][DEBUG] ${message}`);
    }
    __name(_debug, "_debug");
    function _log(message) {
      console.log(`[dotenv@${version3}] ${message}`);
    }
    __name(_log, "_log");
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    __name(_dotenvKey, "_dotenvKey");
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error3) {
        if (error3.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error3;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    __name(_instructions, "_instructions");
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    __name(_vaultPath, "_vaultPath");
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    __name(_resolveHome, "_resolveHome");
    function _configVault(options) {
      const debug3 = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug3 || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    __name(_configVault, "_configVault");
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug3 = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug3) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug3) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug3 || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug3) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    __name(configDotenv, "configDotenv");
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    __name(config2, "config");
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto3.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error3) {
        const isRange = error3 instanceof RangeError;
        const invalidKeyLength = error3.message === "Invalid key length";
        const decryptionFailed = error3.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error3;
        }
      }
    }
    __name(decrypt, "decrypt");
    function populate(processEnv, parsed, options = {}) {
      const debug3 = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug3) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    __name(populate, "populate");
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/child_process.mjs
var ChildProcess, _forkChild, exec, execFile, execFileSync, execSync, fork, spawn, spawnSync, child_process_default;
var init_child_process = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/child_process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    ChildProcess = /* @__PURE__ */ notImplementedClass("child_process.ChildProcess");
    _forkChild = /* @__PURE__ */ notImplemented("child_process.ChildProcess");
    exec = /* @__PURE__ */ notImplemented("child_process.exec");
    execFile = /* @__PURE__ */ notImplemented("child_process.execFile");
    execFileSync = /* @__PURE__ */ notImplemented("child_process.execFileSync");
    execSync = /* @__PURE__ */ notImplemented("child_process.execSyn");
    fork = /* @__PURE__ */ notImplemented("child_process.fork");
    spawn = /* @__PURE__ */ notImplemented("child_process.spawn");
    spawnSync = /* @__PURE__ */ notImplemented("child_process.spawnSync");
    child_process_default = {
      ChildProcess,
      _forkChild,
      exec,
      execFile,
      execFileSync,
      execSync,
      fork,
      spawn,
      spawnSync
    };
  }
});

// node-built-in-modules:child_process
var require_child_process = __commonJS({
  "node-built-in-modules:child_process"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_child_process();
    module.exports = child_process_default;
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = /* @__PURE__ */ __name(function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    }, "isArray");
    var isPlainObject = /* @__PURE__ */ __name(function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    }, "isPlainObject");
    var setProperty = /* @__PURE__ */ __name(function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    }, "setProperty");
    var getProperty = /* @__PURE__ */ __name(function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    }, "getProperty");
    module.exports = /* @__PURE__ */ __name(function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    }, "extend");
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/https.mjs
var Server2, Agent2, globalAgent2, get2, createServer2, request2, https_default;
var init_https = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/https.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_agent();
    Server2 = /* @__PURE__ */ notImplementedClass("https.Server");
    Agent2 = Agent;
    globalAgent2 = /* @__PURE__ */ new Agent2();
    get2 = /* @__PURE__ */ notImplemented("https.get");
    createServer2 = /* @__PURE__ */ notImplemented("https.createServer");
    request2 = /* @__PURE__ */ notImplemented("https.request");
    https_default = {
      Server: Server2,
      Agent: Agent2,
      globalAgent: globalAgent2,
      get: get2,
      createServer: createServer2,
      request: request2
    };
  }
});

// node-built-in-modules:https
var require_https = __commonJS({
  "node-built-in-modules:https"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_https();
    module.exports = https_default;
  }
});

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/npm/node-fetch.mjs
var node_fetch_exports = {};
__export(node_fetch_exports, {
  AbortController: () => AbortController2,
  AbortError: () => AbortError,
  FetchError: () => FetchError,
  Headers: () => Headers2,
  Request: () => Request3,
  Response: () => Response3,
  default: () => node_fetch_default,
  fetch: () => fetch2,
  isRedirect: () => isRedirect
});
var fetch2, Headers2, Request3, Response3, AbortController2, FetchError, AbortError, redirectStatus, isRedirect, node_fetch_default;
var init_node_fetch = __esm({
  "C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/npm/node-fetch.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    fetch2 = /* @__PURE__ */ __name((...args) => globalThis.fetch(...args), "fetch");
    Headers2 = globalThis.Headers;
    Request3 = globalThis.Request;
    Response3 = globalThis.Response;
    AbortController2 = globalThis.AbortController;
    FetchError = Error;
    AbortError = Error;
    redirectStatus = /* @__PURE__ */ new Set([
      301,
      302,
      303,
      307,
      308
    ]);
    isRedirect = /* @__PURE__ */ __name((code) => redirectStatus.has(code), "isRedirect");
    fetch2.Promise = globalThis.Promise;
    fetch2.isRedirect = isRedirect;
    node_fetch_default = fetch2;
  }
});

// required-unenv-alias:node-fetch
var require_node_fetch = __commonJS({
  "required-unenv-alias:node-fetch"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_node_fetch();
    module.exports = Object.entries(node_fetch_exports).filter(([k]) => k !== "default").reduce(
      (cjs, [k, value]) => Object.defineProperty(cjs, k, { value, enumerable: true }),
      "default" in node_fetch_exports ? node_fetch_default : {}
    );
  }
});

// node-built-in-modules:querystring
import libDefault3 from "querystring";
var require_querystring = __commonJS({
  "node-built-in-modules:querystring"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});

// node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "node_modules/is-stream/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var isStream = /* @__PURE__ */ __name((stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function", "isStream");
    isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
    isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
    isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
    isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function";
    module.exports = isStream;
  }
});

// node-built-in-modules:url
import libDefault4 from "url";
var require_url = __commonJS({
  "node-built-in-modules:url"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});

// node_modules/gaxios/package.json
var require_package2 = __commonJS({
  "node_modules/gaxios/package.json"(exports, module) {
    module.exports = {
      name: "gaxios",
      version: "6.7.1",
      description: "A simple common HTTP client specifically for Google APIs and services.",
      main: "build/src/index.js",
      types: "build/src/index.d.ts",
      files: [
        "build/src"
      ],
      scripts: {
        lint: "gts check",
        test: "c8 mocha build/test",
        "presystem-test": "npm run compile",
        "system-test": "mocha build/system-test --timeout 80000",
        compile: "tsc -p .",
        fix: "gts fix",
        prepare: "npm run compile",
        pretest: "npm run compile",
        webpack: "webpack",
        "prebrowser-test": "npm run compile",
        "browser-test": "node build/browser-test/browser-test-runner.js",
        docs: "compodoc src/",
        "docs-test": "linkinator docs",
        "predocs-test": "npm run docs",
        "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
        prelint: "cd samples; npm link ../; npm install",
        clean: "gts clean",
        precompile: "gts clean"
      },
      repository: "googleapis/gaxios",
      keywords: [
        "google"
      ],
      engines: {
        node: ">=14"
      },
      author: "Google, LLC",
      license: "Apache-2.0",
      devDependencies: {
        "@babel/plugin-proposal-private-methods": "^7.18.6",
        "@compodoc/compodoc": "1.1.19",
        "@types/cors": "^2.8.6",
        "@types/express": "^4.16.1",
        "@types/extend": "^3.0.1",
        "@types/mocha": "^9.0.0",
        "@types/multiparty": "0.0.36",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.1",
        "@types/node": "^20.0.0",
        "@types/node-fetch": "^2.5.7",
        "@types/sinon": "^17.0.0",
        "@types/tmp": "0.2.6",
        "@types/uuid": "^10.0.0",
        "abort-controller": "^3.0.0",
        assert: "^2.0.0",
        browserify: "^17.0.0",
        c8: "^8.0.0",
        cheerio: "1.0.0-rc.10",
        cors: "^2.8.5",
        execa: "^5.0.0",
        express: "^4.16.4",
        "form-data": "^4.0.0",
        gts: "^5.0.0",
        "is-docker": "^2.0.0",
        karma: "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-remap-coverage": "^0.1.5",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "5.0.0",
        linkinator: "^3.0.0",
        mocha: "^8.0.0",
        multiparty: "^4.2.1",
        mv: "^2.1.1",
        ncp: "^2.0.0",
        nock: "^13.0.0",
        "null-loader": "^4.0.0",
        puppeteer: "^19.0.0",
        sinon: "^18.0.0",
        "stream-browserify": "^3.0.0",
        tmp: "0.2.3",
        "ts-loader": "^8.0.0",
        typescript: "^5.1.6",
        webpack: "^5.35.0",
        "webpack-cli": "^4.0.0"
      },
      dependencies: {
        extend: "^3.0.2",
        "https-proxy-agent": "^7.0.1",
        "is-stream": "^2.0.0",
        "node-fetch": "^2.6.9",
        uuid: "^9.0.1"
      }
    };
  }
});

// node_modules/gaxios/build/src/util.js
var require_util = __commonJS({
  "node_modules/gaxios/build/src/util.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pkg = void 0;
    exports.pkg = require_package2();
  }
});

// node_modules/gaxios/build/src/common.js
var require_common = __commonJS({
  "node_modules/gaxios/build/src/common.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    var url_1 = require_url();
    var util_1 = require_util();
    var extend_1 = __importDefault(require_extend());
    exports.GAXIOS_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for(`${util_1.pkg.name}-gaxios-error`);
    var GaxiosError = class _GaxiosError extends Error {
      static {
        __name(this, "GaxiosError");
      }
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [(_a = exports.GAXIOS_ERROR_SYMBOL, Symbol.hasInstance)](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === util_1.pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(_GaxiosError, instance);
      }
      constructor(message, config2, response, error3) {
        var _b;
        super(message);
        this.config = config2;
        this.response = response;
        this.error = error3;
        this[_a] = util_1.pkg.version;
        this.config = (0, extend_1.default)(true, {}, config2);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(this.config.responseType, (_b = this.response) === null || _b === void 0 ? void 0 : _b.data);
          } catch (_c) {
          }
          this.status = this.response.status;
        }
        if (error3 && "code" in error3 && error3.code) {
          this.code = error3.code;
        }
        if (config2.errorRedactor) {
          config2.errorRedactor({
            config: this.config,
            response: this.response
          });
        }
      }
    };
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    __name(translateData, "translateData");
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        for (const key of Object.keys(headers)) {
          if (/^authentication$/i.test(key)) {
            headers[key] = REDACT;
          }
          if (/^authorization$/i.test(key)) {
            headers[key] = REDACT;
          }
          if (/secret/i.test(key)) {
            headers[key] = REDACT;
          }
        }
      }
      __name(redactHeaders, "redactHeaders");
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      __name(redactString, "redactString");
      function redactObject(obj) {
        if (typeof obj === "object" && obj !== null) {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      __name(redactObject, "redactObject");
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        try {
          const url = new url_1.URL("", data.config.url);
          if (url.searchParams.has("token")) {
            url.searchParams.set("token", REDACT);
          }
          if (url.searchParams.has("client_secret")) {
            url.searchParams.set("client_secret", REDACT);
          }
          data.config.url = url.toString();
        } catch (_b) {
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        redactString(data.response, "data");
        redactObject(data.response.data);
      }
      return data;
    }
    __name(defaultErrorRedactor, "defaultErrorRedactor");
  }
});

// node_modules/gaxios/build/src/retry.js
var require_retry = __commonJS({
  "node_modules/gaxios/build/src/retry.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRetryConfig = getRetryConfig;
    async function getRetryConfig(err) {
      let config2 = getConfig(err);
      if (!err || !err.config || !config2 && !err.config.retry) {
        return { shouldRetry: false };
      }
      config2 = config2 || {};
      config2.currentRetryAttempt = config2.currentRetryAttempt || 0;
      config2.retry = config2.retry === void 0 || config2.retry === null ? 3 : config2.retry;
      config2.httpMethodsToRetry = config2.httpMethodsToRetry || [
        "GET",
        "HEAD",
        "PUT",
        "OPTIONS",
        "DELETE"
      ];
      config2.noResponseRetries = config2.noResponseRetries === void 0 || config2.noResponseRetries === null ? 2 : config2.noResponseRetries;
      config2.retryDelayMultiplier = config2.retryDelayMultiplier ? config2.retryDelayMultiplier : 2;
      config2.timeOfFirstRequest = config2.timeOfFirstRequest ? config2.timeOfFirstRequest : Date.now();
      config2.totalTimeout = config2.totalTimeout ? config2.totalTimeout : Number.MAX_SAFE_INTEGER;
      config2.maxRetryDelay = config2.maxRetryDelay ? config2.maxRetryDelay : Number.MAX_SAFE_INTEGER;
      const retryRanges = [
        // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        // 1xx - Retry (Informational, request still processing)
        // 2xx - Do not retry (Success)
        // 3xx - Do not retry (Redirect)
        // 4xx - Do not retry (Client errors)
        // 408 - Retry ("Request Timeout")
        // 429 - Retry ("Too Many Requests")
        // 5xx - Retry (Server errors)
        [100, 199],
        [408, 408],
        [429, 429],
        [500, 599]
      ];
      config2.statusCodesToRetry = config2.statusCodesToRetry || retryRanges;
      err.config.retryConfig = config2;
      const shouldRetryFn = config2.shouldRetry || shouldRetryRequest;
      if (!await shouldRetryFn(err)) {
        return { shouldRetry: false, config: err.config };
      }
      const delay = getNextRetryDelay(config2);
      err.config.retryConfig.currentRetryAttempt += 1;
      const backoff = config2.retryBackoff ? config2.retryBackoff(err, delay) : new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
      if (config2.onRetryAttempt) {
        config2.onRetryAttempt(err);
      }
      await backoff;
      return { shouldRetry: true, config: err.config };
    }
    __name(getRetryConfig, "getRetryConfig");
    function shouldRetryRequest(err) {
      var _a;
      const config2 = getConfig(err);
      if (err.name === "AbortError" || ((_a = err.error) === null || _a === void 0 ? void 0 : _a.name) === "AbortError") {
        return false;
      }
      if (!config2 || config2.retry === 0) {
        return false;
      }
      if (!err.response && (config2.currentRetryAttempt || 0) >= config2.noResponseRetries) {
        return false;
      }
      if (!err.config.method || config2.httpMethodsToRetry.indexOf(err.config.method.toUpperCase()) < 0) {
        return false;
      }
      if (err.response && err.response.status) {
        let isInRange = false;
        for (const [min, max] of config2.statusCodesToRetry) {
          const status = err.response.status;
          if (status >= min && status <= max) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      config2.currentRetryAttempt = config2.currentRetryAttempt || 0;
      if (config2.currentRetryAttempt >= config2.retry) {
        return false;
      }
      return true;
    }
    __name(shouldRetryRequest, "shouldRetryRequest");
    function getConfig(err) {
      if (err && err.config && err.config.retryConfig) {
        return err.config.retryConfig;
      }
      return;
    }
    __name(getConfig, "getConfig");
    function getNextRetryDelay(config2) {
      var _a;
      const retryDelay = config2.currentRetryAttempt ? 0 : (_a = config2.retryDelay) !== null && _a !== void 0 ? _a : 100;
      const calculatedDelay = retryDelay + (Math.pow(config2.retryDelayMultiplier, config2.currentRetryAttempt) - 1) / 2 * 1e3;
      const maxAllowableDelay = config2.totalTimeout - (Date.now() - config2.timeOfFirstRequest);
      return Math.min(calculatedDelay, maxAllowableDelay, config2.maxRetryDelay);
    }
    __name(getNextRetryDelay, "getNextRetryDelay");
  }
});

// node-built-in-modules:stream
import libDefault5 from "stream";
var require_stream = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault5;
  }
});

// node_modules/uuid/dist/commonjs-browser/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/rng.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      if (!getRandomValues) {
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
          throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        }
      }
      return getRandomValues(rnds8);
    }
    __name(rng, "rng");
  }
});

// node_modules/uuid/dist/commonjs-browser/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/regex.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/validate.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    __name(validate, "validate");
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/stringify.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.unsafeStringify = unsafeStringify;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    function unsafeStringify(arr, offset = 0) {
      return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
    }
    __name(unsafeStringify, "unsafeStringify");
    function stringify(arr, offset = 0) {
      const uuid = unsafeStringify(arr, offset);
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    __name(stringify, "stringify");
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v1.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.unsafeStringify)(b);
    }
    __name(v1, "v1");
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/parse.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    __name(parse, "parse");
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v35.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.URL = exports.DNS = void 0;
    exports.default = v35;
    var _stringify = require_stringify();
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    __name(stringToBytes, "stringToBytes");
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function v35(name, version3, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version3;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.unsafeStringify)(bytes);
      }
      __name(generateUUID, "generateUUID");
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
    __name(v35, "v35");
  }
});

// node_modules/uuid/dist/commonjs-browser/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/md5.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function md5(bytes) {
      if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes));
        bytes = new Uint8Array(msg.length);
        for (let i = 0; i < msg.length; ++i) {
          bytes[i] = msg.charCodeAt(i);
        }
      }
      return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
    }
    __name(md5, "md5");
    function md5ToHexEncodedArray(input) {
      const output = [];
      const length32 = input.length * 32;
      const hexTab = "0123456789abcdef";
      for (let i = 0; i < length32; i += 8) {
        const x = input[i >> 5] >>> i % 32 & 255;
        const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
        output.push(hex);
      }
      return output;
    }
    __name(md5ToHexEncodedArray, "md5ToHexEncodedArray");
    function getOutputLength(inputLength8) {
      return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
    }
    __name(getOutputLength, "getOutputLength");
    function wordsToMd5(x, len) {
      x[len >> 5] |= 128 << len % 32;
      x[getOutputLength(len) - 1] = len;
      let a = 1732584193;
      let b = -271733879;
      let c = -1732584194;
      let d = 271733878;
      for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    __name(wordsToMd5, "wordsToMd5");
    function bytesToWords(input) {
      if (input.length === 0) {
        return [];
      }
      const length8 = input.length * 8;
      const output = new Uint32Array(getOutputLength(length8));
      for (let i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input[i / 8] & 255) << i % 32;
      }
      return output;
    }
    __name(bytesToWords, "bytesToWords");
    function safeAdd(x, y) {
      const lsw = (x & 65535) + (y & 65535);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    __name(safeAdd, "safeAdd");
    function bitRotateLeft(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    __name(bitRotateLeft, "bitRotateLeft");
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    __name(md5cmn, "md5cmn");
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn(b & c | ~b & d, a, b, x, s, t);
    }
    __name(md5ff, "md5ff");
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn(b & d | c & ~d, a, b, x, s, t);
    }
    __name(md5gg, "md5gg");
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    __name(md5hh, "md5hh");
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    __name(md5ii, "md5ii");
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v3.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/native.js
var require_native = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/native.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var randomUUID2 = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var _default = {
      randomUUID: randomUUID2
    };
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v4.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _native = _interopRequireDefault(require_native());
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function v4(options, buf, offset) {
      if (_native.default.randomUUID && !buf && !options) {
        return _native.default.randomUUID();
      }
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(rnds);
    }
    __name(v4, "v4");
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/sha1.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function f(s, x, y, z) {
      switch (s) {
        case 0:
          return x & y ^ ~x & z;
        case 1:
          return x ^ y ^ z;
        case 2:
          return x & y ^ x & z ^ y & z;
        case 3:
          return x ^ y ^ z;
      }
    }
    __name(f, "f");
    function ROTL(x, n) {
      return x << n | x >>> 32 - n;
    }
    __name(ROTL, "ROTL");
    function sha1(bytes) {
      const K = [1518500249, 1859775393, 2400959708, 3395469782];
      const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      if (typeof bytes === "string") {
        const msg = unescape(encodeURIComponent(bytes));
        bytes = [];
        for (let i = 0; i < msg.length; ++i) {
          bytes.push(msg.charCodeAt(i));
        }
      } else if (!Array.isArray(bytes)) {
        bytes = Array.prototype.slice.call(bytes);
      }
      bytes.push(128);
      const l = bytes.length / 4 + 2;
      const N = Math.ceil(l / 16);
      const M = new Array(N);
      for (let i = 0; i < N; ++i) {
        const arr = new Uint32Array(16);
        for (let j = 0; j < 16; ++j) {
          arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
      }
      M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
      M[N - 1][14] = Math.floor(M[N - 1][14]);
      M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
      for (let i = 0; i < N; ++i) {
        const W = new Uint32Array(80);
        for (let t = 0; t < 16; ++t) {
          W[t] = M[i][t];
        }
        for (let t = 16; t < 80; ++t) {
          W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for (let t = 0; t < 80; ++t) {
          const s = Math.floor(t / 20);
          const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
          e = d;
          d = c;
          c = ROTL(b, 30) >>> 0;
          b = a;
          a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
      }
      return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
    }
    __name(sha1, "sha1");
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/v5.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/nil.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/version.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function version3(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.slice(14, 15), 16);
    }
    __name(version3, "version");
    var _default = version3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/commonjs-browser/index.js
var require_commonjs_browser = __commonJS({
  "node_modules/uuid/dist/commonjs-browser/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _nil.default;
      }, "get")
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _parse.default;
      }, "get")
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _stringify.default;
      }, "get")
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _v.default;
      }, "get")
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _v2.default;
      }, "get")
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _v3.default;
      }, "get")
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _v4.default;
      }, "get")
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _validate.default;
      }, "get")
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get3() {
        return _version.default;
      }, "get")
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
  }
});

// node_modules/gaxios/build/src/interceptor.js
var require_interceptor = __commonJS({
  "node_modules/gaxios/build/src/interceptor.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosInterceptorManager = void 0;
    var GaxiosInterceptorManager = class extends Set {
      static {
        __name(this, "GaxiosInterceptorManager");
      }
    };
    exports.GaxiosInterceptorManager = GaxiosInterceptorManager;
  }
});

// node-built-in-modules:net
import libDefault6 from "net";
var require_net = __commonJS({
  "node-built-in-modules:net"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault6;
  }
});

// node-built-in-modules:tls
import libDefault7 from "tls";
var require_tls = __commonJS({
  "node-built-in-modules:tls"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault7;
  }
});

// node-built-in-modules:assert
import libDefault8 from "assert";
var require_assert = __commonJS({
  "node-built-in-modules:assert"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault8;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type2 = typeof val;
      if (type2 === "string" && val.length > 0) {
        return parse(val);
      } else if (type2 === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n = parseFloat(match2[1]);
      var type2 = (match2[2] || "ms").toLowerCase();
      switch (type2) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    __name(parse, "parse");
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    __name(fmtShort, "fmtShort");
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    __name(fmtLong, "fmtLong");
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
    __name(plural, "plural");
  }
});

// node_modules/debug/src/common.js
var require_common2 = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function setup(env2) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env2).forEach((key) => {
        createDebug[key] = env2[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      __name(selectColor, "selectColor");
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug3(...args) {
          if (!debug3.enabled) {
            return;
          }
          const self2 = debug3;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match2, format) => {
            if (match2 === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match2 = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match2;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        __name(debug3, "debug");
        debug3.namespace = namespace;
        debug3.useColors = createDebug.useColors();
        debug3.color = createDebug.selectColor(namespace);
        debug3.extend = extend;
        debug3.destroy = createDebug.destroy;
        Object.defineProperty(debug3, "enabled", {
          enumerable: true,
          configurable: false,
          get: /* @__PURE__ */ __name(() => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          }, "get"),
          set: /* @__PURE__ */ __name((v) => {
            enableOverride = v;
          }, "set")
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug3);
        }
        return debug3;
      }
      __name(createDebug, "createDebug");
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      __name(extend, "extend");
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      __name(enable, "enable");
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      __name(matchesTemplate, "matchesTemplate");
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      __name(disable, "disable");
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      __name(enabled, "enabled");
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      __name(coerce, "coerce");
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      __name(destroy, "destroy");
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    __name(setup, "setup");
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && "Cloudflare-Workers" && (m = "Cloudflare-Workers".toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/applewebkit\/(\d+)/);
    }
    __name(useColors, "useColors");
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match2) => {
        if (match2 === "%%") {
          return;
        }
        index++;
        if (match2 === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    __name(formatArgs, "formatArgs");
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error3) {
      }
    }
    __name(save, "save");
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error3) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    __name(load, "load");
    function localstorage() {
      try {
        return localStorage;
      } catch (error3) {
      }
    }
    __name(localstorage, "localstorage");
    module.exports = require_common2()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error3) {
        return "[UnexpectedJSONParseError]: " + error3.message;
      }
    };
  }
});

// node-built-in-modules:http
var require_http = __commonJS({
  "node-built-in-modules:http"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_http();
    module.exports = http_default;
  }
});

// node_modules/agent-base/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/agent-base/dist/helpers.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.req = exports.json = exports.toBuffer = void 0;
    var http = __importStar(require_http());
    var https = __importStar(require_https());
    async function toBuffer(stream) {
      let length = 0;
      const chunks = [];
      for await (const chunk of stream) {
        length += chunk.length;
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, length);
    }
    __name(toBuffer, "toBuffer");
    exports.toBuffer = toBuffer;
    async function json(stream) {
      const buf = await toBuffer(stream);
      const str = buf.toString("utf8");
      try {
        return JSON.parse(str);
      } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
      }
    }
    __name(json, "json");
    exports.json = json;
    function req(url, opts = {}) {
      const href = typeof url === "string" ? url : url.href;
      const req2 = (href.startsWith("https:") ? https : http).request(url, opts);
      const promise = new Promise((resolve, reject) => {
        req2.once("response", resolve).once("error", reject).end();
      });
      req2.then = promise.then.bind(promise);
      return req2;
    }
    __name(req, "req");
    exports.req = req;
  }
});

// node_modules/agent-base/dist/index.js
var require_dist = __commonJS({
  "node_modules/agent-base/dist/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Agent = void 0;
    var net = __importStar(require_net());
    var http = __importStar(require_http());
    var https_1 = require_https();
    __exportStar(require_helpers(), exports);
    var INTERNAL = /* @__PURE__ */ Symbol("AgentBaseInternalState");
    var Agent3 = class extends http.Agent {
      static {
        __name(this, "Agent");
      }
      constructor(opts) {
        super(opts);
        this[INTERNAL] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(options) {
        if (options) {
          if (typeof options.secureEndpoint === "boolean") {
            return options.secureEndpoint;
          }
          if (typeof options.protocol === "string") {
            return options.protocol === "https:";
          }
        }
        const { stack } = new Error();
        if (typeof stack !== "string")
          return false;
        return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(name) {
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
          return null;
        }
        if (!this.sockets[name]) {
          this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({ writable: false });
        this.sockets[name].push(fakeSocket);
        this.totalSocketCount++;
        return fakeSocket;
      }
      decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
          return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
          sockets.splice(index, 1);
          this.totalSocketCount--;
          if (sockets.length === 0) {
            delete this.sockets[name];
          }
        }
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
          return https_1.Agent.prototype.getName.call(this, options);
        }
        return super.getName(options);
      }
      createSocket(req, options, cb) {
        const connectOpts = {
          ...options,
          secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
          this.decrementSockets(name, fakeSocket);
          if (socket instanceof http.Agent) {
            try {
              return socket.addRequest(req, connectOpts);
            } catch (err) {
              return cb(err);
            }
          }
          this[INTERNAL].currentSocket = socket;
          super.createSocket(req, options, cb);
        }, (err) => {
          this.decrementSockets(name, fakeSocket);
          cb(err);
        });
      }
      createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = void 0;
        if (!socket) {
          throw new Error("No socket was returned in the `connect()` function");
        }
        return socket;
      }
      get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].defaultPort = v;
        }
      }
      get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].protocol = v;
        }
      }
    };
    exports.Agent = Agent3;
  }
});

// node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseProxyResponse = void 0;
    var debug_1 = __importDefault(require_browser());
    var debug3 = (0, debug_1.default)("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read2() {
          const b = socket.read();
          if (b)
            ondata(b);
          else
            socket.once("readable", read2);
        }
        __name(read2, "read");
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("readable", read2);
        }
        __name(cleanup, "cleanup");
        function onend() {
          cleanup();
          debug3("onend");
          reject(new Error("Proxy connection ended before receiving CONNECT response"));
        }
        __name(onend, "onend");
        function onerror(err) {
          cleanup();
          debug3("onerror %o", err);
          reject(err);
        }
        __name(onerror, "onerror");
        function ondata(b) {
          buffers.push(b);
          buffersLength += b.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug3("have not received end of HTTP headers yet...");
            read2();
            return;
          }
          const headerParts = buffered.slice(0, endOfHeaders).toString("ascii").split("\r\n");
          const firstLine = headerParts.shift();
          if (!firstLine) {
            socket.destroy();
            return reject(new Error("No header received from proxy CONNECT response"));
          }
          const firstLineParts = firstLine.split(" ");
          const statusCode = +firstLineParts[1];
          const statusText = firstLineParts.slice(2).join(" ");
          const headers = {};
          for (const header of headerParts) {
            if (!header)
              continue;
            const firstColon = header.indexOf(":");
            if (firstColon === -1) {
              socket.destroy();
              return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
            }
            const key = header.slice(0, firstColon).toLowerCase();
            const value = header.slice(firstColon + 1).trimStart();
            const current = headers[key];
            if (typeof current === "string") {
              headers[key] = [current, value];
            } else if (Array.isArray(current)) {
              current.push(value);
            } else {
              headers[key] = value;
            }
          }
          debug3("got proxy server response: %o %o", firstLine, headers);
          cleanup();
          resolve({
            connect: {
              statusCode,
              statusText,
              headers
            },
            buffered
          });
        }
        __name(ondata, "ondata");
        socket.on("error", onerror);
        socket.on("end", onend);
        read2();
      });
    }
    __name(parseProxyResponse, "parseProxyResponse");
    exports.parseProxyResponse = parseProxyResponse;
  }
});

// node_modules/https-proxy-agent/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/https-proxy-agent/dist/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpsProxyAgent = void 0;
    var net = __importStar(require_net());
    var tls = __importStar(require_tls());
    var assert_1 = __importDefault(require_assert());
    var debug_1 = __importDefault(require_browser());
    var agent_base_1 = require_dist();
    var url_1 = require_url();
    var parse_proxy_response_1 = require_parse_proxy_response();
    var debug3 = (0, debug_1.default)("https-proxy-agent");
    var setServernameFromNonIpHost = /* @__PURE__ */ __name((options) => {
      if (options.servername === void 0 && options.host && !net.isIP(options.host)) {
        return {
          ...options,
          servername: options.host
        };
      }
      return options;
    }, "setServernameFromNonIpHost");
    var HttpsProxyAgent = class extends agent_base_1.Agent {
      static {
        __name(this, "HttpsProxyAgent");
      }
      constructor(proxy, opts) {
        super(opts);
        this.options = { path: void 0 };
        this.proxy = typeof proxy === "string" ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug3("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
        this.connectOpts = {
          // Attempt to negotiate http/1.1 for proxy servers that support http/2
          ALPNProtocols: ["http/1.1"],
          ...opts ? omit(opts, "headers") : null,
          host,
          port
        };
      }
      /**
       * Called when the node-core HTTP client library is creating a
       * new HTTP request.
       */
      async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
          throw new TypeError('No "host" provided');
        }
        let socket;
        if (proxy.protocol === "https:") {
          debug3("Creating `tls.Socket`: %o", this.connectOpts);
          socket = tls.connect(setServernameFromNonIpHost(this.connectOpts));
        } else {
          debug3("Creating `net.Socket`: %o", this.connectOpts);
          socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r
`;
        if (proxy.username || proxy.password) {
          const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
          headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers["Proxy-Connection"]) {
          headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
        }
        for (const name of Object.keys(headers)) {
          payload += `${name}: ${headers[name]}\r
`;
        }
        const proxyResponsePromise = (0, parse_proxy_response_1.parseProxyResponse)(socket);
        socket.write(`${payload}\r
`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit("proxyConnect", connect);
        this.emit("proxyConnect", connect, req);
        if (connect.statusCode === 200) {
          req.once("socket", resume);
          if (opts.secureEndpoint) {
            debug3("Upgrading socket connection to TLS");
            return tls.connect({
              ...omit(setServernameFromNonIpHost(opts), "host", "path", "port"),
              socket
            });
          }
          return socket;
        }
        socket.destroy();
        const fakeSocket = new net.Socket({ writable: false });
        fakeSocket.readable = true;
        req.once("socket", (s) => {
          debug3("Replaying proxy buffer for failed request");
          (0, assert_1.default)(s.listenerCount("data") > 0);
          s.push(buffered);
          s.push(null);
        });
        return fakeSocket;
      }
    };
    HttpsProxyAgent.protocols = ["http", "https"];
    exports.HttpsProxyAgent = HttpsProxyAgent;
    function resume(socket) {
      socket.resume();
    }
    __name(resume, "resume");
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
    __name(omit, "omit");
  }
});

// node_modules/gaxios/build/src/gaxios.js
var require_gaxios = __commonJS({
  "node_modules/gaxios/build/src/gaxios.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _Gaxios_instances;
    var _a;
    var _Gaxios_urlMayUseProxy;
    var _Gaxios_applyRequestInterceptors;
    var _Gaxios_applyResponseInterceptors;
    var _Gaxios_prepareRequest;
    var _Gaxios_proxyAgent;
    var _Gaxios_getProxyAgent;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gaxios = void 0;
    var extend_1 = __importDefault(require_extend());
    var https_1 = require_https();
    var node_fetch_1 = __importDefault(require_node_fetch());
    var querystring_1 = __importDefault(require_querystring());
    var is_stream_1 = __importDefault(require_is_stream());
    var url_1 = require_url();
    var common_1 = require_common();
    var retry_1 = require_retry();
    var stream_1 = require_stream();
    var uuid_1 = require_commonjs_browser();
    var interceptor_1 = require_interceptor();
    var fetch3 = hasFetch() ? window.fetch : node_fetch_1.default;
    function hasWindow() {
      return typeof window !== "undefined" && !!window;
    }
    __name(hasWindow, "hasWindow");
    function hasFetch() {
      return hasWindow() && !!window.fetch;
    }
    __name(hasFetch, "hasFetch");
    function hasBuffer() {
      return typeof Buffer !== "undefined";
    }
    __name(hasBuffer, "hasBuffer");
    function hasHeader(options, header) {
      return !!getHeader(options, header);
    }
    __name(hasHeader, "hasHeader");
    function getHeader(options, header) {
      header = header.toLowerCase();
      for (const key of Object.keys((options === null || options === void 0 ? void 0 : options.headers) || {})) {
        if (header === key.toLowerCase()) {
          return options.headers[key];
        }
      }
      return void 0;
    }
    __name(getHeader, "getHeader");
    var Gaxios = class {
      static {
        __name(this, "Gaxios");
      }
      /**
       * The Gaxios class is responsible for making HTTP requests.
       * @param defaults The default set of options to be used for this instance.
       */
      constructor(defaults) {
        _Gaxios_instances.add(this);
        this.agentCache = /* @__PURE__ */ new Map();
        this.defaults = defaults || {};
        this.interceptors = {
          request: new interceptor_1.GaxiosInterceptorManager(),
          response: new interceptor_1.GaxiosInterceptorManager()
        };
      }
      /**
       * Perform an HTTP request with the given options.
       * @param opts Set of HTTP options that will be used for this HTTP request.
       */
      async request(opts = {}) {
        opts = await __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_prepareRequest).call(this, opts);
        opts = await __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_applyRequestInterceptors).call(this, opts);
        return __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_applyResponseInterceptors).call(this, this._request(opts));
      }
      async _defaultAdapter(opts) {
        const fetchImpl = opts.fetchImplementation || fetch3;
        const res = await fetchImpl(opts.url, opts);
        const data = await this.getResponseData(opts, res);
        return this.translateResponse(opts, res, data);
      }
      /**
       * Internal, retryable version of the `request` method.
       * @param opts Set of HTTP options that will be used for this HTTP request.
       */
      async _request(opts = {}) {
        var _b;
        try {
          let translatedResponse;
          if (opts.adapter) {
            translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
          } else {
            translatedResponse = await this._defaultAdapter(opts);
          }
          if (!opts.validateStatus(translatedResponse.status)) {
            if (opts.responseType === "stream") {
              let response = "";
              await new Promise((resolve) => {
                (translatedResponse === null || translatedResponse === void 0 ? void 0 : translatedResponse.data).on("data", (chunk) => {
                  response += chunk;
                });
                (translatedResponse === null || translatedResponse === void 0 ? void 0 : translatedResponse.data).on("end", resolve);
              });
              translatedResponse.data = response;
            }
            throw new common_1.GaxiosError(`Request failed with status code ${translatedResponse.status}`, opts, translatedResponse);
          }
          return translatedResponse;
        } catch (e) {
          const err = e instanceof common_1.GaxiosError ? e : new common_1.GaxiosError(e.message, opts, void 0, e);
          const { shouldRetry, config: config2 } = await (0, retry_1.getRetryConfig)(err);
          if (shouldRetry && config2) {
            err.config.retryConfig.currentRetryAttempt = config2.retryConfig.currentRetryAttempt;
            opts.retryConfig = (_b = err.config) === null || _b === void 0 ? void 0 : _b.retryConfig;
            return this._request(opts);
          }
          throw err;
        }
      }
      async getResponseData(opts, res) {
        switch (opts.responseType) {
          case "stream":
            return res.body;
          case "json": {
            let data = await res.text();
            try {
              data = JSON.parse(data);
            } catch (_b) {
            }
            return data;
          }
          case "arraybuffer":
            return res.arrayBuffer();
          case "blob":
            return res.blob();
          case "text":
            return res.text();
          default:
            return this.getResponseDataFromContentType(res);
        }
      }
      /**
       * By default, throw for any non-2xx status code
       * @param status status code from the HTTP response
       */
      validateStatus(status) {
        return status >= 200 && status < 300;
      }
      /**
       * Encode a set of key/value pars into a querystring format (?foo=bar&baz=boo)
       * @param params key value pars to encode
       */
      paramsSerializer(params) {
        return querystring_1.default.stringify(params);
      }
      translateResponse(opts, res, data) {
        const headers = {};
        res.headers.forEach((value, key) => {
          headers[key] = value;
        });
        return {
          config: opts,
          data,
          headers,
          status: res.status,
          statusText: res.statusText,
          // XMLHttpRequestLike
          request: {
            responseURL: res.url
          }
        };
      }
      /**
       * Attempts to parse a response by looking at the Content-Type header.
       * @param {FetchResponse} response the HTTP response.
       * @returns {Promise<any>} a promise that resolves to the response data.
       */
      async getResponseDataFromContentType(response) {
        let contentType = response.headers.get("Content-Type");
        if (contentType === null) {
          return response.text();
        }
        contentType = contentType.toLowerCase();
        if (contentType.includes("application/json")) {
          let data = await response.text();
          try {
            data = JSON.parse(data);
          } catch (_b) {
          }
          return data;
        } else if (contentType.match(/^text\//)) {
          return response.text();
        } else {
          return response.blob();
        }
      }
      /**
       * Creates an async generator that yields the pieces of a multipart/related request body.
       * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
       * multipart/related requests are not currently supported.
       *
       * @param {GaxioMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
       * @param {string} boundary the boundary string to be placed between each part.
       */
      async *getMultipartRequest(multipartOptions, boundary) {
        const finale = `--${boundary}--`;
        for (const currentPart of multipartOptions) {
          const partContentType = currentPart.headers["Content-Type"] || "application/octet-stream";
          const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
          yield preamble;
          if (typeof currentPart.content === "string") {
            yield currentPart.content;
          } else {
            yield* currentPart.content;
          }
          yield "\r\n";
        }
        yield finale;
      }
    };
    exports.Gaxios = Gaxios;
    _a = Gaxios, _Gaxios_instances = /* @__PURE__ */ new WeakSet(), _Gaxios_urlMayUseProxy = /* @__PURE__ */ __name(function _Gaxios_urlMayUseProxy2(url, noProxy = []) {
      var _b, _c;
      const candidate = new url_1.URL(url);
      const noProxyList = [...noProxy];
      const noProxyEnvList = ((_c = (_b = process.env.NO_PROXY) !== null && _b !== void 0 ? _b : process.env.no_proxy) === null || _c === void 0 ? void 0 : _c.split(",")) || [];
      for (const rule of noProxyEnvList) {
        noProxyList.push(rule.trim());
      }
      for (const rule of noProxyList) {
        if (rule instanceof RegExp) {
          if (rule.test(candidate.toString())) {
            return false;
          }
        } else if (rule instanceof url_1.URL) {
          if (rule.origin === candidate.origin) {
            return false;
          }
        } else if (rule.startsWith("*.") || rule.startsWith(".")) {
          const cleanedRule = rule.replace(/^\*\./, ".");
          if (candidate.hostname.endsWith(cleanedRule)) {
            return false;
          }
        } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
          return false;
        }
      }
      return true;
    }, "_Gaxios_urlMayUseProxy"), _Gaxios_applyRequestInterceptors = /**
     * Applies the request interceptors. The request interceptors are applied after the
     * call to prepareRequest is completed.
     *
     * @param {GaxiosOptions} options The current set of options.
     *
     * @returns {Promise<GaxiosOptions>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    /* @__PURE__ */ __name(async function _Gaxios_applyRequestInterceptors2(options) {
      let promiseChain = Promise.resolve(options);
      for (const interceptor of this.interceptors.request.values()) {
        if (interceptor) {
          promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
        }
      }
      return promiseChain;
    }, "_Gaxios_applyRequestInterceptors"), _Gaxios_applyResponseInterceptors = /**
     * Applies the response interceptors. The response interceptors are applied after the
     * call to request is made.
     *
     * @param {GaxiosOptions} options The current set of options.
     *
     * @returns {Promise<GaxiosOptions>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    /* @__PURE__ */ __name(async function _Gaxios_applyResponseInterceptors2(response) {
      let promiseChain = Promise.resolve(response);
      for (const interceptor of this.interceptors.response.values()) {
        if (interceptor) {
          promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
        }
      }
      return promiseChain;
    }, "_Gaxios_applyResponseInterceptors"), _Gaxios_prepareRequest = /**
     * Validates the options, merges them with defaults, and prepare request.
     *
     * @param options The original options passed from the client.
     * @returns Prepared options, ready to make a request
     */
    /* @__PURE__ */ __name(async function _Gaxios_prepareRequest2(options) {
      var _b, _c, _d, _e;
      const opts = (0, extend_1.default)(true, {}, this.defaults, options);
      if (!opts.url) {
        throw new Error("URL is required.");
      }
      const baseUrl = opts.baseUrl || opts.baseURL;
      if (baseUrl) {
        opts.url = baseUrl.toString() + opts.url;
      }
      opts.paramsSerializer = opts.paramsSerializer || this.paramsSerializer;
      if (opts.params && Object.keys(opts.params).length > 0) {
        let additionalQueryParams = opts.paramsSerializer(opts.params);
        if (additionalQueryParams.startsWith("?")) {
          additionalQueryParams = additionalQueryParams.slice(1);
        }
        const prefix = opts.url.toString().includes("?") ? "&" : "?";
        opts.url = opts.url + prefix + additionalQueryParams;
      }
      if (typeof options.maxContentLength === "number") {
        opts.size = options.maxContentLength;
      }
      if (typeof options.maxRedirects === "number") {
        opts.follow = options.maxRedirects;
      }
      opts.headers = opts.headers || {};
      if (opts.multipart === void 0 && opts.data) {
        const isFormData = typeof FormData === "undefined" ? false : (opts === null || opts === void 0 ? void 0 : opts.data) instanceof FormData;
        if (is_stream_1.default.readable(opts.data)) {
          opts.body = opts.data;
        } else if (hasBuffer() && Buffer.isBuffer(opts.data)) {
          opts.body = opts.data;
          if (!hasHeader(opts, "Content-Type")) {
            opts.headers["Content-Type"] = "application/json";
          }
        } else if (typeof opts.data === "object") {
          if (!isFormData) {
            if (getHeader(opts, "content-type") === "application/x-www-form-urlencoded") {
              opts.body = opts.paramsSerializer(opts.data);
            } else {
              if (!hasHeader(opts, "Content-Type")) {
                opts.headers["Content-Type"] = "application/json";
              }
              opts.body = JSON.stringify(opts.data);
            }
          }
        } else {
          opts.body = opts.data;
        }
      } else if (opts.multipart && opts.multipart.length > 0) {
        const boundary = (0, uuid_1.v4)();
        opts.headers["Content-Type"] = `multipart/related; boundary=${boundary}`;
        const bodyStream = new stream_1.PassThrough();
        opts.body = bodyStream;
        (0, stream_1.pipeline)(this.getMultipartRequest(opts.multipart, boundary), bodyStream, () => {
        });
      }
      opts.validateStatus = opts.validateStatus || this.validateStatus;
      opts.responseType = opts.responseType || "unknown";
      if (!opts.headers["Accept"] && opts.responseType === "json") {
        opts.headers["Accept"] = "application/json";
      }
      opts.method = opts.method || "GET";
      const proxy = opts.proxy || ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.HTTPS_PROXY) || ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.https_proxy) || ((_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.HTTP_PROXY) || ((_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.http_proxy);
      const urlMayUseProxy = __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_urlMayUseProxy).call(this, opts.url, opts.noProxy);
      if (opts.agent) {
      } else if (proxy && urlMayUseProxy) {
        const HttpsProxyAgent = await __classPrivateFieldGet(_a, _a, "m", _Gaxios_getProxyAgent).call(_a);
        if (this.agentCache.has(proxy)) {
          opts.agent = this.agentCache.get(proxy);
        } else {
          opts.agent = new HttpsProxyAgent(proxy, {
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(proxy, opts.agent);
        }
      } else if (opts.cert && opts.key) {
        if (this.agentCache.has(opts.key)) {
          opts.agent = this.agentCache.get(opts.key);
        } else {
          opts.agent = new https_1.Agent({
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(opts.key, opts.agent);
        }
      }
      if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
        opts.errorRedactor = common_1.defaultErrorRedactor;
      }
      return opts;
    }, "_Gaxios_prepareRequest"), _Gaxios_getProxyAgent = /* @__PURE__ */ __name(async function _Gaxios_getProxyAgent2() {
      __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "f", _Gaxios_proxyAgent) || (await Promise.resolve().then(() => __importStar(require_dist2()))).HttpsProxyAgent, "f", _Gaxios_proxyAgent);
      return __classPrivateFieldGet(this, _a, "f", _Gaxios_proxyAgent);
    }, "_Gaxios_getProxyAgent");
    _Gaxios_proxyAgent = { value: void 0 };
  }
});

// node_modules/gaxios/build/src/index.js
var require_src = __commonJS({
  "node_modules/gaxios/build/src/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request3;
    var gaxios_1 = require_gaxios();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return gaxios_1.Gaxios;
    }, "get") });
    var common_1 = require_common();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return common_1.GaxiosError;
    }, "get") });
    __exportStar(require_interceptor(), exports);
    exports.instance = new gaxios_1.Gaxios();
    async function request3(opts) {
      return exports.instance.request(opts);
    }
    __name(request3, "request");
  }
});

// node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
  "node_modules/bignumber.js/bignumber.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(globalObject) {
      "use strict";
      var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          // non-breaking space
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v, b) {
          var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
          if (!(x instanceof BigNumber2)) return new BigNumber2(v, b);
          if (b == null) {
            if (v && v._isBigNumber === true) {
              x.s = v.s;
              if (!v.c || v.e > MAX_EXP) {
                x.c = x.e = null;
              } else if (v.e < MIN_EXP) {
                x.c = [x.e = 0];
              } else {
                x.e = v.e;
                x.c = v.c.slice();
              }
              return;
            }
            if ((isNum = typeof v == "number") && v * 0 == 0) {
              x.s = 1 / v < 0 ? (v = -v, -1) : 1;
              if (v === ~~v) {
                for (e = 0, i = v; i >= 10; i /= 10, e++) ;
                if (e > MAX_EXP) {
                  x.c = x.e = null;
                } else {
                  x.e = e;
                  x.c = [v];
                }
                return;
              }
              str = String(v);
            } else {
              if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
              x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e < 0) e = i;
              e += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e < 0) {
              e = str.length;
            }
          } else {
            intCheck(b, 2, ALPHABET.length, "Base");
            if (b == 10 && alphabetHasNormalDecimalDigits) {
              x = new BigNumber2(v);
              return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
            }
            str = String(v);
            if (isNum = typeof v == "number") {
              if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
              x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v);
              }
            } else {
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet = ALPHABET.slice(0, b);
            e = i = 0;
            for (len = str.length; i < len; i++) {
              if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e) {
                    e = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e = 0;
                    continue;
                  }
                }
                return parseNumeric(x, String(v), isNum, b);
              }
            }
            isNum = false;
            str = convertBase(str, b, 10, x.s);
            if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
            else e = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++) ;
          for (len = str.length; str.charCodeAt(--len) === 48; ) ;
          if (str = str.slice(i, ++len)) {
            len -= i;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
              throw Error(tooManyDigits + x.s * v);
            }
            if ((e = e - i - 1) > MAX_EXP) {
              x.c = x.e = null;
            } else if (e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = e;
              x.c = [];
              i = (e + 1) % LOG_BASE;
              if (e < 0) i += LOG_BASE;
              if (i < len) {
                if (i) x.c.push(+str.slice(0, i));
                for (len -= LOG_BASE; i < len; ) {
                  x.c.push(+str.slice(i, i += LOG_BASE));
                }
                i = LOG_BASE - (str = str.slice(i)).length;
              } else {
                i -= len;
              }
              for (; i--; str += "0") ;
              x.c.push(+str);
            }
          } else {
            x.c = [x.e = 0];
          }
        }
        __name(BigNumber2, "BigNumber");
        BigNumber2.clone = clone;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                DECIMAL_PLACES = v;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v = obj[p];
                intCheck(v, 0, 8, p);
                ROUNDING_MODE = v;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, 0, p);
                  intCheck(v[1], 0, MAX, p);
                  TO_EXP_NEG = v[0];
                  TO_EXP_POS = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, -1, p);
                  intCheck(v[1], 1, MAX, p);
                  MIN_EXP = v[0];
                  MAX_EXP = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  if (v) {
                    MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v = obj[p];
                if (v === !!v) {
                  if (v) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v;
                    } else {
                      CRYPTO = !v;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v = obj[p];
                intCheck(v, 0, 9, p);
                MODULO_MODE = v;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                POW_PRECISION = v;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v = obj[p];
                if (typeof v == "object") FORMAT = v;
                else throw Error(bignumberError + p + " not an object: " + v);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v = obj[p];
                if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                  alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
                  ALPHABET = v;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v) {
          if (!v || v._isBigNumber !== true) return false;
          if (!BigNumber2.DEBUG) return true;
          var i, n, c = v.c, e = v.e, s = v.s;
          out: if ({}.toString.call(c) == "[object Array]") {
            if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
              if (c[0] === 0) {
                if (e === 0 && c.length === 1) return true;
                break out;
              }
              i = (e + 1) % LOG_BASE;
              if (i < 1) i += LOG_BASE;
              if (String(c[0]).length == i) {
                for (i = 0; i < c.length; i++) {
                  n = c[i];
                  if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
                }
                if (n !== 0) return true;
              }
            }
          } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
            return true;
          }
          throw Error(bignumberError + "Invalid BigNumber: " + v);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, -1);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, 1);
        };
        BigNumber2.random = (function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
            if (dp == null) dp = DECIMAL_PLACES;
            else intCheck(dp, 0, MAX);
            k = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k *= 2));
                for (; i < k; ) {
                  v = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v >= 9e15) {
                    b = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b[0];
                    a[i + 1] = b[1];
                  } else {
                    c.push(v % 1e14);
                    i += 2;
                  }
                }
                i = k / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k *= 7);
                for (; i < k; ) {
                  v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v % 1e14);
                    i += 7;
                  }
                }
                i = k / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k; ) {
                v = random53bitInt();
                if (v < 9e15) c[i++] = v % 1e14;
              }
            }
            k = c[--i];
            dp %= LOG_BASE;
            if (k && dp) {
              v = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k / v) * v;
            }
            for (; c[i] === 0; c.pop(), i--) ;
            if (i < 0) {
              c = [e = 0];
            } else {
              for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
              for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
              if (i < LOG_BASE) e -= LOG_BASE - i;
            }
            rand.e = e;
            rand.c = c;
            return rand;
          };
        })();
        BigNumber2.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i < args.length; ) sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = /* @__PURE__ */ (function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet) {
            var j, arr = [0], arrL, i = 0, len = str.length;
            for (; i < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
              arr[0] += alphabet.indexOf(str.charAt(i++));
              for (j = 0; j < arr.length; j++) {
                if (arr[j] > baseOut - 1) {
                  if (arr[j + 1] == null) arr[j + 1] = 0;
                  arr[j + 1] += arr[j] / baseOut | 0;
                  arr[j] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          __name(toBaseOut, "toBaseOut");
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm3 = ROUNDING_MODE;
            if (i >= 0) {
              k = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber2(baseIn);
              x = y.pow(str.length - i);
              POW_PRECISION = k;
              y.c = toBaseOut(
                toFixedPoint(coeffToString(x.c), x.e, "0"),
                10,
                baseOut,
                decimal
              );
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
            e = k = xc.length;
            for (; xc[--k] == 0; xc.pop()) ;
            if (!xc[0]) return alphabet.charAt(0);
            if (i < 0) {
              --e;
            } else {
              x.c = xc;
              x.e = e;
              x.s = sign;
              x = div(x, y, dp, rm3, baseOut);
              xc = x.c;
              r = x.r;
              e = x.e;
            }
            d = e + dp + 1;
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;
            r = rm3 < 4 ? (i != null || r) && (rm3 == 0 || rm3 == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm3 == 4 || r || rm3 == 6 && xc[d - 1] & 1 || rm3 == (x.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
            } else {
              xc.length = d;
              if (r) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k = xc.length; !xc[--k]; ) ;
              for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++])) ;
              str = toFixedPoint(str, e, alphabet.charAt(0));
            }
            return str;
          };
        })();
        div = /* @__PURE__ */ (function() {
          function multiply(x, k, base) {
            var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
            for (x = x.slice(); i--; ) {
              xlo = x[i] % SQRT_BASE;
              xhi = x[i] / SQRT_BASE | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
              x[i] = temp % base;
            }
            if (carry) x = [carry].concat(x);
            return x;
          }
          __name(multiply, "multiply");
          function compare2(a, b, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  cmp = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          __name(compare2, "compare");
          function subtract(a, b, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
          }
          __name(subtract, "subtract");
          return function(x, y, dp, rm3, base) {
            var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                // Return NaN if either NaN, or both Infinity or 0.
                !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                  // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                  xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                )
              );
            }
            q = new BigNumber2(s);
            qc = q.c = [];
            e = x.e - y.e;
            s = dp + e + 1;
            if (!base) {
              base = BASE;
              e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++) ;
            if (yc[i] > (xc[i] || 0)) e--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0) ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2) yc0++;
              do {
                n = 0;
                cmp = compare2(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base) n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare2(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL) prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare2(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0]) qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
              round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm3, more);
            } else {
              q.e = e;
              q.r = +more;
            }
            return q;
          };
        })();
        function format(n, i, rm3, id) {
          var c0, e, ne, len, str;
          if (rm3 == null) rm3 = ROUNDING_MODE;
          else intCheck(rm3, 0, 8);
          if (!n.c) return n.toString();
          c0 = n.c[0];
          ne = n.e;
          if (i == null) {
            str = coeffToString(n.c);
            str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
          } else {
            n = round(new BigNumber2(n), i, rm3);
            e = n.e;
            str = coeffToString(n.c);
            len = str.length;
            if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
              for (; len < i; str += "0", len++) ;
              str = toExponential(str, e);
            } else {
              i -= ne + (id === 2 && e > ne);
              str = toFixedPoint(str, e, "0");
              if (e + 1 > len) {
                if (--i > 0) for (str += "."; i--; str += "0") ;
              } else {
                i += e - len;
                if (i > 0) {
                  if (e + 1 == len) str += ".";
                  for (; i--; str += "0") ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        __name(format, "format");
        function maxOrMin(args, n) {
          var k, y, i = 1, x = new BigNumber2(args[0]);
          for (; i < args.length; i++) {
            y = new BigNumber2(args[i]);
            if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
              x = y;
            }
          }
          return x;
        }
        __name(maxOrMin, "maxOrMin");
        function normalise(n, c, e) {
          var i = 1, j = c.length;
          for (; !c[--j]; c.pop()) ;
          for (j = c[0]; j >= 10; j /= 10, i++) ;
          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }
          return n;
        }
        __name(normalise, "normalise");
        parseNumeric = /* @__PURE__ */ (function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x, str, isNum, b) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b || b == base ? p1 : m;
                });
                if (b) {
                  base = b;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s) return new BigNumber2(s, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
              }
              x.s = null;
            }
            x.c = x.e = null;
          };
        })();
        function round(x, sd, rm3, r) {
          var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
              i = sd - d;
              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                n = xc[ni = 0];
                rd = mathfloor(n / pows10[d - j - 1] % 10);
              } else {
                ni = mathceil((i + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0)) ;
                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k = xc[ni];
                  for (d = 1; k >= 10; k /= 10, d++) ;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + d;
                  rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
                }
              }
              r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
              r = rm3 < 4 ? (rd || r) && (rm3 == 0 || rm3 == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm3 == 4 || r || rm3 == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm3 == (x.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x.e = -sd || 0;
                } else {
                  xc[0] = x.e = 0;
                }
                return x;
              }
              if (i == 0) {
                xc.length = ni;
                k = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k = pows10[LOG_BASE - i];
                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
                    j = xc[0] += k;
                    for (k = 1; j >= 10; j /= 10, k++) ;
                    if (i != k) {
                      x.e++;
                      if (xc[0] == BASE) xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k;
                    if (xc[ni] != BASE) break;
                    xc[ni--] = 0;
                    k = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop()) ;
            }
            if (x.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (x.e < MIN_EXP) {
              x.c = [x.e = 0];
            }
          }
          return x;
        }
        __name(round, "round");
        function valueOf(n) {
          var str, e = n.e;
          if (e === null) return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
          return n.s < 0 ? "-" + str : str;
        }
        __name(valueOf, "valueOf");
        P.absoluteValue = P.abs = function() {
          var x = new BigNumber2(this);
          if (x.s < 0) x.s = 1;
          return x;
        };
        P.comparedTo = function(y, b) {
          return compare(this, new BigNumber2(y, b));
        };
        P.decimalPlaces = P.dp = function(dp, rm3) {
          var c, n, v, x = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm3 == null) rm3 = ROUNDING_MODE;
            else intCheck(rm3, 0, 8);
            return round(new BigNumber2(x), dp + x.e + 1, rm3);
          }
          if (!(c = x.c)) return null;
          n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
          if (n < 0) n = 0;
          return n;
        };
        P.dividedBy = P.div = function(y, b) {
          return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P.dividedToIntegerBy = P.idiv = function(y, b) {
          return div(this, new BigNumber2(y, b), 0, 1);
        };
        P.exponentiatedBy = P.pow = function(n, m) {
          var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
          n = new BigNumber2(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
          }
          if (m != null) m = new BigNumber2(m);
          nIsBig = n.e > 14;
          if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
            return m ? y.mod(m) : y;
          }
          nIsNeg = n.s < 0;
          if (m) {
            if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
            isModExp = !nIsNeg && x.isInteger() && m.isInteger();
            if (isModExp) x = x.mod(m);
          } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
            k = x.s < 0 && isOdd(n) ? -0 : 0;
            if (x.e > -1) k = 1 / k;
            return new BigNumber2(nIsNeg ? 1 / k : k);
          } else if (POW_PRECISION) {
            k = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg) n.s = 1;
            nIsOdd = isOdd(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x);
              if (!y.c) break;
              if (k) {
                if (y.c.length > k) y.c.length = k;
              } else if (isModExp) {
                y = y.mod(m);
              }
            }
            if (i) {
              i = mathfloor(i / 2);
              if (i === 0) break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd(n);
              } else {
                i = +valueOf(n);
                if (i === 0) break;
                nIsOdd = i % 2;
              }
            }
            x = x.times(x);
            if (k) {
              if (x.c && x.c.length > k) x.c.length = k;
            } else if (isModExp) {
              x = x.mod(m);
            }
          }
          if (isModExp) return y;
          if (nIsNeg) y = ONE.div(y);
          return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P.integerValue = function(rm3) {
          var n = new BigNumber2(this);
          if (rm3 == null) rm3 = ROUNDING_MODE;
          else intCheck(rm3, 0, 8);
          return round(n, n.e + 1, rm3);
        };
        P.isEqualTo = P.eq = function(y, b) {
          return compare(this, new BigNumber2(y, b)) === 0;
        };
        P.isFinite = function() {
          return !!this.c;
        };
        P.isGreaterThan = P.gt = function(y, b) {
          return compare(this, new BigNumber2(y, b)) > 0;
        };
        P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
          return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
        };
        P.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P.isLessThan = P.lt = function(y, b) {
          return compare(this, new BigNumber2(y, b)) < 0;
        };
        P.isLessThanOrEqualTo = P.lte = function(y, b) {
          return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = function() {
          return this.s < 0;
        };
        P.isPositive = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P.minus = function(y, b) {
          var i, j, t, xLTy, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b) return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.plus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
                // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                ROUNDING_MODE == 3 ? -0 : 0
              ));
            }
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b = a; b--; t.push(0)) ;
            t.reverse();
          } else {
            j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
            for (a = b = 0; b < j; b++) {
              if (xc[b] != yc[b]) {
                xLTy = xc[b] < yc[b];
                break;
              }
            }
          }
          if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
          }
          b = (j = yc.length) - (i = xc.length);
          if (b > 0) for (; b--; xc[i++] = 0) ;
          b = BASE - 1;
          for (; j > a; ) {
            if (xc[--j] < yc[j]) {
              for (i = j; i && !xc[--i]; xc[i] = b) ;
              --xc[i];
              xc[j] += BASE;
            }
            xc[j] -= yc[j];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P.modulo = P.mod = function(y, b) {
          var q, s, x = this;
          y = new BigNumber2(y, b);
          if (!x.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y.c || x.c && !x.c[0]) {
            return new BigNumber2(x);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q = div(x, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div(x, y, 0, MODULO_MODE);
          }
          y = x.minus(q.times(y));
          if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
          return y;
        };
        P.multipliedBy = P.times = function(y, b) {
          var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i = xcL;
            xcL = ycL;
            ycL = i;
          }
          for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k = xcL, j = i + k; j > i; ) {
              xlo = xc[--k] % sqrtBase;
              xhi = xc[k] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j--] = xlo % base;
            }
            zc[j] = c;
          }
          if (c) {
            ++e;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e);
        };
        P.negated = function() {
          var x = new BigNumber2(this);
          x.s = -x.s || null;
          return x;
        };
        P.plus = function(y, b) {
          var t, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b) return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.minus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc) return new BigNumber2(a / 0);
            if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0)) ;
            t.reverse();
          }
          a = xc.length;
          b = yc.length;
          if (a - b < 0) {
            t = yc;
            yc = xc;
            xc = t;
            b = a;
          }
          for (a = 0; b; ) {
            a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
            xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P.precision = P.sd = function(sd, rm3) {
          var c, n, v, x = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm3 == null) rm3 = ROUNDING_MODE;
            else intCheck(rm3, 0, 8);
            return round(new BigNumber2(x), sd, rm3);
          }
          if (!(c = x.c)) return null;
          v = c.length - 1;
          n = v * LOG_BASE + 1;
          if (v = c[v]) {
            for (; v % 10 == 0; v /= 10, n--) ;
            for (v = c[0]; v >= 10; v /= 10, n++) ;
          }
          if (sd && x.e + 1 > n) n = x.e + 1;
          return n;
        };
        P.shiftedBy = function(k) {
          intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k);
        };
        P.squareRoot = P.sqrt = function() {
          var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0) n += "0";
            s = Math.sqrt(+n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
            if (s == 1 / 0) {
              n = "5e" + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e;
            }
            r = new BigNumber2(n);
          } else {
            r = new BigNumber2(s + "");
          }
          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3) s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div(x, t, dp, 1)));
              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                if (r.e < e) --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        P.toExponential = function(dp, rm3) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm3, 1);
        };
        P.toFixed = function(dp, rm3) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm3);
        };
        P.toFormat = function(dp, rm3, format2) {
          var str, x = this;
          if (format2 == null) {
            if (dp != null && rm3 && typeof rm3 == "object") {
              format2 = rm3;
              rm3 = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm3 = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x.toFixed(dp, rm3);
          if (x.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i = g1;
              g1 = g2;
              g2 = i;
              len -= i;
            }
            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
              if (isNeg) intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P.toFraction = function(md) {
          var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
          if (md != null) {
            n = new BigNumber2(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc) return new BigNumber2(x);
          d = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s = coeffToString(xc);
          e = d.e = s.length - x.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber2(s);
          n0.c[0] = 0;
          for (; ; ) {
            q = div(n, d, 0, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.comparedTo(md) == 1) break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q.times(d2 = n1));
            n0 = d2;
            d = n.minus(q.times(d2 = d));
            n = d2;
          }
          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          e = e * 2;
          r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
            div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P.toNumber = function() {
          return +valueOf(this);
        };
        P.toPrecision = function(sd, rm3) {
          if (sd != null) intCheck(sd, 1, MAX);
          return format(this, sd, rm3, 2);
        };
        P.toString = function(b) {
          var str, n = this, s = n.s, e = n.e;
          if (e === null) {
            if (s) {
              str = "Infinity";
              if (s < 0) str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b == null) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
            } else if (b === 10 && alphabetHasNormalDecimalDigits) {
              n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n.c), n.e, "0");
            } else {
              intCheck(b, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
            }
            if (s < 0 && n.c[0]) str = "-" + str;
          }
          return str;
        };
        P.valueOf = P.toJSON = function() {
          return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null) BigNumber2.set(configObject);
        return BigNumber2;
      }
      __name(clone, "clone");
      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      __name(bitFloor, "bitFloor");
      function coeffToString(a) {
        var s, z, i = 1, j = a.length, r = a[0] + "";
        for (; i < j; ) {
          s = a[i++] + "";
          z = LOG_BASE - s.length;
          for (; z--; s = "0" + s) ;
          r += s;
        }
        for (j = r.length; r.charCodeAt(--j) === 48; ) ;
        return r.slice(0, j + 1 || 1);
      }
      __name(coeffToString, "coeffToString");
      function compare(x, y) {
        var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
        if (!i || !j) return null;
        a = xc && !xc[0];
        b = yc && !yc[0];
        if (a || b) return a ? b ? 0 : -j : i;
        if (i != j) return i;
        a = i < 0;
        b = k == l;
        if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
        if (!b) return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
        return k == l ? 0 : k > l ^ a ? 1 : -1;
      }
      __name(compare, "compare");
      function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      __name(intCheck, "intCheck");
      function isOdd(n) {
        var k = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
      }
      __name(isOdd, "isOdd");
      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
      }
      __name(toExponential, "toExponential");
      function toFixedPoint(str, e, z) {
        var len, zs;
        if (e < 0) {
          for (zs = z + "."; ++e; zs += z) ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e > len) {
            for (zs = z, e -= len; --e; zs += z) ;
            str += zs;
          } else if (e < len) {
            str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        return str;
      }
      __name(toFixedPoint, "toFixedPoint");
      BigNumber = clone();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(exports);
  }
});

// node_modules/json-bigint/lib/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/json-bigint/lib/stringify.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BigNumber = require_bignumber();
    var JSON2 = module.exports;
    (function() {
      "use strict";
      function f(n) {
        return n < 10 ? "0" + n : n;
      }
      __name(f, "f");
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        // table of character substitutions
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      }, rep;
      function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
          var c = meta[a];
          return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
      }
      __name(quote, "quote");
      function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key], isBigNumber = value != null && (value instanceof BigNumber || BigNumber.isBigNumber(value));
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        if (typeof rep === "function") {
          value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            if (isBigNumber) {
              return value;
            } else {
              return quote(value);
            }
          case "number":
            return isFinite(value) ? String(value) : "null";
          case "boolean":
          case "null":
          case "bigint":
            return String(value);
          // If the type is 'object', we might be dealing with an object or an array or
          // null.
          case "object":
            if (!value) {
              return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
              length = value.length;
              for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || "null";
              }
              v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
              gap = mind;
              return v;
            }
            if (rep && typeof rep === "object") {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                if (typeof rep[i] === "string") {
                  k = rep[i];
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                  }
                }
              }
            } else {
              Object.keys(value).forEach(function(k2) {
                var v2 = str(k2, value);
                if (v2) {
                  partial.push(quote(k2) + (gap ? ": " : ":") + v2);
                }
              });
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
      }
      __name(str, "str");
      if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function(value, replacer, space) {
          var i;
          gap = "";
          indent = "";
          if (typeof space === "number") {
            for (i = 0; i < space; i += 1) {
              indent += " ";
            }
          } else if (typeof space === "string") {
            indent = space;
          }
          rep = replacer;
          if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
            throw new Error("JSON.stringify");
          }
          return str("", { "": value });
        };
      }
    })();
  }
});

// node_modules/json-bigint/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/json-bigint/lib/parse.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BigNumber = null;
    var suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/;
    var suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;
    var json_parse = /* @__PURE__ */ __name(function(options) {
      "use strict";
      var _options = {
        strict: false,
        // not being strict means do not generate syntax errors for "duplicate key"
        storeAsString: false,
        // toggles whether the values should be stored as BigNumber (default) or a string
        alwaysParseAsBig: false,
        // toggles whether all numbers should be Big
        useNativeBigInt: false,
        // toggles whether to use native BigInt instead of bignumber.js
        protoAction: "error",
        constructorAction: "error"
      };
      if (options !== void 0 && options !== null) {
        if (options.strict === true) {
          _options.strict = true;
        }
        if (options.storeAsString === true) {
          _options.storeAsString = true;
        }
        _options.alwaysParseAsBig = options.alwaysParseAsBig === true ? options.alwaysParseAsBig : false;
        _options.useNativeBigInt = options.useNativeBigInt === true ? options.useNativeBigInt : false;
        if (typeof options.constructorAction !== "undefined") {
          if (options.constructorAction === "error" || options.constructorAction === "ignore" || options.constructorAction === "preserve") {
            _options.constructorAction = options.constructorAction;
          } else {
            throw new Error(
              `Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${options.constructorAction}`
            );
          }
        }
        if (typeof options.protoAction !== "undefined") {
          if (options.protoAction === "error" || options.protoAction === "ignore" || options.protoAction === "preserve") {
            _options.protoAction = options.protoAction;
          } else {
            throw new Error(
              `Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${options.protoAction}`
            );
          }
        }
      }
      var at, ch, escapee = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "	"
      }, text, error3 = /* @__PURE__ */ __name(function(m) {
        throw {
          name: "SyntaxError",
          message: m,
          at,
          text
        };
      }, "error"), next = /* @__PURE__ */ __name(function(c) {
        if (c && c !== ch) {
          error3("Expected '" + c + "' instead of '" + ch + "'");
        }
        ch = text.charAt(at);
        at += 1;
        return ch;
      }, "next"), number = /* @__PURE__ */ __name(function() {
        var number2, string2 = "";
        if (ch === "-") {
          string2 = "-";
          next("-");
        }
        while (ch >= "0" && ch <= "9") {
          string2 += ch;
          next();
        }
        if (ch === ".") {
          string2 += ".";
          while (next() && ch >= "0" && ch <= "9") {
            string2 += ch;
          }
        }
        if (ch === "e" || ch === "E") {
          string2 += ch;
          next();
          if (ch === "-" || ch === "+") {
            string2 += ch;
            next();
          }
          while (ch >= "0" && ch <= "9") {
            string2 += ch;
            next();
          }
        }
        number2 = +string2;
        if (!isFinite(number2)) {
          error3("Bad number");
        } else {
          if (BigNumber == null) BigNumber = require_bignumber();
          if (string2.length > 15)
            return _options.storeAsString ? string2 : _options.useNativeBigInt ? BigInt(string2) : new BigNumber(string2);
          else
            return !_options.alwaysParseAsBig ? number2 : _options.useNativeBigInt ? BigInt(number2) : new BigNumber(number2);
        }
      }, "number"), string = /* @__PURE__ */ __name(function() {
        var hex, i, string2 = "", uffff;
        if (ch === '"') {
          var startAt = at;
          while (next()) {
            if (ch === '"') {
              if (at - 1 > startAt) string2 += text.substring(startAt, at - 1);
              next();
              return string2;
            }
            if (ch === "\\") {
              if (at - 1 > startAt) string2 += text.substring(startAt, at - 1);
              next();
              if (ch === "u") {
                uffff = 0;
                for (i = 0; i < 4; i += 1) {
                  hex = parseInt(next(), 16);
                  if (!isFinite(hex)) {
                    break;
                  }
                  uffff = uffff * 16 + hex;
                }
                string2 += String.fromCharCode(uffff);
              } else if (typeof escapee[ch] === "string") {
                string2 += escapee[ch];
              } else {
                break;
              }
              startAt = at;
            }
          }
        }
        error3("Bad string");
      }, "string"), white = /* @__PURE__ */ __name(function() {
        while (ch && ch <= " ") {
          next();
        }
      }, "white"), word = /* @__PURE__ */ __name(function() {
        switch (ch) {
          case "t":
            next("t");
            next("r");
            next("u");
            next("e");
            return true;
          case "f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return false;
          case "n":
            next("n");
            next("u");
            next("l");
            next("l");
            return null;
        }
        error3("Unexpected '" + ch + "'");
      }, "word"), value, array = /* @__PURE__ */ __name(function() {
        var array2 = [];
        if (ch === "[") {
          next("[");
          white();
          if (ch === "]") {
            next("]");
            return array2;
          }
          while (ch) {
            array2.push(value());
            white();
            if (ch === "]") {
              next("]");
              return array2;
            }
            next(",");
            white();
          }
        }
        error3("Bad array");
      }, "array"), object = /* @__PURE__ */ __name(function() {
        var key, object2 = /* @__PURE__ */ Object.create(null);
        if (ch === "{") {
          next("{");
          white();
          if (ch === "}") {
            next("}");
            return object2;
          }
          while (ch) {
            key = string();
            white();
            next(":");
            if (_options.strict === true && Object.hasOwnProperty.call(object2, key)) {
              error3('Duplicate key "' + key + '"');
            }
            if (suspectProtoRx.test(key) === true) {
              if (_options.protoAction === "error") {
                error3("Object contains forbidden prototype property");
              } else if (_options.protoAction === "ignore") {
                value();
              } else {
                object2[key] = value();
              }
            } else if (suspectConstructorRx.test(key) === true) {
              if (_options.constructorAction === "error") {
                error3("Object contains forbidden constructor property");
              } else if (_options.constructorAction === "ignore") {
                value();
              } else {
                object2[key] = value();
              }
            } else {
              object2[key] = value();
            }
            white();
            if (ch === "}") {
              next("}");
              return object2;
            }
            next(",");
            white();
          }
        }
        error3("Bad object");
      }, "object");
      value = /* @__PURE__ */ __name(function() {
        white();
        switch (ch) {
          case "{":
            return object();
          case "[":
            return array();
          case '"':
            return string();
          case "-":
            return number();
          default:
            return ch >= "0" && ch <= "9" ? number() : word();
        }
      }, "value");
      return function(source, reviver) {
        var result;
        text = source + "";
        at = 0;
        ch = " ";
        result = value();
        white();
        if (ch) {
          error3("Syntax error");
        }
        return typeof reviver === "function" ? (/* @__PURE__ */ __name((function walk(holder, key) {
          var k, v, value2 = holder[key];
          if (value2 && typeof value2 === "object") {
            Object.keys(value2).forEach(function(k2) {
              v = walk(value2, k2);
              if (v !== void 0) {
                value2[k2] = v;
              } else {
                delete value2[k2];
              }
            });
          }
          return reviver.call(holder, key, value2);
        }), "walk"))({ "": result }, "") : result;
      };
    }, "json_parse");
    module.exports = json_parse;
  }
});

// node_modules/json-bigint/index.js
var require_json_bigint = __commonJS({
  "node_modules/json-bigint/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var json_stringify = require_stringify2().stringify;
    var json_parse = require_parse2();
    module.exports = function(options) {
      return {
        parse: json_parse(options),
        stringify: json_stringify
      };
    };
    module.exports.parse = json_parse();
    module.exports.stringify = json_stringify;
  }
});

// node_modules/gcp-metadata/build/src/gcp-residency.js
var require_gcp_residency = __commonJS({
  "node_modules/gcp-metadata/build/src/gcp-residency.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GCE_LINUX_BIOS_PATHS = void 0;
    exports.isGoogleCloudServerless = isGoogleCloudServerless;
    exports.isGoogleComputeEngineLinux = isGoogleComputeEngineLinux;
    exports.isGoogleComputeEngineMACAddress = isGoogleComputeEngineMACAddress;
    exports.isGoogleComputeEngine = isGoogleComputeEngine;
    exports.detectGCPResidency = detectGCPResidency;
    var fs_1 = require_fs();
    var os_1 = require_os();
    exports.GCE_LINUX_BIOS_PATHS = {
      BIOS_DATE: "/sys/class/dmi/id/bios_date",
      BIOS_VENDOR: "/sys/class/dmi/id/bios_vendor"
    };
    var GCE_MAC_ADDRESS_REGEX = /^42:01/;
    function isGoogleCloudServerless() {
      const isGFEnvironment = process.env.CLOUD_RUN_JOB || process.env.FUNCTION_NAME || process.env.K_SERVICE;
      return !!isGFEnvironment;
    }
    __name(isGoogleCloudServerless, "isGoogleCloudServerless");
    function isGoogleComputeEngineLinux() {
      if ((0, os_1.platform)() !== "linux")
        return false;
      try {
        (0, fs_1.statSync)(exports.GCE_LINUX_BIOS_PATHS.BIOS_DATE);
        const biosVendor = (0, fs_1.readFileSync)(exports.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");
        return /Google/.test(biosVendor);
      } catch (_a) {
        return false;
      }
    }
    __name(isGoogleComputeEngineLinux, "isGoogleComputeEngineLinux");
    function isGoogleComputeEngineMACAddress() {
      const interfaces = (0, os_1.networkInterfaces)();
      for (const item of Object.values(interfaces)) {
        if (!item)
          continue;
        for (const { mac } of item) {
          if (GCE_MAC_ADDRESS_REGEX.test(mac)) {
            return true;
          }
        }
      }
      return false;
    }
    __name(isGoogleComputeEngineMACAddress, "isGoogleComputeEngineMACAddress");
    function isGoogleComputeEngine() {
      return isGoogleComputeEngineLinux() || isGoogleComputeEngineMACAddress();
    }
    __name(isGoogleComputeEngine, "isGoogleComputeEngine");
    function detectGCPResidency() {
      return isGoogleCloudServerless() || isGoogleComputeEngine();
    }
    __name(detectGCPResidency, "detectGCPResidency");
  }
});

// node-built-in-modules:node:events
import libDefault9 from "node:events";
var require_node_events = __commonJS({
  "node-built-in-modules:node:events"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault9;
  }
});

// node-built-in-modules:node:process
var require_node_process = __commonJS({
  "node-built-in-modules:node:process"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_process2();
    module.exports = process_default;
  }
});

// node-built-in-modules:node:util
import libDefault10 from "node:util";
var require_node_util = __commonJS({
  "node-built-in-modules:node:util"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault10;
  }
});

// node_modules/google-logging-utils/build/src/colours.js
var require_colours = __commonJS({
  "node_modules/google-logging-utils/build/src/colours.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Colours = void 0;
    var Colours = class _Colours {
      static {
        __name(this, "Colours");
      }
      /**
       * @param stream The stream (e.g. process.stderr)
       * @returns true if the stream should have colourization enabled
       */
      static isEnabled(stream) {
        return stream.isTTY && (typeof stream.getColorDepth === "function" ? stream.getColorDepth() > 2 : true);
      }
      static refresh() {
        _Colours.enabled = _Colours.isEnabled(process.stderr);
        if (!this.enabled) {
          _Colours.reset = "";
          _Colours.bright = "";
          _Colours.dim = "";
          _Colours.red = "";
          _Colours.green = "";
          _Colours.yellow = "";
          _Colours.blue = "";
          _Colours.magenta = "";
          _Colours.cyan = "";
          _Colours.white = "";
          _Colours.grey = "";
        } else {
          _Colours.reset = "\x1B[0m";
          _Colours.bright = "\x1B[1m";
          _Colours.dim = "\x1B[2m";
          _Colours.red = "\x1B[31m";
          _Colours.green = "\x1B[32m";
          _Colours.yellow = "\x1B[33m";
          _Colours.blue = "\x1B[34m";
          _Colours.magenta = "\x1B[35m";
          _Colours.cyan = "\x1B[36m";
          _Colours.white = "\x1B[37m";
          _Colours.grey = "\x1B[90m";
        }
      }
    };
    exports.Colours = Colours;
    Colours.enabled = false;
    Colours.reset = "";
    Colours.bright = "";
    Colours.dim = "";
    Colours.red = "";
    Colours.green = "";
    Colours.yellow = "";
    Colours.blue = "";
    Colours.magenta = "";
    Colours.cyan = "";
    Colours.white = "";
    Colours.grey = "";
    Colours.refresh();
  }
});

// node_modules/google-logging-utils/build/src/logging-utils.js
var require_logging_utils = __commonJS({
  "node_modules/google-logging-utils/build/src/logging-utils.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.env = exports.DebugLogBackendBase = exports.placeholder = exports.AdhocDebugLogger = exports.LogSeverity = void 0;
    exports.getNodeBackend = getNodeBackend;
    exports.getDebugBackend = getDebugBackend;
    exports.getStructuredBackend = getStructuredBackend;
    exports.setBackend = setBackend;
    exports.log = log3;
    var node_events_1 = require_node_events();
    var process2 = __importStar(require_node_process());
    var util = __importStar(require_node_util());
    var colours_1 = require_colours();
    var LogSeverity;
    (function(LogSeverity2) {
      LogSeverity2["DEFAULT"] = "DEFAULT";
      LogSeverity2["DEBUG"] = "DEBUG";
      LogSeverity2["INFO"] = "INFO";
      LogSeverity2["WARNING"] = "WARNING";
      LogSeverity2["ERROR"] = "ERROR";
    })(LogSeverity || (exports.LogSeverity = LogSeverity = {}));
    var AdhocDebugLogger = class extends node_events_1.EventEmitter {
      static {
        __name(this, "AdhocDebugLogger");
      }
      /**
       * @param upstream The backend will pass a function that will be
       *   called whenever our logger function is invoked.
       */
      constructor(namespace, upstream) {
        super();
        this.namespace = namespace;
        this.upstream = upstream;
        this.func = Object.assign(this.invoke.bind(this), {
          // Also add an instance pointer back to us.
          instance: this,
          // And pull over the EventEmitter functionality.
          on: /* @__PURE__ */ __name((event, listener) => this.on(event, listener), "on")
        });
        this.func.debug = (...args) => this.invokeSeverity(LogSeverity.DEBUG, ...args);
        this.func.info = (...args) => this.invokeSeverity(LogSeverity.INFO, ...args);
        this.func.warn = (...args) => this.invokeSeverity(LogSeverity.WARNING, ...args);
        this.func.error = (...args) => this.invokeSeverity(LogSeverity.ERROR, ...args);
        this.func.sublog = (namespace2) => log3(namespace2, this.func);
      }
      invoke(fields, ...args) {
        if (this.upstream) {
          this.upstream(fields, ...args);
        }
        this.emit("log", fields, args);
      }
      invokeSeverity(severity, ...args) {
        this.invoke({ severity }, ...args);
      }
    };
    exports.AdhocDebugLogger = AdhocDebugLogger;
    exports.placeholder = new AdhocDebugLogger("", () => {
    }).func;
    var DebugLogBackendBase = class {
      static {
        __name(this, "DebugLogBackendBase");
      }
      constructor() {
        var _a;
        this.cached = /* @__PURE__ */ new Map();
        this.filters = [];
        this.filtersSet = false;
        let nodeFlag = (_a = process2.env[exports.env.nodeEnables]) !== null && _a !== void 0 ? _a : "*";
        if (nodeFlag === "all") {
          nodeFlag = "*";
        }
        this.filters = nodeFlag.split(",");
      }
      log(namespace, fields, ...args) {
        try {
          if (!this.filtersSet) {
            this.setFilters();
            this.filtersSet = true;
          }
          let logger = this.cached.get(namespace);
          if (!logger) {
            logger = this.makeLogger(namespace);
            this.cached.set(namespace, logger);
          }
          logger(fields, ...args);
        } catch (e) {
          console.error(e);
        }
      }
    };
    exports.DebugLogBackendBase = DebugLogBackendBase;
    var NodeBackend = class extends DebugLogBackendBase {
      static {
        __name(this, "NodeBackend");
      }
      constructor() {
        super(...arguments);
        this.enabledRegexp = /.*/g;
      }
      isEnabled(namespace) {
        return this.enabledRegexp.test(namespace);
      }
      makeLogger(namespace) {
        if (!this.enabledRegexp.test(namespace)) {
          return () => {
          };
        }
        return (fields, ...args) => {
          var _a;
          const nscolour = `${colours_1.Colours.green}${namespace}${colours_1.Colours.reset}`;
          const pid2 = `${colours_1.Colours.yellow}${process2.pid}${colours_1.Colours.reset}`;
          let level;
          switch (fields.severity) {
            case LogSeverity.ERROR:
              level = `${colours_1.Colours.red}${fields.severity}${colours_1.Colours.reset}`;
              break;
            case LogSeverity.INFO:
              level = `${colours_1.Colours.magenta}${fields.severity}${colours_1.Colours.reset}`;
              break;
            case LogSeverity.WARNING:
              level = `${colours_1.Colours.yellow}${fields.severity}${colours_1.Colours.reset}`;
              break;
            default:
              level = (_a = fields.severity) !== null && _a !== void 0 ? _a : LogSeverity.DEFAULT;
              break;
          }
          const msg = util.formatWithOptions({ colors: colours_1.Colours.enabled }, ...args);
          const filteredFields = Object.assign({}, fields);
          delete filteredFields.severity;
          const fieldsJson = Object.getOwnPropertyNames(filteredFields).length ? JSON.stringify(filteredFields) : "";
          const fieldsColour = fieldsJson ? `${colours_1.Colours.grey}${fieldsJson}${colours_1.Colours.reset}` : "";
          console.error("%s [%s|%s] %s%s", pid2, nscolour, level, msg, fieldsJson ? ` ${fieldsColour}` : "");
        };
      }
      // Regexp patterns below are from here:
      // https://github.com/nodejs/node/blob/c0aebed4b3395bd65d54b18d1fd00f071002ac20/lib/internal/util/debuglog.js#L36
      setFilters() {
        const totalFilters = this.filters.join(",");
        const regexp = totalFilters.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^");
        this.enabledRegexp = new RegExp(`^${regexp}$`, "i");
      }
    };
    function getNodeBackend() {
      return new NodeBackend();
    }
    __name(getNodeBackend, "getNodeBackend");
    var DebugBackend = class extends DebugLogBackendBase {
      static {
        __name(this, "DebugBackend");
      }
      constructor(pkg) {
        super();
        this.debugPkg = pkg;
      }
      makeLogger(namespace) {
        const debugLogger = this.debugPkg(namespace);
        return (fields, ...args) => {
          debugLogger(args[0], ...args.slice(1));
        };
      }
      setFilters() {
        var _a;
        const existingFilters = (_a = process2.env["NODE_DEBUG"]) !== null && _a !== void 0 ? _a : "";
        process2.env["NODE_DEBUG"] = `${existingFilters}${existingFilters ? "," : ""}${this.filters.join(",")}`;
      }
    };
    function getDebugBackend(debugPkg) {
      return new DebugBackend(debugPkg);
    }
    __name(getDebugBackend, "getDebugBackend");
    var StructuredBackend = class extends DebugLogBackendBase {
      static {
        __name(this, "StructuredBackend");
      }
      constructor(upstream) {
        var _a;
        super();
        this.upstream = (_a = upstream) !== null && _a !== void 0 ? _a : new NodeBackend();
      }
      makeLogger(namespace) {
        const debugLogger = this.upstream.makeLogger(namespace);
        return (fields, ...args) => {
          var _a;
          const severity = (_a = fields.severity) !== null && _a !== void 0 ? _a : LogSeverity.INFO;
          const json = Object.assign({
            severity,
            message: util.format(...args)
          }, fields);
          const jsonString = JSON.stringify(json);
          debugLogger(fields, jsonString);
        };
      }
      setFilters() {
        this.upstream.setFilters();
      }
    };
    function getStructuredBackend(upstream) {
      return new StructuredBackend(upstream);
    }
    __name(getStructuredBackend, "getStructuredBackend");
    exports.env = {
      /**
       * Filter wildcards specific to the Node syntax, and similar to the built-in
       * utils.debuglog() environment variable. If missing, disables logging.
       */
      nodeEnables: "GOOGLE_SDK_NODE_LOGGING"
    };
    var loggerCache = /* @__PURE__ */ new Map();
    var cachedBackend = void 0;
    function setBackend(backend) {
      cachedBackend = backend;
      loggerCache.clear();
    }
    __name(setBackend, "setBackend");
    function log3(namespace, parent) {
      const enablesFlag = process2.env[exports.env.nodeEnables];
      if (!enablesFlag) {
        return exports.placeholder;
      }
      if (!namespace) {
        return exports.placeholder;
      }
      if (parent) {
        namespace = `${parent.instance.namespace}:${namespace}`;
      }
      const existing = loggerCache.get(namespace);
      if (existing) {
        return existing.func;
      }
      if (cachedBackend === null) {
        return exports.placeholder;
      } else if (cachedBackend === void 0) {
        cachedBackend = getNodeBackend();
      }
      const logger = (() => {
        let previousBackend = void 0;
        const newLogger = new AdhocDebugLogger(namespace, (fields, ...args) => {
          if (previousBackend !== cachedBackend) {
            if (cachedBackend === null) {
              return;
            } else if (cachedBackend === void 0) {
              cachedBackend = getNodeBackend();
            }
            previousBackend = cachedBackend;
          }
          cachedBackend === null || cachedBackend === void 0 ? void 0 : cachedBackend.log(namespace, fields, ...args);
        });
        return newLogger;
      })();
      loggerCache.set(namespace, logger);
      return logger.func;
    }
    __name(log3, "log");
  }
});

// node_modules/google-logging-utils/build/src/index.js
var require_src2 = __commonJS({
  "node_modules/google-logging-utils/build/src/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_logging_utils(), exports);
  }
});

// node_modules/gcp-metadata/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/gcp-metadata/build/src/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gcpResidencyCache = exports.METADATA_SERVER_DETECTION = exports.HEADERS = exports.HEADER_VALUE = exports.HEADER_NAME = exports.SECONDARY_HOST_ADDRESS = exports.HOST_ADDRESS = exports.BASE_PATH = void 0;
    exports.instance = instance;
    exports.project = project;
    exports.universe = universe;
    exports.bulk = bulk;
    exports.isAvailable = isAvailable;
    exports.resetIsAvailableCache = resetIsAvailableCache;
    exports.getGCPResidency = getGCPResidency;
    exports.setGCPResidency = setGCPResidency;
    exports.requestTimeout = requestTimeout;
    var gaxios_1 = require_src();
    var jsonBigint = require_json_bigint();
    var gcp_residency_1 = require_gcp_residency();
    var logger = require_src2();
    exports.BASE_PATH = "/computeMetadata/v1";
    exports.HOST_ADDRESS = "http://169.254.169.254";
    exports.SECONDARY_HOST_ADDRESS = "http://metadata.google.internal.";
    exports.HEADER_NAME = "Metadata-Flavor";
    exports.HEADER_VALUE = "Google";
    exports.HEADERS = Object.freeze({ [exports.HEADER_NAME]: exports.HEADER_VALUE });
    var log3 = logger.log("gcp metadata");
    exports.METADATA_SERVER_DETECTION = Object.freeze({
      "assume-present": "don't try to ping the metadata server, but assume it's present",
      none: "don't try to ping the metadata server, but don't try to use it either",
      "bios-only": "treat the result of a BIOS probe as canonical (don't fall back to pinging)",
      "ping-only": "skip the BIOS probe, and go straight to pinging"
    });
    function getBaseUrl(baseUrl) {
      if (!baseUrl) {
        baseUrl = process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST || exports.HOST_ADDRESS;
      }
      if (!/^https?:\/\//.test(baseUrl)) {
        baseUrl = `http://${baseUrl}`;
      }
      return new URL(exports.BASE_PATH, baseUrl).href;
    }
    __name(getBaseUrl, "getBaseUrl");
    function validate(options) {
      Object.keys(options).forEach((key) => {
        switch (key) {
          case "params":
          case "property":
          case "headers":
            break;
          case "qs":
            throw new Error("'qs' is not a valid configuration option. Please use 'params' instead.");
          default:
            throw new Error(`'${key}' is not a valid configuration option.`);
        }
      });
    }
    __name(validate, "validate");
    async function metadataAccessor(type2, options = {}, noResponseRetries = 3, fastFail = false) {
      let metadataKey = "";
      let params = {};
      let headers = {};
      if (typeof type2 === "object") {
        const metadataAccessor2 = type2;
        metadataKey = metadataAccessor2.metadataKey;
        params = metadataAccessor2.params || params;
        headers = metadataAccessor2.headers || headers;
        noResponseRetries = metadataAccessor2.noResponseRetries || noResponseRetries;
        fastFail = metadataAccessor2.fastFail || fastFail;
      } else {
        metadataKey = type2;
      }
      if (typeof options === "string") {
        metadataKey += `/${options}`;
      } else {
        validate(options);
        if (options.property) {
          metadataKey += `/${options.property}`;
        }
        headers = options.headers || headers;
        params = options.params || params;
      }
      const requestMethod = fastFail ? fastFailMetadataRequest : gaxios_1.request;
      const req = {
        url: `${getBaseUrl()}/${metadataKey}`,
        headers: { ...exports.HEADERS, ...headers },
        retryConfig: { noResponseRetries },
        params,
        responseType: "text",
        timeout: requestTimeout()
      };
      log3.info("instance request %j", req);
      const res = await requestMethod(req);
      log3.info("instance metadata is %s", res.data);
      if (res.headers[exports.HEADER_NAME.toLowerCase()] !== exports.HEADER_VALUE) {
        throw new Error(`Invalid response from metadata service: incorrect ${exports.HEADER_NAME} header. Expected '${exports.HEADER_VALUE}', got ${res.headers[exports.HEADER_NAME.toLowerCase()] ? `'${res.headers[exports.HEADER_NAME.toLowerCase()]}'` : "no header"}`);
      }
      if (typeof res.data === "string") {
        try {
          return jsonBigint.parse(res.data);
        } catch (_a) {
        }
      }
      return res.data;
    }
    __name(metadataAccessor, "metadataAccessor");
    async function fastFailMetadataRequest(options) {
      var _a;
      const secondaryOptions = {
        ...options,
        url: (_a = options.url) === null || _a === void 0 ? void 0 : _a.toString().replace(getBaseUrl(), getBaseUrl(exports.SECONDARY_HOST_ADDRESS))
      };
      let responded = false;
      const r1 = (0, gaxios_1.request)(options).then((res) => {
        responded = true;
        return res;
      }).catch((err) => {
        if (responded) {
          return r2;
        } else {
          responded = true;
          throw err;
        }
      });
      const r2 = (0, gaxios_1.request)(secondaryOptions).then((res) => {
        responded = true;
        return res;
      }).catch((err) => {
        if (responded) {
          return r1;
        } else {
          responded = true;
          throw err;
        }
      });
      return Promise.race([r1, r2]);
    }
    __name(fastFailMetadataRequest, "fastFailMetadataRequest");
    function instance(options) {
      return metadataAccessor("instance", options);
    }
    __name(instance, "instance");
    function project(options) {
      return metadataAccessor("project", options);
    }
    __name(project, "project");
    function universe(options) {
      return metadataAccessor("universe", options);
    }
    __name(universe, "universe");
    async function bulk(properties) {
      const r = {};
      await Promise.all(properties.map((item) => {
        return (async () => {
          const res = await metadataAccessor(item);
          const key = item.metadataKey;
          r[key] = res;
        })();
      }));
      return r;
    }
    __name(bulk, "bulk");
    function detectGCPAvailableRetries() {
      return process.env.DETECT_GCP_RETRIES ? Number(process.env.DETECT_GCP_RETRIES) : 0;
    }
    __name(detectGCPAvailableRetries, "detectGCPAvailableRetries");
    var cachedIsAvailableResponse;
    async function isAvailable() {
      if (process.env.METADATA_SERVER_DETECTION) {
        const value = process.env.METADATA_SERVER_DETECTION.trim().toLocaleLowerCase();
        if (!(value in exports.METADATA_SERVER_DETECTION)) {
          throw new RangeError(`Unknown \`METADATA_SERVER_DETECTION\` env variable. Got \`${value}\`, but it should be \`${Object.keys(exports.METADATA_SERVER_DETECTION).join("`, `")}\`, or unset`);
        }
        switch (value) {
          case "assume-present":
            return true;
          case "none":
            return false;
          case "bios-only":
            return getGCPResidency();
          case "ping-only":
        }
      }
      try {
        if (cachedIsAvailableResponse === void 0) {
          cachedIsAvailableResponse = metadataAccessor(
            "instance",
            void 0,
            detectGCPAvailableRetries(),
            // If the default HOST_ADDRESS has been overridden, we should not
            // make an effort to try SECONDARY_HOST_ADDRESS (as we are likely in
            // a non-GCP environment):
            !(process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST)
          );
        }
        await cachedIsAvailableResponse;
        return true;
      } catch (e) {
        const err = e;
        if (process.env.DEBUG_AUTH) {
          console.info(err);
        }
        if (err.type === "request-timeout") {
          return false;
        }
        if (err.response && err.response.status === 404) {
          return false;
        } else {
          if (!(err.response && err.response.status === 404) && // A warning is emitted if we see an unexpected err.code, or err.code
          // is not populated:
          (!err.code || ![
            "EHOSTDOWN",
            "EHOSTUNREACH",
            "ENETUNREACH",
            "ENOENT",
            "ENOTFOUND",
            "ECONNREFUSED"
          ].includes(err.code))) {
            let code = "UNKNOWN";
            if (err.code)
              code = err.code;
            process.emitWarning(`received unexpected error = ${err.message} code = ${code}`, "MetadataLookupWarning");
          }
          return false;
        }
      }
    }
    __name(isAvailable, "isAvailable");
    function resetIsAvailableCache() {
      cachedIsAvailableResponse = void 0;
    }
    __name(resetIsAvailableCache, "resetIsAvailableCache");
    exports.gcpResidencyCache = null;
    function getGCPResidency() {
      if (exports.gcpResidencyCache === null) {
        setGCPResidency();
      }
      return exports.gcpResidencyCache;
    }
    __name(getGCPResidency, "getGCPResidency");
    function setGCPResidency(value = null) {
      exports.gcpResidencyCache = value !== null ? value : (0, gcp_residency_1.detectGCPResidency)();
    }
    __name(setGCPResidency, "setGCPResidency");
    function requestTimeout() {
      return getGCPResidency() ? 0 : 3e3;
    }
    __name(requestTimeout, "requestTimeout");
    __exportStar(require_gcp_residency(), exports);
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    __name(getLens, "getLens");
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    __name(byteLength, "byteLength");
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    __name(_byteLength, "_byteLength");
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    __name(toByteArray, "toByteArray");
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    __name(tripletToBase64, "tripletToBase64");
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    __name(encodeChunk, "encodeChunk");
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
    __name(fromByteArray, "fromByteArray");
  }
});

// node_modules/google-auth-library/build/src/crypto/browser/crypto.js
var require_crypto2 = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/browser/crypto.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserCrypto = void 0;
    var base64js = require_base64_js();
    var crypto_1 = require_crypto4();
    var BrowserCrypto = class _BrowserCrypto {
      static {
        __name(this, "BrowserCrypto");
      }
      constructor() {
        if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) {
          throw new Error("SubtleCrypto not found. Make sure it's an https:// website.");
        }
      }
      async sha256DigestBase64(str) {
        const inputBuffer = new TextEncoder().encode(str);
        const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
        return base64js.fromByteArray(new Uint8Array(outputBuffer));
      }
      randomBytesBase64(count3) {
        const array = new Uint8Array(count3);
        window.crypto.getRandomValues(array);
        return base64js.fromByteArray(array);
      }
      static padBase64(base64) {
        while (base64.length % 4 !== 0) {
          base64 += "=";
        }
        return base64;
      }
      async verify(pubkey, data, signature) {
        const algo = {
          name: "RSASSA-PKCS1-v1_5",
          hash: { name: "SHA-256" }
        };
        const dataArray = new TextEncoder().encode(data);
        const signatureArray = base64js.toByteArray(_BrowserCrypto.padBase64(signature));
        const cryptoKey = await window.crypto.subtle.importKey("jwk", pubkey, algo, true, ["verify"]);
        const result = await window.crypto.subtle.verify(algo, cryptoKey, signatureArray, dataArray);
        return result;
      }
      async sign(privateKey, data) {
        const algo = {
          name: "RSASSA-PKCS1-v1_5",
          hash: { name: "SHA-256" }
        };
        const dataArray = new TextEncoder().encode(data);
        const cryptoKey = await window.crypto.subtle.importKey("jwk", privateKey, algo, true, ["sign"]);
        const result = await window.crypto.subtle.sign(algo, cryptoKey, dataArray);
        return base64js.fromByteArray(new Uint8Array(result));
      }
      decodeBase64StringUtf8(base64) {
        const uint8array = base64js.toByteArray(_BrowserCrypto.padBase64(base64));
        const result = new TextDecoder().decode(uint8array);
        return result;
      }
      encodeBase64StringUtf8(text) {
        const uint8array = new TextEncoder().encode(text);
        const result = base64js.fromByteArray(uint8array);
        return result;
      }
      /**
       * Computes the SHA-256 hash of the provided string.
       * @param str The plain text string to hash.
       * @return A promise that resolves with the SHA-256 hash of the provided
       *   string in hexadecimal encoding.
       */
      async sha256DigestHex(str) {
        const inputBuffer = new TextEncoder().encode(str);
        const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
        return (0, crypto_1.fromArrayBufferToHex)(outputBuffer);
      }
      /**
       * Computes the HMAC hash of a message using the provided crypto key and the
       * SHA-256 algorithm.
       * @param key The secret crypto key in utf-8 or ArrayBuffer format.
       * @param msg The plain text message.
       * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
       *   format.
       */
      async signWithHmacSha256(key, msg) {
        const rawKey = typeof key === "string" ? key : String.fromCharCode(...new Uint16Array(key));
        const enc = new TextEncoder();
        const cryptoKey = await window.crypto.subtle.importKey("raw", enc.encode(rawKey), {
          name: "HMAC",
          hash: {
            name: "SHA-256"
          }
        }, false, ["sign"]);
        return window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
      }
    };
    exports.BrowserCrypto = BrowserCrypto;
  }
});

// node_modules/google-auth-library/build/src/crypto/node/crypto.js
var require_crypto3 = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/node/crypto.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeCrypto = void 0;
    var crypto3 = require_crypto();
    var NodeCrypto = class {
      static {
        __name(this, "NodeCrypto");
      }
      async sha256DigestBase64(str) {
        return crypto3.createHash("sha256").update(str).digest("base64");
      }
      randomBytesBase64(count3) {
        return crypto3.randomBytes(count3).toString("base64");
      }
      async verify(pubkey, data, signature) {
        const verifier = crypto3.createVerify("RSA-SHA256");
        verifier.update(data);
        verifier.end();
        return verifier.verify(pubkey, signature, "base64");
      }
      async sign(privateKey, data) {
        const signer = crypto3.createSign("RSA-SHA256");
        signer.update(data);
        signer.end();
        return signer.sign(privateKey, "base64");
      }
      decodeBase64StringUtf8(base64) {
        return Buffer.from(base64, "base64").toString("utf-8");
      }
      encodeBase64StringUtf8(text) {
        return Buffer.from(text, "utf-8").toString("base64");
      }
      /**
       * Computes the SHA-256 hash of the provided string.
       * @param str The plain text string to hash.
       * @return A promise that resolves with the SHA-256 hash of the provided
       *   string in hexadecimal encoding.
       */
      async sha256DigestHex(str) {
        return crypto3.createHash("sha256").update(str).digest("hex");
      }
      /**
       * Computes the HMAC hash of a message using the provided crypto key and the
       * SHA-256 algorithm.
       * @param key The secret crypto key in utf-8 or ArrayBuffer format.
       * @param msg The plain text message.
       * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
       *   format.
       */
      async signWithHmacSha256(key, msg) {
        const cryptoKey = typeof key === "string" ? key : toBuffer(key);
        return toArrayBuffer(crypto3.createHmac("sha256", cryptoKey).update(msg).digest());
      }
    };
    exports.NodeCrypto = NodeCrypto;
    function toArrayBuffer(buffer) {
      return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }
    __name(toArrayBuffer, "toArrayBuffer");
    function toBuffer(arrayBuffer) {
      return Buffer.from(arrayBuffer);
    }
    __name(toBuffer, "toBuffer");
  }
});

// node_modules/google-auth-library/build/src/crypto/crypto.js
var require_crypto4 = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/crypto.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCrypto = createCrypto;
    exports.hasBrowserCrypto = hasBrowserCrypto;
    exports.fromArrayBufferToHex = fromArrayBufferToHex;
    var crypto_1 = require_crypto2();
    var crypto_2 = require_crypto3();
    function createCrypto() {
      if (hasBrowserCrypto()) {
        return new crypto_1.BrowserCrypto();
      }
      return new crypto_2.NodeCrypto();
    }
    __name(createCrypto, "createCrypto");
    function hasBrowserCrypto() {
      return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined";
    }
    __name(hasBrowserCrypto, "hasBrowserCrypto");
    function fromArrayBufferToHex(arrayBuffer) {
      const byteArray = Array.from(new Uint8Array(arrayBuffer));
      return byteArray.map((byte) => {
        return byte.toString(16).padStart(2, "0");
      }).join("");
    }
    __name(fromArrayBufferToHex, "fromArrayBufferToHex");
  }
});

// node_modules/google-auth-library/build/src/options.js
var require_options = __commonJS({
  "node_modules/google-auth-library/build/src/options.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = validate;
    function validate(options) {
      const vpairs = [
        { invalid: "uri", expected: "url" },
        { invalid: "json", expected: "data" },
        { invalid: "qs", expected: "params" }
      ];
      for (const pair of vpairs) {
        if (options[pair.invalid]) {
          const e = `'${pair.invalid}' is not a valid configuration option. Please use '${pair.expected}' instead. This library is using Axios for requests. Please see https://github.com/axios/axios to learn more about the valid request options.`;
          throw new Error(e);
        }
      }
    }
    __name(validate, "validate");
  }
});

// node_modules/google-auth-library/package.json
var require_package3 = __commonJS({
  "node_modules/google-auth-library/package.json"(exports, module) {
    module.exports = {
      name: "google-auth-library",
      version: "9.15.1",
      author: "Google Inc.",
      description: "Google APIs Authentication Client Library for Node.js",
      engines: {
        node: ">=14"
      },
      main: "./build/src/index.js",
      types: "./build/src/index.d.ts",
      repository: "googleapis/google-auth-library-nodejs.git",
      keywords: [
        "google",
        "api",
        "google apis",
        "client",
        "client library"
      ],
      dependencies: {
        "base64-js": "^1.3.0",
        "ecdsa-sig-formatter": "^1.0.11",
        gaxios: "^6.1.1",
        "gcp-metadata": "^6.1.0",
        gtoken: "^7.0.0",
        jws: "^4.0.0"
      },
      devDependencies: {
        "@types/base64-js": "^1.2.5",
        "@types/chai": "^4.1.7",
        "@types/jws": "^3.1.0",
        "@types/mocha": "^9.0.0",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.1",
        "@types/node": "^20.4.2",
        "@types/sinon": "^17.0.0",
        "assert-rejects": "^1.0.0",
        c8: "^8.0.0",
        chai: "^4.2.0",
        cheerio: "1.0.0-rc.12",
        codecov: "^3.0.2",
        "engine.io": "6.6.2",
        gts: "^5.0.0",
        "is-docker": "^2.0.0",
        jsdoc: "^4.0.0",
        "jsdoc-fresh": "^3.0.0",
        "jsdoc-region-tag": "^3.0.0",
        karma: "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "5.0.0",
        keypair: "^1.0.4",
        linkinator: "^4.0.0",
        mocha: "^9.2.2",
        mv: "^2.1.1",
        ncp: "^2.0.0",
        nock: "^13.0.0",
        "null-loader": "^4.0.0",
        pdfmake: "0.2.12",
        puppeteer: "^21.0.0",
        sinon: "^18.0.0",
        "ts-loader": "^8.0.0",
        typescript: "^5.1.6",
        webpack: "^5.21.2",
        "webpack-cli": "^4.0.0"
      },
      files: [
        "build/src",
        "!build/src/**/*.map"
      ],
      scripts: {
        test: "c8 mocha build/test",
        clean: "gts clean",
        prepare: "npm run compile",
        lint: "gts check",
        compile: "tsc -p .",
        fix: "gts fix",
        pretest: "npm run compile -- --sourceMap",
        docs: "jsdoc -c .jsdoc.json",
        "samples-setup": "cd samples/ && npm link ../ && npm run setup && cd ../",
        "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
        "system-test": "mocha build/system-test --timeout 60000",
        "presystem-test": "npm run compile -- --sourceMap",
        webpack: "webpack",
        "browser-test": "karma start",
        "docs-test": "linkinator docs",
        "predocs-test": "npm run docs",
        prelint: "cd samples; npm link ../; npm install",
        precompile: "gts clean"
      },
      license: "Apache-2.0"
    };
  }
});

// node_modules/google-auth-library/build/src/transporters.js
var require_transporters = __commonJS({
  "node_modules/google-auth-library/build/src/transporters.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultTransporter = void 0;
    var gaxios_1 = require_src();
    var options_1 = require_options();
    var pkg = require_package3();
    var PRODUCT_NAME = "google-api-nodejs-client";
    var DefaultTransporter = class _DefaultTransporter {
      static {
        __name(this, "DefaultTransporter");
      }
      constructor() {
        this.instance = new gaxios_1.Gaxios();
      }
      /**
       * Configures request options before making a request.
       * @param opts GaxiosOptions options.
       * @return Configured options.
       */
      configure(opts = {}) {
        opts.headers = opts.headers || {};
        if (typeof window === "undefined") {
          const uaValue = opts.headers["User-Agent"];
          if (!uaValue) {
            opts.headers["User-Agent"] = _DefaultTransporter.USER_AGENT;
          } else if (!uaValue.includes(`${PRODUCT_NAME}/`)) {
            opts.headers["User-Agent"] = `${uaValue} ${_DefaultTransporter.USER_AGENT}`;
          }
          if (!opts.headers["x-goog-api-client"]) {
            const nodeVersion = process.version.replace(/^v/, "");
            opts.headers["x-goog-api-client"] = `gl-node/${nodeVersion}`;
          }
        }
        return opts;
      }
      /**
       * Makes a request using Gaxios with given options.
       * @param opts GaxiosOptions options.
       * @param callback optional callback that contains GaxiosResponse object.
       * @return GaxiosPromise, assuming no callback is passed.
       */
      request(opts) {
        opts = this.configure(opts);
        (0, options_1.validate)(opts);
        return this.instance.request(opts).catch((e) => {
          throw this.processError(e);
        });
      }
      get defaults() {
        return this.instance.defaults;
      }
      set defaults(opts) {
        this.instance.defaults = opts;
      }
      /**
       * Changes the error to include details from the body.
       */
      processError(e) {
        const res = e.response;
        const err = e;
        const body = res ? res.data : null;
        if (res && body && body.error && res.status !== 200) {
          if (typeof body.error === "string") {
            err.message = body.error;
            err.status = res.status;
          } else if (Array.isArray(body.error.errors)) {
            err.message = body.error.errors.map((err2) => err2.message).join("\n");
            err.code = body.error.code;
            err.errors = body.error.errors;
          } else {
            err.message = body.error.message;
            err.code = body.error.code;
          }
        } else if (res && res.status >= 400) {
          err.message = body;
          err.status = res.status;
        }
        return err;
      }
    };
    exports.DefaultTransporter = DefaultTransporter;
    DefaultTransporter.USER_AGENT = `${PRODUCT_NAME}/${pkg.version}`;
  }
});

// node-built-in-modules:buffer
import libDefault11 from "buffer";
var require_buffer = __commonJS({
  "node-built-in-modules:buffer"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault11;
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var buffer = require_buffer();
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    __name(copyProps, "copyProps");
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    __name(SafeBuffer, "SafeBuffer");
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    __name(getParamSize, "getParamSize");
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    __name(getParamBytesForAlg, "getParamBytesForAlg");
    module.exports = getParamBytesForAlg;
  }
});

// node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(base64Url, "base64Url");
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    __name(signatureAsBuffer, "signatureAsBuffer");
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    __name(derToJose, "derToJose");
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    __name(countPadding, "countPadding");
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    __name(joseToDer, "joseToDer");
    module.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node-built-in-modules:events
import libDefault12 from "events";
var require_events = __commonJS({
  "node-built-in-modules:events"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault12;
  }
});

// node_modules/google-auth-library/build/src/util.js
var require_util2 = __commonJS({
  "node_modules/google-auth-library/build/src/util.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _LRUCache_instances;
    var _LRUCache_cache;
    var _LRUCache_moveToEnd;
    var _LRUCache_evict;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = void 0;
    exports.snakeToCamel = snakeToCamel;
    exports.originalOrCamelOptions = originalOrCamelOptions;
    function snakeToCamel(str) {
      return str.replace(/([_][^_])/g, (match2) => match2.slice(1).toUpperCase());
    }
    __name(snakeToCamel, "snakeToCamel");
    function originalOrCamelOptions(obj) {
      function get3(key) {
        var _a;
        const o = obj || {};
        return (_a = o[key]) !== null && _a !== void 0 ? _a : o[snakeToCamel(key)];
      }
      __name(get3, "get");
      return { get: get3 };
    }
    __name(originalOrCamelOptions, "originalOrCamelOptions");
    var LRUCache = class {
      static {
        __name(this, "LRUCache");
      }
      constructor(options) {
        _LRUCache_instances.add(this);
        _LRUCache_cache.set(this, /* @__PURE__ */ new Map());
        this.capacity = options.capacity;
        this.maxAge = options.maxAge;
      }
      /**
       * Add an item to the cache.
       *
       * @param key the key to upsert
       * @param value the value of the key
       */
      set(key, value) {
        __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_moveToEnd).call(this, key, value);
        __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_evict).call(this);
      }
      /**
       * Get an item from the cache.
       *
       * @param key the key to retrieve
       */
      get(key) {
        const item = __classPrivateFieldGet(this, _LRUCache_cache, "f").get(key);
        if (!item)
          return;
        __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_moveToEnd).call(this, key, item.value);
        __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_evict).call(this);
        return item.value;
      }
    };
    exports.LRUCache = LRUCache;
    _LRUCache_cache = /* @__PURE__ */ new WeakMap(), _LRUCache_instances = /* @__PURE__ */ new WeakSet(), _LRUCache_moveToEnd = /* @__PURE__ */ __name(function _LRUCache_moveToEnd2(key, value) {
      __classPrivateFieldGet(this, _LRUCache_cache, "f").delete(key);
      __classPrivateFieldGet(this, _LRUCache_cache, "f").set(key, {
        value,
        lastAccessed: Date.now()
      });
    }, "_LRUCache_moveToEnd"), _LRUCache_evict = /* @__PURE__ */ __name(function _LRUCache_evict2() {
      const cutoffDate = this.maxAge ? Date.now() - this.maxAge : 0;
      let oldestItem = __classPrivateFieldGet(this, _LRUCache_cache, "f").entries().next();
      while (!oldestItem.done && (__classPrivateFieldGet(this, _LRUCache_cache, "f").size > this.capacity || // too many
      oldestItem.value[1].lastAccessed < cutoffDate)) {
        __classPrivateFieldGet(this, _LRUCache_cache, "f").delete(oldestItem.value[0]);
        oldestItem = __classPrivateFieldGet(this, _LRUCache_cache, "f").entries().next();
      }
    }, "_LRUCache_evict");
  }
});

// node_modules/google-auth-library/build/src/auth/authclient.js
var require_authclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/authclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthClient = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = exports.DEFAULT_UNIVERSE = void 0;
    var events_1 = require_events();
    var gaxios_1 = require_src();
    var transporters_1 = require_transporters();
    var util_1 = require_util2();
    exports.DEFAULT_UNIVERSE = "googleapis.com";
    exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 5 * 60 * 1e3;
    var AuthClient = class extends events_1.EventEmitter {
      static {
        __name(this, "AuthClient");
      }
      constructor(opts = {}) {
        var _a, _b, _c, _d, _e;
        super();
        this.credentials = {};
        this.eagerRefreshThresholdMillis = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS;
        this.forceRefreshOnFailure = false;
        this.universeDomain = exports.DEFAULT_UNIVERSE;
        const options = (0, util_1.originalOrCamelOptions)(opts);
        this.apiKey = opts.apiKey;
        this.projectId = (_a = options.get("project_id")) !== null && _a !== void 0 ? _a : null;
        this.quotaProjectId = options.get("quota_project_id");
        this.credentials = (_b = options.get("credentials")) !== null && _b !== void 0 ? _b : {};
        this.universeDomain = (_c = options.get("universe_domain")) !== null && _c !== void 0 ? _c : exports.DEFAULT_UNIVERSE;
        this.transporter = (_d = opts.transporter) !== null && _d !== void 0 ? _d : new transporters_1.DefaultTransporter();
        if (opts.transporterOptions) {
          this.transporter.defaults = opts.transporterOptions;
        }
        if (opts.eagerRefreshThresholdMillis) {
          this.eagerRefreshThresholdMillis = opts.eagerRefreshThresholdMillis;
        }
        this.forceRefreshOnFailure = (_e = opts.forceRefreshOnFailure) !== null && _e !== void 0 ? _e : false;
      }
      /**
       * Return the {@link Gaxios `Gaxios`} instance from the {@link AuthClient.transporter}.
       *
       * @expiremental
       */
      get gaxios() {
        if (this.transporter instanceof gaxios_1.Gaxios) {
          return this.transporter;
        } else if (this.transporter instanceof transporters_1.DefaultTransporter) {
          return this.transporter.instance;
        } else if ("instance" in this.transporter && this.transporter.instance instanceof gaxios_1.Gaxios) {
          return this.transporter.instance;
        }
        return null;
      }
      /**
       * Sets the auth credentials.
       */
      setCredentials(credentials) {
        this.credentials = credentials;
      }
      /**
       * Append additional headers, e.g., x-goog-user-project, shared across the
       * classes inheriting AuthClient. This method should be used by any method
       * that overrides getRequestMetadataAsync(), which is a shared helper for
       * setting request information in both gRPC and HTTP API calls.
       *
       * @param headers object to append additional headers to.
       */
      addSharedMetadataHeaders(headers) {
        if (!headers["x-goog-user-project"] && // don't override a value the user sets.
        this.quotaProjectId) {
          headers["x-goog-user-project"] = this.quotaProjectId;
        }
        return headers;
      }
      /**
       * Retry config for Auth-related requests.
       *
       * @remarks
       *
       * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
       * config as some downstream APIs would prefer if customers explicitly enable retries,
       * such as GCS.
       */
      static get RETRY_CONFIG() {
        return {
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
          }
        };
      }
    };
    exports.AuthClient = AuthClient;
  }
});

// node_modules/google-auth-library/build/src/auth/loginticket.js
var require_loginticket = __commonJS({
  "node_modules/google-auth-library/build/src/auth/loginticket.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoginTicket = void 0;
    var LoginTicket = class {
      static {
        __name(this, "LoginTicket");
      }
      /**
       * Create a simple class to extract user ID from an ID Token
       *
       * @param {string} env Envelope of the jwt
       * @param {TokenPayload} pay Payload of the jwt
       * @constructor
       */
      constructor(env2, pay) {
        this.envelope = env2;
        this.payload = pay;
      }
      getEnvelope() {
        return this.envelope;
      }
      getPayload() {
        return this.payload;
      }
      /**
       * Create a simple class to extract user ID from an ID Token
       *
       * @return The user ID
       */
      getUserId() {
        const payload = this.getPayload();
        if (payload && payload.sub) {
          return payload.sub;
        }
        return null;
      }
      /**
       * Returns attributes from the login ticket.  This can contain
       * various information about the user session.
       *
       * @return The envelope and payload
       */
      getAttributes() {
        return { envelope: this.getEnvelope(), payload: this.getPayload() };
      }
    };
    exports.LoginTicket = LoginTicket;
  }
});

// node_modules/google-auth-library/build/src/auth/oauth2client.js
var require_oauth2client = __commonJS({
  "node_modules/google-auth-library/build/src/auth/oauth2client.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OAuth2Client = exports.ClientAuthentication = exports.CertificateFormat = exports.CodeChallengeMethod = void 0;
    var gaxios_1 = require_src();
    var querystring = require_querystring();
    var stream = require_stream();
    var formatEcdsa = require_ecdsa_sig_formatter();
    var crypto_1 = require_crypto4();
    var authclient_1 = require_authclient();
    var loginticket_1 = require_loginticket();
    var CodeChallengeMethod;
    (function(CodeChallengeMethod2) {
      CodeChallengeMethod2["Plain"] = "plain";
      CodeChallengeMethod2["S256"] = "S256";
    })(CodeChallengeMethod || (exports.CodeChallengeMethod = CodeChallengeMethod = {}));
    var CertificateFormat;
    (function(CertificateFormat2) {
      CertificateFormat2["PEM"] = "PEM";
      CertificateFormat2["JWK"] = "JWK";
    })(CertificateFormat || (exports.CertificateFormat = CertificateFormat = {}));
    var ClientAuthentication;
    (function(ClientAuthentication2) {
      ClientAuthentication2["ClientSecretPost"] = "ClientSecretPost";
      ClientAuthentication2["ClientSecretBasic"] = "ClientSecretBasic";
      ClientAuthentication2["None"] = "None";
    })(ClientAuthentication || (exports.ClientAuthentication = ClientAuthentication = {}));
    var OAuth2Client2 = class _OAuth2Client extends authclient_1.AuthClient {
      static {
        __name(this, "OAuth2Client");
      }
      constructor(optionsOrClientId, clientSecret, redirectUri) {
        const opts = optionsOrClientId && typeof optionsOrClientId === "object" ? optionsOrClientId : { clientId: optionsOrClientId, clientSecret, redirectUri };
        super(opts);
        this.certificateCache = {};
        this.certificateExpiry = null;
        this.certificateCacheFormat = CertificateFormat.PEM;
        this.refreshTokenPromises = /* @__PURE__ */ new Map();
        this._clientId = opts.clientId;
        this._clientSecret = opts.clientSecret;
        this.redirectUri = opts.redirectUri;
        this.endpoints = {
          tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
          oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          oauth2TokenUrl: "https://oauth2.googleapis.com/token",
          oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
          oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
          oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
          oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
          ...opts.endpoints
        };
        this.clientAuthentication = opts.clientAuthentication || ClientAuthentication.ClientSecretPost;
        this.issuers = opts.issuers || [
          "accounts.google.com",
          "https://accounts.google.com",
          this.universeDomain
        ];
      }
      /**
       * Generates URL for consent page landing.
       * @param opts Options.
       * @return URL to consent page.
       */
      generateAuthUrl(opts = {}) {
        if (opts.code_challenge_method && !opts.code_challenge) {
          throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
        }
        opts.response_type = opts.response_type || "code";
        opts.client_id = opts.client_id || this._clientId;
        opts.redirect_uri = opts.redirect_uri || this.redirectUri;
        if (Array.isArray(opts.scope)) {
          opts.scope = opts.scope.join(" ");
        }
        const rootUrl = this.endpoints.oauth2AuthBaseUrl.toString();
        return rootUrl + "?" + querystring.stringify(opts);
      }
      generateCodeVerifier() {
        throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.");
      }
      /**
       * Convenience method to automatically generate a code_verifier, and its
       * resulting SHA256. If used, this must be paired with a S256
       * code_challenge_method.
       *
       * For a full example see:
       * https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/oauth2-codeVerifier.js
       */
      async generateCodeVerifierAsync() {
        const crypto3 = (0, crypto_1.createCrypto)();
        const randomString = crypto3.randomBytesBase64(96);
        const codeVerifier = randomString.replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-");
        const unencodedCodeChallenge = await crypto3.sha256DigestBase64(codeVerifier);
        const codeChallenge = unencodedCodeChallenge.split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
        return { codeVerifier, codeChallenge };
      }
      getToken(codeOrOptions, callback) {
        const options = typeof codeOrOptions === "string" ? { code: codeOrOptions } : codeOrOptions;
        if (callback) {
          this.getTokenAsync(options).then((r) => callback(null, r.tokens, r.res), (e) => callback(e, null, e.response));
        } else {
          return this.getTokenAsync(options);
        }
      }
      async getTokenAsync(options) {
        const url = this.endpoints.oauth2TokenUrl.toString();
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
        const values = {
          client_id: options.client_id || this._clientId,
          code_verifier: options.codeVerifier,
          code: options.code,
          grant_type: "authorization_code",
          redirect_uri: options.redirect_uri || this.redirectUri
        };
        if (this.clientAuthentication === ClientAuthentication.ClientSecretBasic) {
          const basic = Buffer.from(`${this._clientId}:${this._clientSecret}`);
          headers["Authorization"] = `Basic ${basic.toString("base64")}`;
        }
        if (this.clientAuthentication === ClientAuthentication.ClientSecretPost) {
          values.client_secret = this._clientSecret;
        }
        const res = await this.transporter.request({
          ..._OAuth2Client.RETRY_CONFIG,
          method: "POST",
          url,
          data: querystring.stringify(values),
          headers
        });
        const tokens = res.data;
        if (res.data && res.data.expires_in) {
          tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
          delete tokens.expires_in;
        }
        this.emit("tokens", tokens);
        return { tokens, res };
      }
      /**
       * Refreshes the access token.
       * @param refresh_token Existing refresh token.
       * @private
       */
      async refreshToken(refreshToken) {
        if (!refreshToken) {
          return this.refreshTokenNoCache(refreshToken);
        }
        if (this.refreshTokenPromises.has(refreshToken)) {
          return this.refreshTokenPromises.get(refreshToken);
        }
        const p = this.refreshTokenNoCache(refreshToken).then((r) => {
          this.refreshTokenPromises.delete(refreshToken);
          return r;
        }, (e) => {
          this.refreshTokenPromises.delete(refreshToken);
          throw e;
        });
        this.refreshTokenPromises.set(refreshToken, p);
        return p;
      }
      async refreshTokenNoCache(refreshToken) {
        var _a;
        if (!refreshToken) {
          throw new Error("No refresh token is set.");
        }
        const url = this.endpoints.oauth2TokenUrl.toString();
        const data = {
          refresh_token: refreshToken,
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token"
        };
        let res;
        try {
          res = await this.transporter.request({
            ..._OAuth2Client.RETRY_CONFIG,
            method: "POST",
            url,
            data: querystring.stringify(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          });
        } catch (e) {
          if (e instanceof gaxios_1.GaxiosError && e.message === "invalid_grant" && ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) && /ReAuth/i.test(e.response.data.error_description)) {
            e.message = JSON.stringify(e.response.data);
          }
          throw e;
        }
        const tokens = res.data;
        if (res.data && res.data.expires_in) {
          tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
          delete tokens.expires_in;
        }
        this.emit("tokens", tokens);
        return { tokens, res };
      }
      refreshAccessToken(callback) {
        if (callback) {
          this.refreshAccessTokenAsync().then((r) => callback(null, r.credentials, r.res), callback);
        } else {
          return this.refreshAccessTokenAsync();
        }
      }
      async refreshAccessTokenAsync() {
        const r = await this.refreshToken(this.credentials.refresh_token);
        const tokens = r.tokens;
        tokens.refresh_token = this.credentials.refresh_token;
        this.credentials = tokens;
        return { credentials: this.credentials, res: r.res };
      }
      getAccessToken(callback) {
        if (callback) {
          this.getAccessTokenAsync().then((r) => callback(null, r.token, r.res), callback);
        } else {
          return this.getAccessTokenAsync();
        }
      }
      async getAccessTokenAsync() {
        const shouldRefresh = !this.credentials.access_token || this.isTokenExpiring();
        if (shouldRefresh) {
          if (!this.credentials.refresh_token) {
            if (this.refreshHandler) {
              const refreshedAccessToken = await this.processAndValidateRefreshHandler();
              if (refreshedAccessToken === null || refreshedAccessToken === void 0 ? void 0 : refreshedAccessToken.access_token) {
                this.setCredentials(refreshedAccessToken);
                return { token: this.credentials.access_token };
              }
            } else {
              throw new Error("No refresh token or refresh handler callback is set.");
            }
          }
          const r = await this.refreshAccessTokenAsync();
          if (!r.credentials || r.credentials && !r.credentials.access_token) {
            throw new Error("Could not refresh access token.");
          }
          return { token: r.credentials.access_token, res: r.res };
        } else {
          return { token: this.credentials.access_token };
        }
      }
      /**
       * The main authentication interface.  It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * In OAuth2Client, the result has the form:
       * { Authorization: 'Bearer <access_token_value>' }
       * @param url The optional url being authorized
       */
      async getRequestHeaders(url) {
        const headers = (await this.getRequestMetadataAsync(url)).headers;
        return headers;
      }
      async getRequestMetadataAsync(url) {
        const thisCreds = this.credentials;
        if (!thisCreds.access_token && !thisCreds.refresh_token && !this.apiKey && !this.refreshHandler) {
          throw new Error("No access, refresh token, API key or refresh handler callback is set.");
        }
        if (thisCreds.access_token && !this.isTokenExpiring()) {
          thisCreds.token_type = thisCreds.token_type || "Bearer";
          const headers2 = {
            Authorization: thisCreds.token_type + " " + thisCreds.access_token
          };
          return { headers: this.addSharedMetadataHeaders(headers2) };
        }
        if (this.refreshHandler) {
          const refreshedAccessToken = await this.processAndValidateRefreshHandler();
          if (refreshedAccessToken === null || refreshedAccessToken === void 0 ? void 0 : refreshedAccessToken.access_token) {
            this.setCredentials(refreshedAccessToken);
            const headers2 = {
              Authorization: "Bearer " + this.credentials.access_token
            };
            return { headers: this.addSharedMetadataHeaders(headers2) };
          }
        }
        if (this.apiKey) {
          return { headers: { "X-Goog-Api-Key": this.apiKey } };
        }
        let r = null;
        let tokens = null;
        try {
          r = await this.refreshToken(thisCreds.refresh_token);
          tokens = r.tokens;
        } catch (err) {
          const e = err;
          if (e.response && (e.response.status === 403 || e.response.status === 404)) {
            e.message = `Could not refresh access token: ${e.message}`;
          }
          throw e;
        }
        const credentials = this.credentials;
        credentials.token_type = credentials.token_type || "Bearer";
        tokens.refresh_token = credentials.refresh_token;
        this.credentials = tokens;
        const headers = {
          Authorization: credentials.token_type + " " + tokens.access_token
        };
        return { headers: this.addSharedMetadataHeaders(headers), res: r.res };
      }
      /**
       * Generates an URL to revoke the given token.
       * @param token The existing token to be revoked.
       *
       * @deprecated use instance method {@link OAuth2Client.getRevokeTokenURL}
       */
      static getRevokeTokenUrl(token) {
        return new _OAuth2Client().getRevokeTokenURL(token).toString();
      }
      /**
       * Generates a URL to revoke the given token.
       *
       * @param token The existing token to be revoked.
       */
      getRevokeTokenURL(token) {
        const url = new URL(this.endpoints.oauth2RevokeUrl);
        url.searchParams.append("token", token);
        return url;
      }
      revokeToken(token, callback) {
        const opts = {
          ..._OAuth2Client.RETRY_CONFIG,
          url: this.getRevokeTokenURL(token).toString(),
          method: "POST"
        };
        if (callback) {
          this.transporter.request(opts).then((r) => callback(null, r), callback);
        } else {
          return this.transporter.request(opts);
        }
      }
      revokeCredentials(callback) {
        if (callback) {
          this.revokeCredentialsAsync().then((res) => callback(null, res), callback);
        } else {
          return this.revokeCredentialsAsync();
        }
      }
      async revokeCredentialsAsync() {
        const token = this.credentials.access_token;
        this.credentials = {};
        if (token) {
          return this.revokeToken(token);
        } else {
          throw new Error("No access token to revoke.");
        }
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      async requestAsync(opts, reAuthRetried = false) {
        let r2;
        try {
          const r = await this.getRequestMetadataAsync(opts.url);
          opts.headers = opts.headers || {};
          if (r.headers && r.headers["x-goog-user-project"]) {
            opts.headers["x-goog-user-project"] = r.headers["x-goog-user-project"];
          }
          if (r.headers && r.headers.Authorization) {
            opts.headers.Authorization = r.headers.Authorization;
          }
          if (this.apiKey) {
            opts.headers["X-Goog-Api-Key"] = this.apiKey;
          }
          r2 = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const mayRequireRefresh = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure);
            const mayRequireRefreshWithNoRefreshToken = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefresh) {
              await this.refreshAccessTokenAsync();
              return this.requestAsync(opts, true);
            } else if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefreshWithNoRefreshToken) {
              const refreshedAccessToken = await this.processAndValidateRefreshHandler();
              if (refreshedAccessToken === null || refreshedAccessToken === void 0 ? void 0 : refreshedAccessToken.access_token) {
                this.setCredentials(refreshedAccessToken);
              }
              return this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return r2;
      }
      verifyIdToken(options, callback) {
        if (callback && typeof callback !== "function") {
          throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
        }
        if (callback) {
          this.verifyIdTokenAsync(options).then((r) => callback(null, r), callback);
        } else {
          return this.verifyIdTokenAsync(options);
        }
      }
      async verifyIdTokenAsync(options) {
        if (!options.idToken) {
          throw new Error("The verifyIdToken method requires an ID Token");
        }
        const response = await this.getFederatedSignonCertsAsync();
        const login = await this.verifySignedJwtWithCertsAsync(options.idToken, response.certs, options.audience, this.issuers, options.maxExpiry);
        return login;
      }
      /**
       * Obtains information about the provisioned access token.  Especially useful
       * if you want to check the scopes that were provisioned to a given token.
       *
       * @param accessToken Required.  The Access Token for which you want to get
       * user info.
       */
      async getTokenInfo(accessToken) {
        const { data } = await this.transporter.request({
          ..._OAuth2Client.RETRY_CONFIG,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`
          },
          url: this.endpoints.tokenInfoUrl.toString()
        });
        const info3 = Object.assign({
          expiry_date: (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3,
          scopes: data.scope.split(" ")
        }, data);
        delete info3.expires_in;
        delete info3.scope;
        return info3;
      }
      getFederatedSignonCerts(callback) {
        if (callback) {
          this.getFederatedSignonCertsAsync().then((r) => callback(null, r.certs, r.res), callback);
        } else {
          return this.getFederatedSignonCertsAsync();
        }
      }
      async getFederatedSignonCertsAsync() {
        const nowTime = (/* @__PURE__ */ new Date()).getTime();
        const format = (0, crypto_1.hasBrowserCrypto)() ? CertificateFormat.JWK : CertificateFormat.PEM;
        if (this.certificateExpiry && nowTime < this.certificateExpiry.getTime() && this.certificateCacheFormat === format) {
          return { certs: this.certificateCache, format };
        }
        let res;
        let url;
        switch (format) {
          case CertificateFormat.PEM:
            url = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
            break;
          case CertificateFormat.JWK:
            url = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
            break;
          default:
            throw new Error(`Unsupported certificate format ${format}`);
        }
        try {
          res = await this.transporter.request({
            ..._OAuth2Client.RETRY_CONFIG,
            url
          });
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Failed to retrieve verification certificates: ${e.message}`;
          }
          throw e;
        }
        const cacheControl = res ? res.headers["cache-control"] : void 0;
        let cacheAge = -1;
        if (cacheControl) {
          const pattern = new RegExp("max-age=([0-9]*)");
          const regexResult = pattern.exec(cacheControl);
          if (regexResult && regexResult.length === 2) {
            cacheAge = Number(regexResult[1]) * 1e3;
          }
        }
        let certificates = {};
        switch (format) {
          case CertificateFormat.PEM:
            certificates = res.data;
            break;
          case CertificateFormat.JWK:
            for (const key of res.data.keys) {
              certificates[key.kid] = key;
            }
            break;
          default:
            throw new Error(`Unsupported certificate format ${format}`);
        }
        const now = /* @__PURE__ */ new Date();
        this.certificateExpiry = cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
        this.certificateCache = certificates;
        this.certificateCacheFormat = format;
        return { certs: certificates, format, res };
      }
      getIapPublicKeys(callback) {
        if (callback) {
          this.getIapPublicKeysAsync().then((r) => callback(null, r.pubkeys, r.res), callback);
        } else {
          return this.getIapPublicKeysAsync();
        }
      }
      async getIapPublicKeysAsync() {
        let res;
        const url = this.endpoints.oauth2IapPublicKeyUrl.toString();
        try {
          res = await this.transporter.request({
            ..._OAuth2Client.RETRY_CONFIG,
            url
          });
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Failed to retrieve verification certificates: ${e.message}`;
          }
          throw e;
        }
        return { pubkeys: res.data, res };
      }
      verifySignedJwtWithCerts() {
        throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.");
      }
      /**
       * Verify the id token is signed with the correct certificate
       * and is from the correct audience.
       * @param jwt The jwt to verify (The ID Token in this case).
       * @param certs The array of certs to test the jwt against.
       * @param requiredAudience The audience to test the jwt against.
       * @param issuers The allowed issuers of the jwt (Optional).
       * @param maxExpiry The max expiry the certificate can be (Optional).
       * @return Returns a promise resolving to LoginTicket on verification.
       */
      async verifySignedJwtWithCertsAsync(jwt, certs, requiredAudience, issuers, maxExpiry) {
        const crypto3 = (0, crypto_1.createCrypto)();
        if (!maxExpiry) {
          maxExpiry = _OAuth2Client.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
        }
        const segments = jwt.split(".");
        if (segments.length !== 3) {
          throw new Error("Wrong number of segments in token: " + jwt);
        }
        const signed = segments[0] + "." + segments[1];
        let signature = segments[2];
        let envelope;
        let payload;
        try {
          envelope = JSON.parse(crypto3.decodeBase64StringUtf8(segments[0]));
        } catch (err) {
          if (err instanceof Error) {
            err.message = `Can't parse token envelope: ${segments[0]}': ${err.message}`;
          }
          throw err;
        }
        if (!envelope) {
          throw new Error("Can't parse token envelope: " + segments[0]);
        }
        try {
          payload = JSON.parse(crypto3.decodeBase64StringUtf8(segments[1]));
        } catch (err) {
          if (err instanceof Error) {
            err.message = `Can't parse token payload '${segments[0]}`;
          }
          throw err;
        }
        if (!payload) {
          throw new Error("Can't parse token payload: " + segments[1]);
        }
        if (!Object.prototype.hasOwnProperty.call(certs, envelope.kid)) {
          throw new Error("No pem found for envelope: " + JSON.stringify(envelope));
        }
        const cert = certs[envelope.kid];
        if (envelope.alg === "ES256") {
          signature = formatEcdsa.joseToDer(signature, "ES256").toString("base64");
        }
        const verified = await crypto3.verify(cert, signed, signature);
        if (!verified) {
          throw new Error("Invalid token signature: " + jwt);
        }
        if (!payload.iat) {
          throw new Error("No issue time in token: " + JSON.stringify(payload));
        }
        if (!payload.exp) {
          throw new Error("No expiration time in token: " + JSON.stringify(payload));
        }
        const iat = Number(payload.iat);
        if (isNaN(iat))
          throw new Error("iat field using invalid format");
        const exp = Number(payload.exp);
        if (isNaN(exp))
          throw new Error("exp field using invalid format");
        const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
        if (exp >= now + maxExpiry) {
          throw new Error("Expiration time too far in future: " + JSON.stringify(payload));
        }
        const earliest = iat - _OAuth2Client.CLOCK_SKEW_SECS_;
        const latest = exp + _OAuth2Client.CLOCK_SKEW_SECS_;
        if (now < earliest) {
          throw new Error("Token used too early, " + now + " < " + earliest + ": " + JSON.stringify(payload));
        }
        if (now > latest) {
          throw new Error("Token used too late, " + now + " > " + latest + ": " + JSON.stringify(payload));
        }
        if (issuers && issuers.indexOf(payload.iss) < 0) {
          throw new Error("Invalid issuer, expected one of [" + issuers + "], but got " + payload.iss);
        }
        if (typeof requiredAudience !== "undefined" && requiredAudience !== null) {
          const aud = payload.aud;
          let audVerified = false;
          if (requiredAudience.constructor === Array) {
            audVerified = requiredAudience.indexOf(aud) > -1;
          } else {
            audVerified = aud === requiredAudience;
          }
          if (!audVerified) {
            throw new Error("Wrong recipient, payload audience != requiredAudience");
          }
        }
        return new loginticket_1.LoginTicket(envelope, payload);
      }
      /**
       * Returns a promise that resolves with AccessTokenResponse type if
       * refreshHandler is defined.
       * If not, nothing is returned.
       */
      async processAndValidateRefreshHandler() {
        if (this.refreshHandler) {
          const accessTokenResponse = await this.refreshHandler();
          if (!accessTokenResponse.access_token) {
            throw new Error("No access token is returned by the refreshHandler callback.");
          }
          return accessTokenResponse;
        }
        return;
      }
      /**
       * Returns true if a token is expired or will expire within
       * eagerRefreshThresholdMillismilliseconds.
       * If there is no expiry time, assumes the token is not expired or expiring.
       */
      isTokenExpiring() {
        const expiryDate = this.credentials.expiry_date;
        return expiryDate ? expiryDate <= (/* @__PURE__ */ new Date()).getTime() + this.eagerRefreshThresholdMillis : false;
      }
    };
    exports.OAuth2Client = OAuth2Client2;
    OAuth2Client2.GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
    OAuth2Client2.CLOCK_SKEW_SECS_ = 300;
    OAuth2Client2.DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400;
  }
});

// node_modules/google-auth-library/build/src/auth/computeclient.js
var require_computeclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/computeclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Compute = void 0;
    var gaxios_1 = require_src();
    var gcpMetadata = require_src3();
    var oauth2client_1 = require_oauth2client();
    var Compute = class extends oauth2client_1.OAuth2Client {
      static {
        __name(this, "Compute");
      }
      /**
       * Google Compute Engine service account credentials.
       *
       * Retrieve access token from the metadata server.
       * See: https://cloud.google.com/compute/docs/access/authenticate-workloads#applications
       */
      constructor(options = {}) {
        super(options);
        this.credentials = { expiry_date: 1, refresh_token: "compute-placeholder" };
        this.serviceAccountEmail = options.serviceAccountEmail || "default";
        this.scopes = Array.isArray(options.scopes) ? options.scopes : options.scopes ? [options.scopes] : [];
      }
      /**
       * Refreshes the access token.
       * @param refreshToken Unused parameter
       */
      async refreshTokenNoCache(refreshToken) {
        const tokenPath = `service-accounts/${this.serviceAccountEmail}/token`;
        let data;
        try {
          const instanceOptions = {
            property: tokenPath
          };
          if (this.scopes.length > 0) {
            instanceOptions.params = {
              scopes: this.scopes.join(",")
            };
          }
          data = await gcpMetadata.instance(instanceOptions);
        } catch (e) {
          if (e instanceof gaxios_1.GaxiosError) {
            e.message = `Could not refresh access token: ${e.message}`;
            this.wrapError(e);
          }
          throw e;
        }
        const tokens = data;
        if (data && data.expires_in) {
          tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3;
          delete tokens.expires_in;
        }
        this.emit("tokens", tokens);
        return { tokens, res: null };
      }
      /**
       * Fetches an ID token.
       * @param targetAudience the audience for the fetched ID token.
       */
      async fetchIdToken(targetAudience) {
        const idTokenPath = `service-accounts/${this.serviceAccountEmail}/identity?format=full&audience=${targetAudience}`;
        let idToken;
        try {
          const instanceOptions = {
            property: idTokenPath
          };
          idToken = await gcpMetadata.instance(instanceOptions);
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Could not fetch ID token: ${e.message}`;
          }
          throw e;
        }
        return idToken;
      }
      wrapError(e) {
        const res = e.response;
        if (res && res.status) {
          e.status = res.status;
          if (res.status === 403) {
            e.message = "A Forbidden error was returned while attempting to retrieve an access token for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have the correct permission scopes specified: " + e.message;
          } else if (res.status === 404) {
            e.message = "A Not Found error was returned while attempting to retrieve an accesstoken for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have any permission scopes specified: " + e.message;
          }
        }
      }
    };
    exports.Compute = Compute;
  }
});

// node_modules/google-auth-library/build/src/auth/idtokenclient.js
var require_idtokenclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/idtokenclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IdTokenClient = void 0;
    var oauth2client_1 = require_oauth2client();
    var IdTokenClient = class extends oauth2client_1.OAuth2Client {
      static {
        __name(this, "IdTokenClient");
      }
      /**
       * Google ID Token client
       *
       * Retrieve ID token from the metadata server.
       * See: https://cloud.google.com/docs/authentication/get-id-token#metadata-server
       */
      constructor(options) {
        super(options);
        this.targetAudience = options.targetAudience;
        this.idTokenProvider = options.idTokenProvider;
      }
      async getRequestMetadataAsync(url) {
        if (!this.credentials.id_token || !this.credentials.expiry_date || this.isTokenExpiring()) {
          const idToken = await this.idTokenProvider.fetchIdToken(this.targetAudience);
          this.credentials = {
            id_token: idToken,
            expiry_date: this.getIdTokenExpiryDate(idToken)
          };
        }
        const headers = {
          Authorization: "Bearer " + this.credentials.id_token
        };
        return { headers };
      }
      getIdTokenExpiryDate(idToken) {
        const payloadB64 = idToken.split(".")[1];
        if (payloadB64) {
          const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString("ascii"));
          return payload.exp * 1e3;
        }
      }
    };
    exports.IdTokenClient = IdTokenClient;
  }
});

// node_modules/google-auth-library/build/src/auth/envDetect.js
var require_envDetect = __commonJS({
  "node_modules/google-auth-library/build/src/auth/envDetect.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GCPEnv = void 0;
    exports.clear = clear3;
    exports.getEnv = getEnv;
    var gcpMetadata = require_src3();
    var GCPEnv;
    (function(GCPEnv2) {
      GCPEnv2["APP_ENGINE"] = "APP_ENGINE";
      GCPEnv2["KUBERNETES_ENGINE"] = "KUBERNETES_ENGINE";
      GCPEnv2["CLOUD_FUNCTIONS"] = "CLOUD_FUNCTIONS";
      GCPEnv2["COMPUTE_ENGINE"] = "COMPUTE_ENGINE";
      GCPEnv2["CLOUD_RUN"] = "CLOUD_RUN";
      GCPEnv2["NONE"] = "NONE";
    })(GCPEnv || (exports.GCPEnv = GCPEnv = {}));
    var envPromise;
    function clear3() {
      envPromise = void 0;
    }
    __name(clear3, "clear");
    async function getEnv() {
      if (envPromise) {
        return envPromise;
      }
      envPromise = getEnvMemoized();
      return envPromise;
    }
    __name(getEnv, "getEnv");
    async function getEnvMemoized() {
      let env2 = GCPEnv.NONE;
      if (isAppEngine()) {
        env2 = GCPEnv.APP_ENGINE;
      } else if (isCloudFunction()) {
        env2 = GCPEnv.CLOUD_FUNCTIONS;
      } else if (await isComputeEngine()) {
        if (await isKubernetesEngine()) {
          env2 = GCPEnv.KUBERNETES_ENGINE;
        } else if (isCloudRun()) {
          env2 = GCPEnv.CLOUD_RUN;
        } else {
          env2 = GCPEnv.COMPUTE_ENGINE;
        }
      } else {
        env2 = GCPEnv.NONE;
      }
      return env2;
    }
    __name(getEnvMemoized, "getEnvMemoized");
    function isAppEngine() {
      return !!(process.env.GAE_SERVICE || process.env.GAE_MODULE_NAME);
    }
    __name(isAppEngine, "isAppEngine");
    function isCloudFunction() {
      return !!(process.env.FUNCTION_NAME || process.env.FUNCTION_TARGET);
    }
    __name(isCloudFunction, "isCloudFunction");
    function isCloudRun() {
      return !!process.env.K_CONFIGURATION;
    }
    __name(isCloudRun, "isCloudRun");
    async function isKubernetesEngine() {
      try {
        await gcpMetadata.instance("attributes/cluster-name");
        return true;
      } catch (e) {
        return false;
      }
    }
    __name(isKubernetesEngine, "isKubernetesEngine");
    async function isComputeEngine() {
      return gcpMetadata.isAvailable();
    }
    __name(isComputeEngine, "isComputeEngine");
  }
});

// node-built-in-modules:util
import libDefault13 from "util";
var require_util3 = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault13;
  }
});

// node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/jws/lib/data-stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = require_stream();
    var util = require_util3();
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    __name(DataStream, "DataStream");
    util.inherits(DataStream, Stream);
    DataStream.prototype.write = /* @__PURE__ */ __name(function write2(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    }, "write");
    DataStream.prototype.end = /* @__PURE__ */ __name(function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    }, "end");
    module.exports = DataStream;
  }
});

// node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "node_modules/buffer-equal-constant-time/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_buffer().Buffer;
    var SlowBuffer = require_buffer().SlowBuffer;
    module.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    __name(bufferEq, "bufferEq");
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = /* @__PURE__ */ __name(function equal(that) {
        return bufferEq(this, that);
      }, "equal");
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// node_modules/jwa/index.js
var require_jwa = __commonJS({
  "node_modules/jwa/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto3 = require_crypto();
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util = require_util3();
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto3.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    __name(checkIsPublicKey, "checkIsPublicKey");
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    __name(checkIsPrivateKey, "checkIsPrivateKey");
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    __name(checkIsSecretKey, "checkIsSecretKey");
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(fromBase64, "fromBase64");
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    __name(toBase64, "toBase64");
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util.format.bind(util, template).apply(null, args);
      return new TypeError(errMsg);
    }
    __name(typeError, "typeError");
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    __name(bufferOrString, "bufferOrString");
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    __name(normalizeInput, "normalizeInput");
    function createHmacSigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto3.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createHmacSigner, "createHmacSigner");
    var bufferEqual;
    var timingSafeEqual = "timingSafeEqual" in crypto3 ? /* @__PURE__ */ __name(function timingSafeEqual2(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return crypto3.timingSafeEqual(a, b);
    }, "timingSafeEqual") : /* @__PURE__ */ __name(function timingSafeEqual2(a, b) {
      if (!bufferEqual) {
        bufferEqual = require_buffer_equal_constant_time();
      }
      return bufferEqual(a, b);
    }, "timingSafeEqual");
    function createHmacVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      }, "verify");
    }
    __name(createHmacVerifier, "createHmacVerifier");
    function createKeySigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto3.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createKeySigner, "createKeySigner");
    function createKeyVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto3.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      }, "verify");
    }
    __name(createKeyVerifier, "createKeyVerifier");
    function createPSSKeySigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto3.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto3.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto3.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createPSSKeySigner, "createPSSKeySigner");
    function createPSSKeyVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto3.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto3.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto3.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      }, "verify");
    }
    __name(createPSSKeyVerifier, "createPSSKeyVerifier");
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return /* @__PURE__ */ __name(function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      }, "sign");
    }
    __name(createECDSASigner, "createECDSASigner");
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      }, "verify");
    }
    __name(createECDSAVerifer, "createECDSAVerifer");
    function createNoneSigner() {
      return /* @__PURE__ */ __name(function sign() {
        return "";
      }, "sign");
    }
    __name(createNoneSigner, "createNoneSigner");
    function createNoneVerifier() {
      return /* @__PURE__ */ __name(function verify(thing, signature) {
        return signature === "";
      }, "verify");
    }
    __name(createNoneVerifier, "createNoneVerifier");
    module.exports = /* @__PURE__ */ __name(function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match2 = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
      if (!match2)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match2[1] || match2[3]).toLowerCase();
      var bits = match2[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    }, "jwa");
  }
});

// node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "node_modules/jws/lib/tostring.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_buffer().Buffer;
    module.exports = /* @__PURE__ */ __name(function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    }, "toString");
  }
});

// node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "node_modules/jws/lib/sign-stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require_stream();
    var toString = require_tostring();
    var util = require_util3();
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(base64url, "base64url");
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util.format("%s.%s", encodedHeader, encodedPayload);
    }
    __name(jwsSecuredInput, "jwsSecuredInput");
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util.format("%s.%s", securedInput, signature);
    }
    __name(jwsSign, "jwsSign");
    function SignStream(opts) {
      var secret = opts.secret;
      secret = secret == null ? opts.privateKey : secret;
      secret = secret == null ? opts.key : secret;
      if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    __name(SignStream, "SignStream");
    util.inherits(SignStream, Stream);
    SignStream.prototype.sign = /* @__PURE__ */ __name(function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    }, "sign");
    SignStream.sign = jwsSign;
    module.exports = SignStream;
  }
});

// node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "node_modules/jws/lib/verify-stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require_stream();
    var toString = require_tostring();
    var util = require_util3();
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    __name(isObject, "isObject");
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    __name(safeJsonParse, "safeJsonParse");
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    __name(headerFromJWS, "headerFromJWS");
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    __name(securedInputFromJWS, "securedInputFromJWS");
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    __name(signatureFromJWS, "signatureFromJWS");
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    __name(payloadFromJWS, "payloadFromJWS");
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    __name(isValidJws, "isValidJws");
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    __name(jwsVerify, "jwsVerify");
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    __name(jwsDecode, "jwsDecode");
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret;
      secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
      secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
      if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    __name(VerifyStream, "VerifyStream");
    util.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = /* @__PURE__ */ __name(function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    }, "verify");
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module.exports = VerifyStream;
  }
});

// node_modules/jws/index.js
var require_jws = __commonJS({
  "node_modules/jws/index.js"(exports) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports.ALGORITHMS = ALGORITHMS;
    exports.sign = SignStream.sign;
    exports.verify = VerifyStream.verify;
    exports.decode = VerifyStream.decode;
    exports.isValid = VerifyStream.isValid;
    exports.createSign = /* @__PURE__ */ __name(function createSign(opts) {
      return new SignStream(opts);
    }, "createSign");
    exports.createVerify = /* @__PURE__ */ __name(function createVerify(opts) {
      return new VerifyStream(opts);
    }, "createVerify");
  }
});

// node_modules/gtoken/build/src/index.js
var require_src4 = __commonJS({
  "node_modules/gtoken/build/src/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _GoogleToken_instances;
    var _GoogleToken_inFlightRequest;
    var _GoogleToken_getTokenAsync;
    var _GoogleToken_getTokenAsyncInner;
    var _GoogleToken_ensureEmail;
    var _GoogleToken_revokeTokenAsync;
    var _GoogleToken_configure;
    var _GoogleToken_requestToken;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleToken = void 0;
    var fs = require_fs();
    var gaxios_1 = require_src();
    var jws = require_jws();
    var path = require_path();
    var util_1 = require_util3();
    var readFile3 = fs.readFile ? (0, util_1.promisify)(fs.readFile) : async () => {
      throw new ErrorWithCode("use key rather than keyFile.", "MISSING_CREDENTIALS");
    };
    var GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
    var GOOGLE_REVOKE_TOKEN_URL = "https://accounts.google.com/o/oauth2/revoke?token=";
    var ErrorWithCode = class extends Error {
      static {
        __name(this, "ErrorWithCode");
      }
      constructor(message, code) {
        super(message);
        this.code = code;
      }
    };
    var GoogleToken = class {
      static {
        __name(this, "GoogleToken");
      }
      get accessToken() {
        return this.rawToken ? this.rawToken.access_token : void 0;
      }
      get idToken() {
        return this.rawToken ? this.rawToken.id_token : void 0;
      }
      get tokenType() {
        return this.rawToken ? this.rawToken.token_type : void 0;
      }
      get refreshToken() {
        return this.rawToken ? this.rawToken.refresh_token : void 0;
      }
      /**
       * Create a GoogleToken.
       *
       * @param options  Configuration object.
       */
      constructor(options) {
        _GoogleToken_instances.add(this);
        this.transporter = {
          request: /* @__PURE__ */ __name((opts) => (0, gaxios_1.request)(opts), "request")
        };
        _GoogleToken_inFlightRequest.set(this, void 0);
        __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_configure).call(this, options);
      }
      /**
       * Returns whether the token has expired.
       *
       * @return true if the token has expired, false otherwise.
       */
      hasExpired() {
        const now = (/* @__PURE__ */ new Date()).getTime();
        if (this.rawToken && this.expiresAt) {
          return now >= this.expiresAt;
        } else {
          return true;
        }
      }
      /**
       * Returns whether the token will expire within eagerRefreshThresholdMillis
       *
       * @return true if the token will be expired within eagerRefreshThresholdMillis, false otherwise.
       */
      isTokenExpiring() {
        var _a;
        const now = (/* @__PURE__ */ new Date()).getTime();
        const eagerRefreshThresholdMillis = (_a = this.eagerRefreshThresholdMillis) !== null && _a !== void 0 ? _a : 0;
        if (this.rawToken && this.expiresAt) {
          return this.expiresAt <= now + eagerRefreshThresholdMillis;
        } else {
          return true;
        }
      }
      getToken(callback, opts = {}) {
        if (typeof callback === "object") {
          opts = callback;
          callback = void 0;
        }
        opts = Object.assign({
          forceRefresh: false
        }, opts);
        if (callback) {
          const cb = callback;
          __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_getTokenAsync).call(this, opts).then((t) => cb(null, t), callback);
          return;
        }
        return __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_getTokenAsync).call(this, opts);
      }
      /**
       * Given a keyFile, extract the key and client email if available
       * @param keyFile Path to a json, pem, or p12 file that contains the key.
       * @returns an object with privateKey and clientEmail properties
       */
      async getCredentials(keyFile) {
        const ext = path.extname(keyFile);
        switch (ext) {
          case ".json": {
            const key = await readFile3(keyFile, "utf8");
            const body = JSON.parse(key);
            const privateKey = body.private_key;
            const clientEmail = body.client_email;
            if (!privateKey || !clientEmail) {
              throw new ErrorWithCode("private_key and client_email are required.", "MISSING_CREDENTIALS");
            }
            return { privateKey, clientEmail };
          }
          case ".der":
          case ".crt":
          case ".pem": {
            const privateKey = await readFile3(keyFile, "utf8");
            return { privateKey };
          }
          case ".p12":
          case ".pfx": {
            throw new ErrorWithCode("*.p12 certificates are not supported after v6.1.2. Consider utilizing *.json format or converting *.p12 to *.pem using the OpenSSL CLI.", "UNKNOWN_CERTIFICATE_TYPE");
          }
          default:
            throw new ErrorWithCode("Unknown certificate type. Type is determined based on file extension. Current supported extensions are *.json, and *.pem.", "UNKNOWN_CERTIFICATE_TYPE");
        }
      }
      revokeToken(callback) {
        if (callback) {
          __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_revokeTokenAsync).call(this).then(() => callback(), callback);
          return;
        }
        return __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_revokeTokenAsync).call(this);
      }
    };
    exports.GoogleToken = GoogleToken;
    _GoogleToken_inFlightRequest = /* @__PURE__ */ new WeakMap(), _GoogleToken_instances = /* @__PURE__ */ new WeakSet(), _GoogleToken_getTokenAsync = /* @__PURE__ */ __name(async function _GoogleToken_getTokenAsync2(opts) {
      if (__classPrivateFieldGet(this, _GoogleToken_inFlightRequest, "f") && !opts.forceRefresh) {
        return __classPrivateFieldGet(this, _GoogleToken_inFlightRequest, "f");
      }
      try {
        return await __classPrivateFieldSet(this, _GoogleToken_inFlightRequest, __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_getTokenAsyncInner).call(this, opts), "f");
      } finally {
        __classPrivateFieldSet(this, _GoogleToken_inFlightRequest, void 0, "f");
      }
    }, "_GoogleToken_getTokenAsync"), _GoogleToken_getTokenAsyncInner = /* @__PURE__ */ __name(async function _GoogleToken_getTokenAsyncInner2(opts) {
      if (this.isTokenExpiring() === false && opts.forceRefresh === false) {
        return Promise.resolve(this.rawToken);
      }
      if (!this.key && !this.keyFile) {
        throw new Error("No key or keyFile set.");
      }
      if (!this.key && this.keyFile) {
        const creds = await this.getCredentials(this.keyFile);
        this.key = creds.privateKey;
        this.iss = creds.clientEmail || this.iss;
        if (!creds.clientEmail) {
          __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_ensureEmail).call(this);
        }
      }
      return __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_requestToken).call(this);
    }, "_GoogleToken_getTokenAsyncInner"), _GoogleToken_ensureEmail = /* @__PURE__ */ __name(function _GoogleToken_ensureEmail2() {
      if (!this.iss) {
        throw new ErrorWithCode("email is required.", "MISSING_CREDENTIALS");
      }
    }, "_GoogleToken_ensureEmail"), _GoogleToken_revokeTokenAsync = /* @__PURE__ */ __name(async function _GoogleToken_revokeTokenAsync2() {
      if (!this.accessToken) {
        throw new Error("No token to revoke.");
      }
      const url = GOOGLE_REVOKE_TOKEN_URL + this.accessToken;
      await this.transporter.request({
        url,
        retry: true
      });
      __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_configure).call(this, {
        email: this.iss,
        sub: this.sub,
        key: this.key,
        keyFile: this.keyFile,
        scope: this.scope,
        additionalClaims: this.additionalClaims
      });
    }, "_GoogleToken_revokeTokenAsync"), _GoogleToken_configure = /* @__PURE__ */ __name(function _GoogleToken_configure2(options = {}) {
      this.keyFile = options.keyFile;
      this.key = options.key;
      this.rawToken = void 0;
      this.iss = options.email || options.iss;
      this.sub = options.sub;
      this.additionalClaims = options.additionalClaims;
      if (typeof options.scope === "object") {
        this.scope = options.scope.join(" ");
      } else {
        this.scope = options.scope;
      }
      this.eagerRefreshThresholdMillis = options.eagerRefreshThresholdMillis;
      if (options.transporter) {
        this.transporter = options.transporter;
      }
    }, "_GoogleToken_configure"), _GoogleToken_requestToken = /**
     * Request the token from Google.
     */
    /* @__PURE__ */ __name(async function _GoogleToken_requestToken2() {
      var _a, _b;
      const iat = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      const additionalClaims = this.additionalClaims || {};
      const payload = Object.assign({
        iss: this.iss,
        scope: this.scope,
        aud: GOOGLE_TOKEN_URL,
        exp: iat + 3600,
        iat,
        sub: this.sub
      }, additionalClaims);
      const signedJWT = jws.sign({
        header: { alg: "RS256" },
        payload,
        secret: this.key
      });
      try {
        const r = await this.transporter.request({
          method: "POST",
          url: GOOGLE_TOKEN_URL,
          data: {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: signedJWT
          },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          responseType: "json",
          retryConfig: {
            httpMethodsToRetry: ["POST"]
          }
        });
        this.rawToken = r.data;
        this.expiresAt = r.data.expires_in === null || r.data.expires_in === void 0 ? void 0 : (iat + r.data.expires_in) * 1e3;
        return this.rawToken;
      } catch (e) {
        this.rawToken = void 0;
        this.tokenExpires = void 0;
        const body = e.response && ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) ? (_b = e.response) === null || _b === void 0 ? void 0 : _b.data : {};
        if (body.error) {
          const desc = body.error_description ? `: ${body.error_description}` : "";
          e.message = `${body.error}${desc}`;
        }
        throw e;
      }
    }, "_GoogleToken_requestToken");
  }
});

// node_modules/google-auth-library/build/src/auth/jwtaccess.js
var require_jwtaccess = __commonJS({
  "node_modules/google-auth-library/build/src/auth/jwtaccess.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JWTAccess = void 0;
    var jws = require_jws();
    var util_1 = require_util2();
    var DEFAULT_HEADER = {
      alg: "RS256",
      typ: "JWT"
    };
    var JWTAccess = class _JWTAccess {
      static {
        __name(this, "JWTAccess");
      }
      /**
       * JWTAccess service account credentials.
       *
       * Create a new access token by using the credential to create a new JWT token
       * that's recognized as the access token.
       *
       * @param email the service account email address.
       * @param key the private key that will be used to sign the token.
       * @param keyId the ID of the private key used to sign the token.
       */
      constructor(email, key, keyId, eagerRefreshThresholdMillis) {
        this.cache = new util_1.LRUCache({
          capacity: 500,
          maxAge: 60 * 60 * 1e3
        });
        this.email = email;
        this.key = key;
        this.keyId = keyId;
        this.eagerRefreshThresholdMillis = eagerRefreshThresholdMillis !== null && eagerRefreshThresholdMillis !== void 0 ? eagerRefreshThresholdMillis : 5 * 60 * 1e3;
      }
      /**
       * Ensures that we're caching a key appropriately, giving precedence to scopes vs. url
       *
       * @param url The URI being authorized.
       * @param scopes The scope or scopes being authorized
       * @returns A string that returns the cached key.
       */
      getCachedKey(url, scopes) {
        let cacheKey2 = url;
        if (scopes && Array.isArray(scopes) && scopes.length) {
          cacheKey2 = url ? `${url}_${scopes.join("_")}` : `${scopes.join("_")}`;
        } else if (typeof scopes === "string") {
          cacheKey2 = url ? `${url}_${scopes}` : scopes;
        }
        if (!cacheKey2) {
          throw Error("Scopes or url must be provided");
        }
        return cacheKey2;
      }
      /**
       * Get a non-expired access token, after refreshing if necessary.
       *
       * @param url The URI being authorized.
       * @param additionalClaims An object with a set of additional claims to
       * include in the payload.
       * @returns An object that includes the authorization header.
       */
      getRequestHeaders(url, additionalClaims, scopes) {
        const key = this.getCachedKey(url, scopes);
        const cachedToken = this.cache.get(key);
        const now = Date.now();
        if (cachedToken && cachedToken.expiration - now > this.eagerRefreshThresholdMillis) {
          return cachedToken.headers;
        }
        const iat = Math.floor(Date.now() / 1e3);
        const exp = _JWTAccess.getExpirationTime(iat);
        let defaultClaims;
        if (Array.isArray(scopes)) {
          scopes = scopes.join(" ");
        }
        if (scopes) {
          defaultClaims = {
            iss: this.email,
            sub: this.email,
            scope: scopes,
            exp,
            iat
          };
        } else {
          defaultClaims = {
            iss: this.email,
            sub: this.email,
            aud: url,
            exp,
            iat
          };
        }
        if (additionalClaims) {
          for (const claim in defaultClaims) {
            if (additionalClaims[claim]) {
              throw new Error(`The '${claim}' property is not allowed when passing additionalClaims. This claim is included in the JWT by default.`);
            }
          }
        }
        const header = this.keyId ? { ...DEFAULT_HEADER, kid: this.keyId } : DEFAULT_HEADER;
        const payload = Object.assign(defaultClaims, additionalClaims);
        const signedJWT = jws.sign({ header, payload, secret: this.key });
        const headers = { Authorization: `Bearer ${signedJWT}` };
        this.cache.set(key, {
          expiration: exp * 1e3,
          headers
        });
        return headers;
      }
      /**
       * Returns an expiration time for the JWT token.
       *
       * @param iat The issued at time for the JWT.
       * @returns An expiration time for the JWT.
       */
      static getExpirationTime(iat) {
        const exp = iat + 3600;
        return exp;
      }
      /**
       * Create a JWTAccess credentials instance using the given input options.
       * @param json The input object.
       */
      fromJSON(json) {
        if (!json) {
          throw new Error("Must pass in a JSON object containing the service account auth settings.");
        }
        if (!json.client_email) {
          throw new Error("The incoming JSON object does not contain a client_email field");
        }
        if (!json.private_key) {
          throw new Error("The incoming JSON object does not contain a private_key field");
        }
        this.email = json.client_email;
        this.key = json.private_key;
        this.keyId = json.private_key_id;
        this.projectId = json.project_id;
      }
      fromStream(inputStream, callback) {
        if (callback) {
          this.fromStreamAsync(inputStream).then(() => callback(), callback);
        } else {
          return this.fromStreamAsync(inputStream);
        }
      }
      fromStreamAsync(inputStream) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            reject(new Error("Must pass in a stream containing the service account auth settings."));
          }
          let s = "";
          inputStream.setEncoding("utf8").on("data", (chunk) => s += chunk).on("error", reject).on("end", () => {
            try {
              const data = JSON.parse(s);
              this.fromJSON(data);
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    };
    exports.JWTAccess = JWTAccess;
  }
});

// node_modules/google-auth-library/build/src/auth/jwtclient.js
var require_jwtclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/jwtclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JWT = void 0;
    var gtoken_1 = require_src4();
    var jwtaccess_1 = require_jwtaccess();
    var oauth2client_1 = require_oauth2client();
    var authclient_1 = require_authclient();
    var JWT = class _JWT extends oauth2client_1.OAuth2Client {
      static {
        __name(this, "JWT");
      }
      constructor(optionsOrEmail, keyFile, key, scopes, subject, keyId) {
        const opts = optionsOrEmail && typeof optionsOrEmail === "object" ? optionsOrEmail : { email: optionsOrEmail, keyFile, key, keyId, scopes, subject };
        super(opts);
        this.email = opts.email;
        this.keyFile = opts.keyFile;
        this.key = opts.key;
        this.keyId = opts.keyId;
        this.scopes = opts.scopes;
        this.subject = opts.subject;
        this.additionalClaims = opts.additionalClaims;
        this.credentials = { refresh_token: "jwt-placeholder", expiry_date: 1 };
      }
      /**
       * Creates a copy of the credential with the specified scopes.
       * @param scopes List of requested scopes or a single scope.
       * @return The cloned instance.
       */
      createScoped(scopes) {
        const jwt = new _JWT(this);
        jwt.scopes = scopes;
        return jwt;
      }
      /**
       * Obtains the metadata to be sent with the request.
       *
       * @param url the URI being authorized.
       */
      async getRequestMetadataAsync(url) {
        url = this.defaultServicePath ? `https://${this.defaultServicePath}/` : url;
        const useSelfSignedJWT = !this.hasUserScopes() && url || this.useJWTAccessWithScope && this.hasAnyScopes() || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
        if (this.subject && this.universeDomain !== authclient_1.DEFAULT_UNIVERSE) {
          throw new RangeError(`Service Account user is configured for the credential. Domain-wide delegation is not supported in universes other than ${authclient_1.DEFAULT_UNIVERSE}`);
        }
        if (!this.apiKey && useSelfSignedJWT) {
          if (this.additionalClaims && this.additionalClaims.target_audience) {
            const { tokens } = await this.refreshToken();
            return {
              headers: this.addSharedMetadataHeaders({
                Authorization: `Bearer ${tokens.id_token}`
              })
            };
          } else {
            if (!this.access) {
              this.access = new jwtaccess_1.JWTAccess(this.email, this.key, this.keyId, this.eagerRefreshThresholdMillis);
            }
            let scopes;
            if (this.hasUserScopes()) {
              scopes = this.scopes;
            } else if (!url) {
              scopes = this.defaultScopes;
            }
            const useScopes = this.useJWTAccessWithScope || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
            const headers = await this.access.getRequestHeaders(
              url !== null && url !== void 0 ? url : void 0,
              this.additionalClaims,
              // Scopes take precedent over audience for signing,
              // so we only provide them if `useJWTAccessWithScope` is on or
              // if we are in a non-default universe
              useScopes ? scopes : void 0
            );
            return { headers: this.addSharedMetadataHeaders(headers) };
          }
        } else if (this.hasAnyScopes() || this.apiKey) {
          return super.getRequestMetadataAsync(url);
        } else {
          return { headers: {} };
        }
      }
      /**
       * Fetches an ID token.
       * @param targetAudience the audience for the fetched ID token.
       */
      async fetchIdToken(targetAudience) {
        const gtoken = new gtoken_1.GoogleToken({
          iss: this.email,
          sub: this.subject,
          scope: this.scopes || this.defaultScopes,
          keyFile: this.keyFile,
          key: this.key,
          additionalClaims: { target_audience: targetAudience },
          transporter: this.transporter
        });
        await gtoken.getToken({
          forceRefresh: true
        });
        if (!gtoken.idToken) {
          throw new Error("Unknown error: Failed to fetch ID token");
        }
        return gtoken.idToken;
      }
      /**
       * Determine if there are currently scopes available.
       */
      hasUserScopes() {
        if (!this.scopes) {
          return false;
        }
        return this.scopes.length > 0;
      }
      /**
       * Are there any default or user scopes defined.
       */
      hasAnyScopes() {
        if (this.scopes && this.scopes.length > 0)
          return true;
        if (this.defaultScopes && this.defaultScopes.length > 0)
          return true;
        return false;
      }
      authorize(callback) {
        if (callback) {
          this.authorizeAsync().then((r) => callback(null, r), callback);
        } else {
          return this.authorizeAsync();
        }
      }
      async authorizeAsync() {
        const result = await this.refreshToken();
        if (!result) {
          throw new Error("No result returned");
        }
        this.credentials = result.tokens;
        this.credentials.refresh_token = "jwt-placeholder";
        this.key = this.gtoken.key;
        this.email = this.gtoken.iss;
        return result.tokens;
      }
      /**
       * Refreshes the access token.
       * @param refreshToken ignored
       * @private
       */
      async refreshTokenNoCache(refreshToken) {
        const gtoken = this.createGToken();
        const token = await gtoken.getToken({
          forceRefresh: this.isTokenExpiring()
        });
        const tokens = {
          access_token: token.access_token,
          token_type: "Bearer",
          expiry_date: gtoken.expiresAt,
          id_token: gtoken.idToken
        };
        this.emit("tokens", tokens);
        return { res: null, tokens };
      }
      /**
       * Create a gToken if it doesn't already exist.
       */
      createGToken() {
        if (!this.gtoken) {
          this.gtoken = new gtoken_1.GoogleToken({
            iss: this.email,
            sub: this.subject,
            scope: this.scopes || this.defaultScopes,
            keyFile: this.keyFile,
            key: this.key,
            additionalClaims: this.additionalClaims,
            transporter: this.transporter
          });
        }
        return this.gtoken;
      }
      /**
       * Create a JWT credentials instance using the given input options.
       * @param json The input object.
       *
       * @remarks
       *
       * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
       */
      fromJSON(json) {
        if (!json) {
          throw new Error("Must pass in a JSON object containing the service account auth settings.");
        }
        if (!json.client_email) {
          throw new Error("The incoming JSON object does not contain a client_email field");
        }
        if (!json.private_key) {
          throw new Error("The incoming JSON object does not contain a private_key field");
        }
        this.email = json.client_email;
        this.key = json.private_key;
        this.keyId = json.private_key_id;
        this.projectId = json.project_id;
        this.quotaProjectId = json.quota_project_id;
        this.universeDomain = json.universe_domain || this.universeDomain;
      }
      fromStream(inputStream, callback) {
        if (callback) {
          this.fromStreamAsync(inputStream).then(() => callback(), callback);
        } else {
          return this.fromStreamAsync(inputStream);
        }
      }
      fromStreamAsync(inputStream) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            throw new Error("Must pass in a stream containing the service account auth settings.");
          }
          let s = "";
          inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
            try {
              const data = JSON.parse(s);
              this.fromJSON(data);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        });
      }
      /**
       * Creates a JWT credentials instance using an API Key for authentication.
       * @param apiKey The API Key in string form.
       */
      fromAPIKey(apiKey) {
        if (typeof apiKey !== "string") {
          throw new Error("Must provide an API Key string.");
        }
        this.apiKey = apiKey;
      }
      /**
       * Using the key or keyFile on the JWT client, obtain an object that contains
       * the key and the client email.
       */
      async getCredentials() {
        if (this.key) {
          return { private_key: this.key, client_email: this.email };
        } else if (this.keyFile) {
          const gtoken = this.createGToken();
          const creds = await gtoken.getCredentials(this.keyFile);
          return { private_key: creds.privateKey, client_email: creds.clientEmail };
        }
        throw new Error("A key or a keyFile must be provided to getCredentials.");
      }
    };
    exports.JWT = JWT;
  }
});

// node_modules/google-auth-library/build/src/auth/refreshclient.js
var require_refreshclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/refreshclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserRefreshClient = exports.USER_REFRESH_ACCOUNT_TYPE = void 0;
    var oauth2client_1 = require_oauth2client();
    var querystring_1 = require_querystring();
    exports.USER_REFRESH_ACCOUNT_TYPE = "authorized_user";
    var UserRefreshClient = class _UserRefreshClient extends oauth2client_1.OAuth2Client {
      static {
        __name(this, "UserRefreshClient");
      }
      constructor(optionsOrClientId, clientSecret, refreshToken, eagerRefreshThresholdMillis, forceRefreshOnFailure) {
        const opts = optionsOrClientId && typeof optionsOrClientId === "object" ? optionsOrClientId : {
          clientId: optionsOrClientId,
          clientSecret,
          refreshToken,
          eagerRefreshThresholdMillis,
          forceRefreshOnFailure
        };
        super(opts);
        this._refreshToken = opts.refreshToken;
        this.credentials.refresh_token = opts.refreshToken;
      }
      /**
       * Refreshes the access token.
       * @param refreshToken An ignored refreshToken..
       * @param callback Optional callback.
       */
      async refreshTokenNoCache(refreshToken) {
        return super.refreshTokenNoCache(this._refreshToken);
      }
      async fetchIdToken(targetAudience) {
        const res = await this.transporter.request({
          ..._UserRefreshClient.RETRY_CONFIG,
          url: this.endpoints.oauth2TokenUrl,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: (0, querystring_1.stringify)({
            client_id: this._clientId,
            client_secret: this._clientSecret,
            grant_type: "refresh_token",
            refresh_token: this._refreshToken,
            target_audience: targetAudience
          })
        });
        return res.data.id_token;
      }
      /**
       * Create a UserRefreshClient credentials instance using the given input
       * options.
       * @param json The input object.
       */
      fromJSON(json) {
        if (!json) {
          throw new Error("Must pass in a JSON object containing the user refresh token");
        }
        if (json.type !== "authorized_user") {
          throw new Error('The incoming JSON object does not have the "authorized_user" type');
        }
        if (!json.client_id) {
          throw new Error("The incoming JSON object does not contain a client_id field");
        }
        if (!json.client_secret) {
          throw new Error("The incoming JSON object does not contain a client_secret field");
        }
        if (!json.refresh_token) {
          throw new Error("The incoming JSON object does not contain a refresh_token field");
        }
        this._clientId = json.client_id;
        this._clientSecret = json.client_secret;
        this._refreshToken = json.refresh_token;
        this.credentials.refresh_token = json.refresh_token;
        this.quotaProjectId = json.quota_project_id;
        this.universeDomain = json.universe_domain || this.universeDomain;
      }
      fromStream(inputStream, callback) {
        if (callback) {
          this.fromStreamAsync(inputStream).then(() => callback(), callback);
        } else {
          return this.fromStreamAsync(inputStream);
        }
      }
      async fromStreamAsync(inputStream) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            return reject(new Error("Must pass in a stream containing the user refresh token."));
          }
          let s = "";
          inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
            try {
              const data = JSON.parse(s);
              this.fromJSON(data);
              return resolve();
            } catch (err) {
              return reject(err);
            }
          });
        });
      }
      /**
       * Create a UserRefreshClient credentials instance using the given input
       * options.
       * @param json The input object.
       */
      static fromJSON(json) {
        const client = new _UserRefreshClient();
        client.fromJSON(json);
        return client;
      }
    };
    exports.UserRefreshClient = UserRefreshClient;
  }
});

// node_modules/google-auth-library/build/src/auth/impersonated.js
var require_impersonated = __commonJS({
  "node_modules/google-auth-library/build/src/auth/impersonated.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Impersonated = exports.IMPERSONATED_ACCOUNT_TYPE = void 0;
    var oauth2client_1 = require_oauth2client();
    var gaxios_1 = require_src();
    var util_1 = require_util2();
    exports.IMPERSONATED_ACCOUNT_TYPE = "impersonated_service_account";
    var Impersonated = class _Impersonated extends oauth2client_1.OAuth2Client {
      static {
        __name(this, "Impersonated");
      }
      /**
       * Impersonated service account credentials.
       *
       * Create a new access token by impersonating another service account.
       *
       * Impersonated Credentials allowing credentials issued to a user or
       * service account to impersonate another. The source project using
       * Impersonated Credentials must enable the "IAMCredentials" API.
       * Also, the target service account must grant the orginating principal
       * the "Service Account Token Creator" IAM role.
       *
       * @param {object} options - The configuration object.
       * @param {object} [options.sourceClient] the source credential used as to
       * acquire the impersonated credentials.
       * @param {string} [options.targetPrincipal] the service account to
       * impersonate.
       * @param {string[]} [options.delegates] the chained list of delegates
       * required to grant the final access_token. If set, the sequence of
       * identities must have "Service Account Token Creator" capability granted to
       * the preceding identity. For example, if set to [serviceAccountB,
       * serviceAccountC], the sourceCredential must have the Token Creator role on
       * serviceAccountB. serviceAccountB must have the Token Creator on
       * serviceAccountC. Finally, C must have Token Creator on target_principal.
       * If left unset, sourceCredential must have that role on targetPrincipal.
       * @param {string[]} [options.targetScopes] scopes to request during the
       * authorization grant.
       * @param {number} [options.lifetime] number of seconds the delegated
       * credential should be valid for up to 3600 seconds by default, or 43,200
       * seconds by extending the token's lifetime, see:
       * https://cloud.google.com/iam/docs/creating-short-lived-service-account-credentials#sa-credentials-oauth
       * @param {string} [options.endpoint] api endpoint override.
       */
      constructor(options = {}) {
        var _a, _b, _c, _d, _e, _f;
        super(options);
        this.credentials = {
          expiry_date: 1,
          refresh_token: "impersonated-placeholder"
        };
        this.sourceClient = (_a = options.sourceClient) !== null && _a !== void 0 ? _a : new oauth2client_1.OAuth2Client();
        this.targetPrincipal = (_b = options.targetPrincipal) !== null && _b !== void 0 ? _b : "";
        this.delegates = (_c = options.delegates) !== null && _c !== void 0 ? _c : [];
        this.targetScopes = (_d = options.targetScopes) !== null && _d !== void 0 ? _d : [];
        this.lifetime = (_e = options.lifetime) !== null && _e !== void 0 ? _e : 3600;
        const usingExplicitUniverseDomain = !!(0, util_1.originalOrCamelOptions)(options).get("universe_domain");
        if (!usingExplicitUniverseDomain) {
          this.universeDomain = this.sourceClient.universeDomain;
        } else if (this.sourceClient.universeDomain !== this.universeDomain) {
          throw new RangeError(`Universe domain ${this.sourceClient.universeDomain} in source credentials does not match ${this.universeDomain} universe domain set for impersonated credentials.`);
        }
        this.endpoint = (_f = options.endpoint) !== null && _f !== void 0 ? _f : `https://iamcredentials.${this.universeDomain}`;
      }
      /**
       * Signs some bytes.
       *
       * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob Reference Documentation}
       * @param blobToSign String to sign.
       *
       * @returns A {@link SignBlobResponse} denoting the keyID and signedBlob in base64 string
       */
      async sign(blobToSign) {
        await this.sourceClient.getAccessToken();
        const name = `projects/-/serviceAccounts/${this.targetPrincipal}`;
        const u = `${this.endpoint}/v1/${name}:signBlob`;
        const body = {
          delegates: this.delegates,
          payload: Buffer.from(blobToSign).toString("base64")
        };
        const res = await this.sourceClient.request({
          ..._Impersonated.RETRY_CONFIG,
          url: u,
          data: body,
          method: "POST"
        });
        return res.data;
      }
      /** The service account email to be impersonated. */
      getTargetPrincipal() {
        return this.targetPrincipal;
      }
      /**
       * Refreshes the access token.
       */
      async refreshToken() {
        var _a, _b, _c, _d, _e, _f;
        try {
          await this.sourceClient.getAccessToken();
          const name = "projects/-/serviceAccounts/" + this.targetPrincipal;
          const u = `${this.endpoint}/v1/${name}:generateAccessToken`;
          const body = {
            delegates: this.delegates,
            scope: this.targetScopes,
            lifetime: this.lifetime + "s"
          };
          const res = await this.sourceClient.request({
            ..._Impersonated.RETRY_CONFIG,
            url: u,
            data: body,
            method: "POST"
          });
          const tokenResponse = res.data;
          this.credentials.access_token = tokenResponse.accessToken;
          this.credentials.expiry_date = Date.parse(tokenResponse.expireTime);
          return {
            tokens: this.credentials,
            res
          };
        } catch (error3) {
          if (!(error3 instanceof Error))
            throw error3;
          let status = 0;
          let message = "";
          if (error3 instanceof gaxios_1.GaxiosError) {
            status = (_c = (_b = (_a = error3 === null || error3 === void 0 ? void 0 : error3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.status;
            message = (_f = (_e = (_d = error3 === null || error3 === void 0 ? void 0 : error3.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.message;
          }
          if (status && message) {
            error3.message = `${status}: unable to impersonate: ${message}`;
            throw error3;
          } else {
            error3.message = `unable to impersonate: ${error3}`;
            throw error3;
          }
        }
      }
      /**
       * Generates an OpenID Connect ID token for a service account.
       *
       * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/generateIdToken Reference Documentation}
       *
       * @param targetAudience the audience for the fetched ID token.
       * @param options the for the request
       * @return an OpenID Connect ID token
       */
      async fetchIdToken(targetAudience, options) {
        var _a, _b;
        await this.sourceClient.getAccessToken();
        const name = `projects/-/serviceAccounts/${this.targetPrincipal}`;
        const u = `${this.endpoint}/v1/${name}:generateIdToken`;
        const body = {
          delegates: this.delegates,
          audience: targetAudience,
          includeEmail: (_a = options === null || options === void 0 ? void 0 : options.includeEmail) !== null && _a !== void 0 ? _a : true,
          useEmailAzp: (_b = options === null || options === void 0 ? void 0 : options.includeEmail) !== null && _b !== void 0 ? _b : true
        };
        const res = await this.sourceClient.request({
          ..._Impersonated.RETRY_CONFIG,
          url: u,
          data: body,
          method: "POST"
        });
        return res.data.token;
      }
    };
    exports.Impersonated = Impersonated;
  }
});

// node_modules/google-auth-library/build/src/auth/oauth2common.js
var require_oauth2common = __commonJS({
  "node_modules/google-auth-library/build/src/auth/oauth2common.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OAuthClientAuthHandler = void 0;
    exports.getErrorFromOAuthErrorResponse = getErrorFromOAuthErrorResponse;
    var querystring = require_querystring();
    var crypto_1 = require_crypto4();
    var METHODS_SUPPORTING_REQUEST_BODY = ["PUT", "POST", "PATCH"];
    var OAuthClientAuthHandler = class {
      static {
        __name(this, "OAuthClientAuthHandler");
      }
      /**
       * Instantiates an OAuth client authentication handler.
       * @param clientAuthentication The client auth credentials.
       */
      constructor(clientAuthentication) {
        this.clientAuthentication = clientAuthentication;
        this.crypto = (0, crypto_1.createCrypto)();
      }
      /**
       * Applies client authentication on the OAuth request's headers or POST
       * body but does not process the request.
       * @param opts The GaxiosOptions whose headers or data are to be modified
       *   depending on the client authentication mechanism to be used.
       * @param bearerToken The optional bearer token to use for authentication.
       *   When this is used, no client authentication credentials are needed.
       */
      applyClientAuthenticationOptions(opts, bearerToken) {
        this.injectAuthenticatedHeaders(opts, bearerToken);
        if (!bearerToken) {
          this.injectAuthenticatedRequestBody(opts);
        }
      }
      /**
       * Applies client authentication on the request's header if either
       * basic authentication or bearer token authentication is selected.
       *
       * @param opts The GaxiosOptions whose headers or data are to be modified
       *   depending on the client authentication mechanism to be used.
       * @param bearerToken The optional bearer token to use for authentication.
       *   When this is used, no client authentication credentials are needed.
       */
      injectAuthenticatedHeaders(opts, bearerToken) {
        var _a;
        if (bearerToken) {
          opts.headers = opts.headers || {};
          Object.assign(opts.headers, {
            Authorization: `Bearer ${bearerToken}}`
          });
        } else if (((_a = this.clientAuthentication) === null || _a === void 0 ? void 0 : _a.confidentialClientType) === "basic") {
          opts.headers = opts.headers || {};
          const clientId = this.clientAuthentication.clientId;
          const clientSecret = this.clientAuthentication.clientSecret || "";
          const base64EncodedCreds = this.crypto.encodeBase64StringUtf8(`${clientId}:${clientSecret}`);
          Object.assign(opts.headers, {
            Authorization: `Basic ${base64EncodedCreds}`
          });
        }
      }
      /**
       * Applies client authentication on the request's body if request-body
       * client authentication is selected.
       *
       * @param opts The GaxiosOptions whose headers or data are to be modified
       *   depending on the client authentication mechanism to be used.
       */
      injectAuthenticatedRequestBody(opts) {
        var _a;
        if (((_a = this.clientAuthentication) === null || _a === void 0 ? void 0 : _a.confidentialClientType) === "request-body") {
          const method = (opts.method || "GET").toUpperCase();
          if (METHODS_SUPPORTING_REQUEST_BODY.indexOf(method) !== -1) {
            let contentType;
            const headers = opts.headers || {};
            for (const key in headers) {
              if (key.toLowerCase() === "content-type" && headers[key]) {
                contentType = headers[key].toLowerCase();
                break;
              }
            }
            if (contentType === "application/x-www-form-urlencoded") {
              opts.data = opts.data || "";
              const data = querystring.parse(opts.data);
              Object.assign(data, {
                client_id: this.clientAuthentication.clientId,
                client_secret: this.clientAuthentication.clientSecret || ""
              });
              opts.data = querystring.stringify(data);
            } else if (contentType === "application/json") {
              opts.data = opts.data || {};
              Object.assign(opts.data, {
                client_id: this.clientAuthentication.clientId,
                client_secret: this.clientAuthentication.clientSecret || ""
              });
            } else {
              throw new Error(`${contentType} content-types are not supported with ${this.clientAuthentication.confidentialClientType} client authentication`);
            }
          } else {
            throw new Error(`${method} HTTP method does not support ${this.clientAuthentication.confidentialClientType} client authentication`);
          }
        }
      }
      /**
       * Retry config for Auth-related requests.
       *
       * @remarks
       *
       * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
       * config as some downstream APIs would prefer if customers explicitly enable retries,
       * such as GCS.
       */
      static get RETRY_CONFIG() {
        return {
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
          }
        };
      }
    };
    exports.OAuthClientAuthHandler = OAuthClientAuthHandler;
    function getErrorFromOAuthErrorResponse(resp, err) {
      const errorCode = resp.error;
      const errorDescription = resp.error_description;
      const errorUri = resp.error_uri;
      let message = `Error code ${errorCode}`;
      if (typeof errorDescription !== "undefined") {
        message += `: ${errorDescription}`;
      }
      if (typeof errorUri !== "undefined") {
        message += ` - ${errorUri}`;
      }
      const newError = new Error(message);
      if (err) {
        const keys = Object.keys(err);
        if (err.stack) {
          keys.push("stack");
        }
        keys.forEach((key) => {
          if (key !== "message") {
            Object.defineProperty(newError, key, {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value: err[key],
              writable: false,
              enumerable: true
            });
          }
        });
      }
      return newError;
    }
    __name(getErrorFromOAuthErrorResponse, "getErrorFromOAuthErrorResponse");
  }
});

// node_modules/google-auth-library/build/src/auth/stscredentials.js
var require_stscredentials = __commonJS({
  "node_modules/google-auth-library/build/src/auth/stscredentials.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StsCredentials = void 0;
    var gaxios_1 = require_src();
    var querystring = require_querystring();
    var transporters_1 = require_transporters();
    var oauth2common_1 = require_oauth2common();
    var StsCredentials = class _StsCredentials extends oauth2common_1.OAuthClientAuthHandler {
      static {
        __name(this, "StsCredentials");
      }
      /**
       * Initializes an STS credentials instance.
       * @param tokenExchangeEndpoint The token exchange endpoint.
       * @param clientAuthentication The client authentication credentials if
       *   available.
       */
      constructor(tokenExchangeEndpoint, clientAuthentication) {
        super(clientAuthentication);
        this.tokenExchangeEndpoint = tokenExchangeEndpoint;
        this.transporter = new transporters_1.DefaultTransporter();
      }
      /**
       * Exchanges the provided token for another type of token based on the
       * rfc8693 spec.
       * @param stsCredentialsOptions The token exchange options used to populate
       *   the token exchange request.
       * @param additionalHeaders Optional additional headers to pass along the
       *   request.
       * @param options Optional additional GCP-specific non-spec defined options
       *   to send with the request.
       *   Example: `&options=${encodeUriComponent(JSON.stringified(options))}`
       * @return A promise that resolves with the token exchange response containing
       *   the requested token and its expiration time.
       */
      async exchangeToken(stsCredentialsOptions, additionalHeaders, options) {
        var _a, _b, _c;
        const values = {
          grant_type: stsCredentialsOptions.grantType,
          resource: stsCredentialsOptions.resource,
          audience: stsCredentialsOptions.audience,
          scope: (_a = stsCredentialsOptions.scope) === null || _a === void 0 ? void 0 : _a.join(" "),
          requested_token_type: stsCredentialsOptions.requestedTokenType,
          subject_token: stsCredentialsOptions.subjectToken,
          subject_token_type: stsCredentialsOptions.subjectTokenType,
          actor_token: (_b = stsCredentialsOptions.actingParty) === null || _b === void 0 ? void 0 : _b.actorToken,
          actor_token_type: (_c = stsCredentialsOptions.actingParty) === null || _c === void 0 ? void 0 : _c.actorTokenType,
          // Non-standard GCP-specific options.
          options: options && JSON.stringify(options)
        };
        Object.keys(values).forEach((key) => {
          if (typeof values[key] === "undefined") {
            delete values[key];
          }
        });
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
        Object.assign(headers, additionalHeaders || {});
        const opts = {
          ..._StsCredentials.RETRY_CONFIG,
          url: this.tokenExchangeEndpoint.toString(),
          method: "POST",
          headers,
          data: querystring.stringify(values),
          responseType: "json"
        };
        this.applyClientAuthenticationOptions(opts);
        try {
          const response = await this.transporter.request(opts);
          const stsSuccessfulResponse = response.data;
          stsSuccessfulResponse.res = response;
          return stsSuccessfulResponse;
        } catch (error3) {
          if (error3 instanceof gaxios_1.GaxiosError && error3.response) {
            throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
              error3.response.data,
              // Preserve other fields from the original error.
              error3
            );
          }
          throw error3;
        }
      }
    };
    exports.StsCredentials = StsCredentials;
  }
});

// node_modules/google-auth-library/build/src/auth/baseexternalclient.js
var require_baseexternalclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/baseexternalclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _BaseExternalAccountClient_instances;
    var _BaseExternalAccountClient_pendingAccessToken;
    var _BaseExternalAccountClient_internalRefreshAccessTokenAsync;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseExternalAccountClient = exports.DEFAULT_UNIVERSE = exports.CLOUD_RESOURCE_MANAGER = exports.EXTERNAL_ACCOUNT_TYPE = exports.EXPIRATION_TIME_OFFSET = void 0;
    var stream = require_stream();
    var authclient_1 = require_authclient();
    var sts = require_stscredentials();
    var util_1 = require_util2();
    var STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    var STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    var DEFAULT_OAUTH_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
    var DEFAULT_TOKEN_LIFESPAN = 3600;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    exports.EXTERNAL_ACCOUNT_TYPE = "external_account";
    exports.CLOUD_RESOURCE_MANAGER = "https://cloudresourcemanager.googleapis.com/v1/projects/";
    var WORKFORCE_AUDIENCE_PATTERN = "//iam\\.googleapis\\.com/locations/[^/]+/workforcePools/[^/]+/providers/.+";
    var DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/token";
    var pkg = require_package3();
    var authclient_2 = require_authclient();
    Object.defineProperty(exports, "DEFAULT_UNIVERSE", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return authclient_2.DEFAULT_UNIVERSE;
    }, "get") });
    var BaseExternalAccountClient = class _BaseExternalAccountClient extends authclient_1.AuthClient {
      static {
        __name(this, "BaseExternalAccountClient");
      }
      /**
       * Instantiate a BaseExternalAccountClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file. The camelCased options
       *   are aliases for the snake_cased options.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       */
      constructor(options, additionalOptions) {
        var _a;
        super({ ...options, ...additionalOptions });
        _BaseExternalAccountClient_instances.add(this);
        _BaseExternalAccountClient_pendingAccessToken.set(this, null);
        const opts = (0, util_1.originalOrCamelOptions)(options);
        const type2 = opts.get("type");
        if (type2 && type2 !== exports.EXTERNAL_ACCOUNT_TYPE) {
          throw new Error(`Expected "${exports.EXTERNAL_ACCOUNT_TYPE}" type but received "${options.type}"`);
        }
        const clientId = opts.get("client_id");
        const clientSecret = opts.get("client_secret");
        const tokenUrl = (_a = opts.get("token_url")) !== null && _a !== void 0 ? _a : DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain);
        const subjectTokenType = opts.get("subject_token_type");
        const workforcePoolUserProject = opts.get("workforce_pool_user_project");
        const serviceAccountImpersonationUrl = opts.get("service_account_impersonation_url");
        const serviceAccountImpersonation = opts.get("service_account_impersonation");
        const serviceAccountImpersonationLifetime = (0, util_1.originalOrCamelOptions)(serviceAccountImpersonation).get("token_lifetime_seconds");
        this.cloudResourceManagerURL = new URL(opts.get("cloud_resource_manager_url") || `https://cloudresourcemanager.${this.universeDomain}/v1/projects/`);
        if (clientId) {
          this.clientAuth = {
            confidentialClientType: "basic",
            clientId,
            clientSecret
          };
        }
        this.stsCredential = new sts.StsCredentials(tokenUrl, this.clientAuth);
        this.scopes = opts.get("scopes") || [DEFAULT_OAUTH_SCOPE];
        this.cachedAccessToken = null;
        this.audience = opts.get("audience");
        this.subjectTokenType = subjectTokenType;
        this.workforcePoolUserProject = workforcePoolUserProject;
        const workforceAudiencePattern = new RegExp(WORKFORCE_AUDIENCE_PATTERN);
        if (this.workforcePoolUserProject && !this.audience.match(workforceAudiencePattern)) {
          throw new Error("workforcePoolUserProject should not be set for non-workforce pool credentials.");
        }
        this.serviceAccountImpersonationUrl = serviceAccountImpersonationUrl;
        this.serviceAccountImpersonationLifetime = serviceAccountImpersonationLifetime;
        if (this.serviceAccountImpersonationLifetime) {
          this.configLifetimeRequested = true;
        } else {
          this.configLifetimeRequested = false;
          this.serviceAccountImpersonationLifetime = DEFAULT_TOKEN_LIFESPAN;
        }
        this.projectNumber = this.getProjectNumber(this.audience);
        this.supplierContext = {
          audience: this.audience,
          subjectTokenType: this.subjectTokenType,
          transporter: this.transporter
        };
      }
      /** The service account email to be impersonated, if available. */
      getServiceAccountEmail() {
        var _a;
        if (this.serviceAccountImpersonationUrl) {
          if (this.serviceAccountImpersonationUrl.length > 256) {
            throw new RangeError(`URL is too long: ${this.serviceAccountImpersonationUrl}`);
          }
          const re = /serviceAccounts\/(?<email>[^:]+):generateAccessToken$/;
          const result = re.exec(this.serviceAccountImpersonationUrl);
          return ((_a = result === null || result === void 0 ? void 0 : result.groups) === null || _a === void 0 ? void 0 : _a.email) || null;
        }
        return null;
      }
      /**
       * Provides a mechanism to inject GCP access tokens directly.
       * When the provided credential expires, a new credential, using the
       * external account options, is retrieved.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        super.setCredentials(credentials);
        this.cachedAccessToken = credentials;
      }
      /**
       * @return A promise that resolves with the current GCP access token
       *   response. If the current credential is expired, a new one is retrieved.
       */
      async getAccessToken() {
        if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedAccessToken.access_token,
          res: this.cachedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { Authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessTokenResponse.token}`
        };
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * @return A promise that resolves with the project ID corresponding to the
       *   current workload identity pool or current workforce pool if
       *   determinable. For workforce pool credential, it returns the project ID
       *   corresponding to the workforcePoolUserProject.
       *   This is introduced to match the current pattern of using the Auth
       *   library:
       *   const projectId = await auth.getProjectId();
       *   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
       *   const res = await client.request({ url });
       *   The resource may not have permission
       *   (resourcemanager.projects.get) to call this API or the required
       *   scopes may not be selected:
       *   https://cloud.google.com/resource-manager/reference/rest/v1/projects/get#authorization-scopes
       */
      async getProjectId() {
        const projectNumber = this.projectNumber || this.workforcePoolUserProject;
        if (this.projectId) {
          return this.projectId;
        } else if (projectNumber) {
          const headers = await this.getRequestHeaders();
          const response = await this.transporter.request({
            ..._BaseExternalAccountClient.RETRY_CONFIG,
            headers,
            url: `${this.cloudResourceManagerURL.toString()}${projectNumber}`,
            responseType: "json"
          });
          this.projectId = response.data.projectId;
          return this.projectId;
        }
        return null;
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = opts.headers || {};
          if (requestHeaders && requestHeaders["x-goog-user-project"]) {
            opts.headers["x-goog-user-project"] = requestHeaders["x-goog-user-project"];
          }
          if (requestHeaders && requestHeaders.Authorization) {
            opts.headers.Authorization = requestHeaders.Authorization;
          }
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * External credentials are exchanged for GCP access tokens via the token
       * exchange endpoint and other settings provided in the client options
       * object.
       * If the service_account_impersonation_url is provided, an additional
       * step to exchange the external account GCP access token for a service
       * account impersonated token is performed.
       * @return A promise that resolves with the fresh GCP access tokens.
       */
      async refreshAccessTokenAsync() {
        __classPrivateFieldSet(this, _BaseExternalAccountClient_pendingAccessToken, __classPrivateFieldGet(this, _BaseExternalAccountClient_pendingAccessToken, "f") || __classPrivateFieldGet(this, _BaseExternalAccountClient_instances, "m", _BaseExternalAccountClient_internalRefreshAccessTokenAsync).call(this), "f");
        try {
          return await __classPrivateFieldGet(this, _BaseExternalAccountClient_pendingAccessToken, "f");
        } finally {
          __classPrivateFieldSet(this, _BaseExternalAccountClient_pendingAccessToken, null, "f");
        }
      }
      /**
       * Returns the workload identity pool project number if it is determinable
       * from the audience resource name.
       * @param audience The STS audience used to determine the project number.
       * @return The project number associated with the workload identity pool, if
       *   this can be determined from the STS audience field. Otherwise, null is
       *   returned.
       */
      getProjectNumber(audience) {
        const match2 = audience.match(/\/projects\/([^/]+)/);
        if (!match2) {
          return null;
        }
        return match2[1];
      }
      /**
       * Exchanges an external account GCP access token for a service
       * account impersonated access token using iamcredentials
       * GenerateAccessToken API.
       * @param token The access token to exchange for a service account access
       *   token.
       * @return A promise that resolves with the service account impersonated
       *   credentials response.
       */
      async getImpersonatedAccessToken(token) {
        const opts = {
          ..._BaseExternalAccountClient.RETRY_CONFIG,
          url: this.serviceAccountImpersonationUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          data: {
            scope: this.getScopesArray(),
            lifetime: this.serviceAccountImpersonationLifetime + "s"
          },
          responseType: "json"
        };
        const response = await this.transporter.request(opts);
        const successResponse = response.data;
        return {
          access_token: successResponse.accessToken,
          // Convert from ISO format to timestamp.
          expiry_date: new Date(successResponse.expireTime).getTime(),
          res: response
        };
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param accessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(accessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return accessToken.expiry_date ? now >= accessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
      /**
       * @return The list of scopes for the requested GCP access token.
       */
      getScopesArray() {
        if (typeof this.scopes === "string") {
          return [this.scopes];
        }
        return this.scopes || [DEFAULT_OAUTH_SCOPE];
      }
      getMetricsHeaderValue() {
        const nodeVersion = process.version.replace(/^v/, "");
        const saImpersonation = this.serviceAccountImpersonationUrl !== void 0;
        const credentialSourceType = this.credentialSourceType ? this.credentialSourceType : "unknown";
        return `gl-node/${nodeVersion} auth/${pkg.version} google-byoid-sdk source/${credentialSourceType} sa-impersonation/${saImpersonation} config-lifetime/${this.configLifetimeRequested}`;
      }
    };
    exports.BaseExternalAccountClient = BaseExternalAccountClient;
    _BaseExternalAccountClient_pendingAccessToken = /* @__PURE__ */ new WeakMap(), _BaseExternalAccountClient_instances = /* @__PURE__ */ new WeakSet(), _BaseExternalAccountClient_internalRefreshAccessTokenAsync = /* @__PURE__ */ __name(async function _BaseExternalAccountClient_internalRefreshAccessTokenAsync2() {
      const subjectToken = await this.retrieveSubjectToken();
      const stsCredentialsOptions = {
        grantType: STS_GRANT_TYPE,
        audience: this.audience,
        requestedTokenType: STS_REQUEST_TOKEN_TYPE,
        subjectToken,
        subjectTokenType: this.subjectTokenType,
        // generateAccessToken requires the provided access token to have
        // scopes:
        // https://www.googleapis.com/auth/iam or
        // https://www.googleapis.com/auth/cloud-platform
        // The new service account access token scopes will match the user
        // provided ones.
        scope: this.serviceAccountImpersonationUrl ? [DEFAULT_OAUTH_SCOPE] : this.getScopesArray()
      };
      const additionalOptions = !this.clientAuth && this.workforcePoolUserProject ? { userProject: this.workforcePoolUserProject } : void 0;
      const additionalHeaders = {
        "x-goog-api-client": this.getMetricsHeaderValue()
      };
      const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, additionalHeaders, additionalOptions);
      if (this.serviceAccountImpersonationUrl) {
        this.cachedAccessToken = await this.getImpersonatedAccessToken(stsResponse.access_token);
      } else if (stsResponse.expires_in) {
        this.cachedAccessToken = {
          access_token: stsResponse.access_token,
          expiry_date: (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3,
          res: stsResponse.res
        };
      } else {
        this.cachedAccessToken = {
          access_token: stsResponse.access_token,
          res: stsResponse.res
        };
      }
      this.credentials = {};
      Object.assign(this.credentials, this.cachedAccessToken);
      delete this.credentials.res;
      this.emit("tokens", {
        refresh_token: null,
        expiry_date: this.cachedAccessToken.expiry_date,
        access_token: this.cachedAccessToken.access_token,
        token_type: "Bearer",
        id_token: null
      });
      return this.cachedAccessToken;
    }, "_BaseExternalAccountClient_internalRefreshAccessTokenAsync");
  }
});

// node_modules/google-auth-library/build/src/auth/filesubjecttokensupplier.js
var require_filesubjecttokensupplier = __commonJS({
  "node_modules/google-auth-library/build/src/auth/filesubjecttokensupplier.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var _a;
    var _b;
    var _c;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileSubjectTokenSupplier = void 0;
    var util_1 = require_util3();
    var fs = require_fs();
    var readFile3 = (0, util_1.promisify)((_a = fs.readFile) !== null && _a !== void 0 ? _a : (() => {
    }));
    var realpath3 = (0, util_1.promisify)((_b = fs.realpath) !== null && _b !== void 0 ? _b : (() => {
    }));
    var lstat3 = (0, util_1.promisify)((_c = fs.lstat) !== null && _c !== void 0 ? _c : (() => {
    }));
    var FileSubjectTokenSupplier = class {
      static {
        __name(this, "FileSubjectTokenSupplier");
      }
      /**
       * Instantiates a new file based subject token supplier.
       * @param opts The file subject token supplier options to build the supplier
       *   with.
       */
      constructor(opts) {
        this.filePath = opts.filePath;
        this.formatType = opts.formatType;
        this.subjectTokenFieldName = opts.subjectTokenFieldName;
      }
      /**
       * Returns the subject token stored at the file specified in the constructor.
       * @param context {@link ExternalAccountSupplierContext} from the calling
       *   {@link IdentityPoolClient}, contains the requested audience and subject
       *   token type for the external account identity. Not used.
       */
      async getSubjectToken(context2) {
        let parsedFilePath = this.filePath;
        try {
          parsedFilePath = await realpath3(parsedFilePath);
          if (!(await lstat3(parsedFilePath)).isFile()) {
            throw new Error();
          }
        } catch (err) {
          if (err instanceof Error) {
            err.message = `The file at ${parsedFilePath} does not exist, or it is not a file. ${err.message}`;
          }
          throw err;
        }
        let subjectToken;
        const rawText = await readFile3(parsedFilePath, { encoding: "utf8" });
        if (this.formatType === "text") {
          subjectToken = rawText;
        } else if (this.formatType === "json" && this.subjectTokenFieldName) {
          const json = JSON.parse(rawText);
          subjectToken = json[this.subjectTokenFieldName];
        }
        if (!subjectToken) {
          throw new Error("Unable to parse the subject_token from the credential_source file");
        }
        return subjectToken;
      }
    };
    exports.FileSubjectTokenSupplier = FileSubjectTokenSupplier;
  }
});

// node_modules/google-auth-library/build/src/auth/urlsubjecttokensupplier.js
var require_urlsubjecttokensupplier = __commonJS({
  "node_modules/google-auth-library/build/src/auth/urlsubjecttokensupplier.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UrlSubjectTokenSupplier = void 0;
    var UrlSubjectTokenSupplier = class {
      static {
        __name(this, "UrlSubjectTokenSupplier");
      }
      /**
       * Instantiates a URL subject token supplier.
       * @param opts The URL subject token supplier options to build the supplier with.
       */
      constructor(opts) {
        this.url = opts.url;
        this.formatType = opts.formatType;
        this.subjectTokenFieldName = opts.subjectTokenFieldName;
        this.headers = opts.headers;
        this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
      }
      /**
       * Sends a GET request to the URL provided in the constructor and resolves
       * with the returned external subject token.
       * @param context {@link ExternalAccountSupplierContext} from the calling
       *   {@link IdentityPoolClient}, contains the requested audience and subject
       *   token type for the external account identity. Not used.
       */
      async getSubjectToken(context2) {
        const opts = {
          ...this.additionalGaxiosOptions,
          url: this.url,
          method: "GET",
          headers: this.headers,
          responseType: this.formatType
        };
        let subjectToken;
        if (this.formatType === "text") {
          const response = await context2.transporter.request(opts);
          subjectToken = response.data;
        } else if (this.formatType === "json" && this.subjectTokenFieldName) {
          const response = await context2.transporter.request(opts);
          subjectToken = response.data[this.subjectTokenFieldName];
        }
        if (!subjectToken) {
          throw new Error("Unable to parse the subject_token from the credential_source URL");
        }
        return subjectToken;
      }
    };
    exports.UrlSubjectTokenSupplier = UrlSubjectTokenSupplier;
  }
});

// node_modules/google-auth-library/build/src/auth/identitypoolclient.js
var require_identitypoolclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/identitypoolclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IdentityPoolClient = void 0;
    var baseexternalclient_1 = require_baseexternalclient();
    var util_1 = require_util2();
    var filesubjecttokensupplier_1 = require_filesubjecttokensupplier();
    var urlsubjecttokensupplier_1 = require_urlsubjecttokensupplier();
    var IdentityPoolClient = class _IdentityPoolClient extends baseexternalclient_1.BaseExternalAccountClient {
      static {
        __name(this, "IdentityPoolClient");
      }
      /**
       * Instantiate an IdentityPoolClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * An error is thrown if the credential is not a valid file-sourced or
       * url-sourced credential or a workforce pool user project is provided
       * with a non workforce audience.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file. The camelCased options
       *   are aliases for the snake_cased options.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       */
      constructor(options, additionalOptions) {
        super(options, additionalOptions);
        const opts = (0, util_1.originalOrCamelOptions)(options);
        const credentialSource = opts.get("credential_source");
        const subjectTokenSupplier = opts.get("subject_token_supplier");
        if (!credentialSource && !subjectTokenSupplier) {
          throw new Error("A credential source or subject token supplier must be specified.");
        }
        if (credentialSource && subjectTokenSupplier) {
          throw new Error("Only one of credential source or subject token supplier can be specified.");
        }
        if (subjectTokenSupplier) {
          this.subjectTokenSupplier = subjectTokenSupplier;
          this.credentialSourceType = "programmatic";
        } else {
          const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
          const formatOpts = (0, util_1.originalOrCamelOptions)(credentialSourceOpts.get("format"));
          const formatType = formatOpts.get("type") || "text";
          const formatSubjectTokenFieldName = formatOpts.get("subject_token_field_name");
          if (formatType !== "json" && formatType !== "text") {
            throw new Error(`Invalid credential_source format "${formatType}"`);
          }
          if (formatType === "json" && !formatSubjectTokenFieldName) {
            throw new Error("Missing subject_token_field_name for JSON credential_source format");
          }
          const file = credentialSourceOpts.get("file");
          const url = credentialSourceOpts.get("url");
          const headers = credentialSourceOpts.get("headers");
          if (file && url) {
            throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.');
          } else if (file && !url) {
            this.credentialSourceType = "file";
            this.subjectTokenSupplier = new filesubjecttokensupplier_1.FileSubjectTokenSupplier({
              filePath: file,
              formatType,
              subjectTokenFieldName: formatSubjectTokenFieldName
            });
          } else if (!file && url) {
            this.credentialSourceType = "url";
            this.subjectTokenSupplier = new urlsubjecttokensupplier_1.UrlSubjectTokenSupplier({
              url,
              formatType,
              subjectTokenFieldName: formatSubjectTokenFieldName,
              headers,
              additionalGaxiosOptions: _IdentityPoolClient.RETRY_CONFIG
            });
          } else {
            throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.');
          }
        }
      }
      /**
       * Triggered when a external subject token is needed to be exchanged for a GCP
       * access token via GCP STS endpoint. Gets a subject token by calling
       * the configured {@link SubjectTokenSupplier}
       * @return A promise that resolves with the external subject token.
       */
      async retrieveSubjectToken() {
        return this.subjectTokenSupplier.getSubjectToken(this.supplierContext);
      }
    };
    exports.IdentityPoolClient = IdentityPoolClient;
  }
});

// node_modules/google-auth-library/build/src/auth/awsrequestsigner.js
var require_awsrequestsigner = __commonJS({
  "node_modules/google-auth-library/build/src/auth/awsrequestsigner.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AwsRequestSigner = void 0;
    var crypto_1 = require_crypto4();
    var AWS_ALGORITHM = "AWS4-HMAC-SHA256";
    var AWS_REQUEST_TYPE = "aws4_request";
    var AwsRequestSigner = class {
      static {
        __name(this, "AwsRequestSigner");
      }
      /**
       * Instantiates an AWS API request signer used to send authenticated signed
       * requests to AWS APIs based on the AWS Signature Version 4 signing process.
       * This also provides a mechanism to generate the signed request without
       * sending it.
       * @param getCredentials A mechanism to retrieve AWS security credentials
       *   when needed.
       * @param region The AWS region to use.
       */
      constructor(getCredentials, region) {
        this.getCredentials = getCredentials;
        this.region = region;
        this.crypto = (0, crypto_1.createCrypto)();
      }
      /**
       * Generates the signed request for the provided HTTP request for calling
       * an AWS API. This follows the steps described at:
       * https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html
       * @param amzOptions The AWS request options that need to be signed.
       * @return A promise that resolves with the GaxiosOptions containing the
       *   signed HTTP request parameters.
       */
      async getRequestOptions(amzOptions) {
        if (!amzOptions.url) {
          throw new Error('"url" is required in "amzOptions"');
        }
        const requestPayloadData = typeof amzOptions.data === "object" ? JSON.stringify(amzOptions.data) : amzOptions.data;
        const url = amzOptions.url;
        const method = amzOptions.method || "GET";
        const requestPayload = amzOptions.body || requestPayloadData;
        const additionalAmzHeaders = amzOptions.headers;
        const awsSecurityCredentials = await this.getCredentials();
        const uri = new URL(url);
        const headerMap = await generateAuthenticationHeaderMap({
          crypto: this.crypto,
          host: uri.host,
          canonicalUri: uri.pathname,
          canonicalQuerystring: uri.search.substr(1),
          method,
          region: this.region,
          securityCredentials: awsSecurityCredentials,
          requestPayload,
          additionalAmzHeaders
        });
        const headers = Object.assign(
          // Add x-amz-date if available.
          headerMap.amzDate ? { "x-amz-date": headerMap.amzDate } : {},
          {
            Authorization: headerMap.authorizationHeader,
            host: uri.host
          },
          additionalAmzHeaders || {}
        );
        if (awsSecurityCredentials.token) {
          Object.assign(headers, {
            "x-amz-security-token": awsSecurityCredentials.token
          });
        }
        const awsSignedReq = {
          url,
          method,
          headers
        };
        if (typeof requestPayload !== "undefined") {
          awsSignedReq.body = requestPayload;
        }
        return awsSignedReq;
      }
    };
    exports.AwsRequestSigner = AwsRequestSigner;
    async function sign(crypto3, key, msg) {
      return await crypto3.signWithHmacSha256(key, msg);
    }
    __name(sign, "sign");
    async function getSigningKey(crypto3, key, dateStamp, region, serviceName) {
      const kDate = await sign(crypto3, `AWS4${key}`, dateStamp);
      const kRegion = await sign(crypto3, kDate, region);
      const kService = await sign(crypto3, kRegion, serviceName);
      const kSigning = await sign(crypto3, kService, "aws4_request");
      return kSigning;
    }
    __name(getSigningKey, "getSigningKey");
    async function generateAuthenticationHeaderMap(options) {
      const additionalAmzHeaders = options.additionalAmzHeaders || {};
      const requestPayload = options.requestPayload || "";
      const serviceName = options.host.split(".")[0];
      const now = /* @__PURE__ */ new Date();
      const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
      const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/T.*/, "");
      const reformattedAdditionalAmzHeaders = {};
      Object.keys(additionalAmzHeaders).forEach((key) => {
        reformattedAdditionalAmzHeaders[key.toLowerCase()] = additionalAmzHeaders[key];
      });
      if (options.securityCredentials.token) {
        reformattedAdditionalAmzHeaders["x-amz-security-token"] = options.securityCredentials.token;
      }
      const amzHeaders = Object.assign(
        {
          host: options.host
        },
        // Previously the date was not fixed with x-amz- and could be provided manually.
        // https://github.com/boto/botocore/blob/879f8440a4e9ace5d3cf145ce8b3d5e5ffb892ef/tests/unit/auth/aws4_testsuite/get-header-value-trim.req
        reformattedAdditionalAmzHeaders.date ? {} : { "x-amz-date": amzDate },
        reformattedAdditionalAmzHeaders
      );
      let canonicalHeaders = "";
      const signedHeadersList = Object.keys(amzHeaders).sort();
      signedHeadersList.forEach((key) => {
        canonicalHeaders += `${key}:${amzHeaders[key]}
`;
      });
      const signedHeaders = signedHeadersList.join(";");
      const payloadHash = await options.crypto.sha256DigestHex(requestPayload);
      const canonicalRequest = `${options.method}
${options.canonicalUri}
${options.canonicalQuerystring}
${canonicalHeaders}
${signedHeaders}
${payloadHash}`;
      const credentialScope = `${dateStamp}/${options.region}/${serviceName}/${AWS_REQUEST_TYPE}`;
      const stringToSign = `${AWS_ALGORITHM}
${amzDate}
${credentialScope}
` + await options.crypto.sha256DigestHex(canonicalRequest);
      const signingKey = await getSigningKey(options.crypto, options.securityCredentials.secretAccessKey, dateStamp, options.region, serviceName);
      const signature = await sign(options.crypto, signingKey, stringToSign);
      const authorizationHeader = `${AWS_ALGORITHM} Credential=${options.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${(0, crypto_1.fromArrayBufferToHex)(signature)}`;
      return {
        // Do not return x-amz-date if date is available.
        amzDate: reformattedAdditionalAmzHeaders.date ? void 0 : amzDate,
        authorizationHeader,
        canonicalQuerystring: options.canonicalQuerystring
      };
    }
    __name(generateAuthenticationHeaderMap, "generateAuthenticationHeaderMap");
  }
});

// node_modules/google-auth-library/build/src/auth/defaultawssecuritycredentialssupplier.js
var require_defaultawssecuritycredentialssupplier = __commonJS({
  "node_modules/google-auth-library/build/src/auth/defaultawssecuritycredentialssupplier.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _DefaultAwsSecurityCredentialsSupplier_instances;
    var _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken;
    var _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName;
    var _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials;
    var _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get;
    var _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultAwsSecurityCredentialsSupplier = void 0;
    var DefaultAwsSecurityCredentialsSupplier = class {
      static {
        __name(this, "DefaultAwsSecurityCredentialsSupplier");
      }
      /**
       * Instantiates a new DefaultAwsSecurityCredentialsSupplier using information
       * from the credential_source stored in the ADC file.
       * @param opts The default aws security credentials supplier options object to
       *   build the supplier with.
       */
      constructor(opts) {
        _DefaultAwsSecurityCredentialsSupplier_instances.add(this);
        this.regionUrl = opts.regionUrl;
        this.securityCredentialsUrl = opts.securityCredentialsUrl;
        this.imdsV2SessionTokenUrl = opts.imdsV2SessionTokenUrl;
        this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
      }
      /**
       * Returns the active AWS region. This first checks to see if the region
       * is available as an environment variable. If it is not, then the supplier
       * will call the region URL.
       * @param context {@link ExternalAccountSupplierContext} from the calling
       *   {@link AwsClient}, contains the requested audience and subject token type
       *   for the external account identity.
       * @return A promise that resolves with the AWS region string.
       */
      async getAwsRegion(context2) {
        if (__classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get)) {
          return __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get);
        }
        const metadataHeaders = {};
        if (!__classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get) && this.imdsV2SessionTokenUrl) {
          metadataHeaders["x-aws-ec2-metadata-token"] = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken).call(this, context2.transporter);
        }
        if (!this.regionUrl) {
          throw new Error('Unable to determine AWS region due to missing "options.credential_source.region_url"');
        }
        const opts = {
          ...this.additionalGaxiosOptions,
          url: this.regionUrl,
          method: "GET",
          responseType: "text",
          headers: metadataHeaders
        };
        const response = await context2.transporter.request(opts);
        return response.data.substr(0, response.data.length - 1);
      }
      /**
       * Returns AWS security credentials. This first checks to see if the credentials
       * is available as environment variables. If it is not, then the supplier
       * will call the security credentials URL.
       * @param context {@link ExternalAccountSupplierContext} from the calling
       *   {@link AwsClient}, contains the requested audience and subject token type
       *   for the external account identity.
       * @return A promise that resolves with the AWS security credentials.
       */
      async getAwsSecurityCredentials(context2) {
        if (__classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get)) {
          return __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get);
        }
        const metadataHeaders = {};
        if (this.imdsV2SessionTokenUrl) {
          metadataHeaders["x-aws-ec2-metadata-token"] = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken).call(this, context2.transporter);
        }
        const roleName = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName).call(this, metadataHeaders, context2.transporter);
        const awsCreds = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials).call(this, roleName, metadataHeaders, context2.transporter);
        return {
          accessKeyId: awsCreds.AccessKeyId,
          secretAccessKey: awsCreds.SecretAccessKey,
          token: awsCreds.Token
        };
      }
    };
    exports.DefaultAwsSecurityCredentialsSupplier = DefaultAwsSecurityCredentialsSupplier;
    _DefaultAwsSecurityCredentialsSupplier_instances = /* @__PURE__ */ new WeakSet(), _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken = /**
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the IMDSv2 Session Token.
     */
    /* @__PURE__ */ __name(async function _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken2(transporter) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.imdsV2SessionTokenUrl,
        method: "PUT",
        responseType: "text",
        headers: { "x-aws-ec2-metadata-token-ttl-seconds": "300" }
      };
      const response = await transporter.request(opts);
      return response.data;
    }, "_DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken"), _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName = /**
     * @param headers The headers to be used in the metadata request.
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the assigned role to the current
     *   AWS VM. This is needed for calling the security-credentials endpoint.
     */
    /* @__PURE__ */ __name(async function _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName2(headers, transporter) {
      if (!this.securityCredentialsUrl) {
        throw new Error('Unable to determine AWS role name due to missing "options.credential_source.url"');
      }
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.securityCredentialsUrl,
        method: "GET",
        responseType: "text",
        headers
      };
      const response = await transporter.request(opts);
      return response.data;
    }, "_DefaultAwsSecurityCredentialsSupplier_getAwsRoleName"), _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials = /**
     * Retrieves the temporary AWS credentials by calling the security-credentials
     * endpoint as specified in the `credential_source` object.
     * @param roleName The role attached to the current VM.
     * @param headers The headers to be used in the metadata request.
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the temporary AWS credentials
     *   needed for creating the GetCallerIdentity signed request.
     */
    /* @__PURE__ */ __name(async function _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials2(roleName, headers, transporter) {
      const response = await transporter.request({
        ...this.additionalGaxiosOptions,
        url: `${this.securityCredentialsUrl}/${roleName}`,
        responseType: "json",
        headers
      });
      return response.data;
    }, "_DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials"), _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get = /* @__PURE__ */ __name(function _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get2() {
      return process.env["AWS_REGION"] || process.env["AWS_DEFAULT_REGION"] || null;
    }, "_DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get"), _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get = /* @__PURE__ */ __name(function _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get2() {
      if (process.env["AWS_ACCESS_KEY_ID"] && process.env["AWS_SECRET_ACCESS_KEY"]) {
        return {
          accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
          secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
          token: process.env["AWS_SESSION_TOKEN"]
        };
      }
      return null;
    }, "_DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get");
  }
});

// node_modules/google-auth-library/build/src/auth/awsclient.js
var require_awsclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/awsclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _a;
    var _AwsClient_DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AwsClient = void 0;
    var awsrequestsigner_1 = require_awsrequestsigner();
    var baseexternalclient_1 = require_baseexternalclient();
    var defaultawssecuritycredentialssupplier_1 = require_defaultawssecuritycredentialssupplier();
    var util_1 = require_util2();
    var AwsClient = class extends baseexternalclient_1.BaseExternalAccountClient {
      static {
        __name(this, "AwsClient");
      }
      /**
       * Instantiates an AwsClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * An error is thrown if the credential is not a valid AWS credential.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       */
      constructor(options, additionalOptions) {
        super(options, additionalOptions);
        const opts = (0, util_1.originalOrCamelOptions)(options);
        const credentialSource = opts.get("credential_source");
        const awsSecurityCredentialsSupplier = opts.get("aws_security_credentials_supplier");
        if (!credentialSource && !awsSecurityCredentialsSupplier) {
          throw new Error("A credential source or AWS security credentials supplier must be specified.");
        }
        if (credentialSource && awsSecurityCredentialsSupplier) {
          throw new Error("Only one of credential source or AWS security credentials supplier can be specified.");
        }
        if (awsSecurityCredentialsSupplier) {
          this.awsSecurityCredentialsSupplier = awsSecurityCredentialsSupplier;
          this.regionalCredVerificationUrl = __classPrivateFieldGet(_a, _a, "f", _AwsClient_DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL);
          this.credentialSourceType = "programmatic";
        } else {
          const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
          this.environmentId = credentialSourceOpts.get("environment_id");
          const regionUrl = credentialSourceOpts.get("region_url");
          const securityCredentialsUrl = credentialSourceOpts.get("url");
          const imdsV2SessionTokenUrl = credentialSourceOpts.get("imdsv2_session_token_url");
          this.awsSecurityCredentialsSupplier = new defaultawssecuritycredentialssupplier_1.DefaultAwsSecurityCredentialsSupplier({
            regionUrl,
            securityCredentialsUrl,
            imdsV2SessionTokenUrl
          });
          this.regionalCredVerificationUrl = credentialSourceOpts.get("regional_cred_verification_url");
          this.credentialSourceType = "aws";
          this.validateEnvironmentId();
        }
        this.awsRequestSigner = null;
        this.region = "";
      }
      validateEnvironmentId() {
        var _b;
        const match2 = (_b = this.environmentId) === null || _b === void 0 ? void 0 : _b.match(/^(aws)(\d+)$/);
        if (!match2 || !this.regionalCredVerificationUrl) {
          throw new Error('No valid AWS "credential_source" provided');
        } else if (parseInt(match2[2], 10) !== 1) {
          throw new Error(`aws version "${match2[2]}" is not supported in the current build.`);
        }
      }
      /**
       * Triggered when an external subject token is needed to be exchanged for a
       * GCP access token via GCP STS endpoint. This will call the
       * {@link AwsSecurityCredentialsSupplier} to retrieve an AWS region and AWS
       * Security Credentials, then use them to create a signed AWS STS request that
       * can be exchanged for a GCP access token.
       * @return A promise that resolves with the external subject token.
       */
      async retrieveSubjectToken() {
        if (!this.awsRequestSigner) {
          this.region = await this.awsSecurityCredentialsSupplier.getAwsRegion(this.supplierContext);
          this.awsRequestSigner = new awsrequestsigner_1.AwsRequestSigner(async () => {
            return this.awsSecurityCredentialsSupplier.getAwsSecurityCredentials(this.supplierContext);
          }, this.region);
        }
        const options = await this.awsRequestSigner.getRequestOptions({
          ..._a.RETRY_CONFIG,
          url: this.regionalCredVerificationUrl.replace("{region}", this.region),
          method: "POST"
        });
        const reformattedHeader = [];
        const extendedHeaders = Object.assign({
          // The full, canonical resource name of the workload identity pool
          // provider, with or without the HTTPS prefix.
          // Including this header as part of the signature is recommended to
          // ensure data integrity.
          "x-goog-cloud-target-resource": this.audience
        }, options.headers);
        for (const key in extendedHeaders) {
          reformattedHeader.push({
            key,
            value: extendedHeaders[key]
          });
        }
        return encodeURIComponent(JSON.stringify({
          url: options.url,
          method: options.method,
          headers: reformattedHeader
        }));
      }
    };
    exports.AwsClient = AwsClient;
    _a = AwsClient;
    _AwsClient_DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL = { value: "https://sts.{region}.amazonaws.com?Action=GetCallerIdentity&Version=2011-06-15" };
    AwsClient.AWS_EC2_METADATA_IPV4_ADDRESS = "169.254.169.254";
    AwsClient.AWS_EC2_METADATA_IPV6_ADDRESS = "fd00:ec2::254";
  }
});

// node_modules/google-auth-library/build/src/auth/executable-response.js
var require_executable_response = __commonJS({
  "node_modules/google-auth-library/build/src/auth/executable-response.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidSubjectTokenError = exports.InvalidMessageFieldError = exports.InvalidCodeFieldError = exports.InvalidTokenTypeFieldError = exports.InvalidExpirationTimeFieldError = exports.InvalidSuccessFieldError = exports.InvalidVersionFieldError = exports.ExecutableResponseError = exports.ExecutableResponse = void 0;
    var SAML_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:saml2";
    var OIDC_SUBJECT_TOKEN_TYPE1 = "urn:ietf:params:oauth:token-type:id_token";
    var OIDC_SUBJECT_TOKEN_TYPE2 = "urn:ietf:params:oauth:token-type:jwt";
    var ExecutableResponse = class {
      static {
        __name(this, "ExecutableResponse");
      }
      /**
       * Instantiates an ExecutableResponse instance using the provided JSON object
       * from the output of the executable.
       * @param responseJson Response from a 3rd party executable, loaded from a
       * run of the executable or a cached output file.
       */
      constructor(responseJson) {
        if (!responseJson.version) {
          throw new InvalidVersionFieldError("Executable response must contain a 'version' field.");
        }
        if (responseJson.success === void 0) {
          throw new InvalidSuccessFieldError("Executable response must contain a 'success' field.");
        }
        this.version = responseJson.version;
        this.success = responseJson.success;
        if (this.success) {
          this.expirationTime = responseJson.expiration_time;
          this.tokenType = responseJson.token_type;
          if (this.tokenType !== SAML_SUBJECT_TOKEN_TYPE && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE1 && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE2) {
            throw new InvalidTokenTypeFieldError(`Executable response must contain a 'token_type' field when successful and it must be one of ${OIDC_SUBJECT_TOKEN_TYPE1}, ${OIDC_SUBJECT_TOKEN_TYPE2}, or ${SAML_SUBJECT_TOKEN_TYPE}.`);
          }
          if (this.tokenType === SAML_SUBJECT_TOKEN_TYPE) {
            if (!responseJson.saml_response) {
              throw new InvalidSubjectTokenError(`Executable response must contain a 'saml_response' field when token_type=${SAML_SUBJECT_TOKEN_TYPE}.`);
            }
            this.subjectToken = responseJson.saml_response;
          } else {
            if (!responseJson.id_token) {
              throw new InvalidSubjectTokenError(`Executable response must contain a 'id_token' field when token_type=${OIDC_SUBJECT_TOKEN_TYPE1} or ${OIDC_SUBJECT_TOKEN_TYPE2}.`);
            }
            this.subjectToken = responseJson.id_token;
          }
        } else {
          if (!responseJson.code) {
            throw new InvalidCodeFieldError("Executable response must contain a 'code' field when unsuccessful.");
          }
          if (!responseJson.message) {
            throw new InvalidMessageFieldError("Executable response must contain a 'message' field when unsuccessful.");
          }
          this.errorCode = responseJson.code;
          this.errorMessage = responseJson.message;
        }
      }
      /**
       * @return A boolean representing if the response has a valid token. Returns
       * true when the response was successful and the token is not expired.
       */
      isValid() {
        return !this.isExpired() && this.success;
      }
      /**
       * @return A boolean representing if the response is expired. Returns true if the
       * provided timeout has passed.
       */
      isExpired() {
        return this.expirationTime !== void 0 && this.expirationTime < Math.round(Date.now() / 1e3);
      }
    };
    exports.ExecutableResponse = ExecutableResponse;
    var ExecutableResponseError = class extends Error {
      static {
        __name(this, "ExecutableResponseError");
      }
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
      }
    };
    exports.ExecutableResponseError = ExecutableResponseError;
    var InvalidVersionFieldError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidVersionFieldError");
      }
    };
    exports.InvalidVersionFieldError = InvalidVersionFieldError;
    var InvalidSuccessFieldError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidSuccessFieldError");
      }
    };
    exports.InvalidSuccessFieldError = InvalidSuccessFieldError;
    var InvalidExpirationTimeFieldError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidExpirationTimeFieldError");
      }
    };
    exports.InvalidExpirationTimeFieldError = InvalidExpirationTimeFieldError;
    var InvalidTokenTypeFieldError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidTokenTypeFieldError");
      }
    };
    exports.InvalidTokenTypeFieldError = InvalidTokenTypeFieldError;
    var InvalidCodeFieldError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidCodeFieldError");
      }
    };
    exports.InvalidCodeFieldError = InvalidCodeFieldError;
    var InvalidMessageFieldError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidMessageFieldError");
      }
    };
    exports.InvalidMessageFieldError = InvalidMessageFieldError;
    var InvalidSubjectTokenError = class extends ExecutableResponseError {
      static {
        __name(this, "InvalidSubjectTokenError");
      }
    };
    exports.InvalidSubjectTokenError = InvalidSubjectTokenError;
  }
});

// node_modules/google-auth-library/build/src/auth/pluggable-auth-handler.js
var require_pluggable_auth_handler = __commonJS({
  "node_modules/google-auth-library/build/src/auth/pluggable-auth-handler.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluggableAuthHandler = void 0;
    var pluggable_auth_client_1 = require_pluggable_auth_client();
    var executable_response_1 = require_executable_response();
    var childProcess = require_child_process();
    var fs = require_fs();
    var PluggableAuthHandler = class _PluggableAuthHandler {
      static {
        __name(this, "PluggableAuthHandler");
      }
      /**
       * Instantiates a PluggableAuthHandler instance using the provided
       * PluggableAuthHandlerOptions object.
       */
      constructor(options) {
        if (!options.command) {
          throw new Error("No command provided.");
        }
        this.commandComponents = _PluggableAuthHandler.parseCommand(options.command);
        this.timeoutMillis = options.timeoutMillis;
        if (!this.timeoutMillis) {
          throw new Error("No timeoutMillis provided.");
        }
        this.outputFile = options.outputFile;
      }
      /**
       * Calls user provided executable to get a 3rd party subject token and
       * returns the response.
       * @param envMap a Map of additional Environment Variables required for
       *   the executable.
       * @return A promise that resolves with the executable response.
       */
      retrieveResponseFromExecutable(envMap) {
        return new Promise((resolve, reject) => {
          const child = childProcess.spawn(this.commandComponents[0], this.commandComponents.slice(1), {
            env: { ...process.env, ...Object.fromEntries(envMap) }
          });
          let output = "";
          child.stdout.on("data", (data) => {
            output += data;
          });
          child.stderr.on("data", (err) => {
            output += err;
          });
          const timeout = setTimeout(() => {
            child.removeAllListeners();
            child.kill();
            return reject(new Error("The executable failed to finish within the timeout specified."));
          }, this.timeoutMillis);
          child.on("close", (code) => {
            clearTimeout(timeout);
            if (code === 0) {
              try {
                const responseJson = JSON.parse(output);
                const response = new executable_response_1.ExecutableResponse(responseJson);
                return resolve(response);
              } catch (error3) {
                if (error3 instanceof executable_response_1.ExecutableResponseError) {
                  return reject(error3);
                }
                return reject(new executable_response_1.ExecutableResponseError(`The executable returned an invalid response: ${output}`));
              }
            } else {
              return reject(new pluggable_auth_client_1.ExecutableError(output, code.toString()));
            }
          });
        });
      }
      /**
       * Checks user provided output file for response from previous run of
       * executable and return the response if it exists, is formatted correctly, and is not expired.
       */
      async retrieveCachedResponse() {
        if (!this.outputFile || this.outputFile.length === 0) {
          return void 0;
        }
        let filePath;
        try {
          filePath = await fs.promises.realpath(this.outputFile);
        } catch (_a) {
          return void 0;
        }
        if (!(await fs.promises.lstat(filePath)).isFile()) {
          return void 0;
        }
        const responseString = await fs.promises.readFile(filePath, {
          encoding: "utf8"
        });
        if (responseString === "") {
          return void 0;
        }
        try {
          const responseJson = JSON.parse(responseString);
          const response = new executable_response_1.ExecutableResponse(responseJson);
          if (response.isValid()) {
            return new executable_response_1.ExecutableResponse(responseJson);
          }
          return void 0;
        } catch (error3) {
          if (error3 instanceof executable_response_1.ExecutableResponseError) {
            throw error3;
          }
          throw new executable_response_1.ExecutableResponseError(`The output file contained an invalid response: ${responseString}`);
        }
      }
      /**
       * Parses given command string into component array, splitting on spaces unless
       * spaces are between quotation marks.
       */
      static parseCommand(command) {
        const components = command.match(/(?:[^\s"]+|"[^"]*")+/g);
        if (!components) {
          throw new Error(`Provided command: "${command}" could not be parsed.`);
        }
        for (let i = 0; i < components.length; i++) {
          if (components[i][0] === '"' && components[i].slice(-1) === '"') {
            components[i] = components[i].slice(1, -1);
          }
        }
        return components;
      }
    };
    exports.PluggableAuthHandler = PluggableAuthHandler;
  }
});

// node_modules/google-auth-library/build/src/auth/pluggable-auth-client.js
var require_pluggable_auth_client = __commonJS({
  "node_modules/google-auth-library/build/src/auth/pluggable-auth-client.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluggableAuthClient = exports.ExecutableError = void 0;
    var baseexternalclient_1 = require_baseexternalclient();
    var executable_response_1 = require_executable_response();
    var pluggable_auth_handler_1 = require_pluggable_auth_handler();
    var ExecutableError = class extends Error {
      static {
        __name(this, "ExecutableError");
      }
      constructor(message, code) {
        super(`The executable failed with exit code: ${code} and error message: ${message}.`);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
      }
    };
    exports.ExecutableError = ExecutableError;
    var DEFAULT_EXECUTABLE_TIMEOUT_MILLIS = 30 * 1e3;
    var MINIMUM_EXECUTABLE_TIMEOUT_MILLIS = 5 * 1e3;
    var MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS = 120 * 1e3;
    var GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES = "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES";
    var MAXIMUM_EXECUTABLE_VERSION = 1;
    var PluggableAuthClient = class extends baseexternalclient_1.BaseExternalAccountClient {
      static {
        __name(this, "PluggableAuthClient");
      }
      /**
       * Instantiates a PluggableAuthClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * An error is thrown if the credential is not a valid pluggable auth credential.
       * @param options The external account options object typically loaded from
       *   the external account JSON credential file.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       */
      constructor(options, additionalOptions) {
        super(options, additionalOptions);
        if (!options.credential_source.executable) {
          throw new Error('No valid Pluggable Auth "credential_source" provided.');
        }
        this.command = options.credential_source.executable.command;
        if (!this.command) {
          throw new Error('No valid Pluggable Auth "credential_source" provided.');
        }
        if (options.credential_source.executable.timeout_millis === void 0) {
          this.timeoutMillis = DEFAULT_EXECUTABLE_TIMEOUT_MILLIS;
        } else {
          this.timeoutMillis = options.credential_source.executable.timeout_millis;
          if (this.timeoutMillis < MINIMUM_EXECUTABLE_TIMEOUT_MILLIS || this.timeoutMillis > MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS) {
            throw new Error(`Timeout must be between ${MINIMUM_EXECUTABLE_TIMEOUT_MILLIS} and ${MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS} milliseconds.`);
          }
        }
        this.outputFile = options.credential_source.executable.output_file;
        this.handler = new pluggable_auth_handler_1.PluggableAuthHandler({
          command: this.command,
          timeoutMillis: this.timeoutMillis,
          outputFile: this.outputFile
        });
        this.credentialSourceType = "executable";
      }
      /**
       * Triggered when an external subject token is needed to be exchanged for a
       * GCP access token via GCP STS endpoint.
       * This uses the `options.credential_source` object to figure out how
       * to retrieve the token using the current environment. In this case,
       * this calls a user provided executable which returns the subject token.
       * The logic is summarized as:
       * 1. Validated that the executable is allowed to run. The
       *    GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment must be set to
       *    1 for security reasons.
       * 2. If an output file is specified by the user, check the file location
       *    for a response. If the file exists and contains a valid response,
       *    return the subject token from the file.
       * 3. Call the provided executable and return response.
       * @return A promise that resolves with the external subject token.
       */
      async retrieveSubjectToken() {
        if (process.env[GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES] !== "1") {
          throw new Error("Pluggable Auth executables need to be explicitly allowed to run by setting the GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment Variable to 1.");
        }
        let executableResponse = void 0;
        if (this.outputFile) {
          executableResponse = await this.handler.retrieveCachedResponse();
        }
        if (!executableResponse) {
          const envMap = /* @__PURE__ */ new Map();
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE", this.audience);
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE", this.subjectTokenType);
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_INTERACTIVE", "0");
          if (this.outputFile) {
            envMap.set("GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE", this.outputFile);
          }
          const serviceAccountEmail = this.getServiceAccountEmail();
          if (serviceAccountEmail) {
            envMap.set("GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL", serviceAccountEmail);
          }
          executableResponse = await this.handler.retrieveResponseFromExecutable(envMap);
        }
        if (executableResponse.version > MAXIMUM_EXECUTABLE_VERSION) {
          throw new Error(`Version of executable is not currently supported, maximum supported version is ${MAXIMUM_EXECUTABLE_VERSION}.`);
        }
        if (!executableResponse.success) {
          throw new ExecutableError(executableResponse.errorMessage, executableResponse.errorCode);
        }
        if (this.outputFile) {
          if (!executableResponse.expirationTime) {
            throw new executable_response_1.InvalidExpirationTimeFieldError("The executable response must contain the `expiration_time` field for successful responses when an output_file has been specified in the configuration.");
          }
        }
        if (executableResponse.isExpired()) {
          throw new Error("Executable response is expired.");
        }
        return executableResponse.subjectToken;
      }
    };
    exports.PluggableAuthClient = PluggableAuthClient;
  }
});

// node_modules/google-auth-library/build/src/auth/externalclient.js
var require_externalclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/externalclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExternalAccountClient = void 0;
    var baseexternalclient_1 = require_baseexternalclient();
    var identitypoolclient_1 = require_identitypoolclient();
    var awsclient_1 = require_awsclient();
    var pluggable_auth_client_1 = require_pluggable_auth_client();
    var ExternalAccountClient = class {
      static {
        __name(this, "ExternalAccountClient");
      }
      constructor() {
        throw new Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()");
      }
      /**
       * This static method will instantiate the
       * corresponding type of external account credential depending on the
       * underlying credential source.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       * @return A BaseExternalAccountClient instance or null if the options
       *   provided do not correspond to an external account credential.
       */
      static fromJSON(options, additionalOptions) {
        var _a, _b;
        if (options && options.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          if ((_a = options.credential_source) === null || _a === void 0 ? void 0 : _a.environment_id) {
            return new awsclient_1.AwsClient(options, additionalOptions);
          } else if ((_b = options.credential_source) === null || _b === void 0 ? void 0 : _b.executable) {
            return new pluggable_auth_client_1.PluggableAuthClient(options, additionalOptions);
          } else {
            return new identitypoolclient_1.IdentityPoolClient(options, additionalOptions);
          }
        } else {
          return null;
        }
      }
    };
    exports.ExternalAccountClient = ExternalAccountClient;
  }
});

// node_modules/google-auth-library/build/src/auth/externalAccountAuthorizedUserClient.js
var require_externalAccountAuthorizedUserClient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/externalAccountAuthorizedUserClient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExternalAccountAuthorizedUserClient = exports.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = void 0;
    var authclient_1 = require_authclient();
    var oauth2common_1 = require_oauth2common();
    var gaxios_1 = require_src();
    var stream = require_stream();
    var baseexternalclient_1 = require_baseexternalclient();
    exports.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = "external_account_authorized_user";
    var DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/oauthtoken";
    var ExternalAccountAuthorizedUserHandler = class _ExternalAccountAuthorizedUserHandler extends oauth2common_1.OAuthClientAuthHandler {
      static {
        __name(this, "ExternalAccountAuthorizedUserHandler");
      }
      /**
       * Initializes an ExternalAccountAuthorizedUserHandler instance.
       * @param url The URL of the token refresh endpoint.
       * @param transporter The transporter to use for the refresh request.
       * @param clientAuthentication The client authentication credentials to use
       *   for the refresh request.
       */
      constructor(url, transporter, clientAuthentication) {
        super(clientAuthentication);
        this.url = url;
        this.transporter = transporter;
      }
      /**
       * Requests a new access token from the token_url endpoint using the provided
       *   refresh token.
       * @param refreshToken The refresh token to use to generate a new access token.
       * @param additionalHeaders Optional additional headers to pass along the
       *   request.
       * @return A promise that resolves with the token refresh response containing
       *   the requested access token and its expiration time.
       */
      async refreshToken(refreshToken, additionalHeaders) {
        const values = new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...additionalHeaders
        };
        const opts = {
          ..._ExternalAccountAuthorizedUserHandler.RETRY_CONFIG,
          url: this.url,
          method: "POST",
          headers,
          data: values.toString(),
          responseType: "json"
        };
        this.applyClientAuthenticationOptions(opts);
        try {
          const response = await this.transporter.request(opts);
          const tokenRefreshResponse = response.data;
          tokenRefreshResponse.res = response;
          return tokenRefreshResponse;
        } catch (error3) {
          if (error3 instanceof gaxios_1.GaxiosError && error3.response) {
            throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
              error3.response.data,
              // Preserve other fields from the original error.
              error3
            );
          }
          throw error3;
        }
      }
    };
    var ExternalAccountAuthorizedUserClient = class extends authclient_1.AuthClient {
      static {
        __name(this, "ExternalAccountAuthorizedUserClient");
      }
      /**
       * Instantiates an ExternalAccountAuthorizedUserClient instances using the
       * provided JSON object loaded from a credentials files.
       * An error is throws if the credential is not valid.
       * @param options The external account authorized user option object typically
       *   from the external accoutn authorized user JSON credential file.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       */
      constructor(options, additionalOptions) {
        var _a;
        super({ ...options, ...additionalOptions });
        if (options.universe_domain) {
          this.universeDomain = options.universe_domain;
        }
        this.refreshToken = options.refresh_token;
        const clientAuth = {
          confidentialClientType: "basic",
          clientId: options.client_id,
          clientSecret: options.client_secret
        };
        this.externalAccountAuthorizedUserHandler = new ExternalAccountAuthorizedUserHandler((_a = options.token_url) !== null && _a !== void 0 ? _a : DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain), this.transporter, clientAuth);
        this.cachedAccessToken = null;
        this.quotaProjectId = options.quota_project_id;
        if (typeof (additionalOptions === null || additionalOptions === void 0 ? void 0 : additionalOptions.eagerRefreshThresholdMillis) !== "number") {
          this.eagerRefreshThresholdMillis = baseexternalclient_1.EXPIRATION_TIME_OFFSET;
        } else {
          this.eagerRefreshThresholdMillis = additionalOptions.eagerRefreshThresholdMillis;
        }
        this.forceRefreshOnFailure = !!(additionalOptions === null || additionalOptions === void 0 ? void 0 : additionalOptions.forceRefreshOnFailure);
      }
      async getAccessToken() {
        if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedAccessToken.access_token,
          res: this.cachedAccessToken.res
        };
      }
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessTokenResponse.token}`
        };
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = opts.headers || {};
          if (requestHeaders && requestHeaders["x-goog-user-project"]) {
            opts.headers["x-goog-user-project"] = requestHeaders["x-goog-user-project"];
          }
          if (requestHeaders && requestHeaders.Authorization) {
            opts.headers.Authorization = requestHeaders.Authorization;
          }
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * @return A promise that resolves with the refreshed credential.
       */
      async refreshAccessTokenAsync() {
        const refreshResponse = await this.externalAccountAuthorizedUserHandler.refreshToken(this.refreshToken);
        this.cachedAccessToken = {
          access_token: refreshResponse.access_token,
          expiry_date: (/* @__PURE__ */ new Date()).getTime() + refreshResponse.expires_in * 1e3,
          res: refreshResponse.res
        };
        if (refreshResponse.refresh_token !== void 0) {
          this.refreshToken = refreshResponse.refresh_token;
        }
        return this.cachedAccessToken;
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param credentials The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(credentials) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return credentials.expiry_date ? now >= credentials.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
    };
    exports.ExternalAccountAuthorizedUserClient = ExternalAccountAuthorizedUserClient;
  }
});

// node_modules/google-auth-library/build/src/auth/googleauth.js
var require_googleauth = __commonJS({
  "node_modules/google-auth-library/build/src/auth/googleauth.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _GoogleAuth_instances;
    var _GoogleAuth_pendingAuthClient;
    var _GoogleAuth_prepareAndCacheClient;
    var _GoogleAuth_determineClient;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.GoogleAuthExceptionMessages = exports.CLOUD_SDK_CLIENT_ID = void 0;
    var child_process_1 = require_child_process();
    var fs = require_fs();
    var gcpMetadata = require_src3();
    var os = require_os();
    var path = require_path();
    var crypto_1 = require_crypto4();
    var transporters_1 = require_transporters();
    var computeclient_1 = require_computeclient();
    var idtokenclient_1 = require_idtokenclient();
    var envDetect_1 = require_envDetect();
    var jwtclient_1 = require_jwtclient();
    var refreshclient_1 = require_refreshclient();
    var impersonated_1 = require_impersonated();
    var externalclient_1 = require_externalclient();
    var baseexternalclient_1 = require_baseexternalclient();
    var authclient_1 = require_authclient();
    var externalAccountAuthorizedUserClient_1 = require_externalAccountAuthorizedUserClient();
    var util_1 = require_util2();
    exports.CLOUD_SDK_CLIENT_ID = "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com";
    exports.GoogleAuthExceptionMessages = {
      API_KEY_WITH_CREDENTIALS: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together.",
      NO_PROJECT_ID_FOUND: "Unable to detect a Project Id in the current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_CREDENTIALS_FOUND: "Unable to find credentials in current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_ADC_FOUND: "Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.",
      NO_UNIVERSE_DOMAIN_FOUND: "Unable to detect a Universe Domain in the current environment.\nTo learn more about Universe Domain retrieval, visit: \nhttps://cloud.google.com/compute/docs/metadata/predefined-metadata-keys"
    };
    var GoogleAuth = class {
      static {
        __name(this, "GoogleAuth");
      }
      // Note:  this properly is only public to satisfy unit tests.
      // https://github.com/Microsoft/TypeScript/issues/5228
      get isGCE() {
        return this.checkIsGCE;
      }
      /**
       * Configuration is resolved in the following order of precedence:
       * - {@link GoogleAuthOptions.credentials `credentials`}
       * - {@link GoogleAuthOptions.keyFilename `keyFilename`}
       * - {@link GoogleAuthOptions.keyFile `keyFile`}
       *
       * {@link GoogleAuthOptions.clientOptions `clientOptions`} are passed to the
       * {@link AuthClient `AuthClient`s}.
       *
       * @param opts
       */
      constructor(opts = {}) {
        _GoogleAuth_instances.add(this);
        this.checkIsGCE = void 0;
        this.jsonContent = null;
        this.cachedCredential = null;
        _GoogleAuth_pendingAuthClient.set(this, null);
        this.clientOptions = {};
        this._cachedProjectId = opts.projectId || null;
        this.cachedCredential = opts.authClient || null;
        this.keyFilename = opts.keyFilename || opts.keyFile;
        this.scopes = opts.scopes;
        this.clientOptions = opts.clientOptions || {};
        this.jsonContent = opts.credentials || null;
        this.apiKey = opts.apiKey || this.clientOptions.apiKey || null;
        if (this.apiKey && (this.jsonContent || this.clientOptions.credentials)) {
          throw new RangeError(exports.GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS);
        }
        if (opts.universeDomain) {
          this.clientOptions.universeDomain = opts.universeDomain;
        }
      }
      // GAPIC client libraries should always use self-signed JWTs. The following
      // variables are set on the JWT client in order to indicate the type of library,
      // and sign the JWT with the correct audience and scopes (if not supplied).
      setGapicJWTValues(client) {
        client.defaultServicePath = this.defaultServicePath;
        client.useJWTAccessWithScope = this.useJWTAccessWithScope;
        client.defaultScopes = this.defaultScopes;
      }
      getProjectId(callback) {
        if (callback) {
          this.getProjectIdAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getProjectIdAsync();
        }
      }
      /**
       * A temporary method for internal `getProjectId` usages where `null` is
       * acceptable. In a future major release, `getProjectId` should return `null`
       * (as the `Promise<string | null>` base signature describes) and this private
       * method should be removed.
       *
       * @returns Promise that resolves with project id (or `null`)
       */
      async getProjectIdOptional() {
        try {
          return await this.getProjectId();
        } catch (e) {
          if (e instanceof Error && e.message === exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND) {
            return null;
          } else {
            throw e;
          }
        }
      }
      /**
       * A private method for finding and caching a projectId.
       *
       * Supports environments in order of precedence:
       * - GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variable
       * - GOOGLE_APPLICATION_CREDENTIALS JSON file
       * - Cloud SDK: `gcloud config config-helper --format json`
       * - GCE project ID from metadata server
       *
       * @returns projectId
       */
      async findAndCacheProjectId() {
        let projectId = null;
        projectId || (projectId = await this.getProductionProjectId());
        projectId || (projectId = await this.getFileProjectId());
        projectId || (projectId = await this.getDefaultServiceProjectId());
        projectId || (projectId = await this.getGCEProjectId());
        projectId || (projectId = await this.getExternalAccountClientProjectId());
        if (projectId) {
          this._cachedProjectId = projectId;
          return projectId;
        } else {
          throw new Error(exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND);
        }
      }
      async getProjectIdAsync() {
        if (this._cachedProjectId) {
          return this._cachedProjectId;
        }
        if (!this._findProjectIdPromise) {
          this._findProjectIdPromise = this.findAndCacheProjectId();
        }
        return this._findProjectIdPromise;
      }
      /**
       * Retrieves a universe domain from the metadata server via
       * {@link gcpMetadata.universe}.
       *
       * @returns a universe domain
       */
      async getUniverseDomainFromMetadataServer() {
        var _a;
        let universeDomain;
        try {
          universeDomain = await gcpMetadata.universe("universe-domain");
          universeDomain || (universeDomain = authclient_1.DEFAULT_UNIVERSE);
        } catch (e) {
          if (e && ((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
            universeDomain = authclient_1.DEFAULT_UNIVERSE;
          } else {
            throw e;
          }
        }
        return universeDomain;
      }
      /**
       * Retrieves, caches, and returns the universe domain in the following order
       * of precedence:
       * - The universe domain in {@link GoogleAuth.clientOptions}
       * - An existing or ADC {@link AuthClient}'s universe domain
       * - {@link gcpMetadata.universe}, if {@link Compute} client
       *
       * @returns The universe domain
       */
      async getUniverseDomain() {
        let universeDomain = (0, util_1.originalOrCamelOptions)(this.clientOptions).get("universe_domain");
        try {
          universeDomain !== null && universeDomain !== void 0 ? universeDomain : universeDomain = (await this.getClient()).universeDomain;
        } catch (_a) {
          universeDomain !== null && universeDomain !== void 0 ? universeDomain : universeDomain = authclient_1.DEFAULT_UNIVERSE;
        }
        return universeDomain;
      }
      /**
       * @returns Any scopes (user-specified or default scopes specified by the
       *   client library) that need to be set on the current Auth client.
       */
      getAnyScopes() {
        return this.scopes || this.defaultScopes;
      }
      getApplicationDefault(optionsOrCallback = {}, callback) {
        let options;
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options = optionsOrCallback;
        }
        if (callback) {
          this.getApplicationDefaultAsync(options).then((r) => callback(null, r.credential, r.projectId), callback);
        } else {
          return this.getApplicationDefaultAsync(options);
        }
      }
      async getApplicationDefaultAsync(options = {}) {
        if (this.cachedCredential) {
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, this.cachedCredential, null);
        }
        let credential;
        credential = await this._tryGetApplicationCredentialsFromEnvironmentVariable(options);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, credential);
        }
        credential = await this._tryGetApplicationCredentialsFromWellKnownFile(options);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, credential);
        }
        if (await this._checkIsGCE()) {
          options.scopes = this.getAnyScopes();
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, new computeclient_1.Compute(options));
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_ADC_FOUND);
      }
      /**
       * Determines whether the auth layer is running on Google Compute Engine.
       * Checks for GCP Residency, then fallback to checking if metadata server
       * is available.
       *
       * @returns A promise that resolves with the boolean.
       * @api private
       */
      async _checkIsGCE() {
        if (this.checkIsGCE === void 0) {
          this.checkIsGCE = gcpMetadata.getGCPResidency() || await gcpMetadata.isAvailable();
        }
        return this.checkIsGCE;
      }
      /**
       * Attempts to load default credentials from the environment variable path..
       * @returns Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromEnvironmentVariable(options) {
        const credentialsPath = process.env["GOOGLE_APPLICATION_CREDENTIALS"] || process.env["google_application_credentials"];
        if (!credentialsPath || credentialsPath.length === 0) {
          return null;
        }
        try {
          return this._getApplicationCredentialsFromFilePath(credentialsPath, options);
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Unable to read the credential file specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable: ${e.message}`;
          }
          throw e;
        }
      }
      /**
       * Attempts to load default credentials from a well-known file location
       * @return Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromWellKnownFile(options) {
        let location = null;
        if (this._isWindows()) {
          location = process.env["APPDATA"];
        } else {
          const home = process.env["HOME"];
          if (home) {
            location = path.join(home, ".config");
          }
        }
        if (location) {
          location = path.join(location, "gcloud", "application_default_credentials.json");
          if (!fs.existsSync(location)) {
            location = null;
          }
        }
        if (!location) {
          return null;
        }
        const client = await this._getApplicationCredentialsFromFilePath(location, options);
        return client;
      }
      /**
       * Attempts to load default credentials from a file at the given path..
       * @param filePath The path to the file to read.
       * @returns Promise that resolves with the OAuth2Client
       * @api private
       */
      async _getApplicationCredentialsFromFilePath(filePath, options = {}) {
        if (!filePath || filePath.length === 0) {
          throw new Error("The file path is invalid.");
        }
        try {
          filePath = fs.realpathSync(filePath);
          if (!fs.lstatSync(filePath).isFile()) {
            throw new Error();
          }
        } catch (err) {
          if (err instanceof Error) {
            err.message = `The file at ${filePath} does not exist, or it is not a file. ${err.message}`;
          }
          throw err;
        }
        const readStream = fs.createReadStream(filePath);
        return this.fromStream(readStream, options);
      }
      /**
       * Create a credentials instance using a given impersonated input options.
       * @param json The impersonated input object.
       * @returns JWT or UserRefresh Client with data
       */
      fromImpersonatedJSON(json) {
        var _a, _b, _c, _d;
        if (!json) {
          throw new Error("Must pass in a JSON object containing an  impersonated refresh token");
        }
        if (json.type !== impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          throw new Error(`The incoming JSON object does not have the "${impersonated_1.IMPERSONATED_ACCOUNT_TYPE}" type`);
        }
        if (!json.source_credentials) {
          throw new Error("The incoming JSON object does not contain a source_credentials field");
        }
        if (!json.service_account_impersonation_url) {
          throw new Error("The incoming JSON object does not contain a service_account_impersonation_url field");
        }
        const sourceClient = this.fromJSON(json.source_credentials);
        if (((_a = json.service_account_impersonation_url) === null || _a === void 0 ? void 0 : _a.length) > 256) {
          throw new RangeError(`Target principal is too long: ${json.service_account_impersonation_url}`);
        }
        const targetPrincipal = (_c = (_b = /(?<target>[^/]+):(generateAccessToken|generateIdToken)$/.exec(json.service_account_impersonation_url)) === null || _b === void 0 ? void 0 : _b.groups) === null || _c === void 0 ? void 0 : _c.target;
        if (!targetPrincipal) {
          throw new RangeError(`Cannot extract target principal from ${json.service_account_impersonation_url}`);
        }
        const targetScopes = (_d = this.getAnyScopes()) !== null && _d !== void 0 ? _d : [];
        return new impersonated_1.Impersonated({
          ...json,
          sourceClient,
          targetPrincipal,
          targetScopes: Array.isArray(targetScopes) ? targetScopes : [targetScopes]
        });
      }
      /**
       * Create a credentials instance using the given input options.
       * This client is not cached.
       *
       * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
       *
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      fromJSON(json, options = {}) {
        let client;
        const preferredUniverseDomain = (0, util_1.originalOrCamelOptions)(options).get("universe_domain");
        if (json.type === refreshclient_1.USER_REFRESH_ACCOUNT_TYPE) {
          client = new refreshclient_1.UserRefreshClient(options);
          client.fromJSON(json);
        } else if (json.type === impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          client = this.fromImpersonatedJSON(json);
        } else if (json.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          client = externalclient_1.ExternalAccountClient.fromJSON(json, options);
          client.scopes = this.getAnyScopes();
        } else if (json.type === externalAccountAuthorizedUserClient_1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE) {
          client = new externalAccountAuthorizedUserClient_1.ExternalAccountAuthorizedUserClient(json, options);
        } else {
          options.scopes = this.scopes;
          client = new jwtclient_1.JWT(options);
          this.setGapicJWTValues(client);
          client.fromJSON(json);
        }
        if (preferredUniverseDomain) {
          client.universeDomain = preferredUniverseDomain;
        }
        return client;
      }
      /**
       * Return a JWT or UserRefreshClient from JavaScript object, caching both the
       * object used to instantiate and the client.
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      _cacheClientFromJSON(json, options) {
        const client = this.fromJSON(json, options);
        this.jsonContent = json;
        this.cachedCredential = client;
        return client;
      }
      fromStream(inputStream, optionsOrCallback = {}, callback) {
        let options = {};
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options = optionsOrCallback;
        }
        if (callback) {
          this.fromStreamAsync(inputStream, options).then((r) => callback(null, r), callback);
        } else {
          return this.fromStreamAsync(inputStream, options);
        }
      }
      fromStreamAsync(inputStream, options) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            throw new Error("Must pass in a stream containing the Google auth settings.");
          }
          const chunks = [];
          inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => chunks.push(chunk)).on("end", () => {
            try {
              try {
                const data = JSON.parse(chunks.join(""));
                const r = this._cacheClientFromJSON(data, options);
                return resolve(r);
              } catch (err) {
                if (!this.keyFilename)
                  throw err;
                const client = new jwtclient_1.JWT({
                  ...this.clientOptions,
                  keyFile: this.keyFilename
                });
                this.cachedCredential = client;
                this.setGapicJWTValues(client);
                return resolve(client);
              }
            } catch (err) {
              return reject(err);
            }
          });
        });
      }
      /**
       * Create a credentials instance using the given API key string.
       * The created client is not cached. In order to create and cache it use the {@link GoogleAuth.getClient `getClient`} method after first providing an {@link GoogleAuth.apiKey `apiKey`}.
       *
       * @param apiKey The API key string
       * @param options An optional options object.
       * @returns A JWT loaded from the key
       */
      fromAPIKey(apiKey, options = {}) {
        return new jwtclient_1.JWT({ ...options, apiKey });
      }
      /**
       * Determines whether the current operating system is Windows.
       * @api private
       */
      _isWindows() {
        const sys = os.platform();
        if (sys && sys.length >= 3) {
          if (sys.substring(0, 3).toLowerCase() === "win") {
            return true;
          }
        }
        return false;
      }
      /**
       * Run the Google Cloud SDK command that prints the default project ID
       */
      async getDefaultServiceProjectId() {
        return new Promise((resolve) => {
          (0, child_process_1.exec)("gcloud config config-helper --format json", (err, stdout2) => {
            if (!err && stdout2) {
              try {
                const projectId = JSON.parse(stdout2).configuration.properties.core.project;
                resolve(projectId);
                return;
              } catch (e) {
              }
            }
            resolve(null);
          });
        });
      }
      /**
       * Loads the project id from environment variables.
       * @api private
       */
      getProductionProjectId() {
        return process.env["GCLOUD_PROJECT"] || process.env["GOOGLE_CLOUD_PROJECT"] || process.env["gcloud_project"] || process.env["google_cloud_project"];
      }
      /**
       * Loads the project id from the GOOGLE_APPLICATION_CREDENTIALS json file.
       * @api private
       */
      async getFileProjectId() {
        if (this.cachedCredential) {
          return this.cachedCredential.projectId;
        }
        if (this.keyFilename) {
          const creds = await this.getClient();
          if (creds && creds.projectId) {
            return creds.projectId;
          }
        }
        const r = await this._tryGetApplicationCredentialsFromEnvironmentVariable();
        if (r) {
          return r.projectId;
        } else {
          return null;
        }
      }
      /**
       * Gets the project ID from external account client if available.
       */
      async getExternalAccountClientProjectId() {
        if (!this.jsonContent || this.jsonContent.type !== baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          return null;
        }
        const creds = await this.getClient();
        return await creds.getProjectId();
      }
      /**
       * Gets the Compute Engine project ID if it can be inferred.
       */
      async getGCEProjectId() {
        try {
          const r = await gcpMetadata.project("project-id");
          return r;
        } catch (e) {
          return null;
        }
      }
      getCredentials(callback) {
        if (callback) {
          this.getCredentialsAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getCredentialsAsync();
        }
      }
      async getCredentialsAsync() {
        const client = await this.getClient();
        if (client instanceof impersonated_1.Impersonated) {
          return { client_email: client.getTargetPrincipal() };
        }
        if (client instanceof baseexternalclient_1.BaseExternalAccountClient) {
          const serviceAccountEmail = client.getServiceAccountEmail();
          if (serviceAccountEmail) {
            return {
              client_email: serviceAccountEmail,
              universe_domain: client.universeDomain
            };
          }
        }
        if (this.jsonContent) {
          return {
            client_email: this.jsonContent.client_email,
            private_key: this.jsonContent.private_key,
            universe_domain: this.jsonContent.universe_domain
          };
        }
        if (await this._checkIsGCE()) {
          const [client_email, universe_domain] = await Promise.all([
            gcpMetadata.instance("service-accounts/default/email"),
            this.getUniverseDomain()
          ]);
          return { client_email, universe_domain };
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_CREDENTIALS_FOUND);
      }
      /**
       * Automatically obtain an {@link AuthClient `AuthClient`} based on the
       * provided configuration. If no options were passed, use Application
       * Default Credentials.
       */
      async getClient() {
        if (this.cachedCredential) {
          return this.cachedCredential;
        }
        __classPrivateFieldSet(this, _GoogleAuth_pendingAuthClient, __classPrivateFieldGet(this, _GoogleAuth_pendingAuthClient, "f") || __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_determineClient).call(this), "f");
        try {
          return await __classPrivateFieldGet(this, _GoogleAuth_pendingAuthClient, "f");
        } finally {
          __classPrivateFieldSet(this, _GoogleAuth_pendingAuthClient, null, "f");
        }
      }
      /**
       * Creates a client which will fetch an ID token for authorization.
       * @param targetAudience the audience for the fetched ID token.
       * @returns IdTokenClient for making HTTP calls authenticated with ID tokens.
       */
      async getIdTokenClient(targetAudience) {
        const client = await this.getClient();
        if (!("fetchIdToken" in client)) {
          throw new Error("Cannot fetch ID token in this environment, use GCE or set the GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account credentials JSON file.");
        }
        return new idtokenclient_1.IdTokenClient({ targetAudience, idTokenProvider: client });
      }
      /**
       * Automatically obtain application default credentials, and return
       * an access token for making requests.
       */
      async getAccessToken() {
        const client = await this.getClient();
        return (await client.getAccessToken()).token;
      }
      /**
       * Obtain the HTTP headers that will provide authorization for a given
       * request.
       */
      async getRequestHeaders(url) {
        const client = await this.getClient();
        return client.getRequestHeaders(url);
      }
      /**
       * Obtain credentials for a request, then attach the appropriate headers to
       * the request options.
       * @param opts Axios or Request options on which to attach the headers
       */
      async authorizeRequest(opts) {
        opts = opts || {};
        const url = opts.url || opts.uri;
        const client = await this.getClient();
        const headers = await client.getRequestHeaders(url);
        opts.headers = Object.assign(opts.headers || {}, headers);
        return opts;
      }
      /**
       * Automatically obtain application default credentials, and make an
       * HTTP request using the given options.
       * @param opts Axios request options for the HTTP request.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async request(opts) {
        const client = await this.getClient();
        return client.request(opts);
      }
      /**
       * Determine the compute environment in which the code is running.
       */
      getEnv() {
        return (0, envDetect_1.getEnv)();
      }
      /**
       * Sign the given data with the current private key, or go out
       * to the IAM API to sign it.
       * @param data The data to be signed.
       * @param endpoint A custom endpoint to use.
       *
       * @example
       * ```
       * sign('data', 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/');
       * ```
       */
      async sign(data, endpoint) {
        const client = await this.getClient();
        const universe = await this.getUniverseDomain();
        endpoint = endpoint || `https://iamcredentials.${universe}/v1/projects/-/serviceAccounts/`;
        if (client instanceof impersonated_1.Impersonated) {
          const signed = await client.sign(data);
          return signed.signedBlob;
        }
        const crypto3 = (0, crypto_1.createCrypto)();
        if (client instanceof jwtclient_1.JWT && client.key) {
          const sign = await crypto3.sign(client.key, data);
          return sign;
        }
        const creds = await this.getCredentials();
        if (!creds.client_email) {
          throw new Error("Cannot sign data without `client_email`.");
        }
        return this.signBlob(crypto3, creds.client_email, data, endpoint);
      }
      async signBlob(crypto3, emailOrUniqueId, data, endpoint) {
        const url = new URL(endpoint + `${emailOrUniqueId}:signBlob`);
        const res = await this.request({
          method: "POST",
          url: url.href,
          data: {
            payload: crypto3.encodeBase64StringUtf8(data)
          },
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["POST"]
          }
        });
        return res.data.signedBlob;
      }
    };
    exports.GoogleAuth = GoogleAuth;
    _GoogleAuth_pendingAuthClient = /* @__PURE__ */ new WeakMap(), _GoogleAuth_instances = /* @__PURE__ */ new WeakSet(), _GoogleAuth_prepareAndCacheClient = /* @__PURE__ */ __name(async function _GoogleAuth_prepareAndCacheClient2(credential, quotaProjectIdOverride = process.env["GOOGLE_CLOUD_QUOTA_PROJECT"] || null) {
      const projectId = await this.getProjectIdOptional();
      if (quotaProjectIdOverride) {
        credential.quotaProjectId = quotaProjectIdOverride;
      }
      this.cachedCredential = credential;
      return { credential, projectId };
    }, "_GoogleAuth_prepareAndCacheClient"), _GoogleAuth_determineClient = /* @__PURE__ */ __name(async function _GoogleAuth_determineClient2() {
      if (this.jsonContent) {
        return this._cacheClientFromJSON(this.jsonContent, this.clientOptions);
      } else if (this.keyFilename) {
        const filePath = path.resolve(this.keyFilename);
        const stream = fs.createReadStream(filePath);
        return await this.fromStreamAsync(stream, this.clientOptions);
      } else if (this.apiKey) {
        const client = await this.fromAPIKey(this.apiKey, this.clientOptions);
        client.scopes = this.scopes;
        const { credential } = await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, client);
        return credential;
      } else {
        const { credential } = await this.getApplicationDefaultAsync(this.clientOptions);
        return credential;
      }
    }, "_GoogleAuth_determineClient");
    GoogleAuth.DefaultTransporter = transporters_1.DefaultTransporter;
  }
});

// node_modules/google-auth-library/build/src/auth/iam.js
var require_iam = __commonJS({
  "node_modules/google-auth-library/build/src/auth/iam.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IAMAuth = void 0;
    var IAMAuth = class {
      static {
        __name(this, "IAMAuth");
      }
      /**
       * IAM credentials.
       *
       * @param selector the iam authority selector
       * @param token the token
       * @constructor
       */
      constructor(selector, token) {
        this.selector = selector;
        this.token = token;
        this.selector = selector;
        this.token = token;
      }
      /**
       * Acquire the HTTP headers required to make an authenticated request.
       */
      getRequestHeaders() {
        return {
          "x-goog-iam-authority-selector": this.selector,
          "x-goog-iam-authorization-token": this.token
        };
      }
    };
    exports.IAMAuth = IAMAuth;
  }
});

// node_modules/google-auth-library/build/src/auth/downscopedclient.js
var require_downscopedclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/downscopedclient.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DownscopedClient = exports.EXPIRATION_TIME_OFFSET = exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = void 0;
    var stream = require_stream();
    var authclient_1 = require_authclient();
    var sts = require_stscredentials();
    var STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    var STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    var STS_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = 10;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    var DownscopedClient = class extends authclient_1.AuthClient {
      static {
        __name(this, "DownscopedClient");
      }
      /**
       * Instantiates a downscoped client object using the provided source
       * AuthClient and credential access boundary rules.
       * To downscope permissions of a source AuthClient, a Credential Access
       * Boundary that specifies which resources the new credential can access, as
       * well as an upper bound on the permissions that are available on each
       * resource, has to be defined. A downscoped client can then be instantiated
       * using the source AuthClient and the Credential Access Boundary.
       * @param authClient The source AuthClient to be downscoped based on the
       *   provided Credential Access Boundary rules.
       * @param credentialAccessBoundary The Credential Access Boundary which
       *   contains a list of access boundary rules. Each rule contains information
       *   on the resource that the rule applies to, the upper bound of the
       *   permissions that are available on that resource and an optional
       *   condition to further restrict permissions.
       * @param additionalOptions **DEPRECATED, set this in the provided `authClient`.**
       *   Optional additional behavior customization options.
       * @param quotaProjectId **DEPRECATED, set this in the provided `authClient`.**
       *   Optional quota project id for setting up in the x-goog-user-project header.
       */
      constructor(authClient, credentialAccessBoundary, additionalOptions, quotaProjectId) {
        super({ ...additionalOptions, quotaProjectId });
        this.authClient = authClient;
        this.credentialAccessBoundary = credentialAccessBoundary;
        if (credentialAccessBoundary.accessBoundary.accessBoundaryRules.length === 0) {
          throw new Error("At least one access boundary rule needs to be defined.");
        } else if (credentialAccessBoundary.accessBoundary.accessBoundaryRules.length > exports.MAX_ACCESS_BOUNDARY_RULES_COUNT) {
          throw new Error(`The provided access boundary has more than ${exports.MAX_ACCESS_BOUNDARY_RULES_COUNT} access boundary rules.`);
        }
        for (const rule of credentialAccessBoundary.accessBoundary.accessBoundaryRules) {
          if (rule.availablePermissions.length === 0) {
            throw new Error("At least one permission should be defined in access boundary rules.");
          }
        }
        this.stsCredential = new sts.StsCredentials(`https://sts.${this.universeDomain}/v1/token`);
        this.cachedDownscopedAccessToken = null;
      }
      /**
       * Provides a mechanism to inject Downscoped access tokens directly.
       * The expiry_date field is required to facilitate determination of the token
       * expiration which would make it easier for the token consumer to handle.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        if (!credentials.expiry_date) {
          throw new Error("The access token expiry_date field is missing in the provided credentials.");
        }
        super.setCredentials(credentials);
        this.cachedDownscopedAccessToken = credentials;
      }
      async getAccessToken() {
        if (!this.cachedDownscopedAccessToken || this.isExpired(this.cachedDownscopedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedDownscopedAccessToken.access_token,
          expirationTime: this.cachedDownscopedAccessToken.expiry_date,
          res: this.cachedDownscopedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { Authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessTokenResponse.token}`
        };
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = opts.headers || {};
          if (requestHeaders && requestHeaders["x-goog-user-project"]) {
            opts.headers["x-goog-user-project"] = requestHeaders["x-goog-user-project"];
          }
          if (requestHeaders && requestHeaders.Authorization) {
            opts.headers.Authorization = requestHeaders.Authorization;
          }
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * GCP access tokens are retrieved from authclient object/source credential.
       * Then GCP access tokens are exchanged for downscoped access tokens via the
       * token exchange endpoint.
       * @return A promise that resolves with the fresh downscoped access token.
       */
      async refreshAccessTokenAsync() {
        var _a;
        const subjectToken = (await this.authClient.getAccessToken()).token;
        const stsCredentialsOptions = {
          grantType: STS_GRANT_TYPE,
          requestedTokenType: STS_REQUEST_TOKEN_TYPE,
          subjectToken,
          subjectTokenType: STS_SUBJECT_TOKEN_TYPE
        };
        const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, void 0, this.credentialAccessBoundary);
        const sourceCredExpireDate = ((_a = this.authClient.credentials) === null || _a === void 0 ? void 0 : _a.expiry_date) || null;
        const expiryDate = stsResponse.expires_in ? (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3 : sourceCredExpireDate;
        this.cachedDownscopedAccessToken = {
          access_token: stsResponse.access_token,
          expiry_date: expiryDate,
          res: stsResponse.res
        };
        this.credentials = {};
        Object.assign(this.credentials, this.cachedDownscopedAccessToken);
        delete this.credentials.res;
        this.emit("tokens", {
          refresh_token: null,
          expiry_date: this.cachedDownscopedAccessToken.expiry_date,
          access_token: this.cachedDownscopedAccessToken.access_token,
          token_type: "Bearer",
          id_token: null
        });
        return this.cachedDownscopedAccessToken;
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param downscopedAccessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(downscopedAccessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return downscopedAccessToken.expiry_date ? now >= downscopedAccessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
    };
    exports.DownscopedClient = DownscopedClient;
  }
});

// node_modules/google-auth-library/build/src/auth/passthrough.js
var require_passthrough = __commonJS({
  "node_modules/google-auth-library/build/src/auth/passthrough.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PassThroughClient = void 0;
    var authclient_1 = require_authclient();
    var PassThroughClient = class extends authclient_1.AuthClient {
      static {
        __name(this, "PassThroughClient");
      }
      /**
       * Creates a request without any authentication headers or checks.
       *
       * @remarks
       *
       * In testing environments it may be useful to change the provided
       * {@link AuthClient.transporter} for any desired request overrides/handling.
       *
       * @param opts
       * @returns The response of the request.
       */
      async request(opts) {
        return this.transporter.request(opts);
      }
      /**
       * A required method of the base class.
       * Always will return an empty object.
       *
       * @returns {}
       */
      async getAccessToken() {
        return {};
      }
      /**
       * A required method of the base class.
       * Always will return an empty object.
       *
       * @returns {}
       */
      async getRequestHeaders() {
        return {};
      }
    };
    exports.PassThroughClient = PassThroughClient;
    var a = new PassThroughClient();
    a.getAccessToken();
  }
});

// node_modules/google-auth-library/build/src/index.js
var require_src5 = __commonJS({
  "node_modules/google-auth-library/build/src/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.auth = exports.DefaultTransporter = exports.PassThroughClient = exports.ExecutableError = exports.PluggableAuthClient = exports.DownscopedClient = exports.BaseExternalAccountClient = exports.ExternalAccountClient = exports.IdentityPoolClient = exports.AwsRequestSigner = exports.AwsClient = exports.UserRefreshClient = exports.LoginTicket = exports.ClientAuthentication = exports.OAuth2Client = exports.CodeChallengeMethod = exports.Impersonated = exports.JWT = exports.JWTAccess = exports.IdTokenClient = exports.IAMAuth = exports.GCPEnv = exports.Compute = exports.DEFAULT_UNIVERSE = exports.AuthClient = exports.gaxios = exports.gcpMetadata = void 0;
    var googleauth_1 = require_googleauth();
    Object.defineProperty(exports, "GoogleAuth", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return googleauth_1.GoogleAuth;
    }, "get") });
    exports.gcpMetadata = require_src3();
    exports.gaxios = require_src();
    var authclient_1 = require_authclient();
    Object.defineProperty(exports, "AuthClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return authclient_1.AuthClient;
    }, "get") });
    Object.defineProperty(exports, "DEFAULT_UNIVERSE", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return authclient_1.DEFAULT_UNIVERSE;
    }, "get") });
    var computeclient_1 = require_computeclient();
    Object.defineProperty(exports, "Compute", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return computeclient_1.Compute;
    }, "get") });
    var envDetect_1 = require_envDetect();
    Object.defineProperty(exports, "GCPEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return envDetect_1.GCPEnv;
    }, "get") });
    var iam_1 = require_iam();
    Object.defineProperty(exports, "IAMAuth", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return iam_1.IAMAuth;
    }, "get") });
    var idtokenclient_1 = require_idtokenclient();
    Object.defineProperty(exports, "IdTokenClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return idtokenclient_1.IdTokenClient;
    }, "get") });
    var jwtaccess_1 = require_jwtaccess();
    Object.defineProperty(exports, "JWTAccess", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return jwtaccess_1.JWTAccess;
    }, "get") });
    var jwtclient_1 = require_jwtclient();
    Object.defineProperty(exports, "JWT", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return jwtclient_1.JWT;
    }, "get") });
    var impersonated_1 = require_impersonated();
    Object.defineProperty(exports, "Impersonated", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return impersonated_1.Impersonated;
    }, "get") });
    var oauth2client_1 = require_oauth2client();
    Object.defineProperty(exports, "CodeChallengeMethod", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return oauth2client_1.CodeChallengeMethod;
    }, "get") });
    Object.defineProperty(exports, "OAuth2Client", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return oauth2client_1.OAuth2Client;
    }, "get") });
    Object.defineProperty(exports, "ClientAuthentication", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return oauth2client_1.ClientAuthentication;
    }, "get") });
    var loginticket_1 = require_loginticket();
    Object.defineProperty(exports, "LoginTicket", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return loginticket_1.LoginTicket;
    }, "get") });
    var refreshclient_1 = require_refreshclient();
    Object.defineProperty(exports, "UserRefreshClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return refreshclient_1.UserRefreshClient;
    }, "get") });
    var awsclient_1 = require_awsclient();
    Object.defineProperty(exports, "AwsClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return awsclient_1.AwsClient;
    }, "get") });
    var awsrequestsigner_1 = require_awsrequestsigner();
    Object.defineProperty(exports, "AwsRequestSigner", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return awsrequestsigner_1.AwsRequestSigner;
    }, "get") });
    var identitypoolclient_1 = require_identitypoolclient();
    Object.defineProperty(exports, "IdentityPoolClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return identitypoolclient_1.IdentityPoolClient;
    }, "get") });
    var externalclient_1 = require_externalclient();
    Object.defineProperty(exports, "ExternalAccountClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return externalclient_1.ExternalAccountClient;
    }, "get") });
    var baseexternalclient_1 = require_baseexternalclient();
    Object.defineProperty(exports, "BaseExternalAccountClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return baseexternalclient_1.BaseExternalAccountClient;
    }, "get") });
    var downscopedclient_1 = require_downscopedclient();
    Object.defineProperty(exports, "DownscopedClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return downscopedclient_1.DownscopedClient;
    }, "get") });
    var pluggable_auth_client_1 = require_pluggable_auth_client();
    Object.defineProperty(exports, "PluggableAuthClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return pluggable_auth_client_1.PluggableAuthClient;
    }, "get") });
    Object.defineProperty(exports, "ExecutableError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return pluggable_auth_client_1.ExecutableError;
    }, "get") });
    var passthrough_1 = require_passthrough();
    Object.defineProperty(exports, "PassThroughClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return passthrough_1.PassThroughClient;
    }, "get") });
    var transporters_1 = require_transporters();
    Object.defineProperty(exports, "DefaultTransporter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return transporters_1.DefaultTransporter;
    }, "get") });
    var auth = new googleauth_1.GoogleAuth();
    exports.auth = auth;
  }
});

// server.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono-base.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/compose.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/http-exception.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/buffer.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/crypto.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/utils/body.js
var isRawRequest = /* @__PURE__ */ __name((request3) => "headers" in request3, "isRawRequest");
var parseBody = /* @__PURE__ */ __name(async (request3, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request3) ? request3.headers : request3.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request3, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request3, options) {
  if (!isRawRequest(request3) && request3.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request3.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request3) ? request3.headers : request3.raw.headers;
  const arrayBuffer = await request3.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request3)) {
    request3.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey2 = `${label}#${next}`;
    if (!patternCache[cacheKey2]) {
      if (match2[2]) {
        patternCache[cacheKey2] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey2, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey2] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey2];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request3) => {
  const url = request3.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request3) => {
  const result = getPath(request3);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request3, path = "/", matchResult = [[]]) {
    this.raw = request3;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request3) => request3, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request3) => {
        const url = new URL(request3.url);
        url.pathname = this.getPath(request3).slice(pathPrefixLength) || "/";
        return new Request(url, request3);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request3, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request3, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request3, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request3, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request3, ...rest) => {
    return this.#dispatch(request3, rest[1], rest[0], request3.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var cors = /* @__PURE__ */ __name((options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// node_modules/@hono/node-server/dist/index.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_http();

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/http2.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@hono/node-server/dist/index.mjs
import { Readable as Readable2 } from "stream";
import crypto2 from "crypto";
var GlobalRequest = global.Request;
var Request2 = class extends GlobalRequest {
  static {
    __name(this, "Request");
  }
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newHeadersFromIncoming = /* @__PURE__ */ __name((incoming) => {
  const headerRecord = [];
  const rawHeaders2 = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders2.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders2;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  return new Headers(headerRecord);
}, "newHeadersFromIncoming");
var wrapBodyStream = /* @__PURE__ */ Symbol("wrapBodyStream");
var newRequestFromIncoming = /* @__PURE__ */ __name((method, url, headers, incoming, abortController) => {
  const init = {
    method,
    headers,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init.method = "GET";
    const req = new Request2(url, init);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) {
      init.body = new ReadableStream({
        start(controller) {
          controller.enqueue(incoming.rawBody);
          controller.close();
        }
      });
    } else if (incoming[wrapBodyStream]) {
      let reader;
      init.body = new ReadableStream({
        async pull(controller) {
          try {
            reader ||= Readable2.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error3) {
            controller.error(error3);
          }
        }
      });
    } else {
      init.body = Readable2.toWeb(incoming);
    }
  }
  return new Request2(url, init);
}, "newRequestFromIncoming");
var getRequestCache = /* @__PURE__ */ Symbol("getRequestCache");
var requestCache = /* @__PURE__ */ Symbol("requestCache");
var incomingKey = /* @__PURE__ */ Symbol("incomingKey");
var urlKey = /* @__PURE__ */ Symbol("urlKey");
var headersKey = /* @__PURE__ */ Symbol("headersKey");
var abortControllerKey = /* @__PURE__ */ Symbol("abortControllerKey");
var getAbortController = /* @__PURE__ */ Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  get headers() {
    return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this.headers,
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    get() {
      return this[getRequestCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(requestPrototype, k, {
    value: /* @__PURE__ */ __name(function() {
      return this[getRequestCache]()[k]();
    }, "value")
  });
});
Object.defineProperty(requestPrototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), {
  value: /* @__PURE__ */ __name(function(depth, options, inspectFn) {
    const props = {
      method: this.method,
      url: this.url,
      headers: this.headers,
      nativeRequest: this[requestCache]
    };
    return `Request (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }, "value")
});
Object.setPrototypeOf(requestPrototype, Request2.prototype);
var responseCache = /* @__PURE__ */ Symbol("responseCache");
var getResponseCache = /* @__PURE__ */ Symbol("getResponseCache");
var cacheKey = /* @__PURE__ */ Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  static {
    __name(this, "_Response");
  }
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init) {
    let headers;
    this.#body = body;
    if (init instanceof _Response) {
      const cachedGlobalResponse = init[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init.#init;
        headers = new Headers(init.#init.headers);
      }
    } else {
      this.#init = init;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
      ;
      this[cacheKey] = [init?.status || 200, body, headers || init?.headers];
    }
  }
  get headers() {
    const cache = this[cacheKey];
    if (cache) {
      if (!(cache[2] instanceof Headers)) {
        cache[2] = new Headers(
          cache[2] || { "content-type": "text/plain; charset=UTF-8" }
        );
      }
      return cache[2];
    }
    return this[getResponseCache]().headers;
  }
  get status() {
    return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
  }
  get ok() {
    const status = this.status;
    return status >= 200 && status < 300;
  }
};
["body", "bodyUsed", "redirected", "statusText", "trailers", "type", "url"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    get() {
      return this[getResponseCache]()[k];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k) => {
  Object.defineProperty(Response2.prototype, k, {
    value: /* @__PURE__ */ __name(function() {
      return this[getResponseCache]()[k]();
    }, "value")
  });
});
Object.defineProperty(Response2.prototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), {
  value: /* @__PURE__ */ __name(function(depth, options, inspectFn) {
    const props = {
      status: this.status,
      headers: this.headers,
      ok: this.ok,
      nativeResponse: this[responseCache]
    };
    return `Response (lightweight) ${inspectFn(props, { ...options, depth: depth == null ? null : depth - 1 })}`;
  }, "value")
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
if (typeof global.crypto === "undefined") {
  global.crypto = crypto2;
}
var MAX_DRAIN_BYTES = 64 * 1024 * 1024;

// server.js
var import_dotenv = __toESM(require_main(), 1);
var import_google_auth_library = __toESM(require_src5(), 1);
import { randomUUID } from "crypto";

// C:/Users/Mohammed Ahmed/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/sqlite.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_utils();
var DatabaseSync = /* @__PURE__ */ notImplementedClass("sqlite.DatabaseSync");

// server.js
import_dotenv.default.config();
var app = new Hono2();
app.use("*", cors());
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
var googleClient = new import_google_auth_library.OAuth2Client(GOOGLE_CLIENT_ID);
var CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
var CF_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
var CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
var isCloudflareConfigured = Boolean(CF_ACCOUNT_ID && CF_DATABASE_ID && CF_API_TOKEN);
var localDb = null;
if (!isCloudflareConfigured) {
  try {
    localDb = new DatabaseSync("data.sqlite");
    localDb.exec(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        userEmail TEXT NOT NULL,
        company TEXT,
        jobTitle TEXT,
        location TEXT,
        applyLink TEXT,
        resumeScore REAL,
        resumeUrl TEXT,
        status TEXT DEFAULT 'Applied',
        salary TEXT,
        email TEXT,
        phone TEXT,
        jdText TEXT,
        coverLetter TEXT DEFAULT 'No generated',
        whatsAppMessage TEXT DEFAULT 'No generated',
        emailMessage TEXT DEFAULT 'No generated',
        atsScore INTEGER,
        createdAt TEXT DEFAULT (datetime('now'))
      );
    `);
  } catch (e) {
  }
}
async function executeQuery(c, sql, params = []) {
  if (c.env?.DB) {
    const stmt = c.env.DB.prepare(sql).bind(...params);
    const isSelect = sql.trim().toUpperCase().startsWith("SELECT");
    if (isSelect) {
      const res = await stmt.all();
      return res.results || [];
    } else {
      await stmt.run();
      return [];
    }
  }
  if (isCloudflareConfigured) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql, params })
    });
    const data = await response.json();
    if (!data.success) {
      const errorMsg = data.errors?.[0]?.message || "Cloudflare D1 Query Failed";
      throw new Error(errorMsg);
    }
    return data.result[0]?.results || [];
  }
  if (localDb) {
    const isSelect = sql.trim().toUpperCase().startsWith("SELECT");
    const stmt = localDb.prepare(sql);
    if (isSelect) {
      return stmt.all(...params);
    } else {
      stmt.run(...params);
      return [];
    }
  }
  return [];
}
__name(executeQuery, "executeQuery");
app.get("/", (c) => {
  return c.json({
    status: "Backend running successfully \u{1F680}",
    database: c.env?.DB ? "Cloudflare D1 (Worker Binding)" : isCloudflareConfigured ? "Cloudflare D1 (REST API)" : "Local SQLite",
    storage: c.env?.R2_BUCKET ? "Cloudflare R2 (jobassistantpremium)" : "Local Storage"
  });
});
app.post("/api/upload-resume", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("resume");
    const userEmail = formData.get("userEmail") || "ahmed.mohammed8694@gmail.com";
    if (!file || typeof file === "string") {
      return c.json({ error: "No resume file provided" }, 400);
    }
    const filename = file.name || "resume.pdf";
    const fileKey = `resumes/${userEmail}/${randomUUID()}-${filename}`;
    const contentType = file.type || "application/pdf";
    const arrayBuffer = await file.arrayBuffer();
    if (c.env?.R2_BUCKET) {
      await c.env.R2_BUCKET.put(fileKey, arrayBuffer, {
        httpMetadata: { contentType }
      });
    }
    const fileUrl = `https://job-ai-backend.ahmed-mohammed8694.workers.dev/api/resume/${encodeURIComponent(fileKey)}`;
    return c.json({
      success: true,
      fileKey,
      fileUrl,
      fileName: filename,
      size: file.size
    });
  } catch (err) {
    console.error("Error uploading resume to R2:", err);
    return c.json({ error: "Failed to upload resume", details: err.message }, 500);
  }
});
app.get("/api/resume/:key{.+}", async (c) => {
  try {
    const key = c.req.param("key");
    if (!c.env?.R2_BUCKET) {
      return c.json({ error: "R2 bucket is not available in local mode" }, 400);
    }
    const object = await c.env.R2_BUCKET.get(key);
    if (!object) {
      return c.json({ error: "File not found in R2 bucket" }, 404);
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Content-Type", object.httpMetadata?.contentType || "application/pdf");
    headers.set("Content-Disposition", "inline");
    return new Response(object.body, { headers });
  } catch (err) {
    console.error("Error retrieving resume from R2:", err);
    return c.json({ error: "Failed to fetch resume" }, 500);
  }
});
app.post("/api/track", async (c) => {
  try {
    const body = await c.req.json();
    const {
      company,
      jobTitle,
      location,
      applyLink,
      resumeScore,
      resumeUrl,
      status,
      userEmail,
      salary,
      email,
      phone,
      jdText,
      coverLetter,
      whatsAppMessage,
      emailMessage,
      atsScore
    } = body;
    const ownerEmail = userEmail || "ahmed.mohammed8694@gmail.com";
    const appStatus = status || "Applied";
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const existing = await executeQuery(
      c,
      `SELECT id FROM applications WHERE userEmail = ? AND applyLink = ?`,
      [ownerEmail, applyLink]
    );
    if (existing && existing.length > 0) {
      const appId = existing[0].id;
      await executeQuery(
        c,
        `UPDATE applications SET 
           company = ?, jobTitle = ?, location = ?, resumeScore = ?, resumeUrl = ?, status = ?,
           salary = ?, email = ?, phone = ?, jdText = ?, coverLetter = ?, whatsAppMessage = ?, emailMessage = ?, atsScore = ?
         WHERE id = ?`,
        [
          company,
          jobTitle,
          location,
          resumeScore,
          resumeUrl || null,
          appStatus,
          salary || "Not Disclosed",
          email || "",
          phone || "",
          jdText || "",
          coverLetter || "No generated",
          whatsAppMessage || "No generated",
          emailMessage || "No generated",
          atsScore || resumeScore || 0,
          appId
        ]
      );
      return c.json({ success: true, id: appId, action: "updated" });
    } else {
      const id = randomUUID();
      await executeQuery(
        c,
        `INSERT INTO applications (id, userEmail, company, jobTitle, location, applyLink, resumeScore, resumeUrl, status, createdAt,
                                   salary, email, phone, jdText, coverLetter, whatsAppMessage, emailMessage, atsScore)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          ownerEmail,
          company,
          jobTitle,
          location,
          applyLink,
          resumeScore,
          resumeUrl || null,
          appStatus,
          createdAt,
          salary || "Not Disclosed",
          email || "",
          phone || "",
          jdText || "",
          coverLetter || "No generated",
          whatsAppMessage || "No generated",
          emailMessage || "No generated",
          atsScore || resumeScore || 0
        ]
      );
      return c.json({ success: true, id, action: "inserted" });
    }
  } catch (err) {
    console.error("Error saving application:", err);
    return c.json({ error: "Failed to save application" }, 500);
  }
});
app.get("/api/applications", async (c) => {
  try {
    const email = c.req.query("email") || "ahmed.mohammed8694@gmail.com";
    const apps = await executeQuery(
      c,
      `SELECT * FROM applications WHERE userEmail = ? ORDER BY createdAt DESC`,
      [email]
    );
    return c.json(apps);
  } catch (err) {
    console.error("Error fetching applications:", err);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});
app.put("/api/update-status/:id", async (c) => {
  try {
    const { status, userEmail } = await c.req.json();
    const id = c.req.param("id");
    const email = userEmail || "ahmed.mohammed8694@gmail.com";
    await executeQuery(
      c,
      `UPDATE applications SET status = ? WHERE id = ? AND userEmail = ?`,
      [status, id, email]
    );
    return c.json({ success: true });
  } catch (err) {
    console.error("Error updating status:", err);
    return c.json({ error: "Failed to update status" }, 500);
  }
});
app.post("/api/keys/save", async (c) => {
  try {
    const { ownerEmail, provider, apiKey, accountEmail, modelName } = await c.req.json();
    if (!ownerEmail || !provider || !apiKey) {
      return c.json({ error: "Missing required fields: ownerEmail, provider, apiKey" }, 400);
    }
    const existing = await executeQuery(
      c,
      `SELECT MAX(priority) as maxP FROM user_api_keys WHERE owner_email = ? AND provider = ?`,
      [ownerEmail, provider]
    );
    const nextPriority = (existing[0]?.maxP ?? -1) + 1;
    await executeQuery(
      c,
      `INSERT INTO user_api_keys (owner_email, provider, api_key, account_email, model_name, priority, is_active, fail_count)
       VALUES (?, ?, ?, ?, ?, ?, 1, 0)`,
      [ownerEmail, provider, apiKey, accountEmail || "", modelName || "", nextPriority]
    );
    return c.json({ success: true, message: `Saved ${provider} key (#${nextPriority}) for ${ownerEmail}` });
  } catch (err) {
    console.error("Error saving API key:", err);
    return c.json({ error: "Failed to save API key" }, 500);
  }
});
app.get("/api/keys/list", async (c) => {
  try {
    const ownerEmail = c.req.query("ownerEmail");
    const provider = c.req.query("provider");
    if (!ownerEmail) return c.json({ error: "ownerEmail query param required" }, 400);
    const sql = provider ? `SELECT id, provider, account_email, model_name, priority, is_active, fail_count, last_used FROM user_api_keys WHERE owner_email = ? AND provider = ? ORDER BY priority ASC` : `SELECT id, provider, account_email, model_name, priority, is_active, fail_count, last_used FROM user_api_keys WHERE owner_email = ? ORDER BY provider, priority ASC`;
    const params = provider ? [ownerEmail, provider] : [ownerEmail];
    const keys = await executeQuery(c, sql, params);
    return c.json(keys);
  } catch (err) {
    console.error("Error listing API keys:", err);
    return c.json({ error: "Failed to list API keys" }, 500);
  }
});
app.get("/api/keys/next", async (c) => {
  try {
    const ownerEmail = c.req.query("ownerEmail");
    const provider = c.req.query("provider");
    if (!ownerEmail || !provider) return c.json({ error: "ownerEmail and provider required" }, 400);
    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider]
    );
    if (!keys.length) return c.json({ error: "No active keys found for this provider" }, 404);
    return c.json(keys[0]);
  } catch (err) {
    console.error("Error getting next key:", err);
    return c.json({ error: "Failed to get next key" }, 500);
  }
});
app.post("/api/keys/rotate", async (c) => {
  try {
    const { keyId, ownerEmail, provider } = await c.req.json();
    if (!keyId || !ownerEmail || !provider) return c.json({ error: "keyId, ownerEmail, provider required" }, 400);
    await executeQuery(
      c,
      `UPDATE user_api_keys SET fail_count = fail_count + 1,
       is_active = CASE WHEN fail_count + 1 >= 3 THEN 0 ELSE 1 END
       WHERE id = ?`,
      [keyId]
    );
    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1 AND id != ?
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider, keyId]
    );
    if (!keys.length) return c.json({ error: "No more active keys for this provider" }, 404);
    return c.json({ success: true, nextKey: keys[0] });
  } catch (err) {
    console.error("Error rotating key:", err);
    return c.json({ error: "Failed to rotate key" }, 500);
  }
});
app.delete("/api/keys/delete/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const ownerEmail = c.req.query("ownerEmail");
    if (!ownerEmail) return c.json({ error: "ownerEmail required" }, 400);
    await executeQuery(
      c,
      `DELETE FROM user_api_keys WHERE id = ? AND owner_email = ?`,
      [id, ownerEmail]
    );
    return c.json({ success: true });
  } catch (err) {
    console.error("Error deleting key:", err);
    return c.json({ error: "Failed to delete key" }, 500);
  }
});
app.get("/api/keys/next", async (c) => {
  try {
    const ownerEmail = c.req.query("ownerEmail");
    const provider = c.req.query("provider");
    if (!ownerEmail || !provider) return c.json({ error: "ownerEmail and provider required" }, 400);
    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider]
    );
    if (!keys.length) return c.json({ error: "No active keys found for this provider" }, 404);
    return c.json(keys[0]);
  } catch (err) {
    console.error("Error getting next key:", err);
    return c.json({ error: "Failed to get next key" }, 500);
  }
});
app.post("/api/keys/rotate", async (c) => {
  try {
    const { keyId, ownerEmail, provider } = await c.req.json();
    if (!keyId || !ownerEmail || !provider) return c.json({ error: "keyId, ownerEmail, provider required" }, 400);
    await executeQuery(
      c,
      `UPDATE user_api_keys SET fail_count = fail_count + 1,
       is_active = CASE WHEN fail_count + 1 >= 3 THEN 0 ELSE 1 END
       WHERE id = ?`,
      [keyId]
    );
    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1 AND id != ?
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider, keyId]
    );
    if (!keys.length) return c.json({ error: "No more active keys for this provider" }, 404);
    return c.json({ success: true, nextKey: keys[0] });
  } catch (err) {
    console.error("Error rotating key:", err);
    return c.json({ error: "Failed to rotate key" }, 500);
  }
});
app.delete("/api/keys/delete/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const ownerEmail = c.req.query("ownerEmail");
    if (!ownerEmail) return c.json({ error: "ownerEmail required" }, 400);
    await executeQuery(
      c,
      `DELETE FROM user_api_keys WHERE id = ? AND owner_email = ?`,
      [id, ownerEmail]
    );
    return c.json({ success: true });
  } catch (err) {
    console.error("Error deleting key:", err);
    return c.json({ error: "Failed to delete key" }, 500);
  }
});
app.get("/dashboard", async (c) => {
  const email = c.req.query("email") || "ahmed.mohammed8694@gmail.com";
  try {
    const apps = await executeQuery(
      c,
      `SELECT * FROM applications WHERE userEmail = ? ORDER BY createdAt DESC`,
      [email]
    );
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-gradient: radial-gradient(circle at 10% 20%, #0d1117 0%, #161b22 90%);
      --card-bg: rgba(22, 27, 34, 0.6);
      --card-border: rgba(48, 54, 61, 0.5);
      --glass-glow: rgba(56, 139, 253, 0.1);
      --text-main: #e6edf3;
      --text-muted: #8b949e;
      --accent-color: #58a6ff;
      --accent-green: #3fb950;
      --accent-purple: #bc8cff;
      --accent-red: #f85149;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      background: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    header {
      backdrop-filter: blur(12px);
      background: rgba(13, 17, 23, 0.7);
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 24px;
      font-weight: 800;
      background: linear-gradient(135deg, #58a6ff, #bc8cff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-info {
      font-size: 14px;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.03);
      padding: 8px 16px;
      border-radius: 99px;
      border: 1px solid var(--card-border);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-info strong {
      color: var(--accent-color);
    }

    main {
      flex: 1;
      max-width: 1500px;
      width: 95%;
      margin: 32px auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, border-color 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      border-color: rgba(88, 166, 255, 0.4);
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at top left, var(--glass-glow), transparent 60%);
      pointer-events: none;
    }

    .stat-label {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-main);
    }

    .stat-value.green { color: var(--accent-green); }
    .stat-value.purple { color: var(--accent-purple); }
    .stat-value.blue { color: var(--accent-color); }

    /* Filters Bar */
    .filters-bar {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      background: rgba(22, 27, 34, 0.4);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
      align-items: center;
    }

    .search-wrapper {
      flex: 1;
      min-width: 280px;
      position: relative;
    }

    .search-wrapper input {
      width: 100%;
      padding: 12px 16px 12px 40px;
      background: #0d1117;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-wrapper input:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.15);
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }

    .select-wrapper select {
      padding: 12px 24px;
      background: #0d1117;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 14px;
      outline: none;
      cursor: pointer;
      min-width: 160px;
    }

    /* Applications Table / Cards */
    .table-container {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }

    th {
      background: rgba(13, 17, 23, 0.6);
      padding: 16px 20px;
      font-weight: 600;
      color: var(--text-muted);
      border-bottom: 1px solid var(--card-border);
    }

    td {
      padding: 16px 20px;
      border-bottom: 1px solid var(--card-border);
      color: var(--text-main);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr.app-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    tr.app-row:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }

    .role-title {
      font-weight: 600;
      color: #fff;
    }

    .company-name {
      color: var(--text-muted);
      font-size: 13px;
      margin-top: 2px;
    }

    /* Status Badges */
    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-badge.applied { background: rgba(56, 139, 253, 0.15); color: var(--accent-color); border: 1px solid rgba(88, 166, 255, 0.3); }
    .status-badge.interviewing { background: rgba(188, 140, 255, 0.15); color: var(--accent-purple); border: 1px solid rgba(188, 140, 255, 0.3); }
    .status-badge.offered { background: rgba(63, 185, 80, 0.15); color: var(--accent-green); border: 1px solid rgba(63, 185, 80, 0.3); }
    .status-badge.rejected { background: rgba(248, 81, 73, 0.15); color: var(--accent-red); border: 1px solid rgba(248, 81, 73, 0.3); }

    .company-name-col {
      font-weight: 600;
      color: var(--accent-color);
    }

    .status-select-inline {
      border: 1px solid rgba(255,255,255,0.15) !important;
      background-color: rgba(13, 17, 23, 0.9) !important;
      border-radius: 99px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
    }
    .status-select-inline.applied { color: var(--accent-color) !important; border-color: rgba(88, 166, 255, 0.4) !important; background: rgba(56, 139, 253, 0.08) !important; }
    .status-select-inline.interviewing { color: var(--accent-purple) !important; border-color: rgba(188, 140, 255, 0.4) !important; background: rgba(188, 140, 255, 0.08) !important; }
    .status-select-inline.offered { color: var(--accent-green) !important; border-color: rgba(63, 185, 80, 0.4) !important; background: rgba(63, 185, 80, 0.08) !important; }
    .status-select-inline.rejected { color: var(--accent-red) !important; border-color: rgba(248, 81, 73, 0.4) !important; background: rgba(248, 81, 73, 0.08) !important; }
    .status-select-inline option { background: #161b22 !important; color: #fff !important; }

    .action-buttons-group {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    
    .action-circle-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s, border-color 0.2s, transform 0.1s;
      font-size: 12px;
    }

    .action-circle-btn:hover {
      background: rgba(88, 166, 255, 0.15);
      border-color: var(--accent-color);
      transform: scale(1.08);
    }

    .action-circle-btn.disabled {
      opacity: 0.25;
      cursor: not-allowed;
      filter: grayscale(1);
      pointer-events: none;
    }

    .ats-score {
      font-weight: 700;
      color: var(--accent-purple);
    }

    .no-data {
      padding: 48px;
      text-align: center;
      color: var(--text-muted);
    }

    /* Modal Styling */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: #0d1117;
      border: 1px solid var(--card-border);
      border-radius: 20px;
      width: 950px;
      max-width: 95%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8);
      position: relative;
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .modal-title-wrapper h2 {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }

    .modal-title-wrapper p {
      color: var(--text-muted);
      font-size: 13px;
      margin-top: 4px;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 20px;
      cursor: pointer;
      outline: none;
    }

    .close-btn:hover {
      color: #fff;
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .details-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .detail-item {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 12px;
    }

    .detail-item label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 4px;
    }

    .detail-item span, .detail-item a {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-main);
      text-decoration: none;
    }

    .detail-item a {
      color: var(--accent-color);
    }
    .detail-item a:hover {
      text-decoration: underline;
    }

    .jd-box {
      border: 1px solid var(--card-border);
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
      padding: 16px;
      max-height: 180px;
      overflow-y: auto;
      font-size: 13px;
      line-height: 1.5;
      color: var(--text-muted);
      white-space: pre-wrap;
    }

    /* Tabs inside Modal */
    .tabs-nav {
      display: flex;
      border-bottom: 1px solid var(--card-border);
      margin-top: 10px;
    }

    .tab-btn {
      padding: 12px 20px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      outline: none;
    }

    .tab-btn.active {
      color: var(--accent-color);
      border-bottom-color: var(--accent-color);
    }

    .tab-content {
      display: none;
      padding-top: 16px;
      position: relative;
    }

    .tab-content.active {
      display: block;
    }

    .template-box {
      width: 100%;
      height: 200px;
      padding: 12px;
      background: #161b22;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 13px;
      line-height: 1.45;
      outline: none;
      resize: none;
    }

    .copy-btn {
      position: absolute;
      right: 12px;
      top: 28px;
      background: var(--accent-color);
      color: #0d1117;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .copy-btn:hover {
      opacity: 0.9;
    }

    .status-select {
      background: #161b22;
      border: 1px solid var(--card-border);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      outline: none;
      cursor: pointer;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .details-row {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">\u{1F4CB} Job Applications Dashboard</div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <div class="user-info">
        \u{1F464} User: <strong id="userEmailHeader">${email}</strong>
      </div>
      <button id="exportCsvBtn" style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:linear-gradient(135deg, #238636, #2ea043); color:#fff; border:none; border-radius:99px; font-weight:600; cursor:pointer; font-size:13.5px; transition:transform 0.1s, opacity 0.2s; box-shadow: 0 4px 12px rgba(46,160,67,0.25);" onmouseover="this.style.opacity='0.9'; this.style.transform='scale(1.02)';" onmouseout="this.style.opacity='1'; this.style.transform='scale(1)';" onclick="downloadCSV()">
        \u{1F4E5} Export CSV
      </button>
    </div>
  </header>

  <main>
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Applications</div>
        <div class="stat-value blue" id="totalCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Interviewing</div>
        <div class="stat-value purple" id="interviewCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg ATS Score</div>
        <div class="stat-value green" id="avgAts">0%</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="search-wrapper" style="flex: 2; min-width: 250px;">
        <span class="search-icon">\u{1F50D}</span>
        <input type="text" id="searchInput" placeholder="Search by role, company, or location...">
      </div>
      
      <div class="select-wrapper">
        <select id="roleFilter">
          <option value="all">All Roles</option>
        </select>
      </div>

      <div class="select-wrapper">
        <select id="companyFilter">
          <option value="all">All Companies</option>
        </select>
      </div>

      <div class="select-wrapper">
        <select id="statusFilter">
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div class="search-wrapper" style="flex: 1; min-width: 150px;">
        <input type="text" id="salaryFilterInput" placeholder="Min Salary (e.g. 50k)..." style="padding-left: 14px;">
      </div>

      <div style="display: flex; gap: 8px; align-items: center; background: #0d1117; border: 1px solid var(--card-border); border-radius: 8px; padding: 6px 12px; flex-wrap: wrap;">
        <span style="font-size: 12px; color: var(--text-muted);">From:</span>
        <input type="date" id="startDateFilter" style="background:transparent; border:none; color:var(--text-main); font-size:12.5px; outline:none; cursor:pointer;">
        <span style="font-size: 12px; color: var(--text-muted);">To:</span>
        <input type="date" id="endDateFilter" style="background:transparent; border:none; color:var(--text-main); font-size:12.5px; outline:none; cursor:pointer;">
      </div>
      
      <button id="resetFiltersBtn" style="display:flex; align-items:center; gap:6px; padding:10px 16px; background:#21262d; border:1px solid var(--card-border); color:#c9d1d9; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:background 0.2s, color 0.2s;" onmouseover="this.style.background='#30363d'; this.style.color='#fff';" onmouseout="this.style.background='#21262d'; this.style.color='#c9d1d9';" onclick="resetFilters()">
        \u{1F504} Reset Filters
      </button>
    </div>

    <!-- Table -->
    <div class="table-container">
      <table id="appsTable">
        <thead>
          <tr>
            <th>Role</th>
            <th>Company</th>
            <th>Portal</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Email ID</th>
            <th>Phone Number</th>
            <th>ATS Score</th>
            <th>Apply Date</th>
            <th>Status</th>
            <th>Templates & Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <!-- Rows dynamically inserted -->
        </tbody>
      </table>
    </div>
  </main>

  <!-- Job Details Modal -->
  <div class="modal-overlay" id="detailsModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title-wrapper">
          <h2 id="modalRole">Software Engineer</h2>
          <p id="modalCompany">Google</p>
        </div>
        <button class="close-btn" id="closeModal">\u2716</button>
      </div>
      
      <div class="modal-body">
        <!-- Status Changer -->
        <div class="detail-item" style="display:flex; justify-content:space-between; align-items:center;">
          <label style="margin-bottom:0;">Change Status:</label>
          <select id="modalStatusSelect" class="status-select">
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <!-- Info Grid -->
        <div class="details-row">
          <div class="detail-item">
            <label>Location</label>
            <span id="modalLoc">Hyderabad, India</span>
          </div>
          <div class="detail-item">
            <label>Salary</label>
            <span id="modalSal">Not Disclosed</span>
          </div>
          <div class="detail-item">
            <label>HR Email</label>
            <span id="modalHrEmail">hr@company.com</span>
          </div>
          <div class="detail-item">
            <label>HR Phone</label>
            <span id="modalHrPhone">N/A</span>
          </div>
          <div class="detail-item">
            <label>Job Portal Link</label>
            <a href="#" target="_blank" id="modalPortalLink">Open Link \u2197</a>
          </div>
          <div class="detail-item">
            <label>Apply Portal</label>
            <span id="modalPortalName">N/A</span>
          </div>
          <div class="detail-item">
            <label>Resume Used</label>
            <a href="#" target="_blank" id="modalResumeLink">View Resume \u2197</a>
          </div>
        </div>

        <!-- Job Description -->
        <div>
          <h4 style="margin-bottom:8px; font-size:12px; color:var(--text-muted);">JOB DESCRIPTION</h4>
          <div class="jd-box" id="modalJd">Loading...</div>
        </div>

        <!-- Dynamic Message Tabs -->
        <div>
          <h4 style="margin-bottom:8px; font-size:12px; color:var(--text-muted);">GENERATED TEMPLATES</h4>
          <div class="tabs-nav">
            <button class="tab-btn active" data-target="emailTab">\u2709\uFE0F Email Message</button>
            <button class="tab-btn" data-target="waTab">\u{1F4AC} WhatsApp</button>
            <button class="tab-btn" data-target="coverTab">\u{1F4C4} Cover Letter</button>
          </div>

          <div class="tab-content active" id="emailTab">
            <button class="copy-btn" onclick="copyTemplate('emailText')">\u{1F4CB} Copy</button>
            <textarea class="template-box" id="emailText" readonly></textarea>
          </div>
          <div class="tab-content" id="waTab">
            <button class="copy-btn" onclick="copyTemplate('waText')">\u{1F4CB} Copy</button>
            <textarea class="template-box" id="waText" readonly></textarea>
          </div>
          <div class="tab-content" id="coverTab">
            <button class="copy-btn" onclick="copyTemplate('coverText')">\u{1F4CB} Copy</button>
            <textarea class="template-box" id="coverText" readonly></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const userApplications = ${JSON.stringify(apps)};
    let activeAppId = null;

    function getPortalName(url) {
      if (!url) return "Company Website";
      try {
        const hostname = new URL(url).hostname.toLowerCase();
        const parts = hostname.split('.');
        let mainDomain = parts[parts.length - 2];
        if (parts.length >= 3 && (parts[parts.length - 2] === "co" || parts[parts.length - 2] === "com" || parts[parts.length - 2] === "org" || parts[parts.length - 2] === "net")) {
          mainDomain = parts[parts.length - 3];
        }
        if (!mainDomain) return "Direct";
        
        const map = {
          "linkedin": "LinkedIn",
          "indeed": "Indeed",
          "naukri": "Naukri",
          "glassdoor": "Glassdoor",
          "wellfound": "Wellfound",
          "ziprecruiter": "ZipRecruiter",
          "monster": "Monster",
          "simplyhired": "SimplyHired",
          "careerbuilder": "CareerBuilder",
          "naukriyg": "Naukri",
          "naukrirecruiter": "Naukri Recruiter",
          "foundit": "FoundIt",
          "hirist": "Hirist",
          "internshala": "Internshala",
          "shine": "Shine",
          "upwork": "Upwork",
          "fiverr": "Fiverr",
          "github": "GitHub",
          "instahyre": "Instahyre",
          "timesjobs": "TimesJobs"
        };
        return map[mainDomain] || mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
      } catch (e) {
        return "Company Website";
      }
    }

    // Populate filter dropdowns dynamically
    let dropdownsPopulated = false;
    function populateFilterDropdowns() {
      if (dropdownsPopulated) return;
      const roles = new Set();
      const companies = new Set();
      userApplications.forEach(app => {
        if (app.jobTitle) roles.add(app.jobTitle.trim());
        if (app.company) companies.add(app.company.trim());
      });

      const roleSelect = document.getElementById("roleFilter");
      Array.from(roles).sort().forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.toLowerCase();
        opt.textContent = r;
        roleSelect.appendChild(opt);
      });

      const companySelect = document.getElementById("companyFilter");
      Array.from(companies).sort().forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.toLowerCase();
        opt.textContent = c;
        companySelect.appendChild(opt);
      });
      dropdownsPopulated = true;
    }

    function downloadCSV() {
      const search = document.getElementById("searchInput").value.toLowerCase();
      const roleFilter = document.getElementById("roleFilter").value;
      const companyFilter = document.getElementById("companyFilter").value;
      const statusFilter = document.getElementById("statusFilter").value;
      const salaryFilter = document.getElementById("salaryFilterInput").value.toLowerCase();
      const startDateVal = document.getElementById("startDateFilter").value;
      const endDateVal = document.getElementById("endDateFilter").value;

      const filtered = userApplications.filter(app => {
        const title = (app.jobTitle || "").toLowerCase();
        const company = (app.company || "").toLowerCase();
        const loc = (app.location || "").toLowerCase();
        
        const matchesSearch = title.includes(search) || company.includes(search) || loc.includes(search);
        if (!matchesSearch) return false;

        if (roleFilter !== "all" && title !== roleFilter) return false;
        if (companyFilter !== "all" && company !== companyFilter) return false;
        if (statusFilter !== "all" && (app.status || "").toLowerCase() !== statusFilter) return false;
        if (salaryFilter) {
          const salText = (app.salary || "").toLowerCase();
          if (!salText.includes(salaryFilter)) return false;
        }

        if (app.createdAt) {
          const appDate = new Date(app.createdAt);
          if (startDateVal) {
            const start = new Date(startDateVal);
            start.setHours(0,0,0,0);
            if (appDate < start) return false;
          }
          if (endDateVal) {
            const end = new Date(endDateVal);
            end.setHours(23,59,59,999);
            if (appDate > end) return false;
          }
        }
        return true;
      });

      if (filtered.length === 0) {
        alert("\u26A0\uFE0F No job applications found to export matching the current filters!");
        return;
      }

      const headers = [
        "Job ID",
        "Role",
        "Company",
        "Portal",
        "Location",
        "Salary",
        "HR Email",
        "HR Phone",
        "ATS Score %",
        "Apply Date",
        "Status",
        "Apply Link",
        "Resume URL",
        "WhatsApp Template",
        "Email Template",
        "Cover Letter Template",
        "Job Description"
      ];

      const csvRows = [headers.map(h => '"' + h.replace(/"/g, '""') + '"').join(",")];

      filtered.forEach(app => {
        let dateStr = "N/A";
        if (app.createdAt) {
          try {
            const parsed = new Date(app.createdAt);
            if (!isNaN(parsed.getTime())) {
              dateStr = parsed.toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              });
            }
          } catch (e) {}
        }
        
        const row = [
          app.id || "",
          app.jobTitle || "",
          app.company || "",
          getPortalName(app.applyLink),
          app.location || "",
          app.salary || "",
          app.email || "",
          app.phone || "",
          (app.atsScore || app.resumeScore || 0) + "%",
          dateStr,
          app.status || "Applied",
          app.applyLink || "",
          app.resumeUrl || "",
          app.whatsAppMessage || "",
          app.emailMessage || "",
          app.coverLetter || "",
          app.jdText || ""
        ];
        
        csvRows.push(row.map(val => '"' + String(val).replace(/"/g, '""') + '"').join(","));
      });

      const csvContent = "\uFEFF" + csvRows.join("\r
");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      const sanitizedEmail = "${email}".replace(/[^a-zA-Z0-9]/g, "_");
      link.href = url;
      link.download = 'job_applications_' + sanitizedEmail + '_' + new Date().toISOString().slice(0, 10) + '.csv';
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function resetFilters() {
      document.getElementById("searchInput").value = "";
      document.getElementById("roleFilter").value = "all";
      document.getElementById("companyFilter").value = "all";
      document.getElementById("statusFilter").value = "all";
      document.getElementById("salaryFilterInput").value = "";
      document.getElementById("startDateFilter").value = "";
      document.getElementById("endDateFilter").value = "";
      renderDashboard();
    }

    function copyDirect(appId, field) {
      const app = userApplications.find(a => a.id === appId);
      if (!app) return;
      const text = app[field];
      if (!text || text === "No generated") {
        alert("\u26A0\uFE0F No template generated for this option yet.");
        return;
      }
      
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("\u{1F4CB} Copied to clipboard!");
    }

    async function updateAppStatusFromRow(appId, newStatus) {
      try {
        const res = await fetch(\`/api/update-status/\${appId}\`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, userEmail: "${email}" })
        });
        if (res.ok) {
          // Update local state
          const app = userApplications.find(a => a.id === appId);
          if (app) {
            app.status = newStatus;
            renderDashboard();
          }
        }
      } catch (err) {
        console.error("Failed to update status from row:", err);
      }
    }

    // Load Stats and Table
    function renderDashboard() {
      populateFilterDropdowns();

      const tbody = document.getElementById("tableBody");
      const search = document.getElementById("searchInput").value.toLowerCase();
      const roleFilter = document.getElementById("roleFilter").value;
      const companyFilter = document.getElementById("companyFilter").value;
      const statusFilter = document.getElementById("statusFilter").value;
      const salaryFilter = document.getElementById("salaryFilterInput").value.toLowerCase();
      const startDateVal = document.getElementById("startDateFilter").value;
      const endDateVal = document.getElementById("endDateFilter").value;

      tbody.innerHTML = "";

      let filtered = userApplications.filter(app => {
        const title = (app.jobTitle || "").toLowerCase();
        const company = (app.company || "").toLowerCase();
        const loc = (app.location || "").toLowerCase();
        
        // 1. General Search
        const matchesSearch = title.includes(search) || company.includes(search) || loc.includes(search);
        if (!matchesSearch) return false;

        // 2. Role Filter
        if (roleFilter !== "all" && title !== roleFilter) return false;

        // 3. Company Filter
        if (companyFilter !== "all" && company !== companyFilter) return false;

        // 4. Status Filter
        if (statusFilter !== "all" && (app.status || "").toLowerCase() !== statusFilter) return false;

        // 5. Salary Filter
        if (salaryFilter) {
          const salText = (app.salary || "").toLowerCase();
          if (!salText.includes(salaryFilter)) return false;
        }

        // 6. Date Range Filter
        if (startDateVal || endDateVal) {
          if (!app.createdAt) return false;
          const appDate = new Date(app.createdAt);
          if (isNaN(appDate.getTime())) return false;
          
          if (startDateVal) {
            const start = new Date(startDateVal);
            start.setHours(0,0,0,0);
            if (appDate < start) return false;
          }
          if (endDateVal) {
            const end = new Date(endDateVal);
            end.setHours(23,59,59,999);
            if (appDate > end) return false;
          }
        }

        return true;
      });

      // Update counters
      document.getElementById("totalCount").textContent = userApplications.length;
      document.getElementById("interviewCount").textContent = userApplications.filter(a => (a.status || "").toLowerCase() === "interviewing").length;
      
      const scores = userApplications.map(a => Number(a.atsScore || a.resumeScore || 0)).filter(s => s > 0);
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      document.getElementById("avgAts").textContent = avg + "%";

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="no-data">\u{1F50D} No applications match your filter.</td></tr>';
        return;
      }

      filtered.forEach(app => {
        const row = document.createElement("tr");
        row.className = "app-row";
        
        let date = "N/A";
        if (app.createdAt) {
          try {
            const parsedDate = new Date(app.createdAt);
            if (!isNaN(parsedDate.getTime())) {
              date = parsedDate.toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              });
            }
          } catch (e) {
            console.error("Error parsing row date:", e);
          }
        }

        const statusClass = (app.status || "Applied").toLowerCase();

        row.innerHTML = \`
          <td><div class="role-title">\${app.jobTitle || "N/A"}</div></td>
          <td><div class="company-name-col">\${app.company || "N/A"}</div></td>
          <td style="font-weight: 500; color: #58a6ff;">\${getPortalName(app.applyLink)}</td>
          <td>\${app.location || "N/A"}</td>
          <td>\${app.salary || "Not Disclosed"}</td>
          <td>\${app.email || "N/A"}</td>
          <td>\${app.phone || "N/A"}</td>
          <td class="ats-score">\${app.atsScore || app.resumeScore || 0}%</td>
          <td style="color: var(--text-muted);">\${date}</td>
          <td>
            <select class="status-select-inline \${statusClass}" onclick="event.stopPropagation();" onchange="event.stopPropagation(); updateAppStatusFromRow('\${app.id}', this.value)">
              <option value="Applied" \${app.status === "Applied" ? "selected" : ""}>Applied</option>
              <option value="Interviewing" \${app.status === "Interviewing" ? "selected" : ""}>Interviewing</option>
              <option value="Offered" \${app.status === "Offered" ? "selected" : ""}>Offered</option>
              <option value="Rejected" \${app.status === "Rejected" ? "selected" : ""}>Rejected</option>
            </select>
          </td>
          <td class="action-cell">
            <div class="action-buttons-group" onclick="event.stopPropagation();">
              <button class="action-circle-btn" onclick="openDetailsModalDirect('\${app.id}')" title="View Job Details">
                \u{1F441}\uFE0F
              </button>

              \${app.applyLink ? \`<a href="\${app.applyLink}" target="_blank" class="action-circle-btn" title="Open Job Post">\u{1F517}</a>\` : ''}
              
              <button class="action-circle-btn \${app.whatsAppMessage && app.whatsAppMessage !== 'No generated' ? 'active' : 'disabled'}" 
                      onclick="copyDirect('\${app.id}', 'whatsAppMessage')" 
                      title="\${app.whatsAppMessage && app.whatsAppMessage !== 'No generated' ? 'Copy WhatsApp Message' : 'No WhatsApp message generated'}">
                \u{1F4AC}
              </button>

              <button class="action-circle-btn \${app.emailMessage && app.emailMessage !== 'No generated' ? 'active' : 'disabled'}" 
                      onclick="copyDirect('\${app.id}', 'emailMessage')" 
                      title="\${app.emailMessage && app.emailMessage !== 'No generated' ? 'Copy Email Message' : 'No Email generated'}">
                \u2709\uFE0F
              </button>

              <button class="action-circle-btn \${app.coverLetter && app.coverLetter !== 'No generated' ? 'active' : 'disabled'}" 
                      onclick="copyDirect('\${app.id}', 'coverLetter')" 
                      title="\${app.coverLetter && app.coverLetter !== 'No generated' ? 'Copy Cover Letter' : 'No Cover Letter generated'}">
                \u{1F4C4}
              </button>
            </div>
          </td>
        \`;

        row.onclick = () => openDetailsModal(app);
        tbody.appendChild(row);
      });
    }

    function openDetailsModalDirect(appId) {
      const app = userApplications.find(a => a.id === appId);
      if (app) openDetailsModal(app);
    }

    function openDetailsModal(app) {
      activeAppId = app.id;
      document.getElementById("modalRole").textContent = app.jobTitle || "N/A";
      document.getElementById("modalCompany").textContent = app.company || "N/A";
      document.getElementById("modalLoc").textContent = app.location || "N/A";
      document.getElementById("modalSal").textContent = app.salary || "Not Disclosed";
      document.getElementById("modalHrEmail").textContent = app.email || "N/A";
      document.getElementById("modalHrPhone").textContent = app.phone || "N/A";
      document.getElementById("modalPortalName").textContent = getPortalName(app.applyLink);
      document.getElementById("modalJd").textContent = app.jdText || "No job description text logged.";
      
      const statusSelect = document.getElementById("modalStatusSelect");
      statusSelect.value = app.status || "Applied";

      // Links
      const portal = document.getElementById("modalPortalLink");
      if (app.applyLink) { portal.href = app.applyLink; portal.style.display = "inline"; }
      else portal.style.display = "none";

      const resume = document.getElementById("modalResumeLink");
      if (app.resumeUrl) { resume.href = app.resumeUrl; resume.style.display = "inline"; }
      else resume.style.display = "none";

      // Messages
      document.getElementById("emailText").value = app.emailMessage || "No generated";
      document.getElementById("waText").value = app.whatsAppMessage || "No generated";
      document.getElementById("coverText").value = app.coverLetter || "No generated";

      // Reset Tabs
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      document.querySelector(".tab-btn[data-target='emailTab']").classList.add("active");
      document.getElementById("emailTab").classList.add("active");

      document.getElementById("detailsModal").style.display = "flex";
    }

    function closeDetailsModal() {
      document.getElementById("detailsModal").style.display = "none";
      activeAppId = null;
    }

    async function updateAppStatus(newStatus) {
      if (!activeAppId) return;
      try {
        const res = await fetch(\`/api/update-status/\${activeAppId}\`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, userEmail: "${email}" })
        });
        if (res.ok) {
          // Update local state
          const app = userApplications.find(a => a.id === activeAppId);
          if (app) {
            app.status = newStatus;
            renderDashboard();
          }
        }
      } catch (err) {
        console.error("Failed to update status on server:", err);
      }
    }

    function copyTemplate(elemId) {
      const txt = document.getElementById(elemId);
      txt.select();
      document.execCommand("copy");
      alert("\u{1F4CB} Copied to clipboard!");
    }

    // Bind Listeners
    document.getElementById("searchInput").oninput = renderDashboard;
    document.getElementById("roleFilter").onchange = renderDashboard;
    document.getElementById("companyFilter").onchange = renderDashboard;
    document.getElementById("statusFilter").onchange = renderDashboard;
    document.getElementById("salaryFilterInput").oninput = renderDashboard;
    document.getElementById("startDateFilter").onchange = renderDashboard;
    document.getElementById("endDateFilter").onchange = renderDashboard;
    document.getElementById("closeModal").onclick = closeDetailsModal;
    
    document.getElementById("modalStatusSelect").onchange = function() {
      updateAppStatus(this.value);
    };

    // Tabs logic
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.onclick = function() {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        
        this.classList.add("active");
        document.getElementById(this.dataset.target).classList.add("active");
      };
    });

    // Close on overlay click
    window.onclick = function(e) {
      const overlay = document.getElementById("detailsModal");
      if (e.target === overlay) closeDetailsModal();
    };

    // Initial Load
    renderDashboard();
  <\/script>
</body>
</html>`;
    return c.html(html);
  } catch (err) {
    return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Database Error</title>
  <style>
    body { background: #0d1117; color: #c9d1d9; font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 30px; max-width: 500px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: center; }
    h2 { color: #f85149; margin-top: 0; }
    p { color: #8b949e; line-height: 1.6; }
    code { background: #21262d; padding: 3px 6px; border-radius: 4px; color: #ff7b72; font-family: monospace; font-size: 13px; word-break: break-all; }
  </style>
</head>
<body>
  <div class="card">
    <h2>\u26A0\uFE0F Database Query Error</h2>
    <p>We encountered an error querying the database:</p>
    <p><code>${err.message || err}</code></p>
    <p style="margin-top: 20px;">Please ensure you have initialized your database schema and migrated any updates by running the migration commands in your terminal:</p>
    <div style="background: #21262d; border: 1px solid #30363d; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 12px; color: #79c0ff; text-align: left; overflow-x: auto;">
      npx wrangler d1 execute job-ai-db --file=./update_schema.sql --remote
    </div>
  </div>
</body>
</html>`);
  }
});
if (false) {
  const port = Number(process.env.PORT) || 5e3;
  console.log(`\u{1F680} Hono Backend Server listening on http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port
  });
}
var server_default = app;
export {
  server_default as default
};
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=server.js.map
