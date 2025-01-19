import React, { Component } from "react";
import Main from "../template/Main";

const headerProps ={
    icon:'cubes',
    title:'Setor',
    subtitle:'Cadastro de Setor, Incluir, Listar, Alterar e Excluir'
}
export default class SectorCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
               Setor 
            </Main>
        )
    }
}