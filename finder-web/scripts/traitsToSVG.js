import { prisma } from "../db.js";
import { buildSVG } from "@nouns/sdk";
import pkg from "@lilnouns/assets";

const { ImageData, getNounData } = pkg;
const {
  palette,
  images: { bodies, heads, glasses, accessories },
} = ImageData;

const BG_COLOR = "FFFFFF";

const traitToSVG = async () => {
  accessories.forEach(async (body, i) => {
    const svgBinary = buildSVG([body], palette, BG_COLOR);
    const svgBase64 = btoa(svgBinary);

    await prisma.trait.create({
      data: {
        localId: i,
        type: "ACCESSORY",
        svg: svgBase64,
      },
    });
  });
};

traitToSVG();
