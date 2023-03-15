import React from "react";
import { BsCircleFill } from "react-icons/bs";

type Props = {};

export const ChatTyping: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="chat-start">
        <div className="chat-header">assistant</div>
        <div className="chat-bubble chat-bubble-primary">
          <div className="flex items-center gap-2 h-full pt-2">
            <BsCircleFill className="animate animate-bounce" />
            <BsCircleFill
              className="animate animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <BsCircleFill
              className="animate animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

ChatTyping.defaultProps = {};

export default ChatTyping;
