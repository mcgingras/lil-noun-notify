import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import NounRender from "./NounRender";

export default function ProfileModal({ isOpen, setIsOpen, noun, traits }) {
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
              {noun && (
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <div className="border-b pb-4">
                    <NounRender seed={noun.seed} className="w-full" />
                    <h3 className="text-3xl pt-4 londrina-regular">
                      Lil Noun #{noun.id}
                    </h3>
                    <div className="flex flex-row space-x-2 mt-2">
                      <span
                        className={`${
                          parseInt(traits.head.localId) ===
                          parseInt(noun.seed.head)
                            ? "bg-yellow-400 text-yellow-700"
                            : "bg-gray-100 text-gray-400"
                        }  px-2 py-2 rounded-full text-xs uppercase leading-5 tracking-wider font-bold`}
                      >
                        Head
                      </span>
                      <span
                        className={`${
                          parseInt(traits.body.localId) ===
                          parseInt(noun.seed.body)
                            ? "bg-yellow-400 text-yellow-700"
                            : "bg-gray-100 text-gray-400"
                        }  px-2 py-2 rounded-full text-xs uppercase leading-5 tracking-wider font-bold`}
                      >
                        Body
                      </span>
                      <span
                        className={`${
                          parseInt(traits.glasses.localId) ===
                          parseInt(noun.seed.glasses)
                            ? "bg-yellow-400 text-yellow-700"
                            : "bg-gray-100 text-gray-400"
                        }  px-2 py-2 rounded-full text-xs uppercase leading-5 tracking-wider font-bold`}
                      >
                        Glasses
                      </span>
                      <span
                        className={`${
                          parseInt(traits.accessory.localId) ===
                          parseInt(noun.seed.accessory)
                            ? "bg-yellow-400 text-yellow-700"
                            : "bg-gray-100 text-gray-400"
                        }  px-2 py-2 rounded-full text-xs uppercase leading-5 tracking-wider font-bold`}
                      >
                        Accessory
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex">
                    <a
                      className="text-xs text-gray-400 mr-2 underline-offset-2 hover:text-gray-500"
                      href={`https://opensea.io/assets/ethereum/0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b/${noun.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Opensea
                    </a>
                    <a
                      className="text-xs text-gray-400 mr-2 underline-offset-2 hover:text-gray-500"
                      href={`https://lilnouns.wtf/lilnoun/${noun.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      lilnouns
                    </a>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
