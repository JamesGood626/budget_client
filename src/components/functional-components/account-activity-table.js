import React from "react"
import styled from "styled-components"

const Table = styled.table`
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
    vertical-align: baseline;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

const Amount = styled.span`
  color: ${props => (props.category === "DEPOSIT" ? "green" : "red")};
`

const renderTableRows = data => {
  return data.map(({ category, type, amount, date }, i) => (
    <tr key={`${category}-${type}-${i}`}>
      <td>
        {type} <Amount category={category}>{amount}</Amount>
      </td>
      <td>{date}</td>
    </tr>
  ))
}
const accountActivityTable = ({ accountActivityData }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Expense</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{renderTableRows(accountActivityData)}</tbody>
    </Table>
  )
}

export default accountActivityTable
