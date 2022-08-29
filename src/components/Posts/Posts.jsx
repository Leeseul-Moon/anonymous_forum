import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Posts = ({ post, postNum }) => {
  const { id, nickname, password, date, title, content, commtents } = post;
  const navigate = useNavigate();
  const goToDeatil = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <PostContainer onClick={goToDeatil}>
      <PostId>{postNum}</PostId>
      <PostTitle>{title}</PostTitle>
      <PostNickname>{nickname}</PostNickname>
      <PostDate>{date}</PostDate>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  /* background-color: beige; */
  box-sizing: border-box;
  padding: 1em;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
`;

const PostId = styled.div`
  flex: 1 1 5%;
  margin-right: 0.5em;
`;
const PostTitle = styled.div`
  flex: 1 1 70%;
`;
const PostNickname = styled.div`
  flex: 1 1 10%;
  text-align: right;
  margin-right: 1em;
`;
const PostDate = styled.div`
  flex: 1 1 15%;
  text-align: center;
`;

export default Posts;
