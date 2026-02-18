# 🐳 Otimização com Multi-Stage Build (Laravel Produção)

- Como gerar uma imagem otimizada para produção
- Uso de Nginx como proxy reverso
- Uso de PHP-FPM (FastCGI)
- Uso de Alpine Linux para reduzir tamanho
- Conceito de Multi-Stage Build

---

# 🎯 Objetivo: Imagem de Produção para Laravel

Uma imagem profissional de produção deve ter:

## 1️⃣ Nginx como Proxy Reverso

Fluxo de requisição:

```
Cliente → Nginx → PHP-FPM → Nginx → Cliente
```

- O Nginx recebe a requisição
- Encaminha para o container PHP
- PHP executa o código Laravel
- Retorna resposta para o Nginx
- Nginx devolve ao usuário

Isso traz:

✔ Melhor performance  
✔ Melhor controle de cache  
✔ Separação de responsabilidades  

---

## 2️⃣ PHP rodando com FastCGI (php-fpm)

Em produção não usamos:

```
php artisan serve
```

Usamos:

```
php-fpm
```

O Nginx se comunica com o PHP via FastCGI, permitindo:

- Alta performance
- Melhor gerenciamento de processos
- Arquitetura escalável

---

## 3️⃣ Uso do Alpine Linux

Alpine é uma distribuição Linux minimalista.

Benefícios:

- Imagens menores
- Menos superfície de ataque
- Melhor performance de download e deploy

Exemplo:

```
php:7.4-fpm-alpine
```

---

# 🏗️ O que é Multi-Stage Build?

Multi-Stage Build permite:

- Construir a aplicação em uma etapa
- Copiar apenas o necessário para a imagem final
- Remover ferramentas de build da versão final

Resultado:

✔ Imagem menor  
✔ Mais segura  
✔ Mais profissional  

---

# 📦 Exemplo Prático

## 🔹 Primeiro Estágio (Builder)

```dockerfile
FROM php:7.4-cli AS builder

WORKDIR /var/www

RUN apt-get update && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

RUN php composer.phar create-project --prefer-dist laravel/laravel laravel
```

### O que acontece aqui?

- Criamos imagem baseada em `php:7.4-cli`
- Instalamos dependências
- Instalamos Composer
- Criamos projeto Laravel
- Nomeamos o estágio como `builder`

Essa etapa contém ferramentas pesadas que não queremos em produção.

---

## 🔹 Segundo Estágio (Produção)

Arquivo: `Dockerfile.prod`

```dockerfile
FROM php:7.4-fpm-alpine

WORKDIR /var/www

RUN rm -rf /var/www/html

COPY --from=builder /var/www/laravel .
```

### O que acontece aqui?

- Usamos imagem leve baseada em Alpine
- Copiamos apenas o resultado final do estágio `builder`
- Não copiamos ferramentas de build
- Criamos uma imagem limpa para produção

---

# 🔄 Fluxo Visual do Multi-Stage

```
Stage 1 (builder)
    ↓
Cria Laravel
    ↓
Stage 2 (production)
    ↓
Copia apenas o necessário
    ↓
Imagem final otimizada
```

---

# 🚀 Buildando a Imagem de Produção

```bash
docker build -t felipeken/laravel:prod laravel -f laravel/Dockerfile.prod
```

### Explicação:

- `-t` → Define nome e tag
- `laravel` → Contexto de build
- `-f` → Especifica qual Dockerfile usar
- `laravel/Dockerfile.prod` → Arquivo customizado

📌 O `-f` é usado quando o Dockerfile não se chama apenas `Dockerfile`.

---

# 📊 Benefícios do Multi-Stage

| Sem Multi-Stage | Com Multi-Stage |
|-----------------|-----------------|
| Imagem grande | Imagem pequena |
| Contém ferramentas de build | Contém apenas runtime |
| Menos segura | Mais segura |
| Deploy mais lento | Deploy mais rápido |

---

# 🧠 Resumo Mental

- Multi-Stage = múltiplas fases no mesmo Dockerfile
- Primeiro estágio → build
- Segundo estágio → produção
- `COPY --from=builder` copia artefatos
- Alpine reduz tamanho
- PHP-FPM é padrão para produção
- Nginx atua como proxy reverso