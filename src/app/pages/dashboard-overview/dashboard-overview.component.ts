import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  standalone: true,
})
export class DashboardOverviewComponent {
  totalStudents = 120; // Replace with dynamic data
  totalCourses = 15;   // Replace with dynamic data
  totalEvaluations = 40; // Replace with dynamic data
  totalPartners = 5;   // Replace with dynamic data
}
