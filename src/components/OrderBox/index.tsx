import FormControl from "react-bootstrap/FormControl";
import { GameOrderTypes } from "../../types/GamesType";

import "./index.scss";

type OrderBoxProps = {
  orders: string[];
  orderCallback: (search: GameOrderTypes) => void;
};

const OrderBox = ({ orders, orderCallback }: OrderBoxProps) => (
  <FormControl
    as="select"
    onChange={(event) => orderCallback(event.target.value as GameOrderTypes)}
    className="order-box"
  >
    <option disabled selected>
      Select Order
    </option>
    {orders.map((order, index) => (
      <option key={index} value={order}>
        {order.replace(/_/g, " ")}
      </option>
    ))}
  </FormControl>
);

export default OrderBox;
