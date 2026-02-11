

import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    food_list,
    cartItems,
    backendUrl,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  /* ---------------- INPUT HANDLER ---------------- */
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async (e) => {
    e.preventDefault();
    console.log("🔥 placeOrder function triggered");

    try {
      if (!food_list || !cartItems) {
        toast.error("Cart not ready");
        return;
      }

      let orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id],
          });
        }
      });

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      console.log("📤 Sending orderData:", orderData);

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: { token },
        }
      );

      console.log("💳 Stripe response:", response.data);

      if (response.data.success && response.data.session_url) {
        console.log("➡️ Redirecting to Stripe:", response.data.session_url);
        window.location.replace(response.data.session_url);
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      console.error("❌ placeOrder error:", err);
      toast.error("Something went wrong. Check console.");
    }
  };

  /* ---------------- AUTH & CART CHECK ---------------- */
  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to place an order");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
          />
        </div>

        <input
          required
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email address"
        />

        <input
          required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
          />
          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>
              $
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + 2}
            </b>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;


