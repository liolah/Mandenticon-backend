import Artwork from "./Artwork";
import { CenterPiece, Layer } from "./pattern";
import { LinearGradient, RadialGradient } from "./Gradient";

class Mandala {
  svgHeader = `<svg width="1000" height="1000" viewBox="0 0 1100 1100" xmlns="http://www.w3.org/2000/svg">`;
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
    <circle cx="50%" cy="50%" r="42%" stroke="none" fill="url(#radialGradient-mandalaBackground)" />`;
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
          i * 70,
          i * 6,
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
