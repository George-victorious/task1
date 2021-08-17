import {createAsyncThunk} from "@reduxjs/toolkit";
import makeRequest from "./requestWrapper";

export const getPosts = createAsyncThunk("posts/setPosts", async () => {
  const response = await makeRequest(
    "v3/streams/contents?streamId=feed/https://www.fca.org.uk/news/rss.xml&unreadOnly=False",
    "get"
  );
  return response.data.items;
});
