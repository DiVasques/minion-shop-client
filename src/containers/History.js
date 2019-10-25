import React, { useRef, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { API } from "aws-amplify";
import "./Cart.css";
import "./History.css";

export default function History(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);
	const historyItens = useRef(null) ;
	
	async function getHistory() {
		try{
			 const getHistoryInfo = await API.get("shopUsers", "/shopUsers/1/history");
			historyItens.current = getHistoryInfo.history;
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
		getHistory();
		
		}
		catch (e) {
			alert(e);
		}
	}
	function renderLander() {
		return (
			<div className="lander">
				<h1>Histórico</h1>
			</div>
		);
	}


	function renderHistoryList(historyItens) {
		//alert(JSON.stringify(historyItens));
  return [{}].concat(historyItens).map((historyItem, i) =>
     i !== 0 ? (
     	<div class="list-group-item">
        <div class="header">
        <h4 class="list-group-item-heading">{"Número do pedido: " + historyItem.purchaseId}</h4>
        </div>
        <p>
          {"Data da Compra: " + new Date(historyItem.date).toLocaleString()}
         </p>
         <p>
         Itens:
         </p>
         <p>
         {renderCartList(historyItem.itens)}
         </p>
         
         
        </div>
    ): (
    	<div>
    	</div>
    	)
  );
}
	
	
	function renderCartList(cartItens) {
  return  [{}].concat(cartItens).map((cartItem, i) =>
     i !== 0 ? (
        <div class="list-group-item list-group-item-success">
        <div class="header">
        <h4 class="list-group-item-heading">{cartItem.productId}</h4>
        </div>
        <div class="row">
        <div class="col-sm-6 col-md-4 ">
          {"Quantidade: " +  cartItem.quantity}
         </div>
         
         </div>
        </div>
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
					<div class="loader">
					</div>
					</div>
					</div>
					: 
					<p><ListGroup>
					
					{historyItens.current[0] != null ?
					renderHistoryList(historyItens.current)
					:
					<ListGroupItem>
      				<div class="header">
      					<h4 class="list-group-item-heading">Você ainda não realizou compras.</h4>
      				</div>
      			</ListGroupItem>
					}
        
					</ListGroup></p>
				}
			<div>

			</div>

		</div>
</div>
	);

}