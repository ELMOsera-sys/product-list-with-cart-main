import RenderPreviewCard from "./previewCard.jsx";

function RenderPreview({totalItems, totalPrice, decrement,setConfirmation, data}){
    return (
        <section className="cart-section w-[80%] flex flex-col gap-6 md:w-[25%] md:self-start">
          
      <h2 className="font-bold text-3xl text-red">Your Cart (<span className="total-number">{totalItems}</span>)</h2>
      {totalItems > 0 ? (
        <>
        
      <div className="md:bg-white md:p-6 flex flex-col gap-4">
        {data?.filter(item => item.count > 0)
      .map(item=>(
        <RenderPreviewCard
        key={item.id}
        {...item}
        decrement={decrement}
        />
      ))
      }
      <div className="flex flex-col gap-1 cart-selected hide-2  md:p-6">  
        <p className="order-total mt-2 w-full px-6 flex justify-between hide-2  md:p-6">
          <span className="text-rose-500">Order Total:</span> 
          <span className="total-price text-xl font-bold">${totalPrice}</span>
        </p>
      </div>
      </div>
        <div className="confirm-btn w-full flex flex-col items-center gap-2  ">
          <p className="text-rose-500 before:content-[url('./assets/images/icon-carbon-neutral.svg')]
           md:bg-white md:p-6">
            this is a <span className="text-rose-900 font-medium">carbon neutral</span> delivery</p>
          <button className="w-[80%] bg-red text-rose-100 font-medium py-3 rounded-full 
          transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
           active:scale-95 confirm-order-btn" onClick={()=>setConfirmation(true)}>
            Confirm Order
          </button>
        </div>
        </>
      ):(
        <div className="cart-container-empty">
         <img src="./assets/images/illustration-empty-cart.svg" alt="Empty Cart" className="w-full h-auto" />
         <p className="text-center text-rose-400 font-medium">Your added items will appear here</p>
      </div>
      )}
      
      

    </section>
    )
}
export default RenderPreview