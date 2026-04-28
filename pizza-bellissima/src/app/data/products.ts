import { Product, ProductCategory } from '../models/product.model';

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Маргарита",
    category: ProductCategory.Pizza,
    price: 8.5,
    discount: 0,
    size: "32 см",
    description: "Класическа италианска пица с доматен сос и моцарела.",
    ingredients: "доматен сос, моцарела, босилек",
    image: "https://zenideen.com/wp-content/uploads/2020/06/originalrezept-margherita.jpg"
  },
  {
  id: "prod-002",
  name: "Пеперони",
  category: ProductCategory.Pizza,
  price: 9.9,
  discount: 10,
  size: "32 см",
  description: "Пица с пикантно пеперони и разтопена моцарела.",
  ingredients: "доматен сос, моцарела, пеперони",
  image: "https://healthywayrecipes.com/wp-content/uploads/2025/01/Classic-Pepperonis-Pizza-Fresh-from-the-Oven.png"
},
  {
  id: "prod-003",
  name: "Капричоза",
  category: ProductCategory.Pizza,
  price: 11.5,
  discount: 0,
  size: "32 см",
  description: "Богата пица с шунка, гъби и артишок.",
  ingredients: "доматен сос, моцарела, шунка, гъби, артишок, маслини",
  image: "https://www.italianstylecooking.net/wp-content/uploads/2022/01/Pizza-capricciosa-1024x683.jpg"
},
  {
  id: "prod-004",
  name: "Четири сирена",
  category: ProductCategory.Pizza,
  price: 12,
  discount: 15,
  size: "32 см",
  description: "Ароматна пица с комбинация от четири вида сирена.",
  ingredients: "доматен сос, моцарела, горгонзола, пармезан, ементал",
  image: "https://tse3.mm.bing.net/th/id/OIP.zsPybSMwDqjeKQKGJ21Y8wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
},
  {
  id: "prod-005",
  name: "Паста Болонезе",
  category: ProductCategory.Pasta,
  price: 10.5,
  discount: 0,
  size: "350 г",
  description: "Класическа паста със сос Болонезе от телешко месо и домати.",
  ingredients: "спагети, телешко, доматен сос, лук, моркови, пармезан",
  image: "https://weeknightrecipes.com/wp-content/uploads/2025/02/Untitled-design-24-1-750x938.jpg"
},
  {
  id: "prod-006",
  name: "Паста Карбонара",
  category: ProductCategory.Pasta,
  price: 11,
  discount: 5,
  size: "350 г",
  description: "Паста със сос от яйца, бекон и пармезан.",
  ingredients: "спагети, бекон, яйца, пармезан, черен пипер",
  image: "https://thestayathomechef.com/wp-content/uploads/2020/03/Pasta-Carbonara-2-3-scaled.jpg"
},
  {
  id: "prod-007",
  name: "Ризото с гъби",
  category: ProductCategory.Risotto,
  price: 12.5,
  discount: 0,
  size: "300 г",
  description: "Кремообразно ризото с ароматни горски гъби.",
  ingredients: "ориз арборио, гъби, пармезан, масло, бяло вино",
  image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/06/Mushroom-Risotto-in-a-Plate.jpg"
},
  {
  id: "prod-008",
  name: "Ризото с морски дарове",
  category: ProductCategory.Risotto,
  price: 14,
  discount: 10,
  size: "300 г",
  description: "Ризото с калмари, скариди и миди, овкусено с бяло вино.",
  ingredients: "ориз арборио, скариди, миди, калмари, чесън, бяло вино",
  image: "https://therockfish.co.uk/cdn/shop/articles/Correct-Risotto-WEB_a4e2d0e6-4f54-4d40-8753-7f2851bc0e33.jpg?v=1737732798&width=1024"
},
{
  id: "prod-009",
  name: "Тирамису",
  category: ProductCategory.Dessert,
  price: 6.5,
  discount: 0,
  size: "150 г",
  description: "Италиански десерт с бишкоти, маскарпоне и кафе.",
  ingredients: "бишкоти, маскарпоне, кафе, какао, яйца",
  image: "https://tse2.mm.bing.net/th/id/OIP.wYqg7GCzmCi-XZC4oXCBqwHaE3?rs=1&pid=ImgDetMain&o=7&rm=3"
},
{
  id: "prod-010",
  name: "Пана Кота",
  category: ProductCategory.Dessert,
  price: 5.9,
  discount: 0,
  size: "150 г",
  description: "Кремообразен десерт със сметана и ванилия.",
  ingredients: "сметана, захар, ванилия, желатин, плодово кули",
  image: "https://i.pinimg.com/736x/3d/02/cb/3d02cb653835a19285fd1b637fdd6642.jpg"
},
{
  id: "prod-011",
  name: "Шоколадово суфле",
  category: ProductCategory.Dessert,
  price: 7.2,
  discount: 5,
  size: "150 г",
  description: "Топъл десерт с течен шоколадов център.",
  ingredients: "шоколад, яйца, масло, захар, брашно",
  image: "https://bigoven-res.cloudinary.com/image/upload/chocolate-souffle-cakes-2.jpg"
},
{
  id: "prod-012",
  name: "Кока Кола",
  category: ProductCategory.Drink,
  price: 2.5,
  discount: 0,
  size: "500 мл",
  description: "Газирана напитка.",
  ingredients: "вода, захар, кофеин, аромати",
  image: "https://tse1.mm.bing.net/th/id/OIP.eiPRiKEDTQGiyCey0a3WnAAAAA?w=265&h=265&rs=1&pid=ImgDetMain&o=7&rm=3"
},
{
  id: "prod-013",
  name: "Минерална вода",
  category: ProductCategory.Drink,
  price: 1.5,
  discount: 0,
  size: "500 мл",
  description: "Минерална вода, подходяща за всяко хранене.",
  ingredients: "вода",
  image: "https://tse4.mm.bing.net/th/id/OIP.6UUHpi6GnpQPCILr0V9MRgHaKc?w=1361&h=1920&rs=1&pid=ImgDetMain&o=7&rm=3"
},
{
  id: "prod-014",
  name: "Червено вино",
  category: ProductCategory.Drink,
  price: 12,
  discount: 0,
  size: "750 мл",
  description: "Бутилка червено вино, подходящо за пица и паста.",
  ingredients: "грозде",
  image: "https://foodandbeverageknowledge.com/wp-content/uploads/2021/05/merlot-red-wine-glass-bottle-1024x572.webp"
}
];
