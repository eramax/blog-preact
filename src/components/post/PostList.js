import PostCard from "./PostCard";

const PostList = props => {
  return (
    <div id="list" className="pure-u-1">
      {props.posts.map(post => (
        <PostCard key={post.cursor} post={post.node} />
      ))}
    </div>
  );
};

export default PostList;
