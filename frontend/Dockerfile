FROM node:alpine as builder
# RUN npm install @angular/cli -g
WORKDIR /app/frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod

# CMD ["ng","serve","--host", "0.0.0.0"]

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/frontend/dist/frontend /usr/share/nginx/html