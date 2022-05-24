import { prisma } from "../../db.js";

const createChannel = async (recipient_id) => {
  const response = await fetch(
    `${process.env.DISCORD_API_ENDPOINT}/users/@me/channels`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient_id: recipient_id,
      }),
    }
  );

  let body = await response.json();

  return body;
};

export const sendMessage = async (channel_id, message) => {
  const response = await fetch(
    `${process.env.DISCORD_API_ENDPOINT}/channels/${channel_id}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    }
  );

  let body = await response.json();

  return body;
};

export default async function handler(req, res) {
  const { head, body, glasses, accessory } = req.body;

  const matchingSeeds = await prisma.savedSeed.findMany({
    where: {
      AND: [
        {
          head: {
            in: [head, 0],
          },
        },
        {
          body: {
            in: [body, 0],
          },
        },
        {
          glasses: {
            in: [glasses, 0],
          },
        },
        {
          accessory: {
            in: [accessory, 0],
          },
        },
      ],
    },
    include: { accounts: true },
  });

  const msg = await sendMessage("978160637718954054", "helllo");
  matchingSeeds.forEach((matchingSeed) => {
    matchingSeed.accounts.forEach(async (account) => {
      let discordId = account.discordId;
      const channel = await createChannel(discordId);
      const msg = await sendMessage(channel.id, "hello");
    });
  });

  res.status(200).json({ response: "success" });
}
