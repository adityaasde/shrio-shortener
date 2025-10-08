"use client";

import Link from "next/link";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

export default function Url() {
  return (
    <div>
      <div className="max-w-[800px] min-w-[200px] border border-stone-800 rounded-lg mx-auto my-24 flex flex-col gap-4 py-4 px-2">
        <div id="head" className="flex flex-row items-center gap-2">
          <button className="flex p-1 cursor-pointer">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <Link href="" className="hover:underline">
            https://shorten.url/slugHere
          </Link>
        </div>
        <div id="update">
          <div className="flex flex-col gap-2">
            <input
              type="url"
              name="redirectTo"
              id="redirectTo"
              placeholder="Original URL"
              readOnly
              disabled
              className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full cursor-not-allowed"
            />
            <form action="" className="flex flex-col gap-2">
              <input
                type="text"
                name="slug"
                id="slug"
                placeholder="URL nickname"
                className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
              />
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder="Description"
                className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
              />
              <Flatpickr
                className="w-full p-2 border border-stone-800 rounded-lg outline-none focus:ring-1 focus:ring-stone-900"
                options={{
                  dateFormat: "D-m-y",
                  minDate: new Date(),
                }}
                placeholder="Select when this link expires"
              />
              <button className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-pointer transition-all hover:opacity-80 duration-200">
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <div
          id="analytics"
          className="flex flex-row items-center gap-1 w-full max-sm:flex-col"
        >
          <div
            id="block"
            className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center w"
          >
            <p className="line-clamp-1">Estimated Clicks</p>
            <p className="text-lg font-semibold">2508</p>
          </div>
          <div
            id="block"
            className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
          >
            <p className="line-clamp-1">Today's Clicks</p>
            <p className="text-lg font-semibold">1953</p>
          </div>
          <div
            id="block"
            className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
          >
            <p>Mobile</p>
            <p className="text-lg font-semibold">408</p>
          </div>
          <div
            id="block"
            className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
          >
            <p>Desktop</p>
            <p className="text-lg font-semibold">180</p>
          </div>
        </div>
      </div>
    </div>
  );
}
