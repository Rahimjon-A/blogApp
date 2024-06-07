
const Input = ({lable, state, setState, type = "text"}) => {
  return (
    <div className="form-floating mb-4">
    <input
        type={type}
        className="form-control"
        placeholder={lable}
        value={state}
        onChange={(e) => setState(e.target.value)}
    />
    <label htmlFor="floatingPassword"> {lable} </label>
</div>
  )
}

export default Input