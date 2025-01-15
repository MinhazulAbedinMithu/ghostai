import LeftContent from "@/components/LeftContent";
import RightContent from "@/components/RightContent";

export default function Home() {
  return (
    <div className="md:flex items-center justify-center h-full w-full">
    <div className="md:max-w-7xl md:mx-auto w-full">
    <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 md:gap-10 px-4 md:px-10 py-6">
          {/* LeftContent will span 2 columns and stretch to the same height as RightContent */}
          <div className="md:col-span-2 flex flex-col h-full">
            <LeftContent />
          </div>
          {/* RightContent will span 1 column and stretch to the same height as LeftContent */}
          <div className="md:col-span-1 flex flex-col h-full">
            <RightContent />
          </div>
      </div>
      </div>
      </div>
  );
}
