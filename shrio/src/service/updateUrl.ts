import { FunctionResponse, user } from "@/types/auth";

export const updateUrl = async (
  slug: string,
  description: string,
  expireDate: Date,
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
    const urlCred = {
      slug: slug,
      description: description,
      expireDate: expireDate,
      userId: userId,
    };

    const req = await fetch(`${serverURL}/link/${version}/update/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(urlCred),
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
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
