import React from 'react';
import { connect, Provider } from 'react-redux';
import {createStore} from 'redux';
import logo from './autoddit.png';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Content from './content'
library.add(faArrowUp, faArrowDown)


const INCREMENT = 'INCREMENT';
const DECREASE = 'DECREASE';

function decreaseAction() {
  return{
    type: DECREASE,
  };
}

function incrementAction() {
  return {
    type: INCREMENT,
  };
}

const initialState = {
  value: 0,
};

function addReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREASE':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

const store = createStore(addReducer);

var Boxes = (props)=>(
  <div className="box">
    <div className="box-left">
      <div className="arrows">
        <FontAwesomeIcon icon="arrow-up" />
        <p>{props.score}</p>
        <FontAwesomeIcon icon="arrow-down" />
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

var paste = (title="unknown", time="unknown", userName="unknown", comments="unknown", score="unknown", image=logo) =>
  ({title, time, userName, comments, score, image})

const data = [
  paste("visit this website", "9:38", "Adi Krief", 1, 1000, "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/44344439_10215626559229956_3592928155297382400_n.jpg?_nc_cat=106&_nc_ht=scontent.ftlv5-1.fna&oh=35f93b6122b1d1b45efc0aac30eddb77&oe=5D57E35E"),
  paste("wow", "10:15", "Me", 12, 44, logo),
  paste("wow", "10:15", "Me", 12, 44, logo),
  paste("wow", "10:15", "Me", 12, 44, "https://image.shutterstock.com/image-photo/panoramic-view-nice-green-hill-260nw-248910718.jpg"),
]

var BoxList = () => (
  <React.Fragment>
    {data.map((box, i) => 
    <Boxes key={i} title={box.title} time = {box.time} userName={box.userName} comments={box.comments} score={box.score} image={box.image} />
    )}
    </React.Fragment>
)

function Content() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

const mapStateToProps = (state) => ({
  value: state.value,
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Content);
