import { FunctionResponse } from "@/types/auth";

export const confirmMail = async (token: string): Promise<FunctionResponse> => {
  if (!token) {
    return {
      success: false,
      message: "Invalid token!",
    };
  }

  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const req = await fetch(`${serverURL}/user/confirm-mail/${token}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
    });

    const res = await req.json();

    if (!req.ok) {
      return {
        success: false,
        message: res.message,
      };
    }

    return {
      success: true,
      message: res.message,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
};
