/**
 *
 * @param {int} recipient_id
 */
export const createChannel = async (recipient_id) => {
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
};

/**
 *
 * @param {int} channel_id
 * @param {string} message
 */
export const sendMessage = async (channel_id, message) => {
  const response = await fetch(
    `${process.env.BLITZ_PUBLIC_API_ENDPOINT}/channels/${channel_id}/messages`,
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
};
