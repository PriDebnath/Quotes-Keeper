import React, { useState, useEffect } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useSelector, useDispatch } from "react-redux/es/exports";
import { getQuotes, addQuote, editQuote, deleteQuote } from "../redux/features/quote/quoteApi";
import API_REQUEST_STATUS from "../utils/constants/apiRequestStatus";
import AddEditQuote from "./AddEditQuote";
const { IDLE, PENDING, SUCCEEDED, FAILED } = API_REQUEST_STATUS




function Quote() {
  const dispatch: any = useDispatch()
  const quote = useSelector((globalState: any) => globalState.quote);
  const [openAddEditQuote, setOpenAddEditQuote] = useState(false);
  let [quotes, setQuotes]: any = useState([]);
  let [editableQuote, setEditableQuote]: any = useState(null);

  let [inputValue, setInputValue]: any = useState({
    quote_author: "",
    quote_text: "",
    _id: "",
    created_at: 0,
    modified_at: 0,
  });

  const handleClickOpenAddEditQuote = () => {
    setEditableQuote(null)
    setOpenAddEditQuote(!openAddEditQuote);
  };

  useEffect(() => {
    dispatch(getQuotes())
  }, [])


  useEffect(() => {
    if (quote.status == PENDING) {
      // code 
    }
    if (quote.status == SUCCEEDED) {
      setQuotes(quote.data)
    }
    if (quote.status == FAILED) {
      // code 
    }

  }, [quote]);


  let handleInputs = (event: any) => {
    let inputName = event.target.name;
    let inputVal = event.target.value;
    setInputValue({ ...inputValue, [inputName]: inputVal });
  };


  let handleSubmit = async (e: any) => {
    if (inputValue.quote_author && inputValue.quote_text) {
      e.preventDefault();

      dispatch(addQuote(inputValue))
      handleClickOpenAddEditQuote()
      setInputValue({
        quote_author: "",
        quote_text: "",
        _id: "",
      });
      window.scroll()
    } else {
      alert("Fill input fields properly")
    }
  };



  let handleClickEditQuote = async (id: string) => {

    let editedQuote = quotes.find((todo: any) => {
      return todo._id === id;
    });

    setEditableQuote(editedQuote)

    setInputValue({
      quote_author: editedQuote.quote_author,
      quote_text: editedQuote.quote_text,
      _id: editedQuote._id,
    });

    setOpenAddEditQuote(true)
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    dispatch(editQuote(inputValue))
    setInputValue({
      quote_author: "",
      quote_text: "",
      _id: "",
    });
    handleClickOpenAddEditQuote()
  };


  const handleDeleteQuote = (_id: string) => {
    dispatch(deleteQuote(_id))
  }


  return (
    <div>
      <div className="blueCircle"></div>
      <div className="redCircle"></div>
      <div className="greenCircle"></div>
      <div className="yellowCircle"></div>

      <h2>Quotes Keeper</h2>

      <div className="quoteList">

        {quotes?.length > 0 ?
          (quotes.map((quote: any, i: number) => {
            let { quote_author, _id, quote_text } = quote;

            return (
              <div key={i} className="quoteUi">

                <li className="text"> ' {quote_text} , </li>
                <li className="title"> - {quote_author}</li>

                <button
                  className="icon editIcon"
                  onClick={() => {
                    handleClickEditQuote(_id);
                  }}
                >
                  <EditRoundedIcon sx={{
                    color: "yellow"

                  }} />
                </button>
                <button
                  className="icon deleteIcon"
                  onClick={() => {
                    handleDeleteQuote(_id);
                  }}
                >
                  <DeleteForeverRoundedIcon sx={{
                    color: "red"

                  }} />
                </button>


              </div>

            );
          })
          ) : <></>
        }
      </div>

      <AddEditQuote
        inputValue={inputValue}
        handleInputs={handleInputs}
        openAddEditQuote={openAddEditQuote}
        handleSubmit={handleSubmit}
        editableTodo={editableQuote}
        handleEdit={handleEdit}
        setOpenAddEditQuote={setOpenAddEditQuote}
        handleClickOpenAddEditQuote={handleClickOpenAddEditQuote} />

      <div className={`showHideFormButtom ${openAddEditQuote ? "hideFormBtton" : ""}`}
        onClick={handleClickOpenAddEditQuote}>
        <AddRoundedIcon sx={{ fontSize: "2.5rem", color: "white" }} />
      </div>

    </div>
  );
}

export default Quote;
