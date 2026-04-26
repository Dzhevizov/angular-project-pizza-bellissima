import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TopOffer {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
}

@Component({
  selector: 'app-top-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-offers.component.html',
  styleUrls: ['./top-offers.component.css'],
})
export class TopOffersComponent {
  topOffers: TopOffer[] = [
    {
      id: '1',
      name: 'Пица Маргарита',
      description: 'Класическа пица с доматен сос и моцарела.',
      price: 11.9,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1601924582971-5b9833bd6bc0?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: '2',
      name: 'Паста Карбонара',
      description: 'Кремообразна паста с бекон и пармезан.',
      price: 12.5,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1525755675451-dbffb089f0c8?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: '3',
      name: 'Ризото с гъби',
      description: 'Ароматно ризото със сезонни гъби.',
      price: 13.9,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1514516870925-1f6a581e186d?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: '4',
      name: 'Десерт Тирамису',
      description: 'Сладко завършване с кафе и маскарпоне.',
      price: 7.2,
      discount: 12,
      image: 'https://images.unsplash.com/photo-1551024738-6cc2d8ecc540?auto=format&fit=crop&w=700&q=80',
    },
  ];
}
