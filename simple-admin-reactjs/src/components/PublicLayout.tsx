import { useOutlet, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicLayout: React.FC = () => {
    const { user } = useAuth();
    const outlet = useOutlet();
    
    if (user) {
      return <Navigate to="/dashboard/home" replace={true} />;
    }
    return (
        <>{outlet}</>
    );
  };