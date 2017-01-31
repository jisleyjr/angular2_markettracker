import { Component, OnInit } from '@angular/core';

import { User, ProductMaster } from '../_models/index';
import { ProductService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    products: ProductMaster[] = [];

    constructor(private productService: ProductService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllProducts();
    }

    //deleteUser(id: number) {
    //    this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    //}

    private loadAllProducts() {
        this.productService.getAll().subscribe(p => { this.products = p; });
    }
}