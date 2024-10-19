import SmoothRotations from "./SmoothRotations"
const MathHelper = Java.type("net.minecraft.util.MathHelper")
let rotating = false
function lookAt(x, z, ms) {
    try {
        startYaw = Player.getPlayer().field_70177_z
        startPitch = Player.getPlayer().field_70125_A
        let msLookVelo = ms
        if (msLookVelo == 0) msLookVelo = 1
        let hoekYaw2
        let AngleYaw2
        let PlayerAngleYaw = Player.getPlayer().field_70177_z
        PlayerAngleYaw %= 360
        let dX = Player.getX() - x + 0.000001
        let dZ = Player.getZ() - z + 0.000001
        if (dX < 0.0 && dZ < 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX)) + 180
        } else if (dZ < 0.0 && dX > 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX)) + 360
        } else if (dZ > 0.0 && dX < 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX)) + 180
        } else if (dZ > 0.0 && dX > 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX))
        }
        hoekYaw2 = AngleYaw2 - PlayerAngleYaw + 90
        if (hoekYaw2 > 180) {
            hoekYaw2 -= 360
        } if (hoekYaw2 < -180) {
            hoekYaw2 += 360
        }
        SmoothRotations.setRot(hoekYaw2 + Player.getYaw() + 0.000001, null, msLookVelo)
    } catch (e) { }
}

function lookAtSmooth(x, y, z, ms) {
    try {
        startYaw = Player.getPlayer().field_70177_z
        startPitch = Player.getPlayer().field_70125_A
        let msLookVelo = ms
        let hoekYaw2
        let hoekPitch2
        let AngleYaw2
        let PlayerAngleYaw = Player.getPlayer().field_70177_z
        PlayerAngleYaw %= 360
        let dX = Player.getX() - x + 0.000001
        let dZ = Player.getZ() - z + 0.000001
        let dY = Player.getY() - y
        let dis = Math.sqrt((dX * dX) + (dZ * dZ))
        if (dX < 0.0 && dZ < 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX)) + 180
        } else if (dZ < 0.0 && dX > 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX)) + 360
        } else if (dZ > 0.0 && dX < 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX)) + 180
        } else if (dZ > 0.0 && dX > 0.0) {
            AngleYaw2 = radians_to_degrees(Math.atan(dZ / dX))
        }
        hoekYaw2 = AngleYaw2 - PlayerAngleYaw + 90
        if (hoekYaw2 > 180) {
            hoekYaw2 -= 360
        } if (hoekYaw2 < -180) {
            hoekYaw2 += 360
        }
        hoekPitch2 = radians_to_degrees(Math.atan(dY / dis)) - Player.getPlayer().field_70125_A
        SmoothRotations.setRot(hoekYaw2 + Player.getYaw() + 0.000001, hoekPitch2 + Player.getPitch() + 0.000001, msLookVelo)
    } catch (e) { }
}

function lookAtCheck(x, y, z) {
    let hoekPitch
    let hoekYaw
    let PlayerAngleYaw = Player.getPlayer().field_70177_z
    let AngleYaw
    PlayerAngleYaw %= 360
    let dX = Player.getX() - x + 0.00001
    let dZ = Player.getZ() - z + 0.00001
    let dY = Player.getY() - y
    let dis = Math.sqrt((dX * dX) + (dZ * dZ))
    if (dX < 0.0 && dZ < 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX)) + 180
    } else if (dZ < 0.0 && dX > 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX)) + 360
    } else if (dZ > 0.0 && dX < 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX)) + 180
    } else if (dZ > 0.0 && dX > 0.0) {
        AngleYaw = radians_to_degrees(Math.atan(dZ / dX))
    }
    hoekYaw = AngleYaw - PlayerAngleYaw + 90

    if (hoekYaw > 180) {
        hoekYaw -= 360
    } if (hoekYaw < -180) {
        hoekYaw += 360
    }

    hoekPitch = radians_to_degrees(Math.atan(dY / dis)) - Player.getPlayer().field_70125_A

    if (hoekPitch > 90) {
        hoekPitch -= 180
    } if (hoekPitch < -90) {
        hoekPitch += 180
    }

    return {
        "yaw": hoekYaw,
        "pitch": hoekPitch
    }
}

let rotatingPitch = false
function levelPitch(pitch, ms) {
    try {
        SmoothRotations.setRot(null, pitch + 0.000001, ms)
    } catch (e) { }
}
let rotate = false
function rotateTo(yaw, pitch, ms) {
    try {
        new Thread(() => {
            if (!rotate) {
                rotate = true
                for (let i = 0; i < ms; i++) {
                    try {
                        if (yaw) Player.getPlayer().field_70177_z += ((yaw - Player.getYaw()) / ms)
                        if (pitch) Player.getPlayer().field_70125_A += ((pitch - Player.getPitch()) / ms)
                        Thread.sleep(1)
                        if (Math.floor(Math.random() * gui.bounceRate) == 1) {
                            rotate = false
                        } else {
                            rotate = true
                        }
                    } catch (e) { ChatLib.chat("a") }
                }
                rotate = false
            }
        }).start()
    } catch (e) { }
}
function getServerAngles(vec) {
    let mc = Client.getMinecraft()
    let diffX = vec.field_72450_a - mc.field_71439_g.field_70165_t;
    let diffY = vec.field_72448_b - mc.field_71439_g.field_70163_u + mc.field_71439_g.func_70047_e();
    let diffZ = vec.field_72449_c - mc.field_71439_g.field_70161_v;
    let yaw = (Math.atan2(diffZ, diffX) * 180 / Math.PI) - 90;
    let dist = MathHelper.func_76133_a(diffX * diffX + diffZ * diffZ);
    let pitch = -(Math.atan2(diffY, dist) * 180 / Math.PI);
    return { yaw: Player.getYaw() + MathHelper.func_76142_g(yaw - Player.getYaw()), pitch: Player.getPitch() + MathHelper.func_76142_g(pitch - Player.getPitch()) };
}
function getAngles(en) {
    return getServerAngles(new Vec3(en.field_70165_t, en.field_70163_u + en.func_70047_e() - en.field_70131_O / 1.5 - 2, en.field_70161_v));
}
function isWithinFOV(yaw, fov) {
    let yawDifference = Math.abs(yaw)
    return (yawDifference < fov && yawDifference > -fov)
}
function isWithinPitch(pitch, pitchRange) {
    let pitchDifference = Math.abs(pitch)
    return (pitchDifference < pitchRange && pitchDifference > -pitchRange)
}
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}
function stop() {
    SmoothRotations.stopRotating();
    SmoothRotations.resetRot();
}

export { lookAt, lookAtSmooth, lookAtCheck, isWithinFOV, isWithinPitch, levelPitch, getServerAngles, rotateTo, stop }
