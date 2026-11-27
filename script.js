const cart = [];
const money = value => "R" + value.toFixed(0);
function renderCart(){
  const list=document.getElementById("cart-items");
  const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  document.getElementById("cart-count").textContent=count;
  document.getElementById("order-count").textContent=count+" "+(count===1?"item":"items");
  document.getElementById("cart-total").textContent=money(total);
  if(!cart.length){list.innerHTML='<p class="empty-cart">Your order is empty. Let\'s fix that.</p>';return;}
  list.innerHTML=cart.map((item,index)=>'<div class="cart-row"><span>'+item.name+' × '+item.qty+'</span><span><strong>'+money(item.price*item.qty)+'</strong><button class="remove-item" type="button" data-remove="'+index+'" aria-label="Remove '+item.name+'">Remove</button></span></div>').join("");
}
document.querySelectorAll(".add-button").forEach(button=>button.addEventListener("click",()=>{
  const name=button.dataset.name,price=Number(button.dataset.price);
  const found=cart.find(item=>item.name===name);
  if(found)found.qty++;else cart.push({name,price,qty:1});
  renderCart();
  const original=button.innerHTML;button.innerHTML="Added ✓";setTimeout(()=>button.innerHTML=original,900);
}));
document.getElementById("cart-items").addEventListener("click",event=>{
  const button=event.target.closest("[data-remove]");if(!button)return;
  cart.splice(Number(button.dataset.remove),1);renderCart();
});
document.getElementById("checkout-button").addEventListener("click",()=>{
  if(!cart.length){alert("Please add at least one meal before continuing.");return;}
  const summary=cart.map(item=>item.name+" x "+item.qty+" — "+money(item.price*item.qty)).join("\n");
  alert("ORDER PREVIEW\n\n"+summary+"\n\nEstimated total: "+money(cart.reduce((sum,item)=>sum+item.price*item.qty,0))+"\n\nThis is a demo preview. Contact the business directly to confirm availability and place a real order.");
});
renderCart();