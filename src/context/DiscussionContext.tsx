import { createContext, ReactNode, useMemo } from "react";
import { ChatMessage } from "../types/ChatMessage";
import { v4 as uuidv4 } from "uuid";
import { Discussion } from "../Service/Discussion";

type DiscussionContextType = {
  chatId: string;
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
};

export const DiscussionContext = createContext<Discussion>(new Discussion());

export const DiscussionContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const discussion = new Discussion();

  return (
    <>
      <DiscussionContext.Provider value={discussion}>
        {children}
      </DiscussionContext.Provider>
    </>
  );
};
