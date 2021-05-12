import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants/color';
import { CardItem } from '../container/ListContainer';

// Interface for the card props
interface CardProps {
    cardData: CardItem,
    handleClose: (id: string) => void
    handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void
}

const CardWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
    .closeButton {
        position: absolute;
        right: -10px;
        top: -10px;
        cursor: pointer;
        z-index: 1;
        font-size: 10px;
        color: ${COLORS.secondaryColor};
        background: ${COLORS.primaryColor};
        boxShadow: 0px 0px 15px rgb(0 0 0 / 25%);
        border-radius: 100px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-content {
        word-break: break-word;
        max-height: 100px;
        overflow-y: auto;
    }
`

const CardContainer: React.FC<CardProps> = ({cardData, handleClose, handleDragStart}: CardProps) => {
    return (
        <CardWrapper id={cardData.cardId} onDragStart={handleDragStart} draggable>
            <Card>
                <CardHeader
                action={
                <div className="closeButton" onClick={handleClose.bind(null, cardData.cardId)} aria-hidden="true" role="button" tabIndex={0}>
                    <i>X</i>
                </div>
                }
                title={cardData.title}
                />
                <CardContent className="card-content">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {cardData.description}
                    </Typography>
                </CardContent>
            </Card>
        </CardWrapper>
    )
}

export default CardContainer;
