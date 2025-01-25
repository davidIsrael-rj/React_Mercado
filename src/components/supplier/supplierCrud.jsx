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

    updateFiel(event){
        const supplier = {...this.state.supplier}
        supplier[event.target.name] = event.target.value
        this.setState({supplier})
    }

    remove(supplier){
        axios.delete(`${baseUrl}/${supplier.id}`).then(resp =>{
            const list = this.getUpdatedList(supplier, false)
            this.setState({list})
        })
    }

    load(supplier){
        this.setState({supplier})
    }
    
    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.supplier.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o NOme do Fornecedor"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Endereço</label>
                            <input type="text" className="form-control" 
                                name="endereco"
                                value={this.state.supplier.endereco}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Endereço"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Numero</label>
                            <input type="text" className="form-control" 
                                name="numero"
                                value={this.state.supplier.numero}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Numero"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control" 
                                name="bairro"
                                value={this.state.supplier.bairro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Bairro"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control" 
                                name="cidade"
                                value={this.state.supplier.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a Cidade"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control" 
                                name="estado"
                                value={this.state.supplier.estado}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Estado"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Inscrição Estadual</label>
                            <input type="text" className="form-control" 
                                name="ie"
                                value={this.state.supplier.ie}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a Inscrição Estadual"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" className="form-control" 
                                name="cep"
                                value={this.state.supplier.cep}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CEP"
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
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}