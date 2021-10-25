import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-insert-customer',
  templateUrl: './insert-customer.component.html',
  styleUrls: ['./insert-customer.component.css']
})
export class InsertCustomerComponent implements OnInit {
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  dataProvince: any
  dataDistrict: "" | any
  dataWard: "" | any
  insertCustomerForm: FormGroup | any;

  businessProductData = [
    { value: 'THU', name: 'Thư, hóa đơn, chứng từ' },
    { value: 'DC', name: 'Đồ Chơi' },
    { value: 'SACH', name: 'Sách, văn phòng phẩm' },
    { value: 'HNS', name: 'Hàng nông sản' },
    { value: 'TBDT', name: 'Thiết bị điện tử' },
    { value: 'TBNT', name: 'Thiết bị nội thất' },
    { value: 'TT', name: 'Thời trang' },
    { value: 'DP', name: 'Dược phẩm' },
    { value: 'PKTT', name: 'Phu kiện thời trang' },
    { value: 'OTO', name: 'Ô tô xe máy, phụ kiện' },
    { value: 'MP', name: 'Mỹ phẩm' },
    { value: 'HXT', name: 'Hàng xách tay' },
    { value: 'TBGD', name: 'Thiết bị gia dụng' },
    { value: 'K', name: 'Khác' },
  ];

  get businesFormArray() {
    return this.insertCustomerForm.get('customerClassification.businessProducts') as FormArray;
  }

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.getAllCity();
    this.createForm();
    this.addCheckboxes();


   }
  private addCheckboxes() {
    this.businessProductData.forEach(() => this.businesFormArray.push(this.fb.control(false)));
  }
  ngOnInit(): void {
  }





  createForm(){
    this.insertCustomerForm = this.fb.group({
      customerClassification: this.fb.group({
        customerType: ['', [Validators.required]],
        businessProducts: this.fb.array([
        ]),
      }),
      customerInformation: this.fb.group({
        nameOfStore: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],
        title:['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],
        contact:['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],
        phone:['', [Validators.required, Validators.pattern("[0-9]+")]],
        province:['', [Validators.required]],
        district:['', [Validators.required]],
        ward:['', [Validators.required]],
        address:['', [Validators.required, Validators.minLength(5)]],
      })
    })
  }










  getAllCity(){
    this.adminService.getProvince().subscribe(data=>{
      this.dataProvince = data;
    })
  }

  getAllDistrict(value:any){
    this.adminService.getDistrictById(value).subscribe(data=>{
      this.dataDistrict = data
      console.log(value);

    })
  }

  getAllWard(value:any){
    this.adminService.getWardById(value).subscribe(data=>{
      this.dataWard = data;
    })
  }

  insertCustomer(){


  console.log(this.insertCustomerForm.value);


  }
}
