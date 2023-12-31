import React, { useState, Fragment } from "react";
import './styles.css'

export default function Autocomplete (suggestions) {
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')
  suggestions = suggestions.suggestions
  
  const onChange = e => {
    setUserInput(e.currentTarget.value);
    
    setFilteredSuggestions(suggestions.filter(
      suggestion => 
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    ))
    
      setActiveSuggestion(0)
      setShowSuggestions(true)
  };
  
  const onClick = e => {
      setActiveSuggestion(0)
      setFilteredSuggestions([])
      setShowSuggestions(false)
      setUserInput(e.currentTarget.innerText)
  };
  
  const onKeyDown = e => {
    // const { activeSuggestion, filteredSuggestions } = this.state;
    
    if (e.keyCode === 13 || e.keyCode === 9) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1)
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if(activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  };
    
    let suggestionListComponent;
    
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionListComponent = (
          <div class="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    
  return (
    <Fragment>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionListComponent}
    </Fragment>
  );
}
