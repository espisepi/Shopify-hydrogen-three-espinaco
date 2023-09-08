import {useLoaderData, Link} from '@remix-run/react';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';

interface Collection {
  id: string;
  title: string;
  handle: string;
  image?: {
    altText: string;
    width: number;
    height: number;
    url: string;
  };
}

interface LoaderData {
  collections: {
    nodes: Collection[];
  };
}

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

// Esta funcion devuelve los datos de la peticion al hook useLoaderData() que se utiliza mas abajo
export async function loader({context}: LoaderArgs) {
  return await context.storefront.query<LoaderData>(COLLECTIONS_QUERY);
}

export default function Index() {
  // useLoaderData funciona gracias a que hemos definido la funcion: "export async function loader({context}: LoaderArgs)" en este mismo archivo
  const {collections} = useLoaderData();
  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {collections.nodes.map((collection: Collection) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              <div className="grid gap-4">
                {collection?.image && (
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    crop="center"
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                  {collection.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
