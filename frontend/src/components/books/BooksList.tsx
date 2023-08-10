import React, {
  memo,
  useState,
  // useEffect,
  Suspense,
} from "react"
// 型を参照する
import type { Book } from '../../types/BookListType';
//Todo: css ファイル (BookList.css) などのインポートを行う。
import './BooksList.scss';
// 外部コンポーネント
import { EditModal } from './EditModal';
// hooks
import { useData } from "../../hooks/UseData";
// ライブラリ
import axios from "axios";

// パーツコンポーネント
const Title = memo((props: {title:string}) => {
  console.log(`render Title`);
  return(
    <h1>{props.title}</h1>
  )
});

// メインの関数コンポート
export const BookList = () =>{
  console.log(`render BookList`);

  // データを取得する
  const data = useData();
  // Todo: エラーの場合の処理を追加する
  const initData = data as Book[];

  // 入力情報の状態
  const [inputData, setInputData] = useState<Book>({
    title: '',
    author:'',
    overview: '',
  });

  // 保持データの状態
  //  -> DBなしでの確認に使用
  // const [books, setBooks] = useState<Book[]>([
  //   {id: 1, title:"坊っちゃん", author:"夏目漱石", overview:"ぼっちゃんが先生になって頑張ったけど結局ダメでした。"}
  //   ,{id: 2,title:"吾輩は猫である", author:"夏目漱石", overview:"吾輩は猫ですが失恋してから人間の前足の使い方が不思議に思えました。"}
  //   ,{id: 3, title:"走れメロス", author:"太宰治", overview:"激怒して走ったら結構速かったので友人と殴り合いました。"}
  // ]);
  // 初期値をdataから取得する
  const [books, setBooks] = useState<Book[]>(initData);

  // モーダルウィンドウの状態
  const [showModal, setShowModal] = useState<boolean>(false);

  // モーダルの渡すData
  const [modalBook, setModalBook] = useState<Book>({
    id: null,
    title: '',
    author:'',
    overview: '',
  })

  //モーダルウィンドウの表示切り替え
  const toggleModal = () => {
    console.log(`exe toggleModal`);
    setShowModal(!showModal);
  }

  // 入力値をsetStateで保持する
  function onInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    console.log(`exe onInput`);
    //Todo:setStateを利用して入力値をstateに保持
    const target = event.target;
    switch (target.name){
      case 'title':
        setInputData({
          // id: inputData.id,
          title: target.value,
          author: inputData.author,
          overview: inputData.overview
        })
        break;
      case 'author':
        setInputData({
          // id: inputData.id,
          title: inputData.title,
          author: target.value,
          overview: inputData.overview
        })
        break;
      case 'overview':
        setInputData({
          // id: inputData.id,
          title: inputData.title,
          author: inputData.author,
          overview: target.value
        })
        break;
      default:
        break;
    }
    console.log(`inputData`,inputData);
  }

  //新規追加ボタン処理
  function addBook(){
    console.log(`exe addBook`);
    // ToDo: inputDataのそれぞれが空の場合、エラーメッセージを表示する

    // axios でデータベースを書き換える
    try {
      const payload = inputData;
      axios.post("/books", payload)
      .then(json => {
          console.log(`axios POST:`,json);

        // 新しい書籍情報を作成
        const newBookData = {
          ...payload,
          id: json.data.id // assuming the response contains the new book's ID
        };

        // books ステートを更新
        setBooks(prevBooks => [...prevBooks, newBookData]);
        // 入力値をクリアする
        setInputData({
          title: "",
          author: "",
          overview: ""
        });
        // 入力欄の値を空にする
        const bookListInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.bookListInput input');
        bookListInput.forEach((input:HTMLInputElement) => {
          input.value = '';
        })
        const bookListTextarea: HTMLTextAreaElement = document.querySelector('.bookListInput textarea')!; //null アサーション注意
        bookListTextarea.value = '';
      })
    } catch (error) {
      console.error("Error adding book:", error);
    }


    //Todo:stateで保持している入力値を利用し、 state の books に 1 件追加 -> DBなしでの確認に使用
    // const newBooks = [...books, inputData];
    // setBooks(newBooks);
  }

  // 削除ボタン処理
  const deleteBook = async (event: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    console.log(`exe deleteBook`,event.target);

    //削除処理を追加
    const target = event.target as HTMLElement;
    const parent = target.parentNode;
    const ancestor = parent?.parentElement;
    // 追加
    const id = ancestor?.querySelector('.id')?.textContent as string;

    try {
      const payload = {
        data: {
          id: Number(id)
        }
      }
      // axios でデータベースから削除
      await axios.delete(`/books`,payload);
      // books ステートを更新して削除した書籍を除外
      setBooks(prevBooks => prevBooks.filter(book => book.id !== Number(id)));
    } catch (error) {
      console.error(`deleteBook Error:`,error)
    }
    //  -> DBなしでの確認に使用
    // if(ancestor) {
    //   ancestor.style.display = 'none'; // UI上は非表示だがデータは消えていない
    // }
  }

  // modal制御
  const modalBookEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const { books, modalTitle, modalAuthor, modalOverview } = props;
    // 値を取得してmodalBookにセットする
    const target = event.target as HTMLElement;
    const parent = target.parentNode;
    const ancestor = parent?.parentNode;
    const id = ancestor?.querySelector('.id')?.textContent as string;

    // バケツリレーする
    // Todo: ReduxかContext化するかする
    const toModal = books.find(target => target.id ? target.id === Number(id): 0);// Todo: id が undefined の時の処理がNGなので直す
    toModal && setModalBook(toModal);
    toggleModal();
  }

  return(
    <>
    <Title title={`React✕TypeScript✕Prisma✕Express`}/>
    <div className="bookListMain">
      <div className="bookListHeader">
        <table className="bookListInput">
          <tbody>
            <tr>
              <td>タイトル</td>
              <td>:</td>
              <td><input type="text" name="title" onChange={onInput} /></td>
            </tr>
            <tr>
              <td>著者</td>
              <td>:</td>
              <td><input type="text" name="author" onChange={onInput} /></td>
            </tr>
            <tr>
              <td>概要</td>
              <td>:</td>
              <td><textarea rows={3} cols={50} name="overview" onChange={onInput} /></td>
            </tr>
          </tbody>
        </table>
        <button onClick={addBook}>追加</button>
      </div>
      <div className="bookListBody">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>タイトル</th>
                <th>著者</th>
                <th>概要</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={<tr><td>Loading...</td></tr>}>
                {books.map((book,index) => {
                  console.log(`render books.map`);

                  return(
                    <tr className="bookrow" key={index}>
                      <td className="id">{book.id}</td>
                      <td className="title">{book.title}</td>
                      <td className="author">{book.author}</td>
                      <td className="overview">{book.overview}</td>
                      <td className="action">
                        <button onClick={modalBookEdit}>編集</button>
                        <button onClick={deleteBook}>削除</button>
                      </td>
                    </tr>
                  )
                })}
              </Suspense>
            </tbody>
          </table>
      </div>
    </div>
    <EditModal show={showModal} setShow={setShowModal} modalBook={modalBook} setBooks={setBooks} />
    </>
  )
}