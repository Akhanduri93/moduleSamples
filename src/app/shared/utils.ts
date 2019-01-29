import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class Utils {

  public static getInfoStorage(data: string) {
    if (localStorage.getItem(data)) {
      return localStorage.getItem(data);
    } else if (sessionStorage.getItem(data)) {
      return sessionStorage.getItem(data);
    }
    return null;
  }

  public static setInfoStorage(data: string, object) {
    if (localStorage.getItem(data)) {
      return localStorage.setItem(data, object);
    } else if (sessionStorage.getItem(data)) {
      return sessionStorage.setItem(data, object);
    }
    return null;
  }

  public static createAuthorizationHeader(): HttpHeaders {
    const token = Utils.getInfoStorage('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return headers;
  }

  public static getPartnerPortalUrl(): string {
    const user = JSON.parse(Utils.getInfoStorage('user'));
    const currentAccount = JSON.parse(Utils.getInfoStorage('currentAccount'));
    const token = Utils.getInfoStorage('token');
    const remember = Utils.getInfoStorage('remember');

    return environment.partnerPortalUrl +
      '?extid=' + user.extId + '&token=' + token + '&acc=' + currentAccount.id + '&remember=' + remember;
  }
}
