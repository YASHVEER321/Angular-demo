import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'
import { AppComponent } from './app.component';
import { AppComponent2 } from './app.component2';
const appRoutes: Routes = [
  { path: 'home',  component:AppComponent },
  { path: 'about',  component:AppComponent2 },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes)
