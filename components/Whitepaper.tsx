import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeftTitle from "./LeftTitle";

const Whitepaper = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const { data: files, error: listError } = await supabase.storage
          .from("whitepapers")
          .list("whitepapers", { limit: 1 });

        if (listError) {
          console.error("Error fetching file list:", listError);
          setErrorMessage("Failed to retrieve the whitepaper.");
          return;
        }

        if (files && files.length > 0) {
          const fileName = files[0].name;
          const { data } = supabase.storage
            .from("whitepapers")
            .getPublicUrl(`whitepapers/${fileName}`);

          if (data?.publicUrl) {
            setPdfUrl(data.publicUrl);
          } else {
            setErrorMessage("Failed to retrieve the whitepaper URL.");
          }
        } else {
          setErrorMessage("No whitepaper found.");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setErrorMessage(
          "An unexpected error occurred while fetching the whitepaper."
        );
      }
    };

    fetchPdfUrl();
  }, []);

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 max-h-[500px] text-center">
      <LeftTitle title="Whitepaper" />
      <div className="flex justify-center items-center h-screen p-2">
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            className="rounded"
            title="Whitepaper PDF"
          />
        ) : (
          <p>Loading whitepaper...</p>
        )}
      </div>
    </div>
  );
};

export default Whitepaper;
