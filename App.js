import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const Stars = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);
  return (
  	<div className='col-md-5'>
  	  {
      	_.range(numberOfStars).map(i =>
      		<i key={i} className="fa fa-star"></i>  
      )}
  	</div>
  );
};

const Button = (props) => {
	return (
  	<div className='col-md-2'>
  	  <button>=</button>
  	</div>
  );
};

const Answer = (props) => {
	return (
  	<div className='col-md-5'>
  	  <span>5</span>
      <span>6</span>
  	</div>
  );
};

const Number = (props) => {
	return (
  	<div className="card text-center">
  	  <div>
      	{
        	Number.list.map((number, index) => 
          	<span key={index}>{number}</span>
          )
        }
  	    <span className='used'>1</span>
  	  </div>
  	</div>
	);
};
Number.list = _.range(1,10);

class Game extends React.Component {
	render(){
  	return (
    	<div>
    	  <h3>Play nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Number />
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