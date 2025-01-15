/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaEdit, FaTrash } from "react-icons/fa";

const DashDocs = () => {
  const [tabs, setTabs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ type: string; data: any } | null>(null);

  useEffect(() => {
    const fetchTabs = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from("Docs").select("tabs");

        if (error) throw error;

        if (data && data.length > 0) {
          const retrievedTabs = data[0].tabs;
          setTabs(retrievedTabs);
          if (retrievedTabs.length > 0) {
            setActiveTab(retrievedTabs[0].tabName);
            if (retrievedTabs[0].subTabs.length > 0) {
              setActiveSubTab(retrievedTabs[0].subTabs[0].name);
            }
          }
        }
      } catch (err: any) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  const handleDelete = (type: string, name: string) => {
    if (type === "tab") {
      setTabs((prev) => prev.filter((tab) => tab.tabName !== name));
      if (activeTab === name) setActiveTab(null);
    } else if (type === "subTab") {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.tabName === activeTab
            ? {
                ...tab,
                subTabs: tab.subTabs.filter(
                  (subTab: any) => subTab.name !== name
                ),
              }
            : tab
        )
      );
      if (activeSubTab === name) setActiveSubTab(null);
    } else if (type === "content") {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.tabName === activeTab
            ? {
                ...tab,
                subTabs: tab.subTabs.map((subTab: any) =>
                  subTab.name === activeSubTab
                    ? { ...subTab, content: "" }
                    : subTab
                ),
                content: !activeSubTab ? "" : tab.content,
              }
            : tab
        )
      );
    }
  };

  const handleEdit = (type: string, data: any) => {
    if (type === "subTab") {
      setModal({ type, data: { ...data, originalName: data.name } });
    } else {
      setModal({ type, data });
    }
  };

  const handleSave = (updatedData: any) => {
    setTabs((prev) => {
      if (modal?.type === "tab") {
        return prev.map((tab) =>
          tab.tabName === modal.data.tabName
            ? { ...tab, tabName: updatedData.name }
            : tab
        );
      } else if (modal?.type === "subTab") {
        return prev.map((tab) =>
          tab.tabName === activeTab
            ? {
                ...tab,
                subTabs: tab.subTabs.map((subTab: any) =>
                  subTab.name === modal.data.originalName
                    ? { ...subTab, name: updatedData.name }
                    : subTab
                ),
              }
            : tab
        );
      } else if (modal?.type === "content") {
        return prev.map((tab) =>
          tab.tabName === activeTab
            ? {
                ...tab,
                subTabs: tab.subTabs.map((subTab: any) =>
                  subTab.name === activeSubTab
                    ? { ...subTab, content: updatedData.content }
                    : subTab
                ),
                content: !activeSubTab ? updatedData.content : tab.content,
              }
            : tab
        );
      } else if (modal?.type === "addTab") {
        return [
          ...prev,
          { tabName: updatedData.name, subTabs: [], content: "" },
        ];
      } else if (modal?.type === "addSubTab") {
        return prev.map((tab) =>
          tab.tabName === activeTab
            ? {
                ...tab,
                subTabs: [
                  ...tab.subTabs,
                  { name: updatedData.name, content: "" },
                ],
              }
            : tab
        );
      } else if (modal?.type === "addContent") {
        return prev.map((tab) =>
          tab.tabName === activeTab
            ? {
                ...tab,
                subTabs: tab.subTabs.map((subTab: any) =>
                  subTab.name === activeSubTab
                    ? {
                        ...subTab,
                        content: updatedData.content || "New Content",
                      }
                    : subTab
                ),
                content: updatedData.isTabLevel
                  ? updatedData.content
                  : tab.content,
              }
            : tab
        );
      }
      return prev;
    });
    setModal(null);
  };

  const handleAddNewTab = () => {
    setModal({ type: "addTab", data: { name: "" } });
  };

  const handleAddNewSubTab = () => {
    if (!activeTab) return;
    setModal({ type: "addSubTab", data: { name: "" } });
  };

  const handleAddContent = () => {
    if (!activeTab) return;
    if (!activeSubTab) {
      setModal({ type: "addContent", data: { content: "", isTabLevel: true } });
    } else {
      setModal({
        type: "addContent",
        data: { content: "", isTabLevel: false },
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("Docs")
        .update({ tabs })
        .eq("id", 16);
      if (error) throw error;
      alert("Data successfully saved!");
    } catch (err: any) {
      setError("Failed to save data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentContent =
    tabs
      .find((tab) => tab.tabName === activeTab)
      ?.subTabs.find((subTab: any) => subTab.name === activeSubTab)?.content ||
    tabs.find((tab) => tab.tabName === activeTab)?.content ||
    "";

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[500px]">
        Loading docs...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/20 min-h-[600px] max-h-[80vh] space-y-4 overflow-y-auto">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative text-fuchsia-400/90">
        {/* Tab List */}
        <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-fuchsia-500/30 overflow-y-auto">
          <button
            onClick={handleAddNewTab}
            className="bg-fuchsia-500 text-white px-4 py-2 m-2 rounded"
          >
            Add New Tab
          </button>
          <ul className="p-2">
            {tabs.map((tab) => (
              <li
                key={tab.tabName}
                className={`w-full text-left px-3 py-2 flex items-center justify-between rounded text-sm transition-colors hover:cursor-pointer ${
                  activeTab === tab.tabName
                    ? "bg-fuchsia-500/20 text-cyan-400"
                    : ""
                }`}
                onClick={() => {
                  setActiveTab(tab.tabName);
                  setActiveSubTab(
                    tab.subTabs.length > 0 ? tab.subTabs[0].name : null
                  );
                }}
              >
                {tab.tabName}
                <div className="flex gap-2 justify-end mt-1">
                  <FaEdit
                    className="text-blue-500 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit("tab", tab);
                    }}
                  />
                  <FaTrash
                    className="text-red-500 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete("tab", tab.tabName);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sub Tab and Content */}
        {activeTab && (
          <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-fuchsia-500/30 overflow-y-auto">
            <button
              onClick={handleAddNewSubTab}
              className="bg-fuchsia-500 text-white px-4 py-2 rounded m-2"
              disabled={!activeTab}
            >
              Add New SubTab
            </button>
            <ul className="p-2">
              {tabs
                .find((tab) => tab.tabName === activeTab)
                ?.subTabs.map((subTab: any) => (
                  <li
                    key={subTab.name}
                    className={`w-full text-left px-3 py-2 rounded flex justify-between items-center gap-4 text-sm transition-colors hover:cursor-pointer ${
                      activeSubTab === subTab.name
                        ? "bg-fuchsia-500/20 text-cyan-400"
                        : ""
                    }`}
                    onClick={() => setActiveSubTab(subTab.name)}
                  >
                    {subTab.name.replace(/([A-Z])/g, " $1").trim()}
                    <div className="flex gap-2 justify-end mt-1">
                      <FaEdit
                        className="text-blue-500 hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit("subTab", subTab);
                        }}
                      />
                      <FaTrash
                        className="text-red-500 hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete("subTab", subTab.name);
                        }}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 text-sm">
          <div className="flex justify-between mb-4 text-base">
            <button
              onClick={handleAddContent}
              className="bg-fuchsia-500 text-white px-4 py-2 rounded"
              disabled={!activeTab}
            >
              Add New Content
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
          <p>
            {currentContent || "No content available."}
            {currentContent && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    handleEdit("content", { content: currentContent })
                  }
                  className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete("content", currentContent)}
                  className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </p>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4 capitalize">
              {modal.type === "addTab"
                ? "Add New Tab"
                : modal.type === "addSubTab"
                ? "Add New Sub Tab"
                : modal.type === "addContent"
                ? "Add New Content"
                : `Edit ${modal.type}`}
            </h3>
            {modal.type === "addContent" || modal.type === "content" ? (
              <textarea
                placeholder="Enter content"
                value={modal.data?.content || ""}
                onChange={(e) =>
                  setModal((prev: any) => ({
                    ...prev,
                    data: { ...prev!.data, content: e.target.value },
                  }))
                }
                className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
              />
            ) : (
              <input
                type="text"
                placeholder="Enter name"
                value={modal.data?.name || ""}
                onChange={(e) =>
                  setModal((prev: any) => ({
                    ...prev,
                    data: { ...prev!.data, name: e.target.value },
                  }))
                }
                className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(modal.data)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashDocs;
