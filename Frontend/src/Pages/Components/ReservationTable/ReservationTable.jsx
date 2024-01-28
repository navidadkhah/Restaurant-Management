import { formatDistanceToNow } from "date-fns";
import { ToastContainer } from "react-toastify";
import "../Table/Table.css";

export const ReservationTable = (props) => {
  const timeAgo = (createdAtDate) => {
    return formatDistanceToNow(createdAtDate, {
      addSuffix: true,
    });
  };

  return (
    <div style={{ padding: "15px" }}>
      {props.reservation && (
        <table id="customers">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Date</th>
              <th>place</th>
              <th>occasion</th>
            </tr>
          </thead>
          <tbody>
            {props.reservation.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{reservation.restaurantName}</td>
                <td>{timeAgo(new Date(reservation.date))}</td>
                <td>{reservation.place}</td>
                <td>{reservation.occasion}</td>
              </tr>
            ))}
          </tbody>
          <ToastContainer />
        </table>
      )}
    </div>
  );
};
