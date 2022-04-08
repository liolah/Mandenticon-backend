"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMandalaImage = exports.generateRawMandala = void 0;
const mandalaService_1 = require("../services/mandalaService");
const imageProcessing_1 = require("../services/imageProcessing");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const generateRawMandala = (req, res) => {
    const data = req.params.data;
    const mandala = (0, mandalaService_1.createMandala)(data);
    res.send(mandala);
};
exports.generateRawMandala = generateRawMandala;
const generateMandalaImage = async (req, res) => {
    try {
        fs_1.default.rmSync(path_1.default.resolve('temp'), { recursive: true, force: true });
        await (0, imageProcessing_1.processImage)(req.query.width, req.query.height, req.query.format, req.query.greyScale, req.params.data);
        res.sendFile(path_1.default.resolve("temp", `temp.${req.query.format || "png"}`));
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.generateMandalaImage = generateMandalaImage;
