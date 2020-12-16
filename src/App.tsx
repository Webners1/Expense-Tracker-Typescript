import React, { useState, useReducer, ChangeEvent, useEffect } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const ACTIONS = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
};
const Reducer = (item: any[], action: Action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...item, NewItem(action.payload)];
    case ACTIONS.REMOVE_TODO:
      return [...item.filter((val: {}) => val !== action.payload)];
    default:
      return item;
  }
};

interface Payload {
  payload: Payload;
}

const NewItem: NewItem = (pay) => {
  let { text, price, id } = pay;

  return { text: text, price: price, id: id };
};
export default function App() {
  let [item, dispatch] = useReducer(Reducer, []);
  let [text, setText] = useState("");
  let [items, setItems] = useState([]);
  let [price, setPrice] = useState(0);
  let [total, setTotal] = useState(0);
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpense, setTotalExpense] = useState(0);
  
  useEffect(() => {
   UpdateData()
  }, [item]);
  const UpdateData=()=>{
     const itemsBag = item;
     console.log(itemsBag);
     const amount = itemsBag?.map((items) => items.price);
     const total = amount.reduce((acc, prev) => (acc += prev), 0);
     setTotal(total);
     const income = amount
       ?.filter((item) => item > 0)
       .reduce((acc, prev) => (acc += prev), 0)
       .toFixed(2);
     setTotalIncome(income);
     console.log(income);
     const expense = amount
       ?.filter((item) => item < 0)
       .reduce((acc, prev) => (acc += prev) * -1, 0)
       .toFixed(2);
     setTotalExpense(expense);
     localStorage.setItem("item", JSON.stringify(item));
  }
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (price !== 0 && text.trim() !== "") {
      const newItem = {
        id: Date.now(),
        text: text,
        price: price,
      };

      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: newItem,
      });
      setPrice(0);
      setText("");
    }
  };
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    e.preventDefault();
    const pri = Number(e.target.value);
    setPrice(pri);
  };

  const deleteFunc: Deletes = (payload) => {
    let i = 0;
    for (i = 0; i < item.length; i++) {
      if (item[i].id === payload.id) {
        console.log("payload", payload.id);
        console.log("payload", item[i].id);
        dispatch({ type: ACTIONS.REMOVE_TODO, payload: payload });
      }
    }
  };
  return (
    <div className="main">
      <h2 style={{ marginBottom: "1px", textAlign: "right" }}>Your Balance</h2>

      <h1 style={{ margin: "1px", textAlign: "right" }}>{`$${total}`}</h1>

      <Paper elevation={2} style={{ display: "flex", minWidth: "300px" }}>
        <span
          style={{
            
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
            float: "left",
            marginRight: "auto",
            marginLeft: "10px",
          }}
        >
          <p style={{ fontSize: "24px" }}>Income</p>
          <p
            style={{ color: "green", fontSize: "30px" }}
          >{`$${totalIncome}`}</p>
        </span>
        <span
          style={{
            
            fontSize: "30px",
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
            marginLeft: "auto",
            float: "right",
            marginRight: "10px",
          }}
        >
          <p style={{ fontSize: "24px" }}>Expense</p>
          <p style={{ color: "red", fontSize: "30px" }}>{`$${totalExpense}`}</p>
        </span>
      </Paper>
      <div>
        <h1
          style={{
            textDecoration: "underline",
            width: "100%",
          }}
        >
          History
        </h1>

        {item?.map((value: any) => (
          <div>
            <Item
              state={value.price > 0 ? true : false}
              Data={value}
              Del={deleteFunc}
            />
          </div>
        ))}
      </div>
      <h1
        style={{
          fontSize: "26px",
          fontWeight: 700,
          
          textDecoration: "underline",
          width: "300px",
          textAlign: "center",
        }}
      >
        Add new transaction
      </h1>
      <p
        style={{
          width: "300px",
          margin: "0px",
          fontSize: "22px",
          
          fontWeight: 700,
        }}
      >
        Text
      </p>
      <input className="input" type="text" value={text} onChange={handleText} />
      <p
        style={{
          width: "300px",
          margin: "0px",
          fontSize: "22px",
          
          fontWeight: 700,
        }}
      >
        Price
      </p>

      <input
        className="input"
        type="number"
        value={price}
        onChange={handlePrice}
      />
      <button className="btn" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}
interface itemProp {
  Data: data;
  Del: Deletes;
  state: boolean;
}
const Item: React.FC<itemProp> = ({ Data, Del, state }) => {
  const { text, price, id } = Data;
  return (
    <Paper className={state ? "income" : "expense"}>
      <span
        style={{
          fontSize: "25px",
          fontWeight: 600,
          textTransform: "uppercase",
          marginLeft: "15px",
          marginRight: "auto",
          float: "left",
        }}
      >
        {text}
      </span>
      <span className={state ? "inc" : "exp"}>
        {state ? `$${price}.00` : `-$${Math.abs(price)}.00`}
      </span>
      <FontAwesomeIcon
        className="delete"
        icon={faTrash}
        onClick={() => Del(Data)}
      />
    </Paper>
  );
};
