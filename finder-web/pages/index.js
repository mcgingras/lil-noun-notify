import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Transition } from "@headlessui/react";
import { XIcon, SparklesIcon } from "@heroicons/react/solid";
import { ImageData } from "@lilnouns/assets";
import Head from "next/head";

// components
import ProfileModal from "../components/ProfileModal";
import NounRender from "../components/NounRender";

export default function Home() {
  const [nouns, setNouns] = useState([]);
  const [activeNoun, setActiveNoun] = useState();
  const [head, setHead] = useState("-1");
  const [nounBody, setNounBody] = useState("-1");
  const [eyewear, setEyewear] = useState("-1");
  const [accessory, setAccessory] = useState("-1");

  // modal
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // transition states
  const [isUp, setUp] = useState(false);
  const [buttonUp, setButtonUp] = useState(true);

  const {
    images: { bodies, heads, accessories, glasses },
  } = ImageData;

  const bodyNames = bodies.map((body) => body.filename.slice(5));
  const headNames = heads.map((head) => head.filename.slice(5));
  const glassesNames = glasses.map((glasses) => glasses.filename.slice(8));
  const accessoryNames = accessories.map((accessory) =>
    accessory.filename.slice(10)
  );

  useEffect(() => {
    const getNouns = async () => {
      const fetchNounsResponse = await fetch("/api/getNouns", {
        method: "POST",
        body: JSON.stringify({
          head: head,
          body: nounBody,
          glasses: eyewear,
          accessory: accessory,
        }),
      });

      const fetchNounsJson = await fetchNounsResponse.json();
      setNouns(fetchNounsJson.nouns);
    };
    getNouns();
  }, [head, nounBody, eyewear, accessory]);

  return (
    <div>
      <Head>
        <title>Lil Nouns Trait Finder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen bg-[#DFD7D5] flex flex-col">
        <ProfileModal
          isOpen={profileModalOpen}
          setIsOpen={setProfileModalOpen}
          noun={activeNoun}
        />
        <section className="px-12 h-full flex-grow flex flex-col">
          <header className="pt-12 flex flex-row justify-between">
            <img src="/ln.svg" className="h-[58px]" alt="current noun" />
            <div className="flex flex-row space-x-4">
              <div className="w-[200px]">
                <FloatingLabel controlId="floatingSelect" label="Head">
                  <Form.Select
                    className="border-0"
                    aria-label="Floating label select example"
                    onChange={(e) => setHead(e.target.value)}
                  >
                    <option value={-1}>Any</option>
                    {headNames.map((name, idx) => (
                      <option key={idx} value={idx}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>

              <div className="w-[200px]">
                <FloatingLabel controlId="floatingSelect" label="Body">
                  <Form.Select
                    className="border-0"
                    aria-label="Floating label select example"
                    onChange={(e) => setNounBody(e.target.value)}
                  >
                    <option value={-1}>Any</option>
                    {bodyNames.map((name, idx) => (
                      <option key={idx} value={idx}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>

              <div className="w-[200px]">
                <FloatingLabel controlId="floatingSelect" label="Glasses">
                  <Form.Select
                    className="border-0"
                    aria-label="Floating label select example"
                    onChange={(e) => setEyewear(e.target.value)}
                  >
                    <option value={-1}>Any</option>
                    {glassesNames.map((name, idx) => (
                      <option key={idx} value={idx}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>

              <div className="w-[200px]">
                <FloatingLabel controlId="floatingSelect" label="Accessories">
                  <Form.Select
                    className="border-0"
                    aria-label="Floating label select example"
                    onChange={(e) => setAccessory(e.target.value)}
                  >
                    <option value={-1}>Any</option>
                    {accessoryNames.map((name, idx) => (
                      <option key={idx} value={idx}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>
            </div>
          </header>

          <div className="flex-grow">
            <NounRender
              className="h-full mx-auto"
              seed={{
                head: head,
                body: nounBody,
                glasses: eyewear,
                accessory: accessory,
              }}
            />
          </div>
        </section>

        <Transition
          show={buttonUp}
          enter="transition ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setUp(true)}
        >
          {nouns.length > 0 && (
            <button
              className="absolute right-8 bottom-8 bg-yellow-400 text-yellow-700 rounded-full p-3 flex items-center"
              onClick={() => {
                setButtonUp(false);
              }}
            >
              {/* <SparklesIcon className="h-5 w-5 opacity-100" /> */}
              <span className="mx-1">Show results</span>
              {/* <SparklesIcon className="h-5 w-5 opacity-100" /> */}
            </button>
          )}
        </Transition>

        <Transition
          show={isUp}
          enter="transform transition-all ease-in-out duration-500 sm:duration-700"
          enterFrom="h-0"
          enterTo="h-[264px]"
          leave="transform transition-all ease-in-out duration-500 sm:duration-700"
          leaveFrom="h-full"
          leaveTo="h-0"
          afterLeave={() => setButtonUp(true)}
        >
          <div className="bg-white w-full h-full rounded-t-[3rem] p-8 relative">
            <button
              className="absolute right-8 top-[-5rem] bg-gray-200 text-gray-500 rounded-full p-3 flex items-center"
              onClick={() => {
                setUp(false);
              }}
            >
              <span className="mx-1">Hide results</span>
            </button>
            <div className="flex flex-row space-x-8">
              {nouns.length === 0 && (
                <span className="h-[200px] w-full text-gray-400 londrina-regular text-5xl flex items-center justify-center">
                  No lil nouns fit that seed :(
                </span>
              )}
              {nouns.slice(0, 7).map((noun, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveNoun(noun);
                      setProfileModalOpen(true);
                    }}
                  >
                    <NounRender
                      seed={noun.seed}
                      className="h-[200px] rounded-lg"
                    />
                  </div>
                );
              })}
              {nouns.length > 8 && (
                <div className="h-full w-full bg-gray-100 text-gray-400 text-3xl flex justify-center items-center londrina-regular">
                  Show more
                </div>
              )}
            </div>
          </div>
        </Transition>
      </main>
    </div>
  );
}
