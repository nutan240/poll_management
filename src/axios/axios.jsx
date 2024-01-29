import axios from "axios";


const Instance = axios.create({
    baseURL: "https://secure-refuge-14993.herokuapp.com/ ",

  });
  
  export default Instance;