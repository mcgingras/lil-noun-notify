import { useEffect, useState } from "react";
import { randomBytes } from "crypto";
import { useRouter } from "next/router";
import useLocalStorage from "./useLocalStorage";
import usePopupWindow from "./usePopupWindow.js";

const useDiscordAuth = (scope) => {
  const router = useRouter();
  const [csrfToken] = useLocalStorage(
    "dc_auth_csrf_token",
    randomBytes(16).toString("base64"),
    true
  );
  const state = JSON.stringify({ csrfToken, url: router.asPath });

  const redirectUri =
    typeof window !== "undefined" &&
    `${window.location.href.split("/").slice(0, 3).join("/")}/auth/discord`;

  const { onOpen, windowInstance } = usePopupWindow(
    `https://discord.com/api/oauth2/authorize?client_id=${
      process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
  );

  const [error, setError] = useState(null);
  const [auth, setAuth] = useLocalStorage(`dc_auth_${scope}`, {});

  // the difference between Guilds flow and our flow is that we get a refresh token
  // so I don't think we have to clear out the auth but could instead use the refresh token
  // I need to look into that more though, for now lets just roll with asking for a reauth
  useEffect(() => {
    if (!auth.expires) return;
    if (Date.now() > auth.expires) {
      setAuth({});
    } else {
      const timeout = setTimeout(() => {
        setAuth({});
        // Extra 60_000 is just for safety, since timeout is known to be somewhat unreliable
      }, auth.expires - Date.now() - 60_000);

      return () => clearTimeout(timeout);
    }
  }, [auth, setAuth]);

  /** On a window creation, we set a new listener */
  useEffect(() => {
    if (!windowInstance) return;

    const popupMessageListener = async (event) => {
      /**
       * Conditions are for security and to make sure, the expected messages are
       * being handled (extensions are also communicating with message events)
       */
      if (
        event.isTrusted &&
        event.origin === window.location.origin &&
        typeof event.data === "object" &&
        "type" in event.data &&
        "data" in event.data
      ) {
        const { data, type } = event.data;

        switch (type) {
          case "DC_AUTH_SUCCESS":
            setAuth({
              ...data,
              authorization: `${data?.access_token}`,
            });
            break;
          case "DC_AUTH_ERROR":
            // could toast the error
            setError(data);
            break;
          default:
            // Should never happen, since we are only processing events that are originating from us
            setError({
              error: "Invalid message",
              errorDescription:
                "Recieved invalid message from authentication window",
            });
        }

        windowInstance?.close();
      }
    };

    window.addEventListener("message", popupMessageListener);
    return () => window.removeEventListener("message", popupMessageListener);
  }, [windowInstance, setAuth]);

  return {
    authorization: auth?.authorization,
    error,
    onOpen: () => {
      setError(null);
      onOpen();
    },
    isAuthenticating: !!windowInstance && !windowInstance.closed,
  };
};

export default useDiscordAuth;
