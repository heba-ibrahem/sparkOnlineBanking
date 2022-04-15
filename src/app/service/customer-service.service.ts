import { Injectable } from '@angular/core';
import { CustomerModal } from '../modal/customer-modal';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITransctions } from '../modal/itransctions';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  customerCollection:AngularFirestoreCollection<CustomerModal>

  constructor(private firestore:AngularFirestore , private route:Router) { 

  this.customerCollection = this.firestore.collection("customers")
  }

  getAllCustomers() {
    return this.customerCollection.snapshotChanges();
  }
  add(data: CustomerModal) {
    return this.customerCollection.add(data);
  }
  update(data: CustomerModal){
    this.customerCollection.doc(data.id).update({
      id:data.id,
      name:data.name,
      email:data.email,
      balance:Number(data.balance),
    })
  }


  getAllTransctions() {
    return this.firestore.collection<ITransctions>('tranction').snapshotChanges();
  }

  transfer(data: ITransctions) {
    return this.firestore.collection('tranction').add(data).then(()=>{
      alert(`Transction from ${data.from} to ${data.to} by ${data.amount} EGP at ${data.transDate} is Succssfully Done`)
    })
  }

  
}
