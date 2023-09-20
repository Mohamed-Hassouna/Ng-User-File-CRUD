import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserActionService } from 'src/app/service/user-action.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  constructor(private actionDef: UserActionService) { }

  userData: User[] = [];

  ngOnInit(): void {
    this.userData = this.actionDef.getUsers();
  }
  onDelete(user: User): void {
    this.actionDef.removeUser(user);
  }

}
