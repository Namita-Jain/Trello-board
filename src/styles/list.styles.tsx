import styled from "styled-components"
import { COLORS } from "../constants/color"

export const ListHeader = styled.div`
    min-height: 30px;
    border-bottom: 1px solid ${COLORS.primaryColor};
    padding: 10px;
    position: relative;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    .closeButton {
        position: absolute;
        right: -15px;
        top: -15px;
        cursor: pointer;
        z-index: 1;
        font-size: 15px;
        color: ${COLORS.secondaryColor};
        background: ${COLORS.primaryColor};
        boxShadow: 0px 0px 15px rgb(0 0 0 / 25%);
        border-radius: 100px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export const ListWrapper = styled.div`
    width: 250px;
    border: 1px solid ${COLORS.primaryColor};
    border-radius: 5px;
`
export const ListBody = styled.div`
    min-height: 200px;
`
export const ListFooter = styled.div`
    border-top: 1px solid ${COLORS.primaryColor};
    min-height: 30px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        border: none;
        background: ${COLORS.primaryColor};
        width: 50px;
        height: 50px;
        border-radius: 100px;
        color: ${COLORS.secondaryColor};
        font-size: 30px;
        cursor: pointer;
    }
`
