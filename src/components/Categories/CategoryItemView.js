import React, { useEffect, useState } from 'react';
import SubListItemFormView from '../SubList/SubListItemFormView';
import SubListView from '../SubList/SubListView';

function CategoryItemView(props) {

    const [listItems, addListItems] = useState([]);
    const [Modal, setModal] = useState(false);

    const removeClicked = () => {
        props.onRemoveCategory(props.category)
    }

    const onClose = () => {
        setModal(false);
    }

    const addToLocalStorage = (modifiedList) => {
        modifiedList.category = props.category.id
        localStorage.setItem(props.category.id, JSON.stringify(modifiedList));
    }

    const onAddNewSubItem = (sItem) => {
        let Item = {
            id: sItem.name,
            name: sItem.name,
            description: sItem.description,
            categoryid: props.category.id
        }

        let modifiedList = [Item, ...listItems]

        addListItems(modifiedList)
        addToLocalStorage(modifiedList);
        setModal(false);
    }

    useEffect(() => {
        const storedItems = localStorage.getItem(props.category.id);
        if (storedItems) {
            addListItems(JSON.parse(storedItems));
        }
    }, [])

    const onRemoveListItem = (item) => {
        let modifiedList = listItems.filter((listItem) => {
            return listItem.id !== item.id
        });

        addListItems(modifiedList);
        addToLocalStorage(modifiedList);
    }

    const allowDrop = (e) => {
        e.preventDefault();
    }

    const drop = (e) => {
        e.preventDefault();
        let transferredObj = JSON.parse(e.dataTransfer.getData("data"));
        if (props.category.id !== transferredObj.categoryId) {
            onAddNewSubItem(transferredObj);

            let itemtoRemoveCategory = JSON.parse(localStorage.getItem(transferredObj.categoryId));
            let modifiedList = itemtoRemoveCategory.filter((listItem) => {
                return listItem.id !== transferredObj.id
            });
            localStorage.setItem(transferredObj.categoryId, JSON.stringify(modifiedList));
            window.location.reload();
        }
    }

    const drag = (event, listItem) => {
        let transferObj = {
            id: listItem.name,
            name: listItem.name,
            description: listItem.description,
            categoryId: props.category.id
        }
        event.dataTransfer.setData("data", JSON.stringify(transferObj));
    }

    return (
        <>
            {
                Modal && <SubListItemFormView onClose={onClose} onAddNewSubItem={onAddNewSubItem} />
            }
            <div className="category droppable" onDrop={drop} onDragOver={allowDrop}>
                <div className="category-name">{props.category.name}</div>
                <SubListView sublist={listItems} onRemoveListItem={onRemoveListItem} categoryId={props.category.id} drag={drag} />
                <div>
                    <button
                        style={{ alignItems: 'center' }}
                        className="button"
                        onClick={() => setModal(true)}
                    >Add Item</button>
                    <button className="remove-button" onClick={removeClicked}>Remove Category</button>
                </div>
            </div>
        </>
    )
}

export default CategoryItemView;