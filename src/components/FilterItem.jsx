
// FilterItem.js
import React from 'react';

const FilterItem = ({ filterName, isActive, handleFilter }) => {
  const handleClick = () => {
    handleFilter(filterName);
  };

  return (
    <li onClick={handleClick} className={isActive ? 'active' : ''}>
      {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
    </li>
  );
};

export default FilterItem;

