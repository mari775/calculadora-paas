import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Página principal com formulário da calculadora
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <title>Calculadora</title>
      </head>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Calculadora Simples</h1>

        <form action="/calcular" method="POST">
          <label>Número A:</label><br>
          <input name="a" type="number" required><br><br>

          <label>Número B:</label><br>
          <input name="b" type="number" required><br><br>

          <label>Operação:</label><br>
          <select name="op">
            <option value="soma">Somar</option>
            <option value="sub">Subtrair</option>
            <option value="mult">Multiplicar</option>
            <option value="div">Dividir</option>
          </select><br><br>

          <button type="submit">Calcular</button>
        </form>
      </body>
    </html>
  `);
});

// Rota que calcula
app.post("/calcular", (req: any, res: Response) => {
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  const op = req.body.op;

  let resultado;

  switch (op) {
    case "soma":
      resultado = a + b;
      break;
    case "sub":
      resultado = a - b;
      break;
    case "mult":
      resultado = a * b;
      break;
    case "div":
      if (b === 0) return res.send("Erro: divisão por zero!");
      resultado = a / b;
      break;
    default:
      return res.send("Operação inválida!");
  }

  res.send(`
    <h1>Resultado</h1>
    <p>Operação: ${op}</p>
    <p>Resultado: <strong>${resultado}</strong></p>
    <a href="/">Voltar</a>
  `);
});

// Subindo o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});