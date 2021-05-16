import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function AddCategoryForm(props) {
    const Backdrop = (props) => {
        return (
            <div className="backdrop" onClick={props.onClose}></div>
        )        
    }
    const Overlay = (props) => {
        const [categoryName, setCategoryName] = useState('');
        const [isButtonDisabled, setButtonState] = useState(true);
        const onformSubmit = (event) => {
            event.preventDefault();
            props.onAddNewCategory(categoryName);
            setCategoryName('');
        }

        const onInputChange = (event) => {
            if(event.target.value.trim() === '') {
                setButtonState(true)
            } else {
                setButtonState(false);
            }
            setCategoryName(event.target.value);
        }
        
        return (
            <div className="container">
                <form onSubmit={onformSubmit}>
                    <input type="text"
                        id="category"
                        placeholder="Enter Category Name..."
                        value={categoryName}
                        onChange={onInputChange} />
                    <button className="button" type="submit" disabled={isButtonDisabled}>Add Category</button>
                </form>
            </div>
        )
    }

    return (
        <>
            {
                ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById('backdrop-root'))
            }
            {
                ReactDOM.createPortal(<Overlay onAddNewCategory={props.onAddNewCategory} />, document.getElementById('overlay-root'))
            }
        </>
    )
}

export default AddCategoryForm;