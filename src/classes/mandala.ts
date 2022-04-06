class Artwork {
  scale: number;
  height: number;
  yPan: number;
  xPan: number;
  outline: string;
  details: string;

  constructor(
    scale: number,
    height: number,
    yPan: number,
    xPan: number,
    outline: string,
    details: string
  ) {
    this.scale = scale;
    this.height = height;
    this.yPan = yPan;
    this.xPan = xPan;
    this.outline = this.decodeBase64(outline);
    this.details = this.decodeBase64(details);
  }

  showArtworkCode() {
    console.log(
      `Artwork outline: ${this.outline},
      Artwork details: ${this.details}`
    );
  }

  decodeBase64(data: string): string {
    const buff = Buffer.from(data, "base64");
    return buff.toString("utf-8");
  }
}

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
    }" transform-origin="center center" transform="rotate(0) translate(0, ${
      this.radius + 7
    }) scale(${this.scale})"/>`;
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
      }" transform-origin="center center" transform="rotate(${angle}) translate(0, ${-this
        .radius}) scale(${this.scale})"/>`;
      angle += 360 / this.shapesNum;
    }
    return useElements;
  }
}

class Gradient {
  startColor: number;
  endColor!: number;
  saturation!: number;
  lightness!: number;

  constructor(startColor: number) {
    this.startColor = startColor;
  }

  generateGradientSVGCode(id: string): string {
    return ``;
  }
}

class LinearGradient extends Gradient {
  direction!: "v" | "h";
  constructor(
    startColor: number,
    direction?: "v" | "h",
    saturation?: number,
    lightness?: number
  ) {
    super(startColor);
    this.direction = direction || "v";
    this.endColor = startColor + 60;
    this.saturation = saturation || 50;
    this.lightness = lightness || 50;
  }

  generateGradientSVGCode(id: string): string {
    return `<linearGradient id="gradient-${id}" x1="0%" y1="0%" x2="${
      this.direction == "h" ? 100 : 0
    }%" y2="${this.direction == "v" ? 100 : 0}%">
    <stop offset="0%" stop-color="hsl(${this.startColor}, ${
      this.saturation
    }%, ${this.lightness}%)"/>
    <stop offset="100%" stop-color="hsl(${this.endColor}, ${
      this.saturation
    }%, ${this.lightness}%)"/>
    </linearGradient>`;
  }
}

class RadialGradient extends Gradient {
  radius!: number;
  constructor(
    startColor: number,
    endColor?: number,
    radius?: number,
    saturation?: number,
    lightness?: number
  ) {
    super(startColor);
    this.endColor = endColor || startColor + 180;
    this.saturation = saturation || 50;
    this.lightness = lightness || 90;
    this.radius = radius || 50;
  }

  generateGradientSVGCode(id: string): string {
    return `<radialGradient id="radialGradient-${id}" cx="50%" cy="50%" r="${this.radius}%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="hsl(${this.startColor}, ${this.saturation}%, ${this.lightness}%)"/>
    <stop offset="100%" stop-color="hsl(${this.endColor}, ${this.saturation}%, ${this.lightness}%)"/>
    </radialGradient>`;
  }
}

class Mandala {
  svgHeader = `<svg width="1000" height="1000" viewBox="0 0 1100 1100" xmlns="http://www.w3.org/2000/svg" style="border: #999 solid;">`;
  generalStyle = `<defs><style>.cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.75px;}</style></defs>`;
  imageBackground: LinearGradient | RadialGradient | string | undefined;
  mandalaBackground: string;
  layers: Layer[] = [];
  centerPiece!: CenterPiece;
  hash: string;

  constructor(hash: string, artworksDB: any, doubleLayered?: boolean) {
    this.hash = hash;
    let artworks: Artwork[] = [];
    let gradients: Array<LinearGradient | RadialGradient> = [];
    this.selectArtworksAndGradients(hash, artworks, artworksDB, gradients);
    this.defineCenterPiece(artworks, gradients);
    this.mandalaBackground = `<defs> ${new RadialGradient(
      180,
      0,
      50,
      50,
      90
    ).generateGradientSVGCode("mandalaBackground")} </defs>
    <circle cx="50%" cy="50%" r="48%" stroke="none" fill="url(#radialGradient-mandalaBackground)" />`;
    if (doubleLayered) {
      this.defineDoubleLayers(artworks, gradients, this.layers);
    } else {
      this.defineLayers(artworks, gradients, this.layers);
    }
  }

