import React, { Component } from "react";
import Main from "../template/Main";

const headerProps = {
    icon: 'shopping-cart',
    title: 'Clientes',
    subtitle: 'Cadastro de Clientes, Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/customer'
const initialState = {
    customer: { name: '', telefone: '', endereco: '', numero: '', bairro: '', cidade: '', estado: '', cpf: '', rg: '', cep: '' },
    list: []
}



export default class CustomerCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear(){
        this.setState({customer: initialState.customer})
    }

    render() {
        return (
            <Main {...headerProps}>
                Clientes
            </Main>
        )
    }
}