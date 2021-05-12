import styled from "styled-components";
import { COLORS } from "../constants/color";

export const ButtonWrapper = styled.div`
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    button {
        padding: 15px 30px;
        height: 50px;
        font-size: 18px;
        border-radius: 6px;
        cursor: pointer;
        margin: 20px 10px;
        min-width: 150px;
    }
    .primary {
        border: none;
        background: ${COLORS.primaryColor};
        color: ${COLORS.secondaryColor};
   }
   .secondary {
       color: ${COLORS.primaryColor};
       border: 1px solid ${COLORS.primaryColor};
       background: transparent;
   }
`
export const FormWrapper = styled.div `
    padding: 20px 0;
    min-height: 35vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cancel-button {
        background: ${COLORS.primaryColor};
    }
    .multi-line {
        margin-top: 20px;
    }
`
export const CardContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    max-height: 450px;
    overflow-y: auto;

`
export const Paragraph = styled.p`
   text-align: center;
   &.red {
    color: red;
   }
`
