import { useEffect, useState } from "react";

const NounRender = ({ seed }) => {
  const [b64, setb64] = useState();

  console.log(b64);

  useEffect(() => {
    const _ = async () => {
      const res = await fetch("/api/getNoun", {
        method: "POST",
        body: JSON.stringify({
          background: 1,
          head: seed.head,
          body: seed.body,
          glasses: seed.glasses,
          accessory: seed.accessory,
        }),
      });
      const body = await res.json();

      setb64(body.response);
    };
    _();
  }, [seed]);

  return (
    <img
      className="h-[200px] rounded-lg"
      src={`data:image/svg+xml;base64,${b64}`}
    />
  );
};

export default NounRender;
