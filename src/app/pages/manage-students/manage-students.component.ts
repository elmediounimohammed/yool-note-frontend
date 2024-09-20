import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { EtudiantService, EtudiantDTO } from '../../core/Services/student.service';  // Import the service and model

@Component({
  selector: 'app-manage-etudiants',
  templateUrl: './manage-etudiants.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class ManageEtudiantsComponent implements OnInit {
  etudiants: EtudiantDTO[] = [];
  newEtudiant: EtudiantDTO = this.initializeNewEtudiant();
  isEditing = false;
  selectedEtudiant: EtudiantDTO | null = null;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    this.loadEtudiants();  // Load students when component initializes
  }

  initializeNewEtudiant(): EtudiantDTO {
    return {
      id: 0,
      nom: '',
      prenom: '',
      dateNaissance: '',
      adresse: '',
      parcoursScolaire: { resultat: '', niveau: '', nomEcole: '' },
      classe: { titre: '' }
    };
  }

  loadEtudiants() {
    this.etudiantService.getAllEtudiants().subscribe((data: EtudiantDTO[]) => {
      this.etudiants = data;
    });
  }

  addEtudiant() {
    if (!this.isEditing) {
      this.etudiantService.createEtudiant(this.newEtudiant).subscribe((etudiant: EtudiantDTO) => {
        this.etudiants.push(etudiant);
        this.resetForm();
      });
    }
  }

  editEtudiant(etudiant: EtudiantDTO) {
    this.isEditing = true;
    this.selectedEtudiant = etudiant;
    this.newEtudiant = { ...etudiant };
  }

  saveEditedEtudiant() {
    if (this.selectedEtudiant && this.selectedEtudiant.id) {
      this.etudiantService.updateEtudiant(this.selectedEtudiant.id, this.newEtudiant).subscribe((updatedEtudiant: EtudiantDTO) => {
        const index = this.etudiants.findIndex(e => e.id === this.selectedEtudiant!.id);
        if (index > -1) {
          this.etudiants[index] = updatedEtudiant;
        }
        this.resetForm();
        this.isEditing = false;
      });
    }
  }

  deleteEtudiant(etudiantId: number) {
    this.etudiantService.deleteEtudiant(etudiantId).subscribe(() => {
      this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== etudiantId);
    });
  }

  resetForm() {
    this.newEtudiant = this.initializeNewEtudiant();
    this.selectedEtudiant = null;
    this.isEditing = false;
  }
}
