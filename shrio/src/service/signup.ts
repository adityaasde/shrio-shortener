import { FunctionResponse } from "@/types/auth";

export const signupUser = async (
  email: string,
  password: string
): Promise<FunctionResponse> => {
  if (!email || password.length < 8 || !password) {
    return {
      success: false,
      message: "All fields required!",
    };
  }
  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    let userId = localStorage.getItem("sh-id") || crypto.randomUUID();
    const getIP = await fetch("https://api64.ipify.org?format=json").then(
      (res) => res.json()
    );
    const userCred = {
      email: email,
      password: password,
      userId: userId,
      userIp: getIP.ip,
    };
    const req = await fetch(`${serverURL}/user/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userCred),
    });

    localStorage.clear();

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
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
