import CartContext from '../../context/CartContext'
import './index.css'
const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total = total + each.quantity * each.price
      })
      return (
        <div className="row">
          <h1 className="main-heading">
            Order Total: <span className="span">Rs{total}/-</span>
          </h1>
          <p className="para">{cartList.length} items in a cart</p>
          <button className="button-container">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
