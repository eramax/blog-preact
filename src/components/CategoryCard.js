const CategoryItem = props => {
  console.log(props)
  let className = (props.selected)? "pure-menu-item email-item-selected" : "pure-menu-item"
    return (
        <li className={className}>
        <a className="pure-menu-link" onClick={props.onSelect}>
        {props.cat.name} <span className="email-count">({props.cat.count})</span>
        </a>
      </li>
    );
  };
  
  export default CategoryItem;
  