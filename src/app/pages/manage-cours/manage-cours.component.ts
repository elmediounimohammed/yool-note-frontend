import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { CoursDTO } from '../../shared/models/cours';
import { ClasseDTO } from '../../shared/models/classe';
import { PartenaireDTO } from '../../shared/models/partenaire';

@Component({
  selector: 'app-manage-cours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-cours.component.html',
  styleUrls: ['./manage-cours.component.css']
})
export class ManageCoursComponent implements OnInit {
  coursForm!: FormGroup;
  coursList: CoursDTO[] = [];
  classes: ClasseDTO[] = [];  // To load all available classes
  partenaires: PartenaireDTO[] = [];  // To load all available partners
  isEditing = false;
  selectedCours: CoursDTO | null = null;

  constructor(private administrateurService: AdministrateurService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCours();  // Load all courses
    this.loadClasses();  // Load all classes
    this.loadPartenaires();  // Load all partners

    // Initialize the form with FormBuilder
    this.coursForm = this.fb.group({
      intitule: ['', Validators.required],
      nbreHeure: ['', Validators.required],
      classeIds: [[], Validators.required],  // Multi-select for classes
      partenaireId: ['', Validators.required]  // Select for partner
    });
  }

  // Load all courses from the service
  loadCours(): void {
    this.administrateurService.getAllCours().subscribe(
      (coursList: CoursDTO[]) => {
        this.coursList = coursList;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  // Load all classes from the service
  loadClasses(): void {
    this.administrateurService.getAllClasses().subscribe(
      (classes: ClasseDTO[]) => {
        this.classes = classes;
      },
      (error: any) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  // Load all partners from the service
  loadPartenaires(): void {
    this.administrateurService.getAllPartenaires().subscribe(
      (partenaires: PartenaireDTO[]) => {
        this.partenaires = partenaires;
      },
      (error: any) => {
        console.error('Error fetching partners:', error);
      }
    );
  }

  // Create a new course
  createCours(): void {
    if (this.coursForm.valid) {
      const newCours = this.coursForm.value;
      this.administrateurService.createCours(newCours).subscribe(
        () => {
          this.loadCours();  // Refresh the course list
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding course:', error);
        }
      );
    }
  }

  // Update an existing course
  updateCours(): void {
    if (this.selectedCours && this.coursForm.valid) {
      const updatedCours = this.coursForm.value;
      this.administrateurService.updateCours(this.selectedCours.idCours, updatedCours).subscribe(
        () => {
          this.loadCours();  // Refresh the course list
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating course:', error);
        }
      );
    }
  }

  // Edit an existing course
  editCours(coursId: number): void {
    this.administrateurService.getCoursById(coursId).subscribe(
      (cours: CoursDTO) => {
        this.selectedCours = cours;
        this.coursForm.patchValue(cours);  // Pre-fill the form with course details
        this.isEditing = true;
      },
      (error: any) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  // Delete a course by ID
  deleteCours(id: number): void {
    this.administrateurService.deleteCours(id).subscribe(
      () => {
        this.coursList = this.coursList.filter(cours => cours.idCours !== id);  // Remove the course from the list
      },
      (error: any) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  // Reset the form after add or edit
  resetForm(): void {
    this.coursForm.reset();  // Clear the form
    this.isEditing = false;
    this.selectedCours = null;
  }

}
