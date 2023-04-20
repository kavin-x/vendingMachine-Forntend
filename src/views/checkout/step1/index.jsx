import { ArrowRightOutlined, ShopOutlined } from "@ant-design/icons";
import { BasketItem } from "@/components/basket";
import { CHECKOUT_STEP_2 } from "@/constants/routes";
import { displayMoney } from "@/helpers/utils";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { StepTracker } from "../components";
import withCheckout from "../hoc/withCheckout";
import { CHECKOUT_STEP_3 } from "@/constants/routes";
import axios from "axios";

const OrderSummary = ({ basket, subtotal }) => {
  useDocumentTitle("Check Out Step 1 | opticals");
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickPrevious = () => history.push("/");
  const onClickNext = () => {
    let data = [];
    basket.forEach((item) => {
      data.push({ n: item.keywords[0], q: item.quantity });
    });
    axios
      .post("http://localhost:4200/add", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("order completed");
  };
  console.log(basket);
  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">
          Review items in your basket.
        </span>
        <br />
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem
              basket={basket}
              dispatch={dispatch}
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={onClickPrevious}
            type="button"
          >
            <ShopOutlined />
            &nbsp; Continue Shopping
          </button>
          <button className="button" onClick={onClickNext} type="submit">
            Order Now &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  basket: PropType.arrayOf(PropType.object).isRequired,
  subtotal: PropType.number.isRequired,
};

export default withCheckout(OrderSummary);
