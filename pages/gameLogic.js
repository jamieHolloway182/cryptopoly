
export default function GameLogic() {
    
    //create 2d array
    var gameList = new Array(5);
    for(var i=0; i< gameArray.length; i++) {
        gameArray[i] = new Array(5);
    }

    //checking win function
    const checkWin = (xPos, yPos, currentPlayer) => {
        //check the places arounf the center cell
        for (i = -1; i<1; i++){
            for (j = -1; j < 1; j++){
                //skip the center cell
                if ((i==0) && (j==0)) 
                {
                    continue;
                }
                //in case a cell around is found
                else if (((xPos+i) && (yPos+j))==currentPlayer.color){
                    
                    var match = true
                    while (count<3 || !match){
                        if((xPos+k+i) && (yPos+k+j)!=player.color){
                            match=false
                        }
                    }
                    if (count==3 && match) return true;
                    else return false;

                }
            }
        } return false;
    }

    //check if empty
    const validateMove = (i, j) => {
        if (gameList[i][j] == null) return true;
        else return false;
    }

    const setPiece = (i, j) => {
        gameList[i][j] = player.color;
    }
    
    //get player input (i, j)
    return(
        <div>The game</div>
    )
}