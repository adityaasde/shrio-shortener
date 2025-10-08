"use client";

import Link from "next/link";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

export default function Home() {
  const [activeBtn, setActiveBtn] = useState<string>("url");
  const btnToggler = (btnName: string) => {
    if (btnName == "url") {
      setActiveBtn(btnName);
      return;
    }
    if (btnName == "qr") {
      setActiveBtn(btnName);
      return;
    }
  };
  console.log(activeBtn);

  return (
    <div>
      <div className="max-w-[800px] min-w-[200px] border border-stone-800 rounded-lg mx-auto my-24 flex flex-col gap-4 py-4 px-2">
        <div
          id="btns"
          className="flex flex-row items-center gap-2 w-fit justify-center mx-auto"
        >
          <button
            onClick={() => btnToggler("url")}
            className={`${
              activeBtn == "url" ? "bg-white text-black" : "text-white"
            } px-4 py-2 rounded-lg font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 flex flex-row items-center gap-2 border border-stone-800`}
          >
            <span className="material-symbols-outlined">link</span>
            URL
          </button>
          <button
            onClick={() => btnToggler("qr")}
            className={`${
              activeBtn == "qr" ? "bg-white text-black" : "text-white"
            } px-4 py-2 rounded-lg font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 flex flex-row items-center gap-2 border border-stone-800`}
          >
            <span className="material-symbols-outlined">qr_code</span>
            QR
          </button>
        </div>
        {activeBtn == "url" ? (
          <div id="url-box" className="p-2 flex flex-col gap-2">
            <form className="flex flex-col gap-2">
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="redirectUrl">Your magic link goes here*</label>
                <input
                  type="url"
                  name="redirectUrl"
                  id="redirectUrl"
                  placeholder="https://example.com/fun-page"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="slug">Give your link a nickname</label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  placeholder="Your URL’s nickname (e.g. my-cool-page)"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  placeholder="What’s this link about? Keep it short & sweet"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="slug">Link Expiration Date</label>
                <Flatpickr
                  className="w-full p-2 border border-stone-800 rounded-lg outline-none focus:ring-1 focus:ring-stone-900"
                  options={{
                    dateFormat: "D-m-y",
                    minDate: new Date(),
                  }}
                  placeholder="Select when this link expires"
                />
              </div>
              <div className="text-red-500">Internal server error!</div>
              <button className="bg-white text-black p-2 font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80">
                Generate URL
              </button>
            </form>

            <div id="generated" className="flex flex-col gap-2">
              <h2>Shorten Links</h2>
              <div className="flex flex-row gap-2 items-center">
                <input
                  type="text"
                  readOnly
                  id="shortUrl"
                  name="shortUrl"
                  value="google.com"
                  className="w-full cursor-pointer p-2 border outline-none text-stone-400 border-stone-800 rounded-lg"
                />
                <button className="flex p-2 border border-stone-800 rounded-lg cursor-pointer hover:bg-stone-900">
                  <span className="material-symbols-outlined">
                    content_copy
                  </span>
                </button>
                <button className="flex p-2 border border-stone-800 rounded-lg cursor-pointer hover:bg-stone-900">
                  <span className="material-symbols-outlined">edit_square</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div id="qr-box" className="p-2 flex flex-col gap-2">
            <form className="flex flex-col gap-2">
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="redirectUrl">Your magic link goes here*</label>
                <input
                  type="url"
                  name="redirectUrl"
                  id="redirectUrl"
                  placeholder="https://example.com/fun-page"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  placeholder="What’s this link about? Keep it short & sweet"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              <div className="text-red-500">Internal server error!</div>
              <button className="bg-white text-black p-2 font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80">
                Generate QR Code
              </button>
            </form>
            <div id="generated" className="flex flex-col gap-2">
              <h2>QR Codes</h2>
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  readOnly
                  id="qrUrl"
                  name="qrUrl"
                  value="google.com"
                  disabled
                  className="w-full cursor-pointer p-2 border border-stone-800 rounded-lg text-stone-400"
                />
                <button className="flex items-center justify-center p-2 border border-stone-800 hover:bg-stone-900 text-white cursor-pointer rounded-lg hover:opacity-80 transition">
                  <span className="material-symbols-outlined text-sm">
                    edit_square
                  </span>
                </button>
                <button className="flex items-center justify-center p-2 border border-stone-800 hover:bg-stone-900 text-white cursor-pointer rounded-lg hover:opacity-80 transition">
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </button>
                <button className="flex items-center justify-center p-2 bg-red-500 text-white cursor-pointer rounded-lg hover:opacity-80 transition">
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
