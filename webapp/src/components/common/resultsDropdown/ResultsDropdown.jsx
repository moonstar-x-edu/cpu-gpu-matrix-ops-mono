/* eslint-disable no-extra-parens */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, ButtonGroup, Dropdown, FormControl } from 'react-bootstrap';

const DEFAULT_LABEL = 'Anonimo';

const ResultsDropdown = ({ results, onSelect, className }) => {
  const [filtered, setFiltered] = useState('');
  const [current, setCurrent] = useState(null);

  function handleFilter({ target: { value } }) {
    setFiltered(value);
  }

  function handleSelect(selected) {
    setCurrent(selected);
    onSelect(selected);
  }

  return (
    <DropdownButton className={`results-dropdown ${className}`.trim()} as={ButtonGroup} id="results-dropdown-group" title="Selecciona un resultado" menuRole="results-picker" variant="dark">
      <FormControl className="mx-3 my-2 w-auto" placeholder="Buscar" onChange={handleFilter} value={filtered} />
      {
        results
          .filter(({ name }) => (
            name ?
              name.toLowerCase().startsWith(filtered.toLowerCase()) :
              DEFAULT_LABEL.toLowerCase().startsWith(filtered.toLowerCase())
          ))
          .map(({ id, name }) => (
            <Dropdown.Item key={id} eventKey={id} onSelect={handleSelect} disabled={current === id}>
              {name || DEFAULT_LABEL}
            </Dropdown.Item>
          ))
      }
    </DropdownButton>
  );
};

ResultsDropdown.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string.isRequired
  })).isRequired,
  onSelect: PropTypes.func,
  className: PropTypes.string
};

ResultsDropdown.defaultProps = {
  onSelect: () => true,
  className: ''
};

export default ResultsDropdown;
