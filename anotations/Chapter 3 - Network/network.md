# 🌐 Entendendo Tipos de Network no Docker

Docker cria automaticamente uma rede interna para que os containers possam se comunicar.

Cada container, por padrão:

- Recebe um IP interno
- Entra em uma rede Docker
- Pode ou não se comunicar com outros containers dependendo da configuração

---

# 🧠 Tipos de Network no Docker

Docker suporta diferentes drivers de rede:

## 1️⃣ Bridge (Padrão)

- Tipo mais comum
- Usado para comunicação entre containers no mesmo host
- Ideal para ambientes simples

---

## 2️⃣ Host

- O container passa a usar a mesma rede da máquina host
- Não há isolamento de rede
- Muito usado para performance ou testes específicos

---

## 3️⃣ Overlay

- Utilizado em Docker Swarm
- Permite comunicação entre containers em múltiplos hosts

---

## 4️⃣ Macvlan

- Permite que o container receba um IP da rede física
- Útil para cenários mais avançados de infraestrutura

---

## 5️⃣ None

- Container roda completamente isolado
- Sem acesso à rede

---

# 🔵 Bridge (Mais Simples e Mais Utilizada)

## 🔎 Listando redes

```bash
docker network ls
```

---

## 🚀 Criando Containers na Rede Padrão (bridge)

```bash
docker run -dit --name ubuntu1 ubuntu bash
docker run -dit --name ubuntu2 ubuntu bash
```

---

## 🔍 Inspecionando a rede bridge

```bash
docker network inspect bridge
```

Dentro do JSON retornado, existe a seção:

```
"Containers"
```

Ali estarão listados os containers conectados à rede bridge.

---

## 🔗 Acessando o container

Como usamos `-d`, podemos entrar com:

```bash
docker attach ubuntu1
```

Ou mais recomendado:

```bash
docker exec -it ubuntu1 bash
```

---

## 🌐 Descobrindo IP

Dentro do container:

```bash
ip addr show
```

---

## 📡 Testando comunicação

Dentro do `ubuntu1`:

```bash
ping IP_DO_UBUNTU2
```

Se responder, significa que ambos estão na mesma rede.

---

# 🏗 Criando Rede Bridge Customizada

Criar uma rede própria é uma boa prática.

```bash
docker network create --driver bridge minharede
```

---

## 🚀 Subindo containers na rede customizada

```bash
docker run -dit --name ubuntu1 --network minharede ubuntu bash
docker run -dit --name ubuntu2 --network minharede ubuntu bash
```

Agora eles estão na rede `minharede`.

---

## 🔎 Comunicação por Nome (DNS Interno)

Dentro do `ubuntu1`:

```bash
ping ubuntu2
```

Docker possui DNS interno para redes customizadas.

Isso é melhor do que usar IP.

---

## ❗ Container fora da rede

Se você criar:

```bash
docker run -dit --name ubuntu3 ubuntu bash
```

Ele estará na rede padrão (`bridge`).

Não conseguirá se comunicar com `ubuntu1` ou `ubuntu2`.

---

## 🔄 Conectando container existente à rede

```bash
docker network connect minharede ubuntu3
```

Agora ele passa a participar da mesma rede.

---

## 🔍 Inspecionando rede customizada

```bash
docker network inspect minharede
```

Você verá:

```
"Containers": {
  ubuntu1,
  ubuntu2,
  ubuntu3
}
```

---

# 🟢 Network Host

```bash
docker run --rm -d --name nginx --network host nginx
```

O que acontece:

- O container usa diretamente a rede da máquina host
- Não precisa usar `-p`
- A porta 80 já estará acessível

⚠️ Funciona nativamente em Linux.
No Docker Desktop (Windows/Mac) pode ter limitações.

---

# 🔁 Container Acessando o Host

E se o container precisar acessar algo rodando na sua máquina?

---

## 🖥 Exemplo: Servidor rodando no host

Suponha que você tenha um servidor rodando em:

```
http://localhost:8000
```

---

## 🚀 Subindo container

```bash
docker run --rm -it --name ubuntu ubuntu bash
```

Instale o curl:

```bash
apt-get update
apt-get install curl -y
```

---

## 🌐 Acessando o host

```bash
curl http://host.docker.internal:8000
```

`host.docker.internal` é um hostname especial que aponta para a máquina host.

📌 Funciona no Docker Desktop (Windows/Mac).
No Linux, pode exigir configuração manual.

---

# 🧠 Resumo Mental

- Docker cria rede interna automaticamente
- Bridge → padrão e mais usado
- Redes customizadas têm DNS interno
- Host → compartilha rede do host
- None → sem rede
- Containers só se comunicam se estiverem na mesma rede
- `host.docker.internal` permite container acessar host