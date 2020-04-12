import { Link } from 'preact-router/match';

const PostCard = props => {
  return (
    <Link activeClassName="blog-item-selected" href={"/" +props.url} className="blog-item pure-g">
      <div className="pure-u">
        <img
          width="64"
          height="64"
          alt={props.title}
          className="blog-avatar"
          src={props.img}
        />
      </div>

      <div className="pure-u-3-4">
        <h5 className="blog-name">{props.date}</h5>
        <h4 className="blog-subject">{props.title}</h4>
      </div>
    </Link>
  );
};

export default PostCard;
