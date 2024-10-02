import { Component } from '@angular/core';
import {GenerateurComponent} from './generateur/generateur.component';
import {FormsModule} from '@angular/forms';
import {ColorChromeModule} from 'ngx-color/chrome';
import {ShareButtons} from 'ngx-sharebuttons/buttons';
import {HttpClientModule} from '@angular/common/http';
import {AllMemesComponent} from './all-memes/all-memes.component';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    GenerateurComponent,
    ColorChromeModule,
    FormsModule,
    ShareButtons,
    AllMemesComponent,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    MatButton,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'generateur-meme';
}
