import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language-service';
@Component({
  selector: 'app-language-selector',
  imports: [FormsModule],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
})
export class LanguageSelector {
  selectLangauges: string = '';
  constructor(public _languageSelect: LanguageService) {}
  selectLangauge() {
    this._languageSelect.setLanguage(this.selectLangauges);
  }
}
