import React, { useContext, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { DiscussionContext } from "../../context/DiscussionContext";
import TextInput from "../TextInput";
import { v4 as uuidV4 } from "uuid";

type Props = {
  onSendMessage?: () => void;
  onMessageReceived?: () => void;
};

export const ChatInput: React.FC<Props> = ({
  onSendMessage,
  onMessageReceived,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const discussion = useContext(DiscussionContext);

  const onSendMessageHandler = (e: any) => {
    e.preventDefault();
    discussion
      .sendMessage({
        id: uuidV4(),
        user: "user",
        text: currentMessage,
        date: new Date(),
      })
      .then(() => {
        console.log("Message sent");
        onMessageReceived && onMessageReceived();
      });
    setCurrentMessage("");
    onSendMessage && onSendMessage();
  };

  return (
    <>
      <form
        className="flex gap-2 z-10 items-end"
        onSubmit={onSendMessageHandler}
      >
        <div className="flex-1">
          <TextInput
            placeholder="Type your message..."
            value={currentMessage}
            onChange={setCurrentMessage}
          />
        </div>
        <button className="btn flex-0 m-2">
          <FaPaperPlane />
        </button>
      </form>
    </>
  );
};

ChatInput.defaultProps = {};

export default ChatInput;
