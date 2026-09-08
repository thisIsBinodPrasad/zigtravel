import { Component } from '@angular/core';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-floating-cta',
  templateUrl: './floating-cta.component.html',
  styleUrls: ['./floating-cta.component.css']
})
export class FloatingCtaComponent {
  constructor(private inquiryService: InquiryService) {}

  openInquiry() {
    this.inquiryService.openModal();
  }
}
