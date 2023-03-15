import { multiply } from "ramda";
import React, { useContext, useEffect, useState } from "react";
import { DiscussionContext } from "../../context/DiscussionContext";
import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput";

type Props = {};

export const ChatPage: React.FC<Props> = ({}) => {
  const [key, setKey] = useState(1);
  const discussion = useContext(DiscussionContext);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setKey(multiply(-1));
  }, [discussion.messages]);

  const onSendMessageHandler = () => {
    setKey(multiply(-1));
    setIsTyping(true);
  };
  const onMessageReceivedHandler = () => {
    setKey(multiply(-1));
    setIsTyping(false);
  };

  return (
    <>
      <div className="flex flex-col h-full p-2 min-h-screen">
        <div className="flex-1">
          <Chat key={key} isTyping={isTyping} />
        </div>
        <div className="flex-0">
          <ChatInput
            onSendMessage={onSendMessageHandler}
            onMessageReceived={onMessageReceivedHandler}
          />
        </div>
      </div>
    </>
  );
};

ChatPage.defaultProps = {};

export default ChatPage;
