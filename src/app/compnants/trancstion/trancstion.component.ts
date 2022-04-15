import { Component, OnInit } from '@angular/core';
import { ITransctions } from 'src/app/modal/itransctions';
import { CustomerServiceService } from 'src/app/service/customer-service.service';


@Component({
  selector: 'app-trancstion',
  templateUrl: './trancstion.component.html',
  styleUrls: ['./trancstion.component.scss']
})
export class TrancstionComponent implements OnInit {

  transctions: ITransctions[]=[]
  constructor( private customerService:CustomerServiceService) { }

  ngOnInit(): void {
    this.customerService.getAllTransctions().subscribe(data =>{
      this.transctions = data.map(trans =>{
        return {
          id: trans.payload.doc.id,
          amount:trans.payload.doc.data()['amount'],
          from:trans.payload.doc.data()['from'],
          to:trans.payload.doc.data()['to'],
          transDate: trans.payload.doc.data()['transDate']

        }
      })
      console.log(this.transctions)

    })
  }

}
