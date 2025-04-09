import Head from "next/head";
import Assistant from "../components/Assistant";

export default function Home() {
  return (
    <>
      <Head>
        <title>Asistente de Artistas</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
      <main className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex justify-center items-center">
        <Assistant />
      </main>
    </>
  );
}
