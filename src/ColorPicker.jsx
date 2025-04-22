
function ColorPicker(props) {

    function handleChange(event) {
        const color = event.target.value;
        props.onChange(color); // call App's handleColorChange()
    }
    return (
        <p><input type="color" onChange={handleChange} /> &nbsp; Choose a color.</p>
    )
}

export default ColorPicker;