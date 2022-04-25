"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = exports.CenterPiece = void 0;
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
exports.CenterPiece = CenterPiece;
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
exports.Layer = Layer;
