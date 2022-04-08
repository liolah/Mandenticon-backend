"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_svg_to_jpeg_1 = require("convert-svg-to-jpeg");
const convert_svg_to_png_1 = require("convert-svg-to-png");
async function svgRasterizer(svg, format, width, height) {
    if (format == "png") {
        return await (0, convert_svg_to_png_1.convert)(svg, {
            height: height || 500,
            width: width || 500,
            quality: 100,
        });
    }
    else {
        return await (0, convert_svg_to_jpeg_1.convert)(svg, {
            height: height || 500,
            width: width || 500,
            quality: 100,
        });
    }
}
exports.default = svgRasterizer;
