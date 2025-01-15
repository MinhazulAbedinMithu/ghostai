import React from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
};

const LeftTabs: React.FC<Props> = ({ activeTab, setActiveTab, tabs }) => {
  const currentPath = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex flex-wrap justify-center space-x-2 md:space-x-6 bg-black/80 px-4 py-2 rounded-md shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex items-center gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-md transition-all text-xs xs:text-sm font-bold
                     ${
                       activeTab === tab
                         ? "text-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/20"
                         : "bg-transparent hover:text-fuchsia-300"
                     }`}
        >
          <span>{tab}</span>
        </button>
      ))}

      {currentPath === "/dashboard" && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-md transition-all text-xs xs:text-sm text-red-500 bg-transparent hover:text-red-400"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LeftTabs;
