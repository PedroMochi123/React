import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './views/Home/index';
import { Listar} from './views/Cliente/Listar/index';
import { ListarPedido} from './views/Pedido/Listar/index';
import { ListarServicos} from './views/Servico/Listar/index';
import { Menu} from './views/components/Menu';
import { Item} from './views/Servico/item/index';

function App() {
  return (
    <div>
      <Router>
        <Menu></Menu>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/listar-cliente' element={<Listar/>}></Route>
          <Route path='/listar-pedido' element={<ListarPedido/>}></Route>
          <Route path='/listar-servico' element={<ListarServicos/>}></Route>
          <Route path='/listar-pedido/:id' element={<Item/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
