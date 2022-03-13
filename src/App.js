import "./App.css";
import { createWorker } from "tesseract.js";
import { useState } from "react";

function App() {
  const [image, setImage] = useState();
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const select = e => {
    setImage(e.target.files[0]);
    setGeneratedText("");
  };

  const convert = async () => {
    setLoading(true);
    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text }
    } = await worker.recognize(image);
    setGeneratedText(text);
    setLoading(false);
    await worker.terminate();
  };

  return (
    <div className="container mt-5">
      <h1>Image to Text</h1>
      <input type="file" accept="image/*" onChange={select} />

      <div className="d-flex justify-content-between mt-4">
        <div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              style={{ height: 400, width: 400 }}
            />
          )}
        </div>
        <div className="mx-3">
          {image && (
            <button className="btn btn-primary" onClick={convert}>
              {loading ? "Converting..." : "Convert"}
            </button>
          )}
        </div>
        <div>
          {generatedText && image && (
            <p style={{ padding: 10, border: "1px solid #0000ff" }}>
              {generatedText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
