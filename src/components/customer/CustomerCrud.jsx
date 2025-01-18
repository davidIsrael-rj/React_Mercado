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

    getUpdatedList(customer, add = true) {
        const list = this.state.list.filter(c => c.id !== customer.id)
        if (add) list.unshift(customer)
        return list
    }

    updateField(event){
        const customer = {...this.state.customer}
        customer[event.targer.name] = event.target.value
        this.setState({customer})
    }



    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>N°</th>
                        <th>Bairro</th>
                        <th>Estado</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(customer => {
            return (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.endereco}</td>
                    <td>{customer.numero}</td>
                    <td>{customer.bairro}</td>
                    <td>{customer.estado}</td>
                    <td>{customer.cep}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }
}