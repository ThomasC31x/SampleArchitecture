import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../Home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'collection',
        loadChildren: () => import('../Collection/collection.module').then(m => m.CollectionPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../News/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
