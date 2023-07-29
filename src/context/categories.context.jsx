import { createContext, useState, useEffect} from "react";

import {getCategoriesAndDocuments} from '../utilities/firebase/firebase.utils';



export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children}) =>{
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);
    //this useEffect hook add all the data into the firebase db

    useEffect(()=>{
        const getCategoriesMap = async()=>{
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = {categoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}