import React, { useEffect } from "react";
import { useAuth } from "../components/AuthProvider/AuthProvider";

function Dashboard() {
  // const { masterConfig, token } = useAuth();

  // useEffect(() => {
  //   console.log("🌍 Global Master Config:", masterConfig, token);
  // }, [masterConfig]);
  return (
    <div className="mx-[1rem] lg:mx-[2rem] ">
      <div className="pb-[1rem]">
        <h3 className="text-[2rem] font-[600]  text-info ">Dashboard</h3>
        <h5 className="!text-sm opacity-50 font-normal text-primary">
          Automate all your reminders from single screen.
        </h5>
      </div>
      <div className="text-secondary p-1 bg-accent">Dashboard</div>
      {/* {Object.keys(masterConfig).length > 0 ? (
        <pre>{JSON.stringify(masterConfig, null, 2)}</pre>
      ) : (
        <p className="text-gray-400">Loading master configuration...</p>
      )} */}
    </div>
  );
}

export default Dashboard;
