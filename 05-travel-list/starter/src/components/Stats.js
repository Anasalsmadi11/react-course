export default 
function Stats({ items }) {
  if (!items.length) //items.length =0 is falsy value => !0 is truthy value
    return (
      <p className="stats">
        <em>start adding items to your list🚀</em>
      </p>
    );
    // with the return statement above if the cond is achieved then it wont render the calculation below nor will see the component below

  const numItems = items.length;
  let count = 0;
  items.map((item) => (item.packed ? count++ : count));
  // or
  // const packedItems= items.filter(item => item.packed).length
  const percentage = Math.round((count / numItems) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {percentage == 100
          ? "you've got everything! Ready to go✈️"
          : `🎒you have ${numItems} item in your list, and you already packed ${count}
        and the percentage: ${percentage}%`}
      </em>
    </footer>
  );
}