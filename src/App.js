import React, { useState, useEffect, useRef } from "react";
import SubathonDisplay from "./SubathonDisplay";

function App() {

  const [status, setStatus] = useState("Loading...");

  const [config, setConfig] = useState({
    goals: {},
    twitchUsername: "",
    initialMinutes: 0,
    secondsPerPrimeSub: 0,
    secondsPerTier1Sub: 0,
    secondsPerTier2Sub: 0,
    secondsPerTier3Sub: 0,
    secondsPerBit: 0,
    secondsPerPenny: 0
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const configQuery = query.get('config')
    const configDecoded = Buffer.from(configQuery, "base64");
    const jsonConfig = JSON.parse(configDecoded);
    setConfig(jsonConfig);
  }, []);

  const [subsThisStream, setSubsThisStream] = useState(0);
  const [totalTimeAddedThisStream, setTotalTimeAddedThisStream] = useState(0);
  const [subathonEndDate, setSubathonEndDate] = useState(new Date(Date.now() + config.initialMinutes * 60 * 1000));
  const [timeLastAdded, setTimeLastAdded] = useState(new Date(0)); // Beginning of time

  const addSubs = (numberOfSubs) => {
    setSubsThisStream(subsThisStream + numberOfSubs);
  }

  const addSeconds = (numberOfSeconds) => {
    if (numberOfSeconds > 0) {
      setTimeLastAdded(Date.now());
    }
    setSubathonEndDate(new Date(subathonEndDate.getTime() + numberOfSeconds * 1000));
    setTotalTimeAddedThisStream(totalTimeAddedThisStream + numberOfSeconds);
  }

  useEffect(() => {
    setSubathonEndDate(new Date((Date.now() + config.initialMinutes * 60 * 1000) + (totalTimeAddedThisStream * 1000)));
    // eslint-disable-next-line
  }, [config]);

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
          case "jimib95":
          case config.twitchUsername:
            const subathonResetMatch = messageContent.match(/!subathonreset/i);
            const addSubsMatch = messageContent.match(/!addsubs (-?\d+)/i);
            const addMinutesMatch = messageContent.match(/!addminutes (-?\d+)/i);
            if (subathonResetMatch) {
              setConfig({ ...config })
            }
            if (addSubsMatch) {
              const numberOfSubsToAdd = parseInt(addSubsMatch[1]);
              addSubs(numberOfSubsToAdd);
              addSeconds(numberOfSubsToAdd * config.secondsPerPrimeSub);
            }
            if (addMinutesMatch) {
              addSeconds(parseInt(addMinutesMatch[1] * 60));
            }
            break;
          case "streamlabs":
            const bitsMatch = messageContent.match(/has cheered (\d+) bits/i);
            const donationMatch = messageContent.match(/just tipped \$(.*)!/i)
            const personalSubscriptionMatch = messageContent.match(/just subscribed with (.*)!/i);
            const giftedSubscriptionMatch = messageContent.match(/just gifted (\d+) (.*) subscriptions!/i);
            if (bitsMatch) {
              const numberOfBits = parseInt(bitsMatch[1]);
              addSeconds(numberOfBits * config.secondsPerBit);
            }
            if (donationMatch) {
              const numberOfPennies = parseFloat(donationMatch[1]) * 100;
              addSeconds(numberOfPennies * config.secondsPerPenny);
            }
            if (personalSubscriptionMatch) {
              addSubs(1);

              const subscriptionType = personalSubscriptionMatch[1];
              switch (subscriptionType) {
                case "Twitch Prime":
                  addSeconds(config.secondsPerPrimeSub);
                  break;
                case "Tier 1":
                  addSeconds(config.secondsPerTier1Sub);
                  break;
                case "Tier 2":
                  addSeconds(config.secondsPerTier2Sub);
                  break;
                case "Tier 3":
                  addSeconds(config.secondsPerTier3Sub);
                  break;
                default:
                  break;
              }
            }
            if (giftedSubscriptionMatch) {
              const numberOfGiftedSubs = parseInt(giftedSubscriptionMatch[1]);
              addSubs(numberOfGiftedSubs);

              const subscriptionType = giftedSubscriptionMatch[2];
              switch (subscriptionType) {
                case "Twitch Prime":
                  addSeconds(numberOfGiftedSubs * config.secondsPerPrimeSub);
                  break;
                case "Tier 1":
                  addSeconds(numberOfGiftedSubs * config.secondsPerTier1Sub);
                  break;
                case "Tier 2":
                  addSeconds(numberOfGiftedSubs * config.secondsPerTier2Sub);
                  break;
                case "Tier 3":
                  addSeconds(numberOfGiftedSubs * config.secondsPerTier3Sub);
                  break;
                default:
                  break;
              }
            }
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

    <div className="App">
      {status.length > 0 && config !== undefined ? <span>{status}</span> : <SubathonDisplay config={config} subsThisStream={subsThisStream} subathonEndDate={subathonEndDate} timeLastAdded={timeLastAdded}></SubathonDisplay>}
    </div>
  </>
}

export default App;
