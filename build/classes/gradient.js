"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadialGradient = exports.LinearGradient = void 0;
class Gradient {
    constructor(startColor) {
        this.startColor = startColor;
    }
    generateGradientSVGCode(id) {
        return ``;
    }
}
class LinearGradient extends Gradient {
    constructor(startColor, direction, saturation, lightness) {
        super(startColor);
        this.direction = direction || "v";
        this.endColor = startColor + 60;
        this.saturation = saturation || 50;
        this.lightness = lightness || 50;
    }
    generateGradientSVGCode(id) {
        return `<linearGradient id="gradient-${id}" x1="0%" y1="0%" x2="${this.direction == "h" ? 100 : 0}%" y2="${this.direction == "v" ? 100 : 0}%">
    <stop offset="0%" stop-color="hsl(${this.startColor}, ${this.saturation}%, ${this.lightness}%)"/>
    <stop offset="100%" stop-color="hsl(${this.endColor}, ${this.saturation}%, ${this.lightness}%)"/>
    </linearGradient>`;
    }
}
exports.LinearGradient = LinearGradient;
class RadialGradient extends Gradient {
    constructor(startColor, endColor, radius, saturation, lightness) {
        super(startColor);
        this.endColor = endColor || startColor + 180;
        this.saturation = saturation || 50;
        this.lightness = lightness || 90;
        this.radius = radius || 50;
    }
    generateGradientSVGCode(id) {
        return `<radialGradient id="radialGradient-${id}" cx="50%" cy="50%" r="${this.radius}%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="hsl(${this.startColor}, ${this.saturation}%, ${this.lightness}%)"/>
    <stop offset="100%" stop-color="hsl(${this.endColor}, ${this.saturation}%, ${this.lightness}%)"/>
    </radialGradient>`;
    }
}
exports.RadialGradient = RadialGradient;
