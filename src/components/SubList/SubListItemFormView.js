import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function SubListItemFormView(props) {
    const Backdrop = (props) => {
        return (
            <div className="backdrop" onClick={props.onClose}></div>
        )        
    }
    const Overlay = (props) => {
        const [listItemName, setListItemName] = useState('');
        const [listItemDesc, setListItemDescription] = useState('');
        const [isButtonDisabled, setButtonState] = useState(true);
        const onformSubmit = (event) => {
            event.preventDefault();
            let subItem = {
                name: listItemName,
                description: listItemDesc
            }
            props.onAddNewSubItem(subItem);
            setListItemName('');
            setListItemDescription('');
        }

        const onInputChange = (event) => {
            if(event.target.value.trim() === '' || listItemDesc === '') {
                setButtonState(true)
            } else {
                setButtonState(false);
            }
            setListItemName(event.target.value);
        }

        const onDescChange = (event) => {
            if(event.target.value.trim() === '' || listItemName === '') {
                setButtonState(true)
            } else {
                setButtonState(false);
            }
            setListItemDescription(event.target.value);
        }
        
        return (
            <div className="container">
                <form onSubmit={onformSubmit}>
                    <input type="text"
                        id="sub-list-item"
                        placeholder="Enter Item Name..."
                        value={listItemName}
                        style={{width: '100%'}}
                        onChange={onInputChange} />
                    <textarea
                        id="sub-list-category"
                        placeholder="Enter Description..."
                        value={listItemDesc}
                        style={{width: '100%'}}
                        onChange={onDescChange} />
                    <button className="button" type="submit" disabled={isButtonDisabled}>Add Item</button>
                </form>
            </div>
        )
    }

    return (
        <>
            {
                ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById('sub-backdrop-root'))
            }
            {
                ReactDOM.createPortal(<Overlay onAddNewSubItem={props.onAddNewSubItem} />, document.getElementById('sub-overlay-root'))
            }
        </>
    )
}

export default SubListItemFormView