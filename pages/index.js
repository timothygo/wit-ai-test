import React from "react";
import { NextSeo } from "next-seo";

import { useMic } from "quick-utility/MicProvider";

const index = () => {
  const { speak } = useMic();
  return (
    <div>
      <NextSeo
        title="Light Bulb - Wit.ai"
        description="Voice Controlled Light Bulb built using Facebook's NLP platform - Wit.ai"
      />
      <p>Hello World</p>
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default index;
