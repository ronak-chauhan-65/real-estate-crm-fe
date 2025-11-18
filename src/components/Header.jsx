import { useRef, useState } from "react";
import useClickOutside from "../CustomHook/useClickOutside";
import UserProfile from "../pages/UserProfile";
import Drawer from "./Drawer/Drawer";
import UserLogs from "./UserLogs/UserLogs";
import { useSelector } from "react-redux";

function Header({ sideExpand, onToggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [OpenDrawer, setOpenDrawer] = useState(false);

  const ref = useRef();
  useClickOutside(ref, () => setIsOpen(false));

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const usedata = useSelector((state) => state);

  const setTheme = (themeName) => {
    document.querySelector("html").setAttribute("data-theme", themeName);
  };

  return (
    <nav
      className={` bg-accent border-b border-gray-200 p-3 flex items-center md:justify-end  sm:justify-end  xs:justify-end justify-end    w-[100%]`}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center hover:bg-gray-200 rounded-full p-2">
          <span
            className="material-symbols-outlined"
            onClick={() => setOpenDrawer(true)}
          >
            history
          </span>
        </div>

        <div ref={ref} className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center hover:bg-gray-200 p-2 rounded-full"
          >
            <span className="material-symbols-outlined">light_mode</span>
          </button>

          {isOpen && (
            <ul className="menu absolute right-0 bg-base-100 rounded-box z-[11] w-52 p-2 shadow-sm">
              <li>
                <a onClick={() => setTheme("light")}>light</a>
              </li>
              <li>
                <a onClick={() => setTheme("dark")}>dark</a>
              </li>
            </ul>
          )}
        </div>

        <UserProfile
          fullName={usedata?.auth?.user?.name}
          userType={usedata?.auth?.user?.role}
        />
      </div>
      <div className="">
        {OpenDrawer && (
          <Drawer
            isOpen={OpenDrawer}
            onClose={handleCloseDrawer}
            widthClass=" lg:w-1/2 w-full   "
          >
            <UserLogs />
          </Drawer>
        )}
      </div>
    </nav>
  );
}

export default Header;
