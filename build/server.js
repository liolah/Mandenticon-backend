"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = process.env.Port || 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(index_1.default);
app.get("/", (req, res) => {
    res.send('Hello, users!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}, Address: http://localhost:${port}`);
});
exports.default = app;
// http://localhost:4000/api/Malak?width=2000&height=2000&r=0&b=150&g=150&greyScale=true
