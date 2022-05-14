import React from "react";
import { Helmet } from "react-helmet";

export default function MetaData({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
    </Helmet>
  );
}
