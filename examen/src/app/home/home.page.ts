import { Component } from '@angular/core';

import { AngularFirestore} from 'angularfire2/firestore';
import { HttpClient } from "@angular/common/http";

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DatosX } from '../interfaz/datos.interface';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name:string;
  strPalabra:string  = "";


  constructor( private fire:AngularFirestore, private http: HttpClient ,
    public modalController: ModalController ){
    

  }

  async presentModal( index : number) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { 
        datoS : this.datos[index]  }
        });
    return await modal.present();
  }



datoS : DatosX;

  datos : DatosX[] = [];
  res = [];
  Consultar(){
    this.http.
    get("https://api.github.com/search/repositories?q="+ this.strPalabra+"+language:assembly&sort=stars&order=desc")
    .subscribe(data =>{
      
      for (var x in data){
        data.hasOwnProperty(x) && this.res.push(data[x])
      }
      
      ;});
    //this.resultados = data;});
   console.log(this.res[2]);
    var contador = 0;
    for (var x in this.res[2]){

     // console.log(this.res[2][x].owner.avatar_url);


      this.datos.push({
        name: this.res[2][x].name, 
        owner: this.res[2][x].owner,
        html_url: this.res[2][x].html_url,
        login: this.res[2][x].owner.login,
        urlavatar: this.res[2][x].owner.url_avatar,
        description: this.res[2][x].description});
     
      contador++;
      if(contador > 15) break;
      }

  }



}



/*archive_url: "https://api.github.com/repos/Microsoft/MS-DOS/{archive_format}{/ref}"
archived: false
assignees_url: "https://api.github.com/repos/Microsoft/MS-DOS/assignees{/user}"
blobs_url: "https://api.github.com/repos/Microsoft/MS-DOS/git/blobs{/sha}"
branches_url: "https://api.github.com/repos/Microsoft/MS-DOS/branches{/branch}"
clone_url: "https://github.com/Microsoft/MS-DOS.git"
collaborators_url: "https://api.github.com/repos/Microsoft/MS-DOS/collaborators{/collaborator}"
comments_url: "https://api.github.com/repos/Microsoft/MS-DOS/comments{/number}"
commits_url: "https://api.github.com/repos/Microsoft/MS-DOS/commits{/sha}"
compare_url: "https://api.github.com/repos/Microsoft/MS-DOS/compare/{base}...{head}"
contents_url: "https://api.github.com/repos/Microsoft/MS-DOS/contents/{+path}"
contributors_url: "https://api.github.com/repos/Microsoft/MS-DOS/contributors"
created_at: "2018-06-25T18:26:02Z"
default_branch: "master"
name: "MS-DOS"
node_id: "MDEwOlJlcG9zaXRvcnkxMzg2MzQyOTg="

*/