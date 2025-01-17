"use client"
import LeftContent from "@/components/LeftContent";
import RightContent from "@/components/RightContent";
import { useState } from "react";

export default function Home() {
  const [terminalMode, setTerminalMode] =  useState<null | "terminal" |"stream">("stream");
  return (
    <div className="flex flex-col gap-5 pt-3 text-3xl font-bold relative max-w-7xl w-full mx-auto">
      <div className="flex items-center burbanfont justify-end gap-4 md:gap-14">
        
        <button onClick={() => terminalMode==="stream" ? setTerminalMode("terminal") : setTerminalMode("stream")} className="bg-slate-800/95 px-5 py-3 rounded-xl text-fuchsia-300">Menu</button>
        {/* <button onClick={() => setTerminalMode("stream")} className="bg-slate-800/95 px-5 py-3 rounded-xl text-fuchsia-300">Live Stream</button> */}
        

    </div>
      <div className="md:flex items-end justify-end h-full w-full">
    <div className="md:max-w-5xl md:mx-auto w-full relative">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 md:gap-10 px-4 md:px-10 py-6">
        <LeftContent />
        <RightContent />
      </div> */}
      <div className="flex items-center flex-col justify-center gap-8">
        {terminalMode === "terminal" ? <LeftContent/>: terminalMode === "stream" ? <div className="stream-box lg:absolute flex items-center justify-center flex-col gap-4">
          <RightContent/>
          {/* <button className="bg-black text-white px-3 py-1 burbanfont" onClick={() => setTerminalMode(null)}>Exit</button> */}
        </div> : null}

        {terminalMode==="terminal" && <button className="bg-black text-white px-3 py-1 burbanfont" onClick={() => setTerminalMode("terminal")}>Exit</button>}
      </div>
      {/**
       * <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 md:gap-10 px-4 md:px-10 py-6">
          <div className="md:col-span-2 flex flex-col h-full">
            <LeftContent />
          </div>
         <div className="md:col-span-1 flex flex-col h-full">
            <RightContent />
          </div>
      </div>
       */}
      </div>
      </div>

      {/* <div className="absolute w-[280px] h-[10px]">
        <RightContent/>
      </div> */}
    </div>
  );
}
