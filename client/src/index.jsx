import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  componentWillMount() {
    console.log('will mount');
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (data) => {
        this.setState({repos: data})
      }, 
    })
    // $.ajax({
    //   method: 'GET',
    //   url: 'http://localhost:1128/repos/count',
    //   success: function(data) {
    //     console.log(data);
    //   }, 
    // })
  }

  componentDidMount() {
    console.log('did mount');
  }

  search (term) {
    console.log(`${term} was searched`);
    var data = {username: term}
    // fetch('http://localhost:1128/repos', {
    //   method: 'POST',
    //   // mode: 'no-cors',
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // }).then(function(response) {
    //   return response;
    // })
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      success: function(data) {
        console.log(data);
      },
      data,
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));