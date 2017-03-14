import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'
import { AppComponent } from './app.component';
import { AppComponent2 } from './app.component2';
import { homeComponent } from './app.component3';
const appRoutes: Routes = [
  { path: 'about',  component:AppComponent2 },
  { path: 'home',  component:homeComponent },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes)
