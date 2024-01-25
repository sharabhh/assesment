// AddFields.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addField } from '../redux/actions';
import DisplayFields from './DisplayFields';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const AddFields = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFieldType, setSelectedFieldType] = useState('');
  const [fieldDisplayName, setFieldDisplayName] = useState('');
  const [fieldDataType, setFieldDataType] = useState('');
  const [maxLengthAllowed, setMaxLengthAllowed] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [fieldData, setFieldData] = useState('');
  const [showDisplay, setShowDisplay] = useState(false);

  const handleAddField = (e) => {
    e.preventDefault();
    // Collect properties and dispatch to Redux
    const field = {
      category: selectedCategory,
      fieldType: selectedFieldType,
      fieldDisplayName,
      fieldDataType,
      maxLengthAllowed,
      isMandatory,
      fieldData,
    };
    dispatch(addField(field));

    // Reset form after adding the field
    setSelectedFieldType('');
    setFieldDisplayName('');
    setFieldDataType('');
    setMaxLengthAllowed('');
    setIsMandatory(false);
    setFieldData('');
  };

  const handleConfirm = () => {
    setShowDisplay(true);
  };

  return (
    <Container>
      <h2>Add Fields Dynamically</h2>
      <Form>
        <label>
          Select Category:
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Student">Student</option>
            <option value="Salaried">Salaried</option>
            <option value="Business">Business</option>
          </select>
        </label>
        {selectedCategory && (
          <>
            <label>
              Select Field Type:
              <select
                value={selectedFieldType}
                onChange={(e) => setSelectedFieldType(e.target.value)}
              >
                <option value="">Select Field Type</option>
                <option value="TextBox">Text Box</option>
                <option value="DropDown">Drop Down</option>
                <option value="DatePicker">Date Picker</option>
              </select>
            </label>
            {selectedFieldType === 'TextBox' && (
              <>
                <label>
                  Field Display Name:
                  <input
                    type="text"
                    value={fieldDisplayName}
                    onChange={(e) => setFieldDisplayName(e.target.value)}
                  />
                </label>
                <label>
                  Select Field Data Type:
                  <select
                    value={fieldDataType}
                    onChange={(e) => setFieldDataType(e.target.value)}
                  >
                    <option value="">Select Data Type</option>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                    <option value="date">Date</option>
                  </select>
                </label>
                {fieldDataType === 'number' && (
                  <>
                    <label>
                      Max Length Allowed:
                      <input
                        type="text"
                        value={maxLengthAllowed}
                        onChange={(e) => setMaxLengthAllowed(e.target.value)}
                      />
                    </label>
                    <label>
                      Is Mandatory:
                      <select
                        value={isMandatory}
                        onChange={(e) =>
                          setIsMandatory(e.target.value === 'true')
                        }
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </label>
                  </>
                )}
                <label>
                  Field Data:
                  <input
                    type="text"
                    value={fieldData}
                    onChange={(e) => setFieldData(e.target.value)}
                  />
                </label>
              </>
            )}
            <ButtonGroup>
              <button onClick={handleAddField}>Add Field</button>
              <button type="button" onClick={handleConfirm}>
                Confirm
              </button>
            </ButtonGroup>
          </>
        )}
      </Form>
      {showDisplay && <DisplayFields />}
    </Container>
  );
};

export default AddFields;
