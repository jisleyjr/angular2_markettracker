import { Injectable } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/user';
import * as Globals from '../globals';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        let body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'content-type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: Globals.baseUrl + '/api/authenticate',
            headers: headers,
            body: JSON.stringify({ username: username, password: password })
        })

//alert(Globals.baseUrl + '/api/authenticate');
        //return this.http.post(Globals.baseUrl + '/api/authenticate', body, { headers: headers })
        return this.http.request(new Request(requestoptions))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if(response.ok) {
                    //var jsn = response.json();
                    //alert(response.json());// toString());
                    //alert(response.text);
                    let user = new User();
                    user.token = response.json();
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                    alert(response.statusText);
                }
                //let user = response. json();
                //if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                //    localStorage.setItem('currentUser', JSON.stringify(user));
                //}
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}