import { FunctionResponse, user } from "@/types/auth";

export const deleteQr = async (
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
    const req = await fetch(`${serverURL}/qr/${version}/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
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
      };
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
};
