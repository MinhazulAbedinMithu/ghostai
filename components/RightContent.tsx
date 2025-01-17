"use client";
import React, { useEffect, useState } from "react";

type TwitchEmbedOptions = {
  width: string;
  height: string;
  channel: string;
  parent: string[];
  layout?: "video" | "chat" | "video-with-chat"; // Add layout with valid values
  autoplay?: boolean;
  muted?: boolean;
};

type Twitch = {
  Embed: new (id: string, options: TwitchEmbedOptions) => void;
};

const RightContent = () => {
  const [layout, setLayout] = useState<"video" | "video-with-chat">("video");

  const initializeTwitchEmbed = (layout: "video" | "video-with-chat") => {
    const Twitch = (window as unknown as { Twitch: Twitch }).Twitch;

    if (Twitch && Twitch.Embed) {
      // Clear the existing embed
      const embedContainer = document.getElementById("twitch-embed");
      if (embedContainer) embedContainer.innerHTML = "";

      // Create a new embed with the selected layout
      new Twitch.Embed("twitch-embed", {
        width: "100%",
        height: "100%",
        channel: "ghost___ai",
        parent: ["www.example.com"],
        layout: "video",
        autoplay: true, // Attempt autoplay
        muted: false,
      });
    }
    setLayout(layout)
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initializeTwitchEmbed(layout); // Initialize with the default layout
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Re-initialize the embed whenever layout changes
    initializeTwitchEmbed(layout);
  }, [layout]);

  return (
    <div className="outer-container h-full  w-full relative">
      {/* <div className="absolute z-[999] top-4 right-4">
        <button onClick={() => layout==="video" ? setLayout("video-with-chat") : setLayout("video")}>
          <Image src={"/chat.png"} alt="chat" width={40} height={40}/>
        </button>
      </div> */}

    <div
      id="twitch-embed"
      className="mb-5 md:mb-0 w-full h-full rounded-lg overflow-hidden inner-container"
    ></div>
    </div>
  );
};

export default RightContent;
