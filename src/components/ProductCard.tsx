import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
      {discount > 0 && (
        <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
          -{discount}%
        </Badge>
      )}

      <div className="aspect-square bg-muted/30 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs font-normal">
            {product.brand}
          </Badge>
          <span className="text-xs text-muted-foreground">арт. {product.article}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            {product.inStock ? (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <Icon name="Check" size={14} />
                В наличии
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">Под заказ</p>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(product.id)}
            size="icon"
            className="h-10 w-10 shrink-0"
            disabled={!product.inStock}
          >
            <Icon name="ShoppingCart" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}