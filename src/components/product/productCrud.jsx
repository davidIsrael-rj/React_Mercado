import React, { Component } from "react";
import Main from "../template/Main";

const headerProps ={
    icon:'cart-plus',
    title:'Produtos',
    subtitle:'Cadastro de Produtos, Incluir, Listar, alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/product'

const initialState ={
    sector:{name: "",precoCusto: "",precoVenda: "",setor: "",fornecedor: "" },
    list:[]
}

export default class ProductCrud extends Component{
    render(){

        return(
            <Main {...headerProps}>
                Produtos
            </Main>
        )
    }
}