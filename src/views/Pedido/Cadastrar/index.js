import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastarPedido = () => {

    const [pedido, setPedido] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]: e.target.value
    });

    const cadPedido = async e =>{
        e.preventDefault();
        console.log(pedido);

        const headers = {
            'Content-Type' : 'application/json'
        };

        await axios.post(api+"/pedidos", pedido, {headers})
        .then((response) =>{
            //console.log(response.data.message);
            if(response.data.error){
                setStatus({
                    type:'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type:'success',
                    message: response.data.message
                });
            };
        })
        .catch(() =>{
            console.log("Erro: Sem conexão com a API.");
        });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastar Pedido</h1>
                </div>
            </div>
            <div className="p-2">
                <Link to="/listar-pedido"
                    className="btn btn-outline-success btn-sm">Pedidos</Link>
            </div>

            <hr className="m-1"></hr>

            {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ''}

            {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ''}

            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>ID</Label>
                    <Input type="text" name="id" placeholder="Número do id..."
                        onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cliente</Label>
                    <Input type="text" name="ClienteId" placeholder="ID do cliente..."
                        onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="text" name="data" placeholder="Data..."
                        onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "success">Cadastrar</Button>
            </Form>
        </Container>
    );
};