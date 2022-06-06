import { prisma } from "../../db.js";

export default async function handler(req, res) {
  let params = JSON.parse(req.body);
  let heads = await prisma.trait.findMany({
    where: { type: params.type },
  });

  res.status(200).json({ response: heads });
}
