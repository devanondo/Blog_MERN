import { Route, Routes } from "react-router-dom";
import BlogDetails from "../components/Blog/BlogDetails";
import CategoryPage from "../components/Blog/CategoryPage";
import EditBlog from "../components/Blog/EditBlog";
import Follower from "../components/Blog/Follower/Follower";
import Following from "../components/Blog/Follower/Following";
import SavedBlog from "../components/Blog/SavedBlog";
import AuthorList from "../components/Dashboard/AuthorList";
import BlogsList from "../components/Dashboard/BlogsList";
import Category from "../components/Dashboard/Category";
import LineChart from "../components/Dashboard/Chart/LineChart";
import SingleBlog from "../components/Dashboard/SingleBlog";
import Header from "../components/Home/Header";
import { Home } from "../components/Home/Home";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Hfront from "../components/Layout/Hfront";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import About from "../components/User/About";
import CreateBlog from "../components/User/CreateBlog";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import UserBlogs from "../components/User/UserBlogs";
import UserContainer from "../components/User/UserContainer";
import UserProfile from "../components/User/UserProfile";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/header" element={<Hfront />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/profile/:username/:id" element={<UserProfile />}>
          <Route index element={<UserContainer />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<UserBlogs />} />
          <Route path="follower" element={<Follower />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="following" element={<Following />} />
          <Route path="blogs/edit/:blogid" element={<EditBlog />} />
          <Route path="saved%blogs" element={<SavedBlog />} />
        </Route>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LineChart />} />
        <Route path="about" element={<About />} />
        <Route path="blogs" element={<BlogsList />} />
        <Route path="category" element={<Category />} />
        <Route path="authors" element={<AuthorList />} />
        <Route path="blog/:id/edit" element={<SingleBlog />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Routing;
