
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { BannerComponent } from './components/banner/banner.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { SuscriptorsComponent } from './components/suscriptors/suscriptors.component';
import { IdentifyGuard } from './guards/identify.guard';
import { UserGuard } from './guards/user.guard';



const routes: Routes = [
  { path: 'login', canActivate: [IdentifyGuard], component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin', canActivate: [UserGuard], component: AdminComponent },
  { path: 'category', canActivate: [UserGuard], component: CategoryComponent },
  { path: 'brand', canActivate: [UserGuard], component: BrandComponent },
  { path: 'suscriptors', canActivate: [UserGuard], component: SuscriptorsComponent },
  { path: 'banner', canActivate: [UserGuard], component: BannerComponent },
  { path: 'product', canActivate: [UserGuard], component: ProductComponent },
  { path: 'home', canActivate: [UserGuard], component: HomeadminComponent },
  { path: '**', canActivate: [UserGuard], component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
