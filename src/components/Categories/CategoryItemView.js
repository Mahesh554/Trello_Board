import React, { useState } from 'react';
import SubListItemFormView from '../SubList/SubListItemFormView';
import SubListView from '../SubList/SubListView';

function CategoryItemView(props) {

    const [Modal, setModal] = useState(false);

    const removeClicked = () => {
        props.onRemoveCategory(props.category)
    }

    const onClose = () => {
        setModal(false);
    }

    const onAddNewSubItem = (sItem) => {
        let Item = {
            id: sItem.name,
            name: sItem.name,
            description: sItem.description,
            categoryId: props.category.id
        }

        props.onAddNewSubItem(Item);

        setModal(false);
    }

    const onRemoveListItem = (item) => {
        let modifiedList = props.sublist.filter((listItem) => {
            return listItem.id !== item.id
        });

        props.onRemoveListItem(modifiedList, props.category.id);
    }

    const allowDrop = (e) => {
        e.preventDefault();
    }

    const drop = (e) => {
        e.preventDefault();
        let transferredObj = JSON.parse(e.dataTransfer.getData("data"));
        if (props.category.id !== transferredObj.categoryId) {       
            props.onDropFromCategory(transferredObj, props.category.id);           
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
            <div className={`category ${props.Highlight ? "droppable" : ''}`} onDrop={drop} onDragOver={allowDrop}>
                <div className="category-name">{props.category.name}</div>
                <SubListView sublist={props.sublist} onRemoveListItem={onRemoveListItem} categoryId={props.category.id} drag={drag} onSetHighlight={props.onSetHighlight} onRemoveHighlight={props.onRemoveHighlight} />
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