import { useShoppingCart } from '../../context/ShoppingCartContext'
import { formatCurrency } from '../../utilities/formatCurrency'
import { NewPrice } from '../../utilities/newPrice'
import Button from '../Button/Button'
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './storeitem.css'
import { useBookContext } from '../../context/DataBooksContext'
import { decodeHTMLEntities } from '../../utilities/utils'

export function StoreItem({ title, subtitle, authors, publisher, isbn13, year, price, desc, image }) {
    const Nprice = NewPrice(null, price)
    const id = Number(isbn13)
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    const { productRatingReview } = useBookContext()

    return (
        <article className='cardDetails'>
            <img
                className='cardDetails__img'
                src={image}
                alt={decodeHTMLEntities(title)}
                style={{ viewTransitionName: `book-${isbn13}` }}
            />

            <div className='cardDetails__main-content'>
                <div className='cardDetails__metadata'>
                    <span className='cardDetails__item'>{publisher}</span>
                    <span className='cardDetails__item'>{authors}</span>
                    <span className='cardDetails__item'>{year}</span>
                    <span className='cardDetails__item'>ISBN: {isbn13}</span>
                </div>

                <header>
                    <h1 className='cardDetails__title'>{decodeHTMLEntities(title)}</h1>
                    <span className='cardDetails__subtitle'>{decodeHTMLEntities(subtitle)}</span>
                </header>

                <div className='cardDetails__rating-section'>
                    <div className='cardDetails__rating'>
                        {[...Array(5)].map((_, i) => {
                            const currentRating = i + 1
                            const isHalf = (productRatingReview.rating !== parseInt(productRatingReview.rating)) && (currentRating === Math.floor(productRatingReview.rating + 1))
                            const isActive = currentRating <= Math.floor((productRatingReview.rating !== parseInt(productRatingReview.rating)) ? productRatingReview.rating + 1 : productRatingReview.rating)

                            return (
                                <FontAwesomeIcon
                                    key={currentRating}
                                    icon={isHalf ? faStarHalfStroke : faStar}
                                    size="sm"
                                    color={isActive ? "#ffc107" : "#e4e5e9"}
                                />
                            )
                        })}
                    </div>
                    <span className='cardDetails__Review'>
                        {productRatingReview.reviews} customer reviews
                    </span>
                </div>

                <span className='cardDetails__price'>{formatCurrency(Nprice)}</span>

                <h2 className='cardDetails__details'>Description</h2>
                <div className='cardDetails__desc'>
                    {decodeHTMLEntities(desc)}
                </div>

                <div className='cardDetails__btns'>
                    {quantity === 0 ? (
                        <Button
                            buttonStyle="btn--blue"
                            buttonSize="btn--large"
                            onClick={() => increaseCartQuantity(id, image, title, price)}
                        >
                            + Add to Cart
                        </Button>
                    ) : (
                        <div className='cardDetails__btn1'>
                            <div className='cardDetails__btn2'>
                                <Button buttonSize="btn--small" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div className='cardDetails__quantity-container'>
                                    <span className='cardDetails__quantity'>{quantity}</span>
                                    <span className='cardDetails__quantity-label'>In Cart</span>
                                </div>
                                <Button buttonSize="btn--small" onClick={() => increaseCartQuantity(id, image, title, price)}>+</Button>
                            </div>
                            <Button
                                buttonStyle="btn--red"
                                buttonSize="btn--medium"
                                onClick={() => removeFromCart(id)}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
