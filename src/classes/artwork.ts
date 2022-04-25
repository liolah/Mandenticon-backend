export default class Artwork {
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

  // showArtworkCode() {
  //   console.log(
  //     `Artwork outline: ${this.outline},
  //     Artwork details: ${this.details}`
  //   );
  // }

  decodeBase64(data: string): string {
    const buff = Buffer.from(data, "base64");
    return buff.toString("utf-8");
  }
}
