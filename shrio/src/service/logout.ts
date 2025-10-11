import { userStore } from "@/store/userStore";
import { FunctionResponse } from "@/types/auth";

export const logout = async (): Promise<FunctionResponse> => {
  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const req = await fetch(`${serverURL}/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!req.ok) {
      return {
        success: false,
        message: "Failed to logout!",
      };
    }

    const res = await req.json();

    userStore.getState().logout();
    localStorage.clear();
    window.location.reload();
    return {
      success: true,
      message: res.message,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
