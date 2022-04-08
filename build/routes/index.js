"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const router = (0, express_1.Router)();
router.get("/raw/:data", indexController_1.generateRawMandala);
router.get("/api/:data", indexController_1.generateMandalaImage);
exports.default = router;
