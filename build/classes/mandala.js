"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Artwork {
    constructor(scale, height, yPan, xPan, outline, details) {
        this.scale = scale;
        this.height = height;
        this.yPan = yPan;
        this.xPan = xPan;
        this.outline = this.decodeBase64(outline);
        this.details = this.decodeBase64(details);
    }
    showArtworkCode() {
        console.log(`Artwork outline: ${this.outline},
      Artwork details: ${this.details}`);
    }
    decodeBase64(data) {
        const buff = Buffer.from(data, "base64");
        return buff.toString("utf-8");
    }
}
class Pattern {
    constructor(artwork, radius, gradient, useDetails) {
        this.useDetails = true;
        this.artwork = artwork;
        this.radius = radius;
        this.gradient = gradient;
        this.useDetails = useDetails || true;
    }
    calculateScale() {
        return 0;
    }
    renameArtworkOutlineClass() {
        this.artwork.outline = this.artwork.outline.replaceAll("cls-1", this.clsName);
    }
    generateUseElements() {
        return "";
    }
    generatePatternSVGCode() {
        return `${this.symbolElement} ${this.customStyle} ${this.useElements}`;
    }
}
class CenterPiece extends Pattern {
    constructor(artwork, id, radius, useDetails, gradient) {
        super(artwork, radius, gradient, useDetails);
        this.id = `CenterPiece-${id}`;
        this.clsName = `cls-${this.id}`;
        this.scale = this.calculateScale();
        this.customStyle = gradient
            ? `<defs><style>.${this.clsName}{fill:url(#radialGradient-${this.id});}</style>${this.gradient?.generateGradientSVGCode(this.id)}</defs>`
            : `<defs><style>.${this.clsName}{fill:#fff;}</style></defs>`;
        this.useElements = this.generateUseElements();
        this.renameArtworkOutlineClass();
        this.patternHeader = `<symbol id="${this.id}" viewBox="${this.artwork.xPan} ${this.artwork.yPan} 1000 1000">`;
        this.symbolElement = `${this.patternHeader} ${this.artwork.outline} ${this.useDetails ? this.artwork.details : ""} </symbol>`;
    }
    calculateScale() {
        return (this.artwork.scale *
            ((this.radius + (this.radius / 100) * this.artwork.height) /
                (100 + this.artwork.height)));
    }
    generateUseElements() {
        return `<use href="#${this.id}" transform-origin="center center" transform=" rotate(0) translate(0, ${this.radius + 7}) scale(${this.scale.toFixed(5)})"/>`;
    }
}
class Layer extends Pattern {
    constructor(artwork, id, radius, shapesNum, rotationAngle, useDetails, gradient) {
        super(artwork, radius, gradient, useDetails);
        this.id = `Layer-${id}`;
        this.clsName = `cls-${this.id}`;
        this.customStyle = gradient
            ? `<defs><style>.${this.clsName}{fill:url(#gradient-${this.id});}</style>${this.gradient?.generateGradientSVGCode(this.id)}</defs>`
            : `<defs><style>.${this.clsName}{fill:#fff;}</style></defs>`;
        this.shapesNum = shapesNum || 6;
        this.rotationAngle = rotationAngle || 0;
        this.scale = this.calculateScale();
        this.useElements = this.generateUseElements();
        this.renameArtworkOutlineClass();
        this.patternHeader = `<symbol id="${this.id}" viewBox="${this.artwork.xPan} ${this.artwork.yPan} 1000 1000">`;
        this.symbolElement = `${this.patternHeader} ${this.artwork.outline} ${this.useDetails ? this.artwork.details : ""} </symbol>`;
    }
    calculateScale() {
        return (this.artwork.scale *
            (((this.radius +
                (this.radius / 100) * (8 / this.shapesNum) * this.artwork.height) *
                Math.tan(Math.PI / this.shapesNum)) /
                ((100 + this.artwork.height) * Math.tan(Math.PI / 8))));
    }
    generateUseElements() {
        let useElements = ``;
        let angle = this.rotationAngle;
        for (let i = 0; i < this.shapesNum; i++) {
            useElements += `<use href="#${this.id}" transform-origin="center center" transform="rotate(${angle}) translate(0, -${this.radius}) scale(${this.scale.toFixed(5)})"/>`;
            angle += 360 / this.shapesNum;
        }
        return useElements;
    }
}
class Gradient {
    constructor(startColor) {
        this.startColor = startColor;
    }
    generateGradientSVGCode(id) {
        return ``;
    }
}
class LinearGradient extends Gradient {
    constructor(startColor, direction, saturation, lightness) {
        super(startColor);
        this.direction = direction || "v";
        this.endColor = startColor + 60;
        this.saturation = saturation || 50;
        this.lightness = lightness || 50;
    }
    generateGradientSVGCode(id) {
        return `<linearGradient id="gradient-${id}" x1="0%" y1="0%" x2="${this.direction == "h" ? 100 : 0}%" y2="${this.direction == "v" ? 100 : 0}%">
    <stop offset="0%" stop-color="hsl(${this.startColor}, ${this.saturation}%, ${this.lightness}%)"/>
    <stop offset="100%" stop-color="hsl(${this.endColor}, ${this.saturation}%, ${this.lightness}%)"/>
    </linearGradient>`;
    }
}
class RadialGradient extends Gradient {
    constructor(startColor, endColor, radius, saturation, lightness) {
        super(startColor);
        this.endColor = endColor || startColor + 180;
        this.saturation = saturation || 50;
        this.lightness = lightness || 90;
        this.radius = radius || 50;
    }
    generateGradientSVGCode(id) {
        return `<radialGradient id="radialGradient-${id}" cx="50%" cy="50%" r="${this.radius}%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="hsl(${this.startColor}, ${this.saturation}%, ${this.lightness}%)"/>
    <stop offset="100%" stop-color="hsl(${this.endColor}, ${this.saturation}%, ${this.lightness}%)"/>
    </radialGradient>`;
    }
}
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
        this.mandalaBackground = `<defs> ${new RadialGradient(180, 0, 50, 50, 90).generateGradientSVGCode("mandalaBackground")} </defs>
    <circle cx="50%" cy="50%" r="48%" stroke="none" fill="url(#radialGradient-mandalaBackground)" />`;
        if (doubleLayered) {
            this.defineDoubleLayers(artworks, gradients, this.layers);
        }
        else {
            this.defineLayers(artworks, gradients, this.layers);
        }
    }
    selectArtworksAndGradients(hash, artworks, artworksCollection, gradients) {
        artworks.push(new Artwork(artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["initial scale"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["height"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["yPan"], artworksCollection["global xPan"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["outline"], artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3]["details"]));
        for (let i = 1; i < 13; i++) {
            artworks.push(new Artwork(artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["initial scale"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["height"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["yPan"], artworksCollection["global xPan"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["outline"], artworksCollection["Layer patterns"][this.getNumberFrom(hash, 2 * i - 1, 2) % 55]["details"]));
        }
        gradients.push(new RadialGradient(this.getNumberFrom(hash, 25, 3) % 360, (this.getNumberFrom(hash, 25, 3) % 360) + 60, 50, 50, 50));
        for (let j = 28; j < 62; j += 3) {
            gradients.push(new LinearGradient(this.getNumberFrom(hash, j, 3) % 360));
        }
    }
    defineLayers(artworks, gradients, layers) {
        for (let i = 1; i <= 6; i++) {
            layers.push(new Layer(artworks[i], i, 70, 6, 0, true, gradients[i]));
        }
    }
    defineDoubleLayers(artworks, gradients, layers) {
        for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < 2; j++) {
                layers.push(new Layer(artworks[2 * i - (1 - j)], `${i}-${j}`, i * 70, i * 6, (180 / (i * 6)) * j, true, gradients[2 * i - (1 - j)]));
            }
        }
    }
    defineCenterPiece(artworks, gradients) {
        this.centerPiece = new CenterPiece(artworks[0], 0, 70, true, gradients[0]);
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
