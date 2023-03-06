import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MoveService } from '../service/move.service';
import { Move } from '../model/move';

@Component({
  selector: 'app-move-in-form',
  templateUrl: './move-in-form.component.html',
  styleUrls: ['./move-in-form.component.css'],
})
export class MoveInFormComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private moveService: MoveService
  ) {}

  moveInForm = this.fb.group({
    warehousLabel: ['Air Cargo CDG 1', Validators.required],
    warehousCode: ['CDGAF1', Validators.required],
    customsStatus: ['', Validators.required],
    ref: ['', Validators.required],
    refType: ['', Validators.required],
    quantity: ['', Validators.required],
    weight: ['', Validators.required],
    totalQuantity: ['', Validators.required],
    totalWeight: ['', Validators.required],
    description: ['', Validators.required],
  });

  onSubmit() {
    if (this.moveInForm.valid) {
      const moveInFormRawValue = this.moveInForm.getRawValue();
      if (
        moveInFormRawValue.refType == 'AWB' &&
        moveInFormRawValue.ref.toString().length != 11
      ) {
        alert('Une référence de type AWB doit comporter 11 chiffres');
      } else if (
        Number(moveInFormRawValue.quantity) >
        Number(moveInFormRawValue.totalQuantity)
      ) {
        alert('La quantité total doit être supérieur à la quantité');
      } else if (
        Number(moveInFormRawValue.weight) >
        Number(moveInFormRawValue.totalWeight)
      ) {
        alert('Le poids total doit être supérieur au poids');
      } else {
        const move: Move = {
          inOut: false,
          creationDate: new Date().toISOString(), //'yyyy-MM-ddTHH:mm:ss.SSSz'
          creationUser: 'Thomas',
          moveDate: undefined,
          warehousCode: moveInFormRawValue.warehousCode,
          warehousLabel: moveInFormRawValue.warehousLabel,
          customsStatus: moveInFormRawValue.customsStatus,
          refType: moveInFormRawValue.refType,
          ref: moveInFormRawValue.ref,
          quantity: Number(moveInFormRawValue.quantity),
          weight: Number(moveInFormRawValue.weight),
          totalQuantity: Number(moveInFormRawValue.totalQuantity),
          totalWeight: Number(moveInFormRawValue.totalWeight),
          description: moveInFormRawValue.description,
          declarationPlace: 'RapidCargo CDG',
          declarationPlaceCode: 'CDGRC1',
          customsDocType: undefined,
          customsDocRef: undefined,
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
}
