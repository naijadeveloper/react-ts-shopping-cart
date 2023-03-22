import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
//data
import storeItems from "../data/items.json";

const Store = () => {
  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-3">
        {storeItems.map(item => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
      </Row>
    </>
  );
}
 
export default Store;