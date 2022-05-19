import React from "react";
import { useOutletContext } from "react-router-dom";
import FollowCard from "./FollowCard";

export default function Follower() {
  const user = useOutletContext();

  return (
    <div className="grid md:grid-cols-3 gap-2 p-2">
      {user &&
        user?.followers?.map((item, index) => (
          <FollowCard key={index} follower={item} />
        ))}
    </div>
  );
}
