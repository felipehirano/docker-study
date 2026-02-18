# 🐳 Comandos Úteis do Docker e Docker Compose

Este arquivo reúne os comandos mais utilizados no dia a dia com Docker.

---

# 📦 Containers

## 🔹 Listar containers ativos

```bash
docker ps
```

Lista apenas containers que estão rodando.

---

## 🔹 Listar todos os containers

```bash
docker ps -a
```

Lista:

- Containers ativos
- Containers parados
- Histórico de execução

---

## 🔹 Remover todos os containers

```bash
docker rm $(docker ps -a -q) -f
```

- `docker ps -a -q` → Lista apenas os IDs
- `-f` → Força parada antes de remover

---

# 🖼️ Imagens

## 🔹 Listar imagens

```bash
docker images
```

ou

```bash
docker image ls
```

---

## 🔹 Remover todas as imagens

```bash
docker rmi -f $(docker images -aq)
```

- `-a` → Todas
- `-q` → Apenas IDs
- `-f` → Força remoção

⚠️ Cuidado: Remove todas as imagens locais.

---

# 🏗️ Build

## 🔹 Build simples (Dockerfile na pasta atual)

```bash
docker build -t NAME_IMAGE .
```

- `-t` → Define nome da imagem (tag)
- `.` → Contexto atual

---

## 🔹 Build especificando Dockerfile

```bash
docker build -t NAME_IMAGE [FOLDER] -f [FOLDER]/Dockerfile.prod
```

- `-f` → Especifica o Dockerfile
- `[FOLDER]` → Contexto de build

---

# ▶️ Run & Exec

## 🔹 Rodar container

```bash
docker run -t NAME_IMG [CMD]
```

- Sobe uma imagem criada
- Se não existir localmente, busca no Docker Hub
- `[CMD]` pode sobrescrever o CMD padrão

---

## 🔹 Entrar em container rodando

```bash
docker exec -it NAME_CONTAINER [CMD]
```

Exemplo comum:

```bash
docker exec -it container_name bash
```

- `-it` → Modo interativo

---

# 🔤 Flags Importantes

| Flag | Significado |
|------|-------------|
| `-t` | Tag (no build) |
| `-it` | Modo interativo |
| `-d` | Detached (background) |
| `-f` | Force |

---

# 📜 Logs

## 🔹 Ver logs de um container

```bash
docker logs NAME_CONTAINER
```

Útil para:

- Debug
- Ver erros de inicialização
- Monitorar execução

---

# 🌐 Network

## 🔹 Listar redes

```bash
docker network ls
```

---

## 🔹 Inspecionar rede

```bash
docker network inspect NAME_NETWORK
```

Mostra:

- Containers conectados
- Subnet
- Gateway
- Configurações internas

---

# 🐙 Docker Compose

## 🔹 Subir containers

```bash
docker-compose up
```

---

## 🔹 Subir em modo detached

```bash
docker-compose up -d
```

Libera o terminal.

---

## 🔹 Derrubar containers

```bash
docker-compose down
```

Para e remove:

- Containers
- Redes criadas automaticamente

---

## 🔹 Subir forçando rebuild

```bash
docker-compose up --build
```

Rebuilda imagens quando:

- Dockerfile foi alterado
- docker-compose.yaml foi alterado

---

# 🧠 Resumo Mental

- `docker ps` → Containers ativos
- `docker images` → Imagens locais
- `docker build` → Criar imagem
- `docker run` → Criar container
- `docker exec` → Entrar no container
- `docker logs` → Ver logs
- `docker network` → Gerenciar redes
- `docker-compose up/down` → Orquestrar múltiplos containers