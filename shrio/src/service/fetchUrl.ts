import { FunctionResponse, user } from "@/types/auth";

export const fetchUrl = async (
  id: string,
  user: user | null
): Promise<FunctionResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Id is required!",
    };
  }

  try {
    const isUser = user ? true : false;
    const version = isUser ? "v2" : "v1";

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

    const req = await fetch(`${serverURL}/link/${version}/geturl/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: isUser ? "include" : "omit",
      method: "GET",
    });

    const res = await req.json();

    if (!req.ok) {
      return {
        success: false,
        message: res.message,
      };
    } else {
      if ((res.url.isVerifiedUser = !isUser)) {
        return {
          success: true,
          message: res.message,
          toPass: res.url,
        };
      } else {
        return {
          success: false,
          message: "Unauthorized access!",
        };
      }
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
};
