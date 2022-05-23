import { prisma } from "../../db.js";
// import { createChannel } from "../../utils/discord.js";

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

  return response;
};

const demo = async () => {
  let head = 1;
  let body = 1;
  let glasses = 1;
  let accessory = 1;

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
    include: {
      accounts: true,
    },
  });

  matchingSeeds.forEach((matchingSeed) => {
    matchingSeed.accounts.forEach(async (account) => {
      let discordId = account.discordId;
      const channel = await createChannel(discordId);
      console.log(channel);
    });
  });
};

demo();
