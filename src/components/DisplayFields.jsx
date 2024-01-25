// DisplayFields.js

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

const CategoryHeader = styled.h3`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const DisplayFields = () => {
  const fields = useSelector((state) => state.fields);

  // Group fields by category
  const categorizedFields = fields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {});

  return (
    <Container>
      <h2>Display Added Fields</h2>
      {Object.keys(categorizedFields).map((category, index) => (
        <div key={index}>
          <CategoryHeader>{category}</CategoryHeader>
          <Table key={index}>
            <TableHead>
              <TableRow>
                <TableHeadCell>Field Display Name</TableHeadCell>
                <TableHeadCell>Field Type</TableHeadCell>
                <TableHeadCell>Field Data Type</TableHeadCell>
                <TableHeadCell>Max Length Allowed</TableHeadCell>
                <TableHeadCell>Is Mandatory</TableHeadCell>
                <TableHeadCell>Field Data</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorizedFields[category].map((field, index) => (
                <TableRow key={index}>
                  <TableCell>{field.fieldDisplayName}</TableCell>
                  <TableCell>{field.fieldType}</TableCell>
                  <TableCell>{field.fieldDataType}</TableCell>
                  <TableCell>{field.maxLengthAllowed}</TableCell>
                  <TableCell>{field.isMandatory ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{field.fieldData}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </Container>
  );
};

export default DisplayFields;
