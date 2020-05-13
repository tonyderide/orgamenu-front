import { Injectable }  from '@angular/core';
import {DataService} from "./shared/services/data.service";

@Injectable()
export class AppInitService {

  constructor(private data: DataService) {
  }

  Init() {
    console.log('Bienvenu sur Orgamenu')
    this.data.deleteCalendrierInit().subscribe()
    console.log('initialisation des dates')
    // return new Promise<void>((resolve, reject) => {
    //
    // });
  }
}

