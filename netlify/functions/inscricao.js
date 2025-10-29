const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método não permitido" };
  }

  try {
    // Recebe os dados do formulário
    const formData = JSON.parse(event.body);

    // URL do seu Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbziz8QcbiLNaxhLMAf1BpHIE_2DMNobwNzZP-9g_wWaBAcWmSZrWR9iGckAHhgElJAb/exec";

    // Envia para o Google Apps Script
    const params = new URLSearchParams();
    for (const key in formData) {
      params.append(key, formData[key]);
    }

    const response = await fetch(scriptURL, {
      method: "POST",
      body: params
    });

    const data = await response.json();

    // Retorna para o site sem problemas de CORS
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
