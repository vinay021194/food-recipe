import React, { useState ,useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const[dark,setMode]=useState(false )
 

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };
  const onReset = e=>{
    console.log("data reset");
     e.preventDefault();
     setRecipes([]);
      setQuery("");
      setAlert("");
      
      
  };

  return (
    <div className={dark? "APPLICATION dark-mode": "APPLICATION"}>
    <div className="App">
      <label className="switch">
    <input type="checkbox"
            onChange={()=>setMode(!dark)}/>
    <span className="slider round"></span>
    </label>
      <div className='logo'>
        <img src={process.env.PUBLIC_URL+"logos.png"} alt="my logo"/>
      </div>
     {/* <h2>{dark?"dark mode in on":'light mode is on'}</h2> */}
      <form onSubmit={onSubmit} 
             onReset={onReset}
       className="search-form">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Search Recipes "
        />
        <input type="reset" value="Clear" />
        <input type="submit" value="Search" />
        
      </form>
     
      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
    </div>
    
  );
}

export default App;
