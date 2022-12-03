import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";
import { useState } from "react";
const DropDown = ({ orderBy, sortBy, onHandleOrder, onHandleSort }) => {
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onHandleSort("petName")}
        >
          Pet Name {sortBy === "petName" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onHandleSort("ownerName")}
        >
          Owner Name {sortBy === "ownerName" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onHandleSort("aptDate")}
        >
          Date {sortBy === "aptDate" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem"
          onClick={() => onHandleOrder("asc")}
        >
          Asc {orderBy === "asc" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          onClick={() => onHandleOrder("desc")}
        >
          Desc {orderBy === "desc" && <BiCheck />}
        </div>
      </div>
    </div>
  );
};

const Search = ({
  query,
  onQueryChange,
  sortBy,
  orderBy,
  onHandleOrder,
  onHandleSort,
}) => {
  const [toggleSort, setToggleSort] = useState(false);

  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm border p-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
          <BiSearch className="text-sm" />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
          className="pl-8 focus:outline-none rounded-md  block w-full sm:text-sm "
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              onClick={() => {
                setToggleSort(!toggleSort);
              }}
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center rounded-r-md"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            {toggleSort && (
              <DropDown
                sortBy={sortBy}
                orderBy={orderBy}
                onHandleSort={(mySort) => onHandleSort(mySort)}
                onHandleOrder={(myOrder) => onHandleOrder(myOrder)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
