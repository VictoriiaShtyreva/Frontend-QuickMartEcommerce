import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

interface ProtectedRouteProps {
  Component: React.FC;
}

const ProtectedAdminRoute = ({ Component }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.users);
  return user && user.role === "Admin" ? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedAdminRoute;
