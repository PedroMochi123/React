/* export const ListarPedido =() =>{
    return(
        <div>Listar pedidos</div>
    );
}; */

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarPedidos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/listarpedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: Sem conexão com a API."
                });
                //console.log("Erro: Sem conexão com a API.");
            });
    };

    const delPedidos = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-Type' : 'application/json'
        }

        await axios.delete(api + "/excluir-pedido/" + idPedido, {headers})
        .then((response) =>{
            setStatus({
                type : 'success',
                message: "Pedido excluído com sucesso!"
            })
            console.log(response.data.type);
            console.log(response.data.message);
            getPedidos();
        }).catch(() => {
            setStatus({
                type : 'error',
                message: "Não foi possível conectar-se a API"
            })
        })
    };

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarpedidos"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.data}</td>
                                <td className="text-center/">
                                <Link to={"/editar-pedido/"+item.id}
                                        className="btn btn-outline-primary btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delPedidos(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};