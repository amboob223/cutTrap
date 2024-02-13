import {React} from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Navbar(){
    
    
    return(<div>
            <nav>
                <ul>
                    <li>
                        <Link to="/sign">signUp</Link>
                     
                    </li>
                </ul>
            </nav>

    </div>)
}

export default Navbar;