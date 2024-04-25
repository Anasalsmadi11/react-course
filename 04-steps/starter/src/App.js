import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App(){
  return(
    <>
    <Step/>
    <Step/>
    </>
  )
}
function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const[test] = useState({name: "anas"})

  function next() {
    // setStep(step<3 ?step +1:step)
    // if(step <3) setStep(step +1)
    if (step < 3) setStep((s) => s + 1); // vid 65, s is just a parameter of the step

    // BAD PRACTICE:
    // test.name= "Kyoko"
  }
  const previous = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  console.log(previous); // thats why arrow funcitons in onClick are not considered as called, like previouse()

  return (
    <div>
      {/* here the difference between <> and <div> is that with <> the root element becomes have two elements here which are button and div but if we put <div> the root element becomes have one element, check it in inspect */}
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              onClick={previous}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              onClick={() => next()}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>{" "}
            {/* arrow function is redundunt you shouldnt do this */}
          </div>
        </div>
      )}
    </div>
  );
}


