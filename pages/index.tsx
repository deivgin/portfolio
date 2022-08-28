import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import { getSortedPostsData, PostData } from "../utils/posts";

interface Props {
  postsData: PostData[];
}

export const getStaticProps = async () => {
  const postsData = getSortedPostsData();

  return {
    props: {
      postsData,
    },
  };
};

export default function Home({ postsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-lg">
        <p>
          I am learning how to use next js and create a supper simple blog app
          that I will proceed to improve on down the line.
        </p>
      </section>
      <section className="text-lg p-px">
        <h2 className="text-3xl font-bold underline">Blog</h2>
        <ul>
          {postsData.map(({ postId, date, title }) => (
            <li className="my-2" key={postId}>
              <Link href={`/posts/${postId}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
