import PropTypes from 'prop-types';
import s from './PhoneList.module.css';

export const PhoneList = ({ contacts, onDelete }) => {
  return (
    <>
      <ul className={s.phoneList}>
        {!contacts.length && <p>There are no contacts found!</p>}
        {contacts.length > 0 &&
          contacts.map(({ id, name, number }) => {
            return (
              <li key={id} className={s.phoneItem}>
                <span className={s.phoneName}>{name} :</span>
                {number}
                <button
                  className={s.buttonDelete}
                  type="button"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};
PhoneList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};