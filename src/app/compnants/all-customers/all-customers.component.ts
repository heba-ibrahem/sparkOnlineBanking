import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModal } from 'src/app/modal/customer-modal';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {

  Customers:CustomerModal[]=[];
  AddCustomer:FormGroup;
  customer: CustomerModal;

  constructor(private customerService:CustomerServiceService , private route:Router, private fb:FormBuilder) {
    this.AddCustomer = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      balance: [0, Validators.required],
    })
    this.customer = {
      id:'',
      name: '',
      email: '',
      balance:0
    }
   }

  ngOnInit(): void {
    // get customer list
    this.customerService.getAllCustomers().subscribe(allcustomer =>{
      this.Customers = allcustomer.map(customer =>{
        return {
          id: customer.payload.doc.id,
          name:customer.payload.doc.data()['name'],
          email:customer.payload.doc.data()['email'],
          balance:customer.payload.doc.data()['balance']

        }
      })
    })
    
  }
  // navigate to customer details
  showCustomer(id:any){
    this.route.navigate(['/customer/'+id])
  }
  // add new customer
  Add(){
    // console.log(this.AddCustomer.value)
    let data = this.AddCustomer.value
    this.customerService.add(data)
    this.AddCustomer.reset()
  }

}
