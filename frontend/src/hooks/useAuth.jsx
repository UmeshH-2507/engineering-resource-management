import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth({
      token,
      role: user?.role || null,
    });
  }, []);

  return auth;
};

export default useAuth;
