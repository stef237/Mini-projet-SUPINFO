import {Component, OnInit} from '@angular/core';
import {MemeService} from '../service/meme.service';
import {NgForOf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-all-memes',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './all-memes.component.html',
  styleUrl: './all-memes.component.css'
})
export class AllMemesComponent implements OnInit {

  memes = [
    { imageUrl: '' },

  ];

  constructor(private route: ActivatedRoute
              ,private memeService: MemeService) {}

  ngOnInit(): void {
    this.loadMemes();
  }

  loadMemes() {
    this.memeService.getMemes().subscribe(data => {
      this.memes = data;
    });
  }




  shareOnFacebook(imageUrl: string) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
    window.open(facebookUrl, '_blank');
  }

  shareOnMessenger(imageUrl: string) {
    const messengerUrl = `https://www.me.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
    window.open(messengerUrl, '_blank');
  }

  shareOnTwitter(imageUrl: string) {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}`;
    window.open(twitterUrl, '_blank');
  }

  shareOnInstagram(imageUrl: string) {
    alert("Instagram ne permet pas de partager via URL directement. Vous pouvez enregistrer l'image et la publier.");

  }

  shareOnWhatsApp(imageUrl: string) {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(imageUrl)}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnLinkedin(imageUrl: string) {
    const linkedinUrl = `https://www.linkedin.com/send?text=${encodeURIComponent(imageUrl)}`;
    window.open(linkedinUrl, '_blank');
  }
}
