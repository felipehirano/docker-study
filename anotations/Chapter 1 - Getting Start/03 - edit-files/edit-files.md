# 🐳 Acessando e Alterando Arquivos de um Container

## 📌 Conceito Importante

Um container Docker:

- É baseado em uma **imagem imutável**
- Possui uma camada adicional chamada **Writable Layer (camada de escrita)**
- Todas as alterações feitas em runtime são gravadas nessa camada

⚠️ Se o container for removido, tudo que estiver na camada de escrita será perdido.

---

# 🚀 Acessando um Container

Existem duas formas principais:

1. Executar um comando dentro de um container em execução
2. Abrir um terminal interativo dentro do container

---

## 1️⃣ docker exec

### O que faz?

Executa um comando dentro de um container que já está rodando.

```bash
docker exec nginx ls
```

Isso executará o comando `ls` dentro do container chamado `nginx`.

### Forma mais comum (modo interativo):

```bash
docker exec -it ID_CONTAINER bash
```

Flags utilizadas:

- `-i` → Mantém STDIN aberto
- `-t` → Cria um terminal interativo

Isso permite que você entre no container como se estivesse acessando uma máquina via terminal.

---

## 2️⃣ docker run -it nginx bash

```bash
docker run -it nginx bash
```

### O que acontece?

- Cria um novo container
- Executa o `bash`
- Permite interação direta com o sistema de arquivos

⚠️ Observação:
Isso cria um **novo container**, não acessa um já existente.

---

# 📁 Alterando Arquivos do Nginx

Após acessar o container:

```bash
cd /usr/share/nginx/html
```

Esse diretório contém o `index.html` padrão exibido quando acessamos:

```
http://localhost:8080
```

Para listar os arquivos:

```bash
ls
```

---

## 🛠 Instalando o Vim no Container

Primeiro atualize a lista de pacotes:

```bash
apt-get update
```

Depois instale o vim:

```bash
apt-get install vim
```

---

## ✏️ Editando o index.html

Abra o arquivo:

```bash
vim index.html
```

### Comandos básicos no Vim:

- `i` → Entra no modo INSERT
- `ESC` → Sai do modo INSERT
- `:w` → Salva (write)
- `:q` → Sai (quit)
- `:wq` → Salva e sai

Após salvar, se você atualizar o navegador, verá a alteração refletida.

---

# 🧠 Entendendo a Imutabilidade

## 🏗 Estrutura Interna de um Container

```
Imagem (Read-Only Layers)
        +
Writable Layer (Read-Write)
        =
Container
```

### 🔎 O que isso significa?

- A imagem do Nginx é imutável
- Quando o container é criado, o Docker adiciona uma camada de escrita
- Todas as modificações feitas em runtime ficam nessa camada

---

## ⚠️ O que acontece se remover o container?

Se você executar:

```bash
docker rm ID_CONTAINER
```

- A camada de escrita é destruída
- Todas as alterações feitas dentro do container são perdidas
- A imagem original permanece intacta

📌 Você estava alterando o container, não a imagem.

---

# 🎯 Resumo Mental

- `docker exec` → Executa comando em container já rodando
- `docker exec -it ... bash` → Entra no container
- `docker run -it ... bash` → Cria novo container interativo
- Alterações ficam na writable layer
- Container removido = alterações perdidas
- Imagem nunca é alterada diretamente