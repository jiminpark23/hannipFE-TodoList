import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const mockData = [
  {
    id: 0, // 데이터를 구분하기 위한 id
    isDone: false, // 체크박스
    content: "React 공부하기", // todo
    date: new Date().getTime(), // 날짜 타임스탬프
  },
  {
    id: 1,
    isDone: false,
    content: "샤워하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "드럼학원 가기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3); // mockData와 겹치지 않게 3번부터 설정

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List />
    </div>
  );
}

export default App;
