import "./Table.css";
import { MdDelete } from "react-icons/md";

export const Table = (props) => {
  const handleS=(name)=>{
    console.log(name)
  }
  return (
    props.restaurants && (
      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Address</th>
          <th>Rate</th>
          <th >Delete</th>
        </tr>
        {props.restaurants.map((res) => (
          <tr key={res.id}>
            <td>{res.restaurantName}</td>
            <td>{res.restaurantType}</td>
            <td>{res.restaurantLocation}</td>
            <td>{res.restaurantRate}</td>
            <td
              onClick={(e) => handleS(res.restaurantName)}
              className="delete-td"
            >
              <MdDelete />
            </td>
          </tr>
        ))}
      </table>
    )
  );
};
