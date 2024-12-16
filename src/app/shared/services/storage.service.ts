import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly PREFIX = 'kaleviok_';

  set(key: string, value: any): void {
    const prefixedKey = this.getPrefixedKey(key);
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(prefixedKey, serializedValue);
  }

  get<T>(key: string): T | null {
    const prefixedKey = this.getPrefixedKey(key);
    const value = localStorage.getItem(prefixedKey);
    return value ? (JSON.parse(value) as T) : null;
  }

  remove(key: string): void {
    const prefixedKey = this.getPrefixedKey(key);
    localStorage.removeItem(prefixedKey);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(this.PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  }

  private getPrefixedKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }
}
