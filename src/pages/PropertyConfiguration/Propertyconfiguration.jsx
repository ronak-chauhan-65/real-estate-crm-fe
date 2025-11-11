import React, { useEffect, useState } from "react";
import PropertyCommonComponent from "./PropertyCommonComponent";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";

function Propertyconfiguration() {
  const [configOptions, setConfigOptions] = useState([
    {
      key: "PROPERTY_CONSTRUCTION_TYPE",
      title: "Property Construction",
      data: [],
    },
    {
      key: "PROPERTY_SPECIFIC_TYPE",
      title: "Property Specific Type",
      data: [],
    },
    {
      key: "PROPERTY_FOR",
      title: "Property For",
      data: [],
    },
    {
      key: "PROPERTY_OWNER_TYPE",
      title: "Property Owner Type",
      data: [],
    },
    {
      key: "PROPERTY_FURNITURE_TYPE",
      title: "Property Furniture Type",
      data: [],
    },
    {
      key: "PROPERTY_PRIORITY_TYPE",
      title: "Property Priority Type",
      data: [],
    },
    {
      key: "PROPERTY_SOURCE",
      title: "Property Source",
      data: [],
    },
    {
      key: "PROPERTY_PLAN_TYPE",
      title: "Property Plan Type",
      data: [],
    },
    {
      key: "PROPERTY_MEASUREMENT_TYPE",
      title: "Property Measurement Type",
      data: [],
    },
  ]);

  const params = {
    key: [
      "PROPERTY_CONSTRUCTION_TYPE",
      "PROPERTY_SPECIFIC_TYPE",
      "PROPERTY_FOR",
      "PROPERTY_OWNER_TYPE",
      "PROPERTY_FURNITURE_TYPE",
      "PROPERTY_PRIORITY_TYPE",
      "PROPERTY_SOURCE",
      "PROPERTY_PLAN_TYPE",
      "PROPERTY_MEASUREMENT_TYPE",
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
          <PropertyCommonComponent
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

export default Propertyconfiguration;
