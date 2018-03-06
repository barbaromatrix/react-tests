import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	render() {
  	return(
    	<div>
      	<p>This is just the master file.</p>
        <p>To check the other examples, switch the branches</p>
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