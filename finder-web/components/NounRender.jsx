import { useEffect, useState } from "react";

const NounRender = ({ seed, className }) => {
  const [b64, setb64] = useState();

  const filteredSeed = Object.keys(seed).reduce((acc, entry) => {
    if (seed[entry] !== "-1") {
      acc[entry] = seed[entry];
    }
    return acc;
  }, {});

  useEffect(() => {
    const _ = async () => {
      const res = await fetch("/api/getNoun", {
        method: "POST",
        body: JSON.stringify(filteredSeed),
      });
      const body = await res.json();

      setb64(body.response);
    };
    _();
  }, [seed]);

  return (
    <img
      className={className}
      src={
        Object.keys(filteredSeed).length === 0
          ? "/lil-loading-skull.gif"
          : `data:image/svg+xml;base64,${b64}`
      }
    />
  );
};

export default NounRender;
