"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/hello", (req, res) => {
    res.send("Hello Developer!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
