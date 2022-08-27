import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const postId = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      postId,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export const getPostsIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((x) => ({ params: { postId: x.replace(/\.md$/, "") } }));
};

export const getPostData = async (postId) => {
  const fullPath = path.join(postsDirectory, `${postId}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const matterResults = matter(fileContent);

  const processedContent = await remark()
    .use(html)
    .process(matterResults.content);
  const contentHtml = processedContent.toString();

  return {
    postId,
    contentHtml,
    ...matterResults.data,
  };
};
