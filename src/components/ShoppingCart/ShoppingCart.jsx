import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CartItem } from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { NewPrice } from "../../utilities/newPrice";
import Button from '../Button/Button'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './shoppingcart.css'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { apiUrl } from "../../services/api";

export function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems, cartQuantity } = useShoppingCart()
    const { user } = useContext(AuthContext)
    //console.log(cartItems)
    const navigate = useNavigate()
    //cargar datos en la caja
    const handleSubTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            //si el id del json es igual al id de cartItems
            //negro como cadena azul como numero
            const item = cartItems.find(i => Number(i.id) === cartItem.id)
            //console.log(item)
            return total + (NewPrice(item) || 0) * cartItem.quantity
        }, 0)
    }
    const handlePay = () => {
        if (!user) {
            closeCart()
            return navigate("/login")
        } else {
            const NcartItems = cartItems.map(item => {
                return {
                    ...item,
                    price: Number(NewPrice(null, item.price))
                }
            })
            apiUrl.post(`/stripe/create-checkout-session`, {
                NcartItems,
                userId: user._id
            }, {
                withCredentials: true // Habilitar el manejo de cookies en Axios
            }).then((res) => {
                if (res.data.url) {
                    //console.log(res.data.url)
                    window.location.href = res.data.url
                }
            }).catch((e) => console.log(e.message))
        }
    }
    const handleCloseCart = (e) => {
        if (e.target.id == "cartmenu") {
            closeCart()
        }
    }
    return (
        <div className={isOpen ? `cartmenu__bg active` : `cartmenu__bg`} onClick={handleCloseCart} id="cartmenu">
            <div className={isOpen ? `cartmenu active` : 'cartmenu'}>
                <div className="cartmenu__top">
                    <span className="cartmenu__items">Cart ({cartQuantity} books)</span>
                    <FontAwesomeIcon icon={faCircleXmark}
                        className="cartmenu__close"
                        onClick={() => closeCart()}
                    />
                </div>

                <div className="cartmenu__content">
                    {cartQuantity === 0 ? (
                        <div className="cartmenu__empty">
                            <p>Your cart is empty</p>
                            <Button buttonStyle="btn--blue" onClick={() => {
                                closeCart()
                                navigate('/books')
                            }}>Explore books</Button>
                        </div>
                    ) : (
                        <div className="cartmenu__items-list">
                            {cartItems.map(item => (
                                <CartItem key={item.id} {...item} />
                            ))}
                        </div>
                    )}
                </div>

                {cartQuantity > 0 && (
                    <div className="cartmenu__footer">
                        <div className="cartmenu__subtotal-row">
                            <span>Subtotal</span>
                            <span className="cartmenu__subtotal-amount">
                                {formatCurrency(handleSubTotal())}
                            </span>
                        </div>
                        <Button
                            buttonStyle="btn--primary--solid"
                            className="cartmenu__pay-btn"
                            onClick={handlePay}
                        >
                            {user ? `Pay with Stripe` : `Log in to pay`}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}