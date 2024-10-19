import { levelPitch, lookAt, lookAtSmooth, stop} from "./Utils/Rotations"

register("command", () => {
    ChatLib.chat("Starting...");
    //Convert the arguments to numbers, if needed
    x = 1;//parseFloat(x);
    y = 1;//parseFloat(y);
    z = 1;//parseFloat(z);
    ms = 10;//parseInt(ms);

    // Call the lookAtSmooth function with the provided arguments
    lookAtSmooth(x, y, z, ms);
    //ChatLib.chat("loaded");
}).setName("rotate");

register("command", () => {
ChatLib.chat("stopping...");
stop();

}).setName("stop");
