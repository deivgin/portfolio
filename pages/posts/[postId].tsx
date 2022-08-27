import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getPostsIds, getPostData } from "../../utils/posts";
import utilStyles from "../../styles/utils.module.css";

export const getStaticPaths = () => ({
  paths: getPostsIds(),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: {
    postData: await getPostData(params.postId),
  },
});

export default function Post({ postData }) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
