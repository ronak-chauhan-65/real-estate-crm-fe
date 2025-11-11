import React, { useEffect, useState } from "react";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";
import BuildingCommonComp from "./BuildingCommonComp";

function Buildingconfiguration() {
  const [configOptions, setConfigOptions] = useState([
    {
      key: "BUILDING_RESTRICTION",
      title: "Building Restriction",
      data: [],
    },
    {
      key: "BUILDING_PROGRESS",
      title: "Building Progress",
      data: [],
    },
    {
      key: "BUILDING_ARCHITECTURE_TYPE",
      title: "Building Architecture Type",
      data: [],
    },
  ]);

  const params = {
    key: [
      "BUILDING_RESTRICTION",
      "BUILDING_PROGRESS",
      "BUILDING_ARCHITECTURE_TYPE",
    ].join(","),
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getMasterConfigg(params);

      const responseData = resp?.data?.data ?? {};
      // console.log(responseData, "responseData");

      setConfigOptions((prev) =>
        prev.map((item) => ({
          ...item,
          data: responseData[item.key] || [],
        }))
      );
    };

    fetchData();
  }, []);

  return (
    <div className="mx-[1rem] lg:mx-[2rem] ">
      {/* <div className="pb-[1rem]">
        <h3 className="text-[2rem] font-[600]  text-info ">
          Building configuration
        </h3>
        <h5 className="!text-sm opacity-50 font-normal text-primary">
          Automate all your reminders from single screen.
        </h5>
      </div>
      <div className="text-secondary p-1 bg-accent">
        <div>buildingconfiguration</div>
      </div> */}

      <div className="flex flex-col gap-[1rem]">
        {configOptions.map((item, index) => (
          <BuildingCommonComp
            item={item}
            key={item.key}
            index={index}
            onRefresh={async (key) => {
              const updated = await getMasterConfigg({ key });
              const updatedData = updated?.data?.data?.[key] || [];
              setConfigOptions((prev) =>
                prev.map((cfg) =>
                  cfg.key === key ? { ...cfg, data: updatedData } : cfg
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Buildingconfiguration;
