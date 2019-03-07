import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countdownEndSubscription: Subscription = null;
  private countdownSubcription: Subscription = null;
  public countdown:number = 0;

  get progress(){
    return ( this.init - this.countdown ) / this.init * 100;
  }


  constructor(public timer: TimerService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    this.countdownEndSubscription =  this.timer.countdownEnd$.subscribe(()=>{
      this.onComplete.emit();
    });

    this.countdownSubcription = this.timer.countdown$.subscribe( data =>{
       this.countdown = data;
       this.cdr.markForCheck();
    })

  }

  ngOnDestroy(){
      this.timer.destroy();
      this.countdownEndSubscription.unsubscribe();
      this.countdownSubcription.unsubscribe();
  }

}
