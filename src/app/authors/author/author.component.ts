import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../model/author';
import { AuthorsService } from '../service/authors.service';
import { Subscription } from "rxjs";
import { AuthornamesPipe } from '../../pipes/authornames.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  standalone: true,
  imports: [NgIf, AuthornamesPipe]
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedauthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedauthor = data;
        },
        error: (_: any) => {
          this.selectedauthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
