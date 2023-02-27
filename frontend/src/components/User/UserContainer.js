import { Outlet } from "react-router-dom";

export default function UserContainer({ user }) {
  return (
    <div className="bg-slate-100 h-full p-2">
      <Outlet context={user} />
    </div>
  );
}
