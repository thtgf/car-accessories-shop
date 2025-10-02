import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

const BRANDS = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Volkswagen', 'Hyundai', 'Kia', 'Универсальные'];
const CATEGORIES = ['Коврики', 'Чехлы', 'Органайзеры', 'Электроника', 'Освещение', 'Аксессуары'];

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: [0, 50000],
    inStockOnly: false,
  });

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStockToggle = () => {
    const newFilters = { ...filters, inStockOnly: !filters.inStockOnly };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      brands: [],
      categories: [],
      priceRange: [0, 50000],
      inStockOnly: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} />
          Фильтры
        </h2>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Сбросить
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['brand', 'category', 'price']} className="w-full">
        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-semibold">
            Марка автомобиля
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {BRANDS.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-semibold">
            Тип аксессуара
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">
            Цена
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-4">
              <Slider
                min={0}
                max={50000}
                step={500}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {filters.priceRange[0].toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-muted-foreground">
                  {filters.priceRange[1].toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-5 pt-5 border-t border-border">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStockOnly}
            onCheckedChange={handleStockToggle}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            Только в наличии
          </Label>
        </div>
      </div>
    </div>
  );
}
