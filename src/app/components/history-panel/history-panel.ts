import { Component } from '@angular/core';
import { ReviewHistory } from '../../core/services/review-history';
import { DatePipe } from '@angular/common'; 
@Component({
  selector: 'app-history-panel',
  imports: [DatePipe],
  templateUrl: './history-panel.html',
  styleUrl: './history-panel.css',
})
export class HistoryPanel {
constructor(
  public reviewHistory:ReviewHistory
){}
myDate = new Date();
}
