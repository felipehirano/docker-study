# 🐳 Avançando com Dockerfile

Agora vamos evoluir o uso do Dockerfile entendendo:

- WORKDIR
- COPY
- Camadas (Layers)
- Cache de build

---

# 📄 Exemplo de Dockerfile

```dockerfile
FROM nginx:latest

WORKDIR /app

RUN apt-get update && apt-get install vim -y

COPY html/ /usr/share/nginx/html
```

---

# 🔍 Entendendo Cada Instrução

## 1️⃣ FROM nginx:latest

```dockerfile
FROM nginx:latest
```

- Define a imagem base
- Toda nova imagem precisa começar com `FROM`
- Estamos herdando tudo que já existe na imagem oficial do Nginx

📌 A nova imagem será construída **em cima** dessa imagem.

---

## 2️⃣ WORKDIR /app

```dockerfile
WORKDIR /app
```

O que acontece:

- Cria o diretório `/app` dentro do container (se não existir)
- Define esse diretório como diretório padrão de execução
- Equivalente a executar `cd /app`

A partir daqui:

- Todos os próximos comandos serão executados dentro de `/app`

📌 Evita precisar usar `cd` manualmente.

---

## 3️⃣ RUN apt-get update && apt-get install vim -y

```dockerfile
RUN apt-get update && apt-get install vim -y
```

- Atualiza os repositórios da imagem
- Instala o vim
- `-y` confirma automaticamente a instalação

📌 Boa prática: usar `&&` para reduzir camadas desnecessárias.

---

## 4️⃣ COPY html/ /usr/share/nginx/html

```dockerfile
COPY html/ /usr/share/nginx/html
```

O que acontece:

- Copia a pasta `html` do seu computador
- Para dentro do container
- Substitui o conteúdo padrão do Nginx

Agora o Nginx servirá:

- Seu próprio `index.html`
- Seus arquivos estáticos personalizados

---

# 🧱 Entendendo Layers (Camadas)

Cada instrução no Dockerfile:

- Gera uma nova camada (layer)
- É armazenada como um "chunk" incremental

Visualmente:

```
Layer 1 → FROM nginx
Layer 2 → WORKDIR /app
Layer 3 → RUN apt-get update && install vim
Layer 4 → COPY html/
```

A imagem final é composta pela soma dessas camadas.

---

# ⚡ Cache de Build

Docker usa cache para acelerar builds.

Se você rodar:

```bash
docker build -t minha-imagem .
```

E depois rodar novamente sem alterar nada:

- O Docker reutiliza as layers anteriores
- O build será muito mais rápido

---

## 📌 Como o cache funciona?

Docker verifica:

- Se a instrução mudou
- Se os arquivos copiados mudaram

Se nada mudou:

✔ Ele reutiliza a layer  
❌ Não executa o comando novamente  

---

## ⚠️ Importante sobre COPY

Se você alterar qualquer arquivo dentro da pasta `html/`:

- O Docker invalida o cache dessa camada
- E executa novamente o `COPY`

Mas as camadas anteriores continuam em cache.

---

# 🧠 Ordem das Instruções Importa

A ordem do Dockerfile impacta diretamente:

- Performance do build
- Uso de cache
- Tamanho final da imagem

Boa prática:

- Colocar instruções que mudam menos primeiro
- Colocar `COPY` que muda com frequência mais abaixo

---

# 🎯 Resumo Mental

- `FROM` → Define imagem base
- `WORKDIR` → Define diretório padrão
- `RUN` → Executa comando e cria layer
- `COPY` → Copia arquivos do host para imagem
- Cada linha → Nova layer
- Docker usa cache para acelerar builds
- Mudou algo → Cache daquela layer é invalidado