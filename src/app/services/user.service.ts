import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { SocketService } from '../services/socket.service'
import { User } from '../model/User';

@Injectable()
export class UserService {

	LogInStatus: boolean = true;
	
	constructor(
		private http: Http,
		private router: Router,
		private socketService: SocketService){}

	isLoggedIn() {
		if(localStorage.getItem('username') != null)
			this.LogInStatus = true;
		else
			this.LogInStatus = false;
		return this.LogInStatus;
	}

	create(user: User) {
		console.log(user);

		return this.http.post('http://172.23.238.204:8080/userservice/user', user)
		.map((response: Response) => {
			console.log(response.json());
			return response.json();
		});
	}

	login(username: string, password: string) {
		var basicHeader = btoa('gupshup:stackroute');

		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Authorization', 'Basic ' + basicHeader);
		let options = new RequestOptions({headers: headers});
		
		let body = "username="+username+"&password="+encodeURIComponent(password)+"&grant_type=password&"+
		"client_secret=stackroute&client_id=gupshup";

		this.http.post('http://172.23.238.203:9000/oauth/token', body, options)
		.subscribe(data => {
			console.log(data);
			localStorage.setItem('username', username);
			localStorage.setItem('access_token', data.json().access_token);
			localStorage.setItem('refresh_token', data.json().refresh_token);
			this.router.navigate(['landingpage/userdashboard']);
		}, error => {
			this.router.navigate(['/gupshup']);
		});
	}

	logout() {
		this.socketService.logoutNotify();
		localStorage.removeItem('username');
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.clear();
		this.router.navigate(['/gupshup']);
	}	
}

