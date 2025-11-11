import React from "react";
import Tooltip from "../../components/Tooltip/Tooltip";

const BuilidingTableRow = React.memo(({ item, onEdit, onDelete }) => {
  return (
    <tr
      className={`table-auto hover:bg-black/[0.03] border-b border-gray-200 h-[5.375rem] max-h-[86px] ${
        item?.status ? "bg-accent" : "bg-secondary/10"
      }`}
    >
      <td className="max-w-[9.375rem] py-[1rem]  pl-[2rem]">
        <h5 className="font-medium text-lg leading-[1.688rem] truncate max-w-[30ch]">
          <abbr title={item?.buildingName} className="no-underline">
            {item?.buildingName || "-"}
          </abbr>
        </h5>
      </td>

      <td className="py-2 text-lg">{item.address || "-"}</td>
      {/* <td className="py-2 text-lg">{item.city}</td> */}
      <td className="py-2 text-lg">{item.nameOfBuilder || "-"}</td>
      <td className="max-w-[9.375rem]  py-[1rem] truncate max-w-[30ch]">
        {" "}
        {item.propertyType.map((pt) => pt.label).join(", ") || "-"}
      </td>

      <td className="max-w-[9.375rem]  py-[1rem]">
        {" "}
        {new Date(item.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}{" "}
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
        </div>
      </td>
    </tr>
  );
});

export default BuilidingTableRow;
