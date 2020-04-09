import React, { Component } from 'react'
import seedrandom from 'seedrandom'

import MazeGenerator from './components/MazeGenerator.js'
import Pathfinding from './components/Pathfinding'

import './App.css';

export class App extends Component {
  state = {
    seed: '',
    rows: 10,
    columns: 10,
    showProcess: true,
    startGen: true,
    win: false,
    grid: null
  }
  setGrid = grid => {
    this.setState({...this.state, grid})
  }
  setWin = () => {
    this.setState({...this.state, win: true})
  }
  renderWin = () => {
    if(this.state.win) {
      return <p>You win!</p>
    }
  }
  generateMaze = () => {
    if(this.state.startGen) {
      return <MazeGenerator 
            setGrid={this.setGrid.bind(this)} 
            setWin={this.setWin}
            seed={this.state.seed}
            columns={this.state.columns} 
            rows={this.state.rows} 
            showProcess={this.state.showProcess}/>
    }
  }
  startPathfinding = () => {
    if(this.state.grid !== null) {
      return <Pathfinding grid={this.state.grid} rows={this.state.rows} columns={this.state.columns}/>
    }
  }
  generate = e => {
    e.preventDefault()
    this.setState({...this.state, startGen: true})
  }
  restart = e => {
    e.preventDefault()
    this.setState({...this.state, startGen: false, win: false, grid: null})
    this.timeout = setTimeout(() => {
      this.generate(e)
    }, 50)
  }
  
  render() {
    return (
      <div>
        <form>
          <input type='number' placeholder='rows' value={this.state.rows} onChange={e => this.setState({...this.state, rows: e.target.value})}/>
          <input type='number' placeholder='columns' value={this.state.columns} onChange={e => this.setState({...this.state, columns: e.target.value})}/>
          <input type='text' placeholder='seed' value={this.state.seed} onChange={e => this.setState({...this.state, seed: e.target.value})}/>
          <input type='submit' value='Generate Maze' onClick={e => this.generate(e)}/>
          <input type='submit' value='Restart' onClick={e => this.restart(e)}/>
          <br />
          <input type='checkbox' checked={this.state.showProcess} style={{float: 'left'}} onChange={e => this.setState({...this.state, showProcess: e.target.checked})}/>
          <p style={{clear: 'left', fontSize: '13px'}}>Show Process</p>
        </form>
        {this.generateMaze()}
        {this.startPathfinding()}
        {this.renderWin()}
      </div>
    )
  }
}

export default App
