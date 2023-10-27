// import { Header } from "../components/Header";
// import { Button } from "@nextui-org/react";
// import { Inter } from "next/font/google";
import fs from "fs/promises";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>XKCD - Comics for developers</title>
        <meta name="description" content="Comics for Devs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <section>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[35px] text-left font-bold mb-10">
              Welcome to XKCD Comics!
            </h1>
          </div>

          <div>
            <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
              {latestComics.map((comic) => (
                <div
                  key={comic.id}
                  className="bg-white flex flex-col justify-center items-center p-5"
                >
                  <h2 className="text-[18px] font-semibold mb-2">
                    {comic.title}
                  </h2>

                  <Link href={`./comic/${comic.id}`}>
                    <Image
                      alt={comic.alt}
                      width={250}
                      height={100}
                      src={comic.img}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf-8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
