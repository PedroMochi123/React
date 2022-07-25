import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './views/Home/index';
import { ListarServicos} from './views/Servico/Listar/index';
import { Menu} from './views/components/Menu';
import { Item} from './views/Servico/item/index';
import { Cadastar } from './views/Servico/Cadastrar';
import {ListarClientes} from './views/Cliente/Listar/index';
import {CadastarClientes} from'./views/Cliente/Cadastrar/index';
import { ListarPedidos} from './views/Pedido/Listar/index';
import { CadastarPedido} from './views/Pedido/Cadastrar/index';
import { EditarPedidoCliente } from './views/Cliente/EditarPedido/index';
import { EditarServico } from './views/Servico/EditarServico';
import { ItemCliente } from './views/Cliente/item';

function App() {
  return (
    <div>
      <Router>
        <Menu></Menu>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/listar-cliente' element={<ListarClientes/>}></Route>
          <Route path='/listar-pedido' element={<ListarPedidos/>}></Route>
          <Route path='/listar-servico' element={<ListarServicos/>}></Route>
          <Route path='/listar-pedido/:id' element={<Item/>}></Route>
          <Route path='/cadastrarservico' element={<Cadastar/>}></Route>
          <Route path='/cadastrarclientes' element={<CadastarClientes/>}></Route>
          <Route path='/cadastrarpedidos' element={<CadastarPedido/>}></Route>
          <Route path='/editar-pedido/:id' element={<EditarPedidoCliente/>}></Route>
          <Route path='/editar-servico/:id' element={<EditarServico/>}></Route>
          <Route path='/listar-pedidoCliente/:id' element={<ItemCliente/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
