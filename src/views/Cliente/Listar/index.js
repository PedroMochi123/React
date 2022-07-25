/* export const Listar =() =>{
    return(
        <div>Listar clientes</div>
    );
}; */


import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarClientes = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: Sem conexão com a API."
                });
                //console.log("Erro: Sem conexão com a API.");
            });
    };

    const delCliente = async (idCliente) => {
        console.log(idCliente);

        const headers = {
            'Content-Type' : 'application/json'
        }

        await axios.delete(api + "/excluir-cliente/" + idCliente, {headers})
        .then((response) =>{
            setStatus({
                type : 'success',
                message: "Cliente excluído com sucesso!"
            })
            console.log(response.data.type);
            console.log(response.data.message);
            getClientes();
        }).catch(() => {
            setStatus({
                type : 'error',
                message: "Não foi possível conectar-se a API"
            })
        })
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarclientes"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedidoCliente/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delCliente(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};