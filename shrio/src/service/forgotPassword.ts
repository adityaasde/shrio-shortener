import { FunctionResponse } from "@/types/auth";

export const forgotPassword = async (
  email: string
): Promise<FunctionResponse> => {
  if (!email) {
    return {
      success: false,
      message: "All fields required!",
    };
  }

  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const forgotCred = {
      email: email,
    };
    const req = await fetch(`${serverURL}/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgotCred),
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
