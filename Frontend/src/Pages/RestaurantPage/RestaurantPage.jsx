import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu_API } from "../../api/RestaurantController";
import { getRestaurantDetail_API } from "../../api/RestaurantController";
import FoodCard from "../Components/FoodCard/FoodCard";
import { Navbar } from "../Components/Navbar/Navbar";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf '
import "./RestaurantPage.css";

const RestaurantPage = () => {
  const pdRef = useRef()
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantDetail, setRestaurantDetail] = useState();
  const [cart, setCart] = useState([]);

  const downloadPDF = ()=>{
    const input = pdRef.current
    html2canvas(input).then((canvas)=>{
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight)
      const imgX = (pdfWidth-imgWidth * ratio)/2
      const imgY = 30
      pdf.addImage(imgData,'PNG', imgX, imgY, imgWidth*ratio, imgHeight* ratio)
      pdf.save('menu.pdf')
    });
  }

  const params = useParams();
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  useEffect(() => {
    getRestaurantMenu_API(params.name)
      .then((res) => {
        setRestaurantMenu(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    getRestaurantDetail_API(params.name)
      .then((res) => {
        setRestaurantDetail(res.data[0]);
        console.log(res.data[0].restaurantRate);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [params.name]);

  const addToCart = (food) => {
    // Check if the cart is not empty and if the restaurant name is different
    if (cart.length > 0 && cart[0].restaurant !== params.name) {
      // Clear the cart if the restaurant name is different
      setCart([]);
    }

    // Add the item to the cart
    const newItem = {
      name: food.foodName,
      restaurant: params.name,
      price: food.foodPrice,
    };

    setCart([...cart, newItem]);

    // Store the updated cart in local storage
    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
  };
  return (
    <div className="restaurant-page-container">
      <Navbar tmp={cart}/>
      <div className="restaurant-details">
        <div className="restaurant-details-class">
          <p>Name:</p>
          <p>{restaurantDetail?.restaurantName}</p>
        </div>
        <div className="restaurant-details-class">
          <p>Location:</p>
          <p>{restaurantDetail?.restaurantLocation}</p>
        </div>
        <div className="restaurant-details-class">
          <p>Description:</p>
          <p>{restaurantDetail?.restaurantDescription}</p>
        </div>
        <div className="restaurant-details-class">
          <p>Rate:</p>
          <p>
            {restaurantDetail?.restaurantRate.toFixed(1)} from   {restaurantDetail?.restaurantRateNumber} votes
          </p>

        </div>
      </div>

      <div className="food-cards" ref={pdRef}>
        {restaurantMenu.length > 0 ? (
          restaurantMenu.map((item) => (
            <FoodCard
              key={item.id}
              name={item.foodName}
              desc={item.foodDescription}
              logo={item.foodImage}
              price={item.foodPrice}
              addToCart={() => addToCart(item)}
            />
          ))
        ) : (
          <p className="no-search">there is no food</p>
        )}
      </div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default RestaurantPage;
