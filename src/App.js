import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import Routes from "./Routes";

function App(props) {
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		try {
			await Auth.currentSession();
			userHasAuthenticated(true);
		}
		catch (e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}

		setIsAuthenticating(false);
	}
	async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    props.history.push("/login");
  }
	return (
		!isAuthenticating &&
		<div className="App container">
			<Navbar fluid collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">MinionShop</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						{isAuthenticated
							?<> 
							<LinkContainer to="/cart">
									<NavItem>Carrinho</NavItem>
								</LinkContainer>
							<LinkContainer to="/history">
									<NavItem>Histórico</NavItem>
								</LinkContainer> 
							<NavItem onClick={handleLogout}>Sair</NavItem>
							</>
							: <>
								<LinkContainer to="/signup">
									<NavItem>Cadastrar</NavItem>
								</LinkContainer>
								<LinkContainer to="/login">
									<NavItem>Entrar</NavItem>
								</LinkContainer>
							</>
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
		</div>
	);
}

export default withRouter(App);