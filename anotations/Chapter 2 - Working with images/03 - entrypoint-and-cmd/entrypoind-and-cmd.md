# 🐳 ENTRYPOINT vs CMD

Entender a diferença entre `ENTRYPOINT` e `CMD` é essencial para dominar o comportamento de execução de containers.

Ambos definem o que será executado quando o container iniciar — mas funcionam de maneiras diferentes.

---

# 📦 Exemplo 1 — Usando apenas CMD

## 📄 Dockerfile

```dockerfile
FROM ubuntu:latest

CMD ["echo", "Hello World"]
```

---

## 🚀 O que acontece?

Ao buildar essa imagem e rodar:

```bash
docker run --rm felipeken/hello
```

Saída:

```
Hello World
```

O `CMD` define o comando padrão que será executado.

---

## 🔄 Sobrescrevendo o CMD

O `CMD` pode ser substituído no momento da execução:

```bash
docker run --rm felipeken/hello echo "Oi"
```

Saída:

```
Oi
```

Ou:

```bash
docker run --rm felipeken/hello bash
```

Agora o comando executado será:

```
bash
```

📌 Quando você passa algo após o nome da imagem, o `CMD` é substituído.

---

# 📦 Exemplo 2 — Usando ENTRYPOINT + CMD

Agora vamos combinar os dois.

## 📄 Dockerfile

```dockerfile
FROM ubuntu:latest

ENTRYPOINT ["echo", "Hello"]
CMD ["World"]
```

---

# 🧠 Como funciona?

- `ENTRYPOINT` → Comando fixo
- `CMD` → Parâmetros padrão para o ENTRYPOINT

---

## 🚀 Execução padrão

```bash
docker run --rm felipeken/hello
```

Saída:

```
Hello World
```

O Docker executa:

```
echo Hello World
```

---

## 🔄 Alterando apenas o CMD

```bash
docker run --rm felipeken/hello "Docker"
```

Saída:

```
Hello Docker
```

Aqui o `CMD` foi substituído, mas o `ENTRYPOINT` continua fixo.

---

# ❗ Importante

Se você fizer:

```bash
docker run --rm felipeken/hello echo "Oi"
```

Nesse caso:

- Você está sobrescrevendo completamente o ENTRYPOINT
- O comando executado será apenas `echo Oi`

Para sobrescrever explicitamente o ENTRYPOINT:

```bash
docker run --rm --entrypoint bash felipeken/hello
```

---

# 🧠 Diferença Conceitual

| CMD | ENTRYPOINT |
|------|------------|
| Pode ser sobrescrito facilmente | É fixo por padrão |
| Define comando padrão | Define executável principal |
| Ideal para default behavior | Ideal para transformar container em "executável" |

---

# 🎯 Quando usar cada um?

## Use CMD quando:

- Você quer um comando padrão
- Mas permitir substituição total

Exemplo: containers de desenvolvimento

---

## Use ENTRYPOINT quando:

- Quer que o container sempre execute algo específico
- Quer que o container se comporte como um binário

Exemplo: imagem oficial do `nginx`, `node`, `postgres`

---

# 🧱 Fluxo Mental

### Apenas CMD

```
docker run imagem comando
→ comando substitui CMD
```

### ENTRYPOINT + CMD

```
ENTRYPOINT → executável fixo
CMD → parâmetros padrão
docker run imagem novo_parametro
→ novo_parametro substitui apenas CMD
```

---

# 🔥 Resumo Final

- `CMD` → Comando padrão
- Pode ser substituído facilmente
- `ENTRYPOINT` → Comando principal fixo
- `CMD` pode servir como parâmetro para o ENTRYPOINT
- Juntos, criam comportamento flexível e poderoso