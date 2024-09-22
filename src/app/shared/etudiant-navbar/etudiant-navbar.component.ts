import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { EtudiantDTO } from '../../shared/models/etudiant';

@Component({
  selector: 'app-etudiant-navbar',
  standalone: true,
  templateUrl: './etudiant-navbar.component.html',
  styleUrls: ['./etudiant-navbar.component.css']
})
export class EtudiantNavbarComponent implements OnInit {
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
