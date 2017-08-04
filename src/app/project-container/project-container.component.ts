import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable, Apollo } from 'apollo-angular';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {

  loading: boolean;
  projects: ApolloQueryObservable<any>;
  projects1: ApolloQueryObservable<any>;
  projectsa: any[] = [];
  itemsPerPage: number = 5;
  offset: number = 0;

  constructor(private apollo: Apollo, private projServ: ProjectService) { }

  ngOnInit() {
    this.projects = this.projServ.getProjects();
    this.projects1 = this.projServ.getProjectsPage(this.itemsPerPage);
    this.projects1.subscribe(({ data, loading }) => {
      this.projectsa = data.allProjects;
    });
  }

  getProject(event) {
    this.projServ.createProject({ title: event.title, start: event.start }).subscribe(() => this.projects.refetch());
  }

  fetchMore() {
    this.offset += this.itemsPerPage;
    this.projServ.fetchMore(this.projects1, this.offset, this.itemsPerPage, this.projectsa).then(res => {
      this.projectsa = [...this.projectsa, ...res.data.allProjects];
    }
    );
  }

}
