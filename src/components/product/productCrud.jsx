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

    clear(){
        this.setState({product: initialState.product})
    }

    save(){
        const product = this.state.product
        const method = product.id ? 'put': 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState({product: initialState.product, list})
            })
    }

    getUpdatedList(product, add = true){
        const list = this.state.list.filter(p => p.id !== product.id)
        if(add) list.unshift(product)
            return list
    }

    updateField(event){
        const product = {...this.state.product}
        product[event.target.name] = event.target.value
        this.setState({product})
    }

    remove(product){
        axios.delete(`${baseUrl}/${product.id}`).then(resp =>{
            const list = this.getUpdatedList(product, false)
            this.setState({list})
        })
    }



    load(product){
        this.setState({product})
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