import { userStore } from "@/store/userStore";

export const fetchUser = async () => {
  try {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const req = await fetch(`${serverURL}/user/me`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (!req.ok) {
      userStore.setState({ user: null });
      return {
        user: null,
        loggedIn: false,
      };
    } else {
      userStore.setState({
        user: {
          email: res.email,
          id: res.id,
        },
      });
      return {
        user: res.user,
        loggedIn: true,
      };
    }
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
};
