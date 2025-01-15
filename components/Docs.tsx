/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeftTitle from "./LeftTitle";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";

const Docs = () => {
  const [tabs, setTabs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTabs = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from("Docs").select("tabs");

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const retrievedTabs = data[0].tabs;
          setTabs(retrievedTabs);

          if (retrievedTabs.length > 0) {
            setActiveTab(retrievedTabs[0].tabName);
            setExpandedTabs({
              [retrievedTabs[0].tabName]: true,
            });

            if (retrievedTabs[0].subTabs.length > 0) {
              setActiveSubTab(retrievedTabs[0].subTabs[0].name);
            }
          }
        }
      } catch (err: any) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  const toggleTabExpansion = (tabName: string) => {
    setExpandedTabs({ [tabName]: true });
  };

  const currentContent =
    tabs
      .find((tab) => tab.tabName === activeTab)
      ?.subTabs?.find((subTab: any) => subTab.name === activeSubTab)?.content ||
    tabs.find((tab) => tab.tabName === activeTab)?.content ||
    "";

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
        Loading docs...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md max-h-[80vh] rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
      <LeftTitle title="Docs" />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative text-fuchsia-400/90">
        <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-fuchsia-500/30 overflow-y-auto">
          <ul className="p-2">
            {tabs.map((tab) => (
              <li key={tab.tabName}>
                <div
                  className={`w-full flex justify-between items-center px-3 py-2 rounded text-sm transition-colors hover:cursor-pointer ${
                    activeTab === tab.tabName
                      ? "bg-fuchsia-500/20 text-cyan-400"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveTab(tab.tabName);
                    toggleTabExpansion(tab.tabName);

                    if (tab.subTabs.length > 0) {
                      setActiveSubTab(tab.subTabs[0].name);
                    }
                  }}
                >
                  <span>{tab.tabName}</span>
                  {tab.subTabs.length > 0 && (
                    <span>
                      {expandedTabs[tab.tabName] ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </div>

                {expandedTabs[tab.tabName] && tab.subTabs.length > 0 && (
                  <ul className="ml-4">
                    {tab.subTabs.map((subTab: any) => (
                      <li
                        key={subTab.name}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors hover:cursor-pointer ${
                          activeSubTab === subTab.name
                            ? "text-cyan-400"
                            : ""
                        }`}
                        onClick={() => setActiveSubTab(subTab.name)}
                      >
                        {subTab.name.replace(/([A-Z])/g, " $1").trim()}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 overflow-y-auto p-4 text-sm">
          <p>{currentContent || "No content available."}</p>
        </div>
      </div>
    </div>
  );
};

export default Docs;
