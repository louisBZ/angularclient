import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MoveService } from '../service/move.service';
import { Move } from '../model/move';

@Component({
  selector: 'app-move-out-form',
  templateUrl: './move-out-form.component.html',
  styleUrls: ['./move-out-form.component.css'],
})
export class MoveOutFormComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private moveService: MoveService
  ) {}

  moveOutForm = this.fb.group({
    warehousLabel: ['Air Cargo CDG 1', Validators.required],
    warehousCode: ['CDGAF1', Validators.required],
    customsStatus: ['', Validators.required],
    ref: ['', Validators.required],
    refType: ['', Validators.required],
    customsDocType: ['', Validators.required],
    customsDocRef: ['', Validators.required],
    quantity: ['', Validators.required],
    weight: ['', Validators.required],
    totalQuantity: ['', Validators.required],
    totalWeight: ['', Validators.required],
    description: ['', Validators.required],
  });

  onSubmit() {
    if (this.moveOutForm.valid) {
      const moveOutFormRawValue = this.moveOutForm.getRawValue();
      if (
        moveOutFormRawValue.refType == 'AWB' &&
        moveOutFormRawValue.ref.toString().length != 11
      ) {
        alert('Une référence de type AWB doit comporter 11 chiffres');
      } else if (
        Number(moveOutFormRawValue.quantity) >
        Number(moveOutFormRawValue.totalQuantity)
      ) {
        alert('La quantité total doit être supérieur à la quantité');
      } else if (
        Number(moveOutFormRawValue.weight) >
        Number(moveOutFormRawValue.totalWeight)
      ) {
        alert('Le poids total doit être supérieur au poids');
      } else {
        const move: Move = {
          inOut: true,
          creationDate: new Date().toISOString(), //'yyyy-MM-ddTHH:mm:ss.SSSz'
          creationUser: 'Thomas',
          moveDate: undefined,
          warehousCode: moveOutFormRawValue.warehousCode,
          warehousLabel: moveOutFormRawValue.warehousLabel,
          customsStatus: moveOutFormRawValue.customsStatus,
          refType: moveOutFormRawValue.refType,
          ref: moveOutFormRawValue.ref,
          quantity: Number(moveOutFormRawValue.quantity),
          weight: Number(moveOutFormRawValue.weight),
          totalQuantity: Number(moveOutFormRawValue.totalQuantity),
          totalWeight: Number(moveOutFormRawValue.totalWeight),
          description: moveOutFormRawValue.description,
          declarationPlace: 'RapidCargo CDG',
          declarationPlaceCode: 'CDGRC1',
          customsDocType: moveOutFormRawValue.customsDocType,
          customsDocRef: moveOutFormRawValue.customsDocRef,
          msg: undefined,
          id: undefined,
        };
        this.moveService.save(move).subscribe((result) => {
          if (result.msg) {
            console.log(result.msg);
          } else {
            this.moveService.messageAdded.emit();
          }
        });
      }
    }
  }

  customsStatusList = ['T1', 'T2', 'X'];
  refTypes = ['AWB', 'B', 'C'];
  warehousCodes = ['CDGAF1', 'CDGAF2', 'CDGAF3'];
  customsDocTypes = ['X', 'Y', 'Z'];
}
