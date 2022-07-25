import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../config";

export const EditarServico = () => {

    const params = useParams();
    const [id, setId] = useState(params.id);
    const [ServicoId, setServicoId] = useState(params.ServicoId);
    const [PedidoId, setPedidoId] = useState(params.PedidoId);
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + '/pedidos/' + PedidoId + '/editaritem', { ServicoId, PedidoId, quantidade, valor}, { headers })
        .then((response) => {
            if(response.data.error){
                setStatus({
                    type:'error',
                    message: "Erro: Houve um problema de conexão com a API"
                });
            }else{
                setStatus({
                    type:'success',
                    message: "Pedido alterado com sucesso!"
                });
            };
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar a API.'
            });
        });
    }

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + '/servico/' + id)
                .then((response) => {
                    setId(response.data.serv.ServicoId);
                    setQuantidade(response.data.serv.quantidade);
                    setValor(response.data.serv.valor);
                    setPedidoId(response.data.serv.PedidoId);
                    setServicoId(response.data.serv.ServicoId);
                })
                .catch(() => {
                    console.log("Erro: impossível acessar a API.");
                });
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico" className="m-auto btn btn-outline-primary btn-sm">Serviços</Link>
                    </div>
                    <hr className="m-1"/>
                    {status.type === 'error' ? 
                        <Alert color="danger">{status.message}</Alert> : ""} 
                    {status.type === 'success' ? 
                        <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtServico}>
                    <FormGroup className="p-2">
                        <Label>ID do servico</Label>
                        <Input type="text" name="ServicoId" placeholder="ID do servico..."
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ID do pedido</Label>
                        <Input type="text" name="PedidoId" placeholder="ID do pedido..."
                            defaultValue={PedidoId} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade" placeholder="Quantidade..."
                            value = {quantidade} onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor..."
                            value = {valor} onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="warning">Atualizar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};