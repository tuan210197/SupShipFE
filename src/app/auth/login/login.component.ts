import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginModel } from './model/login-model';
import { VertifyEmail } from './model/vertify-email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any
  loginModel: LoginModel | any;
  vertifyEmail: VertifyEmail | any;
  messsage: any
  username:any
  isCheck:any
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.isCheck = this.authService.getCheck();
    this.username = localStorage.getItem('email')?.slice(1, -1);
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: [this.username, Validators.required],
      password:[null, Validators.required],
      tokenCode:[null, Validators.required],
    });
  }
  login(){
    this.loginModel={
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.vertifyEmail = {
      email: this.loginForm.get('email').value,
      tokenCode: this.loginForm.get('tokenCode').value
    }

    if(this.isCheck == 'true'){
      this.authService.login(this.loginModel).subscribe(()=>{
        const isLogin:any = this.authService.getLogin();
        if(isLogin == 'true'){
          this.messsage = "Dang nhap thanh cong";
        }else{
          this.messsage ="Dang nhap that bai";
        }
      })
    }else{
      this.authService.vertifyEmail(this.vertifyEmail).subscribe(()=>{
        const isVertify:any = this.authService.getVertify();
        if(isVertify == 'true'){
          this.authService.login(this.loginModel).subscribe(()=>{
            const isLogin:any = this.authService.getLogin();
            if(isLogin == 'true'){
              this.messsage = "Dang nhap thanh cong";
            }else{
              this.messsage ="Dang nhap that bai";
            }
          })
        }else{
          this.messsage = "TokenCode sai";
        }
      }
      )
    }
    }


  }

