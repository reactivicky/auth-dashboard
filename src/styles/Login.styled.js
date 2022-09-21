import styled from "@emotion/styled";

export const LoginContainer = styled.div`
	width: 20rem;
	padding: 2rem;
	border-radius: 2rem;
	color: white;
  display: flex;
  flex-direction: column;
  gap: 5rem;
	border: 1px solid rgba(0, 0, 0, .1);
	position: relative;
	overflow: hidden;

	h2 {
		font-size: 2rem;
		font-weight: 500;
    display: flex;
    align-items: end;
		z-index: 1;
		height: 10rem;
	}

	form {
		display: flex;
		flex-direction: column;
		z-index: 1;
		height: 15rem;

    input {
      padding: .5rem;
      border: 1px solid rgba(0, 0, 0, .1);
			font-family: 'Poppins', sans-serif;
    }
	}
`;

export const ErrorMessage = styled.span`
	color: red;
	font-size: .8rem;
	margin: .5rem 0 .5rem;
`

export const BlueCircle = styled.div`
	position: absolute;
	height: 500px;
	width: 500px;
	background: rgb(25,64,123);
	background: linear-gradient(90deg, rgba(25,64,123,1) 0%, rgba(33,211,241,1) 100%);
	border-radius: 50%;
	top: -250px;
	left: -140px;
`
export const LoginBtn = styled.button`
	background: rgb(25,64,123);
	background: linear-gradient(90deg, rgba(25,64,123,1) 0%, rgba(33,211,241,1) 100%);
	border-radius: 100vw;
	border: none;
	padding: .5rem;
	color: white;
	font-size: 1rem;
`