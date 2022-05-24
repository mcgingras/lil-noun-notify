const BotAuth = () => {
  return (
    <a
      href={`https://discord.com/api/oauth2/authorize?&client_id=977779948590886952&permissions=268435456&scope=bot`}
      className="bg-red-500 rounded text-white py-2"
    >
      Auth Bot
    </a>
  );
};

export default BotAuth;
