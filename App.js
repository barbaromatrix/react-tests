import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

// Componente funcional - Stateless
const Stars = (props) => {
  return (
  	<div className='col-md-5'>
  	  {
      	_.range(props.numberOfStars).map(i =>
      		<i key={i} className="fa fa-star"></i>  
      )}
  	</div>
  );
};

const Button = (props) => {
	let button;
  switch (props.answerIsCorrect) {
  	case true:
    	button = <button className='btn btn-success'>
    	  <i className='fa fa-check'></i>
    	</button>;
    	break;
    case false:
    	button = <button className='btn btn-danger'>
    	  <i className='fa fa-times'></i>
    	</button>;
    	break;
    default:
    	button = <button 
      		className='btn' 
          disabled={props.selectedNumbers.length === 0}
          onClick={props.checkAnswer}
          >
      	=
      </button>
    	break;
  }
	return (
  	<div className='col-2'>
  	  {button}
  	</div>
  );
};

const Answer = (props) => {
	return (
  	<div className='col-md-5'>
  	  {
      	props.selectedNumbers.map((number, i) => 
          <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
        )
      }
  	</div>
  );
};

const Number = (props) => {
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }
	return (
  	<div className="card text-center">
  	  <div>
      	{
        	Number.list.map((number, index) => 
          	<span onClick={() => props.selectNumbers(number)} key={index} className={numberClassName(number)}>{number}</span>
          )
        }
  	  </div>
  	</div>
	);
};
Number.list = _.range(1,10);

class Game extends React.Component {
	constructor() {
    super();
    
    this.state = {
    	selectedNumbers: [],
      randomNumberOfStars: 1+ Math.floor(Math.random() * 9),
      answerIsCorrect: null
    };
    
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  
  selectNumber(clickedNumber) {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
    	this.setState((prevState) => ({
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    }
  }

  unselectNumber(clickedNumber) {
  	this.setState((prevState) => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }

  checkAnswer(checkNumber) {
    this.setState((prevState) => ({
        answerIsCorrect: prevState.selectedNumbers.reduce((prev, actual) => prev + actual, 0) === prevState.randomNumberOfStars
    }));
  }
  
	render(){
    const { randomNumberOfStars, selectedNumbers, answerIsCorrect } = this.state;

  	return (
    	<div>
    	  <h3>Play nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars}/>
          <Button answerIsCorrect={answerIsCorrect} checkAnswer={this.checkAnswer} selectedNumbers={selectedNumbers} />
          <Answer unselectNumber={this.unselectNumber} selectedNumbers={selectedNumbers} />
        </div>
        <br />
        <Number selectNumbers={this.selectNumber} selectedNumbers={selectedNumbers} />
    	</div>
    );
  }
}

class App extends React.Component {
	render(){
  	return (
    	<div>
    	  <Game />
    	</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));