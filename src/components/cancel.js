import {React} from "react";
import "../App.css";
import { Link } from "react-router-dom";
import logo from "../images/CutTrap.png"
function Cancel(){
    
    return(<div>
            <div>

                <img src={logo} style={{width:"50px"}}/>
                <Link to="/">Home</Link>

                <h1>
                    You have canelled.
                    You can go to the main page
                </h1>
            </div>
    </div>)
}

export default Cancel;