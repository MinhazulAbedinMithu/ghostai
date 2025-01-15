"use client";
import React, { useState } from "react";
import LeftTabs from "../LeftTabs";
import DashAbout from "./DashAbout";
import DashDocs from "./DashDocs";
import DashWhitepaper from "./DashWhitepaper";
import DashRoadmap from "./DashRoadmap";

const DashTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ABOUT");
  const tabs = ["ABOUT", "DOCS", "WHITEPAPER", "ROADMAP"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "ABOUT":
        return <DashAbout />;
      case "DOCS":
        return <DashDocs />;
      case "WHITEPAPER":
        return <DashWhitepaper />;
      case "ROADMAP":
        return <DashRoadmap />;
      default:
        return <div className="text-fuchsia-400">No Content</div>;
    }
  };

  return (
    <div className="min-h-screen text-fuchsia-400 py-6">
      <LeftTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default DashTabs;
