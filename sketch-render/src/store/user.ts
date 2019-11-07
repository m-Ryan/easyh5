export type IUser = { name: string}
export function user(
  state = null,
  action: { type: UserType, payload:IUser }
): any {
  switch (action.type) {
    case UserType.SET_STATE : 
    return action.payload;
    default:
      return state
  }
}

export enum UserType {
  SET_STATE = 'SET_STATE'
}

export type UserTypeMap = {
  [UserType.SET_STATE]: IUser
}
