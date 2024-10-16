function StartScreen({numQuestions,dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the react quiz!</h2>
            <h3>{numQuestions} question to test your React mastery</h3>
            <button onClick={()=>dispatch({type:"start"})} className="btn btn-ui">let's start</button>
        </div>
    )
}

export default StartScreen
