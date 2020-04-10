const PostCard = props => {
  let d = new Date(props.date);
  return (
    <div className="email-item email-item-unread pure-g">
      <div className="pure-u">
        <img
          width="64"
          height="64"
          alt="Eric Ferraiuolo's avatar"
          className="email-avatar"
          src="./assets/bul-1.gif"
        />
      </div>

      <div className="pure-u-3-4">
        <h5 className="email-name">{d.toDateString()}</h5>
        <h4 className="email-subject">{props.title}</h4>
      </div>
    </div>
  );
};

export default PostCard;
