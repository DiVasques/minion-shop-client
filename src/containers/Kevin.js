import React, { useState } from "react";
import "./Bob.css";
import "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";


export default function Kevin(props) {
	const [isLoading, setIsLoading] = useState(false);
	const bobImageUrl = "https://minionshop-img-db.s3.us-east-2.amazonaws.com/kevinSqr500px.jpg";
	const productId = "MINION-KEVIN";

	const [fields, handleFieldChange] = useFormFields({
		quantity: 1
	});
	
	
	function addOnCart(productId,quantity) {
		const quantNumber = parseInt(quantity,10);
    return API.put("shopUsers", "/shopUsers/1/add", {
      body: {productId:productId, quantity:quantNumber}
    });
		
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		try {
			await addOnCart(productId,fields.quantity);
			props.history.push("/cart");
		} catch (e) {
			alert(e.message);
			setIsLoading(false);
      	
      
		}
	}
	return (


		<div class="row">
			<div class="col-sm-6 col-md-6 col-align-center">

				<div class="caption">
					<h3>Kevin</h3>
				</div>
				<div class="thumbnail">
					<img class="img-responsive" src={bobImageUrl} alt="kevin"></img>
				</div>
			</div>

			{props.isAuthenticated
				?
				<div class="col-sm-6 col-md-3 col-md-offset-3 col-align-center">
					<div class="form-group">

						<form onSubmit={handleSubmit}>
							<label for="quantity">Quantidade</label>
							<p><select
								type="number"
								class="form-control"
								id="quantity"
								value={fields.quantity}
								onChange={handleFieldChange}>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>9</option>
								<option>10</option>
							</select></p>
							<p><LoaderButton
								block
								className="btn-warning"
								type="submit"
								bsSize="large"
								isLoading={isLoading}
							>
								Adicionar ao Carrinho
      			</LoaderButton></p>


						</form>
					</div>
				</div>
				: <div class="col-sm-6 col-md-4 col-md-offset-2 col-align-center">
					<LinkContainer to="/login">
						<p><div class="btn btn-primary btn-lg" role="button">Entrar na Conta</div></p>
					</LinkContainer>
				</div>
			}


		</div>


	);
}