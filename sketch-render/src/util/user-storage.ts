import axios from 'axios';
import { LOGIN_ADDRESS } from '@/constants';
import { IUser } from '@/services/user';
const sessionKey = 'session-key';
const tokenKey = 'token-key';
export class UserStorage {
  static async getAccount(): Promise<IUser> {
    const token = window.localStorage.getItem(tokenKey);
    let account: IUser;
    if (token) {
      const sesseionAccout = window.sessionStorage.getItem(sessionKey);
      if (sesseionAccout) {
        account = JSON.parse(sesseionAccout);
      } else {
        const { data } = await axios.get<IUser>(`/api/user/user/info`, {
          headers: {
            authorization: token
          }
        });
        account = data;
      }
    } else {
      const  { data } = await axios.post<IUser>('/api/user/visitor/login', {
        phone: '13800138000',
        password: '123456'
      });
      
      account = data;
    }
    window.sessionStorage.setItem(sessionKey, JSON.stringify(account));
    return account;
  }

  static async getToken() {
    const account = await this.getAccount();
    return account ? account.token : '';
  }

  static setToken(token: string) {
    window.localStorage.setItem(tokenKey, token);
  }

  static logout() {
    window.localStorage.setItem(tokenKey, '');
    window.sessionStorage.setItem(sessionKey, '');
    window.location.assign(LOGIN_ADDRESS);
  }
}
