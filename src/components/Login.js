import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "../styles/Login.styled";

const schema = yup
	.object({
		username: yup.string().required("Username is required"),
		password: yup.string().required("Password is required"),
		domain: yup.string().required("Domain is required"),
	})
	.required();

const Login = ({ setLoading }) => {
	const [loginError, setLoginError] = useState('')
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async () => {
		try {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				localStorage.setItem("missanToken", "token");
				navigate("/dashboard");
			}, 2000)
		} catch (e) {
			console.log(e);
			setLoading(false);
			setLoginError('Invalid Credentials')
		}
		reset();
	};

	return (
		<S.LoginContainer>
			<h2>
				Missan <br /> FMS Login
			</h2>
			<S.BlueCircle />
			<form onSubmit={handleSubmit(onSubmit)}>
				{loginError && <S.ErrorMessage>{loginError}</S.ErrorMessage>}
				<input
					defaultValue="testuser"
					placeholder="Username"
					{...register("username")}
				/>
				{errors.username && (
					<S.ErrorMessage>{errors.username.message}</S.ErrorMessage>
				)}

				<input
					defaultValue="Missan@123"
					placeholder="Password"
					{...register("password")}
				/>
				{errors.password && (
					<S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
				)}

				<input
					defaultValue="ad.missan.group"
					placeholder="Domain"
					{...register("domain")}
				/>
				{errors.domain && (
					<S.ErrorMessage>{errors.domain.message}</S.ErrorMessage>
				)}

				<S.LoginBtn type="submit">Login</S.LoginBtn>
			</form>
		</S.LoginContainer>
	);
};

export default Login;
