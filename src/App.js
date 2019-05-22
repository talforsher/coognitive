import React from 'react';
import {createStore} from 'redux';
import logo from './autoddit.png';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

const storage = window.localStorage.app;

const INCREMENT = 'INCREMENT';
const DECREASE = 'DECREASE';
const ADD_BOX = 'ADD_BOX';

function incrementAction(index) {
  return {
    type: INCREMENT,
    index
  };

}

function decreaseAction(index) {
  return{
    type: DECREASE,
    index
  };
}

function addBox(index) {
  return{
    type: ADD_BOX,
    index
  };
}

const initialState = [storage]

function addReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
    return state.map((box, index) => {
      console.log(index,action.index, box)
      if (index === action.index) {
        return Object.assign({}, box, {
          votes:100
        });
      }
      return box
    })
    case 'DECREASE':
    return state.map((box, index) => {
      if (index === action.index) {
        return Object.assign({}, box, {
          votes: 1
        })
      }
      return box
    })
    case 'ADD_BOX':
    return [...state, {votes: action.index}]
    default:
      return state;
  }
}


export const store = createStore(addReducer);

library.add(faArrowUp, faArrowDown)

class App extends React.Component {
  render() {
    const Boxes = (props)=>(
      <div className="box">
        <div className="box-left">
          <div className="arrows">
            <FontAwesomeIcon onClick={() => incrementAction(props.id)} icon="arrow-up" />
            <p>{votes}</p>
            <FontAwesomeIcon onClick={() => decreaseAction(props.id)} icon="arrow-down" />
          </div>
          <img src={props.image} alt={props.title}/>
        </div>
        <div className="box-right">
          <h4>{props.title}</h4>
          <p>submitted at {props.time} by {props.userName}</p>
          <h5>{props.comments} comments</h5>
        </div>
      </div>
    )
    
    const paste = (title="unknown", time="unknown", userName="unknown", comments="unknown", votes="unknown", image=logo) =>
      ({title, time, userName, comments, votes, image})
    
    const data = [
      paste("visit this website", "9:38", "Adi Krief", 1, 1000, "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/44344439_10215626559229956_3592928155297382400_n.jpg?_nc_cat=106&_nc_ht=scontent.ftlv5-1.fna&oh=35f93b6122b1d1b45efc0aac30eddb77&oe=5D57E35E"),
      paste("wow", "10:15", "Me", 12, 44 ),
      paste("wow", "10:15", "Me", 12, 44 ),
      paste("wow", "10:15", "Me", 12, 44 ),
    ]
    
    const BoxList = () => (
      <div>
    
        {data.map((box, i) =>(addBox(box), 
          <Boxes key={i} id={i} title={box.title} time = {box.time} userName={box.userName} comments={box.comments} votes={box.votes} image={box.image} />
        )
        )}
         {console.log(store.getState())}
        </div>
    )
    const { votes, incrementAction, decreaseAction, addBox } = this.props;
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <div className="App-content">
          <BoxList />
        </div>
      </main>
      <footer className="App-footer">
        <h2>Hiring?<a href="https://talforsher.com"> I'm Tal Forsher</a></h2>
      </footer>
    </div>
    );
  }
}


const mapStateToProps = (state) => ({
  votes: state.votes
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: (index) => dispatch(incrementAction(index)),
  decreaseAction: (index) => dispatch(decreaseAction(index)),
  addBox: (index) => dispatch(addBox(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
