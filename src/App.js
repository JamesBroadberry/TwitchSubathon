import React, { useState, useEffect, useRef } from "react";
import SubathonDisplay from "./SubathonDisplay";

function App() {

  const [status, setStatus] = useState("Loading...");

  const [config] = useState({
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

  const [subsThisStream, setSubsThisStream] = useState(0);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("wss://irc-ws.chat.twitch.tv/");

    socket.current.onopen = () => {
      setStatus("Connecting...");
      // "Login" with anonymous username
      socket.current.send("NICK " + getRandomNickname());

      setStatus("Joining Twitch chat...");
      // Join the Twitch chat of the requested user
      socket.current.send("JOIN #" + config.twitchUsername);

      setStatus("");
    };

    socket.current.onerror = () => {
      setStatus("🛑 Connection to Twitch Chat Error 🛑");
    }

    socket.current.onclose = () => {
      setStatus("🛑 Connection to Twitch Closed 🛑");
    }

    // Specify how to clean up after this effect:
    return () => {
      socket.current.close();
    };
  }, [config]);

  useEffect(() => {

    if (!socket.current) return;

    socket.current.onmessage = ({ data }) => {
      // Need to handle "PING" messages to keep the socket connection alive
      if (data.startsWith("PING :tmi.twitch.tv")) {
        console.log("Received a PING, sending back PONG");
        socket.current.send("PONG :tmi.twitch.tv");
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
            if (messageContent === "test") {
              setSubsThisStream(subsThisStream + 1)
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


  });




  const getRandomNickname = () => {
    // Anonymous access to Twitch via websockets is available using username "justinfan" followed by a random number
    const min = 9999;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return "justinfan" + randomNumber;
  };

  return <>
    {status.length > 0 && config !== undefined ? <span>{status}</span> : <SubathonDisplay config={config} subsThisStream={subsThisStream}></SubathonDisplay>}
  </>
}

export default App;
