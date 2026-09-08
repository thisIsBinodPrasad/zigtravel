import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail = '';
  subscribed = false;

  onSubscribe() {
    if (this.newsletterEmail) {
      this.subscribed = true;
      setTimeout(() => {
        this.subscribed = false;
        this.newsletterEmail = '';
      }, 4000);
    }
  }
}
