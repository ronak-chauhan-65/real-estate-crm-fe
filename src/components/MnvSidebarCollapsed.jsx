// MnvSidebarCollapsed.jsx
import React, { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react"; // non-headless is simpler here
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Props:
 *  SidebarMenu: [ { name, icon, link?, children?: [{name, link}] }, ... ]
 */
const MnvSidebarCollapsed = ({ SidebarMenu = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState(location.pathname);

  useEffect(() => setPathName(location.pathname), [location.pathname]);

  // store tippy instance for each menu so we can hide it programmatically
  const tippyInstances = useRef({});

  // utility navigate + hide tooltip
  const goAndHide = (url, menuKey) => {
    if (!url) return;
    navigate(url);
    setPathName(url);
    const inst = tippyInstances.current[menuKey];
    if (inst && typeof inst.hide === "function") inst.hide();
  };

  return (
    <ul className="flex flex-col">
      {SidebarMenu.map((menu) => {
        const hasChildren =
          Array.isArray(menu.children) && menu.children.length > 0;
        const isActive =
          menu.link === pathName ||
          (hasChildren && menu.children.some((c) => c.link === pathName));

        // tooltip content
        const content = hasChildren ? (
          <div className="min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-3 py-2 bg-info text-accent font-semibold text-sm">
              {menu.name}
            </div>
            <div className="max-h-[240px] overflow-y-auto">
              {menu.children.map((child) => (
                <div
                  key={child.link}
                  onClick={() => goAndHide(child.link, menu.name)}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    pathName === child.link
                      ? "bg-info/10 text-info font-medium"
                      : "hover:bg-slate-100 text-black"
                  }`}
                >
                  {child.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-3 py-2 bg-info text-accent rounded-md shadow border text-sm">
            {menu.name}
          </div>
        );

        return (
          <li key={menu.name} className="my-1 ">
            <Tippy
              content={content}
              interactive={true}
              theme="custom"
              placement={hasChildren ? "right-start" : "right"}
              trigger="mouseenter focus"
              delay={[0, 0]} // show/hide instantly
              animation="shift-away"
              appendTo={() => document.body}
              popperOptions={{ strategy: "fixed" }}
              hideOnClick={false} // we'll manually hide when clicking child
              onCreate={(instance) => {
                // keep ref
                tippyInstances.current[menu.name] = instance;
                // ensure popper will hide when pointer leaves icon+popper (fixes stickiness)
                const refEl = instance.reference;
                const popperEl = instance.popper;

                // helper to attach mouseleave on both reference and popper
                const onMouseLeaveBoth = (ev) => {
                  // use a small timeout to allow moving between reference and popper
                  // but we will hide immediately if not over either
                  setTimeout(() => {
                    const fromRef = refEl.matches(":hover");
                    const fromPopper = popperEl.matches(":hover");
                    if (!fromRef && !fromPopper) {
                      instance.hide();
                    }
                  }, 8); // tiny delay to allow quick in-between moves
                };

                // attach listeners
                refEl.addEventListener("mouseleave", onMouseLeaveBoth);
                popperEl.addEventListener("mouseleave", onMouseLeaveBoth);

                // Also hide if user clicks outside
                instance.popper.addEventListener("mousedown", (e) => {
                  // clicks inside handled by children; clicking outside will be handled by tippy
                });

                // cleanup when destroyed
                instance._cleanup = () => {
                  try {
                    refEl.removeEventListener("mouseleave", onMouseLeaveBoth);
                    popperEl.removeEventListener(
                      "mouseleave",
                      onMouseLeaveBoth
                    );
                  } catch (e) {}
                };
              }}
              onHidden={(instance) => {
                // cleanup listeners when tooltip hidden/destroyed
                if (instance && instance._cleanup) instance._cleanup();
              }}
            >
              <div className="px-[1.3rem]">
                <div
                  className={` flex items-center justify-center rounded-md cursor-pointer transition-colors  ${
                    isActive
                      ? "text-info bg-info/10"
                      : "text-secondary hover:bg-secondary/10"
                  }`}
                  onClick={() => {
                    // parent click: go to first child (if exists) or parent link
                    if (hasChildren)
                      goAndHide(menu.children[0].link, menu.name);
                    else goAndHide(menu.link, menu.name);
                  }}
                  aria-label={menu.name}
                  role="button"
                  tabIndex={0}
                >
                  <span class="material-symbols-outlined p-[0.5rem]">
                    {" "}
                    {menu.icon}
                  </span>
                </div>
              </div>
            </Tippy>
          </li>
        );
      })}
    </ul>
  );
};

export default MnvSidebarCollapsed;
