import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Timer({ endDate, timeLastAdded }) {

  const [recentlyAddedTime, setRecentlyAddedTime] = useState(false);
  const [countdownString, setCountdownString] = useState("");
  const [lowTime, setLowTime] = useState(false);
  const [criticalTime, setCriticalTime] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentlyAddedTime(new Date() - timeLastAdded <= 3000);
      setLowTime(endDate - new Date() <= 1 * 60 * 60 * 1000) // 1 hour
      setCriticalTime(endDate - new Date() <= 5 * 60 * 1000) // 5 minutes
      setCountdownString(formatTime((new Date(endDate - new Date()) / 1000)))
    }, 200);
    return () => clearInterval(interval);
  }, [endDate, timeLastAdded]);

  if (recentlyAddedTime) {
    return <RecentlyAddedTime>{countdownString}</RecentlyAddedTime>
  }
  else if (criticalTime) {
    return <CriticalTime>{countdownString}</CriticalTime>
  }
  else if (lowTime) {
    return <LowTime>{countdownString}</LowTime>
  }
  else {
    return <Normal>{countdownString}</Normal>
  }
}

const formatTime = (totalSeconds) => {


  const hours = Math.abs(parseInt(totalSeconds / 60 / 60)).toString().padStart(2, '0');
  const minutes = Math.abs(parseInt(totalSeconds / 60 % 60)).toString().padStart(2, '0');
  const seconds = Math.abs(parseInt(totalSeconds % 60)).toString().padStart(2, '0');
  return `${totalSeconds < 0 ? "-" : ""}${hours}:${minutes}:${seconds}`;
}

const RecentlyAddedTime = styled.span`
  
  animation: blinkRecentlyAdded step-end 0.3s infinite;

  @keyframes blinkRecentlyAdded{
    0% {
      color: transparent;
    }
    50% {
      color: #2ECC40;
    }
    100% {
      color: transparent;
    }
  }
`;

const LowTime = styled.span`
  color: #FF4136;
`;

const CriticalTime = styled.span`
  
  animation: blinkCritical step-end 0.6s infinite;

  @keyframes blinkCritical{
    0% {
      color: transparent;
    }
    30% {
      color: #FF4136;
    }
    70% {
      color: #FF4136;
    }
    100% {
      color: transparent;
    }
  }
`;


const Normal = styled.span`
  color: black;
`;

export default Timer;