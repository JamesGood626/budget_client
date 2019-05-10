import React from "react"
import styled from "styled-components"
import formatCurrency from "utils/currency"

const Container = styled.div`
  height: 22rem;
  overflow-y: scroll;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 35%);
  background: ${props => props.theme.white};
`

const Table = styled.table`
  width: 100%;
  overflow-y: scroll;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 8px;
  background: ${props => props.theme.white};
  color: ${props => props.theme.darkGreen};

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
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }

  tr {
    height: 3.4rem;
    border-bottom: 2px solid rgba(151, 151, 151, 0.16);
  }

  td {
    padding-left: 2.4rem;
  }

  @media screen and (max-width: 500px) {
    width: ${props => props.theme.smallWidth};

    th {
      font-size: ${props => props.theme.headerThreeSmall};
      padding: 1.1rem;
    }

    tr {
      font-size: ${props => props.theme.textSmall};
    }

    td {
      padding-left: 1.1rem;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 780px) {
    width: ${props => props.theme.mediumWidth};

    th {
      font-size: ${props => props.theme.headerThreeMedium};
    }

    tr {
      font-size: ${props => props.theme.textMedium};
    }
  }

  .green-text {
    color: ${props => props.theme.lightGreen};
  }

  .red-text {
    color: ${props => props.theme.red};
  }
`

const renderTableRows = data => {
  return data.map(({ category, type, amount, date }, i) => (
    <tr key={`${category}-${type}-${i}`}>
      <td>{type}</td>
      <td
        className={
          category === "DEPOSIT" ? "deposit green-text" : "expense red-text"
        }
      >
        {formatCurrency(amount)}
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
            <th>Type</th>
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
