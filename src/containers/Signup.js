import React, { useState } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
import { Auth, API } from "aws-amplify";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
  	 name: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
    	fields.name.length > 0 &&
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  function addUser(name, email) {
    return API.post("shopUsers", "/shopUsers", {
      body: {name: name,email:email}
    });
  }

  async function handleSubmit(event) {
	event.preventDefault();

	setIsLoading(true);

	try {
		const newUser = await Auth.signUp({
			username: fields.email,
			password: fields.password
		});
		setIsLoading(false);
		setNewUser(newUser);
	} catch (e) {

		if (e.name === 'UsernameExistsException') {
			try {
				const newUser = await Auth.resendSignUp(fields.email);
				setIsLoading(false);
				setNewUser(newUser);
			}
			catch (e) {
				if (e.name === 'InvalidParameterException' && e.message === 'User is already confirmed.') {
					alert('Email já cadastrado.');
					setIsLoading(false);
				}
				else {
				alert(e.message);
				setIsLoading(false);
				}
			}	
		}
		else {
				alert(e.message);
				setIsLoading(false);
		}
	}
}

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      
      await addUser(fields.name,fields.email);
  
      props.userHasAuthenticated(true);
      props.history.push("/");
  } catch (e) {
    
      alert(e.message+e.number);
      setIsLoading(false);
      
      
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Código de confirmação</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Verifique o código no seu email.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verificar
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
      	<FormGroup controlId="name" bsSize="large">
          <ControlLabel>Nome</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Senha</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirmar Senha</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Cadastrar
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}