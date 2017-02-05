import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Request, RequestMethod } from '@angular/http';
import * as Globals from '../globals';
import { User, ProductMaster } from '../_models/index';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(Globals.baseUrl + '/api/products', this.jwt()).map((response: Response) => response.json());
    }

    getByName(name: string) {
        //return this.http.get(Globals.baseUrl + '/api/products/' + name, this.jwt()).map((response: Response) => response.json());
        let body = JSON.stringify({ Name: name });
        /*
        let headers = new Headers({ 'content-type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: Globals.baseUrl + '/api/products/search',
            headers: headers,
            body: body
        });

         return this.http.request(new Request(requestoptions))
            .map((response: Response) => response.json());
        */
        return this.http.post(Globals.baseUrl + '/api/products/search', body, this.jwtPost()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'sessionkey': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    private jwtPost() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 
                'sessionkey': currentUser.token,
                'content-type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}