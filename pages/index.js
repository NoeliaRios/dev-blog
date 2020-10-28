// import styles from "./styles/Home.module.css";
import styles from "./Home.module.scss";
import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Home({ posts }) {
  const [inputSearch, setInputSearch] = useState("");

  function handleSearch(e) {
    setInputSearch(e.target.value);
  }
  console.log(inputSearch);

  function dataInput() {
    console.log(inputSearch);
  }

  return (
    <div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Search..."
          onChange={handleSearch}
        />
        <div onClick={dataInput}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>
      </div>
      <section className={styles.container}>
        {posts.map((post, key) => {
          return (
            <div className={styles.crayonWrapper}>
              <Link href={`/articles/${post.id}`}>
                <a key={key} className={styles.aLink}>
                  <div className={styles.crayonsStory}>
                    <h3>{post.title}</h3>
                    <h5>{post.description}</h5>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    `https://dev.to/api/articles?tag=${inputSearch}&top=1`
  );
  const json = await data.json();

  return {
    props: {
      posts: json,
    },
    revalidate: 23,
  };
}
