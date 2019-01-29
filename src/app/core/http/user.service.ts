import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManagement } from '../../shared/models/user';
import { Utils } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<UserManagement[]> {
        const currentAccountId = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
        return this.http.get<JSON[]>(
            environment.apiUrl + 'accounts/' + currentAccountId + '/users',
            { headers: Utils.createAuthorizationHeader() }
        ).pipe(map((usersJSON) => {
            const users = new Array<UserManagement>();
            usersJSON.forEach(element => {
                const user = new UserManagement();
                user.id = element['id'];
                user.firstName = element['firstname'];
                user.lastName = element['lastname'];
                user.username = element['username__c'];
                user.description = element['description'];
                user.master = element['master__c'];
                user.sendInvoices = element['send_invoice__c'];
                user.inactive = element['inactive__c'];
                users.push(user);
            });
            return users;
        }), catchError((error) => {
            throw error;
        }));
    }

    putUser(user: UserManagement): Observable<JSON> {
        const currentAccountId = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
        return this.http.put<JSON>(
            environment.apiUrl + 'accounts/' + currentAccountId + '/users/' + user.id,
            {
                id: user.id, username__c: user.username, firstname: user.firstName, lastname: user.lastName,
                description: user.description, master__c: user.master, inactive__c: user.inactive, send_invoice__c: user.sendInvoices
            },
            { headers: Utils.createAuthorizationHeader() }
        ).pipe(catchError((error) => {
            throw error;
        }));
    }

    postUser(user: UserManagement): Observable<JSON> {
        const currentAccountId = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
        return this.http.post<JSON>(
            environment.apiUrl + 'accounts/' + currentAccountId + '/users',
            {
                id: user.id, username__c: user.username, firstname: user.firstName, lastname: user.lastName,
                description: user.description, master__c: user.master, inactive__c: user.inactive, send_invoice__c: user.sendInvoices
            },
            { headers: Utils.createAuthorizationHeader() }
        ).pipe(catchError((error) => {
            throw error;
        }));
    }

    deleteUser(user: UserManagement): Observable<JSON> {
        const currentAccountId = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
        return this.http.delete<JSON>(
            environment.apiUrl + 'accounts/' + currentAccountId + '/users/' + user.id,
            { headers: Utils.createAuthorizationHeader() }
        ).pipe(catchError((error) => {
            throw error;
        }));
    }
}
