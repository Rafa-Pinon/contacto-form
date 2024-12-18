import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un FormData con los valores del formulario
    const formData = new FormData();
    formData.append("form-name", "contact");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setStatus(
          "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto."
        );
        setStatusType("success");
      } else {
        setStatus("Hubo un error al enviar tu mensaje. Intenta de nuevo.");
        setStatusType("error");
      }
    } catch (error) {
      setStatus("Hubo un error al enviar tu mensaje. Intenta de nuevo.");
      setStatusType("error");
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="App">
      <h1>Formulario de contacto</h1>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />

        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mensaje:
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {status && <p className={statusType}>{status}</p>}
    </div>
  );
}

export default App;
