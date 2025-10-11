import { FunctionResponse, user } from "@/types/auth";

export const updateQr = async (
  description: string,
  redirectTo: string,
  user: user | null,
  id: string
): Promise<FunctionResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Unauthorized Access!",
    };
  }
  try {
    let userId;
    if (!user?.id) {
      const getId = localStorage.getItem("sh-id");
      userId = getId;
    } else {
      userId = user.id;
    }

    const isUser = user ? true : false;
    const version = isUser ? "v2" : "v1";

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const qrCred = {
      redirectTo: redirectTo,
      description: description,
      userId: userId,
    };
    const req = await fetch(`${serverURL}/qr/${version}/update/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      credentials: isUser ? "include" : "omit",
      body: JSON.stringify(qrCred),
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
