import React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 22rem;
  overflow-y: scroll;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 35%);
  background: #fff;
`

const Table = styled.table`
  width: 100%;
  overflow-y: scroll;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 8px;
  background: #fff;
  /* dark green text */
  color: #1d470c;

  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
  }

  th {
    text-align: left;
    vertical-align: middle;
    padding-left: 1rem;
    background: #f2f2f2;
    font-weight: bold;
    font-size: 1.2rem;
    height: 4rem;
  }

  tr {
    height: 3.4rem;
    border-bottom: 2px solid rgba(151, 151, 151, 0.16);
  }

  td {
    padding-left: 1rem;
  }
`

const Amount = styled.span`
  color: ${props => (props.category === "DEPOSIT" ? "green" : "red")};
`

const renderTableRows = data => {
  return data.map(({ category, type, amount, date }, i) => (
    <tr key={`${category}-${type}-${i}`}>
      <td>{type}</td>
      <td>
        <Amount category={category}>${amount}</Amount>
      </td>
      <td>{date}</td>
    </tr>
  ))
}
const accountActivityTable = ({ accountActivityData }) => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{renderTableRows(accountActivityData)}</tbody>
      </Table>
    </Container>
  )
}

export default accountActivityTable
