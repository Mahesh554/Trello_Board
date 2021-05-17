import React from 'react';
import CategoryItemView from './CategoryItemView';

function CategoryListView(props) {

    return (
        <div style={{display: 'flex'}}>
            {
                props.categories.map((category) => <CategoryItemView key={category.id} 
                category={category}
                sublist={category.listItems}
                onRemoveCategory={props.onRemoveCategory}
                onAddNewSubItem={props.onAddNewSubItem}
                onRemoveListItem={props.onRemoveListItem}
                onDropFromCategory={props.onDropFromCategory}
                Highlight={props.Highlight}
                onSetHighlight={props.onSetHighlight}
                onRemoveHighlight={props.onRemoveHighlight}
                />)
            }
        </div>
    )
}

export default CategoryListView;