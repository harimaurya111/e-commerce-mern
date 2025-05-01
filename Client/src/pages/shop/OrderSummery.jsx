import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearCart } from '../../redux/features/cart/CartSlice';


const OrderSummery = () => {

  const dispatch = useDispatch()
const products = useSelector((state)=>state.cart.products)
const {selectedItem,totalPrice,tax,taxRate,grandTotal} = useSelector((state)=>state.cart)

const handleClearCart =()=>{
  dispatch(clearCart())
}

return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg p-6 mt-5 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Order Summary</h2>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg font-medium">Selected Items: <span className="text-red-500 font-bold">{selectedItem}</span></p>
        <p className="text-gray-700 text-lg font-medium">Total Price: <span className="text-red-500 font-bold">${totalPrice.toFixed(2)}</span></p>
        <p className="text-gray-700 text-lg font-medium">Tax ({taxRate * 100}%): <span className="text-red-500 font-bold">${tax.toFixed(2)}</span></p>
        <h3 className="text-xl font-bold text-gray-900 mt-3 border-t pt-3">Grand Total: <span className="text-purple-600">${grandTotal.toFixed(2)}</span></h3>
      </div>
  
      <div className="flex justify-around mt-6">
        {/* Clear Cart Button */}
        <button onClick={(e)=>{e.stopPropagation()
          handleClearCart()
        }} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-300">
          <i className="ri-delete-bin-7-line text-lg mr-2"></i> Clear Cart
        </button>
  
        {/* Proceed Checkout Button */}
        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-300">
          <i className="ri-bank-card-line text-lg mr-2"></i> Checkout
        </button>
      </div>
    </div>
  );
  
  
}

export default OrderSummery