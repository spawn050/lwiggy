import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { me } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    me()
      .then(res => setAllowed(res.ok))
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) 
    return <div>Loading...</div>;
  if (!allowed) 
    return <Navigate to="/" />;

  return children;
}
