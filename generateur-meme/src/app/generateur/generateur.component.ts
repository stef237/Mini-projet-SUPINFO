import {ChangeDetectionStrategy, Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import { ColorChromeModule } from 'ngx-color/chrome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ColorEvent } from 'ngx-color';
import { MemeService } from '../service/meme.service';
import { Meme } from '../model/Meme';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-generateur',
  standalone: true,
  imports: [
    ColorChromeModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generateur.component.html',
  styleUrls: ['./generateur.component.css'] // Corrigez styleUrl en styleUrls
})
export class GenerateurComponent implements OnInit {
  @ViewChild('memeCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  readonly panelOpenState = signal(false);
  successMessage: string = '';
  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  textColor: string = '#000000';
  backgroundColor: string = '#F9F9FB';


  constructor(private route: ActivatedRoute,
              private memeService: MemeService,
              private router: Router) {
  }
ngOnInit(): void {

  console.log(this.route.snapshot.paramMap.get('id'));
}

  preview(e: Event) {

    this.fileEvent=e;
    const input = e.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return; // Assurez-vous qu'il y a des fichiers
    }

    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const render = new FileReader();

    render.readAsDataURL(input.files[0]);

    render.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string; // Utilisez l'opérateur optionnel

      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 50, 50, 600, 500);
        }
      };
    };
  }

  drawText() {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    this.preview(this.fileEvent);
    // Vérifie si le contexte est valide
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacez le canvas avant de dessiner
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Définis le fond

      ctx.fillStyle = this.textColor; // Couleur du texte
      ctx.font = '50px Comic Sans MS'; // Définis la police
      ctx.textAlign = 'center'; // Alignez le texte au centre


      ctx.fillText(this.topText, canvas.width / 2, 40); // Texte en haut

      ctx.fillText(this.bottomText, canvas.width / 2, 590); // Texte en bas
    }
  }

  canvasTextColor($event: ColorEvent) {

    this.textColor = $event.color.hex;
    this.drawText();
  }

  canvasBgColor($event: ColorEvent) {
    this.backgroundColor= $event.color.hex;
    this.drawText();
  }

  downloadImg() {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.download = 'memeImage.png';
    link.href = image;
    link.click();
  }

  saveMeme() {
    const meme: Meme = {
      topText: this.topText,
      bottomText: this.bottomText,
      imageUrl: this.myCanvas.nativeElement.toDataURL('image/png'),
      textColor: this.textColor,
      backgroundColor: this.backgroundColor,
    };

    this.memeService.createMeme(meme).subscribe(response => {
      console.log('Meme saved:', response);
      this.successMessage = 'Mème enregistré avec succès !'; // Afficher le message de succès
      setTimeout(() => {
        this.router.navigate(['/galerie']); // Rediriger vers la galerie après 2 secondes
      }, 2000);
    }, error => {
      console.error('Error saving meme:', error);
      this.successMessage = 'Erreur lors de l\'enregistrement du mème.'; // Afficher un message d'erreur
    });
  }


}
