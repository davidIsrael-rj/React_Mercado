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

    updateField(event) {
        const customer = { ...this.state.customer }
        customer[event.target.name] = event.target.value
        this.setState({ customer })
    }

    load(customer){
        this.setState({customer})
    }

    remove(customer){
        axios.delete(`${baseUrl}/${customer.id}`).then(resp =>{
            const list = this.getUpdatedList(customer, false)
            this.setState({list})
        })
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
                                value={this.state.customer.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" className="form-control"
                                name="telefone"
                                value={this.state.customer.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o telefone..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Endereco</label>
                            <input type="text" className="form-control"
                                name="endereco"
                                value={this.state.customer.endereco}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o endereço..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Numero</label>
                            <input type="text" className="form-control"
                                name="numero"
                                value={this.state.customer.numero}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o numero..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control"
                                name="bairro"
                                value={this.state.customer.bairro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o bairro..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control"
                                name="cidade"
                                value={this.state.customer.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a cidade..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control"
                                name="estado"
                                value={this.state.customer.estado}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o estado..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="cpf"
                                value={this.state.customer.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o cpf..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>RG</label>
                            <input type="text" className="form-control"
                                name="rg"
                                value={this.state.customer.rg}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o RG..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" className="form-control"
                                name="cep"
                                value={this.state.customer.cep}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CEP..."
                            />
                        </div>
                    </div>
                    
                </div>
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
                        <button className="btn btn-warning"
                            onClick={() =>this.load(customer)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() =>this.remove(customer)}>
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