import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HighchartService {
  private rateCollection: AngularFirestoreCollection < chartModal > ;
  rates$: Observable < chartModal[] > ;
  constructor(private readonly fireStoreService: AngularFirestore) {
    this.rateCollection = fireStoreService.collection < chartModal > ('ChartData');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.rates$ = this.rateCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as chartModal;
        const id = a.payload.doc.id;
        return {
          id,
          ...data
        };
      }))
    );
  }
}
export interface chartModal {
  currency: string,
    rate: number
}
