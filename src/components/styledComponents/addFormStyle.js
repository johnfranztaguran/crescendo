import styled from 'styled-components';

const AddFormStyle = styled.div`
  .input-wrapper {
    float: 15px;
    margin: 0;
    position: relative;
  }

  input[type='text'] {
    font: 15px;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
  }

  input[type="text"], input[type="password"], textarea, select { 
    outline: none;
  }

  input[type="text"][disabled] {
    background-color: transparent;
  }

  .search-input ~ .border-style-span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #0790f2;
    transition: 0.4s;
  }

  .search-input:focus ~ .border-style-span {
    width: 100%;
    transition: 0.4s;
  }

  .search-input {
    border: 0;
    padding: 7px 0;
    border-bottom: 1px solid #ccc;
  }
  
`;

export default AddFormStyle;
