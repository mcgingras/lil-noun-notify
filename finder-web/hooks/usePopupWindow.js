import { useEffect, useState } from "react";

const usePopupWindow = (uri) => {
  console.log(uri);
  const [windowInstance, setWindowInstance] = useState(null);

  const onOpen = () => {
    setWindowInstance(
      window.open(uri, "_blank", "height=750,width=600,scrollbars")
    );
  };

  /**
   * This was confusing to me (mg) so going to explain how I am interpreting it for others.
   * If the popup window is closed, the windowInstance state will still be set, and pointing to a closed window.
   * So, we have to set an interval to check periodically if the window is closed, and if so, wipe the state.
   * Also, if the component unmounts or the useEffect is refired, we clear the interval and open up a new one.
   * If this is incorrect or anyone has detail to add, feel free!
   */
  useEffect(() => {
    if (!windowInstance) return;
    const timer = setInterval(() => {
      if (windowInstance.closed) {
        setWindowInstance(null);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [windowInstance]);

  return {
    onOpen,
    windowInstance,
  };
};

export default usePopupWindow;
