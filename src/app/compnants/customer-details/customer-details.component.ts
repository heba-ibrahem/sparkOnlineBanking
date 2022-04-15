import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerModal } from 'src/app/modal/customer-modal';
import { ITransctions } from 'src/app/modal/itransctions';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  keyParams!: string;
  Customers: CustomerModal[] = [];
  item: CustomerModal = {} as CustomerModal;
  toItem: CustomerModal = {} as CustomerModal;
  fromItem: CustomerModal = {} as CustomerModal;
  AddTrans: FormGroup;
  trans: ITransctions;
  date: Date;

  fromName: any;

  constructor(private activatedRout: ActivatedRoute, private firestore: AngularFirestore, private customerService: CustomerServiceService, private fb: FormBuilder) {
    // query to get customer by id 
    this.activatedRout.params.subscribe(query => {
      console.log(query)
      return this.keyParams = query.id
    })

    this.AddTrans = this.fb.group({
      transDate: ['',],
      to: ['', Validators.required],
      amount: [0, Validators.required],
    })
    this.trans = {
      // id:'',
      from: '',
      to: '',
      transDate: new Date().toString(),
      amount: 0
    }
    this.date = new Date()
  }

  ngOnInit(): void {
    // get customer list to show on dropdown
    this.customerService.getAllCustomers().subscribe(allcustomer => {
      this.Customers = allcustomer.map(customer => {
        return {
          id: customer.payload.doc.id,
          name: customer.payload.doc.data()['name'],
          email: customer.payload.doc.data()['email'],
          balance: customer.payload.doc.data()['balance']

        }
      })
    })

    // get customer details by id
    this.firestore.collection('customers').doc(this.keyParams).snapshotChanges().subscribe(

      res => {
        let id = res.payload.id
        this.item = { ...res.payload.data() as CustomerModal, id };
      },
      err => {
        console.debug(err);
      }
    )
  }
  getData() {
    let toId = this.AddTrans.get('to')?.value;
    // get the customer id that we send money to 

    this.firestore.collection('customers').doc(toId).snapshotChanges().subscribe(
      res => {
        let id = res.payload.id
        this.toItem = { ...res.payload.data() as CustomerModal, id };
      },
      err => {
        console.debug(err);
      }
    )
  }

  Transfer() {
    let amount = this.AddTrans.get('amount')?.value
    console.log("before", this.toItem.balance)
    // check blance and id  
    if (this.item.id == this.toItem.id) {
      alert("Select another account")
    } else if (this.item.balance <= amount) {
      alert("not enough balance")
    } else {
      this.toItem.balance = Number(this.toItem.balance + amount);
      this.item.balance = Number(this.item.balance - amount);
      // save transction hisotry
      let data = { 'amount': this.AddTrans.get('amount')?.value, 'from': this.item.name, 'to': this.toItem.name ,'transDate': this.date.toString() }
      this.customerService.transfer(data)
    }
    // send data to service
    this.customerService.update(this.toItem);
    this.customerService.update(this.item);
    // cleat form
    this.AddTrans.reset()
  }

}
