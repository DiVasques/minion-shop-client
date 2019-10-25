import React, { useRef, useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import "./Cart.css";

export default function Cart(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);
	const cartItens = useRef(null) ;
	
	async function getCart() {
		try{
			 const getCartInfo = await API.get("shopUsers", "/shopUsers/1/cart");
			cartItens.current = getCartInfo.cart;
			setIsLoaded(true);
			setIsLoading(false);
		}
		catch (e) {
			alert(e);
			return ({status : "error"});
		}
	}
	
	if(!isLoaded){
		try{
		getCart();
		
		}
		catch (e) {
			alert(e);
		}
	}
	function renderLander() {
		return (
			<div className="lander">
				<h1>Carrinho</h1>
			</div>
		);
	}


	

	async function handleDumpCart(event) {
		event.preventDefault();
		setIsLoading(true);
		try {
			
			await API.put("shopUsers", "/shopUsers/1/cart")
			await getCart();
			setIsLoading(false);
				
		} catch (e) {
			
			alert(e.message);

		}
	}
	
	async function toSendEmail(cart) {
		const emailInfo = await API.get("shopUsers", "/shopUsers/1/email");
		const email = emailInfo.email;
		var cartText = "";
		for(var i =0; i<cart.length; i++){
		cartText = cartText.concat("Item: " , cart[i].productId ,"\n" , "-Quantidade: " , cart[i].quantity,"\n");
		}

		await API.post("shopUsers", "/shopUsers/1/email", {
      body: {email:email,cart: cartText}
    });
	

   	
	}
	
	async function handlePurchase(event) {
		event.preventDefault();
		setIsLoading(true);
		await toSendEmail(cartItens.current);
		try {
			
			await API.put("shopUsers", "/shopUsers/1/history");
			await API.put("shopUsers", "/shopUsers/1/cart");
			props.history.push("/success");
			
			setIsLoading(false);
				
		} catch (e) {
			
		alert(e.message);
			setIsLoading(false);}
			
			
      	
		
	}
	

	function renderCartList(cartItens) {
  return [{}].concat(cartItens).map((cartItem, i) =>
     i !== 0 ? (
        <ListGroupItem>
        <div class="header">
        <h4 class="list-group-item-heading">{cartItem.productId}</h4>
        </div>
        <div class="row">
        <div class="col-sm-6 col-md-4 ">
          {"Quantidade: " +  cartItem.quantity}
         </div>
         
         </div>
        </ListGroupItem>
    ): (
    	<div>
    	</div>
    	)
  );
}
	
	
	
	return (
		<div>
			{renderLander()}
			<div>

			</div>


			<div>
				{isLoading
					?
					<div class="row">
					<div class="col-sm-6 col-md-6 col-md-offset-5 col-sm-offset-5 col-sm-6 col-xs-6 col-xs-offset-5 col-align-center">
					<div class="loader"></div>
					
					</div>
					
					</div>
					: <>
					<p><div>
					{renderCartList(cartItens.current)}
					</div></p>
					{cartItens.current[0] != null ? 
					<p><div>
						<div class="row">
						<div class="col-sm-6 col-md-2 ">
          <button onClick={handleDumpCart} type="button" class="btn btn-danger">Limpar Carrinho</button>
         </div>
							<div class="col-sm-6 col-md-offset-7 col-md-3">
						<form onSubmit={handlePurchase}>
							<p><LoaderButton
								block
								className="btn-warning"
								type="submit"
								bsSize="large"
								isLoading={isLoading}
							>
								Finalizar Compra!
      			</LoaderButton></p>
					</form>
					</div>
					</div>
					</div></p> : 
					<ListGroupItem>
        <div class="header">
        <h4 class="list-group-item-heading">Não há nada no seu carrinho.</h4>
        </div>
					</ListGroupItem>}
					</>
				}</div>
			<div>

			</div>

		</div>


	);

}