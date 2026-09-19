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
                `;

         html3=``;


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

  startNewOrderBtn.addEventListener("click", () => {
  confirmationSection.classList.add("animate__animated", "animate__hinge");

  confirmationSection.addEventListener("animationend", () => {
    confirmationSection.classList.remove("animate__animated", "animate__hinge");
    confirmationSection.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    renderCart(recycledData);
    stateArray = [];
    checkCart();
    cartSelected.innerHTML = "";
    orderSummary.innerHTML = "";
    totalNumber.textContent = "0";
    totalPrice.forEach(price => {
      price.textContent = "$0.00";
    });
  }, { once: true });
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

