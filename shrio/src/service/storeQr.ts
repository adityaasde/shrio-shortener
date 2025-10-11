import { FunctionResponse, user } from "@/types/auth";
import { createQR } from "@/types/product";

export const storeQr = async (
  redirectTo: string,
  description: string,
  imgUrl: string,
  user: user | null,
  slug: string
): Promise<FunctionResponse> => {
  if (!redirectTo) {
    return { success: false, message: "Original URL is required!" };
  }

  try {
    let userId;
    if (!user) {
      const shId = localStorage.getItem("sh-id") || crypto.randomUUID();
      localStorage.setItem("sh-id", shId);
      userId = shId;
    } else {
      userId = user?.id;
    }

    const isUser = user ? true : false;
    const version = isUser ? "v2" : "v1";

    const ipRes = await fetch("https://api64.ipify.org?format=json");
    const ipData = await ipRes.json();
    const userIp = ipData.ip;

    const qrCred: createQR = {
      userId,
      userIp,
      redirectTo,
      description,
      isVerifiedUser: isUser,
      createdAt: new Date(),
      imgUrl,
      slug,
    };

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const req = await fetch(`${serverURL}/qr/${version}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(qrCred),
      credentials: isUser ? "include" : "omit",
    });

    const res = await req.json();

    if (!req.ok) {
      return { success: false, message: res.message };
    }

    return { success: true, message: res.message, toPass: res.qr };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};
