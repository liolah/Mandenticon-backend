"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = exports.isValidRequestParameters = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const mandalaService_1 = require("./mandalaService");
const svgRasterizationService_1 = __importDefault(require("./svgRasterizationService"));
const path_1 = __importDefault(require("path"));
const isValidRequestParameters = (format, height, width) => {
    const acceptableFormats = [
        "heic",
        "heif",
        "avif",
        "jpeg",
        "jpg",
        "png",
        "raw",
        "tiff",
        "tif",
        "webp",
        "gif",
        "jp2",
        "jpx",
        "j2k",
        "j2c",
    ];
    if (!acceptableFormats.includes(format) && format != undefined) {
        throw new Error(`The format requested is not supported!`);
    }
    else if ((height < 16 || height > 4096) && height != undefined) {
        throw new Error(`Image height must be between 16 and 4096. Enter a valid height!`);
    }
    else if ((width < 16 || width > 4096) && width != undefined) {
        throw new Error(`Image width must be between 16 and 4096. Enter a valid width!`);
    }
    else {
        return true;
    }
};
exports.isValidRequestParameters = isValidRequestParameters;
const processImage = async (w, h, f, greyScale, d) => {
    try {
        isValidRequestParameters(f, h, w);
        const data = d || `Something`;
        const mandala = (0, mandalaService_1.createMandala)(data);
        let rasterizedMandala;
        const height = h || 1200;
        const width = w || 1200;
        const format = f || "png";
        const greyScaleEffect = greyScale || false;
        const dir = path_1.default.resolve('temp');
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        let processedImage;
        if (greyScaleEffect) {
            rasterizedMandala = await (0, svgRasterizationService_1.default)(mandala, format, width, height);
            processedImage = await (0, sharp_1.default)(rasterizedMandala)
                .greyscale()
                .toFormat(format)
                .toFile(path_1.default.resolve(dir, `temp.${format}`));
        }
        else {
            rasterizedMandala = await (0, svgRasterizationService_1.default)(mandala, format, width, height);
            processedImage = await (0, sharp_1.default)(rasterizedMandala)
                .toFormat(format)
                .toFile(path_1.default.resolve(dir, `temp.${format}`));
        }
        return processedImage;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.processImage = processImage;
