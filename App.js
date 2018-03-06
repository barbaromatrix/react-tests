import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Card = (props) => {
  return (
  	<div key={props.id}>
      <img width="100" src={props.avatar_url} />
      <div>{props.name}</div>
      <div>{props.company}</div>
    </div>
	);
};

const CardList = (props) => {
	return (
  	<div>
  	  {
      	props.cards.map(card => <Card {...card} />)
      }
  	</div>
  );
};

class Form extends React.Component {
	constructor(props) {
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }
  
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.userNameInput.value}`)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
      })
  };
  
  render() {
  	return(
    	<form onSubmit={this.handleSubmit}>
    	  <input
        	ref={(input) => this.userNameInput = input}
          placeholder='Github username'
        	type="text" />
          <button type='submit'>Add card</button>
    	</form>
    );
  };
};

class App extends React.Component {
	constructor() {
  	super();
    this.state = {
    	list: [
      	{
          id: 1,
        	avatar_url: 'https://avatars0.githubusercontent.com/u/8710317?v=4',
          name: 'Matheus',
          company: 'Concrete Solutions'
        },
        {
          id: 2,
        	avatar_url: 'https://avatars0.githubusercontent.com/u/8710319?v=4',
          name: 'Someone',
          company: 'Some place'
        },
      ]
    };
    
    this.addNewCard = this.addNewCard.bind(this);
  }
  
  addNewCard = (cardInfo) => {
  	this.setState((prevState) => ({
    	list: prevState.list.concat(cardInfo)
    }));
  };
  
	render() {
  	return(
    	<div>
      	<Form onSubmit={this.addNewCard} />
    		<CardList cards={this.state.list} />
      </div>
    );
  }
};

ReactDOM.render(
	<App />,
    document.getElementById('container')
);

if (module.hot) {
  module.hot.accept();
}