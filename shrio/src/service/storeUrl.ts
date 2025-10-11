import { FunctionResponse, user } from "@/types/auth";
import { createUrl } from "@/types/product";
import { generateSlug } from "@/utils/generateSlug";

export const storeUrl = async (
  redirectTo: string,
  slug: string,
  desc: string,
  expireDate: Date,
  user: user | null
): Promise<FunctionResponse> => {
  if (!redirectTo) {
    return {
      success: false,
      message: "Original Url is required!",
    };
  }

  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    let userId;
    if (!user) {
      const shId = localStorage.getItem("sh-id") || crypto.randomUUID();
      localStorage.setItem("sh-id", shId);
      userId = shId;
    } else {
      userId = user.id;
    }

    console.log(userId);
    
    const getIP = await fetch("https://api64.ipify.org?format=json").then(
      (res) => res.json()
    );
    const userIp = getIP.ip;
    const randomSlug = generateSlug(4);
    const date = new Date();

    const isUser = user ? true : false;
    const version = isUser ? "v2" : "v1";

    if (!userId) {
      return {
        success: false,
        message: "UserId is required!",
      };
    }

    const linkCred: createUrl = {
      userId: userId,
      userIp: userIp,
      redirectTo,
      description: desc,
      slug: !slug ? randomSlug : slug,
      expireDate: expireDate,
      isVerifiedUser: isUser,
      createdAt: date,
    };

    const req = await fetch(`${serverURL}/link/${version}/generate`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: isUser ? "include" : "omit",
      method: "POST",
      body: JSON.stringify(linkCred),
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
        toPass: res.url,
      };
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
};
