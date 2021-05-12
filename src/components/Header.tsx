import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants/color';


const HeaderWrapper = styled.div`
    height: 60px;
    background-color: ${COLORS.primaryColor};
    position: fixed;
    width: calc(100% - 60px);
    display: flex;
    align-items: center;
    padding: 0 30px;
    justify-content: center;
    z-index: 1000;
`

const Heading = styled.h2`
    color: ${COLORS.secondaryColor};
`

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <Heading>Trello Board</Heading>
        </HeaderWrapper>
    )
}

export default Header;


