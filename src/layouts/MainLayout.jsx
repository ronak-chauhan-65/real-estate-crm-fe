import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar3 from "../components/Sidebar3";
import Header from "../components/Header";

function MainLayout() {
  const screenToDropSidebar = 768;

  // Sidebar state management
  const [sideExpand, setSideExpand] = useState(
    window.innerWidth >= screenToDropSidebar
  );
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const toggleSidebar = () => setSideExpand((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width);
      setSideExpand(width >= screenToDropSidebar); // auto-collapse on small screen
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarMenu = [
    { name: "Dashboard", icon: "dashboard", link: "/dashboard" },
    { name: "Inquiry", icon: "group_add", link: "/inquiry" },

    { name: "Area", icon: "area_chart", link: "/area" },
    // { name: "Users", icon: "person", link: "/users" },
    { name: "Building", icon: "apartment", link: "/building" },
    { name: "Property", icon: "location_city", link: "/property" },

    {
      name: "Settings",
      icon: "settings",
      children: [
        // { name: "Property plantype", link: "/settings/propertyType" },
        // { name: "Property source", link: "/settings/propertySource" },
        // {
        //   name: "Property specific type",
        //   link: "/settings/propertySpecificType",
        // },
        {
          name: "Building configuration",
          link: "/settings/buildingconfiguration",
        },
        {
          name: "Property configuration",
          link: "/settings/propertyconfiguration",
        },
        {
          name: "Enquiry configuration",
          link: "/settings/enquiryconfiguration",
        },
        { name: "Users", link: "/settings/users" },
      ],
    },
  ];

  return (
    <div className="flex  h-screen bg-base-100 w-full overflow-x-hidden brder   w-full  overflow-y-hidden">
      {/* Sidebar */}
      <Sidebar3
        SidebarMenu={SidebarMenu}
        sideExpand={sideExpand}
        screenSize={screenSize}
        toggleSidebar={toggleSidebar}
        screenToDropSidebar={screenToDropSidebar}
      />

      {/* Main content */}
      <div
        className="w-full transition-all h-full duration-300 ease-in-out  "
        // style={{ marginLeft: sideExpand ? "250px" : "80px" }}
      >
        <div className=" w-[calc(100%-80px)] md:w-full sm:w-full">
          <Header sideExpand={sideExpand} onToggleSidebar={toggleSidebar} />
        </div>
        <main className="  w-full  mt-[2rem] h-[90vh]  overflow-auto     ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
