import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



export const ProtectedLayout: React.FC = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  
  if (!user) {
    return <Navigate to="/login" replace={true}/>;
  }
  return (
    <>
    {outlet}
    </>
  );
};