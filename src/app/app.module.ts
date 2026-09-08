import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { DestinationSelectorComponent } from './components/destination-selector/destination-selector.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { PackageGridComponent } from './components/package-grid/package-grid.component';
import { PackageDetailModalComponent } from './components/package-detail-modal/package-detail-modal.component';
import { CostCalculatorComponent } from './components/cost-calculator/cost-calculator.component';
import { TravelGuideComponent } from './components/travel-guide/travel-guide.component';
import { InquiryModalComponent } from './components/inquiry-modal/inquiry-modal.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FaqComponent } from './components/faq/faq.component';
import { FloatingCtaComponent } from './components/floating-cta/floating-cta.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    DestinationSelectorComponent,
    FilterBarComponent,
    PackageGridComponent,
    PackageDetailModalComponent,
    CostCalculatorComponent,
    TravelGuideComponent,
    InquiryModalComponent,
    ReviewsComponent,
    FaqComponent,
    FloatingCtaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
