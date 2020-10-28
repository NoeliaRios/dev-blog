import ReactMarkdown from "react-markdown";
import styles from "./Articles.module.scss";

export default function Post({ title, tags, content }) {
  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.titleH1}>{title}</h1>
        <ul className={styles.ulHashtags}>
          {tags &&
            tags.map((tag, key) => {
              return (
                <li key={key} className={styles.liHashtag}>
                  #{tag}
                </li>
              );
            })}
        </ul>
        {/* <p dangerouslySetInnerHTML={{ __html: content }}></p> */}
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
  const json = await data.json();

  // const paths = json.map(path => `/articulo/${path.id}`)

  const paths = json.map((path) => {
    return `/articles/${path.id}`;
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const data = await fetch(`https://dev.to/api/articles/${id}`);
  const json = await data.json();

  return {
    props: {
      title: json.title,
      tags: json.tags,
      content: json.body_markdown,
      id: params.id,
    },
    revalidate: 3600,
  };
}
