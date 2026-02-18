# 🐳 Iniciando com Docker Compose

## 📌 O que é Docker Compose?

Docker Compose é uma ferramenta complementar ao Docker que permite:

- Definir múltiplos containers
- Configurar redes, volumes e dependências
- Subir toda a infraestrutura com um único comando

Tudo isso é feito através de um arquivo:

```
docker-compose.yaml
```

---

# 🎯 Por que usar Docker Compose?

Sem Docker Compose:

- Você precisa rodar vários `docker run`
- Criar redes manualmente
- Criar volumes manualmente
- Configurar ordem de inicialização

Com Docker Compose:

✔ Um único arquivo YAML  
✔ Um único comando sobe tudo  
✔ Estrutura organizada  
✔ Ideal para ambientes com múltiplos serviços  

---

# 🧱 Estrutura Básica do docker-compose.yaml

No arquivo `docker-compose.yaml`, definimos:

- Quais serviços queremos subir
- Qual imagem usar
- Se precisa fazer build
- Portas
- Volumes
- Redes

Exemplo básico:

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
```

---

# 🚀 Subindo e Derrubando Containers

## 🔹 Subir containers

```bash
docker-compose up
```

---

## 🔹 Subir em modo detached

```bash
docker-compose up -d
```

- `-d` → Detached mode
- Libera o terminal
- Containers continuam rodando em background

---

## 🔹 Parar e remover containers

```bash
docker-compose down
```

Isso:

- Para os containers
- Remove containers
- Remove redes criadas automaticamente

---

# 🏷️ Image vs Build

No `docker-compose.yaml` você pode usar:

## 🔹 image

```yaml
image: felipeken/laravel:prod
```

Usa uma imagem já existente no Docker Hub.

---

## 🔹 build

```yaml
build:
  context: .
  dockerfile: Dockerfile.prod
```

Isso indica:

- Qual pasta será usada como contexto
- Qual Dockerfile será buildado

📌 Quando usamos `build`, o Docker Compose gera automaticamente o nome da imagem.

Não é obrigatório definir `image:` nesse caso.

---

# 📋 Listando Containers do Compose

```bash
docker-compose ps
```

Mostra:

- Nome do serviço
- Estado
- Portas
- Containers ativos

---

# 🔄 Rebuild Após Alterar Dockerfile

Sempre que você alterar:

- Dockerfile
- Dependências
- Algo que impacte o build

Você deve:

```bash
docker-compose down
docker-compose up --build
```

O `--build` força a reconstrução das imagens.

---

# 🧠 Fluxo Mental do Docker Compose

1. Define serviços no `docker-compose.yaml`
2. Usa `docker-compose up`
3. Docker:
   - Cria rede automaticamente
   - Cria volumes automaticamente
   - Builda imagens (se necessário)
   - Sobe containers
4. Usa `docker-compose down` para derrubar tudo

---

# 📦 Exemplo Real (Laravel + Nginx + MySQL)

Com Docker Compose você pode subir:

- Container PHP
- Container Nginx
- Container MySQL

Tudo com um único comando.

---

# 🎯 Resumo Final

- Docker Compose orquestra múltiplos containers
- `docker-compose up` → sobe tudo
- `docker-compose up -d` → sobe em background
- `docker-compose down` → derruba tudo
- `docker-compose ps` → lista serviços
- `--build` → força rebuild
- `build:` define qual Dockerfile usar