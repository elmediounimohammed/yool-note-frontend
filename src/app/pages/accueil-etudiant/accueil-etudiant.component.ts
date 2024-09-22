import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { EtudiantDTO } from '../../shared/models/etudiant';
import {CommonModule} from "@angular/common";
import {EtudiantNavbarComponent} from '../../shared/etudiant-navbar/etudiant-navbar.component'

@Component({
  selector: 'app-accueil-etudiant',
  standalone: true,
  imports: [CommonModule,EtudiantNavbarComponent],
  templateUrl: './accueil-etudiant.component.html',
  styleUrls: ['./accueil-etudiant.component.css'],


})
export class AccueilEtudiantComponent implements OnInit {
  etudiant: EtudiantDTO = {} as EtudiantDTO; // Initialize it as an empty object

  constructor(private administrateurService: AdministrateurService) {}

  ngOnInit(): void {
    this.loadEtudiantProfile();
  }

  loadEtudiantProfile(): void {
    const etudiantId = 1;  // Fetch the student's ID from a service or state
    this.administrateurService.getEtudiantById(etudiantId).subscribe(
      (etudiant: EtudiantDTO) => {
        this.etudiant = etudiant;
      },
      (error) => {
        console.error('Error fetching student profile', error);
      }
    );
  }
}
