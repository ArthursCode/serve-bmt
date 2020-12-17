import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  /**
   * get item by name from local storage
   */
  public get(name) {
    const data = localStorage.getItem(name);
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  /**
   * remove by name from local storage
   */
  public remove(name) {
    localStorage.removeItem(name);
  }

  /**
   * set item in local storage
   */
  public set(name, data) {
    const _DATA = JSON.stringify(data);
    this.remove(name);
    localStorage.setItem(name, _DATA);
  }
}
