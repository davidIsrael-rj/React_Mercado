import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps = {
    icon: 'cart-plus',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos, Incluir, Listar, alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/product'

const initialState = {
    product: { name: "", precoCusto: "", precoVenda: "", setor: "", fornecedor: "" },
    list: []
}

export default class ProductCrud extends Component {
    state = { ...initialState }

    componentWillMount(){
        axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preço Custo</th>
                        <th>Preco Venda</th>
                        <th>Setor</th>
                        <th>Fornecedor</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(product =>{
            return(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.precoCusto}</td>
                    <td>{product.precoVenda}</td>
                    <td>{product.setor}</td>
                    <td>{product.fornecedor}</td>
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