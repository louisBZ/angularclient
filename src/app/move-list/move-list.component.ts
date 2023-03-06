import { Component, OnInit } from '@angular/core';
import { Move } from '../model/move';
import { MoveService } from '../service/move.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css'],
})
export class MoveListComponent implements OnInit {
  moves$!: Observable<Move[]>;

  displayedColumns: string[] = [
    'Horodatage',
    'Type',
    'De',
    'Vers',
    'Reference',
    'Quantité',
    'Poids',
    'Statut Douanier',
  ];

  constructor(private moveService: MoveService) {}

  ngOnInit() {
    this.moves$ = this.moveService.findAll();
    this.moveService.messageAdded.subscribe(() => {
      this.moves$ = this.moveService.findAll();
    });
  }
}
