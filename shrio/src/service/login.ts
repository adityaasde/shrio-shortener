import { authUser, FunctionResponse } from "@/types/auth";

export const loginUser = async (email: string, password: string): Promise<FunctionResponse> => {
  if (!email || password.length < 8 || !password) {
    return {
      success: false,
      message: "All fields required!",
    };
  }

  try {
    const userCred: authUser = {
      email: email,
      password: password,
    };
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    
    const req = await fetch(`${serverURL}/user/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userCred),
      credentials: "include",
    });
    
    const res = await req.json();

    if (!req.ok) {
      return {
        success: false,
        message: res.message,
      };
    }
    localStorage.clear();
    return {
      success: true,
      message: "Login successful!",
      toPass: res.user,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
