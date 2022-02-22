import { useLoaderData } from "remix";

import type { LoaderFunction } from "remix";
import { getPost } from "~/post";

export const loader: LoaderFunction = async ({
  params
}) => {
  const {slug} = params;
  if(slug === undefined) throw new Error('WTF');
  const post = getPost(slug)
  return post;
};

export default function PostSlug() {
  const {title,slug,content} = useLoaderData();
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  );
}