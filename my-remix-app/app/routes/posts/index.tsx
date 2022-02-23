import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import { Link, useLoaderData } from "remix";
import { getPosts,Post } from "~/post";
export const loader = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div >
            <Link to={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        );
      })}
    </>
  );
}
