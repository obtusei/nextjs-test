import React from "react";

async function getPost(id: number) {
  try {
    const getData = await fetch(
      `${process.env.BACKEND_URL}/wp-json/wp/v2/posts/${id}`,
      {
        next: {
          revalidate: 20,
        },
      }
    );
    if (!getData.ok) throw new Error("ERRORR");
    const data = await getData.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function Post({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  return (
    <div className="p-10">
      <h1 className="text-3xl">{post.title.rendered}</h1>
      <div
        className="text-gray-300"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}

export default Post;
