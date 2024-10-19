class Rotations {
    constructor() {
        this.pitch = null;
        this.yaw = null;
        this.ms = 0
        let Rotating = false
        this.stopRotating = false
        register("worldLoad", () => {
            this.yaw = null
            this.pitch = null
            this.ms = 0
        })
        register("step", () => {
            //ChatLib.chat("yaw: " + this.yaw?.toString() + " calcdiff = " + Number((this.yaw - Player.getYaw()) / this.ms))
            //ChatLib.chat("pitch: " + this.pitch?.toString() + "calcdiff = " + Number((this.pitch - Player.getPitch()) / this.ms))
            if(!World.isLoaded() || !Player.getPlayer() || this.stopRotating) return
            if(Rotating) return
            Rotating = true
            let Ryaw = 0
            let Rpitch = 0
            if((this.yaw - Player.getYaw()) / this.ms > (0.6 - this.ms / 1000) ) Ryaw = (0.6 - this.ms / 1000)
            else if((this.yaw - Player.getYaw()) / this.ms < -(0.6 - this.ms / 1000) ) Ryaw = -(0.6 - this.ms / 1000)
            else Ryaw = (this.yaw - Player.getYaw()) / this.ms
            if((this.pitch - Player.getPitch()) / this.ms > (0.6 - this.ms / 1000) ) Rpitch = (0.6 - this.ms / 1000)
            else if((this.pitch - Player.getPitch()) / this.ms < -(0.6 - this.ms / 1000) ) Rpitch = -(0.6 - this.ms / 1000)
            else Rpitch = (this.pitch - Player.getPitch()) / this.ms
            if (this.yaw) {
                Player.getPlayer().field_70177_z += Ryaw
            }
            if (this.pitch) {
                Player.getPlayer().field_70125_A += Rpitch
            }
            Rotating = false
        }).setFps(1000)
    }
    setRot(yaw, pitch, ms) {
        let Fyaw = yaw
        let Fpitch = pitch
        /*
        if(yaw > 180) Fyaw = yaw - 360
        else if(yaw < -180) Fyaw = yaw + 360
        if(pitch > 90) Fpitch = pitch - 180
        else if(pitch < -90) Fpitch = pitch + 180
        */
        if(yaw) this.yaw = Fyaw
        if(pitch) this.pitch = Fpitch
        let Fms = ms + Math.random() * gui.bounceRate - Math.random() * gui.bounceRate
        if(Fms < 1) Fms = 1
        this.ms = Fms / 2 + this.ms / 2
    }
    resetRot() {
        this.pitch
        this.yaw
        this.ms = 0
    }
    stopRotating() {
        this.stopRotating = true
    }
}

export default new Rotations()