import { append, applySpec, head, path, prop } from "ramda";
import { ChatMessage } from "../types/ChatMessage";
import { ChatGpt } from "./ChatGpt";
import { v4 as uuidv4 } from "uuid";

type Commands = "clear" | "limit";

export class Discussion extends ChatGpt {
  messages: ChatMessage[] = [];
  discussionId: string;
  messageSlice = 5;

  constructor() {
    super();
    this.discussionId = uuidv4();
    this.newDiscussion();
  }

  newDiscussion() {
    console.log("New discussion");
    const currentDate = new Date().toISOString().split("T")[0];
    this.messages = [
      {
        id: uuidv4(),
        text: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: ${currentDate} Current date: ${currentDate}`,
        user: "system",
        date: new Date(),
      },
    ];
  }

  parseCommand(command: Commands, args: string[]) {
    console.log("command", command, args);
    if (command === "clear") {
      this.newDiscussion();
      console.log("Clearing messages", this.messages);
      return this.messages;
    }
    if (command === "limit") {
      this.messageSlice = Number(head(args));
      return this.messages;
    }

    return this.messages;
  }

  sendMessage(message: ChatMessage) {
    if (message.text.startsWith("/")) {
      const [command, ...args] = message.text.split(" ");
      return Promise.resolve(this.parseCommand(command.slice(1), args));
    }

    this.messages = append(message, this.messages);
    console.log("Sending message", message);

    return this.openai
      .createChatCompletion({
        model: this.model,
        messages: this.messages
          .slice(this.messages.length - this.messageSlice)
          .map(
            applySpec({
              content: prop("text"),
              role: prop("user"),
              name: prop("user"),
            })
          ),
      })
      .then((response) => {
        const messageResponse = path(
          ["data", "choices", 0, "message"],
          response
        );

        if (messageResponse) {
          this.messages = append(
            {
              id: uuidv4(),
              text: messageResponse.content,
              user: messageResponse.role,
              date: new Date(),
            },
            this.messages
          );
        }

        return this.messages;
      });
  }
}
