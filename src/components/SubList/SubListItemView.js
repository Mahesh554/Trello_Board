import React, { useState } from 'react';

function SubListItemView(props) {
    const removeClicked = () => {
        props.onRemoveListItem(props.listItem);
    }

    const [hideEl, sethideEl] = useState(false);

    const dragStart = (e) => {
        sethideEl(true);
        props.drag(e, props.listItem);
        console.log(e);
        props.onSetHighlight();
    }

    const dragEnd = (e) => {
        e.preventDefault();
        sethideEl(false);
        props.onRemoveHighlight();
    }

    return (
        <div className={`sub-list ${hideEl ? "hide-element" : ''}`} draggable="true" onDragStart={dragStart} onDragEnd={dragEnd}>
            <div style={{ padding: "10px", backgroundColor: "white"}}>
                <div className="list-item-name">{props.listItem.name}</div>
                <div className="list-item-description">{props.listItem.description}</div>
                <button className="remove-button sub-item" onClick={removeClicked}>X</button>
            </div>
        </div>
    )
}

export default SubListItemView