import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps = {
    icon: 'industry',
    title: 'Fornecedor',
    subtitle: 'Cadastro de Fornecedores, Incluir, Listar, Alterar e Excluir '
}

const baseUrl = 'http://localhost:3001/supplier'
const initialState = {
    supplier: { name: "", endereco: "", numero: "", bairro: "", cidade: "", estado: "", ie: "", cep: "" },
    list: []
}

export default class SupplierCrud extends Component {
    state={...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({supplier: initialState.supplier})
    }

    save(){
        const supplier = this.state.supplier
        const method = supplier.id ? 'put' : 'post'
        const url = supplier.id ? `${baseUrl}/${supplier.id}` : baseUrl
        axios[method](url, supplier)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState({supplier: initialState.supplier, list})
            })
    }

    getUpdatedList(supplier, add = true){
        const list = this.state.list.filter(f => f.id !==supplier.id)
        if(add) list.unshift(supplier)
            return list
    }
    

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Endereco</th>
                        <th>Numero</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>IE</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(supplier =>{
            return(
                <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.endereco}</td>
                    <td>{supplier.numero}</td>
                    <td>{supplier.bairro}</td>
                    <td>{supplier.cidade}</td>
                    <td>{supplier.estado}</td>
                    <td>{supplier.ie}</td>
                    <td>{supplier.cep}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button  className="btn btn-danger ml-2">
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