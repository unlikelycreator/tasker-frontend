import React from "react";
import { useState } from "react";
import {AiFillDelete} from "react-icons/ai"
const Ta = ({ text, selectedoptions, deleteTA}) => {
  const [checkedOptions, setCheckedOptions] = useState([]);

  const handleOptionChange = (optionText) => {
    if (checkedOptions.includes(optionText)) {
      setCheckedOptions(checkedOptions.filter((text) => text !== optionText));
    } else {
      setCheckedOptions([...checkedOptions, optionText]);
    }
  };

  return (
    <div className="ta-task">
      <div className="ta-main">
        <div className="ta-text"><b>{text}</b></div>
        <div className="selectedoptions">
          {selectedoptions.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={option.text}
                onChange={() => handleOptionChange(option.text)}
                checked={checkedOptions.includes(option.text)}
              />
              <label>{option.text}</label>
            </div>
          ))}
        </div>
        <AiFillDelete className='icon' onClick={deleteTA} />
      </div>
    </div>
  );
};

export default Ta;