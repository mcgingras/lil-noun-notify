import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MyModal({ isOpen, setIsOpen, authCallback }) {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900 londrina-regular text-center"
                >
                  Find your noun!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 text-center">
                    You must connect your Discord account in order to be
                    notified of the next auction containing a noun with a
                    particular trait.
                  </p>
                </div>

                <div className="mt-4 mx-auto">
                  <button
                    type="button"
                    onClick={() => authCallback()}
                    className="flex items-center px-4 py-2 text-sm leading-4 font-medium rounded-md text-white bg-[#5865F2] hover:bg-indigo-400 mx-auto"
                  >
                    <img
                      src="/Discord-Logo-White.svg"
                      className="-ml-1 mr-2 h-5 w-5"
                    />
                    Connect
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
