import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";
import { useShoppingCart } from "../context/ShoppingCartContext";
import FormatCurrency from "../utilities/FormatCurrency";
import ACartItem from "./ACartItem";
//data
import storeItems from "../data/items.json";
//

const ShoppingCart = () => {
  const {isOpen, closeCart, cartItems} = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <ACartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto text-success fw-bold fs-5">
            Total{": "}
            {FormatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(item => item.id == cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
 
export default ShoppingCart;