import { FunctionResponse } from "@/types/auth";

export const resetPassword = async (
  password: string,
  token: string
): Promise<FunctionResponse> => {
  if (!password || password.length < 8) {
    return {
      success: false,
      message: "All fields required!",
    };
  }

  if (!token) {
    return {
      success: false,
      message: "Invalid token, please try again later",
    };
  }

  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const resetCred = {
      password: password,
    };
    const req = await fetch(`${serverURL}/user/reset-password/${token}}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(resetCred),
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
