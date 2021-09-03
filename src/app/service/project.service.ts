import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  submissionDetail = [];
  batchDetail;
  studentSubmission ;
  assignedBatches = [];
  projectSubmissions = [];
  batchSubmission = [];
  students = [];
  studentSubmissionDetails;
  submittion;
  assignedProjectDetail;
  constructor(
    private http: HttpClient
  ) { }

  get_all_category() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/category/findAll`
    );
  }

  create_category(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/project/category/create`, {data}
    );
  }

  get_all_project() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/findAll`
    );
  }

  create_project(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/project/create`, {data}
    );
  }

  get_batch_and_project() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/assigned/project/getBatchProjects`
    );
  }
  get_assigned_project() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/assigned/project/getAll`
    );
  }

  create_assigned_project(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/assigned/project/create`, {data}
    );
  }

  get_evaluator(){
    return this.http.get(
      `${environment.BASE_SERVER_URL}/assigned/project/getEvaluator`
    );
  }
  get_project_evaluation(){
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/submission/findProjectEvaluation`
    );
  }
  get_btanch(){
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/submission/branch`
    );
  }

  store_evaluation(data){
    return this.http.post(`${environment.BASE_SERVER_URL}/project/submission/evaluate`, {data} );
  }
  create_evaluator(data){
    return this.http.post(
      `${environment.BASE_SERVER_URL}/assigned/project/createEvaluator`, {data}
    );
  }

  getProject(project_id){
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/findOne/${project_id}`
    );
  }

  getSubmissionDetail(){
    return this.submissionDetail;
  }

  getStudentSubmission(){
    return this.studentSubmission;
  }

  getBatchDetail(){
    return this.batchDetail;
  }
  getAssignedBatches(){
    return this.assignedBatches;
  }
  getProjectSubmissions(){
    return this.projectSubmissions;
  }

  getBatchSubmission(){
    return this.batchSubmission;
  }

  getStudent(){
    return this.students;
  }
  getStudentSubmissionDeatail(){
    return this.studentSubmissionDetails;
  }
  getSubmittion(){
    return this.submittion;
  }
  getAssignedProjectDetail(){
    return this.assignedProjectDetail;
  }

}
