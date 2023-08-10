import type { Book } from '../types/BookListType';

let data: string | Book[] | undefined;

export function useData(): string | Book[] {
  // dataがまだ無ければローディングを開始する
  if (data === undefined) {
    // throw fetchData1().then((d) => (data = d));
    throw fetchData2().then((d) => {
      console.log(`d`, d);
      data = d
    });
  }
  return data;
}

// sleep関数
// const sleep = (waitTime:number) => new Promise( resolve => setTimeout(resolve, waitTime) );

// async function fetchData1(): Promise<string> {
//   await sleep(1000);
//   return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
// }

async function fetchData2(): Promise<string | Book[]> {
  try {
    const response = await fetch(
      '/books'
    );
    const resJson = await response.json();
    console.log({resJson});

    // 複数ある場合は複数書く
    // const postResponse = await fetch(
    //   'https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id
    // );
    // const posts = await postResponse.json();
    // console.log(posts);
    return resJson;

  } catch (err) {
    console.log('fetchData2: There was an error', err);
    return `fetchData2: There was an error ${err}`
  }
}