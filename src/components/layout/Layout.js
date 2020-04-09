import CategoryList from "../category/CategoryList";
import Main from "./Main";
import PostList from "../post/PostList";

const Layout = props => {
  return (
    <div id="layout" className="content pure-g">
      <CategoryList />
      <PostList posts={props.posts} />
      <Main />
    </div>
  );
};

export default Layout;
