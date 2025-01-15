import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeftTitle from "./LeftTitle";

type RoadmapItem = {
  quarter: string;
  description: string;
};

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        const { data, error } = await supabase
          .from("Roadmap")
          .select("quarter, description")
          .order("quarter");

        if (error) {
          console.error("Error fetching roadmap data:", error);
        } else {
          setRoadmapData(data || []);
          if (data?.length) setActiveTab(data[0].quarter);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData();
  }, []);

  const currentContent =
    roadmapData.find((item) => item.quarter === activeTab)?.description || "";

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
        Loading roadmap...
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
      <LeftTitle title="Roadmap" />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative text-fuchsia-300/90">
        <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-fuchsia-500/30 overflow-y-auto">
          <ul className="p-2">
            {roadmapData.map((item) => (
              <li
                key={item.quarter}
                role="button"
                aria-pressed={activeTab === item.quarter}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors hover:cursor-pointer ${
                  activeTab === item.quarter
                    ? "bg-fuchsia-500/20 text-cyan-400"
                    : ""
                }`}
                onClick={() => setActiveTab(item.quarter)}
              >
                {item.quarter.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 overflow-y-auto p-4 text-sm">
          {currentContent ? (
            <p>{currentContent}</p>
          ) : (
            <p className="text-gray-500">Select a quarter to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
