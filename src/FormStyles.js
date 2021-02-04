import styled from "styled-components";


export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-evenly;
  width: 300px;
  height: auto;
  border: 1px solid lightgray;
  border-radius: 1rem;
  padding: 2rem;
  margin: 40px;
`;

export const StyledLabel = styled.label`
`;

export const StyledInput = styled.input`
  border: 1px solid lightgray;
  background-color: white;
  border-radius: 4px;
  padding: 4px;
`;

export const StyledLoginButton = styled.button`
  border: none;
  background-color: #505050;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  padding: 4px;
    &:hover {
      background-color: #303030;
    }
`;
