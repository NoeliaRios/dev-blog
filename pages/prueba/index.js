export default function Prueba({ description }) {
  return <p>Hola, mi desc en github es {description}</p>;
}

export async function getStaticProps() {
  const data = await fetch("https://api.github.com/users/NoeliaRios");
  const json = await data.json();

  return {
    props: {
      description: json.bio,
    },
    revalidate: 23,
  };
}
