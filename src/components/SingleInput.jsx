function SingleInput({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>

      <input
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SingleInput;