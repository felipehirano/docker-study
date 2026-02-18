# 🐳 Docker Study Repository

Este repositório reúne minhas anotações e estudos sobre Docker, Docker Compose e arquitetura de containers.

O objetivo é documentar de forma prática e progressiva os principais conceitos necessários para trabalhar com Docker em ambientes reais — desde fundamentos até cenários de produção.

---

# 🎯 O que você pode aprender aqui

## 🧱 Fundamentos do Docker

- O que é um container
- Diferença entre imagem e container
- Ciclo de vida de um container
- Principais comandos (`run`, `ps`, `exec`, `logs`, `rm`, `rmi`)
- Como funciona o Docker Hub

---

## 🖼️ Imagens e Dockerfile

- Como criar imagens personalizadas
- Entendendo `FROM`, `RUN`, `WORKDIR`, `COPY`
- Como funciona cache de build
- ENTRYPOINT vs CMD
- Publicação de imagens no Docker Hub
- Versionamento com tags

---

## 💾 Persistência de Dados

- Bind Mount vs Volume
- Como funcionam volumes gerenciados pelo Docker
- Persistência de banco de dados
- Compartilhamento de dados entre containers

---

## 🌐 Redes no Docker

- Tipos de network:
  - bridge
  - host
  - overlay
  - none
- Comunicação entre containers
- DNS interno do Docker
- Como containers acessam o host

---

## 🧪 Desenvolvimento com Containers

- Rodando Node.js sem instalar no host
- Bind mount para desenvolvimento
- Hot reload
- Empacotando aplicação com Dockerfile

---

## 🏗️ Arquitetura Real (Produção)

- Laravel com PHP-FPM
- Nginx como proxy reverso
- FastCGI
- Multi-stage builds
- Uso de Alpine Linux para otimização
- Separação build vs runtime

---

## 🐙 Docker Compose

- Orquestração de múltiplos containers
- Estrutura do `docker-compose.yaml`
- Build vs image
- Redes automáticas
- depends_on
- Rebuild de imagens
- Debug com logs

---

## 🗄️ Banco de Dados com Docker

- Subindo MySQL com volume persistente
- Conectando Node ao banco
- Comunicação via network interna
- Problemas de dependência entre containers
- Solução com dockerize
- Logs e troubleshooting

---

# 🚀 Conceitos Avançados Abordados

- Multi-stage build
- Imagem imutável
- Separação dev vs prod
- Estratégia profissional de build
- Proxy reverso
- PHP-FPM
- Espera de dependências entre serviços
- Persistência segura de dados

---

# 📂 Estrutura do Repositório

Este repositório está organizado em arquivos `.md` separados por tema:

- Chapter 1 - Getting Started
- Chapter 2 - Working With Images
- Chapter 3 - Network
- Chapter 4 - In Practice
- Chapter 5 - Optimizing Images
- Chapter 6 - Docker Compose

---

# 🧠 Público-Alvo

Este material é ideal para:

- Desenvolvedores iniciantes em Docker
- Devs que usam Docker mas querem entender melhor o que acontece por baixo dos panos

---

# 🔥 O que NÃO é este repositório

- Não é um curso formal
- Não é um guia teórico abstrato
- Não é focado em Kubernetes (ainda)

É um repositório de estudo prático, direto ao ponto, focado em entendimento real.

---

# 🛠️ Requisitos

- Docker instalado
- Docker Compose instalado
- Conhecimentos básicos de terminal
- Node ou PHP para acompanhar os exemplos

---

# 🤝 Contribuições

Se você encontrar:

- Melhorias
- Correções
- Sugestões
- Exemplos adicionais

Sinta-se à vontade para abrir uma issue ou PR.