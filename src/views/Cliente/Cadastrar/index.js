import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastarClientes = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente,[e.target.name]: e.target.value
    });

    const cadClientes = async e =>{
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type' : 'application/json'
        };

        await axios.post(api+"/cliente", cliente, {headers})
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
                    <h1>Cadastar Cliente</h1>
                </div>
            </div>
            <div className="p-2">
                <Link to="/listar-cliente"
                    className="btn btn-outline-success btn-sm">Clientes</Link>
            </div>

            <hr className="m-1"></hr>

            {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ''}

            {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadClientes}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do cliente..."
                        onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Endereço..."
                        onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Cidade..."
                        onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input type="text" name="uf" placeholder="UF..."
                        onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Nascimento</Label>
                    <Input type="text" name="nascimento" placeholder="Data de nascimento..."
                        onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "success">Cadastrar</Button>
            </Form>
        </Container>
    );
};