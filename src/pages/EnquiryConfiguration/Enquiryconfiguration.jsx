import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EnquiryCommonComp from "./EnquiryCommonComp";
import { getMasterConfigg } from "../../components/APICalls/masterConfig";

function Enquiryconfiguration() {
  const [configOptions, setConfigOptions] = useState([
    {
      key: "ENQUIRY_SALES_COMMENT",
      title: "Enquiry Configuration",
      data: [],
    },
  ]);

  const params = {
    key: ["ENQUIRY_SALES_COMMENT"].join(","),
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getMasterConfigg(params);


      const responseData = resp?.data?.data ?? {};


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
    <div className="">
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
          <EnquiryCommonComp
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

export default Enquiryconfiguration;
