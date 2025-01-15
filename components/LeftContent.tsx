"use client";
import React, { useState } from "react";
import LeftTabs from "./LeftTabs";
import Home from "./Home";
import Docs from "./Docs";
import Roadmap from "./Roadmap";
import Whitepaper from "./Whitepaper";
import About from "./About";
import Footer from "./Footer";

const LeftContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const tabs = ["HOME", "ABOUT", "DOCS", "ROADMAP"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "HOME":
        return <Home />;
      case "ABOUT":
        return <About />;
      case "DOCS":
        return <Docs />;
      // case "WHITEPAPER":
      //   return <Whitepaper />;
      case "ROADMAP":
        return <Roadmap />;
      default:
        return <div className="text-white">No Content</div>;
    }
  };

  return (
    <div className="text-fuchsia-300 h-full">
      <LeftTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      <div>{renderTabContent()}</div>
      <Footer />
    </div>
  );
};

export default LeftContent;
