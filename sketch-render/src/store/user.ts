import { CrateAction } from "./reducers";

export type IUser = { name: string}
export function user(
  state = null,
  action: { type: UserType, payload:IUser }
): any {
  switch (action.type) {
    case UserType.USER_SET_STATE : 
    return action.payload;
    default:
      return state
  }
}

export enum UserType {
  USER_SET_STATE = 'USER_SET_STATE'
}

export type UserAction = 
  CrateAction<UserType.USER_SET_STATE, IUser>
