function RenderDessertCard({image, category, name, price,id , increment, decrement ,count}){

  const { mobile, tablet, desktop }=image;
  
    return (
        <div className="flex flex-col gap-6 " id={id}>
      <div className="presentation-image rounded-xl relative 
      has-[.clicked]:border-3 has-[.clicked]:border-red">
        <div className="rounded-xl overflow-hidden">
          <picture>
           <source media="(min-width: 768px)" srcSet={desktop} />
           <source media="(min-width: 480px)" srcSet={tablet} />
           <img src={mobile} alt={name} className="w-full h-auto" />
          </picture>
       </div>

        <button
          className="w-[40%] md:left-[20%] md:w-[60%] bg-white border border-rose-300 
          font-medium rounded-full before:content-[url('/assets/images/icon-add-to-cart.svg')] 
          flex items-center gap-2 justify-center h-[40px] absolute left-[30%] bottom-0 translate-y-1/2 
          transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105 active:scale-95 
          hover:border-3 hover:border-red z-10"
          onClick={() => increment(id)}
        >
          Add to Cart
        </button>

        {count > 0 && (
          <p className="w-[40%] md:left-[20%] md:w-[60%] bg-red flex items-center justify-between px-4 rounded-full h-[40px] 
        absolute left-[30%] bottom-0 translate-y-1/2  z-10 quantity-controls">
          <span
            onClick={() => decrement(id)}
            className="border-2 border-white rounded-full p-1 transform duration-300 ease-in-out 
            hover:cursor-pointer hover:scale-105 active:scale-95 hover:bg-white text-red group less"
          >
            <img
              src="./assets/images/icon-decrement-quantity.svg"
              className="group-hover:bg-red"
              alt="Minus"
            />
          </span>
          <span className="item-number text-white">{count}</span>
          <span
            onClick={() => increment(id)}
            className="border-2 border-white rounded-full p-1 transform duration-300 ease-in-out 
            hover:cursor-pointer hover:scale-105 active:scale-95 hover:bg-white text-red group more"
          >
            <img
              src="./assets/images/icon-increment-quantity.svg"
              className="group-hover:bg-red"
              alt="Plus"
            />
          </span>
        </p>
        )}
      </div>

      <div className="presentatiion-text flex flex-col gap-2">
        <p className="category text-rose-900">{category}</p>
        <h2 className="name text-rose-900 font-medium">{name}</h2>
        <p className="price text-red font-bold">${price.toFixed(2)}</p>
      </div>
    </div>
    )
}

export default RenderDessertCard
