import { Component, Input, Output, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnChanges{

  @Input() time:number = null;
  public minutos:string = "00";
  public segundos:string = "00"
  constructor() { }

  ngOnChanges(changes){
    if(changes.time){
      const minutos = Math.trunc(changes.time.currentValue / 60);
      const segundos = changes.time.currentValue - minutos*60;

      this.minutos = ("0" + minutos).substr(-2);
      this.segundos = ("0" + segundos).substr(-2);
    }
  }

}
