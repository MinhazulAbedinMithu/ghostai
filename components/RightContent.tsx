"use client";
import React, { useEffect } from "react";

type TwitchEmbedOptions = {
  width: string;
  height: string;
  channel: string;
  parent: string[];
  layout?: "video" | "chat" | "video-with-chat"; // Add layout with valid values
};

type Twitch = {
  Embed: new (id: string, options: TwitchEmbedOptions) => void;
};

const RightContent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const Twitch = (window as unknown as { Twitch: Twitch }).Twitch;
      if (Twitch && Twitch.Embed) {
        new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: "100%",
          channel: "ghost___ai",
          parent: ["www.example.com"],
          layout: "video-with-chat"
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="outer-container h-full  w-full">
    <div
      id="twitch-embed"
      className="mb-5 md:mb-0 w-full h-full rounded-lg overflow-hidden inner-container"
    ></div>
    </div>
  );
};

export default RightContent;
