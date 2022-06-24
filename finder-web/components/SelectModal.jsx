import { useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

import IconModal from "../components/IconModal";

const SelectModal = ({ selected, setSelected, type }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="inline-flex shadow-sm rounded-md divide-x divide-gray-200">
          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-200">
            <div className="relative inline-flex items-center bg-white py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-gray-500">
              <p className="ml-2.5 text-sm font-medium lowercase">
                {selected?.name || `Select ${type}`}
              </p>
            </div>
            <button
              className="relative inline-flex items-center bg-gray-200 p-2 rounded-l-none rounded-r-md text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Change {type}</span>
              <ChevronDownIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <IconModal
          type={type}
          isOpen={open}
          setIsOpen={setOpen}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </>
  );
};

export default SelectModal;
