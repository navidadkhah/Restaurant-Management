import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu_API } from "../../api/RestaurantController";
import { getRestaurantDetail_API } from "../../api/RestaurantController";
import FoodCard from "../Components/FoodCard/FoodCard";
import { Navbar } from "../Components/Navbar/Navbar";
import "./RestaurantPage.css";
import { Dropdown } from "primereact/dropdown";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
import { createReservation_API } from "../../api/OrderController";

const RestaurantPage = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantDetail, setRestaurantDetail] = useState();
  const [cart, setCart] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [occasion, setOccasion] = useState("");
  const [user, setUser] = useState();
  const places = [{ name: "inside" }, { name: "outside" }];
  const occasions = [
    { name: "valentine" },
    { name: "birthday" },
    { name: "anniversary" },
  ];
  const params = useParams();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
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
  const handleReserve = async() => {
    if (selectedPlace === "" || occasion === "") {
      notify("please select place and occasion", "error");
    } else {
      let formData = new FormData();
      formData.append("userPhone", user.phoneNumber);
      formData.append("userEmail", user.email);
      formData.append("restaurantName", restaurantDetail?.restaurantName);
      formData.append("place", selectedPlace.name);
      formData.append("occasion", occasion.name);

      try {
        await createReservation_API(formData)
        notify("reservattion created successfully!", "success")
      } catch (error) {
        notify("something went wrong! try again", "error")
      }
    }
  };
  console.log(user);
  return (
    <div className="restaurant-page-container">
      <Navbar tmp={cart} />
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

      {restaurantMenu.length > 0 && (
        <h2 style={{ alignSelf: "center" }}>Menu</h2>
      )}
      <div className="food-cards">
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
      <h2 style={{ alignSelf: "center" }}>Reserve</h2>
      <div className="reserve-container">
        <Dropdown
          value={selectedPlace}
          onChange={(e) => setSelectedPlace(e.value)}
          options={places}
          optionLabel="name"
          placeholder="Select a place"
          className="w-full md:w-14rem"
        />
        <Dropdown
          value={occasion}
          onChange={(e) => setOccasion(e.value)}
          options={occasions}
          optionLabel="name"
          placeholder="Select a occasion"
        />
      </div>
      <Button className="reserve-button" onClick={handleReserve}>
        Reserve
      </Button>
    </div>
  );
};

export default RestaurantPage;
