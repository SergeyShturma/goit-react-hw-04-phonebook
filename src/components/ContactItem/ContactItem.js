import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number, onDelete }) => {
  return (
    <>
      <span>
        {name}: {number}
      </span>
      <button
        className={css.button}
        type="submit"
        name={name}
        onClick={() => onDelete(id)}
      >
        X
      </button>
    </>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
