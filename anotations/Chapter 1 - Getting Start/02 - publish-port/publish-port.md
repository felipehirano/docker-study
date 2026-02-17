# 🐳 Docker com Nginx

## 📌 O que é o Nginx?

O **Nginx** é um servidor web que pode atuar como:

- Servidor HTTP
- Proxy reverso
- Load balancer
- Servidor de arquivos estáticos

Quando usamos Docker com Nginx, estamos executando o servidor web dentro de um container.

---

# 🚀 Executando Nginx com Docker

## 1️⃣ docker run nginx

```bash
docker run nginx
```

### O que acontece?

- O Docker baixa a imagem do Nginx (caso não exista localmente).
- Cria um container.
- Executa o processo principal do Nginx.
- O Nginx sobe internamente escutando na porta **80**.

### ⚠️ Por que não funciona acessar `localhost:80`?

Mesmo que o Nginx esteja rodando:

- A porta 80 está exposta **dentro do container**
- A porta **não está publicada para a máquina host**
- O host (sua máquina) ainda não tem acesso à rede interna do container

📌 Importante:

- Container **não é uma VM**
- Ele compartilha o kernel do sistema operacional host
- Porém possui rede isolada por padrão

---

## 🌐 Entendendo Portas no Docker

Por padrão:

- O container tem sua própria rede isolada
- A porta 80 do container não está automaticamente acessível no host

Para que a máquina host consiga acessar o serviço, é necessário **publicar a porta**.

---

## 2️⃣ docker run -p 8080:80 nginx

```bash
docker run -p 8080:80 nginx
```

### O que significa `-p`?

`-p` = publish (publicar porta)

### O que significa `8080:80`?

```
HOST:CONTAINER
```

- 8080 → Porta da sua máquina (Docker Host)
- 80 → Porta dentro do container

### Fluxo:

Quando você acessa:

```
http://localhost:8080
```

O tráfego é redirecionado para:

```
porta 80 do container
```

Agora o Nginx ficará acessível pelo navegador.

---

## 3️⃣ docker run -d -p 8080:80 nginx

```bash
docker run -d -p 8080:80 nginx
```

### O que significa `-d`?

`-d` = Detached mode

- O container roda em segundo plano
- O terminal não fica preso ao processo
- O ID do container é exibido

Para listar containers rodando:

```bash
docker ps
```

Para parar o container:

```bash
docker stop ID_CONTAINER
```

---

## 4️⃣ Removendo Containers

### Remover container parado

```bash
docker rm ID_CONTAINER
```

⚠️ Importante:

- O container precisa estar parado
- Se estiver rodando, primeiro use:

```bash
docker stop ID_CONTAINER
```

---

## 💡 Dica Extra: Remover automaticamente

Você pode rodar:

```bash
docker run -d -p 8080:80 --rm nginx
```

Assim o container será removido automaticamente quando for parado.

---

# 🧠 Conceitos Importantes

## 🏗 Container não é VM

- Não possui kernel próprio
- Compartilha o kernel do host
- Possui isolamento de:
  - Rede
  - Processos
  - Sistema de arquivos

---

## 🌍 Fluxo de Rede Simplificado

```
Seu Navegador → localhost:8080
       ↓
Docker Host
       ↓
Port Mapping (8080 → 80)
       ↓
Container Nginx
       ↓
Servidor Web responde
```

---

# 🎯 Resumo Mental

- `docker run nginx` → Sobe Nginx, mas não publica porta
- `-p HOST:CONTAINER` → Publica porta
- `-d` → Executa em background
- `docker stop` → Para container
- `docker rm` → Remove container
- Container ≠ VM
- Portas precisam ser explicitamente publicadas