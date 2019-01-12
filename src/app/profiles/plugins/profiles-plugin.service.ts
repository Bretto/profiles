import {ComponentFactoryResolver, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilesPluginService {

  entriesComponent: { Component };
  resolver: ComponentFactoryResolver;

  constructor() { }
}
