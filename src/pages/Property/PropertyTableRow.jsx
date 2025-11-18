import React, { useRef } from "react";
import Tooltip from "../../components/Tooltip/Tooltip";
import useClickOutside from "../../CustomHook/useClickOutside";

const PropertyTableRow = React.memo(({ item, onEdit, onDelete, oninfo }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const ref = useRef();

  useClickOutside(ref, () => setMenuOpen(false));

  const formatIndianDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDaysDifference = (dateString) => {
    if (!dateString) return "-";

    const updatedDate = new Date(dateString);
    const today = new Date();

    // Convert both to midnight (remove hours)
    updatedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - updatedDate; // in milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <tr className="border-b border-gray-300 h-[110px] align-top hover:bg-black/5 ">
      {/* --- LEFT SECTION --- */}
      <td className="py-2 px-4 w-[15%] border-l-4 border-green-600 pl-3 ">
        <div className=""></div>
        <div className="flex flex-col">
          {/* Property Title */}
          <h3 className="text-[20px] font-semibold text-info-700 truncate cursor-pointer">
            {item?.buildingName.buildingName}
          </h3>

          {/* Area + Added On */}
          <p className="text-sm text-gray-500 ">
            Area: {item?.buildingName?.area?.area || "-"}
          </p>
          <p className="text-xs text-gray-400">
            Added On: {formatIndianDate(item?.createdAt) || "-"}
          </p>
        </div>
      </td>

      {/* --- DATE WITH GREEN BAR --- */}
      <td className="py-4 w-[10%] relative">
        <div className="">
          <p className="text-sm font-medium">
            {formatIndianDate(item?.updatedAt)}
          </p>
          <p className="text-xs text-gray-500">
            {getDaysDifference(item?.updatedAt)} days
          </p>
        </div>
      </td>

      {/* --- DETAILS SECTION --- */}
      <td className="py-2  w-[25%] ">
        <p className="font-medium text-gray-800">
          {item?.propertyType?.name || "-"}
        </p>
        <p className="text-sm text-gray-600">
          {item?.carpetArea} {item?.carpetMeasurement?.name} |{" "}
          {item?.propertyFor?.name} | {item?.furnishedStatus?.name}
        </p>
        <p className="text-xs text-gray-400 mt-1 italic">
          Remark: {item?.remarks || ""}
        </p>
      </td>

      <td className="py-2 w-[5%] font-semibold text-gray-900">
        {item?.wing || "-"}
      </td>

      <td className="py-2 text-center w-[5%] font-semibold text-gray-900">
        {item?.unitNo || "-"}
      </td>

      {/* --- PRICE COLUMN --- */}
      <td className="py-2 text-center  w-[10%] font-semibold text-gray-900 ">
        ₹ {item?.price}
      </td>

      {/* --- OWNER + CALL ICON --- */}
      <td className="py-2  w-[15%] w-full   flex flex-col justify-center items-center  gap-2">
        <p className="font-medium text-gray-700">
          {item?.ownerContactDetails[0]?.name || "-"}
        </p>
        <a href={`tel:${item?.contactNo}`} className="cursor-pointer">
          <span className="text-green-600 text-[24px] material-symbols-outlined">
            call
          </span>
        </a>
      </td>

      {/* --- ACTION ICONS --- */}
      <td className="py-2 px-6  w-[10%] relative   " ref={ref}>
        {/* 3-dot button */}

        <Tooltip content="Actions">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer p-1 flex items-center inline-block "
          >
            <span className="material-symbols-outlined text-[16px] text-gray-700 hover:bg-gray-200 p-2 rounded-full">
              more_vert
            </span>
          </div>
        </Tooltip>

        {/* Dropdown Menu - only visible when menuOpen = true */}
        {menuOpen && (
          <ul
            className="
        absolute left-[-50%] top-10 
        bg-white shadow-lg rounded-lg w-[120px] text-[16px]
        p-2 z-20
      "
          >
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  oninfo(item._id);
                }}
                className="flex gap-2 items-center w-full hover:bg-gray-100 p-1 text-[14px] rounded text-info"
              >
                <span className="material-symbols-outlined !text-[20px]">
                  info
                </span>
                Info
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false); // CLOSE MENU
                  onEdit(item); // OPEN DRAWER
                }}
                className="flex gap-2 items-center w-full hover:bg-gray-100 p-1 rounded text-[14px] text-info"
              >
                <span className="material-symbols-outlined !text-[20px]">
                  edit
                </span>
                Edit
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(item._id);
                }}
                className="flex gap-2 items-center w-full hover:bg-gray-100 p-1 text-[14px] rounded text-info"
              >
                <span className="material-symbols-outlined !text-[20px]">
                  delete
                </span>
                Delete
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  // Share logic
                }}
                className="flex gap-2 items-center w-full hover:bg-gray-100 p-1 rounded text-[14px] text-info"
              >
                <span className="material-symbols-outlined !text-[20px]">
                  share
                </span>
                Share
              </button>
            </li>
          </ul>
        )}
      </td>
    </tr>
  );
});

export default PropertyTableRow;
