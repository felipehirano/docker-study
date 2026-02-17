# 🐳 Instalando Laravel Dentro de um Container Docker

- Usar uma imagem base do PHP
- Instalar o Composer
- Criar um projeto Laravel
- Criar um Dockerfile definitivo
- Subir o servidor corretamente acessível pelo host

---

# 📦 1️⃣ Escolhendo a Imagem Base

Vamos usar uma imagem oficial do PHP disponível no Docker Hub:

```
php:7.4-cli
```

Essa imagem já vem com:

- PHP instalado
- Ambiente CLI configurado

---

# 🚀 2️⃣ Criando Container para Instalação Manual (Teste)

```bash
docker run -it --name php php:7.4-cli bash
```

Entramos no container via bash.

---

# 🔄 3️⃣ Atualizando Pacotes

```bash
apt-get update
```

---

# 📥 4️⃣ Instalando o Composer

Composer é o gerenciador de dependências do PHP.

### Baixando o instalador:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

### Verificando integridade:

```bash
php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

### Instalando:

```bash
php composer-setup.php
```

### Removendo instalador:

```bash
php -r "unlink('composer-setup.php');"
```

---

# 📦 5️⃣ Instalando Dependências do Laravel

Laravel precisa da extensão zip:

```bash
apt-get install libzip-dev -y
docker-php-ext-install zip
```

---

# 🏗 6️⃣ Criando Projeto Laravel

```bash
php composer.phar create-project --prefer-dist laravel/laravel laravel
```

Isso cria a pasta:

```
/laravel
```

---

# 🧱 7️⃣ Criando o Dockerfile

Após validar que tudo funciona manualmente, criamos um Dockerfile automatizando o processo.

## 📄 /laravel/Dockerfile

```dockerfile
FROM php:7.4-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git

RUN docker-php-ext-install zip

COPY . /app

EXPOSE 8000

ENTRYPOINT ["php", "artisan", "serve"]
CMD ["--host=0.0.0.0", "--port=8000"]
```

---

# 🏗 8️⃣ Buildando a Imagem

Dentro da pasta onde está o Dockerfile:

```bash
docker build -t felipeken/laravel:latest .
```

---

# ▶️ 9️⃣ Rodando o Container

```bash
docker run --rm -d \
  --name laravel \
  -p 8000:8000 \
  felipeken/laravel
```

---

# 🌐 Problema Inicial

Se você rodar apenas:

```bash
php artisan serve
```

Por padrão o Laravel sobe em:

```
127.0.0.1
```

Isso significa:

- Só aceita conexões internas
- Outros hosts (inclusive sua máquina) não conseguem acessar

---

# ✅ Solução: Bind em 0.0.0.0

No Dockerfile usamos:

```dockerfile
ENTRYPOINT ["php", "artisan", "serve"]
CMD ["--host=0.0.0.0", "--port=8000"]
```

Isso faz com que o servidor:

- Escute todas as interfaces de rede
- Permita acesso externo via mapeamento de porta

Agora conseguimos acessar:

```
http://localhost:8000
```

---

# 🧠 Entendendo ENTRYPOINT + CMD

- ENTRYPOINT → comando fixo
- CMD → parâmetros padrão

Docker executa:

```
php artisan serve --host=0.0.0.0 --port=8000
```

---

# 🎯 Fluxo Completo

1. Escolher imagem base
2. Instalar dependências
3. Instalar Composer
4. Criar projeto Laravel
5. Criar Dockerfile
6. Buildar imagem
7. Subir container com `-p`
8. Garantir `--host=0.0.0.0`