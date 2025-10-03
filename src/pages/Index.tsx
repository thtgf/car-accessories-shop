import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Filters, { FilterState } from '@/components/Filters';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
    inStock: true
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
    inStock: true
  },
  {
    id: 3,
    name: 'Органайзер в багажник складной',
    price: 2800,
    image: '/img/49d6505f-8108-41f6-8f32-838191e087a6.jpg',
    category: 'Органайзеры',
    brand: 'Универсальные',
    article: 'ORG-TRUNK-05',
    inStock: true
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
    inStock: true
  },
  {
    id: 5,
    name: 'Чехлы премиум для Toyota Camry',
    price: 11000,
    image: '/img/170256bb-3bd3-452a-9c47-da8af479252b.jpg',
    category: 'Чехлы',
    brand: 'Toyota',
    article: 'SEAT-TOY-CAM',
    inStock: false
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
    inStock: true
  }
];

export default function Index() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: [0, 50000],
    inStockOnly: false
  });

  const filteredProducts = PRODUCTS.filter(product => {
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    return true;
  });

  const handleAddToCart = (productId: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
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

      <div
        className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-white py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(215, 25%, 15%) 0%, hsl(215, 25%, 10%) 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                hsl(0, 72%, 51%) 35px,
                hsl(0, 72%, 51%) 38px
              )`
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4 tracking-tight"> Стильные автоаксессуары</h1>
            <p className="text-xl text-white/90 mb-8">
              Качественные аксессуары для вашего автомобиля. Быстрая доставка по всей России.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Icon name="Zap" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="lg:sticky lg:top-24 h-fit">
            <Filters onFilterChange={setFilters} />
          </aside>

          <main>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Каталог товаров</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Найдено {filteredProducts.length} товаров
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </main>
        </div>
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