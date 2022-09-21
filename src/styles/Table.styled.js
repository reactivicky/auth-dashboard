import styled from '@emotion/styled'

export const FileTable = styled.table`
  width: 100%;

  th {
    font-weight: bold;
  }

  th, td {
    padding: 1rem 1rem 1rem 0;
    text-align: left;
  }

  tr {
    :hover {
      background-color: #edecf2;
      transition: all .5s ease;
      cursor: pointer;
    }
  }
`