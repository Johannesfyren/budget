import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();

	async function login(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const response = await fetch(`http://127.0.0.1:3001/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		if (!response.ok) {
			if (response.status == 401) {
				setLoginError("Wrong password or email");
				return;
			} else {
				setLoginError("Wrong password or email");
				return;
			}
		}

		const data = await response.json();
		localStorage.setItem("accessToken", await data.accessToken);
		navigate("/");
	}

	return (
		<div>
			<form onSubmit={login}>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					name="PW"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>

			<p>{loginError}</p>
		</div>
	);
}

// POST http://127.0.0.1:3001/auth/login
// Content-Type: application/json

// {
//     "email": "cmh2@mail.com",
//     "password": "123456"
// }
