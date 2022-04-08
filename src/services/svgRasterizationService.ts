import { convert as convertJpeg } from "convert-svg-to-jpeg";
import { convert as convertPng } from "convert-svg-to-png";

export default async function svgRasterizer(
  svg: string,
  format?: string,
  width?: number,
  height?: number
) {
  if (format == "png") {
    return await convertPng(svg, {
      height: height || 500,
      width: width || 500,
      quality: 100,
    });
  } else {
    return await convertJpeg(svg, {
      height: height || 500,
      width: width || 500,
      quality: 100,
    });
  }
}
