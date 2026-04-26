import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
})
export class FeaturesComponent {
  features = [
    {
      title: 'Свежи съставки',
      description: 'Всяка пица се приготвя с пресни продукти и оригинални италиански подправки.',
    },
    {
      title: 'Бърза доставка',
      description: 'Поръчай лесно и получи храната си до 45 минути.',
    },
    {
      title: 'Контролирани порции',
      description: 'Ястията са представени с ясно количество и препоръки за нея.',
    },
  ];
}
