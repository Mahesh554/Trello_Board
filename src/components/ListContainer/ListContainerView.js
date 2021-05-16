import React, { useEffect, useState } from 'react';
import AddCategoryForm from '../Categories/AddCategoryForm';
import CategoryListView from '../Categories/CategoryListView';
import './ListContainerView.css';

function ListContainerView() {

    const [categories, addCategory] = useState([]);
    const [showModel, setShowModel] = useState(false);

    const addToLocalStorage = (modifiedList) => {
        localStorage.setItem("categories", JSON.stringify(modifiedList));
    }

    const onAddNewCategory = (cName) => {
        let categoryName = {
            id: cName,
            name: cName
        }

        let modifiedList = [...categories, categoryName]
        
        addCategory(modifiedList);
        addToLocalStorage(modifiedList);
        setShowModel(false);
    }

    const onClose = () => {
        setShowModel(false);
    }

    useEffect(() => {
        let storedCategories = localStorage.getItem("categories");
        storedCategories ? addCategory(JSON.parse(storedCategories)) : addCategory([]);
    }, [])

    const onRemoveCategory = (removedCategory) => {
        let modifiedList = categories.filter((category) => {
            return category.id !== removedCategory.id
        });
        localStorage.removeItem(removedCategory.id);
        addCategory(modifiedList);
        addToLocalStorage(modifiedList);

    }

    return (
        <div>
            {
                showModel ? <AddCategoryForm onAddNewCategory={onAddNewCategory} onClose={onClose} /> : null
            }
            <div className="button-container">
                <button className="button" onClick={() => setShowModel(true)}>ADD LIST</button>
            </div>
            <div className="list-container">
                {
                    categories.length ? <CategoryListView categories={categories} onRemoveCategory={onRemoveCategory} /> : <div style={{fontSize: "30px", textAlign: "center", padding: "40px"}}>Category list is empty!</div>
                }
            </div>
        </div>
    )
}

export default ListContainerView;