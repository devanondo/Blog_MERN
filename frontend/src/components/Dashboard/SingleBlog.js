import React from "react";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { id } = useParams();
  return <div>SingleBlog</div>;
}
