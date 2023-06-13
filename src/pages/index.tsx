import BingoField from '@/components/BingoField'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bingo Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Bingo Builder</h1>
        <BingoField />
      </main>
    </>
  )
}