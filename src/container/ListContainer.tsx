import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Modal } from '../components/Modal';
import { ButtonWrapper, CardContainerWrapper, FormWrapper, Paragraph } from '../styles/global.style';
import { ListBody, ListFooter, ListHeader, ListWrapper } from '../styles/list.styles';
import CardContainer from '../components/Card';
import { ListItem } from './Dashboard';

// Interface for List Item props
interface ListProps {
    listData: ListItem, // That contains all the data of list item
    handleClose: (id: string) => void // A function that takes ID as argument and return Void
    updateListData: (list: ListItem[]) => void  // callback for updating the list data
}

// Interface for CardItem
export interface CardItem {
    cardId: string, // id of that card which is equal to the current time (when card is created)
    title: string, // Title of that card that comes at the top of a card
    listId: string, // List id of that card, that contains that card
    description: string // Description of the Card
}

// Global function to find the index of current list container
const findIndex = (listID: string) => {
    const list = JSON.parse(localStorage.getItem('list') || '');
    const index = list.findIndex((data: ListItem) => {
        return data.id === listID
    });
    return [list, index];
}

const ListContainer: React.FC<ListProps> = ({listData, handleClose, updateListData}: ListProps) => {
    const getUpdatedCardList = () => {
        const [lists, listIndex] = findIndex(listData.id);
        return lists[listIndex].cards;
    }
    const [openModal, setOpenModal] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [enteredDesc, setEnteredDesc] = useState('');
    const [showError, setShowError] = useState(false);
    let currentCardList = getUpdatedCardList();

    /**
     * Close modal Method
     */
    const closeModalHandler = () => {
        setEnteredName('');
        setEnteredDesc('');
        setOpenModal(false);
    }
    /**
     * Open modal Method
     */
    const openAddCardModal = () => {
        setOpenModal(true);
    }
    /**
     * On change event on Name field to get the latest Name
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event onchange event to get tha value
     */
    const updateEnteredNamehandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setShowError(false);
        setEnteredName(event.target.value);
    }
    /**
     * On change event on Description field to get the latest Description
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event onchange event to get tha value
     */
    const updateEnteredDeschandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setShowError(false);
        setEnteredDesc(event.target.value);
    }
    /**
     * Method to handle the submit event while clicking on Save button, updates the cardList
     */
    const saveCardHandler = () => {
        if (!(enteredName.trim().length && enteredDesc.trim().length)){
            setShowError(true);
            return;
        }
        currentCardList = getUpdatedCardList();
        let cardList = [...currentCardList, {
                cardId: 'card' + new Date().toISOString(),
                title: enteredName,
                description: enteredDesc,
                listId: listData.id
        }];
        const [list, listIndex] = findIndex(listData.id);
        list[listIndex].cards = [...cardList];
        updateListData([...list])
        localStorage.setItem('list', JSON.stringify(list) || '');
        setEnteredName('');
        setEnteredDesc('');
        setOpenModal(false);
    }

    /**
     * Method to handle the deletion of card while clicking on cross button, updates the cardList
     * @param {string} id  Id to find, which card needs to deleted.
     */
    const deleteCardHandler = (id: string) => {
        const [list, listIndex] = findIndex(listData.id);
        currentCardList = getUpdatedCardList();
        const updatedCardList = currentCardList.filter((card: CardItem) => card.cardId !== id);
        list[listIndex].cards = [...updatedCardList];
        updateListData([...list]);
        localStorage.setItem('list', JSON.stringify(list) || '');
    }

    /**
     * Method to handle the drop handler, where we need to drop cards in list container
     * @param {React.DragEvent<HTMLDivElement>} event event handler for drop event
     */
    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const parsedData = JSON.parse(event.dataTransfer.getData("id"));
        const [list, listIndex] = findIndex(listData.id);
        const [prevList, prevIndex] = findIndex(parsedData.listId);
        if (prevIndex === listIndex) {
            return;
        }
         const cardIndex = list[prevIndex].cards.findIndex((card: CardItem) => {
            return card.cardId === parsedData.cardId
        })
        prevList[prevIndex].cards.splice(cardIndex, 1);
        parsedData.cardId = 'card' + new Date().toISOString();
        parsedData.listId = listData.id;
        currentCardList = getUpdatedCardList();

        list[listIndex].cards = [parsedData, ...currentCardList];
        updateListData([...list]);
        localStorage.setItem('list', JSON.stringify(list) || '');
    }

    /**
     * Method to handle the Drag over handler
     * @param {React.DragEvent<HTMLDivElement>} event event handler for drag over event
     */
    const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    /**
     * Method to handle the Drag start handler
     * @param {React.DragEvent<HTMLDivElement>} event event handler for drag start event
     * @param {string} card data of the draggable element
     */
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, card: string) => {
        event.dataTransfer.setData("id", card);
    }

    return (
        <ListWrapper>
            <ListHeader>
                <div className="closeButton" onClick={handleClose.bind(null, listData.id)} aria-hidden="true" role="button" tabIndex={0}>
                    <i>X</i>
                </div>
                {listData.name}
            </ListHeader>
            <ListBody onDragOver={onDragOverHandler} onDrop={dropHandler}>
                <CardContainerWrapper>
                    {currentCardList.length ? currentCardList.map((data: CardItem) => {
                        return (
                            <CardContainer
                                key={data.cardId}
                                cardData={data}
                                handleClose={deleteCardHandler}
                                handleDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, JSON.stringify(data))}
                            />
                        )
                    }): <Paragraph>No Data Available</Paragraph>}
                </CardContainerWrapper>
            </ListBody>
            <ListFooter>
                <button onClick={openAddCardModal}>+</button>
            </ListFooter>
            <Modal opened={openModal} handleClose={closeModalHandler} title='Add Card' id="add-card-modal">
                <FormWrapper>
                    <TextField
                        required
                        id="standard-required"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={enteredName}
                        onChange={updateEnteredNamehandler}
                    />
                    <TextField
                        className="multi-line"
                        required
                        id="standard-required"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        value={enteredDesc}
                        onChange={updateEnteredDeschandler}
                    />
                    {showError && <Paragraph className="red">Both fields are Required</Paragraph>}
                    <ButtonWrapper>
                            <button className="secondary" onClick={closeModalHandler}>
                            Cancel
                        </button>
                        <button className="primary" onClick={saveCardHandler}>
                            Save
                        </button>
                    </ButtonWrapper>
                </FormWrapper>
            </Modal>
        </ListWrapper>
    )
}

export default ListContainer;
