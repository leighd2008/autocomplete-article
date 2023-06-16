import React, { useState } from 'react';
import { useForm } from "react-hook-form";


function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { register, handleSubmit } = useForm();
  
  
  // *************** For Autocomplete ***************
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')
  
  const suggestions = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    
  
  const onChange = e => {
    setUserInput(e.currentTarget.value)
    
    setFilteredSuggestions(suggestions.filter(
      suggestion => 
        suggestion.toLowerCase().startsWith(e.currentTarget.value.toLowerCase())
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
          <ul className="suggestions">
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
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    
  // *************** For Autocomplete ***************
    
  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  
  const canSave = [firstName, lastName].every(Boolean)
  
  const onSubmit = async (data) => {
    
    if (canSave) {
      console.log(data)
    }
  }

  return (
    <section className="section">
      <div className="centered-view">
        <section className="centered-container">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
              <div className="header">New Client Information</div>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="form-control"
                    required={true}
                    id="firstName"
                    name="firstName"
                    onChange={onFirstNameChanged}
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="last name" >Last Name</label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className="form-control"
                    required={true}
                    id="lastName"
                    name="lastName"
                    onChange={onLastNameChanged}
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="usState" >State</label>
                  <input
                    {...register('usState')}
                    type="text"
                    className="form-control"
                    id="usState"
                    name="usState"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    />
                    {suggestionListComponent}
                </div>
                <button type="submit" className="btn">Add Client</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  )
}
export default App;