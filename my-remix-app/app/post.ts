import path from 'path';
import fs from 'fs/promises';
import fm  from 'front-matter';
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import {marked} from 'marked';
export type Post = {
    id: number;
    slug: string;
    title: string;
    content:string;
};
export type newPost = {
    slug: string;
    title: string;
    content:string;
};
export type PostMarkdownAttributes = {
    title: string;
  };
type PostMarkDown={
    attributes:PostMarkdownAttributes,
    body:string
}
const postsPath=path.join(__dirname,'..','posts');

export const getPosts= async () => {
  const files= await fs.readdir(postsPath);
  return Promise.all(files.map(async filename=> {
      const file= await fs.readFile(path.join(postsPath,filename),'utf8')
      const { attributes, body}: PostMarkDown = fm(file.toString())
      return {
          slug: filename.replace('.md',''),
          title: attributes.title,
          content: marked(body)
      }
  }))
}

function isValidPostAttributes(
    attributes: any
  ): attributes is PostMarkdownAttributes {
    return attributes?.title;
  }
export async function getPost(slug: string) {
    const filepath = path.join(postsPath, slug + ".md");
    const file = await fs.readFile(filepath);
    const { attributes,body} = parseFrontMatter(file.toString());
    invariant(
      isValidPostAttributes(attributes),
      `Post ${filepath} is missing attributes`
    );
    return { slug, title: attributes.title ,content:marked(body)};
  }

  export async function createPost(post:newPost) {
    const md = `---\ntitle: ${post.title}\n---\n\n${post.content}`;
    await fs.writeFile(
      path.join(postsPath,`${post.slug}.md`),
      md
    );
    return getPost(post.slug);
  }

