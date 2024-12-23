import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  setDefaultLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang).subscribe();
  }

  getTranslation(key: string | string[], params?: object): Observable<string | Record<string, string>> {
    return this.translate.get(key, params);
  }

  getInstantTranslation(key: string | string[], params?: object): string | Record<string, string> {
    return this.translate.instant(key, params);
  }

  getTranslationStream(key: string | string[], params?: object): Observable<string | Record<string, string>> {
    return this.translate.stream(key, params);
  }

  getBrowserLanguage(): string | undefined {
    return this.translate.getBrowserLang();
  }

  addLanguages(langs: string[]): void {
    this.translate.addLangs(langs);
  }

  getAvailableLanguages(): string[] {
    return this.translate.getLangs();
  }
}
