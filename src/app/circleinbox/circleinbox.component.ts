import { Component } from '@angular/core';
import { CircleService } from '../services/circle.service';
import {Router} from '@angular/router';
import {ActivatedRoute,Params} from '@angular/router';
import {Circle} from '../model/Circle'; 
import {EditCircleComponent} from '../editcircle/editcircle.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import {DeleteCircleComponent} from '../deletecircle/deletecircle.component';

@Component({
  selector: 'circleinbox',
  templateUrl: './circleinbox.component.html',
  styleUrls: ['./circleinbox.component.css']
})
export class CircleInboxComponent {
  myinbox:any = [];
  circle:Circle;
  username: string;
  page = 0;
  circleName: string;

  constructor(
    private circleservice : CircleService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog: MdDialog){
  } 

  ngOnInit() {	
    this.route.params.switchMap((param:Params) => {
      this.circleName = param['circle'];
      return this.circleservice.getMailbox(param['circle'],this.page)})
    .subscribe((Circleinbox) => {
      this.myinbox = Circleinbox.reverse();
    });

    this.route.params.switchMap((param:Params) => 
      this.circleservice.getCircle(param['circle']))
    .subscribe((circle) => {
      this.circle = circle;
    });

    this.circleservice.circleMessages$.subscribe((data) => {
      this.myinbox.push(data);
    });

    this.username = localStorage.getItem('username');
  }

  openDialog() {
    this.dialog.open(EditCircleComponent, {
      'data': {
        'circle': this.circle
      }
    });
  }

  deleteCircle() {

    this.dialog.open(DeleteCircleComponent, {
      'data': {
        'circle': this.circle
      }
    });
  }

  getMailbox(page){
    this.page = page;
    this.circleservice.getMailbox(this.circleName,page)
    .subscribe((Circleinbox) => {
      this.myinbox = Circleinbox.reverse();
    });
  }

}


