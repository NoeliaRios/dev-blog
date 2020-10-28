import Link from "next/link";

export default function Articles({ posts }) {
  return (
    <>
      <p>
        {posts.map((blog, key) => {
          return (
            <>
              <Link href={`/articles/${blog.id}`}>
                <ul>
                  <li key={key}>{blog.title} </li>
                  <li key={key}>{blog.description}</li>
                </ul>
              </Link>
            </>
          );
        })}
      </p>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
  const json = await data.json();

  return {
    props: {
      posts: json,
    },
    revalidate: 23,
  };
}

// export default function Articles({ title }) {
//   return <p>{title}</p>;
// }

// export async function getStaticProps() {
//   const data = await fetch("https://dev.to/api/articles?tag=javascript&top=1");
//   const json = await data.json();

//   return {
//     props: {
//       title: json.title,
//     },
//     revalidate: 23,
//   };
// }
