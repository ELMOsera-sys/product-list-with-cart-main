const confirmOrderBtn=document.querySelector(".confirm-order-btn");
const overlay=document.querySelector(".overlay");
const startNewOrderBtn=document.querySelector(".start-new-order-btn"); 
let stateArray = [];
let cartSelected;
let orderSummary;
let totalPrice;
let totalNumber;
let hide2;
let emptyCart;
let confirmationSection;
let recycledData

function checkCart() {
  if (stateArray.length===0){
                emptyCart.classList.remove("hidden")
              hide2.forEach(el=>{
                  el.classList.add("hidden");
              })
              }};




function renderCart(waitingData){
        let html1="";
        let html2="";
        let html3="";
        recycledData=waitingData;

        const optionsWrapper=document.querySelector(".options-wrapper");
        cartSelected=document.querySelector(".cart-selected");
        orderSummary=document.querySelector(".order-summary-confirm");
        totalPrice=document.querySelectorAll(".total-price");
        totalNumber=document.querySelector(".total-number");

        hide2=document.querySelectorAll(".hide-2");
        emptyCart=document.querySelector(".cart-container-empty");
        confirmationSection=document.querySelector(".confirmation-section");



        
        

        waitingData.forEach(
            ({
            image:{
                thumbnail,
                mobile,
                desktop,
                tablet
            },name,category,price
        })=>{
            html1+=`
            <div class=" flex flex-col gap-6 " data-thumbnail="${thumbnail}">
        <div class="presentation-image rounded-xl overflow-hidden relative has-[.clicked]:border-3
         has-[.clicked]:border-red">
          <picture>
            <source media="(min-width: 768px)" srcset="${desktop}">
            <source media="(min-width: 480px)" srcset="${tablet}">
            <img src="${mobile}" alt="Waffle with Berries" 
            class="w-full h-auto ">
          </picture>
          <button class="w-[40%] md:left-[20%] md:w-[60%] bg-white border border-rose-300 font-medium 
          rounded-full before:content-[url('./assets/images/icon-add-to-cart.svg')] flex items-center
           gap-2 justify-center h-[40px] absolute left-[30%] top-[85%]
           transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
           active:scale-95 hover:border-3 hover:border-red add-to-cart-btn">
           Add to Cart
          </button>
          <p class="w-[40%] bg-red flex items-center justify-between px-4 rounded-full h-[40px] 
          absolute left-[30%] top-[85%] quantity-controls hidden quantity-controls">
            <span data-value="less" 
            class="border-2 border-white rounded-full p-1
            transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
           active:scale-95 hover:bg-white text-red group less"><img src="./assets/images/icon-decrement-quantity.svg" class="group-hover:bg-red" alt="Minus"></span>
            <span class="item-number text-white">0</span>
            <span data-value="more"
            class="border-2 border-white rounded-full p-1
            transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
           active:scale-95 hover:bg-white text-red group more"><img src="./assets/images/icon-increment-quantity.svg" class="group-hover:bg-red" alt="Plus"></span>
          </p>
        </div>
        <div class="presentatiion-text flex flex-col gap-2">
          <p class="category text-rose-900">${category}</p>
          <h2 class="name text-rose-900 font-medium">${name}</h2>
          <p class="price text-red font-bold">$${price.toFixed(2)}</p>
        </div>
      </div>
            `
        }
        )

        
       function renderTotal(){
              totalPrice.forEach(el=>{
              el.textContent = "$" + stateArray.reduce((a, obj) => a + obj.priceTotal, 0).toFixed(2);
             });
             totalNumber.textContent=stateArray.reduce((a,obj)=>a+obj.numberItem,0)
             }

        optionsWrapper.innerHTML=html1;
        const options=document.querySelectorAll(".options-wrapper > div");
        options.forEach(option=>{
            const addToCartBtn = option.querySelector(".add-to-cart-btn");
            const itemNumber = option.querySelector(".item-number");
            const quantityControls = option.querySelector(".quantity-controls");
            const lessBtn = option.querySelector(".less");
            const moreBtn = option.querySelector(".more");
            const removeItemBtn=option.querySelector(".remove-item-btn");
            const thumbnail=option.dataset.thumbnail;

            const category=option.querySelector(".category").textContent;
            const name=option.querySelector(".name").textContent;
            const safeName = name.replace(/\s+/g, "-");
            const price=parseFloat(option.querySelector(".price").textContent.replace("$",""));

            let number=0;

            function hasBeenClicked() {
                 addToCartBtn.classList.toggle("clicked");
                 quantityControls.classList.toggle("hidden");
                 addToCartBtn.classList.toggle("hidden");

            number++;
            itemNumber.textContent=number;

            html2=`
                 <div class="cart-items w-full flex gap-4 flex-col item-html2-${safeName}">
          <div class="w-full flex items-start">
            <h2 class="variete-name-special-cart text-rose-900 font-medium ">$${name}</h2>
          </div>
          <div class="w-full flex justify-between px-6">
            <p class="flex gap-6">
              <span class="item-number text-red">${number}x</span>
              <span class="all-price flex gap-3">
                <span class="variete-price text-rose-400">@$${price.toFixed(2)}</span>
                <span class="total-price-by-items text-rose-500">$${(number * price).toFixed(2)}</span>
              </span>
            </p>
            <button class="remove-item-btn border-2 border-rose-400
            rounded-full p-1 
            transform duration-300 ease-in-out hover:cursor-pointer hover:scale-105
           active:scale-95"><img src="./assets/images/icon-remove-item.svg" alt="Remove"></button>
          </div>
        </div>`;

         html3=`<div class="w-full flex justify-between px-6 gap-4 items-center item-html3-${safeName}">
          <img src="${thumbnail}" alt="=${category} Thumbnail" class="w-[60px]
        rounded-lg ">
              <p class="flex gap-6 items-center">
                <span class="flex flex-col gap-2">
                  <span class="text-rose-500">
                  ${name}
                  </span>
                  <span class="all-price flex gap-3">
                    <span class="item-number text-red">${number}x</span>
                    <span class="variete-price text-rose-400">@$${price.toFixed(2)}</span>
                  </span>
                </span>
                <span class="total-price-by-items text-rose-500">$${(number * price).toFixed(2)}</span>
              </p>
        </div>`;


            cartSelected.innerHTML+=html2;
            orderSummary.innerHTML+=html3;

            stateArray.push({
              priceTotal:number * price,
              numberItem:number,
              existence:safeName
            })
             }
             

             

              function handless(){
               number--;
                itemNumber.textContent=number;

                const cartItem = cartSelected.querySelector(`.item-html2-${safeName}`);
                cartItem.querySelector(".item-number").textContent = `${number}x`;
             cartItem.querySelector(".total-price-by-items").textContent = `$${(number * price).toFixed(2)}`;


                 const orderItem = orderSummary.querySelector(`.item-html3-${safeName}`);
                orderItem.querySelector(".item-number").textContent = `${number}x`;
             orderItem.querySelector(".total-price-by-items").textContent = `$${(number * price).toFixed(2)}`;

             const entry = stateArray.find(obj => obj.existence === safeName);
             entry.priceTotal = number * price;
             entry.numberItem = number;
             renderTotal();


        if(number===0){
            addToCartBtn.classList.toggle("clicked");
            quantityControls.classList.toggle("hidden");
            addToCartBtn.classList.toggle("hidden");
            stateArray = stateArray.filter(obj => obj.existence !== safeName);
            cartItem.remove();
            orderItem.remove();
            checkCart();
        }
      }

             addToCartBtn.addEventListener("click",()=>{
              hasBeenClicked();
              renderTotal();
              if(!emptyCart.classList.contains("hidden")){
                emptyCart.classList.add("hidden")
              }
              hide2.forEach(el=>{
                if(el.classList.contains("hidden")){
                  el.classList.remove("hidden");
                }
              })
             })


            moreBtn.addEventListener("click",()=>{
                 number++;
                 itemNumber.textContent=number;

                 const cartItem = cartSelected.querySelector(`.item-html2-${safeName}`);
                cartItem.querySelector(".item-number").textContent = `${number}x`;
             cartItem.querySelector(".total-price-by-items").textContent = `$${(number * price).toFixed(2)}`;


                 const orderItem = orderSummary.querySelector(`.item-html3-${safeName}`);
                orderItem.querySelector(".item-number").textContent = `${number}x`;
             orderItem.querySelector(".total-price-by-items").textContent = `$${(number * price).toFixed(2)}`;

             const removeBtn=cartItem.querySelector(".remove-item-btn");
             removeBtn.addEventListener("click",handless)


             const entry = stateArray.find(obj => obj.existence === safeName);
             entry.priceTotal = number * price;
             entry.numberItem = number;
             
             renderTotal();

                 });

                 
           lessBtn.addEventListener("click",handless);
           })
      
          };


          confirmOrderBtn.addEventListener("click",()=>{
    if(stateArray.length!==0){
      cartSelected.classList.toggle("hidden");
      confirmationSection.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      
    }
  });

  startNewOrderBtn.addEventListener("click",()=>{
    renderCart(recycledData);
    stateArray=[];
    checkCart();
    confirmationSection.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    cartSelected.innerHTML="";
    orderSummary.innerHTML="";
    totalNumber.textContent="0";
    totalPrice.forEach(price=>{
      price.textContent="$0.00";
    });
    
  });




    async function fetchData(){
        try{
            const response=await fetch("./data.json");
            const data=await response.json();
            renderCart(data);


        }catch(error){
            console.error("Error fetching data:",error);
        }
    }
    fetchData();

