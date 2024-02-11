import { useState } from "react";
import { InputCheckbox } from "../InputCheckbox";
import { TransactionPaneComponent } from "./types";

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  const [approved, setApproved] = useState(transaction.approved);

  const handleApprovalChange = async (newValue: boolean) => {
    try {
      await consumerSetTransactionApproval({
        transactionId: transaction.id,
        newValue,
      });
      setApproved(newValue); // Update the local state of approved status
    } catch (error) {
      console.error("Error setting transaction approval:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="KaizntreePane">
      <div className="KaizntreePane--content">
        <p className="KaizntreeText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="KaizntreeText--hushed KaizntreeText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={handleApprovalChange}
      />
    </div>
  );
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
