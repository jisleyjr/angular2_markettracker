import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, ProductMaster } from '../_models/index';
import { ProductService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    products: ProductMaster[] = [];
    model: any = {};
    loading = false;

    constructor(private productService: ProductService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllProducts();
        //this.search();
    }

    clearList() {
        this.products = [];
    } 

    productClicked(id: number) {
        alert("Product Id: " + id);
    }

    search() {
        this.loading = true;
        //alert(this.model.productName);
        this.productService.getByName(this.model.productName)
            .subscribe(p => { 
                //alert(p[0].Name);
                this.loading = false;
                try {
                    this.products = p;
                    //for(var i = 0; i < p.length; i++) {
                    //    this.products.push(p[i]);
                    //}
                } catch(exc) {
                    alert(exc);
                } 
            });
    }

    loadAllProducts() {
        //alert('Hi');
        this.loading = true;
        this.productService.getAll().subscribe(p => { 
            this.loading = false;
            this.products = p; 
        });
    }
}