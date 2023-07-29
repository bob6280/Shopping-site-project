import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckOutitem = ({cartItem})=>{
    const {clearItemFromCart, addItemToCart, deleteItemFromCart} = useContext(CartContext);
    const {name, imageUrl, price, quantity} = cartItem;

    //these are helper functions to make out code more clear!
    const clearItemhandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const deleteItemHandler = () => deleteItemFromCart(cartItem);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={deleteItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemhandler}>&#10005;</div>
        </div>
    )
}

export default CheckOutitem;