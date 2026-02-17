# 🐳 Persistência de Dados no Docker  
## Bind Mounts e Volumes

Até agora vimos que:

- Containers são efêmeros
- Alterações feitas na writable layer são perdidas ao remover o container

Para resolver isso, utilizamos **mecanismos de persistência**:

- Bind Mounts
- Volumes

---

# 📂 1️⃣ Bind Mounts

## 📌 O que é?

Um **bind mount** conecta uma pasta do seu computador (host) a uma pasta dentro do container.

Isso permite:

- Persistência de dados
- Desenvolvimento em tempo real
- Compartilhamento de arquivos

---

## 🔹 Usando `-v`

```bash
docker run -d \
  --name nginx \
  -p 8080:80 \
  -v "$(pwd)"/html:/usr/share/nginx/html \
  nginx
```

### Estrutura:

```
ORIGEM_NO_HOST:DESTINO_NO_CONTAINER
```

No exemplo:

```
"$(pwd)"/html → /usr/share/nginx/html
```

Isso significa:

- A pasta `html` da sua máquina está sendo montada
- Dentro da pasta padrão do Nginx no container
- O `index.html` agora vem da sua máquina

---

## 🎯 Resultado

- Se o container for removido
- O arquivo `index.html` continuará existindo no seu computador
- Nada é perdido

📌 O que foi feito é apenas um **mapeamento de diretório**

---

# 🚀 2️⃣ Usando `--mount` (Forma Moderna)

Hoje, a forma mais recomendada é utilizar `--mount`.

```bash
docker run -d \
  --name nginx \
  -p 8080:80 \
  --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html \
  nginx
```

### Parâmetros:

- `type=bind` → Define que é um bind mount
- `source` → Caminho na máquina host
- `target` → Caminho dentro do container
- `$(pwd)` → Diretório atual

---

## ⚠️ Diferença entre `-v` e `--mount`

| -v | --mount |
|----|---------|
| Sintaxe mais simples | Sintaxe mais explícita |
| Cria pasta automaticamente se não existir | Gera erro se pasta não existir |
| Mais antigo | Mais recomendado |

📌 Em ambientes profissionais, `--mount` é preferido por ser mais explícito.

---

# 💾 3️⃣ Docker Volumes

Até agora montamos pastas do **nosso computador**.

Agora vamos usar **volumes gerenciados pelo próprio Docker**.

---

## 🔹 Listando volumes

```bash
docker volume ls
```

Mostra:

- DRIVER
- VOLUME NAME

---

## 🔹 Criando um volume

```bash
docker volume create NOME_VOLUME
```

---

## 🔹 Inspecionando volume

```bash
docker volume inspect NOME_VOLUME
```

Isso retorna um JSON com:

- Mountpoint (local onde o Docker armazena os dados no host)
- Driver
- Configurações

---

## 🔹 Usando volume em um container

```bash
docker run -d \
  --name nginx \
  --mount type=volume,source=NOME_VOLUME,target=/app \
  nginx
```

### O que acontece?

- O Docker cria um volume isolado
- Ele monta esse volume em `/app`
- Os dados ficam armazenados fora do container
- Se o container morrer, os dados continuam

---

# 🔄 Compartilhamento entre Containers

Volumes podem ser compartilhados entre múltiplos containers:

```
Container A
       ↘
        Volume
       ↗
Container B
```

Isso é muito usado para:

- Banco de dados
- Logs
- Arquivos compartilhados

---

# 🧹 Limpando Volumes Não Utilizados

```bash
docker volume prune
```

Remove todos os volumes que:

- Não estão sendo usados por nenhum container

⚠️ Importante:

Volumes podem ocupar bastante espaço em disco.
Esse comando ajuda a evitar acúmulo desnecessário.