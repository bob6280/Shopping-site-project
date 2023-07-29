import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../Components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    console.log(categoriesMap);
    
    return(
        <Fragment>
            {Object.keys(categoriesMap).map((title)=>{
                const products = categoriesMap[title];
                return(<CategoryPreview key={title} title={title} products={products}></CategoryPreview>
                );
            })}
        </Fragment>
    );
}

export default CategoriesPreview;