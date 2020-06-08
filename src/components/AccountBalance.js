import React from "react";

export default function AccountBalance(props) {
  return (
    <div>
      <h5 style={{ color: "purple" }}>
        Balance: ${props.accountBalance.toFixed(2)}
      </h5>
    </div>
  );
}
