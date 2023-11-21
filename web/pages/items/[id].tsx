import React from 'react';

type TItem = {
  id: string;
  createdAt: string;
  text: string;
};

const ItemPage = ({ item }: { item: TItem }) => {
  return (
    <article>
      <h1>Item # {item.id}</h1>
      <p>{item.text}</p>
    </article>
  );
};

// @ts-ignore
export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8000/${id}`);
  const item = await res.json();

  return {
    props: {
      item,
    },
  };
}

export async function getStaticPaths() {
  const paths = Array.from({ length: 50 }, (_, i) => ({
    params: { id: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false, // If a page is not in the generated paths, show a 404.
  };
}

export default ItemPage;
