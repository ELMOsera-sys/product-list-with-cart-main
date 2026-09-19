
function RenderConfirmationCard({count, name, price, image:{thumbnail},} ){
    return (
        <div className="w-full flex justify-between px-6 gap-4 items-center ">
          <img src={thumbnail} alt={name} className="w-[60px]
        rounded-lg " />
              <p className="flex gap-6 items-center">
                <span className="flex flex-col gap-2">
                  <span className="text-rose-500">
                  {name}
                  </span>
                  <span className="flex gap-3">
                    <span className=" text-red">{count}x</span>
                    <span className=" text-rose-400">@${price.toFixed(2)}</span>
                  </span>
                </span>
                <span className=" text-rose-500">${(count * price).toFixed(2)}</span>
              </p>
        </div>
    )
}

export default RenderConfirmationCard