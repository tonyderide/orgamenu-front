import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange, MediaObserver} from "@angular/flex-layout";

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title='Orgamenu';
  mediaSub:Subscription;
  private indexFirstPriorityMedia: number=0;
  public deviceXs: boolean;
  public deviceSm: boolean;
  public deviceMd: boolean;
  public deviceLg: boolean;
  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((result)=>{
      console.log(result[this.indexFirstPriorityMedia].mqAlias);
      this.deviceXs= result[this.indexFirstPriorityMedia].mqAlias==='xs' ? true :false;
      this.deviceSm= result[this.indexFirstPriorityMedia].mqAlias==='xs' ? true :false;
      this.deviceMd= result[this.indexFirstPriorityMedia].mqAlias==='xs' ? true :false;
      this.deviceLg= result[this.indexFirstPriorityMedia].mqAlias==='xs' ? true :false;
    })
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
