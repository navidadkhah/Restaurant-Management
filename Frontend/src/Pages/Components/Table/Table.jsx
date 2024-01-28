import "./Table.css";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import { deleteRestaurant_API } from "../../../api/RestaurantController";

export const Table = (props) => {
  const handleS=(name)=>{
    deleteRestaurant_API(
     name
    )
      .then((res) => {
          notify("restaurant successfully deleted", "error");
          window.location.reload();
      })
      .catch((error) => {
        notify(error.response.data, "error")
      });
      
  }

  const notify = (msg, type) => {
    if (type === "error") {
      toast.error(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else if (type === "success") {
      toast.success(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    props.restaurants && (
      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Address</th>
          <th>Rate</th>
          <th>Delete</th>
        </tr>
        {props.restaurants.map((res) => (
          <tr key={res.id}>
            <td>{res.restaurantName}</td>
            <td>{res.restaurantType}</td>
            <td>{res.restaurantLocation}</td>
            <td>{res.restaurantRate.toFixed(1)}</td>
            <td
              onClick={(e) => handleS(res.restaurantName)}
              className="delete-td"
            >
              <MdDelete />
            </td>
          </tr>
        ))}
        <ToastContainer />
      </table>
    )
  );
};
