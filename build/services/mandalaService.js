"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMandala = void 0;
const mandala_1 = __importDefault(require("../classes/mandala"));
const Patterns_json_1 = __importDefault(require("../Assets/Patterns.json"));
const hashService_1 = require("./hashService");
function createMandala(data) {
    return new mandala_1.default((0, hashService_1.hash)(data), Patterns_json_1.default, true).generateSVGCode();
}
exports.createMandala = createMandala;
