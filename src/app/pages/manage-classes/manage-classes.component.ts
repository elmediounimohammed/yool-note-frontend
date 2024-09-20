import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { ClasseDTO } from '../../shared/models/classe';

@Component({
  selector: 'app-manage-classes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Add ReactiveFormsModule
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})

export class ManageClassesComponent implements OnInit {
  classForm!: FormGroup;  // Non-null assertion operator (!)
  classes: ClasseDTO[] = [];
  isEditing = false;
  selectedClasse: ClasseDTO | null = null;

  constructor(private administrateurService: AdministrateurService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadClasses();  // Load all classes on component initialization

    // Initialize the form with FormBuilder
    this.classForm = this.fb.group({
      titre: ['', Validators.required],
      matiere: ['', Validators.required],
      niveau: ['', Validators.required],
      prof: ['', Validators.required]
    });
  }

  // Create a new class
  createClasse(): void {
    if (this.classForm.valid) {
      const newClasse = this.classForm.value;
      this.administrateurService.createClasse(newClasse).subscribe(
        () => {
          this.loadClasses();  // Refresh the class list
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding class:', error);
        }
      );
    }
  }

  // Save the edited class
  updateClasse(): void {
    if (this.selectedClasse && this.classForm.valid) {
      const updatedClasse = this.classForm.value;
      this.administrateurService.updateClasse(this.selectedClasse.id, updatedClasse).subscribe(
        () => {
          this.loadClasses();  // Refresh the class list
          this.resetForm();
        },
        (error: any) => {
          console.error('Error saving class:', error);
        }
      );
    }
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

  // Edit an existing class
  editClasse(classeId: number): void {
    this.administrateurService.getClasseById(classeId).subscribe(
      (classe: ClasseDTO) => {
        this.selectedClasse = classe;
        this.classForm.patchValue(classe);  // Pre-fill the form with class details
        this.isEditing = true;
      },
      (error: any) => {
        console.error('Error fetching class details:', error);
      }
    );
  }

  // Delete a class by ID
  deleteClasse(id: number): void {
    this.administrateurService.deleteClasse(id).subscribe(
      () => {
        this.classes = this.classes.filter(classe => classe.id !== id);  // Remove the class from the list
      },
      (error: any) => {
        console.error('Error deleting class:', error);
      }
    );
  }

  // Reset the form after add or edit
  resetForm(): void {
    this.classForm.reset();  // Clear the form
    this.isEditing = false;
    this.selectedClasse = null;
  }
}
