// Utilities and other very recurring fuctions
import { ActionType } from 'redux-promise-middleware';
//Converters form action type to action types of redux-promise-action-middleware

export const fulfiledType = (type) => `${type}_${ActionType.Fulfilled}`
export const pendingType = (type) => `${type}_${ActionType.Pending}`
export const rejectedType = (type) => `${type}_${ActionType.Rejected}`