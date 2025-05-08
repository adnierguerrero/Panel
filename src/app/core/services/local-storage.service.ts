import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly PREFIX = 'real-estate-dashboard_';

  constructor() { }

  /**
   * Saves data to the local storage with prefix
   */
  set(key: string, value: any): void {
    try {
      const prefixedKey = this.PREFIX + key;
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(prefixedKey, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  /**
   * Gets data from the local storage using key with prefix
   */
  get<T>(key: string, defaultValue: T = null as any): T {
    try {
      const prefixedKey = this.PREFIX + key;
      const value = localStorage.getItem(prefixedKey);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return defaultValue;
    }
  }

  /**
   * Removes data from the local storage using key with prefix
   */
  remove(key: string): void {
    try {
      const prefixedKey = this.PREFIX + key;
      localStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }

  /**
   * Clears all data for this application from local storage
   */
  clear(): void {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.PREFIX))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