  selectArtworksAndGradients(
    hash: string,
    artworks: Artwork[],
    artworksCollection: any,
    gradients: Array<LinearGradient | RadialGradient>
  ): void {
    artworks.push(
      new Artwork(
        artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3][
          "initial scale"
        ],
        artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3][
          "height"
        ],
        artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3][
          "yPan"
        ],
        artworksCollection["global xPan"],
        artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3][
          "outline"
        ],
        artworksCollection["Center patterns"][this.getNumberFrom(hash, 0) % 3][
          "details"
        ]
      )
    );
    for (let i = 1; i < 13; i++) {
      artworks.push(
        new Artwork(
          artworksCollection["Layer patterns"][
            this.getNumberFrom(hash, 2 * i - 1, 2) % 55
          ]["initial scale"],
          artworksCollection["Layer patterns"][
            this.getNumberFrom(hash, 2 * i - 1, 2) % 55
          ]["height"],
          artworksCollection["Layer patterns"][
            this.getNumberFrom(hash, 2 * i - 1, 2) % 55
          ]["yPan"],
          artworksCollection["global xPan"],
          artworksCollection["Layer patterns"][
            this.getNumberFrom(hash, 2 * i - 1, 2) % 55
          ]["outline"],
          artworksCollection["Layer patterns"][
            this.getNumberFrom(hash, 2 * i - 1, 2) % 55
          ]["details"]
        )
      );
    }
    gradients.push(
      new RadialGradient(
        this.getNumberFrom(hash, 25, 3) % 360,
        (this.getNumberFrom(hash, 25, 3) % 360) + 60,
        50,
        50,
        50
      )
    );
    for (let j = 28; j < 62; j += 3) {
      gradients.push(new LinearGradient(this.getNumberFrom(hash, j, 3) % 360));
    }
  }

  defineLayers(
    artworks: Artwork[],
    gradients: Array<LinearGradient | RadialGradient>,
    layers: Layer[]
  ) {
    for (let i = 1; i <= 6; i++) {
      layers.push(
        new Layer(
          artworks[i],
          i as unknown as string,
          70,
          6,
          0,
          true,
          gradients[i]
        )
      );
    }
  }

  defineDoubleLayers(
    artworks: Artwork[],
    gradients: Array<LinearGradient | RadialGradient>,
    layers: Layer[]
  ) {
    for (let i = 1; i <= 6; i++) {
      for (let j = 0; j < 2; j++) {
        layers.push(
          new Layer(
            artworks[2 * i - (1 - j)],
            `${i}-${j}`,
            i * 70,
            i * 6,
            (180 / (i * 6)) * j,
            true,
            gradients[2 * i - (1 - j)]
          )
        );
      }
    }
  }

  defineCenterPiece(
    artworks: Artwork[],
    gradients: Array<LinearGradient | RadialGradient>
  ) {
    this.centerPiece = new CenterPiece(
      artworks[0],
      0 as unknown as string,
      70,
      true,
      gradients[0] as RadialGradient
    );
  }

  getNumberFrom(str: string, startIndex: number, length?: number): number {
    const end = length ? startIndex + length : startIndex + 1;
    const hex = str.substring(startIndex, end);
    return parseInt(hex, 16);
  }

  generateSVGCode(): string {
    let layersCode = ``;
    for (let layer of this.layers) {
      layersCode = `${layer.generatePatternSVGCode()} ${layersCode}`;
    }
    return `${this.svgHeader} ${this.generalStyle} ${
      this.mandalaBackground
    } ${layersCode} ${this.centerPiece.generatePatternSVGCode()} </svg>`;
  }
}

export default Mandala;
