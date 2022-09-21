import styled from "@emotion/styled";

export const FileTable = styled.table`
	width: 100%;

	th {
		font-weight: bold;
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
	}

	tr {
    border: 1px solid rgba(0, 0, 0, .1);

		:hover {
			background-color: #edecf2;
			transition: all 0.5s ease;
			cursor: pointer;
		}
	}
`;

export const CheckboxContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	height: 100%;
`;

