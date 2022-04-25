"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
// TODO: Check all routes with all possible inputs including null
// ? NOTE: Controllers are tested here
function default_1() {
    describe("Endpoint Tests", () => {
        it("true is true", () => {
            expect(true).toBe(true);
        });
    });
}
exports.default = default_1;
