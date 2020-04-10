const PostCard = props => {
  let d = new Date(props.date);
  let className = (props.selected)? "email-item pure-g email-item-selected" : "email-item pure-g"
  return (
    <a onClick={props.onSelect} className={className}>
      <div className="pure-u">
        <img
          width="64"
          height="64"
          alt={props.title}
          className="email-avatar"
          src="./assets/bul-1.gif"
        />
      </div>

      <div className="pure-u-3-4">
        <h5 className="email-name">{d.toDateString()}</h5>
        <h4 className="email-subject">{props.title}</h4>
      </div>
    </a>
  );
};

export default PostCard;
