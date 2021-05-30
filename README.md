# God's Food :spaghetti:
![God's Food](/godsfood.png)

O God's Food é um sistema de emissão e acompanhamento de pedidos e cobrança direcionado a restaurantes.

## Características 

- Emissão de pedido para a cozinha(Administrador)
- Emissão de conta para o cliente
- Cadastro de Produtos
- Cardápio
- Gestão e acompanhamento de pedidos
- Automação e centralização de compras e vendas de produto em uma plataforma online.
- Pagamento online via cartão de crédito

# Executando localmente

Clonar o repositório localmente
```shell
git clone https://github.com/AnthonyAlmeida-exe/godfoods.git

cd godfoods
```

## Iniciando a aplicação :computer:

Primeiro executar o back-end
```shell
cd back-end
// verificar dependências
yarn

// executar o back-end em segundo plano
yarn develop 
```

Em um novo terminal executar o front-end 

```shell
cd front-end
// verificar dependências
yarn

// executar o front-end
yarn dev
```

# Estrutra de Diretórios :open_file_folder:

```
godfoods/           # Diretório Root.
|- back-end/        # Diretório do server-side e framework utilizado(Strapi).
|- front-end/       # Diretório do client-side
|- README.md
```

# Teste com dados genéricos :white_check_mark:

Dados de cartão de crédito para teste são fornecidos pelo próprio framework usado para desenvolver a aplicação.

[International test card numbers](https://stripe.com/docs/testing#international-cards)

