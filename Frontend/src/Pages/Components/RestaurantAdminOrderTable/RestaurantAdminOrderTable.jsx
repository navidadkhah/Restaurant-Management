import { formatDistanceToNow } from "date-fns";
import { ToastContainer } from "react-toastify";
import "../Table/Table.css";

export const RestaurantAdminOrderTable = (props) => {
  const timeAgo = (createdAtDate) => {
    return formatDistanceToNow(createdAtDate, {
      addSuffix: true,
    });
  };

  return (
    <div style={{ padding: "25px" }}>
      {props.orders && (
        <table id="customers" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>user email</th>
              <th>user phone</th>
              <th>Orders</th>
              <th>Total Price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {props.orders.map((order, index) => (
              <tr key={order.id}>
                <td>{order.userEmail}</td>
                <td>{order.userPhone}</td>
                <td>{order.orders}</td>
                <td>{order.Price}</td>
                <td>{timeAgo(new Date(order.date))}</td>
              </tr>
            ))}
          </tbody>
          <ToastContainer />
        </table>
      )}
    </div>
  );
};
