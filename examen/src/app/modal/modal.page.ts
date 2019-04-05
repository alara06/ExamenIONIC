import { Component, OnInit , Input} from '@angular/core';
import { DatosX } from '../interfaz/datos.interface';
import { AngularFirestore} from 'angularfire2/firestore';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  
  @Input() datoS : DatosX;

  constructor(private fire:AngularFirestore) {
 
  }
 ngOnInit() {
   
 }


 Save(){
  let idDoc = this.fire.createId();
  console.log(idDoc);
  this.fire.doc("/datosX/"+ idDoc)
  .set(this.datoS);
}


}

