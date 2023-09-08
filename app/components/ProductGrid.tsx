import {Collection} from '@shopify/hydrogen/storefront-api-types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  collection: Collection;
  url: string;
}

export default function ProductGrid({collection, url}: ProductGridProps) {
  return (
    <section className="w-full gap-4 md:gap-8 grid">
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
