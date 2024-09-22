import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { EvaluationDTO, EvaluationRequestDTO } from '../../shared/models/evaluation';
import { ClasseDTO } from '../../shared/models/classe';

@Component({
  selector: 'app-manage-evaluations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-evaluations.component.html',
  styleUrls: ['./manage-evaluations.component.css']
})
export class ManageEvaluationsComponent implements OnInit {
  evaluationForm!: FormGroup;
  evaluations: EvaluationDTO[] = [];
  classes: ClasseDTO[] = [];  // Load available classes to select from
  isEditing = false;
  selectedEvaluation: EvaluationDTO | null = null;

  constructor(private administrateurService: AdministrateurService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadClasses();  // Load available classes
    this.initializeForm();  // Initialize the form
  }

  // Initialize the form
  initializeForm(): void {
    this.evaluationForm = this.fb.group({
      classeId: ['', Validators.required],  // Select the class
      contenu: ['', Validators.required],
      date: ['', Validators.required],  // Date as string
      typeEvaluation: ['', Validators.required]  // Type of evaluation
    });
  }

  // Load all classes (for dropdown selection)
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

  // Create a new evaluation
  createEvaluation(): void {
    if (this.evaluationForm.valid) {
      const newEvaluation: EvaluationRequestDTO = this.evaluationForm.value;
      this.administrateurService.createEvaluation(newEvaluation).subscribe(
        () => {
          this.loadEvaluationsByClass(newEvaluation.classeId);  // Refresh evaluations after creation
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding evaluation:', error);
        }
      );
    }
  }

  // Load evaluations by class ID
  loadEvaluationsByClass(classeId: number): void {
    this.administrateurService.getAllEvaluationsByClasseId(classeId).subscribe(
      (evaluations: EvaluationDTO[]) => {
        this.evaluations = evaluations;
      },
      (error: any) => {
        console.error('Error fetching evaluations:', error);
      }
    );
  }

  // Edit an existing evaluation
  editEvaluation(evaluationId: number): void {
    this.administrateurService.getEvaluationById(evaluationId).subscribe(
      (evaluation: EvaluationDTO) => {
        this.selectedEvaluation = evaluation;
        this.evaluationForm.patchValue(evaluation);  // Pre-fill the form with evaluation details
        this.isEditing = true;
      },
      (error: any) => {
        console.error('Error fetching evaluation details:', error);
      }
    );
  }

  // Update the selected evaluation
  updateEvaluation(): void {
    if (this.selectedEvaluation && this.evaluationForm.valid) {
      const updatedEvaluation: EvaluationRequestDTO = this.evaluationForm.value;
      this.administrateurService.updateEvaluation(this.selectedEvaluation.id, updatedEvaluation).subscribe(
        () => {
          this.loadEvaluationsByClass(updatedEvaluation.classeId);  // Refresh evaluations after update
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating evaluation:', error);
        }
      );
    }
  }

  // Delete an evaluation by ID
  deleteEvaluation(evaluationId: number): void {
    this.administrateurService.deleteEvaluation(evaluationId).subscribe(
      () => {
        this.evaluations = this.evaluations.filter(evaluation => evaluation.id !== evaluationId);
      },
      (error: any) => {
        console.error('Error deleting evaluation:', error);
      }
    );
  }

  // Reset the form after add or edit
  resetForm(): void {
    this.evaluationForm.reset();  // Clear the form
    this.isEditing = false;
    this.selectedEvaluation = null;
  }
}
