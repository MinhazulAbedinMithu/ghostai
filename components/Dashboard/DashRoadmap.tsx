import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type RoadmapItem = {
  quarter: string;
  description: string;
};

const DashRoadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [newQuarter, setNewQuarter] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddRoadmapItem = () => {
    if (newQuarter.trim() === "" || newDescription.trim() === "") {
      alert("Both Quarter and Description are required!");
      return;
    }

    setRoadmapItems((prev) => [
      ...prev,
      { quarter: newQuarter, description: newDescription },
    ]);
    setNewQuarter("");
    setNewDescription("");
  };

  const handleSave = async () => {
    if (roadmapItems.length === 0) {
      alert("No roadmap items to save.");
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from("Roadmap")
        .delete()
        .neq("id", -1);
      if (deleteError) {
        console.error("Error deleting previous roadmap data:", deleteError);
        alert("Failed to delete previous roadmap data.");
        return;
      }

      const { error: upsertError } = await supabase.from("Roadmap").upsert(
        roadmapItems.map((item) => ({
          quarter: item.quarter,
          description: item.description,
        }))
      );

      if (upsertError) {
        console.error("Error saving roadmap:", upsertError);
        alert("Failed to save roadmap items.");
      } else {
        alert("Roadmap saved successfully!");
        setRoadmapItems([]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred while saving the roadmap.");
    }
  };

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[600px] max-h-[80vh] p-6 space-y-6 overflow-y-auto">
      <h2 className="text-cyan-400 text-lg font-semibold">Create Roadmap</h2>

      <div className="space-y-4">
        <input
          type="text"
          value={newQuarter}
          onChange={(e) => setNewQuarter(e.target.value)}
          placeholder="Enter Quarter (e.g., Q1)"
          className="w-full px-4 py-2 rounded-md border border-gray-700/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter Description"
          className="w-full px-4 py-2 rounded-md border border-gray-700/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 h-20"
        ></textarea>
        <button
          onClick={handleAddRoadmapItem}
          className="w-full py-2 bg-fuchsia-500 text-white font-medium rounded-md shadow hover:bg-fuchsia-600"
        >
          Add Roadmap Item
        </button>
      </div>

      {roadmapItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-cyan-400 text-lg font-semibold">Roadmap</h3>
          <ul className="space-y-2">
            {roadmapItems.map((item, index) => (
              <li
                key={index}
                className="bg-gray-800/50 text-gray-200 p-3 rounded-md shadow"
              >
                <span className="font-semibold">{item.quarter}</span>:{" "}
                {item.description}
              </li>
            ))}
          </ul>
          <button
            onClick={handleSave}
            className="w-full py-2 bg-cyan-500 text-white font-medium rounded-md shadow hover:bg-cyan-600"
          >
            Save Roadmap
          </button>
        </div>
      )}
    </div>
  );
};

export default DashRoadmap;
