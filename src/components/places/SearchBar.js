import React from 'react';
import { Row, Col, FormGroup,  FormControl } from 'react-bootstrap';

const SearchBar = ({ handleSearch }) => {
  return(
    <Row>
      <Col md={6}>

        <FormGroup>
          <FormControl onChange={handleSearch} type="text" placeholder="Search"/>
          {/* <FormControl onChange={handleSort} type="text" placeholder="Sort"/> */}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;
