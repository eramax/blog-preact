import { Link } from 'preact-router/match';

const PostCard = props => {
  return (
    <Link activeClassName="email-item-selected" href={"/" +props.url} className="email-item pure-g">
      <div className="pure-u">
        <img
          width="64"
          height="64"
          alt={props.title}
          className="email-avatar"
          src={props.img}
        />
      </div>

      <div className="pure-u-3-4">
        <h5 className="email-name">{props.date}</h5>
        <h4 className="email-subject">{props.title}</h4>
      </div>
    </Link>
  );
};

export default PostCard;
