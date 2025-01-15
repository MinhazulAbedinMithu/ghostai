/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const DashWhitepaper = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    try {
      // List existing files in the bucket
      const { data: files, error: listError } = await supabase.storage
        .from("whitepapers")
        .list("whitepapers");

      if (listError) {
        console.error("Error listing files:", listError);
        alert("Failed to retrieve existing whitepapers.");
        return;
      }

      // Delete existing files
      if (files && files.length > 0) {
        const fileNames = files.map((file) => `whitepapers/${file.name}`);
        const { error: deleteError } = await supabase.storage
          .from("whitepapers")
          .remove(fileNames);

        if (deleteError) {
          console.error("Error deleting files:", deleteError);
          alert("Failed to delete existing whitepapers.");
          return;
        }
      }

      // Upload new file
      const { data, error: uploadError } = await supabase.storage
        .from("whitepapers")
        .upload(`whitepapers/${selectedFile.name}`, selectedFile);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        alert("Failed to upload whitepaper.");
        return;
      }

      alert(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred while uploading the whitepaper.");
    }
  };

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[600px] max-h-[80vh] p-6 space-y-4 overflow-y-auto">
      <h2 className="text-cyan-400 text-lg font-semibold">Upload Whitepaper</h2>

      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500 file:text-gray-900 hover:file:bg-fuchsia-600"
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="w-fit mx-auto px-6 py-2 bg-cyan-500 text-white font-medium rounded-md shadow hover:bg-cyan-600"
      >
        Submit
      </button>
    </div>
  );
};

export default DashWhitepaper;
