import { inject } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { catchError, of } from "rxjs";
import { ResolveFn } from "@angular/router";
import { Product } from "../interfaces/product.interface";

export const getProductsResolver: ResolveFn<Product[]> = () => {
    const productService = inject(ProductsService);

    return productService.getAll()
        .pipe(
            catchError((error) => {
                console.error("Erro ao carregar produtos:", error);
                
                return of([] as Product[]);
            })
        );
};
