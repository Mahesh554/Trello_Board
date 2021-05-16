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
            name: cName,
            listItems: []
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

    const onAddNewSubItem = (sItem) => {

        let reqCategory = categories.filter((category) => {
            return sItem.categoryId === category.id
        })

        let index = categories.findIndex(x => x.id === reqCategory[0].id)

        let oldListItems = reqCategory[0].listItems;

        let modifiedList = [...oldListItems, sItem];

        let ModifiedCategory = {
            id: reqCategory[0].id,
            name: reqCategory[0].name,
            listItems: modifiedList
        }

        let newCategories = [...categories];
        newCategories[index] = ModifiedCategory;

        addCategory(newCategories);

        addToLocalStorage(newCategories);

    }

    const onRemoveListItem = (modifiedList, categoryId) => {
        let reqCategory = categories.filter((category) => {
            return categoryId === category.id
        })
        let index = categories.findIndex(x => x.id === reqCategory[0].id)

        let ModifiedCategory = {
            id: reqCategory[0].id,
            name: reqCategory[0].name,
            listItems: modifiedList
        }

        let newCategories = [...categories];
        newCategories[index] = ModifiedCategory;

        addCategory(newCategories);

        addToLocalStorage(newCategories);
    }

    const onDropFromCategory = (ModifiedObj, categoryToAddId) => {
        let listCategoryToRemove = categories.filter((category) => {
            return ModifiedObj.categoryId === category.id
        })

        let listCategoryToRemoveIndex = categories.findIndex(x => x.id === listCategoryToRemove[0].id)

        let listCategoryToAdd = categories.filter((category) => {
            return categoryToAddId === category.id
        })

        let listCategoryToAddIndex = categories.findIndex(x => x.id === listCategoryToAdd[0].id)

        let oldListItemsRemoveCategory = listCategoryToRemove[0].listItems;

        let oldListItemsAddCategory = listCategoryToAdd[0].listItems;

        let newItemsRemoveCategory = oldListItemsRemoveCategory.filter((item) => {
            return item.id !== ModifiedObj.id
        })

        let newItemsAddCategory = [ModifiedObj, ...oldListItemsAddCategory]

        let RemoveListCategory = {
            id: listCategoryToRemove[0].id,
            name: listCategoryToRemove[0].name,
            listItems: newItemsRemoveCategory
        }

        let AddListCategory = {
            id: listCategoryToAdd[0].id,
            name: listCategoryToAdd[0].name,
            listItems: newItemsAddCategory
        }

        let newCategories = [...categories];
        newCategories[listCategoryToRemoveIndex] = RemoveListCategory;
        newCategories[listCategoryToAddIndex] = AddListCategory;

        addCategory(newCategories);

        addToLocalStorage(newCategories);

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
                    categories.length ? <CategoryListView
                        categories={categories}
                        onRemoveCategory={onRemoveCategory}
                        onAddNewSubItem={onAddNewSubItem}
                        onRemoveListItem={onRemoveListItem}
                        onDropFromCategory={onDropFromCategory}
                    /> : <div style={{ fontSize: "30px", textAlign: "center", padding: "40px" }}>Category list is empty!</div>
                }
            </div>
        </div>
    )
}

export default ListContainerView;