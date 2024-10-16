function FinishedScreen({points, maxPoints, highScore,dispatch}) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if(percentage ===100) emoji="🥇"
  if(percentage >= 80 && percentage <100) emoji="🎉"
  if(percentage >=50 && percentage< 80) emoji="🤔"
  if(percentage >=0 && percentage <50) emoji="😐"
  if(percentage ===0) emoji="😵"
  return (
   <>
   <p className="result">
      you scored <strong>{points} </strong> out of {maxPoints} ({Math.ceil(percentage)}%) {emoji}
    </p>
    <p className="highscore">highScore {highScore} points</p>
    <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>re-Start</button>
   </>
  );
}

export default FinishedScreen;
