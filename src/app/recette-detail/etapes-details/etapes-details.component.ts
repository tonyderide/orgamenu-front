import {Component, Input, OnInit} from '@angular/core';
import {Etapes} from '../../models/etapes';

@Component({
  selector: 'app-etapes-details',
  templateUrl: './etapes-details.component.html',
  styleUrls: ['./etapes-details.component.scss']
})
export class EtapesDetailsComponent implements OnInit {
  @Input("etapes") etapes: Etapes[];
  constructor() { }

  ngOnInit(): void {
  }

}
