import { createMandala } from "./mandalaService";
import { writeFileSync, readFileSync } from "fs";
import { convertFile } from "convert-svg-to-jpeg";
import { convertFile as convertFilePng } from "convert-svg-to-png";

createMandala("malak");

export async function test() {
  const inputFilePath = __dirname + "\\test.svg";
  const outputFilePath = await convertFilePng(inputFilePath);
}
