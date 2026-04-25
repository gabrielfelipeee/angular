import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, of } from "rxjs";
import { ProductsService } from "../services/products.service";
import { Product } from "../interfaces/product.interface";

export const getProductResolver: ResolveFn<Product | null> = (route: ActivatedRouteSnapshot) => {
    const productService = inject(ProductsService);

    return productService.getById(route.params["id"]).pipe(
        catchError((error) => {
            console.error("Erro ao carregar produto:", error);

            return of(null);
        })
    );
};
