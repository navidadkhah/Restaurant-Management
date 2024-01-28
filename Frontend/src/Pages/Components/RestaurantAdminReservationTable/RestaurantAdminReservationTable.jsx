import { formatDistanceToNow } from "date-fns";
import { ToastContainer } from "react-toastify";
import "../Table/Table.css";

export const RestaurantAdminReservationTable = (props) => {
  const timeAgo = (createdAtDate) => {
    return formatDistanceToNow(createdAtDate, {
      addSuffix: true,
    });
  };

  return (
    <div style={{ padding: "25px" }}>
      {props.reservations && (
        <table id="customers" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>user email</th>
              <th>user phone</th>
              <th>place</th>
              <th>occasion</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {props.reservations.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{reservation.userEmail}</td>
                <td>{reservation.userPhone}</td>
                <td>{reservation.place}</td>
                <td>{reservation.occasion}</td>
                <td>{timeAgo(new Date(reservation.date))}</td>
              </tr>
            ))}
          </tbody>
          <ToastContainer />
        </table>
      )}
    </div>
  );
};
