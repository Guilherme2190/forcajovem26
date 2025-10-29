form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    telefone: document.getElementById("telefone").value,
  };

  try {
    const response = await fetch("/.netlify/functions/inscricao", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = "obrigado.html"; // redireciona após sucesso
    } else {
      alert("Erro ao enviar: " + result.error);
    }
  } catch (error) {
    alert("Erro de conexão: " + error.message);
  }
});
