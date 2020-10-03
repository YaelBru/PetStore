import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetStoreComponent } from './pet-store.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
    {
        path: '', component: PetStoreComponent, children: [
            { path: '', component: ItemListComponent },
            { path: 'items/:itemId', component: ItemDetailsComponent },
            { path: 'shopping-cart', component: CartComponent },
            { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
            { path: 'user', canActivate: [AuthGuard], component: UserComponent }
        ]
    },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetStoreRoutingModule { }