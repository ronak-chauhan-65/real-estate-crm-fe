import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MnvSidebarChild = ({ SidebarMenu = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenuList, setActiveMenuList] = useState([]);
  const [pathName, setPathName] = useState(location.pathname);

  // Update pathName when route changes
  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  const toggleMenu = (index) => {
    setActiveMenuList((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const verifyParentElement = (pathName, childrenArray = []) => {
    return childrenArray.findIndex((item) => item.link === pathName) >= 0;
  };

  const navigateToUrl = (url = "") => {
    navigate(url);
    setPathName(url);
  };

  return (
    <ul>
      {SidebarMenu.map((menu, index) => (
        <li key={menu.name}>
          {menu.children && menu.children.length > 0 ? (
            <>
              {/* Parent Menu */}
              <div
                onClick={() => toggleMenu(index)}
                role="button"
                tabIndex={0}
                className={`flex justify-between items-center w-full px-4 py-2 hover:bg-info/10 hover:pl-6 cursor-pointer ${
                  verifyParentElement(pathName, menu.children)
                    ? "text-info"
                    : "text-primary"
                } transition-all duration-300`}
              >
                <div className="flex gap-2 items-center">
                  {/* Menu icon */}
                  <span
                    className="material-symbols-outlined w-6 h-6"
                    style={{
                      fontVariationSettings: `"FILL" ${
                        verifyParentElement(pathName, menu.children) ? 1 : 0
                      }`,
                    }}
                  >
                    {menu.icon}
                  </span>
                  {/* Menu name */}
                  <span className="font-normal text-sm truncate">
                    {menu.name}
                  </span>
                </div>
                {/* Chevron */}
                <span className="material-symbols-outlined">
                  {activeMenuList.includes(index)
                    ? "expand_more"
                    : "chevron_right"}
                </span>
              </div>

              {/* Child Menus */}
              <ul
                className={`${activeMenuList.includes(index) ? "" : "hidden"}`}
              >
                {menu.children.map((childMenu) => (
                  <li key={childMenu.link}>
                    <div
                      onClick={() => navigateToUrl(childMenu.link)}
                      role="button"
                      tabIndex={0}
                      className={`pl-14 py-2 hover:bg-info/10 hover:pl-16 transition-all duration-300 cursor-pointer ${
                        pathName === childMenu.link
                          ? " bg-info/10 border-r-2 border-info"
                          : ""
                      }`}
                    >
                      <span className="font-normal text-sm">
                        {childMenu.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            /* Single Menu Item */
            <div
              onClick={() => navigateToUrl(menu.link ?? "/")}
              role="button"
              tabIndex={0}
              className={`flex gap-2 items-center w-full px-4 py-2 hover:bg-info/10 hover:pl-6 transition-all duration-300 cursor-pointer ${
                menu.link === pathName
                  ? "text-info bg-info/10 border-r-2 border-info"
                  : "text-primary"
              }`}
            >
              {menu.icon && (
                <span
                  className="material-symbols-outlined w-6 h-6"
                  style={{
                    fontVariationSettings: `"FILL" ${
                      menu.link === pathName ? 1 : 0
                    }`,
                  }}
                >
                  {menu.icon}
                </span>
              )}
              <span className="font-normal text-sm">{menu.name}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MnvSidebarChild;
