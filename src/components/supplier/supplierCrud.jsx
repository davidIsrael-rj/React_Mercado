import React, { Component } from "react";
import Main from "../template/Main";

const headerProps ={
    icon:'industry',
    title:'Fornecedor',
    subtitle:'Cadastro de Fornecedores, Incluir, Listar, Alterar e Excluir '
}
export default class SupplierCrud extends Component{
    render(){
        return(
            <Main {...headerProps}>
                Fornecedor
            </Main>
        )
    }
}