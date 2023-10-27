import Head from "next/head";
import Image from "next/link";
import Link from "next/link";
import { readFile, stat } from "fs/promises";
import { Button } from "@nextui-org/react";

export default function Comic({
  img,
  title,
  alt,
  prevId,
  nextId,
  hasPrevious,
  hasNext,
}) {
  return (
    <>
      <Head>
        <title>XKCD - Comics for developers</title>
        <meta name="description" content="Comics for Devs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`flex min-h-screen flex-col items-center justify-between m-auto max-w-[650px] p-24`}
      >
        <section>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[30px] text-left font-bold mb-6">{title}</h1>
          </div>

          <div>
            <div className="flex flex-row flex-wrap gap-5 justify-center items-center mb-5">
              <img alt={alt} src={img} />
              <p className="font-light">{alt}</p>
            </div>

            <div className="flex justify-between">
              {hasPrevious && (
                <Link href={`/comic/${prevId}`}>
                  <Button className="font-bold">⬅️ Previous</Button>
                </Link>
              )}
              {hasNext && (
                <Link href={`/comic/${nextId}`}>
                  <Button className="font-bold">Next ➡️</Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2500" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf-8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      prevId,
      nextId,
      hasPrevious,
      hasNext,
    },
  };
}
