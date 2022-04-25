"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Artwork {
    constructor(scale, height, yPan, xPan, outline, details) {
        this.scale = scale;
        this.height = height;
        this.yPan = yPan;
        this.xPan = xPan;
        this.outline = this.decodeBase64(outline);
        this.details = this.decodeBase64(details);
    }
    // showArtworkCode() {
    //   console.log(
    //     `Artwork outline: ${this.outline},
    //     Artwork details: ${this.details}`
    //   );
    // }
    decodeBase64(data) {
        const buff = Buffer.from(data, "base64");
        return buff.toString("utf-8");
    }
}
exports.default = Artwork;
