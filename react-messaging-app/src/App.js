import { useState, useEffect } from "react";
import Message from "./components/Message";
import { Button, FormControl, Input } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("please enter your name"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      {messages &&
        messages.map((message) => (
          <Message message={message} username={username} />
        ))}

      <form action="">
        <FormControl>
          <Input
            placeholder="enter a message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            send message
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
