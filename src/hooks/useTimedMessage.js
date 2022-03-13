import { useRef, useState, useEffect } from "react";

/** Custom hook for managing "flash" messages.
 *
 * This adds an item in state, `active`, which can be controlled by the
 * component as desired. The component would typically `setActive(true)`
 * to start displaying the message, and after `timeInMsec`, active would
 * go back to false, which would typically stop showing the message.
 *
 * In the component::
 *
 *   const [myMsgFlag, setMyMsgFlag] = useTimedMessage();
 *
 *   function somethingDidntWork() {
 *     setMsgFlag(true);
 *   }
 *
 *   return (
 *     {myMsgFlag ? <p>Oh No!</p> : null}
 *   )
 */

function useTimedMessage(timeInMsec = 3000) {
  const [active, setActive] = useState(false);

  const messageShownRef = useRef(false);

  useEffect(
      function showSavedMessage() {
        console.debug(
            "useTimedMessage useEffect showSavedMessage", "active=", active);

        if (active && !messageShownRef.current) {
          messageShownRef.current = true;
          setTimeout(function removeMessage() {
            setActive(false);
            messageShownRef.current = false;
          }, timeInMsec);
        }
      },
      [active, timeInMsec],
  );

  return [active, setActive];
}

export default useTimedMessage;