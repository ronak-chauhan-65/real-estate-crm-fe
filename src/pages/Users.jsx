import React from "react";
import Pagination from "../components/Pagination/Pagination";
import { paginationEntries } from "../components/Pagination/paginationEntries";
import PaginationFooter from "../components/Pagination/PaginationFooter";

const perPage = 10;
const currentPage = 1;
const totalData = 101;
const setCurrentPage = 2;

const onClick = () => {};

function Users() {
  return (
    <>
      <div className="overflow-x-auto bg-base-00">
        <table className="table table-xs min-w-[640px]">
          <thead>
            <tr className="!py-[1.5rem] !px-[2rem]  !text-sm sm:!text-base md:!text-lg lg:!text-xl">
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">2</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
            <tr className="h-[5.375rem] !text-sm sm:!text-base md:!text-lg lg:!text-[1.125rem] ">
              <th className="text-xl">3</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
          </tbody>
          {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </tfoot> */}
        </table>
        <PaginationFooter
          totalData={totalData}
          perPageOptions={[10, 20, 50]}
          defaultPerPage={20}
        />
      </div>
    </>
  );
}

export default Users;
