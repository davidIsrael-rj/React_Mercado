import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps ={
    icon:'cubes',
    title:'Setor',
    subtitle:'Cadastro de Setor, Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/sector'
const initialState ={
    sector:{name:''},
    list:[]
}


export default class SectorCrud extends Component {
    state= {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({sector: initialState.sector})
    }

    save(){
        const sector = this.state.sector
        const method =  sector.id ? 'put' : 'post'
        const url = sector.id ? `${baseUrl}/${sector.id}` : baseUrl
        axios[method](url, sector)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState({sector: initialState.sector, list})
            })
    }

    getUpdatedList(sector, add = true){
        const list = this.state.list.filter(s => s.id !== sector.id)
        if(add) list.unshift(sector)
            return list
    }

    updateField(event){
        const sector = {...this.state.sector}
        sector[event.target.name] = event.target.value
        this.setState({sector})
    }

    remove(sector){
        axios.delete(`${baseUrl}/${sector.id}`).then(resp =>{
            const list = this.getUpdatedList(sector, false)
            this.setState({list})
        })
    }
    
    load(sector){
        this.setState({sector})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.sector.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do Setor"
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
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(sector =>{
            return(
                <tr key={sector.id}>
                    <td>{sector.id}</td>
                    <td>{sector.name}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() =>this.load(sector)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={()=>this.remove(sector)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
               {this.renderTable()}
            </Main>
        )
    }
}