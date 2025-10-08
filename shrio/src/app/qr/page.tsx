export default function QR() {
  return (
    <div>
      <div className="max-w-[800px] min-w-[200px] border border-stone-800 rounded-lg mx-auto my-16 flex flex-col gap-4 py-4 px-2">
        <div id="head">
          <button className="flex p-1 cursor-pointer">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <div id="qr-code" className="mx-auto">
          <img src="/" alt="qr-image" className="w-48 h-48"/>
        </div>
        <div id="inputs">
          <form action="" className="flex flex-col gap-2">
            <input
              type="url"
              name="redirectTo"
              id="redirectTo"
              placeholder="Original URL"
              className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Description"
              className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
            />
            <button className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-pointer transition-all hover:opacity-80 duration-200">
              Save Changes
            </button>
          </form>
        </div>
        <div
          id="analytics"
          className="flex flex-row items-center gap-1 w-full max-sm:flex-col"
        >
          <div
            id="block"
            className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center w"
          >
            <p className="line-clamp-1">Estimated Scans</p>
            <p className="text-lg font-semibold">2508</p>
          </div>
          <div
            id="block"
            className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
          >
            <p className="line-clamp-1">Today's Scans</p>
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
