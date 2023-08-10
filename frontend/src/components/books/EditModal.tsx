// import { useState } from "react";
import { useState } from 'react';
import type { Book } from '../../types/BookListType';
import './EditModal.scss';
// ライブラリ
import axios from 'axios';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  modalBook: Book;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const EditModal = (props: Props) => {
  console.log(`render EditModal`);
  // props
  const {show, setShow, modalBook, setBooks} = props;

  // onInput State
  const [inputData, setInputData] = useState<Book>(modalBook);

  // 入力管理
  const onInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`exe onInput`);
    const target = event.target;
    switch (target.name){
      case 'modalTitle':
        setInputData({
          id: modalBook.id,
          title: target.value,
          author: modalBook.author,
          overview: modalBook.overview
        })
        break;
      case 'modalAuthor':
        setInputData({
          id: modalBook.id,
          title: modalBook.title,
          author: target.value,
          overview: modalBook.overview
        })
        break;
      case 'modalOverview':
        setInputData({
          id: modalBook.id,
          title: modalBook.title,
          author: modalBook.author,
          overview: target.value
        })
        break;
      default:
        break;
    }
    console.log(`inputData`,inputData);
  }

  // モーダルを閉じる
  const closeModal = () => {
    setShow(!show);
    // 入力値をリセットする
    setInputData({
      id: null,
      title: '',
      author: '',
      overview: ''
    });
  }
  // 子要素から親要素への伝播を防ぐ
  const stopChildClick = (event:React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
  }

  // データの更新
  const saveBook = () => {
    console.log(`exe saveBook`);
    // DBを更新する
    try {
      const payload = inputData;
      axios.put('/books',payload).then(() => {
        // 更新された書籍情報を作成
        const updatedBook = inputData;

        // books ステートを更新して更新された書籍情報を反映
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
      })
    } catch (error) {
      console.error(`saveBook Error:`,error)

    }

    // DBなしの確認に使用
    // const updatedBook = inputData;
    // // //Todo:作成したbookをstate上のbooksに戻す。
    // setBooks(prevBooks =>
    //   prevBooks.map(book =>
    //     book.id === updatedBook.id ? updatedBook : book
    //   )
    // );

    closeModal();
  }

  return(
    <>
    {show &&
    <div id="overlay" onClick={closeModal}>
      <div id="content" onClick={stopChildClick}>
        <h2>情報の編集</h2>
        <table>
          <tbody>
          <tr>
              <td>タイトル</td>
              <td>:</td>
              <td><input type="text" name="modalTitle" value={inputData.title? inputData.title :modalBook.title} onChange={onInput} /></td>
            </tr>
            <tr>
              <td>著者</td>
              <td>:</td>
              <td><input type="text" name="modalAuthor" value={inputData.author? inputData.author:modalBook.author} onChange={onInput} /></td>
            </tr>
            <tr>
              <td>概要</td>
              <td>:</td>
              <td><textarea rows={3} cols={50} name="modalOverview" value={inputData.overview?inputData.overview:modalBook.overview} onChange={onInput} /></td>
            </tr>
          </tbody>
        </table>
        <div className='buttons'>
          <button onClick={saveBook} >更新</button>
          <button onClick={closeModal} >閉じる</button>
        </div>
      </div>
    </div>
    }
    </>
  )
}