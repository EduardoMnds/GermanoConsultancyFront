# Germano Consultancy — Angular + CSS (pronto para Spring Boot)

Frontend em **Angular (standalone)** com **CSS puro** e layout enterprise (leve).

## Rodar local
Requisitos: Node + Angular CLI

```bash
npm install
npm start
```

Acesse: http://localhost:4200

## Configurar base URL do backend
`src/environments/environment.ts`
```ts
apiBaseUrl: 'http://localhost:8080/api'
```

## Endpoints esperados (você implementa no Spring)
- `POST /api/contact`

Payload:
```json
{ "name":"", "email":"", "company":"", "whats":"", "message":"" }
```

Erros sugeridos:
```json
{ "errors": { "email": "E-mail inválido" } }
```

## Onde trocar WhatsApp e links
`src/app/pages/home/home-page.component.ts`
- `whatsapp.number`
- `links.linkedin`
- `links.github`
