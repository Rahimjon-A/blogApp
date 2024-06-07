import { useSelector } from "react-redux"
import Input from "./Input"
import TextArea from "./TextArea"


const Form = ({description, setDescription, body, setBody, title, setTitle, formSubmit}) => {
    const { isLoading } = useSelector(state => state.article)
  return (
    <form onSubmit={formSubmit} >
    <Input lable={`Title`} state={title} setState={setTitle} />
    <TextArea
        lable={`Add Description`}
        state={description}
        setState={setDescription}
        height={`100px`}
    />
    <TextArea
        lable={`Your Article`}
        state={body}
        setState={setBody}
        height={`300px`}
    />
    <button
        disabled={isLoading}
        className="btn btn-primary w-100 py-2 "
        type="submit"
    >
        { isLoading ? "Loading..." : "Create Article" }
    </button>
</form>
  )
}

export default Form