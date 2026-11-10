var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { as as F, iE as H, eO as E, aA as z, aw as P } from "./index-PYUvsYeK.js";
import { S as D, c as V, s as W } from "./game-DUKWENeJ.js";
import { B as N } from "./box3d-body-C92PeR_H.js";
const f = 25, d = { InContact: 0, SuspensionLength: 1, SuspensionForce: 2, ForwardImpulse: 3, SideImpulse: 4, LastToi: 5, Steering: 6, Radius: 7, Width: 8, GroundBody: 9, ContactNormalX: 10, LastCastStartX: 13, LastAxleX: 16, AngularVelocity: 19, HasBody: 20, SkidInfo: 21, BodyOffsetX: 22 };
class L {
  constructor(t, s, e, i, n, h) {
    __publicField(this, "wasm");
    __publicField(this, "handle");
    __publicField(this, "wheelBuffer");
    __publicField(this, "wheelCapacity");
    __publicField(this, "vec3Buffer");
    __publicField(this, "resolveBody");
    __publicField(this, "cachedStep", -1);
    __publicField(this, "currentStep");
    this.wasm = t, this.resolveBody = n, this.currentStep = h;
    const r = t._b3w_create_vehicle(s, e, i.collisionGroups >>> 16 & 65535, i.collisionGroups & 65535, i.group);
    if (r < 0) throw new Error("box3d-vehicle: no free vehicle slot");
    this.handle = r, this.wheelCapacity = t._b3w_vehicle_wheel_capacity(r), this.wheelBuffer = t._malloc(Math.max(this.wheelCapacity, 1) * f * 4), this.vec3Buffer = t._malloc(12);
  }
  get indexUpAxis() {
    return this.wasm._b3w_vehicle_up_axis(this.handle);
  }
  set indexUpAxis(t) {
    this.wasm._b3w_vehicle_set_up_axis(this.handle, t);
  }
  numWheels() {
    return this.wasm._b3w_vehicle_wheel_count(this.handle);
  }
  addWheel(t) {
    const s = this.wasm._b3w_vehicle_add_wheel(this.handle, t.connectionPoint.x, t.connectionPoint.y, t.connectionPoint.z, t.direction.x, t.direction.y, t.direction.z, t.axle.x, t.axle.y, t.axle.z, t.suspensionRestLength, t.radius, t.width);
    if (s < 0) return null;
    const e = this.wasm._b3w_vehicle_wheel_capacity(this.handle);
    return e > this.wheelCapacity && (this.wasm._free(this.wheelBuffer), this.wheelBuffer = this.wasm._malloc(e * f * 4), this.wheelCapacity = e, this.cachedStep = -1), this.wasm._b3w_vehicle_set_wheel_mass(this.handle, s, t.mass), s;
  }
  setOwner(t) {
    this.wasm._b3w_vehicle_set_owner(this.handle, t);
  }
  update(t) {
    this.wasm._b3w_step_vehicle(this.handle, F), this.cachedStep = -1;
  }
  read(t, s) {
    const e = this.currentStep();
    return this.cachedStep !== e && (this.wasm._b3w_vehicle_read_wheels(this.handle, this.wheelBuffer), this.cachedStep = e), t < 0 || t >= this.numWheels() ? Number.NaN : this.wasm.HEAPF32[(this.wheelBuffer >> 2) + t * f + s];
  }
  readVec(t, s) {
    const e = this.read(t, s);
    if (Number.isNaN(e)) return null;
    const i = (this.wheelBuffer >> 2) + t * f + s, n = this.wasm.HEAPF32;
    return { x: n[i], y: n[i + 1], z: n[i + 2] };
  }
  setWheelEngineForce(t, s) {
    this.wasm._b3w_vehicle_set_engine_force(this.handle, t, s);
  }
  setWheelBrake(t, s) {
    this.wasm._b3w_vehicle_set_brake(this.handle, t, s);
  }
  setWheelSteering(t, s) {
    this.wasm._b3w_vehicle_set_steering(this.handle, t, s);
  }
  setWheelSideFrictionStiffness(t, s) {
    this.wasm._b3w_vehicle_set_side_friction(this.handle, t, s);
  }
  setWheelFrictionSlip(t, s) {
    this.wasm._b3w_vehicle_set_friction_slip(this.handle, t, s);
  }
  setWheelDriveShare(t, s) {
    this.wasm._b3w_vehicle_set_drive_share(this.handle, t, s);
  }
  setWheelSuspensionStiffness(t, s) {
    this.wasm._b3w_vehicle_set_suspension_stiffness(this.handle, t, s);
  }
  setWheelSuspensionCompression(t, s) {
    this.wasm._b3w_vehicle_set_suspension_compression(this.handle, t, s);
  }
  setWheelSuspensionRelaxation(t, s) {
    this.wasm._b3w_vehicle_set_suspension_relaxation(this.handle, t, s);
  }
  setWheelSuspensionRestLength(t, s) {
    this.wasm._b3w_vehicle_set_suspension_rest_length(this.handle, t, s);
  }
  setWheelMaxSuspensionTravel(t, s) {
    this.wasm._b3w_vehicle_set_max_suspension_travel(this.handle, t, s);
  }
  setWheelMaxSuspensionForce(t, s) {
    this.wasm._b3w_vehicle_set_max_suspension_force(this.handle, t, s);
  }
  setWheelAntiSquat(t, s) {
    this.wasm._b3w_vehicle_set_anti_squat(this.handle, t, s);
  }
  wheelSteering(t) {
    const s = this.read(t, d.Steering);
    return Number.isNaN(s) ? null : s;
  }
  wheelRadius(t) {
    const s = this.read(t, d.Radius);
    return Number.isNaN(s) ? null : s;
  }
  wheelWidth(t) {
    const s = this.read(t, d.Width);
    return Number.isNaN(s) ? null : s;
  }
  wheelIsInContact(t) {
    return this.read(t, d.InContact) > 0.5;
  }
  wheelSuspensionLength(t) {
    const s = this.read(t, d.SuspensionLength);
    return Number.isNaN(s) ? null : s;
  }
  wheelBodyOffset(t) {
    return this.read(t, d.HasBody) < 0.5 ? null : this.readVec(t, d.BodyOffsetX);
  }
  wheelMass(t) {
    return this.read(t, d.HasBody) < 0.5 ? null : this.wasm._b3w_vehicle_wheel_mass(this.handle, t);
  }
  wheelSurface(t) {
    return this.wasm._b3w_vehicle_wheel_surface(this.handle, t);
  }
  wheelSuspensionForce(t) {
    const s = this.read(t, d.SuspensionForce);
    return Number.isNaN(s) ? null : s;
  }
  wheelForwardImpulse(t) {
    const s = this.read(t, d.ForwardImpulse);
    return Number.isNaN(s) ? null : s;
  }
  wheelSideImpulse(t) {
    const s = this.read(t, d.SideImpulse);
    return Number.isNaN(s) ? null : s;
  }
  wheelLastToi(t) {
    const s = this.read(t, d.LastToi);
    return Number.isNaN(s) ? null : s;
  }
  wheelLastCastStart(t) {
    return this.readVec(t, d.LastCastStartX);
  }
  wheelLastAxleWs(t) {
    return this.readVec(t, d.LastAxleX);
  }
  wheelAngularVelocity(t) {
    const s = this.read(t, d.AngularVelocity);
    return Number.isNaN(s) ? null : s;
  }
  setWheelInertia(t, s) {
    this.wasm._b3w_vehicle_set_wheel_inertia(this.handle, t, s);
  }
  wheelSkidInfo(t) {
    const s = this.read(t, d.SkidInfo);
    return Number.isNaN(s) ? null : s;
  }
  wheelContactNormal(t) {
    return this.readVec(t, d.ContactNormalX);
  }
  wheelDirectionCs(t) {
    if (t < 0 || t >= this.numWheels()) return null;
    this.wasm._b3w_vehicle_wheel_direction(this.handle, t, this.vec3Buffer);
    const s = this.vec3Buffer >> 2, e = this.wasm.HEAPF32;
    return { x: e[s], y: e[s + 1], z: e[s + 2] };
  }
  wheelGroundBody(t) {
    const s = this.read(t, d.GroundBody);
    return Number.isNaN(s) || s < 0 ? null : this.resolveBody(s);
  }
  free() {
    this.wasm._b3w_vehicle_destroy(this.handle), this.wasm._free(this.wheelBuffer), this.wasm._free(this.vec3Buffer);
  }
}
const k = 32, y = 64, x = 8, b = 3e5, T = { fixed: 0, kinematic: 1, dynamic: 2 };
function X(c) {
  for (let t = 0; t < c.length; t++) if (!Number.isFinite(c[t])) return false;
  return true;
}
const p = 16;
function G(c, t, s, e) {
  const i = new Float32Array(p * 2 * 3);
  let n = 0;
  for (let h = 0; h < p; h++) {
    const r = h / p * Math.PI * 2, o = c * Math.cos(r), _ = c * Math.sin(r);
    for (const a of [-t, t]) {
      const l = e.w * o + e.y * _ - e.z * a, w = e.w * a + e.z * o - e.x * _, u = e.w * _ + e.x * a - e.y * o, m = -e.x * o - e.y * a - e.z * _;
      i[n++] = l * e.w - m * e.x - w * e.z + u * e.y + s.x, i[n++] = w * e.w - m * e.y - u * e.x + l * e.z + s.y, i[n++] = u * e.w - m * e.z - l * e.y + w * e.x + s.z;
    }
  }
  return i;
}
const R = 0.25 * P * k, C = 0.99 * Math.PI, O = 0.99 * 0.25 * Math.PI * P;
function A(c) {
  return Math.max(-O, Math.min(O, c));
}
function v(c) {
  return Math.max(-C, Math.min(C, c));
}
function j(c) {
  return c > 0 ? Math.min(Math.sqrt(c), R) : 0;
}
function g(c, t) {
  return !(c > 0) || !(t > 0) ? 0 : t / (2 * Math.sqrt(c));
}
class J {
  constructor(t, s = -9.81) {
    __publicField(this, "wasm");
    __publicField(this, "world");
    __publicField(this, "scratch");
    __publicField(this, "bodies", /* @__PURE__ */ new Map());
    __publicField(this, "radii", /* @__PURE__ */ new Map());
    __publicField(this, "colliderMass", /* @__PURE__ */ new Map());
    __publicField(this, "contactBuffer");
    __publicField(this, "gravityY");
    __publicField(this, "stepId", 0);
    __publicField(this, "massDeferrals", /* @__PURE__ */ new Map());
    __publicField(this, "hasDetectOnlyContacts", true);
    __publicField(this, "detectOnlyBuffer", 0);
    __publicField(this, "detectOnlyCapacity", 0);
    __publicField(this, "detectOnlyCount", 0);
    __publicField(this, "debugVerts", 0);
    __publicField(this, "debugColors", 0);
    if (this.wasm = t, this.gravityY = s, this.scratch = t._malloc(32), this.contactBuffer = t._malloc(y * x * 4), this.world = t._b3w_create_world(0, s, 0, 1, 1), this.world < 0) throw new Error("box3d-engine: out of world slots");
    this.wasm._b3w_set_maximum_linear_speed(this.world, H);
  }
  get gravity() {
    return this.gravityY;
  }
  set gravity(t) {
    this.gravityY = t, this.wasm._b3w_set_gravity(this.world, 0, t, 0);
  }
  step() {
    this.wasm._b3w_step(this.world, F, k), this.wasm._b3w_vehicle_place_wheels(this.world), this.stepId++;
  }
  clearAccumulatedForces() {
  }
  wrap(t) {
    let s = this.bodies.get(t);
    return s || (s = new N(this.wasm, this.world, t, this.scratch), this.bodies.set(t, s)), s;
  }
  indexOf(t) {
    if (!(t instanceof N)) throw new Error("box3d-engine: body was not created by this engine");
    return t.handle;
  }
  setBodyOwner(t, s) {
    this.wasm._b3w_body_set_owner(this.world, t.handle, s);
  }
  createBody(t) {
    const s = t.rotation ?? { x: 0, y: 0, z: 0, w: 1 }, e = this.wasm._b3w_create_body(this.world, T[t.kind], t.position.x, t.position.y, t.position.z, s.x, s.y, s.z, s.w, t.linearDamping ?? 0, t.angularDamping ?? 0, t.lockRotations ? 1 : 0, t.softCcdPrediction !== void 0 ? 1 : 0);
    return t.kind === "dynamic" && this.wasm._b3w_set_sleep_threshold(this.world, e, D), this.wrap(e);
  }
  removeBody(t) {
    const s = this.indexOf(t);
    this.wasm._b3w_destroy_body(this.world, s), this.bodies.delete(s), this.massDeferrals.delete(s);
  }
  bodyByHandle(t) {
    return this.bodies.get(t) ?? null;
  }
  forEachBody(t) {
    for (const s of this.bodies.values()) s.isValid() && t(s);
  }
  forEachAwakeBody(t) {
    const s = this.wasm._b3w_body_count(this.world);
    for (let e = 0; e < s; e++) this.wasm._b3w_is_awake(this.world, e) === 1 && t(this.wrap(e));
  }
  deferMass(t, s) {
    const e = this.indexOf(t), i = this.massDeferrals.get(t.handle) ?? 0, n = s ? i + 1 : Math.max(0, i - 1);
    if (n === 0 ? this.massDeferrals.delete(t.handle) : this.massDeferrals.set(t.handle, n), s ? i > 0 : n > 0) return;
    this.wasm._b3w_body_defer_mass(this.world, e, s ? 1 : 0);
    const h = this.wrap(e);
    h.massDeferred = s, s || h.restoreExplicitMass();
  }
  attachCollider(t, s) {
    if (s.shape.kind === "mesh" && !X(s.shape.vertices)) return console.error(`box3d: refused a mesh collider with non-finite vertices (${s.shape.vertices.length / 3} vertices)`), -1;
    const e = this.attachShape(t, s);
    if (e < 0) throw new Error(`box3d: the engine refused a ${s.shape.kind} collider \u2014 its shape registry is full`);
    this.growRadius(t, s);
    const i = this.wrap(this.indexOf(t));
    return e >= 0 && this.colliderMass.set(e, { body: t.handle, mass: s.mass ?? 0 }), s.mass !== void 0 ? i.setExplicitMass((i.specifiedMass ?? 0) + s.mass) : i.restoreExplicitMass(), s.collisionGroups !== void 0 && e >= 0 && this.wasm._b3w_set_shape_filter(this.world, e, s.collisionGroups >>> 16 & 65535, s.collisionGroups & 65535), e;
  }
  attachHull(t, s, e, i, n, h) {
    const r = this.wasm._b3w_alloc_floats(s.length);
    this.wasm.HEAPF32.set(s, r >> 2);
    const o = this.wasm._b3w_add_hull_shape(this.world, t, r, s.length / 3, 64, i, e.friction, e.restitution, n, h);
    return this.wasm._free(r), o;
  }
  attachShape(t, s) {
    const e = this.indexOf(t), i = s.position ?? { x: 0, y: 0, z: 0 }, n = s.rotation ?? { x: 0, y: 0, z: 0, w: 1 }, h = V(s), r = s.group ?? 0, o = s.shape, _ = s.isSensor ? 1 : 0;
    switch (o.kind) {
      case "box":
        return this.wasm._b3w_add_box_shape(this.world, e, o.halfExtents.x, o.halfExtents.y, o.halfExtents.z, i.x, i.y, i.z, n.x, n.y, n.z, n.w, h, s.friction, s.restitution, r, _);
      case "sphere":
        return this.wasm._b3w_add_sphere_shape(this.world, e, o.radius, i.x, i.y, i.z, h, s.friction, s.restitution, r, _);
      case "capsule":
        return this.wasm._b3w_add_capsule_shape(this.world, e, o.halfHeight, o.radius, i.x, i.y, i.z, h, s.friction, s.restitution, _);
      case "cylinder":
        return i.x === 0 && i.y === 0 && i.z === 0 && n.x === 0 && n.y === 0 && n.z === 0 && n.w === 1 ? this.wasm._b3w_add_cylinder_shape(this.world, e, o.halfHeight, o.radius, p, h, s.friction, s.restitution, r, _) : this.attachHull(e, G(o.radius, o.halfHeight, i, n), s, h, r, _);
      case "hull":
        return this.attachHull(e, o.points, s, h, r, _);
      case "mesh": {
        const a = this.wasm._b3w_alloc_floats(o.vertices.length);
        this.wasm.HEAPF32.set(o.vertices, a >> 2);
        const l = this.wasm._b3w_alloc_floats(o.indices.length);
        if (this.wasm.HEAP32.set(new Int32Array(o.indices), l >> 2), o.surfaces && o.surfaces.length !== o.indices.length / 3) throw new Error("box3d-engine: a mesh needs one surface per triangle");
        const w = o.surfaces ? this.wasm._malloc(o.surfaces.length) : 0;
        o.surfaces && this.wasm.HEAPU8.set(o.surfaces, w);
        const u = this.wasm._b3w_add_mesh_shape(this.world, e, a, o.vertices.length / 3, l, o.indices.length / 3, s.friction, s.restitution, r, _, w);
        return this.wasm._free(a), this.wasm._free(l), w && this.wasm._free(w), u;
      }
      case "heightfield": {
        const a = this.wasm._b3w_alloc_floats(o.heights.length);
        this.wasm.HEAPF32.set(o.heights, a >> 2);
        const l = o.scale.x / (o.countX - 1), w = o.scale.z / (o.countZ - 1), u = this.wasm._b3w_add_height_field(this.world, e, a, o.countX, o.countZ, l, o.scale.y, w, s.friction, s.restitution);
        this.wasm._free(a);
        const m = t.position();
        return t.setPosition({ x: m.x - o.scale.x / 2, y: m.y, z: m.z - o.scale.z / 2 }), u;
      }
    }
  }
  removeCollider(t, s) {
    const e = this.colliderMass.get(t);
    if (this.wasm._b3w_destroy_shape(this.world, t), !e) return;
    this.colliderMass.delete(t);
    const i = this.bodies.get(e.body);
    i && (e.mass > 0 ? i.setExplicitMass(Math.max(0, (i.specifiedMass ?? 0) - e.mass)) : i.restoreExplicitMass());
  }
  growRadius(t, s) {
    const e = s.position, n = (e ? Math.sqrt(e.x * e.x + e.y * e.y + e.z * e.z) : 0) + W(s.shape), h = this.radii.get(t.handle) ?? 0;
    n > h && this.radii.set(t.handle, n);
  }
  bodyBoundingRadius(t) {
    return this.radii.get(t.handle) ?? 0;
  }
  bodyAabb(t) {
    this.wasm._b3w_body_aabb(this.world, this.indexOf(t), this.scratch);
    const s = this.scratch >> 2, e = this.wasm.HEAPF32;
    return { min: { x: e[s], y: e[s + 1], z: e[s + 2] }, max: { x: e[s + 3], y: e[s + 4], z: e[s + 5] } };
  }
  angularInertiaTensor(t, s) {
    this.wasm._b3w_body_inertia_tensor(this.world, this.indexOf(t), this.contactBuffer);
    const e = this.contactBuffer >> 2;
    for (let i = 0; i < 9; i++) s[i] = this.wasm.HEAPF32[e + i];
  }
  colliderStates(t) {
    const s = y * x / 4, e = this.wasm._b3w_body_shape_states(this.world, this.indexOf(t), this.contactBuffer, Math.floor(s)), i = this.contactBuffer >> 2, n = this.wasm.HEAPF32, h = [];
    for (let r = 0; r < e; r++) {
      const o = i + r * 4;
      h.push({ isSensor: n[o] > 0.5, position: { x: n[o + 1], y: n[o + 2], z: n[o + 3] } });
    }
    return h;
  }
  bodyColliderCount(t) {
    const s = this.wasm._b3w_shape_count(this.world, this.indexOf(t));
    return s < 0 ? 0 : s;
  }
  bodyCount() {
    return this.wasm._b3w_live_body_count(this.world);
  }
  jointCount() {
    return this.wasm._b3w_live_joint_count(this.world);
  }
  jointSlots() {
    return this.wasm._b3w_joint_count(this.world);
  }
  wasmMemoryBytes() {
    var _a;
    return ((_a = this.wasm.HEAPU8) == null ? void 0 : _a.buffer.byteLength) ?? 0;
  }
  colliderCount() {
    let t = 0;
    for (const s of this.bodies.values()) {
      if (!s.isValid()) continue;
      const e = this.wasm._b3w_shape_count(this.world, s.handle);
      t += e < 0 ? 0 : e;
    }
    return t;
  }
  setDetectOnlyBodies(t) {
    const s = t.size;
    if (s === 0 && this.detectOnlyCount === 0) return;
    s > this.detectOnlyCapacity && (this.detectOnlyBuffer !== 0 && this.wasm._free(this.detectOnlyBuffer), this.detectOnlyCapacity = Math.max(s, 16), this.detectOnlyBuffer = this.wasm._malloc(this.detectOnlyCapacity * 4));
    let e = 0;
    const i = this.detectOnlyBuffer >> 2;
    for (const n of t) this.wasm.HEAP32[i + e++] = n;
    this.wasm._b3w_set_detect_only(this.world, this.detectOnlyBuffer, s), this.detectOnlyCount = s;
  }
  createVehicleController(t, s) {
    return new L(this.wasm, this.world, this.indexOf(t), s, (i) => this.bodies.get(i) ?? null, () => this.stepId);
  }
  defineSurface(t, s, e) {
    this.wasm._b3w_set_surface(t, s, e);
  }
  createHold(t, s, e, i, n) {
    const h = this.indexOf(s), r = this.indexOf(e);
    if (t === "hinge") {
      const _ = E(z(i, s.position()), s.rotation()), a = E(z(i, e.position()), e.rotation()), l = this.wasm._b3w_add_revolute_joint(this.world, h, r, _.x, _.y, _.z, a.x, a.y, a.z, n.x, n.y, n.z);
      return this.holdOrDead(l, t);
    }
    const o = t === "ball" ? this.wasm._b3w_add_ball_joint(this.world, h, r, i.x, i.y, i.z) : this.wasm._b3w_add_weld_joint(this.world, h, r, i.x, i.y, i.z, 0, 0, 1);
    return this.holdOrDead(o, t);
  }
  holdOrDead(t, s) {
    const e = S.create(this.wasm, this.world, t);
    return e || (console.error(`box3d: refused a ${s} hold \u2014 one of its bodies is gone, or the joint table could not grow`), new I());
  }
  createRope(t, s, e, i, n) {
    const h = this.indexOf(t), r = this.indexOf(s), o = this.wasm._b3w_add_distance_joint(this.world, h, r, e.x, e.y, e.z, i.x, i.y, i.z, 0, n, 0, 0);
    return M.create(this.wasm, this.world, o);
  }
  createJoint(t) {
    const s = this.indexOf(t.bodyA), e = this.indexOf(t.bodyB), n = (t.kind === "revolute" ? this.wasm._b3w_add_revolute_joint : this.wasm._b3w_add_prismatic_joint)(this.world, s, e, t.anchorA.x, t.anchorA.y, t.anchorA.z, t.anchorB.x, t.anchorB.y, t.anchorB.z, t.axis.x, t.axis.y, t.axis.z), h = B.create(this.wasm, this.world, n, t.kind);
    return h !== null && t.spinsFast && t.kind === "revolute" && this.wasm._b3w_body_allow_fast_rotation && (this.wasm._b3w_body_allow_fast_rotation(this.world, e, 1), h.spinsFast = true), h === null ? (console.error(`box3d: refused a ${t.kind} joint \u2014 one of its bodies is gone, or the joint table could not grow`), new I()) : (t.kind === "prismatic" && h.setConstraintTuning(R, 2), t.limits && h.setLimits(t.limits.lower, t.limits.upper), h);
  }
  forEachContact(t, s) {
    const e = this.wasm._b3w_body_contacts(this.world, this.indexOf(t), this.contactBuffer, y), i = this.contactBuffer >> 2, n = this.wasm.HEAPF32;
    for (let h = 0; h < e; h++) {
      const r = i + h * x, o = n[r + 6];
      s({ other: o >= 0 ? this.bodies.get(o) ?? null : null, normal: { x: n[r], y: n[r + 1], z: n[r + 2] }, depth: n[r + 3], normalImpulse: n[r + 4], tangentImpulse: n[r + 5], points: 1, approachSpeed: n[r + 7] });
    }
  }
  bodyApproachSpeed(t) {
    return this.wasm._b3w_body_max_approach_speed(this.world, this.indexOf(t));
  }
  castRay(t, s, e, i) {
    const n = (i == null ? void 0 : i.exclude) ? this.indexOf(i.exclude) : -1, h = i == null ? void 0 : i.excludeBodies;
    if (!(h == null ? void 0 : h.size)) return this.castRayInRun(t, s, e, i, -1, -2, n);
    const r = [...h].sort((l, w) => l - w), o = [];
    for (const l of r) {
      const w = o[o.length - 1];
      w && l === w.hi + 1 ? w.hi = l : o.push({ lo: l, hi: l });
    }
    if (o.sort((l, w) => w.hi - w.lo - (l.hi - l.lo)), o.length === 1) return this.castRayInRun(t, s, e, i, o[0].lo, o[0].hi, n);
    if (o.length === 2 && o[1].lo === o[1].hi && n < 0) return this.castRayInRun(t, s, e, i, o[0].lo, o[0].hi, o[1].lo);
    const _ = { x: t.x, y: t.y, z: t.z };
    let a = 0;
    for (let l = 0; l < 16; l++) {
      const w = this.castRayInRun(_, s, e - a, i, -1, -2, n);
      if (!w) return null;
      if (!w.body || !h.has(w.body.handle)) return { ...w, toi: a + w.toi };
      if (a += Math.max(w.toi, 0) + 0.01, a >= e) return null;
      _.x = t.x + s.x * a, _.y = t.y + s.y * a, _.z = t.z + s.z * a;
    }
    return null;
  }
  castRayInRun(t, s, e, i, n, h, r) {
    const o = (i == null ? void 0 : i.groups) ?? 0;
    if (this.wasm._b3w_cast_ray_filtered(this.world, t.x, t.y, t.z, s.x * e, s.y * e, s.z * e, o >>> 16, o & 65535, r, n, h, this.scratch) !== 1) return null;
    const a = this.scratch >> 2, l = this.wasm.HEAPF32, w = l[a + 7] >= 0 ? this.bodies.get(l[a + 7]) ?? null : null;
    return { toi: l[a + 6] * e, point: { x: l[a], y: l[a + 1], z: l[a + 2] }, normal: { x: l[a + 3], y: l[a + 4], z: l[a + 5] }, body: w };
  }
  castSphere(t, s, e, i, n) {
    if (this.wasm._b3w_cast_sphere_filtered(this.world, t.x, t.y, t.z, s, e.x * i, e.y * i, e.z * i, n ? this.indexOf(n) : -1, this.scratch) !== 1) return null;
    const r = this.scratch >> 2, o = this.wasm.HEAPF32;
    return { toi: o[r + 3] * i, normal: { x: o[r], y: o[r + 1], z: o[r + 2] } };
  }
  debugRender(t) {
    this.debugVerts === 0 && (this.debugVerts = this.wasm._b3w_alloc_floats(b * 3), this.debugColors = this.wasm._b3w_alloc_floats(b * 4));
    const s = this.wasm._b3w_debug_draw(this.world, this.debugVerts, this.debugColors, b, t ? this.indexOf(t) : -1), e = this.wasm._b3w_vehicle_debug_draw(this.world, this.debugVerts, this.debugColors, b, s);
    if (e === 0) return null;
    const i = this.debugVerts >> 2, n = this.debugColors >> 2;
    return { vertices: this.wasm.HEAPF32.slice(i, i + e * 3), colors: this.wasm.HEAPF32.slice(n, n + e * 4) };
  }
  awakeWheelBodies() {
    return this.wasm._b3w_vehicle_awake_wheels(this.world);
  }
  bodySleepState(t) {
    const s = this.wasm._b3w_alloc_floats(3);
    this.wasm._b3w_body_sleep_state(this.world, this.indexOf(t), s);
    const e = this.wasm.HEAPF32, i = { velocity: e[s >> 2], threshold: e[(s >> 2) + 1], sleepTime: e[(s >> 2) + 2] };
    return this.wasm._free(s), i;
  }
  wheelSleepState() {
    const t = this.wasm._b3w_alloc_floats(4);
    this.wasm._b3w_vehicle_wheel_sleep(this.world, t);
    const s = this.wasm.HEAPF32, e = { velocity: s[t >> 2], threshold: s[(t >> 2) + 1], sleepTime: s[(t >> 2) + 2], awake: s[(t >> 2) + 3] };
    return this.wasm._free(t), e;
  }
  wheelBodySpeeds() {
    const t = this.wasm._b3w_alloc_floats(4);
    this.wasm._b3w_vehicle_wheel_speeds(this.world, t);
    const s = this.wasm.HEAPF32, e = { linear: s[t >> 2], angular: s[(t >> 2) + 1], placementNeeded: s[(t >> 2) + 2], hardPoint: s[(t >> 2) + 3] };
    return this.wasm._free(t), e;
  }
  destroy() {
    this.wasm._b3w_destroy_world(this.world), this.wasm._free(this.scratch), this.bodies.clear();
  }
}
let U = 0;
class I {
  constructor() {
    __publicField(this, "handle", --U);
  }
  setMotorVelocity() {
  }
  setMotorPosition() {
  }
  setMotor() {
  }
  setLimits() {
  }
  value() {
    return 0;
  }
  remove() {
  }
}
class S {
  constructor(t, s, e) {
    __publicField(this, "handle");
    __publicField(this, "wasm");
    __publicField(this, "world");
    __publicField(this, "joint");
    this.wasm = t, this.world = s, this.joint = e, this.handle = e;
  }
  static create(t, s, e) {
    return e < 0 ? null : new S(t, s, e);
  }
  remove() {
    this.wasm._b3w_destroy_joint(this.world, this.joint);
  }
}
class M {
  constructor(t, s, e) {
    __publicField(this, "handle");
    __publicField(this, "wasm");
    __publicField(this, "world");
    __publicField(this, "joint");
    __publicField(this, "lastMin", Number.NaN);
    __publicField(this, "lastMax", Number.NaN);
    this.wasm = t, this.world = s, this.joint = e, this.handle = e;
  }
  static create(t, s, e) {
    return e < 0 ? null : new M(t, s, e);
  }
  setLimits(t, s) {
    this.wasm._b3w_set_distance_limits(this.world, this.joint, t, s);
    const e = !(Math.abs(t - this.lastMin) < 1e-5 && Math.abs(s - this.lastMax) < 1e-5);
    this.lastMin = t, this.lastMax = s, e && this.wasm._b3w_wake_joint_bodies(this.world, this.joint);
  }
  setMotor(t, s) {
    this.wasm._b3w_set_distance_motor(this.world, this.joint, t, s), Math.abs(t) > 1e-4 && this.wasm._b3w_wake_joint_bodies(this.world, this.joint);
  }
  length() {
    return this.wasm._b3w_distance_length(this.world, this.joint);
  }
  load() {
    return this.wasm._b3w_joint_force(this.world, this.joint);
  }
  remove() {
    this.wasm._b3w_destroy_joint(this.world, this.joint);
  }
}
class B {
  constructor(t, s, e, i) {
    __publicField(this, "handle");
    __publicField(this, "wasm");
    __publicField(this, "world");
    __publicField(this, "joint");
    __publicField(this, "kind");
    __publicField(this, "spinsFast", false);
    this.wasm = t, this.world = s, this.joint = e, this.kind = i, this.handle = e;
  }
  static create(t, s, e, i) {
    return e < 0 ? null : new B(t, s, e, i);
  }
  setMotorVelocity(t, s) {
    if (this.kind !== "revolute") {
      this.wasm._b3w_set_prismatic_motor(this.world, this.joint, t, s), this.wakeIfCommanded(null, t);
      return;
    }
    this.wasm._b3w_set_revolute_servo(this.world, this.joint, 0, 0, 0), this.wasm._b3w_set_revolute_motor(this.world, this.joint, this.spinsFast ? t : A(t), s), this.wakeIfCommanded(null, t);
  }
  setMotorPosition(t, s, e) {
    if (this.kind !== "revolute") throw new Error("box3d-engine: prismatic servo is not implemented");
    this.wasm._b3w_set_revolute_motor(this.world, this.joint, 0, 0), this.wasm._b3w_set_revolute_servo(this.world, this.joint, v(t), j(s), g(s, e)), this.wakeIfCommanded(t, 0);
  }
  setMotor(t, s, e, i, n = e) {
    if (this.kind !== "revolute") throw new Error("box3d-engine: prismatic servo is not implemented");
    this.wasm._b3w_set_revolute_servo(this.world, this.joint, v(t), j(e), g(e, i)), this.wasm._b3w_set_revolute_motor(this.world, this.joint, this.spinsFast ? s : A(s), n), Math.abs(s) > 1e-4 && this.wasm._b3w_set_revolute_servo(this.world, this.joint, v(t), 0, g(e, i)), this.wakeIfCommanded(t, s);
  }
  wakeIfCommanded(t, s) {
    (Math.abs(s) > 1e-4 || t !== null && Math.abs(this.value() - t) > 1e-3) && this.wasm._b3w_wake_joint_bodies(this.world, this.joint);
  }
  setConstraintTuning(t, s) {
    this.wasm._b3w_set_joint_constraint_tuning(this.world, this.joint, t, s);
  }
  setLimits(t, s) {
    const e = this.kind === "revolute" && s - t >= 2 * Math.PI, i = !Number.isFinite(t) || !Number.isFinite(s) || e, n = i ? 0 : 1, h = i ? 0 : t, r = i ? 0 : s;
    this.kind === "revolute" ? this.wasm._b3w_set_revolute_limits(this.world, this.joint, n, h, r) : this.wasm._b3w_set_prismatic_limits(this.world, this.joint, n, h, r);
  }
  value() {
    return this.kind === "revolute" ? this.wasm._b3w_revolute_angle(this.world, this.joint) : this.wasm._b3w_prismatic_translation(this.world, this.joint);
  }
  remove() {
    this.wasm._b3w_destroy_joint(this.world, this.joint);
  }
}
export {
  J as Box3DEngine,
  G as cylinderPoints
};
