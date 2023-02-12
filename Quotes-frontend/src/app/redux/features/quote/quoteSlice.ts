
import { createSlice } from "@reduxjs/toolkit";
import API_REQUEST_STATUS from "../../../utils/constants/apiRequestStatus";
const { IDLE, PENDING, SUCCEEDED, FAILED } = API_REQUEST_STATUS
import { getQuotes, addQuote, editQuote, deleteQuote } from "./quoteApi";

interface quoteInterFace {
  data: any,
  status: string

}

const initialState: quoteInterFace = {
  data: null,
  status: IDLE || PENDING || SUCCEEDED || FAILED
}


const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getQuotes.pending, (state, action) => {
      state.status = PENDING

    })
    builder.addCase(getQuotes.fulfilled, (state, action) => {
      state.status = SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(getQuotes.rejected, (state, action) => {
      state.status = FAILED
    })


    builder.addCase(addQuote.pending, (state, action) => {
      state.status = PENDING
    })
    builder.addCase(addQuote.fulfilled, (state, action) => {
      state.data.push(action.payload)
      state.status = SUCCEEDED
    })
    builder.addCase(addQuote.rejected, (state, action) => {
      state.status = FAILED
    })


    builder.addCase(editQuote.pending, (state, action) => {
      state.status = PENDING

    })
    builder.addCase(editQuote.fulfilled, (state, action) => {
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i]._id === action.payload._id) {
          state.data[i] = action.payload
        } else {
          state.data[i] = state.data[i]
        }

      }
      state.status = SUCCEEDED
    })
    builder.addCase(editQuote.rejected, (state, action) => {
      state.status = FAILED
    })


    builder.addCase(deleteQuote.pending, (state, action) => {
      state.status = PENDING
    })
    builder.addCase(deleteQuote.fulfilled, (state, action) => {
      state.status = SUCCEEDED
      state.data = state.data.filter((qoute: any) => qoute._id !== action.payload._id)
    })
    builder.addCase(deleteQuote.rejected, (state, action) => {
      state.status = FAILED
    })
  }
})

export default quoteSlice.reducer

export { } 
