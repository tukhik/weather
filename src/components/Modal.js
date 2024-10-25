import React from 'react';
import styled from "styled-components";

const Modal = ({ onClose, message }) => {

    return (
        <ModalStyle>
            <h2>Error</h2>
            <div>{message || ""}</div>
            <button onClick={onClose}>Close</button>
        </ModalStyle>
    );
};

const ModalStyle = styled.div`
background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
`;

export default Modal;