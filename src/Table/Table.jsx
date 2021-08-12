import React, { useEffect } from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import axios from "axios";
import { setPosts, setPage } from "../storage/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";


const PaginationButtonsComponent = ({ length, setPage }) => {
  let buttons = [];
  for(let i = 0; i < length; i++) {
    buttons.push(
      <button key={'tablePage_'+i} onClick={()=>setPage(i)} >
        {i + 1}
      </button>
    );
  };

  return (
    <PaginationButtons>
      {buttons}
    </PaginationButtons>
  );
};

const DateCell = ({ rowData, ...props }) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric'};
  return (
    <Cell {...props}>
      {
        rowData[props.datekey]
          ? new Date(rowData[props.datekey]).toLocaleString('en-US', options)
          : ''
      }
    </Cell>
)};

const KeywordsCell = ({ rowData, ...props }) => {
  const color = '#' + Math.floor(Math.random()*16777215).toString(16);
  return (
    <Cell {...props}>
      {
        rowData.keywords.map(keyword => <Keyword key={keyword} clr={color}>{keyword}</Keyword>)
      }
    </Cell>
)};

const TableComponent = () => {
  const pageNumber = useSelector(state => state.posts.pageNumber);
  const posts = useSelector(state => state.posts.postList.slice(pageNumber * 5).slice(0,5));
  const pagesCount = useSelector(state => Math.ceil(state.posts.postList.length / 5));

  const dispatch = useDispatch();
  const dispatchPosts = res => dispatch(setPosts(res.data.items));
  const dispatchPageNumber = number => dispatch(setPage(number));

  useEffect(() => {
    const URL = 'v3/streams/contents?streamId=feed/https://www.fca.org.uk/news/rss.xml&unreadOnly=False';
    axios.get(URL).then(dispatchPosts);
  },[]);
console.log(posts[0])
  return (
    <>
      <Table loading={!posts.length} data={posts} >
          <Column fixed resizable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

        <Column fixed resizable>
          <HeaderCell>Fingerprint</HeaderCell>
          <Cell dataKey="fingerprint" />
        </Column>

        <Column resizable>
          <HeaderCell>CanonicalUrl</HeaderCell>
          <Cell dataKey="canonicalUrl" />
        </Column>

        <Column resizable>
          <HeaderCell>Author</HeaderCell>
          <Cell dataKey="author" />
        </Column>
        
        <Column resizable>
          <HeaderCell>Crawled</HeaderCell>
          <DateCell datekey={'crawled'} />
        </Column>

        <Column resizable>
          <HeaderCell>Keywords</HeaderCell>
          <KeywordsCell dataKey="keywords" />
        </Column>

        <Column resizable>
          <HeaderCell>Language</HeaderCell>
          <Cell dataKey="language" />
        </Column>

        <Column resizable>
          <HeaderCell>Origin</HeaderCell>
          <Cell dataKey="origin">
            {rowData => rowData.title}
          </Cell>
        </Column>

        <Column resizable>
          <HeaderCell>Origin id</HeaderCell>
          <Cell dataKey="originId" />
        </Column>

        <Column resizable>
          <HeaderCell>Published</HeaderCell>
          <DateCell datekey={'published'} />
        </Column>

        <Column resizable>
          <HeaderCell>Recrawled</HeaderCell>
          <DateCell datekey={'recrawled'} />
        </Column>

        <Column resizable>
          <HeaderCell>Summary</HeaderCell>
          <Cell dataKey='title' />
        </Column>

        <Column resizable>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey='title' />
        </Column>

        <Column resizable>
          <HeaderCell>Unread</HeaderCell>
          <Cell dataKey='unread'>
            {rowData => rowData.unread ? 'Yes' : 'No'}
          </Cell>
        </Column>

        <Column resizable>
          <HeaderCell>Update count</HeaderCell>
          <Cell dataKey='updateCount'>
            {rowData => rowData.updateCount ?? 0}
          </Cell>
        </Column>
      </Table>
      <PaginationButtonsComponent length={pagesCount} setPage={dispatchPageNumber} />
    </>
  )
};

const PaginationButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Keyword = styled.div`
  width: min-content;
  padding: 5px 10px;
  border-radius: 20px;
  background: ${props=>props.clr};
`;

export default TableComponent;
