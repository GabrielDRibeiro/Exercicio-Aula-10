import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses} from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      grey: '767676',
    },

    primary: {
      main: '#b30e0e',
    },
    secondary: {
      main: '#e1e1e1',
      cinza: '#222222',
    },
  },

  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'sans-serif'
    ].join(','),
    fontsize: 14,
  }
});

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.cinza,
    },
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card>
          <CardHeader
            title="Objetivo do exercício:"
            subheader="Modificar o código, seja alterando a parte de estilos, seja modificando algum comportamento. "
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Título</StyledTableCell>
                    <StyledTableCell align="left">Descrição</StyledTableCell>
                    <StyledTableCell align="left">Data de Início</StyledTableCell>
                    <StyledTableCell align="left">Data de Finalização</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                    <StyledTableCell align="left">Recurso</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tarefas.map((row, indice) => (
                    <TableRow
                      key={indice}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.idTarefa}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.tituloTarefa}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.descricaoTarefa}</StyledTableCell>
                      <StyledTableCell align="left">{row.inicioTarefa}</StyledTableCell>
                      <StyledTableCell align="left">{row.fimTarefa}</StyledTableCell>
                      <StyledTableCell align="left">{row.statusTarefa}</StyledTableCell>
                      <StyledTableCell align="left">{row.recursoTarefa}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleOpen}>Criar Tarefa</Button>
            <Button size="small" variant="outlined">Cancelar</Button>
          </CardActions>
        </Card>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            open={openEditar}
            onClose={handleCloseEditar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
            </div>
          </Modal>
        </div>
      </ThemeProvider >
    </>
  );
};

export default ListarTarefa;