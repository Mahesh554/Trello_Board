import React from 'react';

function SubListItemView(props) {
    const removeClicked = () => {
        props.onRemoveListItem(props.listItem);
    }

    const dragStart = (e) => {
        props.drag(e, props.listItem);
    }
    
    return (
        <div className="sub-list" draggable="true" onDragStart={dragStart}>
            <div style={{ padding: "10px" }}>
                <div className="list-item-name">{props.listItem.name}</div>
                <div className="list-item-description">{props.listItem.description}</div>
                <button className="remove-button sub-item" onClick={removeClicked}>Remove Item</button>
            </div>
        </div>
    )
}

export default SubListItemView