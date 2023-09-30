import Link from "next/link";

async function getPosts() {
  const res = await fetch(`${process.env.BACKEND_URL}/wp-json/wp/v2/posts`, {
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) throw new Error("ERRORR");
  return await res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-10">
      <h1 className="text-4xl">Posts</h1>
      <br />
      <div className="flex flex-col gap-4">
        {posts.map((post: any) => {
          return (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="border-2 border-gray-500 p-4 rounded-xl"
            >
              <h2 className="text-xl font-semibold">{post.title.rendered}</h2>
              <div
                className="text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
