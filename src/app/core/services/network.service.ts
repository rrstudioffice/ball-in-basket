import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

import { OverlayService } from './overlay.service';
const { Network } = Plugins;

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Online);
  onDevice: boolean;

  constructor(private overlay: OverlayService) { }

  initializeNetworkEvents() {
    Network.getStatus().then((status) => {
      if (status) {
        this.updateNetworkStatus(ConnectionStatus.Online);
      } else {
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    this.overlay.toast({ message: `Você está ${connection}` });
  }
}
