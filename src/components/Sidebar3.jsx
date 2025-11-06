import MnvSidebarChild from "./MnvSidebarChild";
import MnvSidebarCollapsed from "./MnvSidebarCollapsed";

const Sidebar3 = ({
  SidebarMenu,
  sideExpand,
  screenSize,
  toggleSidebar,
  screenToDropSidebar,
}) => {
  return (
    <div
      className="h-screen flex flex-col  !bg-accent "
      style={{ width: sideExpand ? "250px" : "80px" }}
    >
      {/* Header / Logo */}
      <div
        className={`flex items-center !w-full h-[5rem] min-h-[5rem] py-2 px-4 ${
          sideExpand ? "justify-start" : "justify-center"
        }`}
        // style={{ width: sideExpand ? "250px" : "80px" }}
      >
        {sideExpand ? (
          <img
            src="https://keyword-ranking.sgp1.cdn.digitaloceanspaces.com/cp-images/dailylogo.png"
            alt="Logo"
            className="w-6/12 h-[40px]"
          />
        ) : (
          <img
            src="https://keyword-ranking.sgp1.cdn.digitaloceanspaces.com/cp-images/dailyicon.png"
            alt="Logo"
            className="w-[35px]"
          />
        )}
      </div>

      {/* Sidebar content */}
      <div
        className="h-full overflow-y-auto overflow-x-hidden shadow-xl "
        style={{ width: sideExpand ? "250px" : "80px" }}
      >
        <div className="">
          {sideExpand ? (
            <MnvSidebarChild SidebarMenu={SidebarMenu} />
          ) : (
            <MnvSidebarCollapsed SidebarMenu={SidebarMenu} />
          )}
        </div>
      </div>

      {/* Toggle Button */}
      {screenSize >= screenToDropSidebar && (
        <div
          className={`absolute bg-accent rounded-full cursor-pointer bottom-8 ${
            sideExpand ? "left-[226px]" : "left-[57px]"
          }`}
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
        >
          <span
            className={`material-symbols-outlined p-1 ${
              !sideExpand ? "rotate-180" : ""
            }`}
          >
            menu_open
          </span>
        </div>
      )}
    </div>
  );
};

export default Sidebar3;
