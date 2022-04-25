import Artwork from "./artwork";
import { LinearGradient, RadialGradient } from "./gradient";

class Pattern {
  id!: string;
  clsName!: string;
  artwork: Artwork;
  gradient: LinearGradient | RadialGradient | undefined;
  patternHeader!: String;
  symbolElement!: string;
  useElements!: string;
  scale!: number;
  radius!: number;
  customStyle!: string;
  useDetails = true;

  constructor(
    artwork: Artwork,
    radius: number,
    gradient?: LinearGradient | RadialGradient,
    useDetails?: boolean
  ) {
    this.artwork = artwork;
    this.radius = radius;
    this.gradient = gradient;
    this.useDetails = useDetails || true;
  }

  calculateScale(): number {
    return 0;
  }

  renameArtworkOutlineClass(): void {
    this.artwork.outline = this.artwork.outline.replaceAll(
      "cls-1",
      this.clsName
    );
  }

  generateUseElements(): string {
    return "";
  }

  generatePatternSVGCode(): string {
    return `${this.symbolElement} ${this.customStyle} ${this.useElements}`;
  }
}

class CenterPiece extends Pattern {
  constructor(
    artwork: Artwork,
    id: string,
    radius: number,
    useDetails?: boolean,
    gradient?: RadialGradient
  ) {
    super(artwork, radius, gradient, useDetails);
    this.id = `CenterPiece-${id}`;
    this.clsName = `cls-${this.id}`;
    this.scale = this.calculateScale();
    this.customStyle = gradient
      ? `<defs><style>.${this.clsName}{fill:url(#radialGradient-${
          this.id
        });}</style>${this.gradient?.generateGradientSVGCode(this.id)}</defs>`
      : `<defs><style>.${this.clsName}{fill:#fff;}</style></defs>`;
    this.useElements = this.generateUseElements();
    this.renameArtworkOutlineClass();
    this.patternHeader = `<symbol id="${this.id}" viewBox="${this.artwork.xPan} ${this.artwork.yPan} 1000 1000">`;
    this.symbolElement = `${this.patternHeader} ${this.artwork.outline} ${
      this.useDetails ? this.artwork.details : ""
    } </symbol>`;
  }

  calculateScale(): number {
    return (
      this.artwork.scale *
      ((this.radius + (this.radius / 100) * this.artwork.height) /
        (100 + this.artwork.height))
    );
  }

  generateUseElements(): string {
    return `<use href="#${
      this.id
    }" transform-origin="center center" transform=" rotate(0) translate(0, ${
      this.radius + 7
    }) scale(${this.scale.toFixed(5)})"/>`;
  }
}

class Layer extends Pattern {
  shapesNum: number;
  rotationAngle: number;

  constructor(
    artwork: Artwork,
    id: string,
    radius: number,
    shapesNum?: number,
    rotationAngle?: number,
    useDetails?: boolean,
    gradient?: LinearGradient | RadialGradient
  ) {
    super(artwork, radius, gradient, useDetails);
    this.id = `Layer-${id}`;
    this.clsName = `cls-${this.id}`;
    this.customStyle = gradient
      ? `<defs><style>.${this.clsName}{fill:url(#gradient-${
          this.id
        });}</style>${this.gradient?.generateGradientSVGCode(this.id)}</defs>`
      : `<defs><style>.${this.clsName}{fill:#fff;}</style></defs>`;
    this.shapesNum = shapesNum || 6;
    this.rotationAngle = rotationAngle || 0;
    this.scale = this.calculateScale();
    this.useElements = this.generateUseElements();
    this.renameArtworkOutlineClass();
    this.patternHeader = `<symbol id="${this.id}" viewBox="${this.artwork.xPan} ${this.artwork.yPan} 1000 1000">`;
    this.symbolElement = `${this.patternHeader} ${this.artwork.outline} ${
      this.useDetails ? this.artwork.details : ""
    } </symbol>`;
  }

  calculateScale(): number {
    return (
      this.artwork.scale *
      (((this.radius +
        (this.radius / 100) * (8 / this.shapesNum) * this.artwork.height) *
        Math.tan(Math.PI / this.shapesNum)) /
        ((100 + this.artwork.height) * Math.tan(Math.PI / 8)))
    );
  }

  generateUseElements() {
    let useElements = ``;
    let angle = this.rotationAngle;
    for (let i = 0; i < this.shapesNum; i++) {
      useElements += `<use href="#${
        this.id
      }" transform-origin="center center" transform="rotate(${angle}) translate(0, -${
        this.radius
      }) scale(${this.scale.toFixed(5)})"/>`;
      angle += 360 / this.shapesNum;
    }
    return useElements;
  }
}

export { CenterPiece, Layer };
