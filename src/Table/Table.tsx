import React, {useCallback, useEffect} from "react";
import {Table, Column, HeaderCell, Cell} from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import {setPage} from "../storage/postsReducer";
import {useDispatch, useSelector} from "react-redux";
import "../styles/table.scss";
import {getPosts} from "../functions/requests";
import TablePagination from "./TablePagination";
import {CellProps} from "rsuite-table/lib/Cell";
import {getPageNumber, getPagesCount, getPostsOnPage} from "../storage/selectors";

const DateCell = ({rowData, ...props}: CellProps) => (
  <Cell {...props}>
    {rowData?.[props.datekey]
      ? new Date(rowData[props.datekey]).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : ""}
  </Cell>
);

const KeywordsCell = ({rowData, ...props}: any) => (
  <Cell {...props}>
    {rowData.keywords.map((keyword: string) => (
      <div className="keyword" key={keyword}>
        {keyword}
      </div>
    ))}
  </Cell>
);

const TableComponent = () => {
  const pageNumber = useSelector(getPageNumber);
  const posts = useSelector(getPostsOnPage);
  const pagesCount = useSelector(getPagesCount);

  const dispatch = useDispatch();
  const dispatchPageNumber = useCallback(
    (number: number) => dispatch(setPage(number)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Table
        height={300}
        hover
        headerHeight={50}
        locale={{}}
        minHeight={50}
        rowHeight={100}
        rowKey={"posts"}
        loading={!posts.length}
        data={posts}
      >
        <Column fixed resizable>
          <HeaderCell width={100} depth={1}>
            Id
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="id" />
        </Column>

        <Column fixed resizable>
          <HeaderCell width={100} depth={1}>
            Fingerprint
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="fingerprint" />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            CanonicalUrl
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="canonicalUrl" />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Author
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="author" />
        </Column>

        <Column width={120} resizable>
          <HeaderCell width={100} depth={1}>
            Crawled
          </HeaderCell>
          <DateCell width={100} depth={1} datekey={"crawled"} />
        </Column>

        <Column width={150} resizable>
          <HeaderCell width={100} depth={1}>
            Keywords
          </HeaderCell>
          <KeywordsCell dataKey="keywords" />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Language
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="language" />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Origin
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="origin">
            {(rowData) => rowData.title}
          </Cell>
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Origin id
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="originId" />
        </Column>

        <Column width={120} resizable>
          <HeaderCell width={100} depth={1}>
            Published
          </HeaderCell>
          <DateCell width={100} depth={1} datekey={"published"} />
        </Column>

        <Column width={120} resizable>
          <HeaderCell width={100} depth={1}>
            Recrawled
          </HeaderCell>
          <DateCell width={100} depth={1} datekey={"recrawled"} />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Summary
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="title" />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Title
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="title" />
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Unread
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="unread">
            {(rowData) => (rowData.unread ? "Yes" : "No")}
          </Cell>
        </Column>

        <Column resizable>
          <HeaderCell width={100} depth={1}>
            Update count
          </HeaderCell>
          <Cell width={100} depth={1} dataKey="updateCount">
            {(rowData) => rowData.updateCount ?? 0}
          </Cell>
        </Column>
      </Table>
      <TablePagination
        current={pageNumber}
        length={pagesCount}
        setPage={dispatchPageNumber}
      />
    </>
  );
};

export default TableComponent;
