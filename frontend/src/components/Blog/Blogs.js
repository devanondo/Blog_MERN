import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogs } from "../../actions/blogAction";
import MetaData from "../../utils/MetaData";
import Container from "../Layout/Container";
import Nav from "../Navbar/Nav";
import Card from "./Card/Card";

export default function Blogs() {
  const dispatch = useDispatch();
  const {
    blogs,
    loading,
    count: pageCount,
  } = useSelector((state) => state.blogs);
  const { query: keyword } = useParams();
  const [pageValue, setPageValue] = useState(1);

  useEffect(() => {
    dispatch(getBlogs(keyword, pageValue));
  }, [dispatch, keyword, pageValue]);

  return (
    <div>
      <Nav />
      <MetaData title="Blogs" />
      <Container
        component={
          <>
            <div className="md:grid px-2 md:px-0 pt-16 xl:pt-0 grid-cols-3 my-4 gap-3">
              {blogs && blogs.length > 0
                ? blogs.map((blog, index) => (
                    <div key={index} className="col-span-1 bg-white">
                      <Card blog={blog} />
                    </div>
                  ))
                : "No blog found!"}
            </div>
            {!pageCount > 12 && (
              <Stack spacing={3}>
                <Pagination
                  count={Math.ceil(pageCount / 12)}
                  variant="outlined"
                  page={pageValue}
                  onChange={function (e, value) {
                    setPageValue(value);
                  }}
                  color="primary"
                />
              </Stack>
            )}
          </>
        }
      />
    </div>
  );
}
