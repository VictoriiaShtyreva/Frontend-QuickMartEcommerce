import { useParams } from "react-router-dom";
import UserAccount from "../components/user/UserAccount";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  return <UserAccount id={String(id)} />;
};

export default UserPage;
