import { Configuration, OpenAIApi } from "openai";
import { isNilOrEmpty } from "ramda-adjunct";

export enum OpenAiModel {
  code = "code-davinci-002",
  text = "text-davinci-003",
  chat = "gpt-3.5-turbo",
}

export class ChatGpt {
  protected readonly openai: OpenAIApi;
  protected readonly model: OpenAiModel;

  constructor(model: OpenAiModel = OpenAiModel.chat) {
    const configuration = new Configuration({
      // TODO: Move this to a config file
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });

    if (isNilOrEmpty(configuration.apiKey)) {
      throw new Error("No API key provided");
    }

    this.openai = new OpenAIApi(configuration);

    this.model = model;
  }
}
