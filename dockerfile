#./Dockerfile
FROM node:16
# 기반이 될 이미지

WORKDIR /data

## Install packages
COPY package*.json ./
COPY ./prisma/schema.prisma ./
RUN npm install

RUN npx prisma generate

RUN rm ./schema.prisma

# COPY . .
# COPY .env ./
COPY server.js ./
COPY routes/ routes/
COPY prisma/ prisma/
COPY controllers/ controllers/
COPY services/ services/
COPY models/ models/
COPY databases/ databases/

ENV PORT=8000
ENV DATABASE_URL="mysql://root:dkaghrkanjdi!@10.133.30.32:33306/test01"

## Run the application on the port 8000
EXPOSE 8000

CMD ["npm", "start"]
