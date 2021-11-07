import React, { useState, useEffect } from "react";
import SubathonDisplay from "./SubathonDisplay";

function App() {

  const [status, setStatus] = useState("Loading...");

  const [config, _] = useState({
    goals: {
      10: "Do a thing",
      25: "Do another thing",
      50: "Do the last thing"
    },
    twitchUsername: "twitchusergoeshere",
    initialMinutes: 60,
    secondsPerSub: 10 * 60,
    secondsPerBit: 60 / 100,
    secondsPerPenny: 60 / 100
  });

  useEffect(() => {
    const socket = new WebSocket("wss://irc-ws.chat.twitch.tv/");

    socket.onmessage = ({ data }) => {
      // Need to handle "PING" messages to keep the socket connection alive
      if (data.startsWith("PING :tmi.twitch.tv")) {
        console.log("Received a PING, sending back PONG");
        socket.send("PONG :tmi.twitch.tv");
        return;
      }
      // These are the messages sent by chatters - we need to process these
      else if (data.includes("PRIVMSG")) {
        const messagePart = data.split("#")[1];
        const messageContent = messagePart
          .substring(messagePart.indexOf(":") + 1)
          .split("\r\n")[0];
        const username = data.split("@")[1].split(".tmi.twitch.tv")[0];

        switch (username) {
          case config.twitchUsername:
            if (messageContent == "test") {
              // do nothing for now
            }

            break;
          case "streamelements":

            break;
          default:
            break;

        }

        return;
      }
      // Some common messages sent when first connecting that we don't care about
      else if (
        data.includes("Welcome") ||
        data.includes("JOIN") ||
        data.includes("NAMES")
      ) {
        console.log("Received a known, ignored, message", data);
      }
      // Log everything else as error to the console
      else {
        console.error("Unhandled message", data);
        return;
      }

    };
    socket.onopen = () => {
      setStatus("Connecting...");
      // "Login" with anonymous username
      socket.send("NICK " + getRandomNickname());

      setStatus("Joining Twitch chat...");
      // Join the Twitch chat of the requested user
      socket.send("JOIN #" + config.twitchUsername);

      setStatus("");
    };

    socket.onerror = () => {
      setStatus("🛑 Connection to Twitch Chat Error 🛑");
    }

    socket.onclose = () => {
      setStatus("🛑 Connection to Twitch Closed 🛑");
    }

    // Specify how to clean up after this effect:
    return () => {
      socket.close();
    };
  }, [config]);




  const getRandomNickname = () => {
    // Anonymous access to Twitch via websockets is available using username "justinfan" followed by a random number
    const min = 9999;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return "justinfan" + randomNumber;
  };

  return <>
    {status.length > 0 && config !== undefined ? <span>{status}</span> : <SubathonDisplay config={config}></SubathonDisplay>}
  </>
}

export default App;
