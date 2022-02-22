import { Link, useLoaderData, Form, LoaderFunction, redirect, ActionFunction, useActionData } from "remix";

import { createPost, getPosts } from "~/post";
import type { Post } from "~/post";

export const action :ActionFunction=  async ({request}) => {
    const  formData = await request.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const slug = formData.get('slug') as string
    const errors = {title:false,slug:false,content:false};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!content) errors.content = true;

  if (Object.keys(errors).length) {
    return errors;
  }
    await createPost({title,content,slug})
    return redirect('/admin');
};

export default function Admin() {
const errors = useActionData();
  return (
    <>
      <h1>Admin</h1>
      <Form method="post" reloadDocument>
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em>Title is required</em>
          ) : null}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Content:</label>{" "}
        {errors?.content ? (
          <em>Content is required</em>
        ) : null}
        <br />
        <textarea id="content" rows={20} name="content" />
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
    </>
  );
}
