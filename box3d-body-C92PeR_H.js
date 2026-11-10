var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const l = { fixed: 0, kinematic: 1, dynamic: 2 }, o = ["fixed", "kinematic", "dynamic"], r = 5;
let e = 0;
function i(h, s, t) {
  if (Number.isFinite(t)) return false;
  if (e++, e <= r) {
    const a = new Error().stack ?? "(no stack)";
    console.error(`[box3d] refused a non-finite ${h} on body ${s} (fault ${e})
${a}`), e === r && console.error("[box3d] further non-finite writes will be refused silently; the count is in the counter below");
  }
  return true;
}
class w {
  constructor(s, t, a, n) {
    __publicField(this, "handle");
    __publicField(this, "wasm");
    __publicField(this, "world");
    __publicField(this, "scratch");
    __publicField(this, "explicitMass", null);
    __publicField(this, "massDeferred", false);
    this.wasm = s, this.world = t, this.handle = a, this.scratch = n;
  }
  readVec3() {
    const s = this.scratch >> 2;
    return { x: this.wasm.HEAPF32[s], y: this.wasm.HEAPF32[s + 1], z: this.wasm.HEAPF32[s + 2] };
  }
  position() {
    return this.wasm._b3w_body_transform(this.world, this.handle, this.scratch), this.readVec3();
  }
  rotation() {
    this.wasm._b3w_body_transform(this.world, this.handle, this.scratch);
    const s = this.scratch >> 2;
    return { x: this.wasm.HEAPF32[s + 3], y: this.wasm.HEAPF32[s + 4], z: this.wasm.HEAPF32[s + 5], w: this.wasm.HEAPF32[s + 6] };
  }
  setPosition(s) {
    i("position", this.handle, s.x + s.y + s.z) || (this.wasm._b3w_set_position(this.world, this.handle, s.x, s.y, s.z), this.wake());
  }
  setRotation(s) {
    i("rotation", this.handle, s.x + s.y + s.z + s.w) || (this.wasm._b3w_set_rotation(this.world, this.handle, s.x, s.y, s.z, s.w), this.wake());
  }
  linearVelocity() {
    return this.wasm._b3w_linear_velocity(this.world, this.handle, this.scratch), this.readVec3();
  }
  angularVelocity() {
    return this.wasm._b3w_angular_velocity(this.world, this.handle, this.scratch), this.readVec3();
  }
  setLinearVelocity(s, t = true) {
    i("linear velocity", this.handle, s.x + s.y + s.z) || this.wasm._b3w_set_linear_velocity(this.world, this.handle, s.x, s.y, s.z, t ? 1 : 0);
  }
  setAngularVelocity(s, t = true) {
    i("angular velocity", this.handle, s.x + s.y + s.z) || this.wasm._b3w_set_angular_velocity(this.world, this.handle, s.x, s.y, s.z, t ? 1 : 0);
  }
  applyImpulse(s) {
    i("impulse", this.handle, s.x + s.y + s.z) || this.wasm._b3w_apply_impulse(this.world, this.handle, s.x, s.y, s.z);
  }
  applyForce(s, t) {
    i("force", this.handle, s.x + s.y + s.z) || this.wasm._b3w_apply_force(this.world, this.handle, s.x, s.y, s.z, t ? 1 : 0);
  }
  applyTorque(s, t) {
    i("torque", this.handle, s.x + s.y + s.z) || this.wasm._b3w_apply_torque(this.world, this.handle, s.x, s.y, s.z, t ? 1 : 0);
  }
  mass() {
    return this.wasm._b3w_mass(this.world, this.handle);
  }
  principalInertia() {
    return this.wasm._b3w_principal_inertia(this.world, this.handle, this.scratch), this.readVec3();
  }
  kind() {
    return o[this.wasm._b3w_body_type(this.world, this.handle)] ?? "dynamic";
  }
  setExplicitMass(s) {
    this.explicitMass = s, this.restoreExplicitMass();
  }
  get specifiedMass() {
    return this.explicitMass;
  }
  restoreExplicitMass() {
    this.massDeferred || this.explicitMass !== null && this.explicitMass > 0 && this.wasm._b3w_set_body_mass(this.world, this.handle, this.explicitMass);
  }
  preservingMass(s) {
    s(), this.restoreExplicitMass();
  }
  setKind(s) {
    this.preservingMass(() => this.wasm._b3w_set_body_type(this.world, this.handle, l[s]));
  }
  setGravityScale(s) {
    this.wasm._b3w_set_gravity_scale(this.world, this.handle, s), this.wake();
  }
  centerOfMass() {
    return this.wasm._b3w_body_center(this.world, this.handle, this.scratch), this.readVec3();
  }
  isSleeping() {
    const s = this.wasm._b3w_is_awake(this.world, this.handle);
    return s < 0 ? true : s === 0;
  }
  wake() {
    this.wasm._b3w_wake(this.world, this.handle);
  }
  keepAwake() {
    this.wasm._b3w_keep_awake(this.world, this.handle);
  }
  isValid() {
    return this.wasm._b3w_is_valid(this.world, this.handle) !== 0;
  }
}
export {
  w as B
};
