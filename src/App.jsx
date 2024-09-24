import React, { useState, useEffect, useRef } from "react";
import { UserSession, AppConfig } from "@stacks/connect";
import {
  StacksMainnet,
  StacksTestnet,
} from "@stacks/network";
import { openSTXTransfer } from "@stacks/connect";
import { makeRandomSelection } from "./utils/makeRandomSelection";
import { useInterval } from "react-use";
import './App.css'

const appConfig = new AppConfig([
  "store_write",
  "publish_data",
]);
const userSession = new UserSession({ appConfig });

const LotteryPlatform = () => {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [countdown, setCountdown] = useState(60); // Countdown starts at 60 seconds
  const [loading, setLoading] = useState(false);

  // Assuming this is for testnet; switch to StacksMainnet for real.
  const network = new StacksTestnet();

  const contributeSTX = async () => {
    setLoading(true);
    const options = {
      recipient: "<your-wallet-address>", // where the STX will be collected
      amount: 1000000, // Minimum STX to send (in microSTX, 1 STX = 1e6 microSTX)
      memo: "Lottery contribution",
      network,
      appDetails: {
        name: "Lottery Platform",
        icon: window.location.origin + "/icon.png",
      },
      onFinish: (data) => {
        console.log("Transaction successful:", data);
        setParticipants([
          ...participants,
          userSession.loadUserData().profile.stxAddress
            .testnet,
        ]);
        setLoading(false);
      },
    };

    openSTXTransfer(options);
  };

  // Randomly selects a winner every minute (when countdown reaches zero).
  useInterval(() => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    } else if (participants.length === 4) {
      const selectedWinner =
        makeRandomSelection(participants);
      setWinner(selectedWinner);
      resetLottery();
    }
  }, 2000);

  // Reset the lottery after a round
  const resetLottery = () => {
    setCountdown(60);
    setParticipants([]);
  };

  return (
    <div className="lottery-platform">
      <h1>STX Lottery Platform</h1>

      {winner ? (
        <div>
          <h2>Winner: {winner}</h2>
          <p>Congratulations! You won all the STX.</p>
        </div>
      ) : (
        <div>
          <h2>Participants: {participants.length}/4</h2>
          <p>
            Contribute STX to participate in the lottery!
          </p>
          <button
            onClick={contributeSTX}
            disabled={loading || participants.length >= 4}
          >
            {loading
              ? "Contributing..."
              : "Contribute 1 STX"}
          </button>
        </div>
      )}

      <div>
        <p>Time remaining: {countdown}s</p>
      </div>
    </div>
  );
};

export default LotteryPlatform;
