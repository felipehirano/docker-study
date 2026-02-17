# 🐳 Entendendo Imagens e Docker Hub

## 📌 O que é o Docker Hub?

O **Docker Hub** é o container registry oficial do Docker.

Ele funciona como um repositório de imagens, onde você pode:

- Baixar imagens públicas (ex: `ubuntu`, `nginx`, `php`)
- Publicar suas próprias imagens
- Versionar imagens através de **tags**

Site oficial:
https://hub.docker.com

---

# 🖼️ Entendendo Imagens

Uma **imagem Docker** é:

- Um template imutável
- Composto por camadas (layers)
- Utilizado para criar containers

Container = Instância em execução de uma imagem.

---

# 🔎 Listando Imagens Locais

```bash
docker images
```

ou

```bash
docker image ls
```

Mostra:

- REPOSITORY
- TAG
- IMAGE ID
- CREATED
- SIZE

---

# 📥 Baixando Imagens do Docker Hub

## 🔹 Baixar última versão

```bash
docker pull php
```

Isso baixa a imagem com a tag padrão:

```
latest
```

---

## 🔹 Baixar uma versão específica (tag)

```bash
docker pull php:rc-alpine
```

Aqui:

- `php` → nome da imagem
- `rc-alpine` → tag

📌 Tags representam versões ou variações da imagem.

---

# 🗑️ Removendo Imagens

```bash
docker rmi php:rc-alpine
```

Remove a imagem especificada.

⚠️ A imagem não pode estar sendo usada por um container ativo.

---

# 🏗️ Criando Sua Própria Imagem com Dockerfile

Imagens customizadas são criadas através de um **Dockerfile**.

---

## 📄 Exemplo de Dockerfile

```dockerfile
FROM nginx:latest

RUN apt-get update && apt-get install vim -y
```

### Explicação:

- `FROM nginx:latest`
  - Usa a imagem do Nginx como base

- `RUN apt-get update`
  - Atualiza o repositório de pacotes

- `RUN apt-get install vim -y`
  - Instala o vim
  - `-y` confirma automaticamente a instalação

📌 Cada instrução `RUN` cria uma nova layer na imagem.

---

# 🚀 Buildando a Imagem

Dentro da pasta onde está o Dockerfile(Utilizando o Windows):

```bash
docker build -t felipeken/nginx-test-with-vim:latest .
```

### O que significa:

- `-t` → Define nome e tag
- `felipeken/nginx-test-with-vim` → Nome do repositório
- `latest` → Tag
- `.` → Contexto de build (pasta atual)

Isso cria uma imagem local com esse nome.

---

## 🔎 Verificando a imagem criada

```bash
docker images
```

Você verá:

```
felipeken/nginx-test-with-vim   latest
```

---

# ▶️ Rodando a Imagem Criada

```bash
docker run -it felipeken/nginx-test-with-vim bash
```

Isso irá:

- Criar um container
- Executar o bash
- Permitir que você use o vim instalado

---

# 🧠 Conceitos Importantes

## 🏗️ Imagem vs Container

| Imagem | Container |
|---------|-----------|
| Template imutável | Instância em execução |
| Criada via Dockerfile | Criada via docker run |
| Possui layers | Possui writable layer |

---

## 🧱 O que acontece no build?

Durante o `docker build`:

1. O Docker lê o Dockerfile
2. Executa cada instrução
3. Cria uma layer para cada comando
4. Gera uma nova imagem final

---

# 🎯 Resumo Mental

- Docker Hub → Registry de imagens
- `docker pull` → Baixa imagem
- `docker images` → Lista imagens locais
- `docker rmi` → Remove imagem
- Dockerfile → Define como criar imagem
- `docker build` → Constrói imagem
- `docker run` → Cria container da imagem