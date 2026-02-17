# 🐳 Rodando Node.js com Docker (Sem Instalar Node na Máquina)

Neste guia vamos:

- Usar uma imagem oficial do Node
- Mapear a pasta do host para dentro do container
- Criar um servidor Express
- Criar um Dockerfile para compartilhar a aplicação
- Entender a diferença entre Bind Mount e COPY

---

# 📦 1️⃣ Executando Node Dentro de um Container

Dentro da pasta do seu projeto (ex: `/node`), execute:

```bash
docker run --rm -it \
  -v $(pwd):/usr/src/app \
  -p 3000:3000 \
  node:15 \
  bash
```

---

## 🔍 O que significa cada parâmetro?

- `--rm` → Remove o container ao sair
- `-it` → Modo interativo
- `-v $(pwd):/usr/src/app` → Mapeia a pasta atual do host para dentro do container
- `-p 3000:3000` → Publica a porta 3000
- `node:15` → Imagem base
- `bash` → Abre terminal interativo

---

# 📂 2️⃣ Navegando até a pasta do projeto

Dentro do container:

```bash
cd /usr/src/app
```

Essa pasta está mapeada com o seu diretório local.

---

# 🧪 3️⃣ Testando o Bind Mount

Crie um arquivo dentro do container:

```bash
touch oi
```

Agora verifique no seu computador:

- O arquivo também estará na pasta `/node`

📌 Isso acontece porque usamos `-v` (bind mount).

---

# 📦 4️⃣ Inicializando Projeto Node

```bash
npm init
```

Isso criará o `package.json`.

---

# 📥 5️⃣ Instalando Express

```bash
npm install express --save
```

Agora a pasta `node_modules` estará dentro do seu host também.

---

# 📝 6️⃣ Criando index.js (No Host)

Crie o arquivo `index.js` na pasta `/node` do seu computador.

Exemplo básico:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Docker + Node!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# ▶️ 7️⃣ Rodando o Servidor

Dentro do container:

```bash
node index.js
```

Agora acesse:

```
http://localhost:3000
```

---

# 🧠 Conclusão Importante (Modo Desenvolvimento)

Você NÃO precisa instalar Node na sua máquina.

Basta:

- Mapear a pasta do host (`-v`)
- Usar uma imagem Node
- Executar os comandos dentro do container

✔ Ambiente isolado  
✔ Versão controlada  
✔ Código refletindo em tempo real  

---

# 📦 Compartilhando o Projeto com Dockerfile (Modo Produção)

Para empacotar a aplicação, crie um `Dockerfile` dentro da pasta `/node` no host.

---

## 📄 Dockerfile

```dockerfile
FROM node:15

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

---

# 🏗️ Buildando a Imagem

Dentro da pasta do projeto:

```bash
docker build -t felipeken/hello-express .
```

---

# 🚀 Rodando a Aplicação

```bash
docker run -p 3000:3000 felipeken/hello-express
```

Agora o servidor estará rodando sem necessidade de bind mount.

---

# 🔍 Diferença Importante: Bind Mount vs COPY

## 🔹 Quando usamos `-v` (Bind Mount)

```bash
docker run -v $(pwd):/usr/src/app node:15
```

O que acontece:

```
Host ↔ Container
```

- Alterações no container refletem no host
- Alterações no host refletem no container
- Ideal para desenvolvimento

---

## 🔹 Quando usamos `COPY` no Dockerfile

```dockerfile
COPY . .
```

O que acontece:

```
Host → docker build → Image → Container
```

- Arquivos são copiados durante o build
- A imagem é imutável
- Não existe sincronização com o host
- Alterações no host NÃO refletem no container
- Alterações no container NÃO refletem no host

---

# 🧠 Conclusão Técnica

A diferença não é apenas porque a imagem é imutável.

A diferença real é:

✔ Com `-v`, existe um mapeamento direto Host ↔ Container  
✔ Com `COPY`, os arquivos passam a fazer parte da imagem  
✔ O container deixa de depender do host  

---

# 🎯 Quando usar cada abordagem?

## 🧪 Desenvolvimento

Use:

```bash
-v $(pwd):/usr/src/app
```

Para ter hot reload e alterações em tempo real.

---

## 🚀 Produção

Use:

```dockerfile
COPY . .
```

Para gerar uma imagem imutável, portátil e independente do host.

---

# 🔥 Resumo Mental Final

- `-v` → Compartilha diretório
- `COPY` → Empacota código na imagem
- Desenvolvimento → Bind Mount
- Produção → Imagem imutável
- Dockerfile não cria volume automaticamente