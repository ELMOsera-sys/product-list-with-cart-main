function RenderPreviewCard({name,price,count, decrement, id}){
    return (
         <>
         <div className="cart-items w-full flex gap-4 flex-col">
          <div className="w-full flex items-start">
            <h2 className=" text-rose-900 font-medium ">{name}</h2>
          </div>
          <div className="w-full flex justify-between px-6">
            <p className="flex gap-6">
              <span className="item-number text-red">{count}x</span>
              <span className="all-price flex gap-3">
                <span className=" text-rose-400">@${price.toFixed(2)}</span>
                <span className=" text-rose-500">${(count * price).toFixed(2)}</span>
              </span>
            </p>
            <button onClick={() => decrement(id)}
             className=" border-2 border-rose-400
            rounded-full p-1 
            transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
           active:scale-95"><img src="./assets/images/icon-remove-item.svg" alt="Remove"/></button>
          </div>
        </div>
         </>
    )
}

export default RenderPreviewCard