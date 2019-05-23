import React, { Component } from 'react';
import AlphabeticIndex from './AlphabeticIndex'
import TableComponent from './TableComponent';
import Character from './Character';

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.width = 8;
        this.height = 8;
        this.dotsToCollect = [];
    }
    
    render() {
        return (
          <div>
            <TableComponent data = {this.generateTable()} id={this.props.id} ref={this.tableRef} />
            <Character ref={this.props.characterRef} chessBoardRef={this} />
          </div>
        );
    }

    directionClick(e){
        this.characterRef.current.moveForward();
    }
  
    generateTable() {
      var tableData = {
        columns: this.generateHeaders(),
        rows: [
          [ "1", "" , "", "", "", "", "", "", "" ],
          [ "2", "" , "", "", "", "", "", "", "" ],
          [ "3", "" , "", "", "", "", "", "", "" ],
          [ "4", "" , "", "", "", "", "", "", "" ],
          [ "5", "" , "", "", "", "", "", "", "" ],
          [ "6", "" , "", "", "", "", "", "", "" ],
          [ "7", "" , "", "", "", "", "", "", "" ],
          [ "8", "" , "", "", "", "", "", "", "" ]
        ]
      };

      let alphabeticIndex = new AlphabeticIndex();
      let index = 0;
      Object.keys(this.props.config.setup).forEach(coord => {          
        var col = alphabeticIndex.getCharIndex(coord[0]);
        var row = +coord[1];
        var color = this.props.config.setup[coord];
        tableData.rows[row - 1][col + 1] = <span id={"span"+index} style={{color: color}}>&#9679;</span>;
        if (color == this.props.config.primaryColor) {
          this.dotsToCollect.push({position: {x: col + 1, y: row}, color: color, index: "span"+index});
        }
        index++;
      });
      
      return tableData;
    }

    generateHeaders() {
        let alphabeticIndex = new AlphabeticIndex();
        return [" "].concat(alphabeticIndex.getIndexArray(this.width));
    }
}

export default ChessBoard;
