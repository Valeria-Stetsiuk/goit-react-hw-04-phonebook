import React from 'react';

import PropTypes from 'prop-types';
import s from '../ContactFilter/ContactFilter.module.css';

export const Filter = ({ filter, onChange }) => {
  return (
    <>
      <label>
        <span className={s.msgFilter}>Find contact by name</span>
        <input
          type="text"
          value={filter}
          onChange={onChange}
          className={s.inputFilter}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};