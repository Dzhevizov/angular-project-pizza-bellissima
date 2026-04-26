import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { TopOffersComponent } from '../top-offers/top-offers.component';
import { InfoSectionComponent } from '../info-section/info-section.component';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, TopOffersComponent, InfoSectionComponent, FeaturesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
