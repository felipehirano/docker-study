# 💾 Docker Volumes

## 📌 O que são Docker Volumes?

Docker Volumes são mecanismos de persistência **gerenciados pelo próprio Docker**.

Diferente do bind mount:

- Não dependem diretamente de um caminho específico do seu computador
- São armazenados em uma área controlada pelo Docker
- São mais indicados para ambientes de produção

---

# 🧱 Por que usar Volumes?

Containers são efêmeros:

- Se você remover um container, a writable layer é destruída
- Todos os dados internos são perdidos

Volumes resolvem esse problema:

- Armazenam dados fora do container
- Sobrevivem à remoção do container
- Podem ser compartilhados entre múltiplos containers

---

# 🔎 Gerenciando Volumes

## 🔹 Listando volumes

```bash
docker volume ls
```

Mostra:

- DRIVER
- VOLUME NAME

Exemplo de saída:

```
local     meu_volume
```

---

## 🔹 Criando um volume

```bash
docker volume create NOME_VOLUME
```

Exemplo:

```bash
docker volume create nginx_data
```

O Docker criará o volume no storage interno dele.

---

## 🔹 Inspecionando um volume

```bash
docker volume inspect NOME_VOLUME
```

Isso retorna um JSON com informações como:

- Mountpoint (local físico no host)
- Driver
- Nome
- Configurações

Exemplo de campo importante:

```json
"Mountpoint": "/var/lib/docker/volumes/nginx_data/_data"
```

⚠️ Esse caminho é gerenciado pelo Docker.  
Não é recomendado manipular arquivos diretamente nele.

---

# 🚀 Usando Volume em um Container

```bash
docker run -d \
  --name nginx \
  --mount type=volume,source=NOME_VOLUME,target=/app \
  nginx
```

### Parâmetros:

- `type=volume` → Define que estamos usando um volume Docker
- `source` → Nome do volume criado
- `target` → Diretório dentro do container

---

## 🎯 O que acontece?

- O Docker conecta o volume ao container
- O diretório `/app` passa a usar o volume
- Os dados gravados ali ficam persistidos
- Se o container for removido, os dados continuam no volume

---

# 🔄 Compartilhamento entre Containers

Um mesmo volume pode ser usado por vários containers:

```
Container A
       ↘
        Volume
       ↗
Container B
```

Isso é muito utilizado para:

- Bancos de dados
- Sistemas de cache
- Logs
- Upload de arquivos
- Comunicação entre serviços

---

# 🧹 Limpando Volumes

## 🔹 Remover um volume específico

```bash
docker volume rm NOME_VOLUME
```

⚠️ O volume precisa não estar sendo utilizado por nenhum container.

---

## 🔹 Remover volumes não utilizados

```bash
docker volume prune
```

Remove todos os volumes que:

- Não estão associados a nenhum container

📌 Esse comando é importante para evitar acúmulo de dados e consumo excessivo de disco.

---

# 🧠 Resumo Mental

- Volume é gerenciado pelo Docker
- Dados sobrevivem à remoção do container
- Pode ser compartilhado entre múltiplos containers
- Ideal para produção
- `docker volume ls` → Lista
- `docker volume create` → Cria
- `docker volume inspect` → Detalha
- `docker volume prune` → Limpa volumes órfãos

---

# 🔥 Quando usar Volume?

Use Docker Volume quando:

- Precisar persistir banco de dados
- Quiser isolamento do filesystem do host
- Estiver preparando ambiente para produção
- Estiver usando Docker Compose ou Kubernetes