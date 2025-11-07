import React from "react";
import Tooltip from "../../components/Tooltip/Tooltip";

const AreaTableRow = React.memo(({ val }) => {
  return (
    <tr
      className={`table-auto hover:bg-black/[0.03] border-b border-gray-200 h-[5.375rem] max-h-[86px]`}
    >
      <td className="max-w-[90%] py-[1rem]  pl-[2rem]">
        <h5 className="font-medium text-lg leading-[1.688rem] truncate max-w-[30ch]">
          <abbr title={val?.name} className="no-underline">
            {val?.name || "-"}
          </abbr>
        </h5>
      </td>

      <td className="py-2 max-w-[10%] text-right">
        <div className="flex justify-start gap-2">
          <Tooltip content="Edit">
            <button onClick={() => {}} className="text-info hover:underline">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </Tooltip>

          <Tooltip content="Delete">
            <button onClick={() => {}} className="text-info hover:underline">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
});

export default AreaTableRow;
