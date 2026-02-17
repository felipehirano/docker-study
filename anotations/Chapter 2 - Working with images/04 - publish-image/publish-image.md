# 🐳 Como Publicar uma Imagem no Docker Hub

Publicar uma imagem significa enviá-la para um **container registry**, permitindo que outras pessoas (ou outros servidores) possam baixá-la.

O registry mais comum é o **Docker Hub**.

---

# 📦 Pré-requisitos

Antes de publicar uma imagem, você precisa:

- Ter uma conta no Docker Hub
- Ter criado uma imagem localmente (`docker build`)
- A imagem precisa estar corretamente nomeada no formato:

```
usuario/nome-da-imagem:tag
```

Exemplo:

```
felipeken/nginx-com-vim:latest
```

---

# 🔐 1️⃣ Fazer Login

```bash
docker login
```

Você deverá informar:

- Username
- Password (ou Access Token)

Após login bem-sucedido, o Docker poderá enviar imagens para sua conta.

---

# 🚀 2️⃣ Publicar a Imagem

```bash
docker push IMAGE_NAME
```

Exemplo:

```bash
docker push felipeken/nginx-com-vim:latest
```

O Docker irá:

1. Verificar quais layers já existem no Docker Hub
2. Enviar apenas as layers que ainda não estão no registry
3. Publicar a imagem com a tag especificada

---

# 🏷️ Importância das Tags

Você pode publicar múltiplas versões:

```bash
docker tag minha-imagem felipeken/app:1.0.0
docker push felipeken/app:1.0.0
```

Boa prática:

- Não usar apenas `latest` em produção
- Versionar corretamente (ex: `1.0.0`, `1.1.0`, etc.)

---

# ⏳ Política de Inatividade no Docker Hub

Imagens públicas no Docker Hub podem ser removidas após **90 dias de inatividade**, dependendo do tipo de conta.

Para manter a imagem ativa:

- Faça um `docker pull` ocasionalmente
- Ou automatize pulls via CI/CD
- Ou publique novas versões periodicamente

---

# 🔎 Verificando no Docker Hub

Após o push:

- Acesse https://hub.docker.com
- Vá até seu repositório
- A imagem estará disponível para download público (ou privado, se configurado)

---

# 📥 Testando a Imagem Publicada

Em outra máquina:

```bash
docker pull felipeken/nginx-com-vim:latest
```

E depois:

```bash
docker run -it felipeken/nginx-com-vim:latest bash
```

Se funcionar, sua publicação foi bem-sucedida.

---

# 🧠 Fluxo Completo Mental

1. Criar Dockerfile
2. Buildar imagem (`docker build`)
3. Login (`docker login`)
4. Tag correta (`usuario/imagem:tag`)
5. Publicar (`docker push`)
6. Baixar em outro ambiente (`docker pull`)

---

# 🎯 Resumo Final

- `docker login` → Autenticação
- `docker build` → Criar imagem
- `docker tag` → Versionar corretamente
- `docker push` → Publicar no Docker Hub
- `docker pull` → Baixar imagem publicada