import React from 'react';
import SubListItemView from './SubListItemView';

function SubListView(props) {
    return (
        <div>
            {
                props.sublist.length
                    ?
                    props.sublist.map((listItem) => <SubListItemView key={listItem.id} listItem={listItem} onRemoveListItem={props.onRemoveListItem} drag={props.drag} onSetHighlight={props.onSetHighlight}
                    onRemoveHighlight={props.onRemoveHighlight}/>)
                    :
                    <div style={{textAlign: 'center'}}>No items added yet!</div>
            }
        </div>
    )
}

export default SubListView