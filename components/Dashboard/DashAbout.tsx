/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MdAdd, MdHorizontalRule } from "react-icons/md";

const DashAbout = () => {
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [token, setToken] = useState("");
  const [pumpFun, setPumpFun] = useState("");
  const [raydium, setRaydium] = useState("");
  const [jupiter, setJupiter] = useState("");
  const [dexScreener, setDexScreener] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAddParagraph = () => {
    if (paragraphs.length < 3) {
      setParagraphs((prev) => [...prev, ""]);
    }
  };

  const handleRemoveParagraph = (index: number) => {
    setParagraphs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = value;
    setParagraphs(updatedParagraphs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("About")
        .select("*")
        .single();
  
      if (fetchError) {
        setError("Failed to fetch current data: " + fetchError.message);
        setLoading(false);
        return;
      }
  
      const updatedData = {
        tagline: tagline || currentData?.tagline || "",
        description: description || currentData?.description || "",
        paragraphs: paragraphs.some((p) => p.trim()) ? paragraphs : currentData?.paragraphs || [],
        token: token || currentData?.token || "",
        pump_fun: pumpFun || currentData?.pump_fun || "",
        raydium: raydium || currentData?.raydium || "",
        jupiter: jupiter || currentData?.jupiter || "",
        dex_screener: dexScreener || currentData?.dex_screener || "",
      };
  
      const { error: deleteError } = await supabase
        .from("About")
        .delete()
        .not("id", "is", null);
  
      if (deleteError) {
        setError("Failed to delete existing data: " + deleteError.message);
        setLoading(false);
        return;
      }
  
      const { error: insertError } = await supabase.from("About").insert([updatedData]);
  
      if (insertError) {
        setError("Failed to save data: " + insertError.message);
      } else {
        setSuccess(true);
        setTagline("");
        setDescription("");
        setToken("");
        setPumpFun("");
        setRaydium("");
        setJupiter("");
        setDexScreener("");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[600px] max-h-[80vh] text-center p-6 space-y-4 overflow-y-auto"
    >
      <input
        type="text"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        placeholder="Enter Tagline"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none min-h-20"
      />
      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="flex items-center space-x-2">
            <textarea
              value={paragraph}
              onChange={(e) => handleParagraphChange(index, e.target.value)}
              placeholder={`Enter Paragraph ${index + 1}`}
              className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none h-20"
            />
            {paragraphs.length < 3 && index === paragraphs.length - 1 ? (
              <button
                type="button"
                onClick={handleAddParagraph}
                className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
              >
                <MdAdd />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleRemoveParagraph(index)}
                className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
              >
                <MdHorizontalRule />
              </button>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter Token"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <input
        type="text"
        value={pumpFun}
        onChange={(e) => setPumpFun(e.target.value)}
        placeholder="Enter Pump.Fun"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <input
        type="text"
        value={raydium}
        onChange={(e) => setRaydium(e.target.value)}
        placeholder="Enter Raydium"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <input
        type="text"
        value={jupiter}
        onChange={(e) => setJupiter(e.target.value)}
        placeholder="Enter Jupiter"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <input
        type="text"
        value={dexScreener}
        onChange={(e) => setDexScreener(e.target.value)}
        placeholder="Enter DexScreener"
        className="w-full px-4 py-2 rounded-md border border-gray-500/50 bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Data saved successfully!</p>}
      <button
        type="submit"
        disabled={loading}
        className={`w-fit mx-auto px-6 py-2 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600"
        } text-white font-medium rounded-md shadow`}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default DashAbout;
