import React, { useEffect, useState } from "react";
import { logsAPI } from "../APICalls/logApi";
import { actionIconMap } from "./logactionIconMap";

function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch logs whenever currentPage changes
  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      const response = await logsAPI.GetLog(
        "69019cc0c625063db387c153",
        currentPage
      );

      if (response.success) {
        const newLogs = response.data?.logs || [];
        const total = response.data?.totalPages || 1;

        // Append new logs instead of replacing
        setLogs((prevLogs) => {
          // prevent duplicate logs if user navigates back and forth
          const existingIds = new Set(prevLogs.map((log) => log._id));
          const uniqueNewLogs = newLogs.filter(
            (log) => !existingIds.has(log._id)
          );

          return [...prevLogs, ...uniqueNewLogs];
        });
        console.log(logs, "logslogslogs");

        setTotalPages(total);
        setIsLoading(false);
      } else {
        console.error("Error fetching logs:", response.message);
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage]);

  const getIcon = (action) => actionIconMap[action] || actionIconMap.DEFAULT;

  function formatDescription(log) {
    // if it contains JSON (starts with "Updated fields:")
    if (
      log.action === "PROFILE_UPDATE" &&
      log.description.includes("Updated fields:")
    ) {
      try {
        // extract the JSON part after "Updated fields:"
        const jsonPart = log.description.split("Updated fields:")[1].trim();
        const fieldsObj = JSON.parse(jsonPart);

        // convert to readable text
        const formattedChanges = Object.entries(fieldsObj)
          .map(([field, { from, to }]) => {
            const fromVal = new Date(from).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const toVal = new Date(to).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            // make field name pretty (camelCase → Title Case)
            const label = field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase());

            return `${label}: changed from ${fromVal} to ${toVal}`;
          })
          .join(", ");

        return `Updated fields — ${formattedChanges}`;
      } catch (err) {
        return log.description; // fallback if parsing fails
      }
    }

    // default for normal actions
    return log.description;
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 p-3 h-[90%]">
        {/* Show loader on initial fetch */}
        {isLoading && currentPage === 1 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <span className="loading loading-spinner loading-lg text-info"></span>
            <p className="text-sm text-gray-400 mt-2">Loading logs...</p>
          </div>
        ) : logs?.length > 0 ? (
          <div>
            {logs.map((data, index) => (
              <div key={data._id || index} className="flex gap-[1.5rem] w-full">
                {/* Icon section */}
                <div className="relative">
                  <span
                    className={`material-symbols-outlined p-[1rem] rounded-full text-accent ${
                      data?.showError ? "bg-error" : "bg-info"
                    }`}
                    style={{ fontVariationSettings: `"FILL" 1` }}
                  >
                    {getIcon(data?.action)}
                  </span>

                  {/* Line between logs */}
                  {index + 1 !== logs.length && (
                    <div className="absolute border border-gray-400 h-full right-[50%] z-[-1] top-0" />
                  )}
                </div>

                {/* Description section */}
                <div className="flex flex-col grow pb-[2rem]">
                  <h6 className="!text-sm leading-[0.5rem]">
                    {new Date(data.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </h6>
                  <h5 className="font-semibold">{formatDescription(data)}</h5>
                </div>
              </div>
            ))}

            {/* Load More button (inside list, after last log) */}
            {currentPage < totalPages && (
              <div className="flex justify-center my-4">
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-info text-white rounded disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}

            {/* Inline spinner when loading next pages */}
            {isLoading && currentPage > 1 && (
              <div className="text-center py-4 flex items-center justify-center">
                <span className="loading loading-spinner text-info loading-xl"></span>
              </div>
            )}
          </div>
        ) : (
          // No data case
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-2">
              hourglass_empty
            </span>
            <p className="text-lg font-medium">No logs found</p>
            <p className="text-sm opacity-70">Try again later or refresh.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogs;
