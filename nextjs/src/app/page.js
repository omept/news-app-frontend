"use client";
import { useContext, useEffect, useState } from "react";
import { FeedsContext, FeedsDispatchContext } from "./_contexts/feedsContext";
import { MetaContext } from "./_contexts/metaContext";
import { log, ucwords } from "./_appBackendApi/appBackendApi";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  const metaState = useContext(MetaContext);
  const feedState = useContext(FeedsContext);
  const dispatchFeeds = useContext(FeedsDispatchContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    if (metaState?.categories) {
      setCategories(() => metaState.categories);
    }
    if (metaState?.countries) {
      setCountries(() => metaState.countries);
    }
  }, [metaState]);

  useEffect(() => {
    if (feedState?.search) {
      setSearch(() => feedState.search);
    }
    if (selectedCategory == "" && feedState?.category) {
      setSelectedCategory(() => feedState.category.name);
    }
    if (selectedCountry == "" && feedState?.country) {
      setSelectedCountry(() => feedState.country.name);
    }
    if (feedState?.items) {
      setFeedItems(() => feedState.items);
    }
  }, [feedState]);

  function handleCountryChange(event) {
    const cntry = event.target.value;
    setSelectedCountry(() => cntry);
  }
  function handleCategoryChange(event) {
    const cat = event.target.value;
    setSelectedCategory(() => cat);
  }

  function handleSearchChange(event) {
    const searchVal = event.target.value;
    setSearch(() => searchVal);
  }

  function handleSearchKeyUp(event) {
    if (event.key == "Enter") {
      log("Searching ...");
      reloadFeeds();
    }
  }

  async function reloadFeeds() {
    setLoading(()=> true);
    const uri = `${baseUrl}/feeds?search=${search}&category=${selectedCategory}&country=${selectedCountry}`;
    try {
      const response = await axios.get(uri);
      log(uri);
      dispatchFeeds({ type: "changed", payload: response.data.data.feeds });
    } catch (error) {
      alert(error);
    }
    setLoading(()=> false);
  }

  return loading ? (
    <p className="text-center"> Loading ...</p>
  ) : (
    <>
      <div className="mx-20 mt-10 grid gap-10 lg:grid-cols-4">
        <div className="relative mb-4 flex flex-wrap">
          <input
            type="search"
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={handleSearchChange}
            onKeyUp={handleSearchKeyUp}
            value={search}
          />

          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="relative mb-4 flex flex-wrap item-center ">
          <label className="pt-2 font-bold">Country: </label>
          <select
            className="w-80"
            value={ucwords(selectedCountry)}
            onChange={handleCountryChange}
          >
            {countries.map((item) => (
              <option key={item} value={ucwords(item)}>
                {ucwords(item)}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-4 flex flex-wrap item-center">
          <label className="pt-2 font-bold">Category: </label>
          <select
            className="w-80"
            value={selectedCategory}
            onInput={handleCategoryChange}
            // onChange={handleCategoryChange}
          >
            {categories.map((item) => (
              <option key={item.name} value={ucwords(item.name)}>
                {ucwords(item.name)}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-4 flex flex-wrap item-center">
          <button
            type="button"
            style={{ background: "green" }}
            onClick={reloadFeeds}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit
          </button>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto md:px-6">
          <section className="mb-32 text-center md:text-left">
            <h2 className="mb-12 text-center text-3xl font-bold">Feed</h2>
            {feedItems.length == 0 ? (
              <p className="text-center">
                No news feed items. Consider changing news source from settings.
              </p>
            ) : (
              ""
            )}
            {feedItems.map((item, index) => (
              <div className="mb-6 flex flex-wrap" key={index}>
                <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
                  <div
                    className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <img src={item.image} className="w-full" alt="Louvre" />
                    <Link href={item.link} target="_blank">
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
                    </Link>
                  </div>
                </div>

                <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                  <h5 className="mb-3 text-lg font-bold">{item.title}</h5>
                  <div className="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="mr-2 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                      />
                    </svg>
                    {ucwords(selectedCategory)}
                  </div>
                  <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                    <small>
                      Published <u>{item.date}</u> by
                      <Link href={item.link} target="_blank">
                        {" "}
                        {item.author}
                      </Link>
                    </small>
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-300">
                    {item.description.substring(0, 250)}{" "}
                    <small>
                      <br />
                      <Link
                        href={item.link}
                        target="_blank"
                        className=" font-large text-success"
                      >
                        <b> {">>"} Read More</b>
                      </Link>
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
