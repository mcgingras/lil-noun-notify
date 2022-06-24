import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const IconModal = ({ isOpen, setIsOpen, selected, setSelected, type }) => {
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    const getTraits = async () => {
      const traitsResponse = await fetch("/api/getTraits", {
        method: "POST",
        body: JSON.stringify({ type }),
      });

      const traitsJson = await traitsResponse.json();
      setTraits(traitsJson.response);
    };
    getTraits();
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <div className="grid grid-cols-6 gap-4">
                  {traits.map((trait) => {
                    return (
                      <img
                        onClick={() => {
                          setSelected(trait);
                          setIsOpen(false);
                        }}
                        className={`rounded cursor-pointer ${
                          selected.id === trait.id &&
                          "ring-2 ring-gray-500 ring-offset-4"
                        }`}
                        src={`data:image/svg+xml;base64,${trait.svg}`}
                      />
                    );
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default IconModal;
