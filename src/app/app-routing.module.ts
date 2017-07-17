import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CircleInboxComponent } from './circleinbox/circleinbox.component';
import { UserDashboardComponent } from './userdashboard/userdashboard.component';
import { CreateCircle } from './createcircle/createcircle.component';

import { PostComponent} from './post/post.component';
import { ChatBoxComponent } from './chatbox/chatbox.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavBarHomeComponent } from './nav-bar-home/nav-bar-home.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SearchComponent } from './search/search.component';

import { CanActivateViaAuthGuard } from './services/auth-guard.service';

const routes : Routes = [
{ path:'', pathMatch:"full", redirectTo: 'gupshup' },
{ path:'landingpage', component: LandingPageComponent, canActivate: [CanActivateViaAuthGuard], children: [
{ path:'', pathMatch:"full", redirectTo: "userdashboard"},
{ path:'userdashboard', component: UserDashboardComponent, children: [
{ path:'circleinbox/:circle',component: CircleInboxComponent },
{ path:'search', component: SearchComponent }
]},
{ path:'userprofile',component: UserProfileComponent },
{ path:'userprofile/:username', component: UserProfileComponent },
{ path:'updateprofile', component: UpdateProfileComponent }
]},

{ path:'gupshup', component: NavBarHomeComponent }, 
{ path: 'home', component: HomeContentComponent },
{ path: 'register', component: RegisterComponent },

{ path:'circlememberinbox/:member',component: ChatBoxComponent },
{ path:'createcircle',component: CreateCircle}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})
export class AppRoutingModule{}

