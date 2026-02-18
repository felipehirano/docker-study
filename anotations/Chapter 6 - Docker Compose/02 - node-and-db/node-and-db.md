# 🐳 Criando Banco de Dados com Docker + Integração com Node

- Como subir um banco MySQL com Docker
- Como persistir dados usando volumes
- Como conectar um container Node ao banco
- Como lidar com dependência entre containers

---

# 🗄️ 1️⃣ Criando um Banco de Dados com Docker

Um exemplo básico no `docker-compose.yaml` para MySQL:

```yaml
services:
  db:
    image: mysql:8
    container_name: db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: nodedb
    volumes:
      - ./mysql:/var/lib/mysql
    networks:
      - node-network
    tty: true
```

---

## 🔎 Explicando Configurações Importantes

### 🔹 restart: always

Significa que:

- Se o container cair
- Ele será reiniciado automaticamente

Muito usado em produção.

---

### 🔹 tty: true

Permite interação com o terminal.

Sem isso, pode haver problemas ao tentar usar:

```bash
docker exec -it db bash
```

---

### 🔹 Persistência com Volumes

```yaml
volumes:
  - ./mysql:/var/lib/mysql
```

O que acontece:

```
Host (./mysql) ↔ Container (/var/lib/mysql)
```

Tudo que o MySQL salvar internamente será gravado também na pasta do seu computador.

✔ Se o container for removido  
✔ Os dados continuam existindo  

---

# 🌐 2️⃣ Conectando Node ao MySQL

## 🔹 Serviço Node

Exemplo no docker-compose:

```yaml
app:
  build:
    context: ./node
  container_name: app
  networks:
    - node-network
  volumes:
    - ./node:/usr/src/app
  tty: true
  ports:
    - "3000:3000"
```

---

# 🔧 3️⃣ Criando Estrutura no Banco

Entre no container do banco:

```bash
docker exec -it db bash
```

Acesse o MySQL:

```bash
mysql -uroot -p
```

Digite a senha root.

---

## Criando estrutura:

```sql
use nodedb;

create table people (
  id int not null auto_increment,
  name varchar(255),
  primary key(id)
);

desc people;
```

---

# 📦 4️⃣ Instalando Driver MySQL no Node

Entre no container do Node:

```bash
docker exec -it app bash
```

Instale dependência:

```bash
npm install mysql --save
```

Configure o `index.js` para conectar no banco usando:

```
host: 'db'
```

📌 O nome `db` é o nome do serviço no docker-compose.

---

# ▶️ 5️⃣ Inserindo Dados

Execute:

```bash
node index.js
```

Depois volte ao container do MySQL:

```sql
select * from people;
```

Você verá os dados inseridos.

---

# ⚠️ 6️⃣ Problema: Dependência Entre Containers

Problema comum:

- Node sobe antes do MySQL
- Conexão falha

---

## 🔹 Usando depends_on

```yaml
depends_on:
  - db
```

⚠️ Importante:

`depends_on` apenas garante ordem de inicialização.  
Ele NÃO garante que o banco já esteja pronto para conexões.

---

# 🛠️ 7️⃣ Esperando o Banco Ficar Disponível

Para resolver isso, usamos ferramentas como:

## 🔹 Dockerize

Instalar no Dockerfile do Node:

```dockerfile
RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz
```

---

## 🔹 Esperando MySQL Subir

Dentro do container:

```bash
dockerize -wait tcp://db:3306 -timeout 50s
```

Isso faz o container esperar o MySQL aceitar conexões.

---

## 🔹 Alterando entrypoint no docker-compose

```yaml
entrypoint: dockerize -wait tcp://db:3306 -timeout 20s docker-entrypoint.sh
```

Fluxo:

1. Espera MySQL subir
2. Executa entrypoint original
3. Inicia aplicação

📌 É importante manter o entrypoint padrão ao final.

---

# 📜 8️⃣ Verificando Logs

Para analisar erros:

```bash
docker logs NOME_CONTAINER
```

Muito útil para:

- Ver falha de conexão
- Debug de build
- Ver startup sequence

---

# 🧠 Resumo Mental

- `restart: always` → Reinicia automaticamente
- `tty: true` → Permite terminal interativo
- Volume → Persistência de dados
- Serviço `db` vira hostname interno
- `depends_on` não garante readiness
- `dockerize` resolve problema de espera
- `docker logs` ajuda no debug