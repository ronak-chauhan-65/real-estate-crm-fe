import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless"; // headless = allows custom JSX tooltips
import ChildMenu from "./ChildMenu";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

const MnvSidebarCollapsed = ({ SidebarMenu = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState(location.pathname);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  const verifyParentElement = (pathName = "", childrenArray = []) => {
    return childrenArray.some((item) => item.link === pathName);
  };

  const navigateToUrl = (url = "") => {
    navigate(url);
    setPathName(url);
  };

  return (
    <ul className="flex flex-col">
      {SidebarMenu.map((menu) => (
        <li key={menu.name} className="my-1 ">
          {menu.children && menu.children.length > 0 ? (
            <Tippy
              interactive
              placement="right-start"
              delay={[0, 0]}
              animation="shift-away"
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <ChildMenu
                    childMenu={menu}
                    onNavigate={navigateToUrl}
                    currentPath={pathName}
                  />
                </div>
              )}
            >
              <div className="px-[1.3rem] py-[0.22rem]">
                <div
                  className={`cursor-pointer flex items-center justify-center ${
                    verifyParentElement(pathName, menu.children)
                      ? "text-info hover:text-info bg-info/10 rounded-[0.375rem]"
                      : "text-secondary hover:bg-secondary/10 rounded-[0.375rem]"
                  }`}
                  onClick={() => navigateToUrl(menu.children[0].link)}
                >
                  <span
                    className="material-symbols-outlined p-[0.5rem]"
                    style={{
                      fontVariationSettings: `"FILL" ${
                        verifyParentElement(pathName, menu.children) ? 1 : 0
                      }`,
                    }}
                  >
                    {menu.icon}
                  </span>
                </div>
              </div>
            </Tippy>
          ) : (
            <div className="px-[1.3rem] py-[0.22rem]">
              <div
                className={`flex items-center justify-center ${
                  menu.link === pathName
                    ? "text-info hover:text-info bg-info/10 rounded-[0.375rem]"
                    : "text-secondary hover:bg-secondary/10 rounded-[0.375rem]"
                }`}
                onClick={() => navigateToUrl(menu.link)}
              >
                <span
                  className="material-symbols-outlined p-[0.5rem]"
                  style={{
                    fontVariationSettings: `"FILL" ${
                      menu.link === pathName ? 1 : 0
                    }`,
                  }}
                >
                  {menu.icon}
                </span>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MnvSidebarCollapsed;
