import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useShoppingCart } from "../context/ShoppingCartContext";
//data
import storeItems from "../data/items.json";
//
import FormatCurrency from "../utilities/FormatCurrency";

type aCartItemProps = {
  id: number,
  quantity: number
}

const ACartItem = ({id, quantity}: aCartItemProps) => {
  const {removeFromCart} = useShoppingCart();

  const item = storeItems.find(item => item.id == id);
  if(item == null) return null;

  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img src={item.imgUrl} alt={`${item.name} image`} style={{ width: "125px", height: "75px", objectFit:"cover" }} />
      <div className="me-auto">
        <div className="text-secondary" style={{fontWeight: "bolder"}}>
          {item.name} {" "} {quantity > 1 && (
            <span className="text-muted" style={{fontSize: ".65rem"}}>x{quantity}</span>
          )}
        </div>
        <div className="text-muted" style={{ fontWeight: "bolder", fontSize: ".75rem"}}>
          {FormatCurrency(item.price)}
        </div>
      </div>
      <div>{FormatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
        &times;
      </Button>
    </Stack>
  );
}
 
export default ACartItem;