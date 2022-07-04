import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaWindowClose, FaEdit } from "react-icons/fa";
import {
  getCartByUserId,
  checkout,
  editLineItem,
  deleteLineItem,
} from "../../actions/shoppingAction";

import base_url from "../../helpers/base_url";

const ShoppingCartPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) navigate("/login");
    dispatch(getCartByUserId());
  }, []);

  useEffect(() => {
    if (action === "CHECKOUT" && status === "data")
      navigate("/user/orderDetail/" + data.id);
  }, [status]);

  async function editQty(id) {
    const { value: qty } = await Swal.fire({
      title: "Input the desired quantity",
      input: "number",
      inputLabel: "Update Quantity",
      inputPlaceholder: "Enter qty",
      confirmButtonColor: "#0B4619",
    });

    if (qty) {
      console.log(id);
      console.log(qty);
      dispatch(editLineItem(id, { qty: +qty })).then(() => {
        dispatch(getCartByUserId());
      });
    }
  }

  function deleteCartItem(id) {
    Swal.fire({
      title: "Are you sure you want to delete this item from Cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#0B4619",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteLineItem(id)).then(() => {
          dispatch(getCartByUserId());
        });
      }
    });
  }

  const checkoutHandling = () => {
    Swal.fire({
      title: "Are you sure want to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(checkout());
      }
    });
  };

  return action === "GET_CART_BY_USER_ID" &&
    status === "data" &&
    data !== "loading" ? (
    <div className="container mx-auto">
      <div className="w-full bg-white h-screen">
        <h1 className="text-xl text-center font-semibold py-3">
          Shopping Cart
        </h1>
        <h2 className="text-lg text-left font-semibold px-24 py-3">
          Items in Cart
        </h2>
        <hr className="mx-24" />
        <div className="px-24 py-3">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Product</th>
                <th className="lg:text-center pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Quantity">
                    Qtd
                  </span>
                  <span className="hidden lg:inline">Quantity</span>
                </th>
                <th className="lg:text-right text-left pl-5 lg:pl-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems !== undefined ? (
                data.lineItems.map((lineItem) => {
                  return (
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <a href="#">
                          <img
                            src={
                              base_url +
                              "/images/" +
                              lineItem.Product.ProductImages[0].filename
                            }
                            className="w-40 h-30 rounded"
                            alt="Thumbnail"
                          />
                        </a>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-2 text-left">
                            {lineItem.Product.name}
                          </p>
                        </a>
                      </td>
                      <td className="hidden text-center md:table-cell pb-3">
                        <span className="text-sm lg:text-base font-medium">
                          {lineItem.qty}
                        </span>
                      </td>
                      <td className="text-lg text-right pb-2">
                        <button
                          onClick={() => editQty(lineItem.id)}
                          className="pr-1"
                        >
                          <FaEdit color="orange" size={25} />
                        </button>
                        <button
                          onClick={() => deleteCartItem(lineItem.id)}
                          className="pl-1"
                        >
                          <FaWindowClose color="red" size={25} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <hr className="mx-24" />
        <div align="center" className="pt-5">
          <button
            className="rounded text-base font-semibold p-2 bg-midColor text-darkColor hover:bg-darkColor hover:text-midColor"
            onClick={() => checkoutHandling()}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ShoppingCartPage;
