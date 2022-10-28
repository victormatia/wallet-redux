export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});
