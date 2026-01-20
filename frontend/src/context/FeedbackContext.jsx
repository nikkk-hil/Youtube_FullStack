import { createContext, useContext, useRef, useState } from "react";
import {Toast} from "../components/componentCollection.js"

const FeedbackContext = createContext(null);

const FeedbackProvider = ( {children} ) => {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showMessage = (m) => {
    setMessage(m);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  timeoutRef.current = setTimeout(() => {
    setMessage(null);
  }, 3000);

  return(
    <FeedbackContext.Provider value={{showMessage}}>
        {children}
        {message && <Toast message={message} />}
    </FeedbackContext.Provider>
  )
};

const useFeedback = () => {
  const ctxt = useContext(FeedbackContext);
  if (!ctxt)
    throw new Error("useFeedback must be used inside the FeedbackProvider.");
  return ctxt
};

export{
    FeedbackProvider,
    useFeedback
}
