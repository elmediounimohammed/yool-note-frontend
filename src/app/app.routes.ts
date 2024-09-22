import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { AuthGuard } from './core/services/auth.guard';
import {ManageEtudiantComponent} from "./pages/manage-etudiant/manage-etudiant.component";
import {ManageCoursComponent} from "./pages/manage-cours/manage-cours.component";
import {
  ManageEvaluationsComponent,
} from "./pages/manage-evaluations/manage-evaluations.component";
import {ManageClassesComponent} from "./pages/manage-classes/manage-classes.component";

import {ManagePartenaireComponent} from "./pages/manage-partenaire/manage-partenaire.component";
import {DashboardOverviewComponent} from "./pages/dashboard-overview/dashboard-overview.component";
import {ManageAdminComponent} from "./pages/manage-admin/manage-admin.component"; // Import the AuthGuard if you use it
export const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,  // Parent component
    // canActivate: [AuthGuard],  // Admin access only
    // data: { role: 'ADMIN' },
    children: [  // Child routes
      { path: 'overview', component: DashboardOverviewComponent },
      { path: 'students', component: ManageEtudiantComponent },
      { path: 'classes', component: ManageClassesComponent },
      { path: 'cours', component: ManageCoursComponent },
      { path: 'evaluations', component: ManageEvaluationsComponent },
      { path: 'partenaires', component: ManagePartenaireComponent },
      { path: 'profile', component: ManageAdminComponent },
    ]
  },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard], data: { role: 'STUDENT' } },
  { path: '**', redirectTo: '' }
];
