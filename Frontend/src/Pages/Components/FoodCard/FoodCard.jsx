import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './FoodCard.css'
function FoodCard(props) {
  const [img, setImg] = useState();
  useEffect(() => {
    const result = props.logo.replace("/media/", "");
    console.log(result);
    setImg(result);
  }, [props.logo]);
  return (
    <div>
      <Card style={{ width: "18rem" }} className="food-card">
        <Card.Img variant="top" src={`/assets/backendImage/${img}`} />
        <Card.Body>
          <Card.Title><b>{props.name}</b></Card.Title>
          <Card.Text>{props.desc}</Card.Text>
          <Card.Title><b>${props.price}</b></Card.Title>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FoodCard;
