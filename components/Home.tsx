/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FiTerminal } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

const Home = () => {
  const [aboutData, setAboutData] = useState<{
    tagline: string;
    description: string;
    token: string;
    pump_fun: string; 
    raydium: string; 
    jupiter: string; 
    dex_screener: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false); 

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data, error } = await supabase
          .from("About")
          .select("*")
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setAboutData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
        Loading home...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="flex justify-center items-center bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px] overflow-y-auto">
        No data available.
      </div>
    );
  }

  const { tagline, description, token, pump_fun, raydium, jupiter, dex_screener } = aboutData;
  
  const handleCopy = () => {
    navigator.clipboard
  .writeText(token)
  .then(() => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); 
  })
  .catch((err) => {
    console.error("Failed to copy text: ", err);
  });

  };

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px] overflow-y-auto text-center">
      {/* <LeftTitle title="Home" /> */}

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-lg flex flex-col items-center space-y-6">
          <h1 className="text-xl xs:text-2xl sm:text-4xl font-bold text-cyan-400 mb-4 xs:mb-5 sm:mb-6">
            GhostAI
          </h1>
          <p className="text-base max-w-2xl leading-relaxed text-fuchsia-300/90">
            {description}
          </p>
          <p className="font-bold text-base leading-relaxed text-fuchsia-300/90">
            {tagline}
          </p>

          <div
            className="w-full flex items-center justify-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1 xs:py-1.5 bg-black/40 rounded border border-fuchsia-500/30 
                       hover:border-cyan-400/50 transition-colors group break-all"
          >
            <span className="text-fuchsia-300 font-mono text-xs xs:text-sm">
              {token}
            </span>
            <button
              className="text-cyan-400 group-hover:text-cyan-300"
              onClick={handleCopy}
            >
              {isCopied ? (
                <FaCheck className="text-green-600" size={14} />
              ) : (
                <IoCopyOutline size={14} />
              )}
            </button>
          </div>

          <div className="text-cyan-400 text-xs xs:text-sm sm:text-base text-center">
            Buy $GHOST
          </div>
          <div className="flex flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-4 mt-4">
            <Link
            href={pump_fun || ''}
              className="w-full sm:w-auto group flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-black/40 border border-fuchsia-500/30 
                         rounded-lg transition-all duration-300 hover:bg-fuchsia-500/10 hover:shadow-lg 
                         hover:shadow-fuchsia-500/20"
            >
              <FiTerminal
                className="text-cyan-400 group-hover:text-cyan-300"
                size={18}
              />
              <span className="font-mono text-xs xs:text-sm group-hover:text-fuchsia-300">
                Pump.Fun
              </span>
            </Link>
            <Link
            href={raydium}
              className="w-full sm:w-auto group flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-black/40 border border-fuchsia-500/30 
                         rounded-lg transition-all duration-300 hover:bg-fuchsia-500/10 hover:shadow-lg 
                         hover:shadow-fuchsia-500/20"
            >
              <FiTerminal
                className="text-cyan-400 group-hover:text-cyan-300"
                size={18}
              />
              <span className="font-mono text-xs xs:text-sm group-hover:text-fuchsia-300">
                Raydium
              </span>
            </Link>
            <Link
            href={jupiter}
              className="w-full sm:w-auto group flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-black/40 border border-fuchsia-500/30 
                         rounded-lg transition-all duration-300 hover:bg-fuchsia-500/10 hover:shadow-lg 
                         hover:shadow-fuchsia-500/20"
            >
              <FiTerminal
                className="text-cyan-400 group-hover:text-cyan-300"
                size={18}
              />
              <span className="font-mono text-xs xs:text-sm group-hover:text-fuchsia-300">
                Jupiter
              </span>
            </Link>
          </div>
          <div className="flex justify-center mt-4 w-full">
            <Link
            href={dex_screener}
              className="w-full sm:w-auto group flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-black/40 border border-fuchsia-500/30 
                         rounded-lg transition-all duration-300 hover:bg-fuchsia-500/10 hover:shadow-lg 
                         hover:shadow-fuchsia-500/20"
            >
              <FiTerminal
                className="text-cyan-400 group-hover:text-cyan-300"
                size={18}
              />
              <span className="font-mono text-xs xs:text-sm group-hover:text-fuchsia-300">
                DexScreener
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
