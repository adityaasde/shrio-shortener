"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { serverURL } from "@/types/product";
import { userStore } from "@/store/userStore";
import { fetchUrl } from "@/service/fetchUrl";
import Loader from "@/components/Loader";
import { updateUrl } from "@/service/updateUrl";
import BtnLoader from "@/components/BtnLoader";
import { deleteUrl } from "@/service/deleteUrl";

export default function Url() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMsg, setMsg] = useState<string>("");
  const [urlData, setUrlData] = useState<serverURL>();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const user = userStore((state) => state.user);
  const [updateData, setUpdateData] = useState({
    slug: urlData?.slug || "",
    description: urlData?.description || "",
    expireDate: urlData?.expireDate
      ? new Date(urlData.expireDate).toISOString().split("T")[0]
      : "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUrlUser = async () => {
    try {
      setPageLoading(true);

      const fetch = await fetchUrl(id, user);

      if (!fetch.success) {
        setMsg(fetch.message);
        setPageLoading(false);
        return;
      }

      if (fetch.success) {
        setPageLoading(false);
        setUrlData(fetch.toPass);
        return;
      }
    } catch (err: any) {
      setMsg(err.message);
      setPageLoading(false);
      return;
    }
  };

  useEffect(() => {
    setPageLoading(true);
    const startFetch = async () => {
      fetchUrlUser();
      setPageLoading(false);
    };

    startFetch();
  }, []);

  useEffect(() => {
    if (!urlData) {
      return;
    }

    setUpdateData((prev) => ({
      ...prev,
      description: urlData?.description || "",
      expireDate: urlData?.expireDate
        ? new Date(urlData.expireDate).toISOString().split("T")[0]
        : "",
      slug: urlData?.slug || "",
    }));
  }, [urlData]);

  const updateUserUrl = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!updateData.slug || !updateData.description || !urlData?._id) {
        return;
      }
      const reqUpdate = await updateUrl(
        updateData.slug,
        updateData.description,
        new Date(updateData.expireDate),
        user,
        urlData?._id
      );

      if (!reqUpdate.success) {
        setMsg(reqUpdate.message);
        setLoading(false);
        return;
      } else {
        setMsg(reqUpdate.message);
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setMsg(err.message);
      setLoading(false);
      return;
    }
  };

  const deleteUserUrl = async () => {
    try {
      const c = confirm("are u sure ?");
      if (!c) {
        return;
      }

      setLoading(true);

      if (!urlData?._id) {
        setMsg("Url id is missing");
        setLoading(false);
        return;
      }

      const req = await deleteUrl(urlData?._id, user);

      if (!req.success) {
        setMsg(req.message);
        setLoading(false);
        return;
      } else {
        setMsg(req.message);
        setLoading(false);
        window.location.href = "/";
        return;
      }
    } catch (err: any) {
      setMsg(err.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      {pageLoading ? (
        <Loader />
      ) : (
        <div className="max-w-[800px] min-w-[200px] border border-stone-800 rounded-lg mx-auto my-24 flex flex-col gap-4 py-4 px-2">
          <div id="head" className="flex flex-row items-center gap-2">
            <button
              className="flex p-1 cursor-pointer"
              onClick={() => window.history.back()}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <Link
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${urlData?.slug}`}
              className="hover:underline"
            >
              {`${process.env.NEXT_PUBLIC_SERVER_URL}/${urlData?.slug}`}
            </Link>
          </div>
          <div id="update">
            <div className="flex flex-col gap-2">
              <input
                type="url"
                name="redirectTo"
                id="redirectTo"
                defaultValue={urlData?.redirectTo}
                placeholder="Original URL"
                disabled
                className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full cursor-not-allowed"
              />
              <form className="flex flex-col gap-2" onSubmit={updateUserUrl}>
                <input
                  type="text"
                  name="slug"
                  value={updateData.slug}
                  onChange={handleInput}
                  id="slug"
                  placeholder="URL nickname"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={updateData.description}
                  onChange={handleInput}
                  placeholder="Description"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                  required
                />
                <input
                  type="date"
                  id="expireDate"
                  name="expireDate"
                  value={updateData?.expireDate}
                  onChange={(e) =>
                    setUpdateData((prev) =>
                      prev ? { ...prev, expireDate: e.target.value } : prev
                    )
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
                {showMsg.length > 0 && (
                  <div className="text-stone-400">{showMsg}</div>
                )}
                {!loading ? (
                  <div className="flex flex-row items-center gap-2">
                    <button
                      type="submit"
                      className="bg-white w-full text-black p-2 font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={deleteUserUrl}
                      type="button"
                      className="bg-red-500 flex text-white p-2 font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-not-allowed transition-all opacity-80 duration-200"
                  >
                    <BtnLoader />
                  </button>
                )}
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
              <p className="text-lg font-semibold">{urlData?.clicks}</p>
            </div>
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
            >
              <p className="line-clamp-1">Today's Clicks</p>
              <p className="text-lg font-semibold">
                {urlData?.dailyClicks?.count}
              </p>
            </div>
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
            >
              <p>Mobile</p>
              <p className="text-lg font-semibold">
                {urlData?.deviceStats?.mobile}
              </p>
            </div>
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
            >
              <p>Desktop</p>
              <p className="text-lg font-semibold">
                {urlData?.deviceStats?.desktop}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
