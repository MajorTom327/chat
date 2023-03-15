import React, { useContext, useEffect } from "react";
import { DiscussionContext } from "../../context/DiscussionContext";
import ChatBubble from "./ChatBubble";
import ChatTyping from "./ChatTyping";

type Props = {
  isTyping?: boolean;
};

export const Chat: React.FC<Props> = ({ isTyping }) => {
  const discussion = useContext(DiscussionContext);
  const chatboxRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollBy({
        top: chatboxRef.current.scrollHeight,
      });
    }
  }, [discussion.messages]);

  return (
    <>
      <div
        className="flex flex-col gap-2 overflow-y-auto py-2"
        style={{ height: "calc(100vh - 8.5rem)" }}
        ref={chatboxRef}
      >
        {discussion.messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isTyping && <ChatTyping />}
      </div>
    </>
  );
};

Chat.defaultProps = {};

export default Chat;
