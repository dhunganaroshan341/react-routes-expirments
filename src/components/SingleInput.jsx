import { useState } from "react";

function SingleInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
      />

      <p>You typed: {name}</p>
    </div>
  );
}

export default SingleInput;