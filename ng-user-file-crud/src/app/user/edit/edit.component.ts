import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActionService } from 'src/app/service/user-action.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  editForm: FormGroup;

  constructor(private userService: UserActionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.formEditGroup();

    this.route.params.subscribe((params) => {
      this.id = +params['id']; // Convert the id parameter to a number
      const user = this.userService.getUserById(this.id);

      if (user) {
        this.editForm.setValue({
          name: user.name,
          birthdate: user.birthdate,
          email: user.email,
          phone: user.phone,
          address: user.address,
        });
      }
    });
  }

  formEditGroup(): void {
    this.editForm = new FormGroup({
      name: this.nameFormGroup(),
      birthdate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  nameFormGroup(): FormGroup {
    return new FormGroup({
      first: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      last: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
    });
  }

  onEdit(): void {
    const updatedUser: any = {
      id: this.id,
      name: {
        first: this.editForm.value.name.first,
        last: this.editForm.value.name.last
      },
      birthdate: this.editForm.value.birthdate,
      email: this.editForm.value.email,
      phone: this.editForm.value.phone,
      address: this.editForm.value.address
    };

    this.userService.updateUser(this.id, updatedUser);
    this.router.navigate(['user/list']);
  }
  back(): void {
    this.router.navigate(['user/list']);
  }
}
