import { FunctionResponse, user } from "@/types/auth";

export const fetchQrs = async (
  user: user | null
): Promise<FunctionResponse> => {
  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    let userId;
    if (!user) {
      const getId = localStorage.getItem("sh-id");
      userId = getId;
    } else {
      userId = user.id;
    }

    if (!userId) {
      return {
        success: false,
        message: "Id is required",
      };
    }

    const isUser = user ? true : false;
    const version = isUser ? "v2" : "v1";
    const req = await fetch(`${serverURL}/qr/${version}/get/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: isUser ? "include" : "omit",
    });

    const res = await req.json();

    if (!req.ok) {
      return {
        success: false,
        message: res.message,
      };
    } else {
      return {
        success: true,
        message: res.message,
        toPass: res.qr,
      };
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
};
