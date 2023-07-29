import './product-card.styles.scss';
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';


const ProductCard = ({productProp})=>{
    const {name, price, imageUrl} = productProp;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = ()=> addItemToCart(productProp);

    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}></img>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{`$${price}`}</span>
            </div>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;