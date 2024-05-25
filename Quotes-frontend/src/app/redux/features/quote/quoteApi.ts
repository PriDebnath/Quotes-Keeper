import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../../utils/constants/apiUrls";
import { GetQuotesParams } from "./quoteApi.model";

const getQuotes = createAsyncThunk(
  "quote/getQuotes",
  function (params?: GetQuotesParams) {
    let { sort, quote_author, created_at } = params!;

    const queryParams = new URLSearchParams();
    if (sort) {
      queryParams.append("sort", sort);
    }
    if (quote_author) {
      queryParams.append("quote_author", quote_author);
    }
    if (created_at) {
      queryParams.append("created_at", created_at);
    }

    const url = `${API_URLS.quotes}?${queryParams.toString()}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        return data;
      })
      .catch((e) => console.log(e));
  }
);

const addQuote = createAsyncThunk(
  "quote/addQuote",
  async function (inputValue: any) {
    try {
      let response = await fetch(API_URLS.quote, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      let data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
);

const editQuote = createAsyncThunk(
  "quote/editQuote",
  async (inputValue: any) => {
    try {
      let response = await fetch(`${API_URLS.quote}/${inputValue._id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
      });
      let data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
);

const deleteQuote = createAsyncThunk(
  "quote/deleteQuote",
  async (_id: string) => {
    if (_id) {
      return fetch(`${API_URLS.quote}/${_id}`, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

export { getQuotes, addQuote, editQuote, deleteQuote };
