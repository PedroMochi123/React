import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ItemCliente = () => {

    const params = useParams();
    const [data, setData] = useState([]);

    const [id] = useState(params.id);

    useEffect(() => {
        const getPedidos = async () => {
            await axios.get(api + "/cliente/" + id + "/pedidos")
                .then((response) => {
                    console.log(response.data.pedidos);
                    setData(response.data.pedidos);
                })
                .catch(() => {
                    console.log("Erro. Sem conexão com a API.")
                });
        }
        getPedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente" className="btn btn-outline-success btn-sm">Clientes</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedido" className="btn btn-outline-success btn-sm">Pedidos</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Id Cliente</th>
                            <th>Data do pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedidos => (
                            <tr key={pedidos.id}>
                                <td>{pedidos.id}</td>
                                <td>{pedidos.ClienteId}</td>
                                <td>{pedidos.data}</td>
                                <td className="text-center">                                    
                                    <Link to={"/editar-pedido/"+pedidos.id}
                                        className="btn btn-outline-primary btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    )
}