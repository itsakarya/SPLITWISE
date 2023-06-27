const filterTransactions = (targetUser) => {
  return (transaction) => {
    return (
      transaction?.Paidby[0] === targetUser.name ||
      transaction?.PaidFor.find((user) => user === targetUser.name)
    );
  };
};
export { filterTransactions };
