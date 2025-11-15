import React from "react";
import Tooltip from "../../components/Tooltip/Tooltip";

const PropertyTableRow = React.memo(({ item, onEdit, onDelete }) => {
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
    <tr className="border-b border-gray-300 h-[110px] align-top hover:bg-black/5">
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
      <td className="py-4 px-2 w-[10%] relative">
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
      <td className="py-2 px-3 w-[25%] ">
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

      <td className="py-2 px-3 w-[15%] font-semibold text-gray-900">
        {item?.wing || "-"}
      </td>

      <td className="py-2 px-3 w-[15%] font-semibold text-gray-900">
        {item?.unitNo || "-"}
      </td>

      {/* --- PRICE COLUMN --- */}
      <td className="py-2 px-3 w-[15%] font-semibold text-gray-900">
        ₹ {item?.price}
      </td>

      {/* --- OWNER + CALL ICON --- */}
      <td className="py-2 px-3 w-[15%]">
        <p className="font-medium text-gray-700">
          {item?.ownerContactDetails?.name || "-"}
        </p>
        <a href={`tel:${item?.contactNo}`} className="cursor-pointer">
          <span className="text-green-600 text-[24px] material-symbols-outlined">
            call
          </span>
        </a>
      </td>

      {/* --- ACTION ICONS --- */}
      <td className="py-2 px-3 w-[10%]">
        <div
          className="
      grid grid-cols-2
      items-center
      gap-3
      flex-wrap
      md:gap-3
      sm:gap-2
      xs:gap-1
    "
        >
          {/* EDIT */}
          <Tooltip content="Edit">
            <span
              onClick={() => onEdit(item)}
              className="
          material-symbols-outlined
          cursor-pointer
          text-gray-600
          hover:text-blue-600
          text-[22px]
          md:text-[22px]
          sm:text-[20px]
          xs:text-[18px]
        "
            >
              edit
            </span>
          </Tooltip>

          {/* SHARE */}
          <Tooltip content="Share">
            <span
              className="
          material-symbols-outlined
          cursor-pointer
          text-gray-600
          hover:text-blue-600
          text-[22px]
          md:text-[22px]
          sm:text-[20px]
          xs:text-[18px]
        "
            >
              share
            </span>
          </Tooltip>

          {/* NOTES */}
          <Tooltip content="Notes">
            <span
              className="
          material-symbols-outlined
          cursor-pointer
          text-gray-600
          hover:text-blue-600
          text-[22px]
          md:text-[22px]
          sm:text-[20px]
          xs:text-[18px]
        "
            >
              list_alt
            </span>
          </Tooltip>

          {/* DELETE */}
          <Tooltip content="Delete">
            <span
              onClick={() => onDelete(item._id)}
              className="
          material-symbols-outlined
          cursor-pointer
          text-red-600
          hover:text-red-700
          text-[22px]
          md:text-[22px]
          sm:text-[20px]
          xs:text-[18px]
        "
            >
              delete
            </span>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
});

export default PropertyTableRow;
