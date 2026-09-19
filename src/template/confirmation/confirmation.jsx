import RenderConfirmationCard from "./confirmationCard.jsx";


function RenderConfirmation({data, totalPrice, setConfirmation}) {
  return (
    <section
      className="flex flex-col items-start gap-6 bg-white 
      absolute w-full bottom-0 left-0 px-8 py-10 rounded-t-3xl md:w-[30%] md:fixed 
      md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-40 md:h-[80vh]  md:overflow-y-auto"
    >
      <img src="./assets/images/icon-order-confirmed.svg" alt="Order Confirmation" className="w-[80px]" />
      <h2 className="font-bold text-rose-900 text-3xl w-[1ch]">Order Confirmed!</h2>
      <p>we hope you enjoy your food!</p>
      <div className="order-summary-confirm">
        {data?.filter(item => item.count > 0)
        .map(item => (
          <RenderConfirmationCard
           key={item.id} 
           {...item} />
        ))}
      </div>
      <p className="text-rose-500 flex justify-between w-full mt-6">
        <span>Order Total</span>
        <span className="total-price text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </p>
      <button onClick={() => setConfirmation(false)}
        className="w-full bg-red text-rose-100 font-medium py-3 rounded-full 
        transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
        active:scale-95 start-new-order-btn"
      >
        Start New Order
      </button>
    </section>
  );
}

export default RenderConfirmation;