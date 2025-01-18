import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

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

    clear() {
        this.setState({ customer: initialState.customer })
    }

    save() {
        const customer = this.state.customer
        const method = customer.id ? 'put' : 'post'
        const url = customer.id ? `${baseUrl}/${customer.id}` : baseUrl
        axios[method](url, customer)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ customer: initialState.customer, list })
            })
    }

    render() {
        return (
            <Main {...headerProps}>
                Clientes
            </Main>
        )
    }
}