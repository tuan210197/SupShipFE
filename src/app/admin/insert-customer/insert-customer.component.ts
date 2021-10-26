import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  selectedIndustryValues:String[] = [];
  industryError: Boolean = true;
  bodyApi: any;

  industryData = [
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

  get industryFormArray() {
    return this.insertCustomerForm.get('industry') as FormArray;
  }
  get addressArray() {
    return this.insertCustomerForm.get('address') as FormArray;
  }
  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService) {
    this.getAllCity();
    this.createForm();
    this.addIndustrysControls();
   }


  private addIndustrysControls() {
    this.industryData.forEach(() => this.industryFormArray.push(this.fb.control(false)));
  }
  ngOnInit(): void {
  }





  createForm(){
    this.insertCustomerForm = this.fb.group({
        title:['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],
        companyName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],//
        fullName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],//
        representation: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]], // người giới thiệu
        phone:['', [Validators.required, Validators.pattern("[0-9]+")]],//
        quantityMonth:['', [Validators.required]],//
        inProvincePrice: ['', [Validators.required]],
        outProvincePrice: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        expectedRevenue: ['', [Validators.required]],
        quality:['', [Validators.required]],
        compensation:['', [Validators.required]],
        payment:['', [Validators.required]],
        other:['', [Validators.required]],
        leadSource:['', [Validators.required]], //
        address: this.fb.array([this.addAddressGroup()]),//
        industry: this.fb.array([]), //
    })

  }

  addAddressGroup() {
    return this.fb.group({
      ward:['', [Validators.required]],
      district:['', [Validators.required]],
      province:['', [Validators.required]],
      homeNo:['', [Validators.required, Validators.minLength(5)]],
    });
  }


  getSelectedIndustryValue() {
    this.selectedIndustryValues = [];
    this.industryFormArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedIndustryValues.push(this.industryData[i].value);
      }

    });
    this.industryError =  this.selectedIndustryValues.length > 0 ? false : true;
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
  this.bodyApi= this.insertCustomerForm.value;
  this.bodyApi.industry=this.selectedIndustryValues;
  console.log(this.bodyApi);
  this.insertCustomerForm.reset();
  this.adminService.insertCustomer(this.bodyApi).subscribe(data=>{
    console.log(data);
    this.toastr.success("Tạo mới thành công");
  })
  }
}
