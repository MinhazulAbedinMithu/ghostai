/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeftTitle from "./LeftTitle";

const About = () => {
  const [aboutData, setAboutData] = useState<{
    paragraphs: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        Loading about...
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
      <div className="flex justify-center items-center bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
        No data available.
      </div>
    );
  }

  const { paragraphs } = aboutData;

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 h-[500px] max-h-[500px] overflow-y-auto text-center">
      {/* <LeftTitle title="About" /> */}
      <div className="p-4 overflow-y-auto text-sm md:text-base">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;
