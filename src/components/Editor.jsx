import React from "react";
import "./Editor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

export default function Editor() {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      // enter 키 눌렀을 때도 추가
      onSubmit();
    }
  };

  const onSubmit = () => {
    // 빈 문자열 추가 방지
    if (content === "") {
      contentRef.current.focus(); // 입력하라는 의미로 focus 추가
      return;
    }
    onCreate(content);
    setContent("");
  };

  return (
    <div className="Editor">
      <input ref={contentRef} value={content} onKeyDown={onKeydown} onChange={onChangeContent} placeholder="새로운 Todo..." />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}
