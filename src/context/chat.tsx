import { createContext, useState } from "react";
import { ChatMessage } from "../types";

type IntialChatState = {
  messages: ChatMessage[];
  setMessages: Function;
};

const initialState = {
  messages: [],
  setMessages: () => {},
};

type ChatProps = {
  children: React.ReactElement;
};

export const ChatContext = createContext<IntialChatState>(initialState);

export const ChatContextProvider = ({ children }: ChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  console.log(messages);
  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
