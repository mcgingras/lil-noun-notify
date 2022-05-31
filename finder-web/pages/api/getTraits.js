import { prisma } from "../../db.js";

export default async function handler(req, res) {
  let heads = await prisma.trait.findMany({
    where: { type: "ACCESSORY" },
  });

  res.status(200).json({ response: heads });
}
