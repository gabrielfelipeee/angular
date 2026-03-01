# Usa a imagem oficial do Node.js versão 22 baseada em Alpine Linux
# Alpine é uma distro Linux extremamente leve, ideal para containers
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
# Todos os próximos comandos serão executados dentro de /app
WORKDIR /app

# Instala globalmente o json-server na versão 0.17.4
# O -g significa instalação global dentro do container
RUN npm install -g json-server@0.17.4

# Copia o arquivo db.production.json
# para o diretório /app dentro do container
COPY ./db.production.json .

# Informa que o container vai expor a porta 4000
# (é apenas documentação; o mapeamento real é feito no docker run ou docker-compose)
EXPOSE 4000

# Define o comando que será executado quando o container iniciar
# json-server inicia uma API fake baseada no arquivo JSON
# --watch observa mudanças no arquivo
# --host 0.0.0.0 permite acesso externo ao container
# --port 4000 define a porta onde o servidor vai rodar
ENTRYPOINT json-server --watch db.production.json --host 0.0.0.0 --port 4000
