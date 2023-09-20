import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserActionService } from 'src/app/service/user-action.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;

  constructor(private userService: UserActionService, private router: Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      id: new FormControl,
      name: this.nameFormGroup(),
      birthdate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    })
  }

  nameFormGroup(): FormGroup {
    return new FormGroup({
      first: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      last: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
    })
  }
  onAdd(): void {
    if (this.addForm.valid) {
      const userFormData = this.addForm.value;
      this.userService.addUser(userFormData);
      this.router.navigate(['user/list']);
    }
  }
  back(): void {
    this.router.navigate(['user/list']);
  }

}
