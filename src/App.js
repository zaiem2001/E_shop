import { useRef, useState } from "react";
import axios from "axios";

import "./App.css";
import Input from "./components/Input";
import NavBar from "./components/NavBar";
import Messanger from "./components/Messanger";
import Loader from "./components/Loader";

function App() {
  const [delivery, setDelivery] = useState(0);
  const [user, setUser] = useState({
    user: null,
    error: null,
    loading: false,
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  let totalPrice = 158 + delivery;

  const loadScript = (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    if (!delivery) {
      setUser((prev) => {
        return { ...prev, error: "Select a Delivery Method." };
      });
      return;
    }

    if (!user.user) {
      setUser((prev) => {
        return { ...prev, error: "Login first to make a Payment." };
      });
      return;
    }

    const url = "https://checkout.razorpay.com/v1/checkout.js";

    const resp = await loadScript(url);

    if (!resp) {
      alert("You are offline");
    }

    const options = {
      key: "rzp_test_0FBSXbCAfQHP55",
      currency: "INR",
      amount: amount * 100,
      name: "Zaiem",
      description: "Thanks for purchasing.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/z-social-bf99d.appspot.com/o/images%2FIMG_20210102_182447_592-01.jpeg?alt=media&token=32acc17f-fe04-45f5-9816-28af46ff537b",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment successfull...");
        window.location.reload();
      },
      prefill: {
        name: "Zaiem",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // ----------------------------> Login and Sign up handler <---------------------------------

  const handleSignup = async (req) => {
    const userObj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setUser({ loading: true, user: null, error: null });

    if (!userObj.email || !userObj.password || !userObj.name) {
      setUser({
        loading: false,
        user: null,
        error: "Enter Name, Email and Password.",
      });
      return;
    }

    const url = "login"
      ? `https://eshop-backend-pro.herokuapp.com/api/users/login`
      : "https://eshop-backend-pro.herokuapp.com/api/users/register";

    try {
      const { data } = await axios.post(url, userObj, config);

      if (data) {
        setUser({ loading: false, user: data.name, error: null });
      }
    } catch (error) {
      setUser({
        loading: false,
        user: null,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      console.log(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  // ------------------------------------------------------------------------------------------

  return (
    <div className="App">
      <NavBar />

      {!user.loading && user.error && (
        <div
          className="alert"
          style={{
            width: "600px",
            position: "absolute",
            left: "35%",
          }}
        >
          <Messanger variant="danger">{user.error}</Messanger>
        </div>
      )}

      <div className="main">
        <div className="wrapper">
          <div className="main__left">
            <span className="main__left__header">Shipping and Payment</span>

            <div className="buttons">
              {!user.user ? (
                <>
                  <button
                    className="login button"
                    onClick={() => handleSignup("login")}
                  >
                    Log In
                  </button>
                  <button
                    className="signup button"
                    onClick={() => handleSignup()}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <span className="userDetails">
                    Name : <span> {user.user} </span>
                  </span>
                  <button
                    className="logout button"
                    onClick={() =>
                      setUser({ user: null, error: null, loading: false })
                    }
                  >
                    Logout
                  </button>
                </>
              )}

              {user.loading && <Loader size="40px" />}
            </div>

            <div className="shipping__info">
              <span className="s__info">Shipping Information</span>

              <div className="user__inputs">
                <div className="row1">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    onChange={() =>
                      setUser((prev) => {
                        return { ...prev, error: null };
                      })
                    }
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    ref={nameRef}
                    onChange={() =>
                      setUser((prev) => {
                        return { ...prev, error: null };
                      })
                    }
                  />
                  <Input type="text" name="Full Name" />
                  <Input type="text" name="Phone Number" />
                </div>

                <div className="row2">
                  <input
                    onChange={() =>
                      setUser((prev) => {
                        return { ...prev, error: null };
                      })
                    }
                    className="input"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />

                  <Input type="text" name="City" />
                  <Input type="text" name="Postal Code / ZIP" />
                  <Input type="text" name="Poland" />
                </div>
                <div className="arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="main__right">
            <div className="shipping__icons">
              <div className="cart__icon ship__icon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div className="line"></div>
              <div className="truck__icon ship__icon">
                <i class="fas fa-shipping-fast"></i>
              </div>
            </div>

            <div className="right__payment">
              <div className="right__row">
                <div className="payment__method">
                  <span className="p">Payment Method</span>

                  <div className="options">
                    <div className="paypal option">
                      <i class="fab fa-paypal"></i>{" "}
                      <span className="pay">
                        Pay<span className="pal">Pal</span>
                      </span>{" "}
                    </div>

                    <div className="visa option">
                      <i class="fab fa-cc-visa"></i>
                    </div>

                    <div className="mastercard option">
                      <i class="fab fa-cc-mastercard"></i>
                    </div>

                    <div className="maestro option">
                      <img
                        src="https://1000logos.net/wp-content/uploads/2021/05/Maestro-logo.png"
                        alt="maestro"
                        className="maestro"
                      />
                    </div>

                    <div className="discover option">
                      <i class="fab fa-cc-discover"></i>
                    </div>

                    <div className="deal option">
                      <i class="fab fa-ideal"></i>
                    </div>
                  </div>
                </div>

                <div className="delivery__method">
                  <span className="d">Delivery Method</span>

                  <div className="d__options">
                    <div
                      className={
                        delivery === 20
                          ? "inpost d__option active"
                          : "inpost d__option"
                      }
                      onClick={() => setDelivery(20)}
                    >
                      <span>Inpost</span>
                      <span className="price">$20.00</span>
                    </div>

                    <div
                      className={
                        delivery === 12
                          ? "dpd d__option active"
                          : "dpd d__option"
                      }
                      onClick={() => setDelivery(12)}
                    >
                      <span>Dpd</span>
                      <span className="price">$12.00</span>
                    </div>

                    <div
                      className={
                        delivery === 15
                          ? "maestro d__option active"
                          : "maestro d__option"
                      }
                      onClick={() => setDelivery(15)}
                    >
                      <i class="fab fa-dhl"></i>
                      <span className="price">$15.00</span>
                    </div>

                    <div
                      className={
                        delivery === 10
                          ? "fedex d__option active"
                          : "fedex d__option"
                      }
                      onClick={() => setDelivery(10)}
                    >
                      <i class="fab fa-fedex"></i>
                      <span className="price">$10.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart">
                <span className="your__cart">Your Cart</span>

                <div className="cart__items">
                  <div className="item item1">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0064/0804/4633/products/mockup-9a68aaf5_1024x1024@2x.jpg"
                      alt="avatar"
                      className="item__img"
                    />

                    <div className="item__name">
                      <span>T-Shirt Summer Vibes</span>
                    </div>

                    <div className="item__price">
                      <span>$89.99</span>
                    </div>

                    <span className="item__tag">#261311</span>
                  </div>

                  <div className="item item2">
                    <img
                      src="https://m.media-amazon.com/images/I/71U8pisCgmL._UY550_.jpg"
                      alt="avatar"
                      className="item__img"
                    />

                    <div className="item__name">
                      <span>Basic Slim Fit T-Shirt</span>
                    </div>

                    <div className="item__price">
                      <span>$69.99</span>
                    </div>

                    <span className="item__tag">#212315</span>
                  </div>
                </div>

                <div className="button__totalcost">
                  <button> Total Cost </button>
                  <span style={{ color: "black" }}>
                    {" "}
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="cart__footer">
                  <i class="fas fa-truck-moving"></i>
                  <span className="footer__desc">
                    You are <b> $3,002</b> away from free shipping!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <i class="fas fa-arrow-left"></i>
          <span>Back</span>
        </div>

        <div className="call__to__action">
          <div className="continue cta__button">Continue Shopping</div>
          <div
            className="proceed cta__button"
            onClick={() => displayRazorpay(totalPrice)}
          >
            proceed to payment
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
