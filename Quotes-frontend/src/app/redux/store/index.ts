
import { configureStore } from "@reduxjs/toolkit"
import quoteSlice from "../features/quote/quoteSlice"






const store = configureStore({
  reducer: {
    quote: quoteSlice
  }
})

export default store 