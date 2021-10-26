import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changeForm: FormGroup | any
  username:any
  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router, private toastr: ToastrService) {
    this.username = localStorage.getItem('email')?.slice(1, -1);
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.changeForm = this.fb.group({
      forGotPassword: [true],
      email: [this.username],
      tokenCode:[null, Validators.required],
      newPassword:[null, Validators.required],
      reNewPassword:[null, Validators.required],
    });
  }
  onSubmit(){

    this.authService.changePassword(this.changeForm.value).subscribe(()=>{
      this.router.navigateByUrl('auth/checkemail');
    })
    this.toastr.success('Bạn đã đổi mật khẩu thành công')
  }
}
