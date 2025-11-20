import React, { useRef } from "react";
import Tooltip from "../../components/Tooltip/Tooltip";
import useClickOutside from "../../CustomHook/useClickOutside";

const InquiryTableRow = React.memo(
  ({ item, onEdit, onDelete, oninfo, onFollowUp }) => {
    {
      console.log(item, "itemitemitem");
    }
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
        <td className="max-w-[11.375rem] py-[1rem]  pl-[2rem] border border-red-500">
          <h5 className="font-medium text-lg leading-[1.688rem] truncate max-w-[30ch]">
            <abbr title={item?.clientName} className="no-underline">
              {item?.clientName || "-"}
            </abbr>
            <div className="text-[14px]">{item?.mobile}</div>
          </h5>
        </td>

        <td className="py-2 text-lg">{item?.requirementType?.name}</td>

        <td className="py-2 text-lg border border-red-400">
          {item.budgetFrom} To {item.budgetTo}{" "}
        </td>

        <td className="py-2 text-lg">Next Followup</td>

        <td className="py-2 text-lg">
          <div>{item?.employee?.name}</div>
          <div>{formatIndianDate(item?.createdAt)}</div>
        </td>

        <td className="py-2 text-right">
          <div className="flex justify-start gap-2">
            <Tooltip content="Edit">
              <button
                onClick={() => onEdit(item)}
                className="text-info hover:underline"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </Tooltip>

            <Tooltip content="Delete">
              <button
                onClick={() => onDelete(item._id)}
                className="text-info hover:underline"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </Tooltip>

            <Tooltip content="Matched Property">
              <button
                onClick={() => onDelete(item._id)}
                className="text-info hover:underline"
              >
                <span class="material-symbols-outlined">search_gear</span>
              </button>
            </Tooltip>

            <Tooltip content="Follow Ups">
              <button
                onClick={() => onFollowUp(item._id)}
                className="text-info hover:underline"
              >
                <span class="material-symbols-outlined">notification_add</span>
              </button>
            </Tooltip>
          </div>
        </td>
      </tr>
    );
  }
);

export default InquiryTableRow;
