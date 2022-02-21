import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import { Link, useLoaderData } from "remix";
export const loader = () => {
  return [
    {
      id: 1,
      slug: "hello-world",
      title: "Hello World Remix from midudev",
    },
    {
      id: 2,
      slug: "hello-world 1",
      title: "Hello World Remix from midudev 1",
    },
  ];
};
type Post = {
  id: number;
  slug: string;
  title: number;
};
export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        );
      })}
    </>
  );
}
