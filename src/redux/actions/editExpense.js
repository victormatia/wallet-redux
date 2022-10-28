export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT = 'SAVE_EDIT';

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const saveEdit = (expense, id) => ({
  type: SAVE_EDIT,
  expense,
  id,
});
