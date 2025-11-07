import Table from "../../components/Table/Table";
import BuildingTableRow from "./BuildingTableRow";
import NodataFound from "../../components/NoDataFound/NodataFound";
import { useMemo } from "react";

function Buildingconfiguration({ item }) {
  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: "Area", isSort: false },
      { name: "Action", isSort: false, center: true },
    ],
    []
  );

  const rows = useMemo(() => {
    console.log(item);

    // If no areas, show "No data"
    if (!item.data || item.data.length === 0) {
      return (
        <tr>
          <td colSpan="100%" className="text-center py-4 text-gray-500 ">
            <NodataFound />
          </td>
        </tr>
      );
    }

    // Otherwise render area rows
    return item.data.map((val) => (
      <BuildingTableRow
        key={val._id || val.id} // use _id if API gives it
        val={val}
      />
    ));
  }, [item.data]);

  return (
    <div className="mx-[1rem] lg:mx-[2rem] ">
      <div className="flex-wrap sticky  top-0 z-[9] lg:flex   bg-base-100  items-center justify-between w-full  ">
        <div className="pb-4">
          <h3 className="text-[2rem] font-[600]  text-info ">{item.title}</h3>
          <h5 className="!text-sm opacity-50 font-normal text-primary">
            {item.title} details
          </h5>
        </div>

        <div className="flex gap-3 ">
          <button
            className="btn btn-info text-accent rounded-[15px]"
            onClick={() => {}}
          >
            <span class="material-symbols-outlined">add</span> Add
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="text-secondary  pb-0  bg-accent rounded-[25px]  overflow-x-scroll ">
          <Table
            tableHeaderData={tableHeaderData}
            showPagination={false}
            scrollToTop={true}
          >
            {rows}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Buildingconfiguration;
