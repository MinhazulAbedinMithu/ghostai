import React from "react";
import { FiTerminal } from "react-icons/fi";

type LeftTitleProps = {
  title: string;
};

const LeftTitle: React.FC<LeftTitleProps> = ({ title }) => {
  return (
    <div className="flex justify-start items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-fuchsia-500/30 bg-black/40">
      <span className="text-xs xs:text-sm sm:text-base flex items-center gap-1">
        <FiTerminal size={14} />
        GhostAI://{title}
      </span>
    </div>
  );
};

export default LeftTitle;
