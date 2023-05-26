import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const handler: Handlers<Post | null> = {
  async GET(_, ctx) {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${ctx.params.id}`,
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const post: Post = await resp.json();
    return ctx.render(post);
  },
};

export default function Home({ data }: PageProps<Post | null>) {
  return (
    <div className="min-h-screen min-w-screen bg-blue-800 text-gray-800 p-8">
      <Head>
        <title>Posts</title>
      </Head>
      <div className={"flex flex-col gap-6 items-center"}>
        <h1 className={"font-black text-gray-100 text-5xl mb-4"}>
          {data ? `POST N°${data.id}` : "NO POST!"}
        </h1>

        {data && (
          <div
            href={"/post/:id"}
            className={"bg-white flex flex-col py-6 px-8 gap-2 w-full rounded-md shadow"}
          >
            <h1 className={"font-bold text-xl"}>{data.id}</h1>
            <h1 className={"font-black text-3xl"}>
              {data.title.toUpperCase()}
            </h1>
            <h3 className={"font-normal text-gray-600 text-justify"}>
              {data.body}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
