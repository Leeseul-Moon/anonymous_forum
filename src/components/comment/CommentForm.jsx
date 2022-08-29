import { Button } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { v4 } from "uuid";
import { postComment } from "../../redux/modules/commentSlice";

const CommentForm = () => {
  const { id, list } = useSelector((state) => state.comment);
  const [form, setForm] = useState({ nickname: "", password: "", content: "" });

  const dispatch = useDispatch();

  const nicknameRef = useRef();
  const passwordRef = useRef();
  const contentRef = useRef();

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    event.preventDefault();
    setForm({
      nickname: nicknameRef.current.value,
      password: passwordRef.current.value,
      content: contentRef.current.value,
    });
  };

  const handlePutComment = async () => {
    if (!form.nickname || !form.password || !form.content) {
      return alert("채워주세요.");
    }

    const newList = [...list];
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    if (newList) {
      newList.push({
        id: v4(),
        comment: form.content,
        nickname: form.nickname,
        password: form.password,
        date: `${year}년 ${month}월 ${day}일`,
      });
    } else {
      return;
    }

    await axios
      .put(`http://localhost:3001/comments/${id}`, {
        list: newList,
      })
      .then(() => {
        dispatch(postComment({ id: id, list: newList }));
        nicknameRef.current.value = "";
        passwordRef.current.value = "";
        contentRef.current.value = "";
      });
  };
  return (
    <Form>
      <DivText>
        <input
          placeholder="닉네임"
          name="nickname"
          type="text"
          ref={nicknameRef}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="비밀번호"
          ref={passwordRef}
          onChange={onChange}
        />
      </DivText>
      <DivContent>
        <textarea ref={contentRef} onChange={onChange} />
      </DivContent>

      <Button type="button" onClick={handlePutComment}>
        댓글 달기
      </Button>
    </Form>
  );
};

const Form = styled.form`
  width: 80%;
  min-width: 800px;
  max-width: 1200px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  background-color: #ddd;
  border: none;
  border-top: 3px solid blue;
  border-bottom: 3px solid blue;
  padding: 10px 0;
`;

const DivText = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
  height: 50%;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding: 0 10px;
`;

const DivContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  width: 100%;
  textarea {
    height: 100px;
    margin-left: auto;
    width: 100%;
  }
`;

export default CommentForm;
