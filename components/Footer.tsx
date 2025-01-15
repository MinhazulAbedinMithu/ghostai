import Link from "next/link";
import { FaTwitch } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { SiGitbook } from "react-icons/si";

const Footer = () => {
  return (
    <div className="flex justify-center space-x-2 md:space-x-6 bg-black/70 px-4 py-2 rounded-md border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20">
      <div className="flex gap-4 items-center justify-center text-xl text-cyan-400">
        <Link
          href="https://ghostai.gitbook.io/"
          className="hover:text-white"
          target="_blank"
        >
          <SiGitbook />
        </Link>
        <Link
          href="https://x.com/GHOST__AI"
          className="hover:text-white"
          target="_blank"
        >
          <RiTwitterXFill />
        </Link>
        <Link
          href="https://www.twitch.tv/ghost___ai"
          className="hover:text-white"
          target="_blank"
        >
          <FaTwitch />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
