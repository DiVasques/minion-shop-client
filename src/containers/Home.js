import React from "react";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
	const bobImageUrl = "https://minionshop-img-db.s3.us-east-2.amazonaws.com/bobSqr500px.jpg";
	const kevinImageUrl = "https://minionshop-img-db.s3.us-east-2.amazonaws.com/kevinSqr500px.jpg";
	const stuartImageUrl = "https://minionshop-img-db.s3.us-east-2.amazonaws.com/stuartSqr500px.jpg";
	return (
		<div className="Home">
			<div className="lander">
				<h1>MinionShop</h1>
				<p>O melhor lugar para comprar miniaturas dos Minions! (Minionturas?)</p>
			</div>

			<div class="row">
				<div class="col-sm-6 col-md-4">
					<div class="thumbnail">
						<LinkContainer to="/bob">
							<img class="img-responsive" src={bobImageUrl} alt="bob"></img>
						</LinkContainer>						<div class="caption">
							<h3>Bob</h3>
							<LinkContainer to="/bob"><p><div class="btn btn-warning" role="button">Comprar</div></p></LinkContainer>						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="thumbnail">
						<LinkContainer to="/kevin">
							<img class="img-responsive" src={kevinImageUrl} alt="kevin"></img>
						</LinkContainer>						<div class="caption">
							<h3>Kevin</h3>
							<LinkContainer to="/kevin"><p><div class="btn btn-warning" role="button">Comprar</div></p></LinkContainer>						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">


					<div class="thumbnail">
						<LinkContainer to="/stuart">
							<img class="img-responsive" src={stuartImageUrl} alt="stuart"></img>
						</LinkContainer>
						<div class="caption">
							<h3>Stuart</h3>
							<LinkContainer to="/stuart"><p><div class="btn btn-warning" role="button">Comprar</div></p></LinkContainer>
						</div>

					</div>

				</div>

			</div>

		</div>
	);
}