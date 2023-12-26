import "./Table.css";

export const Table = (props) => {
  return (
    props.restaurants && (
      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Address</th>
        </tr>
        {props.restaurants.map((res) => (
          <tr>
            <td>{res.restaurantName}</td>
            <td>{res.restaurantType}</td>
            <td>{res.restaurantLocation}</td>
          </tr>
        ))}
      </table>
    )
  );
};
