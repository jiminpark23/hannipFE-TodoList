import "./App.css";
import { useState, useRef, useReducer, useCallback, createContext, useMemo, memo } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); // mockData와 겹치지 않게 3번부터 설정

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  // 생성된 후 다시 재생성 되지 않도록
  // 컴포넌트가 리렌더링될 때마다 다시 생성되지 않도록 방지하기 위해 useMemo로 감싸줌
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
