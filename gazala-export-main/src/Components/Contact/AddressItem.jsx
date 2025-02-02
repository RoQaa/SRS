const AddressItem = ({ link, icon, text }) => (
  <li>
    <a href={link}  target="_blank" rel="noopener noreferrer">
      <span>
      <i className={icon} aria-hidden="true" />
      </span>
      <span className="mx-1">{text}</span>
    </a>
  </li>
);

export default AddressItem;
