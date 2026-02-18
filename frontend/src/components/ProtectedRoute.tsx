import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { me } from "../api/auth";
import { ProtectedRouteProps } from "../types";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    me()
      .then(res => setAllowed(res.ok))
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) {
    return <div>Loading...</div>;
  }
  if (!allowed) {
    return <Navigate to="/" />;
  }

  return children;
}
