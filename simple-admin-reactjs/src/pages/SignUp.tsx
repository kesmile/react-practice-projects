import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { SetStateAction, useEffect, useState } from 'react';
import { SIGNUP } from '../schemas/mutations';
import '../styles/signup.scss';
import { useAuth } from '../hooks/useAuth';

function SignUp() {
	const [validated, setValidated] = useState(false);
	const [register, { data, loading, error }] = useMutation(SIGNUP);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();

	useEffect(() => {
		if (data) {
			const token = data.signUp.viewer.sessionToken;
			const user = data.signUp.viewer.user;
			if (token && user) {
				login && login(user, token);
			}
		}
	}, [data]);

	const onChangeEmail = (e: { target: { value: SetStateAction<string>; }; }) => {
		setEmail(e.target.value);
	}

	const onChangeUsername = (e: { target: { value: SetStateAction<string>; }; }) => {
		setUsername(e.target.value);
	}

	const onChangePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
		setPassword(e.target.value)
	}

	const onSubmit = (e: {
		currentTarget: any;
		stopPropagation(): unknown; preventDefault: () => void;
	}) => {
		const form = e.currentTarget;
		e.preventDefault();

		if (!form.checkValidity()) {
			e.stopPropagation();
			setValidated(true);
			return;
		}

		const variables = {
			username,
			email,
			password,
		}
		register({ variables });
	}

	return (
		<section className="vh-100">
			<div className="container-fluid h-custom">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-md-9 col-lg-6 col-xl-5">
						<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="img-fluid" alt="Sample image" />
					</div>
					<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<Form noValidate validated={validated} onSubmit={onSubmit}>

						<div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
								<p className="lead fw-normal mb-0 me-3">Sign in with</p>
								<button type="button" className="btn btn-primary btn-floating mx-1">
									<i className="fab fa-facebook-f"></i>
								</button>

								<button type="button" className="btn btn-primary btn-floating mx-1">
									<i className="fab fa-twitter"></i>
								</button>

								<button type="button" className="btn btn-primary btn-floating mx-1">
									<i className="fab fa-linkedin-in"></i>
								</button>
							</div>

							<div className="divider d-flex align-items-center my-4">
								<p className="text-center fw-bold mx-3 mb-0">Or</p>
							</div>

							<Form.Group className="form-outline mb-4" controlId="email">
								<InputGroup hasValidation>
									<Form.Control 
										type="email" 
										onChange={onChangeEmail} 
										placeholder="Enter a valid email address"
										className="form-control form-control-lg" required />
									<Form.Control.Feedback type="invalid">
										Please provide a valid email.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group className="form-outline mb-4" controlId="username">
								<InputGroup hasValidation>
									<Form.Control 
										type="text" 
										onChange={onChangeUsername} 
										placeholder="Please provide a username"
										className="form-control form-control-lg" required />
									<Form.Control.Feedback type="invalid">
										Please choose a username.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group className="form-outline mb-3" controlId="password">
								<InputGroup hasValidation>
									<Form.Control 
										type="password" 
										onChange={onChangePassword} 
										className="form-control form-control-lg"
										placeholder="Enter password"
										required />
									<Form.Control.Feedback type="invalid">
										Please enter password.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group className="form-outline mb-3" controlId="confirm_password">
								<InputGroup hasValidation>
									<Form.Control 
										type="password" 
										onChange={onChangePassword} 
										className="form-control form-control-lg"
										placeholder="Confirm Password"
										required />
									<Form.Control.Feedback type="invalid">
										Please enter password.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Alert variant='danger' hidden={!error}>
								{error?.message}
							</Alert>
							<div className="text-center text-lg-start mt-4 pt-2">
								<Button
									disabled={loading}
									variant="primary"
									className="btn-lg"
									type="submit">
									{loading ? 'Loading…' : 'Register'}
								</Button>
								<p className="small fw-bold mt-2 pt-1 mb-0">Do you have an account? 
								<a href="/login"className="link-danger">Login</a></p>
							</div>
							
						</Form>

						
					</div>
				</div>
			</div>
			<div
				className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
				<div className="text-white mb-3 mb-md-0">
					Copyright © 2020. All rights reserved.
				</div>
				<div>
					<a href="#!" className="text-white me-4">
						<i className="fab fa-facebook-f"></i>
					</a>
					<a href="#!" className="text-white me-4">
						<i className="fab fa-twitter"></i>
					</a>
					<a href="#!" className="text-white me-4">
						<i className="fab fa-google"></i>
					</a>
					<a href="#!" className="text-white">
						<i className="fab fa-linkedin-in"></i>
					</a>
				</div>
			</div>
		</section>
	);
}

export default SignUp;