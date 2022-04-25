"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artwork_1 = __importDefault(require("./Artwork"));
const pattern_1 = require("./pattern");
const Gradient_1 = require("./Gradient");
class Mandala {
    constructor(hash, artworksDB, doubleLayered) {
        this.svgHeader = `<svg width="1000" height="1000" viewBox="0 0 1100 1100" xmlns="http://www.w3.org/2000/svg">`;
        this.generalStyle = `<defs><style>.cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.75px;}</style></defs>`;
        this.layers = [];
        this.hash = hash;
        let artworks = [];
        let gradients = [];
        this.selectArtworksAndGradients(hash, artworks, artworksDB, gradients);
        this.defineCenterPiece(artworks, gradients);
        this.mandalaBackground = `<defs> ${new Gradient_1.RadialGradient(180, 0, 50, 50, 90).generateGradientSVGCode("mandalaBackground")} </defs>
    <circle cx="50%" cy="50%" r="42%" stroke="none" fill="url(#radialGradient-mandalaBackground)" />`;
        if (doubleLayered) {
            this.defineDoubleLayers(artworks, gradients, this.layers);
        }
        else {
            this.defineLayers(artworks, gradients, this.layers);
        }
    }
    selectArtworksAndGradients(hash, artworks, artworksCollection, gradients) {
        artworks.push(new Artwork_1.default(artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["initial scale"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["height"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["yPan"], artworksCollection["global xPan"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["outline"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["details"]));
        for (let i = 1; i < 13; i++) {
            artworks.push(new Artwork_1.default(artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["initial scale"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["height"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["yPan"], artworksCollection["global xPan"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["outline"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["details"]));
        }
        gradients.push(new Gradient_1.RadialGradient(this.getNumberFrom(hash, 25, 3) % 360, (this.getNumberFrom(hash, 25, 3) % 360) + 60, 50, 50, 50));
        for (let j = 28; j < 62; j += 3) {
            gradients.push(new Gradient_1.LinearGradient(this.getNumberFrom(hash, j, 3) % 360));
        }
    }
    defineLayers(artworks, gradients, layers) {
        for (let i = 1; i <= 6; i++) {
            layers.push(new pattern_1.Layer(artworks[i], i, i * 70, i * 6, 0, true, gradients[i]));
        }
    }
    defineDoubleLayers(artworks, gradients, layers) {
        for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < 2; j++) {
                layers.push(new pattern_1.Layer(artworks[2 * i - (1 - j)], `${i}-${j}`, i * 70, i * 6, (180 / (i * 6)) * j, true, gradients[2 * i - (1 - j)]));
            }
        }
    }
    defineCenterPiece(artworks, gradients) {
        this.centerPiece = new pattern_1.CenterPiece(artworks[0], 0, 70, true, gradients[0]);
    }
    getNumberFrom(str, startIndex, length) {
        const end = length ? startIndex + length : startIndex + 1;
        const hex = str.substring(startIndex, end);
        return parseInt(hex, 16);
    }
    generateSVGCode() {
        let layersCode = ``;
        for (let layer of this.layers) {
            layersCode = `${layer.generatePatternSVGCode()} ${layersCode}`;
        }
        return `${this.svgHeader} ${this.generalStyle} ${this.mandalaBackground} ${layersCode} ${this.centerPiece.generatePatternSVGCode()} </svg>`;
    }
}
exports.default = Mandala;
