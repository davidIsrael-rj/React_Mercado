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

    

    

    load(sector){
        this.setState({sector})
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

    render(){
        return(
            <Main {...headerProps}>
               {this.renderTable()}
            </Main>
        )
    }
}