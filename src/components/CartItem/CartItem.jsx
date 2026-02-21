import { useShoppingCart } from '../../context/ShoppingCartContext'
import { formatCurrency } from '../../utilities/formatCurrency'
import { NewPrice } from '../../utilities/newPrice'
import Button from '../Button/Button'
import './cartitem.css'

//cartItem
export function CartItem({ id, quantity, image, price, title }) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()

    return (
        <div className="cartitem">
            <div className="cartitem__image-container">
                <img className="cartitem__img" src={image} alt={title} />
            </div>

            <div className='cartitem__info'>
                <div className='cartitem__title-row'>
                    <span className="cartitem__title">{title}</span>
                </div>

                <div className='cartitem__middle-row'>
                    <div className='cartitem__price-unit'>
                        {formatCurrency(NewPrice(null, price))} each
                    </div>
                </div>

                <div className='cartitem__footer'>
                    <div className='cartitem__controls'>
                        <button className='cartitem__btn-qty' onClick={() => decreaseCartQuantity(id)} disabled={quantity <= 1}>-</button>
                        <span className="cartitem__qty-display">{quantity}</span>
                        <button className='cartitem__btn-qty' onClick={() => increaseCartQuantity(id, image, title, price)}>+</button>
                    </div>
                    <button className='cartitem__remove' onClick={() => removeFromCart(Number(id))}>
                        Remove
                    </button>
                </div>
            </div>

            <div className='cartitem__total-col'>
                <div className='cartitem__total-price'>
                    {formatCurrency(NewPrice(null, price) * quantity)}
                </div>
            </div>
        </div>
    )
}