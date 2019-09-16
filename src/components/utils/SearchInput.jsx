import React from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

function SeachInput(props) {
  const { placeholder, onChange } = props;
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <span className="input-group-prepend">
          <span className="input-group-text bg-white">
            <img src="/icon-search.svg" alt="Search icon" />
          </span>
        </span>
      </InputGroupAddon>
      <Input
        className="border-left-0"
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputGroup>
  );
}

export default SeachInput;
