import React, { useEffect } from "react";
import { useState } from "react";
import Options from "./Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const SingleChoice = (props) => {
  const [options, setOptions] = useState(props.options);
  const [label, setLabel] = useState(props.label);
 
  var count = options.length;

  const handleAddOption = () => {
    setOptions([...options, `Option ${count + 1}`]);
  };

  const handleOptionChange = (e) => {
    var optionArray = options.slice();
    optionArray[e.target.id] = e.target.value;
    setOptions(optionArray);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const handleDeleteField = (id) => {
    setOptions((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "SingleCorrect",
      label: label,
      options: options,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-border-style"
        placeholder="Type your question here"
        value={label}
        onChange={handleLabelChange}
      />

      <div id="options">
        {options.map((op, index) => {
          return (
            <div key={index} className="element-input">
              <input type="radio" value={op} name={props.id} />
              <span> </span>
              <label>
                <input
                  className="element-border-style"
                  value={op}
                  id={index}
                  placeholder="Enter your option"
                  onChange={handleOptionChange}
                />
              </label>
              <button
                    key={index}
                    id={index}
                    onClick={() => handleDeleteField(op.id)}
                    className="span newSpan">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
            </div>
          );
        })}

        <button className="button-60" onClick={handleAddOption}>
          Add Option
        </button>
        <Options/>
      </div>
    </div>
  );
};

export default SingleChoice;