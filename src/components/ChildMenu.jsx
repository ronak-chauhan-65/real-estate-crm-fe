import React from "react";

const ChildMenu = ({ childMenu = {}, onNavigate, currentPath }) => {
  if (childMenu?.children?.length) {
    return (
      <div className="bg-accent border border-info rounded-[0.375rem] min-w-[12rem]">
        <h6 className="py-[0.5rem] px-[1rem] capitalize text-sm font-[500] bg-info text-accent">
          {childMenu.name}
        </h6>

        {childMenu.children.map((child, index) => (
          <div
            key={index}
            className={`cursor-pointer py-[0.5rem] px-[1rem] capitalize text-sm font-[400] ${
              currentPath === child.link
                ? "bg-info/10 text-info font-medium"
                : "text-primary hover:bg-primary/10"
            }`}
            onClick={() => onNavigate(child.link)}
          >
            {child.name}
          </div>
        ))}
      </div>
    );
  }

  return <div className="p-[0.5rem] text-accent">{childMenu.name}</div>;
};

export default ChildMenu;
