import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

import "./Options.css";

const Options = (id) => {
  const newId = uuidv4();
 
  return (
    <>
      <div className="otherOptions">
        <div className="mandatoryBtnMain">
          <div className="switch-toggle">
            <input type="checkbox" id={newId} />
            <label htmlFor={newId}></label>
          </div>
          <div className="mandatoryTxt">Mandatory</div>
        </div>
        <div className="crudOptions">
          <button className="newSpan crudButtons">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="newSpan crudButtons">
            <FontAwesomeIcon icon={faCopy} />
          </button>
          
          {/* <button  className="newSpan crudButtons">
            <FontAwesomeIcon icon={faTrash} />
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Options;
