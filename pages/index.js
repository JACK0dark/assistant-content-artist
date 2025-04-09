import Head from "next/head";
import Assistant from "../components/Assistant";

export default function Home() {
  return (
    <>
      <Head>
        <title>Asistente de Artistas</title>
      </Head>
      <main className="min-h-screen bg-gray-50 p-4">
        <Assistant />
      </main>
    </>
  );
}
