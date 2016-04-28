import React from 'react';
import ReactDOM from 'react-dom';
import SubscribeButton from './components/SubscribeButton/SubscribeButton';

class App extends React.Component {
    render() {
        return (<div><SubscribeButton /></div>);
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
