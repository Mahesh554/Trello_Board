import React from 'react';
import CategoryItemView from './CategoryItemView';

function CategoryListView(props) {

    return (
        <div style={{display: 'flex'}}>
            {
                props.categories.map((category) => <CategoryItemView key={category.id} 
                category={category}
                onRemoveCategory={props.onRemoveCategory}
                />)
            }
        </div>
    )
}

export default CategoryListView;