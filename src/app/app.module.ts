import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { BannerComponent } from './components/banner/banner.component';
import { AddBannerComponent } from './components/add-banner/add-banner.component';
import { BrandComponent } from './components/brand/brand.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';

// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type' ;
import * as FilePondPreview from 'filepond-plugin-image-preview'
import * as FilePondPoster from 'filepond-plugin-file-poster'
import { UserGuard } from './guards/user.guard';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
registerPlugin(FilePondPluginFileValidateType, /* FilePondPreview, */ FilePondPoster);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BannerComponent,
    AddBannerComponent,
    BrandComponent,
    AddBrandComponent,
    AddProductComponent,
    ProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    AdminComponent,
    HomeadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxFontAwesomeModule,
    FilePondModule 
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
