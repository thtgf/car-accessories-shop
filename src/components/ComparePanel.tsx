import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CompareItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
}

interface ComparePanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CompareItem[];
  onRemove: (id: number) => void;
}

export default function ComparePanel({ isOpen, onClose, items, onRemove }: ComparePanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Icon name="GitCompare" size={24} />
            Сравнение товаров
          </SheetTitle>
        </SheetHeader>

        <div className="pt-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Icon name="GitCompare" size={40} className="text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-2">Нет товаров для сравнения</p>
              <p className="text-sm text-muted-foreground">Добавьте товары для сравнения характеристик</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="relative bg-card border border-border rounded-lg p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => onRemove(item.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                    
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover rounded-md mb-3"
                    />
                    
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</h4>
                    <p className="text-lg font-bold mb-2">{item.price.toLocaleString('ru-RU')} ₽</p>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Марка:</span>
                        <span className="font-medium">{item.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Категория:</span>
                        <span className="font-medium">{item.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {items.length >= 2 && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Сравнение характеристик
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Разница в цене:</span>
                      <span className="font-medium">
                        {Math.abs(items[0].price - items[1].price).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Совместимость марок:</span>
                      <span className="font-medium">
                        {items[0].brand === items[1].brand ? 'Одинаковая' : 'Разная'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
