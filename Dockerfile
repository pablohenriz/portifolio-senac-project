# Imagem que vai ser usaada
FROM nginx:alpine

#copia todos os arquivos da pasta aual para a pasta padrao do nginx
COPY . /usr/share/nginx/html

#expoe a porta 80 do conteiner
EXPOSE 80