import PostCard from "./PostCard";

const PostList = props => {
  let list = []
  Object.entries(props.posts).forEach(([key, value]) => {
    list.push( <PostCard key={key} title={value.title} date={value.date} />)
  });

  return (
    <div id="list" className="pure-u-1">
      {list}
    </div>
  );
};

export default PostList;
