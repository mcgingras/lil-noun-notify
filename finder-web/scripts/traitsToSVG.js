import { prisma } from "../db.js";
import { buildSVG } from "@nouns/sdk";
import pkg from "@lilnouns/assets";

const { ImageData, getNounData } = pkg;
const {
  palette,
  images: { bodies, heads, glasses, accessories },
} = ImageData;

const BG_COLOR = "DFD7D5";

const traitToSVG = async () => {
  glasses.forEach(async (body, i) => {
    const svgBinary = buildSVG([body], palette, BG_COLOR);
    const svgBase64 = btoa(svgBinary);

    await prisma.trait.create({
      data: {
        localId: i,
        type: "GLASSES",
        svg: svgBase64,
        name: body.filename,
      },
    });
  });
};

traitToSVG();
