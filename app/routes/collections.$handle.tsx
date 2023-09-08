import {useLoaderData} from '@remix-run/react';
import {Collection as CollectionType} from '@shopify/hydrogen/storefront-api-types';
import {LoaderArgs, json} from '@shopify/remix-oxygen';

interface SeoParams {
  data: {
    collection: CollectionType;
  };
}

const seo = ({data}: SeoParams) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  });
}

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      title
      description
      handle
    }
  }
`;
