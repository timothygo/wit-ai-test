import React, { useState, useEffect } from "react";
import styles from "../src/styles/Home.module.scss";

import classNames from "classnames";
import { NextSeo } from "next-seo";
import { useMic } from "quick-utility/MicProvider";
import { useSocket } from "../src/states/SocketProvider";

const index = () => {
  const [lights, setLights] = useState(true);
  const [text, setText] = useState("");

  const { record, talking, speech } = useMic();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("query", ({ entities, intents, text }) => {
        if (intents.length > 0) {
          const key = Object.keys(entities)[0];
          setLights(entities[key][0].name == "open");
          setText(text);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (speech) socket.emit("query", speech);
  }, [speech]);

  return (
    <>
      <NextSeo
        title="Light Bulb - Wit.ai"
        description="Voice Controlled Light Bulb built using Facebook's NLP platform - Wit.ai"
      />
      <div
        className={classNames(styles["lights"], {
          [styles["lights--on"]]: lights,
        })}
      >
        <h1 className={styles["message"]}>Light Bulb</h1>
        <p>talk to the light bulb</p>
        {!talking && <button onClick={record}>Speak</button>}
      </div>
    </>
  );
};

export default index;
