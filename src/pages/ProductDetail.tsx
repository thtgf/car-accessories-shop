import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Cart from '@/components/Cart';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  brand: string;
  article: string;
  inStock: boolean;
  description: string;
  specifications: { label: string; value: string }[];
  features: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Автомобильные коврики EVA премиум класса',
    price: 4500,
    oldPrice: 6500,
    image: '/img/39eeb67c-dc7a-4bef-89ff-4af0d2b10bbf.jpg',
    category: 'Коврики',
    brand: 'BMW',
    article: 'EVA-BMW-001',
    inStock: true,
    description: 'Премиальные автомобильные коврики EVA специально разработаны для BMW. Изготовлены из экологически чистого материала EVA (этиленвинилацетат), который обеспечивает максимальную защиту салона от грязи, воды и износа.',
    specifications: [
      { label: 'Материал', value: 'EVA (этиленвинилацетат)' },
      { label: 'Толщина', value: '10 мм' },
      { label: 'Совместимость', value: 'BMW 3, 5, 7 серии' },
      { label: 'Цвет', value: 'Черный с красной строчкой' },
      { label: 'Комплектация', value: '4 коврика + багажник' }
    ],
    features: [
      'Водонепроницаемость и защита от грязи',
      'Ортопедический эффект благодаря толщине 10 мм',
      'Точная форма под конкретную модель автомобиля',
      'Не скользят благодаря рифленой поверхности',
      'Легко моются и не впитывают запахи'
    ]
  },
  {
    id: 2,
    name: 'Чехлы на сиденья из экокожи, спортивный стиль',
    price: 12500,
    oldPrice: 15000,
    image: '/img/170256bb-3bd3-452a-9c47-da8af479252b.jpg',
    category: 'Чехлы',
    brand: 'Mercedes',
    article: 'SEAT-MB-PRO',
    inStock: true,
    description: 'Эксклюзивные чехлы из премиальной экокожи в спортивном стиле для Mercedes. Сочетают элегантность и практичность, защищая оригинальную обивку от износа.',
    specifications: [
      { label: 'Материал', value: 'Экокожа премиум класса' },
      { label: 'Дизайн', value: 'Спортивный с контрастной строчкой' },
      { label: 'Совместимость', value: 'Mercedes C, E класс' },
      { label: 'Цвет', value: 'Черный с красными вставками' },
      { label: 'Комплектация', value: 'Передние + задние сиденья' }
    ],
    features: [
      'Дышащий материал - комфорт в любую погоду',
      'Усиленные швы для долговечности',
      'Совместимость с боковыми airbag',
      'Простая установка без инструментов',
      'Легкий уход - протирание влажной тканью'
    ]
  },
  {
    id: 3,
    name: 'Органайзер в багажник складной',
    price: 2800,
    image: '/img/49d6505f-8108-41f6-8f32-838191e087a6.jpg',
    category: 'Органайзеры',
    brand: 'Универсальные',
    article: 'ORG-TRUNK-05',
    inStock: true,
    description: 'Универсальный складной органайзер для багажника с несколькими отделениями. Помогает держать вещи в порядке и экономить пространство.',
    specifications: [
      { label: 'Материал', value: 'Прочный полиэстер' },
      { label: 'Размеры', value: '50 x 30 x 25 см' },
      { label: 'Вес', value: '800 г' },
      { label: 'Цвет', value: 'Черный с красными вставками' },
      { label: 'Отделений', value: '3 основных + 6 карманов' }
    ],
    features: [
      'Складная конструкция - легко хранить',
      'Жесткие стенки держат форму',
      'Нескользящее дно',
      'Ручки для переноски',
      'Подходит для любого автомобиля'
    ]
  },
  {
    id: 4,
    name: 'Коврики EVA для Audi A4',
    price: 5200,
    oldPrice: 7000,
    image: '/img/39eeb67c-dc7a-4bef-89ff-4af0d2b10bbf.jpg',
    category: 'Коврики',
    brand: 'Audi',
    article: 'EVA-AUDI-A4',
    inStock: true,
    description: 'Специализированные коврики EVA, созданные точно под размеры Audi A4. Обеспечивают максимальную защиту салона от внешних воздействий.',
    specifications: [
      { label: 'Материал', value: 'EVA премиум' },
      { label: 'Толщина', value: '12 мм' },
      { label: 'Совместимость', value: 'Audi A4 2015-2024' },
      { label: 'Цвет', value: 'Черный с серой строчкой' },
      { label: 'Комплектация', value: '5 предметов' }
    ],
    features: [
      'Увеличенная толщина 12 мм',
      'Идеальное прилегание к полу',
      'Защита от воды, грязи и реагентов',
      'Антискользящее покрытие',
      'Простой уход и долгий срок службы'
    ]
  },
  {
    id: 5,
    name: 'Чехлы премиум для Toyota Camry',
    price: 11000,
    image: '/img/170256bb-3bd3-452a-9c47-da8af479252b.jpg',
    category: 'Чехлы',
    brand: 'Toyota',
    article: 'SEAT-TOY-CAM',
    inStock: false,
    description: 'Элегантные чехлы премиум-класса для Toyota Camry. Сочетают стиль, комфорт и надежную защиту салона.',
    specifications: [
      { label: 'Материал', value: 'Экокожа + алькантара' },
      { label: 'Дизайн', value: 'Классический премиум' },
      { label: 'Совместимость', value: 'Toyota Camry V70' },
      { label: 'Цвет', value: 'Бежевый с коричневыми вставками' },
      { label: 'Комплектация', value: 'Полный комплект' }
    ],
    features: [
      'Комбинация экокожи и алькантары',
      'Эргономичный дизайн',
      'Поддержка всех функций сидений',
      'Износостойкость и долговечность',
      'Элегантный внешний вид'
    ]
  },
  {
    id: 6,
    name: 'Органайзер для багажника премиум',
    price: 3500,
    oldPrice: 4200,
    image: '/img/49d6505f-8108-41f6-8f32-838191e087a6.jpg',
    category: 'Органайзеры',
    brand: 'Универсальные',
    article: 'ORG-PREM-01',
    inStock: true,
    description: 'Премиальный органайзер с усиленной конструкцией и множеством отделений. Идеален для дальних поездок и хранения автомобильных принадлежностей.',
    specifications: [
      { label: 'Материал', value: 'Оксфорд 600D' },
      { label: 'Размеры', value: '60 x 35 x 30 см' },
      { label: 'Вес', value: '1200 г' },
      { label: 'Цвет', value: 'Черный' },
      { label: 'Отделений', value: '4 основных + 8 карманов' }
    ],
    features: [
      'Усиленное дно и стенки',
      'Термоизолированный карман',
      'Крепления для фиксации в багажнике',
      'Водоотталкивающая ткань',
      'Съемные перегородки'
    ]
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться в каталог</Button>
        </div>
      </div>
    );
  }

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад в каталог
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-lg px-4 py-2">
                  -{discount}%
                </Badge>
              )}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">
                Артикул: {product.article} • Бренд: {product.brand}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>
              {product.inStock ? (
                <p className="text-green-600 flex items-center gap-2 text-lg">
                  <Icon name="Check" size={20} />
                  В наличии
                </p>
              ) : (
                <p className="text-muted-foreground text-lg">Под заказ (3-5 дней)</p>
              )}
            </div>

            <div className="mb-6 p-6 bg-muted/30 rounded-lg">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={20} />
                </Button>
                <span className="px-6 py-2 text-lg font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={20} />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 text-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1">
                <Icon name="Heart" size={20} className="mr-2" />
                В избранное
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Icon name="Share2" size={20} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="specs" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="features">Особенности</TabsTrigger>
          </TabsList>
          <TabsContent value="specs" className="mt-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 p-4 ${
                    index % 2 === 0 ? 'bg-muted/20' : ''
                  }`}
                >
                  <span className="font-medium">{spec.label}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}
