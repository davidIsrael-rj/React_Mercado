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

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ product: initialState.product })
    }

    save() {
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ product: initialState.product, list })
            })
    }

    getUpdatedList(product, add = true) {
        const list = this.state.list.filter(p => p.id !== product.id)
        if (add) list.unshift(product)
        return list
    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.getUpdatedList(product, false)
            this.setState({ list })
        })
    }



    load(product) {
        this.setState({ product })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.product.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a descrição do produto"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Custo</label>
                            <input type="text" className="form-control"
                                name="precoCusto"
                                value={this.state.product.precoCusto}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço de custo"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço Venda</label>
                            <input type="text" className="form-control"
                                name="precoVenda"
                                value={this.state.product.precoVenda}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço de venda"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Setor</label>
                            <input type="text" className="form-control"
                                name="setor"
                                value={this.state.product.setor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o setor"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Fornecedor</label>
                            <input type="text" className="form-control"
                                name="fornecedor"
                                value={this.state.product.fornecedor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Fornecedor"
                            />
                        </div>
                    </div>

                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary m-1"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary m-1"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
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

    renderRows() {
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.precoCusto}</td>
                    <td>{product.precoVenda}</td>
                    <td>{product.setor}</td>
                    <td>{product.fornecedor}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={()=> this.remove(product)}>
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
                {this.renderForm()}
                {this.renderTable()}

            </Main>
        )
    }
}