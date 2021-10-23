import React from "react";

//aa shabab

class Square extends React.Component{
constructor(props){
    super(props)
    this.state={board:[
        {id:0,value:'',isClicked:false},
        {id:1,value:'',isClicked:false},
        {id:2,value:'',isClicked:false},
        {id:3,value:'',isClicked:false},
        {id:4,value:'',isClicked:false},
        {id:5,value:'',isClicked:false},
        {id:6,value:'',isClicked:false},
        {id:7,value:'',isClicked:false},
        {id:8,value:'',isClicked:false},
        ],isXorO:'X',thereIsWinner:false,winnerIs:'',drawCounter:0,isDraw:false,history:[]}

}
calculateWinner=(squares)=>{
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
            return squares[a].value;
            
          }
        }
        return null;
}

handleClick=(e)=>{
    if(this.state.thereIsWinner||this.state.isDraw) return
    this.setState({drawCounter:this.state.drawCounter+1})

    if(!this.state.thereIsWinner){
      let boards=([...this.state.history]);
         boards.push(this.state.board);
        this.setState({history:boards})
        const id =parseInt(e.currentTarget.id); 
        const newBoard=[...this.state.board]

 // get the pressed square
    const cell = newBoard.find(cell =>cell.id === id );
    // exit the function
    if(cell.isClicked) return;
     cell.isClicked = true;

 // check isClicked property
 newBoard[id].value=this.state.isXorO
 this.setState({board:newBoard,isXorO:this.state.isXorO ==='X'?'O':'X'})

 const theWinner=this.calculateWinner(this.state.board)
 if(theWinner){
     this.setState({thereIsWinner:true})
      this.setState({winnerIs:theWinner})
 
 }
 else if(this.state.drawCounter>=8){
   this.setState({isDraw:true})
    }
}
}
onClickItem=(e)=>{


}

render(){
    return(
        <div>
        <div className='box'>
        <div className='row'>
       <div className='boxes' id='0' onClick={this.handleClick}>{this.state.board[0].value}</div>
       <div className='boxes' id='1' onClick={this.handleClick}>{this.state.board[1].value}</div>
       <div className='boxes' id='2' onClick={this.handleClick}>{this.state.board[2].value}</div>
       </div>
       <div className='row'>
       <div className='boxes' id='3' onClick={this.handleClick}>{this.state.board[3].value}</div>
       <div className='boxes' id='4' onClick={this.handleClick}>{this.state.board[4].value}</div>
       <div className='boxes' id='5' onClick={this.handleClick}>{this.state.board[5].value}</div>
       </div>
       <div className='row'>
       <div className='boxes' id='6' onClick={this.handleClick}>{this.state.board[6].value}</div>
       <div className='boxes' id='7' onClick={this.handleClick}>{this.state.board[7].value}</div>
       <div className='boxes' id='8' onClick={this.handleClick}>{this.state.board[8].value}</div>
       </div>
     </div>
     {!this.state.thereIsWinner? (<div>player is: {this.state.isXorO}</div>) : (<div style={{display: 'flex', flexDirection: 'column'}}>winner is: {this.state.winnerIs}<button className='reload-btn' onClick={()=>window.location.reload()}>Play Again</button></div>)}
    {(this.state.drawCounter >= 8 && this.state.isDraw) ? (<div><span>Draw:</span><button className='reload-btn' onClick={()=>window.location.reload()}>Play Again</button></div>) : ''}
   <div>
    <ul>
     {this.state.history.map((_,idx)=>{
        return <li key={idx} id={idx} onClick={(e)=>{this.onClickItem(e)}}>{idx}</li>

     })}
    </ul>
   </div>
     </div>
     
    )
}
}
export default Square;