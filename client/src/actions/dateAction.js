export const CHANGE_DATE = "CHANGE_DATE";

export const changeDate = date => ({
  type: CHANGE_DATE,
  payload: { date }
});
