import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { AuthGuard } from './core/services/auth.guard';
import {ManageEtudiantComponent} from "./pages/manage-etudiant/manage-etudiant.component";
import {ManageCoursesComponent} from "./pages/manage-courses/manage-courses.component";
import {ManageEvaluationsComponent} from "./pages/manage-evaluations/manage-evaluations.component";
import {ManageClassesComponent} from "./pages/manage-classes/manage-classes.component";
import {ManagePartnersComponent} from "./pages/manage-partners/manage-partners.component";
import {DashboardOverviewComponent} from "./pages/dashboard-overview/dashboard-overview.component"; // Import the AuthGuard if you use it
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
      { path: 'cours', component: ManageCoursesComponent },
      { path: 'evaluations', component: ManageEvaluationsComponent },
      { path: 'partenaires', component: ManagePartnersComponent }
    ]
  },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard], data: { role: 'STUDENT' } },
  { path: '**', redirectTo: '' }
];
