var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { gk as We, l3 as Me, __tla as __tla_0 } from "./index-PYUvsYeK.js";
import { B as E } from "./box3d-body-C92PeR_H.js";
let ze, Ve, Le, qe;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  async function ke(u = {}) {
    var _a, _b, _c;
    var _ = u, a = !!globalThis.window, n = !!globalThis.WorkerGlobalScope, r = ((_b = (_a = globalThis.process) == null ? void 0 : _a.versions) == null ? void 0 : _b.node) && ((_c = globalThis.process) == null ? void 0 : _c.type) != "renderer";
    if (r) {
      const { createRequire: e } = await We(() => import("./__vite-browser-external-BIHI7g3E.js"), [], import.meta.url);
      var i = e(import.meta.url);
    }
    var c = (e, t) => {
      throw t;
    }, v = import.meta.url, d = "";
    function A(e) {
      return _.locateFile ? _.locateFile(e, d) : d + e;
    }
    var R, f;
    if (r) {
      var P = i("node:fs");
      v.startsWith("file:") && (d = i("node:path").dirname(i("node:url").fileURLToPath(v)) + "/"), f = (e) => {
        e = k(e) ? new URL(e) : e;
        var t = P.readFileSync(e);
        return t;
      }, R = async (e, t = true) => {
        e = k(e) ? new URL(e) : e;
        var s = P.readFileSync(e, t ? void 0 : "utf8");
        return s;
      }, process.argv.length > 1 && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), c = (e, t) => {
        throw process.exitCode = e, t;
      };
    } else if (a || n) {
      try {
        d = new URL(".", v).href;
      } catch {
      }
      n && (f = (e) => {
        var t = new XMLHttpRequest();
        return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
      }), R = async (e) => {
        var t = await fetch(e, {
          credentials: "same-origin"
        });
        if (t.ok) return t.arrayBuffer();
        throw new Error(t.status + " : " + t.url);
      };
    }
    var M = console.log.bind(console), y = console.error.bind(console), x, T = false, F, k = (e) => e.startsWith("file://");
    function ee() {
      return C.buffer;
    }
    function L() {
      var _a2;
      if (!((_a2 = z == null ? void 0 : z.buffer) == null ? void 0 : _a2.resizable)) {
        var e = ee();
        z = new Int8Array(e), _.HEAPU8 = H = new Uint8Array(e), _.HEAP32 = new Int32Array(e), B = new Uint32Array(e), _.HEAPF32 = new Float32Array(e), Y = new BigInt64Array(e);
      }
    }
    function _e() {
      var e = _.preRun;
      e && (typeof e == "function" && (e = [
        e
      ]), O.push(...e)), q(O);
    }
    function te() {
      S.j();
    }
    function ae() {
      var e = _.postRun;
      e && (typeof e == "function" && (e = [
        e
      ]), V.push(...e)), q(V);
    }
    function N(e) {
      var _a2;
      (_a2 = _.onAbort) == null ? void 0 : _a2.call(_, e), e = `Aborted(${e})`, y(e), T = true, e += ". Build with -sASSERTIONS for more info.";
      var t = new WebAssembly.RuntimeError(e);
      throw t;
    }
    var j;
    function ie() {
      return _.locateFile ? A("box3d.wasm") : new URL("" + new URL("box3d-CUqArWR4.wasm", import.meta.url).href, import.meta.url).href;
    }
    function re(e) {
      if (f) return f(e);
      throw "both async and sync fetching of the wasm failed";
    }
    async function ne(e) {
      try {
        var t = await R(e);
        return new Uint8Array(t);
      } catch {
      }
      return re(e);
    }
    async function se(e, t) {
      try {
        var s = await ne(e), b = await WebAssembly.instantiate(s, t);
        return b;
      } catch (h) {
        y(`failed to asynchronously prepare wasm: ${h}`), N(h);
      }
    }
    async function le(e, t, s) {
      if (!r) try {
        var b = fetch(t, {
          credentials: "same-origin"
        }), h = await WebAssembly.instantiateStreaming(b, s);
        return h;
      } catch (o) {
        y(`wasm streaming compile failed: ${o}`), y("falling back to ArrayBuffer instantiation");
      }
      return se(t, s);
    }
    function he() {
      var e = {
        a: Ue
      };
      return e;
    }
    async function be() {
      function e(l) {
        return S = l.exports, Ie(S), L(), S;
      }
      function t(l) {
        return e(l.instance);
      }
      var s = he(), b = _.instantiateWasm;
      if (b) return new Promise((l) => {
        b(s, (w) => l(e(w)));
      });
      j ?? (j = ie());
      var h = await le(x, j, s), o = t(h);
      return o;
    }
    class D {
      constructor(t) {
        __publicField(this, "name", "ExitStatus");
        this.message = `Program terminated with exit(${t})`, this.status = t;
      }
    }
    var z, q = (e) => {
      for (; e.length > 0; ) e.shift()(_);
    }, V = [], O = [], I = true, oe = () => N(""), $ = 0, ce = () => {
      I = false, $ = 0;
    }, p = {}, G = (e) => {
      if (e instanceof D || e == "unwind") return F;
      c(1, e);
    }, J = () => I || $ > 0, K = (e) => {
      var _a2;
      F = e, J() || ((_a2 = _.onExit) == null ? void 0 : _a2.call(_, e), T = true), c(e, new D(e));
    }, de = (e, t) => {
      F = e, K(e);
    }, ue = de, we = () => {
      if (!J()) try {
        ue(F);
      } catch (e) {
        G(e);
      }
    }, ve = (e) => {
      if (!T) try {
        return e();
      } catch (t) {
        G(t);
      } finally {
        we();
      }
    }, U = () => performance.now(), fe = (e, t) => {
      if (p[e] && (clearTimeout(p[e].id), delete p[e]), !t) return 0;
      var s = setTimeout(() => {
        delete p[e], ve(() => Q(e, U()));
      }, t);
      return p[e] = {
        id: s,
        timeout_ms: t
      }, 0;
    }, ye = () => Date.now(), me = (e) => e >= 0 && e <= 3, Y;
    function ge(e, t, s) {
      if (!me(e)) return 28;
      var b;
      e === 0 ? b = ye() : b = U();
      var h = Math.round(b * 1e3 * 1e3);
      return Y[s >> 3] = BigInt(h), 0;
    }
    var Re = () => 2147483648, pe = (e, t) => Math.ceil(e / t) * t, Se = (e) => {
      var t = C.buffer.byteLength, s = (e - t + 65535) / 65536 | 0;
      try {
        return C.grow(s), L(), 1;
      } catch {
      }
    }, H, Ae = (e) => {
      var t = H.length;
      e >>>= 0;
      var s = Re();
      if (e > s) return false;
      for (var b = 1; b <= 4; b *= 2) {
        var h = t * (1 + 0.2 / b);
        h = Math.min(h, e + 100663296);
        var o = Math.min(s, pe(Math.max(e, h), 65536)), l = Se(o);
        if (l) return true;
      }
      return false;
    }, Pe = [
      null,
      [],
      []
    ], X = globalThis.TextDecoder && new TextDecoder(), Te = (e, t, s, b) => {
      for (var h = t + s; e[t] && !(t >= h); ) ++t;
      return t;
    }, Fe = (e, t = 0, s, b) => {
      var h = Te(e, t, s);
      if (h - t > 16 && e.buffer && X) return X.decode(e.subarray(t, h));
      for (var o = ""; t < h; ) {
        var l = e[t++];
        if (!(l & 128)) {
          o += String.fromCharCode(l);
          continue;
        }
        var w = e[t++] & 63;
        if ((l & 224) == 192) {
          o += String.fromCharCode((l & 31) << 6 | w);
          continue;
        }
        var g = e[t++] & 63;
        if ((l & 240) == 224 ? l = (l & 15) << 12 | w << 6 | g : l = (l & 7) << 18 | w << 12 | g << 6 | e[t++] & 63, l < 65536) o += String.fromCharCode(l);
        else {
          var Z = l - 65536;
          o += String.fromCharCode(55296 | Z >> 10, 56320 | Z & 1023);
        }
      }
      return o;
    }, Be = (e, t) => {
      var s = Pe[e];
      !t || t === 10 ? ((e === 1 ? M : y)(Fe(s)), s.length = 0) : s.push(t);
    }, B, Ce = (e, t, s, b) => {
      for (var h = 0, o = 0; o < s; o++) {
        var l = B[t >> 2], w = B[t + 4 >> 2];
        t += 8;
        for (var g = 0; g < w; g++) Be(e, H[l + g]);
        h += w;
      }
      return B[b >> 2] = h, 0;
    };
    {
      _.noExitRuntime && (I = _.noExitRuntime), _.print && (M = _.print), _.printErr && (y = _.printErr), _.arguments && _.arguments, _.thisProgram && _.thisProgram;
      var m = _.preInit;
      if (m) for (typeof m == "function" && (_.preInit = m = [
        m
      ]); m.length > 0; ) m.shift()();
    }
    var Q, C;
    function Ie(e) {
      _._free = e.k, _._b3w_create_world = e.l, _._b3w_destroy_world = e.m, _._b3w_step = e.n, _._b3w_create_body = e.o, _._b3w_add_box_shape = e.p, _._b3w_body_count = e.q, _._b3w_live_body_count = e.r, _._b3w_is_awake = e.s, _._b3w_body_sleep_state = e.t, _._b3w_transforms_ptr = e.u, _._b3w_read_transforms = e.v, _._b3w_body_transform = e.w, _._b3w_set_position = e.x, _._b3w_set_rotation = e.y, _._b3w_body_center = e.z, _._b3w_linear_velocity = e.A, _._b3w_angular_velocity = e.B, _._b3w_body_contact_impulse = e.C, _._b3w_set_target_transform = e.D, _._b3w_set_rotation_lock = e.E, _._b3w_set_damping = e.F, _._b3w_set_linear_velocity = e.G, _._b3w_set_angular_velocity = e.H, _._b3w_apply_impulse = e.I, _._b3w_apply_force = e.J, _._b3w_apply_torque = e.K, _._b3w_mass = e.L, _._b3w_principal_inertia = e.M, _._b3w_body_type = e.N, _._b3w_set_body_type = e.O, _._b3w_set_gravity_scale = e.P, _._b3w_keep_awake = e.Q, _._b3w_wake = e.R, _._b3w_is_valid = e.S, _._b3w_add_capsule_shape = e.T, _._b3w_alloc_floats = e.U, _._malloc = e.V, _._b3w_add_height_field = e.W, _._b3w_cast_ray_y = e.X, _._b3w_joint_count = e.Y, _._b3w_live_joint_count = e.Z, _._b3w_add_revolute_joint = e._, _._b3w_add_motor_joint = e.$, _._b3w_add_prismatic_joint = e.aa, _._b3w_add_weld_joint = e.ba, _._b3w_add_ball_joint = e.ca, _._b3w_add_distance_joint = e.da, _._b3w_set_distance_limits = e.ea, _._b3w_set_distance_motor = e.fa, _._b3w_distance_length = e.ga, _._b3w_joint_force = e.ha, _._b3w_add_mesh_shape = e.ia, _._b3w_set_revolute_motor = e.ja, _._b3w_set_joint_constraint_tuning = e.ka, _._b3w_wake_joint_bodies = e.la, _._b3w_set_revolute_limits = e.ma, _._b3w_set_prismatic_motor = e.na, _._b3w_set_prismatic_limits = e.oa, _._b3w_cast_sphere = e.pa, _._b3w_add_sphere_shape = e.qa, _._b3w_add_cylinder_shape = e.ra, _._b3w_add_hull_shape = e.sa, _._b3w_destroy_body = e.ta, _._b3w_set_contact_tuning = e.ua, _._b3w_set_body_exclusion = e.va, _._b3w_set_body_placed = e.wa, _._b3w_set_detect_only = e.xa, _._b3w_set_gravity = e.ya, _._b3w_set_maximum_linear_speed = e.za, _._b3w_shape_count = e.Aa, _._b3w_cast_ray_filtered = e.Ba, _._b3w_cast_ray_detailed = e.Ca, _._b3w_set_revolute_servo = e.Da, _._b3w_body_set_bullet = e.Ea, _._b3w_body_allow_fast_rotation = e.Fa, _._b3w_body_set_owner = e.Ga, _._b3w_revolute_angle = e.Ha, _._b3w_body_defer_mass = e.Ia, _._b3w_destroy_shape = e.Ja, _._b3w_shape_is_valid = e.Ka, _._b3w_destroy_joint = e.La, _._b3w_set_shape_group = e.Ma, _._b3w_set_shape_filter = e.Na, _._b3w_prismatic_translation = e.Oa, _._b3w_create_vehicle = e.Pa, _._b3w_step_vehicle = e.Qa, _._b3w_set_sleep_threshold = e.Ra, _._b3w_set_body_mass = e.Sa, _._b3w_body_contacts = e.Ta, _._b3w_body_pair_impulse = e.Ua, _._b3w_body_max_approach_speed = e.Va, _._b3w_body_aabb = e.Wa, _._b3w_body_inertia_tensor = e.Xa, _._b3w_body_shape_states = e.Ya, _._b3w_cast_sphere_filtered = e.Za, _._b3w_debug_draw = e._a, _._b3w_set_surface = e.$a, _._b3w_vehicle_destroy = e.ab, _._b3w_vehicle_set_velocity = e.bb, _._b3w_vehicle_set_owner = e.cb, _._b3w_vehicle_set_up_axis = e.db, _._b3w_vehicle_up_axis = e.eb, _._b3w_vehicle_wheel_count = e.fb, _._b3w_vehicle_wheel_capacity = e.gb, _._b3w_vehicle_add_wheel = e.hb, _._b3w_vehicle_set_wheel_mass = e.ib, _._b3w_vehicle_set_engine_force = e.jb, _._b3w_vehicle_set_brake = e.kb, _._b3w_vehicle_set_steering = e.lb, _._b3w_vehicle_set_side_friction = e.mb, _._b3w_vehicle_set_friction_slip = e.nb, _._b3w_vehicle_set_drive_share = e.ob, _._b3w_vehicle_set_suspension_stiffness = e.pb, _._b3w_vehicle_set_suspension_compression = e.qb, _._b3w_vehicle_set_suspension_relaxation = e.rb, _._b3w_vehicle_set_suspension_rest_length = e.sb, _._b3w_vehicle_set_max_suspension_travel = e.tb, _._b3w_vehicle_set_wheel_inertia = e.ub, _._b3w_vehicle_set_max_suspension_force = e.vb, _._b3w_vehicle_set_anti_squat = e.wb, _._b3w_vehicle_read_wheels = e.xb, _._b3w_vehicle_wheel_direction = e.yb, _._b3w_vehicle_wheel_mass = e.zb, _._b3w_vehicle_wheel_surface = e.Ab, _._b3w_vehicle_debug_draw = e.Bb, _._b3w_vehicle_place_wheels = e.Cb, _._b3w_vehicle_awake_wheels = e.Db, _._b3w_vehicle_wheel_sleep = e.Eb, _._b3w_vehicle_wheel_speeds = e.Fb, Q = e.Gb, C = e.i, e.__indirect_function_table;
    }
    var Ue = {
      f: oe,
      e: ce,
      b: fe,
      h: ge,
      a: U,
      c: Ae,
      g: Ce,
      d: K
    };
    async function He() {
      var _a2;
      _e();
      var e = _.setStatus;
      e && (e("Running..."), await new Promise((t) => setTimeout(t, 1)), setTimeout(e, 1, "")), !T && (te(), (_a2 = _.onRuntimeInitialized) == null ? void 0 : _a2.call(_), ae());
    }
    var S;
    return S = await be(), await He(), _;
  }
  ze = {
    Static: 0,
    Kinematic: 1,
    Dynamic: 2
  };
  Le = 7;
  let W = null;
  qe = function() {
    if (W) return W;
    const u = ke({
      locateFile: () => Ne()
    });
    return W = u, u;
  };
  function Ne() {
    var _a;
    const u = Me();
    return typeof process < "u" && ((_a = process.versions) == null ? void 0 : _a.node) ? import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1) + (u ? "box3d.wasm" : "box3d-scalar.wasm") : u ? new URL("" + new URL("box3d-CUqArWR4.wasm", import.meta.url).href, import.meta.url).href : new URL("" + new URL("box3d-scalar-WcfSE84k.wasm", import.meta.url).href, import.meta.url).href;
  }
  Ve = class {
    constructor(_, a) {
      __publicField(this, "wasm");
      __publicField(this, "handle");
      __publicField(this, "scratch");
      this.wasm = _, this.scratch = _._malloc(32);
      const [n, r, i] = a.gravity;
      if (this.handle = _._b3w_create_world(n, r, i, a.enableSleep ? 1 : 0, a.enableContinuous ? 1 : 0), this.handle < 0) throw new Error("box3d: out of world slots");
      a.maxLinearSpeed !== void 0 && this.wasm._b3w_set_maximum_linear_speed(this.handle, a.maxLinearSpeed);
    }
    get bodyCount() {
      return this.wasm._b3w_body_count(this.handle);
    }
    createBoxBody(_) {
      const [a, n, r] = _.position, [i, c, v, d] = _.rotation ?? [
        0,
        0,
        0,
        1
      ], A = this.wasm._b3w_create_body(this.handle, _.type, a, n, r, i, c, v, d, 0, 0, 0, 0), [R, f, P] = _.halfExtents;
      return this.wasm._b3w_add_box_shape(this.handle, A, R, f, P, 0, 0, 0, 0, 0, 0, 1, _.density ?? 1, _.friction ?? 0.6, _.restitution ?? 0, _.group ?? 0, 0), A;
    }
    createCapsuleBody(_) {
      const [a, n, r] = _.position, i = this.wasm._b3w_create_body(this.handle, _.type, a, n, r, 0, 0, 0, 1, 0, 0, 0, 0);
      return this.wasm._b3w_add_capsule_shape(this.handle, i, _.halfHeight, _.radius, 0, 0, 0, _.density ?? 1, _.friction ?? 0.6, _.restitution ?? 0, 0), new E(this.wasm, this.handle, i, this.scratch);
    }
    body(_) {
      return new E(this.wasm, this.handle, _, this.scratch);
    }
    addHeightField(_, a, n, r, i, c = 0.6, v = 0) {
      const d = this.wasm._b3w_alloc_floats(a.length);
      this.wasm.HEAPF32.set(a, d >> 2), this.wasm._b3w_add_height_field(this.handle, _, d, n, r, i[0], i[1], i[2], c, v), this.wasm._free(d);
    }
    addRevoluteJoint(_, a, n, r, i) {
      return this.wasm._b3w_add_revolute_joint(this.handle, _, a, n[0], n[1], n[2], r[0], r[1], r[2], i[0], i[1], i[2]);
    }
    addPrismaticJoint(_, a, n, r, i) {
      return this.wasm._b3w_add_prismatic_joint(this.handle, _, a, n[0], n[1], n[2], r[0], r[1], r[2], i[0], i[1], i[2]);
    }
    addMeshShape(_, a, n, r = {}) {
      const i = this.wasm._b3w_alloc_floats(a.length);
      this.wasm.HEAPF32.set(a, i >> 2);
      const c = this.wasm._b3w_alloc_floats(n.length);
      this.wasm.HEAP32.set(n, c >> 2), this.wasm._b3w_add_mesh_shape(this.handle, _, i, a.length / 3, c, n.length / 3, r.friction ?? 0.6, r.restitution ?? 0, r.group ?? 0, r.sensor ? 1 : 0, 0), this.wasm._free(i), this.wasm._free(c);
    }
    setRevoluteMotor(_, a, n) {
      this.wasm._b3w_set_revolute_motor(this.handle, _, a, n);
    }
    setRevoluteServo(_, a, n, r) {
      this.wasm._b3w_set_revolute_servo(this.handle, _, a, n, r);
    }
    revoluteAngle(_) {
      return this.wasm._b3w_revolute_angle(this.handle, _);
    }
    setRevoluteLimits(_, a) {
      this.wasm._b3w_set_revolute_limits(this.handle, _, a ? 1 : 0, (a == null ? void 0 : a.lower) ?? 0, (a == null ? void 0 : a.upper) ?? 0);
    }
    setPrismaticMotor(_, a, n) {
      this.wasm._b3w_set_prismatic_motor(this.handle, _, a, n);
    }
    setPrismaticLimits(_, a) {
      this.wasm._b3w_set_prismatic_limits(this.handle, _, a ? 1 : 0, (a == null ? void 0 : a.lower) ?? 0, (a == null ? void 0 : a.upper) ?? 0);
    }
    castSphere(_, a, n) {
      if (this.wasm._b3w_cast_sphere(this.handle, _[0], _[1], _[2], a, n[0], n[1], n[2], this.scratch) !== 1) return null;
      const i = this.scratch >> 2;
      return {
        normal: {
          x: this.wasm.HEAPF32[i],
          y: this.wasm.HEAPF32[i + 1],
          z: this.wasm.HEAPF32[i + 2]
        },
        fraction: this.wasm.HEAPF32[i + 3]
      };
    }
    addSphereShape(_, a, n = {}) {
      return this.wasm._b3w_add_sphere_shape(this.handle, _, a, 0, 0, 0, n.density ?? 1, n.friction ?? 0.6, n.restitution ?? 0, n.group ?? 0, n.sensor ? 1 : 0);
    }
    addCylinderShape(_, a, n, r = 16, i = {}) {
      return this.wasm._b3w_add_cylinder_shape(this.handle, _, a, n, r, i.density ?? 1, i.friction ?? 0.6, i.restitution ?? 0, i.group ?? 0, i.sensor ? 1 : 0);
    }
    addHullShape(_, a, n = 64, r = {}) {
      const i = this.wasm._b3w_alloc_floats(a.length);
      this.wasm.HEAPF32.set(a, i >> 2), this.wasm._b3w_add_hull_shape(this.handle, _, i, a.length / 3, n, r.density ?? 1, r.friction ?? 0.6, r.restitution ?? 0, r.group ?? 0, r.sensor ? 1 : 0), this.wasm._free(i);
    }
    destroyBody(_) {
      this.wasm._b3w_destroy_body(this.handle, _);
    }
    destroyShape(_) {
      this.wasm._b3w_destroy_shape(this.handle, _);
    }
    shapeIsValid(_) {
      return this.wasm._b3w_shape_is_valid(this.handle, _) !== 0;
    }
    setGravity(_) {
      this.wasm._b3w_set_gravity(this.handle, _[0], _[1], _[2]);
    }
    shapeCount(_) {
      const a = this.wasm._b3w_shape_count(this.handle, _);
      return a < 0 ? 0 : a;
    }
    castRayDetailed(_, a) {
      if (this.wasm._b3w_cast_ray_detailed(this.handle, _[0], _[1], _[2], a[0], a[1], a[2], this.scratch) !== 1) return null;
      const r = this.scratch >> 2, i = this.wasm.HEAPF32;
      return {
        point: {
          x: i[r],
          y: i[r + 1],
          z: i[r + 2]
        },
        normal: {
          x: i[r + 3],
          y: i[r + 4],
          z: i[r + 5]
        },
        fraction: i[r + 6],
        body: i[r + 7]
      };
    }
    castRayY(_, a) {
      const n = Number.NEGATIVE_INFINITY, r = this.wasm._b3w_cast_ray_y(this.handle, _[0], _[1], _[2], a[0], a[1], a[2], n);
      return r === n ? null : r;
    }
    step(_, a) {
      this.wasm._b3w_step(this.handle, _, a);
    }
    isAwake(_) {
      return this.wasm._b3w_is_awake(this.handle, _) === 1;
    }
    readTransforms() {
      this.wasm._b3w_read_transforms(this.handle);
      const _ = this.wasm._b3w_transforms_ptr(this.handle), a = this.bodyCount;
      return new Float32Array(this.wasm.HEAPF32.buffer, _, a * Le);
    }
    destroy() {
      this.wasm._b3w_destroy_world(this.handle), this.wasm._free(this.scratch);
    }
  };
});
export {
  ze as BodyType,
  Ve as Box3DWorld,
  Le as FLOATS_PER_BODY,
  __tla,
  qe as loadBox3D
};
