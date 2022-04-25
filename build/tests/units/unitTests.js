"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// * Test objects
const testObjects_1 = require("../objects/testObjects");
function default_1() {
    describe("Check all functions's expected output and exception handling", () => {
        it('Method "decodeBase64" in class Artworks decodes base64 properly', () => {
            expect(testObjects_1.testLayerArtwork.decodeBase64("9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08")).toEqual("test");
        });
        it('Method "generateGradientSVGCode" in class LinearGradient outputs the expected SVG code', () => {
            expect(testObjects_1.testLinearGradient.generateGradientSVGCode("test"))
                .toEqual(`<linearGradient id="gradient-test" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="hsl(120, 50%, 50%)"/>
    <stop offset="100%" stop-color="hsl(180, 50%, 50%)"/>
    </linearGradient>`);
        });
        it('Method "generateGradientSVGCode" in class RadialGradient outputs the expected SVG code', () => {
            expect(testObjects_1.testRadialGradient.generateGradientSVGCode("test"))
                .toEqual(`<radialGradient id="radialGradient-test" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="hsl(120, 50%, 50%)"/>
    <stop offset="100%" stop-color="hsl(240, 50%, 50%)"/>
    </radialGradient>`);
        });
    });
}
exports.default = default_1;
//
