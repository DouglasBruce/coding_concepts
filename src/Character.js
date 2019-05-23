import React, { Component } from 'react';
import character from './images/character.svg';
import { relative } from 'path';

class Character extends Component{

    constructor(props) {
        super(props);
        this.state = {
          position: {
              x: 1,
              y: 1
          },
          positionOffset:{
              top: -408,
              left: -153
          },
          moves: 0
        };
        this.colorToCollect = this.props.chessBoardRef.props.config.primaryColor;
        this.dotsToCollect = this.props.chessBoardRef.dotsToCollect;
    }

    checkPlayerPos() {
        if (this.dotsToCollect.length > 0) {
            for (let i = 0; i < this.dotsToCollect.length; i++) {
                if(this.state.position.x == this.dotsToCollect[i].position.x && this.state.position.y == this.dotsToCollect[i].position.y) {
                    document.getElementById(this.dotsToCollect[i].index).style.visibility = "hidden";
                    this.dotsToCollect.splice(i, 1);
                    this.checkIfPlayerHasWon();
                }
            }
        }
    }

    checkIfPlayerHasWon() {
        if(this.dotsToCollect.length <= 0) {
            console.log("Congrats! You collected all the coins in " + this.state.moves + " moves.");
        }
    }
    
    moveForward(){
        this.state.moves++;
        if (this.state.position.y != 8) {
            this.state.position.y++;
            this.state.positionOffset.top += 51;
            this.setState(this.state);
            this.checkPlayerPos();
        } else {
            this.resetPos();
        }
    }

    moveBack(){
        this.state.moves++;
        if (this.state.position.y != 1) {
            this.state.position.y--;
            this.state.positionOffset.top -= 51;
            this.setState(this.state);
            this.checkPlayerPos();
        } else {
            this.resetPos();
        }
    }

    moveLeft(){
        this.state.moves++;
        if (this.state.position.x != 1) {
            this.state.position.x--;
            this.state.positionOffset.left -= 51;
            this.setState(this.state);
            this.checkPlayerPos();
        } else {
            this.resetPos();
        }
    }

    moveRight(){
        this.state.moves++;
        if (this.state.position.x != 8) {
            this.state.position.x++;
            this.state.positionOffset.left += 51;
            this.setState(this.state);
            this.checkPlayerPos();
        } else {
            this.resetPos();
        }
    }

    resetPos() {
        this.state.moves++;
        this.state.position.y = 1;
        this.state.position.x = 1;
        this.state.positionOffset.top = -408;
        this.state.positionOffset.left = -153;
        this.setState(this.state);
    }

    render(){
        var style = {
            margin: "0",
            position: "relative",
            left: this.state.positionOffset.left.toString().concat("px"),
            top: this.state.positionOffset.top.toString().concat("px")
        };

        return(
            <img src={character} alt="character" width="50px" id="character" style={style} />
        );
    }
}

export default Character;