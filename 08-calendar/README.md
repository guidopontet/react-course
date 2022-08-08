# Calendar App

## Preview
[https://calendar-api-mern-stack.herokuapp.com/](https://calendar-api-mern-stack.herokuapp.com/)

## Development

1.  Renombrar el archivo `env.template` por `.env`
2.  Hacer los cambios necesarios en las variables de entornos

```
VITE_API_URL=http://localhost:4000/api
```

## Notas
En el **proyecto 8 (Calendar)**, hay una alternativa que es bastante utilizada y simplifica el
uso de operaciones async en lugar de utilizar `thunks`. La ventaja al crear estos `customs
hooks` es que también se simplifica el acceso al store significativamente, por lo que este
aproach es conveniente.