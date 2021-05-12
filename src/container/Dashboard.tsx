import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/Modal';
import { ButtonWrapper, FormWrapper, Paragraph } from '../styles/global.style';
import ListContainer, { CardItem } from './ListContainer';

// Interface for the list items
export interface ListItem {
    id: string, // id of the list container
    name: string, // title of the list container
    cards: CardItem[] // Cards contains inside the list container
}

const DashboardWrapper = styled.div`
    padding: 70px 20px;
`

const ListContainerWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    >div {
        margin: 20px;
    }
`
const Dashboard: React.FC = () => {
    const listItems = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list') || ''): [];
    const [openModal, setOpenModal] = useState(false);
    const [list, setList] = useState<ListItem[]>(listItems);
    const [enteredName, setEnteredName] = useState('');
    const [showError, setShowError] = useState(false);
    /**
     * Open modal Method, Add list button clicked
     */
    const addListHandler = () => {
        setOpenModal(true);
    }

    /**
     * Close modal Method
     */
    const closeModalHandler = () => {
        setEnteredName('');
        setOpenModal(false);
    }

    /**
     * Save list handler, updated the list
     */
    const saveListHandler = () => {
        if (!enteredName.trim().length) {
            setShowError(true);
            return;
        }
        setShowError(false);
        setList((prevList): ListItem[] => {
            const newList = [...prevList, {
                id: new Date().toISOString(),
                name: enteredName,
                cards: []
            }];
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        })
        setEnteredName('');
        setOpenModal(false);
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
     * Method to handle the deletion of list while clicking on cross button, updates the list
     * @param {string} id  Id to find, which list needs to deleted.
     */
    const deleteListHandler = (id: string) => {
        setList((prevList): ListItem[] => {
            const newList = prevList.filter((list) => list.id !== id);
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        })
    }

    const updateList = (list: ListItem[]) => {
        setList((prev) => {
            return list;
        })
    }

    return (
        <DashboardWrapper>
            <ButtonWrapper>
                <button className="primary" onClick={addListHandler}>Add List</button>
            </ButtonWrapper>
            <Modal opened={openModal} handleClose={closeModalHandler} title='Add List' id="add-list-modal">
                <FormWrapper>
                    <TextField
                        required
                        id="standard-required"
                        label="List Name"
                        variant="outlined"
                        fullWidth
                        value={enteredName}
                        onChange={updateEnteredNamehandler}
                    />
                    {showError && <Paragraph className="red">field is Required</Paragraph>}
                    <ButtonWrapper>
                         <button className="secondary" onClick={closeModalHandler}>
                            Cancel
                        </button>
                        <button className="primary" onClick={saveListHandler}>
                            Save
                        </button>
                    </ButtonWrapper>
                </FormWrapper>
            </Modal>
            <ListContainerWrapper>
                {list.map(data => {
                    return (
                        <ListContainer
                            key={data.id}
                            listData={data}
                            updateListData={updateList}
                            handleClose={deleteListHandler} />
                    )
                })}
            </ListContainerWrapper>
        </DashboardWrapper>
    )
}

export default Dashboard;
