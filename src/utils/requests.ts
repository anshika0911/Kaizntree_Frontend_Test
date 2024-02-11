import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
  Employee,
} from "./types"
import mockData from "../mock-data.json"

import {fakeFetch} from "./fetch"


const TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }

  const start = page * TRANSACTIONS_PER_PAGE
  const end = start + TRANSACTIONS_PER_PAGE

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${page}`)
  }

  const nextPage = end < data.transactions.length ? page + 1 : null

  return {
    nextPage,
    data: data.transactions.slice(start, end),
  }
}


export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId && employeeId !== "") {
    throw new Error("Employee id cannot be empty")
  }

  if (!employeeId) {
    return data.transactions; // Return all transactions if employeeId is not provided
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)

}

export const setTransactionApproval = async ({ transactionId, value }: SetTransactionApprovalParams): Promise<void> => {
  try {
    await fakeFetch<void, SetTransactionApprovalParams>("setTransactionApproval", { transactionId, value });
    console.log("Transaction approval set successfully");
  } catch (error) {
    console.error("Error setting transaction approval:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
}

// export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {
//   const transactionIndex = data.transactions.findIndex(
//     (currentTransaction) => currentTransaction.id === transactionId
//   )

//   if (transactionIndex === -1) {
//     throw new Error("Invalid transaction to approve")
//   }

  // Update the 'approved' status of the transaction in the data source
  //data.transactions[transactionIndex].approved = value
//}

