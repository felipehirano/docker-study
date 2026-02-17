# 🐳 Docker

## 📌 Conceito

- **Containers Docker são processos isolados.**
- Eles utilizam recursos do sistema operacional hospedeiro (kernel compartilhado).
- Um container **existe enquanto o processo principal dele estiver rodando**.
- Quando o processo principal termina, o container é finalizado.

---

# 🚀 Principais Comandos

## 1️⃣ docker run

### O que faz?

- Tenta executar uma **imagem localmente**.
- Se a imagem não existir localmente:
  - Faz o **pull automaticamente do registry** (ex: Docker Hub).
- Depois disso, cria e executa um **container** baseado nessa imagem.

### Fluxo interno simplificado:

1. Verifica se a imagem existe localmente.
2. Se não existir → faz `docker pull`.
3. Cria o container.
4. Executa o `ENTRYPOINT` ou `CMD`.
5. O container roda enquanto o processo principal estiver ativo.

---

### ⚠️ Importante sobre o ciclo de vida

Após executar:

```bash
docker run ubuntu
```

Se você rodar:

```bash
docker ps
```

Pode não aparecer nada.

Isso acontece porque:

- A imagem possui um `ENTRYPOINT` ou `CMD`
- Esse comando executa um processo
- Quando o processo termina, o container morre
- O `docker ps` mostra apenas containers **em execução**

---

## 2️⃣ docker ps

Lista apenas os containers **em execução**.

```bash
docker ps
```

---

## 3️⃣ docker ps -a

Lista **todos os containers**, inclusive os que já foram finalizados.

```bash
docker ps -a
```

### Observações:

- A coluna **COMMAND** mostra o comando executado (`ENTRYPOINT` ou `CMD`)
- Se você não informar um nome ao rodar o container, o Docker gera um nome aleatório
  - Exemplo: `focused_turing`

---

## 4️⃣ docker run -it ubuntu bash

```bash
docker run -it ubuntu bash
```

### O que acontece?

- `ubuntu` → nome da imagem
- `bash` → comando que será executado dentro do container
- O container sobe executando o `bash`

### Flags utilizadas:

- `-i` (interactive)
  - Mantém o STDIN aberto
  - Permite interação com o terminal

  OBS: Manter o stdin (Standard Input ou Entrada Padrão) aberto no Linux significa garantir que um processo ou comando continue tendo um canal de entrada de dados ativo, mesmo quando não há dados sendo enviados naquele exato momento, ou quando o programa espera interação contínua do usuário.

- `-t` (tty)
  - Cria um pseudo-terminal
  - Permite digitar comandos normalmente

💡 `-it` é muito usado para acessar containers interativamente.

---

## 5️⃣ docker start / docker stop

Após criar um container uma vez, você pode reutilizá-lo.

### Iniciar container parado:

```bash
docker start ID_CONTAINER
```

### Parar container:

```bash
docker stop ID_CONTAINER
```

📌 Observação:
- `docker run` cria um novo container
- `docker start` reutiliza um container já existente

---

# 🧹 Limpando todos os containers

Para remover todos os containers (ativos e inativos):

```bash
docker rm $(docker ps -a -q) -f
```

Explicação:

- `docker ps -a -q` → Lista apenas IDs
- `docker rm -f` → Remove forçando parada se necessário

---

## 6️⃣ docker run -it --rm ubuntu bash

```bash
docker run -it --rm ubuntu bash
```

### O que muda com --rm?

- Remove automaticamente o container após ele parar
- Não fica salvo no histórico (`docker ps -a`)

💡 Muito útil para testes rápidos e containers descartáveis.

---

# 🧠 Conceitos Importantes

## 🏗 Imagem vs Container

| Imagem | Container |
|--------|-----------|
| Modelo | Instância em execução |
| Imutável | Pode ser iniciado/parado |
| Template | Processo ativo |

---

## 🔁 Ciclo de Vida de um Container

1. Criado (`docker run`)
2. Executando
3. Parado
4. Removido (opcional)

---

# 🎯 Resumo Mental

- Container = Processo isolado
- Processo morreu = Container morreu
- `docker run` cria + executa
- `docker start` apenas executa novamente
- `docker ps` mostra rodando
- `docker ps -a` mostra histórico
- `--rm` remove automaticamente