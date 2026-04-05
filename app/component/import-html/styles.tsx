"user client"
import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px;
`;

export const Buttom = styled.label`
    display: inline-block;
    padding: 8px 16px;
    color: #fff;
    min-width: 150px;
    line-height: 50px;
    text-align: center;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 300;
    text-transform: capitalize;
    cursor: pointer;
    border-radius: 999px;
    border: 1px solid #fff;
    display: inline-block;
    background: #2E80CE;
    -webkit-user-select: none;

    &:hover{
        opacity: 0.7;
    }
`;

export const TextImport = styled.pre`
    width: 100%;
    height: 300px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #ccc;
    box-sizing: border-box;
    whiteSpace: pre-wrap;
`;

export const TextExport = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #ccc;
    box-sizing: border-box;
`;