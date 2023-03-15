import Chat from "./components/Chat";
import { DiscussionContextProvider } from "./context/DiscussionContext";
import ChatInput from "./components/ChatInput";
import ChatPage from "./components/ChatPage/ChatPage";

function App() {
  return (
    <div className="App">
      <DiscussionContextProvider>
        <ChatPage />
      </DiscussionContextProvider>
    </div>
  );
}

export default App;
