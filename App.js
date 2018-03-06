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
        )
      }
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
      {
        props.selectedNumbers.map((number, i) => 
          <span key={i}>{number}</span>
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
            <span key={index} className={numberClassName(number)}>{number}</span>
          )
        }
      </div>
    </div>
  );
};
Number.list = _.range(1, 10);

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedNumbers: []
    };
  }

  render() {
    return (
      <div>
        <h3>Play nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
        <Number selectedNumbers={this.state.selectedNumbers}/>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));