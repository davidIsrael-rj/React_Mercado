import React, { Component } from "react";
import Main from "../template/Main";

const headerProps = {
    icon: 'shopping-cart',
    title: 'Clientes',
    subtitle:'Cadastro de Clientes, Incluir, Listar, Alterar e Excluir!'
}



export default class CustomerCrud extends Component{
   
    render(){
        return(
            <Main {...headerProps}>
                Clientes
            </Main>
        )
    }
}