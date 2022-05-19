import { Outlet } from "react-router-dom";

export default function UserContainer({ user }) {
  return (
    <div>
      <Outlet context={user} />
    </div>
  );
}
