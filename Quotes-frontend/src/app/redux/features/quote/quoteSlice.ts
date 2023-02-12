
import { createSlice } from "@reduxjs/toolkit";
import API_REQUEST_STATUS from "../../../utils/constants/apiRequestStatus";
const { IDLE, PENDING, SUCCEEDED, FAILED } = API_REQUEST_STATUS
import { getQuotes, addQuote, editQuote , deleteQuote } from "./quoteApi";

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
      console.log("pending")
      state.status = PENDING

    })
    builder.addCase(getQuotes.fulfilled, (state, action) => {
      // console.log("fulfilled", { state }, { action })
      state.status = SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(getQuotes.rejected, (state, action) => {
      console.log("rejected")
      state.status = FAILED
    })


    builder.addCase(addQuote.pending, (state, action) => {
      console.log("pending")
      state.status = PENDING
    })
    builder.addCase(addQuote.fulfilled, (state, action) => {
      console.log("fulfilled", { state }, { action })
      // console.log('add action succe',action)
       state.data.push(action.payload)
      state.status = SUCCEEDED
    })
    builder.addCase(addQuote.rejected, (state, action) => {
      console.log("rejected")
      state.status = FAILED
    })


    builder.addCase(editQuote.pending, (state, action) => {
      console.log("pending")
      state.status = PENDING

          })
    builder.addCase(editQuote.fulfilled, (state, action) => {
      console.log("fulfilled", { state }, { action })
      console.log('edit action succe',action)
     for (let i = 0; i <  state.data.length; i++) {
      if (state.data[i]._id === action.payload._id) {
        state.data[i]=action.payload
      }else{
        state.data[i]=state.data[i]
      }
      
     }
      state.status = SUCCEEDED
    })
    builder.addCase(editQuote.rejected, (state, action) => {
      console.log("rejected")
       state.status = FAILED
    })


    builder.addCase(deleteQuote.pending, (state, action) => {
      console.log("pending")
      state.status = PENDING
    })
    builder.addCase(deleteQuote.fulfilled, (state, action) => {
      console.log('delete action succe',action)

      console.log("fulfilled", { state }, { action })
      state.status = SUCCEEDED
      state.data = state.data.filter((qoute:any)=>qoute._id!==action.payload._id)
    })
    builder.addCase(deleteQuote.rejected, (state, action) => {
      console.log("rejected")
      state.status = FAILED
    })
  }
})

export default quoteSlice.reducer

export { } 
