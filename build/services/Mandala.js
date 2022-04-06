"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patterns_json_1 = __importDefault(require("../Assets/patterns.json"));
function default_1() {
    console.log(patterns_json_1.default);
}
exports.default = default_1;
const calculateScalingFactor = (r1, r2, h, sidesNum1, sidesNum2, scale) => {
    const h2 = (r2 / r1) * (sidesNum1 / sidesNum2) * h;
    const initialSideLength = 2 * (r1 + h) * Math.tan(Math.PI / sidesNum1);
    const finalSideLength = 2 * (r2 + h2) * Math.tan(Math.PI / sidesNum2);
    return scale * (finalSideLength / initialSideLength);
};
// Generate the required use elements
function generateUseElements(xTranslation, yTranslation, scale, shapesNumber, shapeId, startingAngle = 0) {
    let useElements = ``;
    let angle = startingAngle;
    for (let i = 0; i < shapesNumber; i++) {
        useElements += `<use href="#${shapeId}" transform-origin="center center" transform="rotate(${angle}) translate(${xTranslation}, ${yTranslation}) scale(${scale})"/>`;
        angle += 360 / shapesNumber;
    }
    return useElements;
}
