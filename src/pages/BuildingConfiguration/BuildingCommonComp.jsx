import Table from "../../components/Table/Table";
import BuildingTableRow from "./BuildingTableRow";
import NodataFound from "../../components/NoDataFound/NodataFound";
import { useCallback, useMemo, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import BconfigurationDrawerContent from "./BconfigurationDrawerContent";
import {
  getMasterConfigg,
  postMasterConfigg,
} from "../../components/APICalls/masterConfig";
import { showToast } from "../../utils/toastUtils";

function Buildingconfiguration({ item, index, onRefresh }) {
  // console.log(item, "itemitem");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [onEditID, setonEditID] = useState("");

  const [loader, setloader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const [validationObj, setvalidationObj] = useState({
    nameError: false,
  });

  const formValidation = () => {
    console.log(formData, "formData");

    const nameError = !formData?.name || formData?.name.length < 2;
    setvalidationObj({ nameError });

    return !nameError;
  };

  // close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setFormData({ name: "" });
    setvalidationObj({ nameError: false });
  };

  // Update drawer  field values
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    if (formValidation()) {
      setloader(true);

      const response = await postMasterConfigg({
        key: item.key,
        name: formData?.name,
      });

      if (response.success) {
        showToast("success", response?.data?.msg);
        handleCloseDrawer();

        if (typeof onRefresh === "function") {
          await onRefresh(item.key);
        }
      } else {
        showToast("error", response?.error?.msg);
      }
      setloader(false);
    }
  };

  const handleEdit = useCallback(async (item) => {
    console.log(item, "handleEdithandleEdit");

    setFormData({ name: item?.name });
    setIsDrawerOpen(true);
    setonEditID(user?._id);
  }, []);
  // Drawer Footer
  const drawerFooter = (
    <div className="flex gap-3 w-full">
      <button
        className="btn btn-accent border-info w-1/2"
        onClick={handleCloseDrawer}
      >
        Close
      </button>
      <button className="btn btn-info text-accent w-1/2" onClick={handleSave}>
        Save
      </button>
    </div>
  );

  // Table Configuration
  const tableHeaderData = useMemo(
    () => [
      { name: "Name", isSort: false },
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
    return item?.data?.map((val) => (
      <BuildingTableRow
        key={val._id || val.id} // use _id if API gives it
        val={val}
        onEdit={handleEdit}
      />
    ));
  }, [item.data, handleEdit]);

  return (
    <div className="mx-[1rem] lg:mx-[2rem] ">
      <div
        className={`flex-wrap lg:flex  ${
          index === 0 ? "sticky top-0 z-[9]" : ""
        }  bg-base-100  items-center justify-between w-full  `}
      >
        <div className="pb-4">
          <h3 className="text-[2rem] font-[600]  text-info ">{item.title}</h3>
          <h5 className="!text-sm opacity-50 font-normal text-primary">
            {item.title} details
          </h5>
        </div>

        <div className="flex gap-3 ">
          <button
            className="btn btn-info text-accent rounded-[15px]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span class="material-symbols-outlined">add</span> Add
          </button>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            header={`Add`}
            position="end"
            footer={drawerFooter}
            onEditID={onEditID}
          >
            <BconfigurationDrawerContent
              formData={formData}
              validationObj={validationObj}
              handleChange={handleChange}
              field={item.key}
            />
          </Drawer>
        </div>
      </div>

      <div className="w-full">
        {loader ? (
          <div className="flex flex-col items-center justify-center py-10  w-full h-full ">
            <span className="loading loading-spinner loading-lg text-info"></span>
            <p className="text-sm text-gray-400 mt-2">
              Loading {item?.title}...
            </p>
          </div>
        ) : (
          <div className="text-secondary  pb-0  bg-accent rounded-[25px]  overflow-x-scroll ">
            <Table
              tableHeaderData={tableHeaderData}
              showPagination={false}
              scrollToTop={true}
            >
              {rows}
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buildingconfiguration;
