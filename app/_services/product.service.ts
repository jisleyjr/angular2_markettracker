import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as Globals from '../globals';
import { User, ProductMaster } from '../_models/index';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(Globals.baseUrl + '/api/products', this.jwt()).map((response: Response) => response.json());
    }

    getByName(name: string) {
        return this.http.get(Globals.baseUrl + '/api/products/' + name, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 
                'sessionkey': currentUser.token });//, 
                //'content-type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}