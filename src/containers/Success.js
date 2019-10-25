import React from "react";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
	return (
		<div className="Home">
			<div className="lander">
				<h1>Compra realizada com sucesso!!!</h1>
				<p>Verifique em seu email a confirmação do seu pedido.</p>
			</div>
			<div class="text-center">
				<LinkContainer to="/"><p><div class="btn btn-warning" role="button">Voltar à página inicial</div></p></LinkContainer>
		
			</div>	
		</div>
		
	);
}