
// FilterList.js
import React, { useEffect } from 'react';
import FilterItem from './FilterItem';

const FilterList = ({ activeFilter, handleFilter }) => {
  const filters = ['all', 'active', 'complete'];

  useEffect(() => {
    localStorage.setItem('filterType', activeFilter); 
  }, [activeFilter]);

  return (
    <ul>
      {filters.map(filter => (
        <FilterItem
          key={filter}
          filterName={filter}
          isActive={activeFilter === filter}
          handleFilter={handleFilter}
        />
      ))}
    </ul>
  );
};

export default FilterList;

