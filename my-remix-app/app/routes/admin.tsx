import { Link, useLoaderData, Form, LoaderFunction, redirect, ActionFunction } from "remix";

import { createPost, getPosts } from "~/post";
import type { Post } from "~/post";

export const action :ActionFunction=  async ({request}) => {
    const  formData = await request.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const slug = formData.get('slug') as string
    await createPost({title,content,slug})
    return redirect('/admin');
};

export default function Admin() {
  return (
    <>
      <h1>Admin</h1>
      <Form method="post">
        <label>
          <h4>Post Title</h4>
          <input type="text" name="title" />
        </label>
        <label>
          <h4>Post Slug</h4>
          <input type="text" name="slug" />
        </label>
        <label>
          <h4>Post Content</h4>
          <textarea cols={30} rows={10} name="content"></textarea>
        </label>
        <div>
          <button >Save Post</button>
        </div>
      </Form>
    </>
  );
}
