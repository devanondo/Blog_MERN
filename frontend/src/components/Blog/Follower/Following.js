import React from "react";
import { useOutletContext } from "react-router-dom";
import FollowCard from "./FollowCard";

export default function Following() {
  const user = useOutletContext();

  return (
    <div className="grid md:grid-cols-3 gap-2 p-2">
      {user &&
        user?.followings?.map((item, index) => (
          <FollowCard key={index} show={true} follower={item} />
        ))}
    </div>
  );
}
