import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import Grid from '@material-ui/core/Grid'
import api from '../utils/api'

const Index = () => {
  const [form, setForm] = useState({ id: null, name: '', color: '' })
  const [data, setData] = useState([])
  const [openForm, setOpenForm] = useState(true)

  const loadProducts = () => {
    api.get('/product').then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleForm = () => {
    setOpenForm(!form)
  }

  const onChangeInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const findProductById = (id) => {
    api.get(`/product/${id}`).then((res) => {
      if (res.status === 200) {
        setForm(res.data)
      }
    })
  }

  const handleButton = () => {
    const id = document.getElementById('id').value
    if (id) {
      api.put(`/product/${id}`, form).then((res) => {
        console.log(res)
        if (res.status === 200) {
          setForm({ id: null, name: '', color: '' })
          loadProducts()
        }
      })
    } else {
      api.post('/product', form).then((res) => {
        if (res.status === 201) {
          setForm({ id: null, name: '', color: '' })
          loadProducts()
        }
      })
    }
  }

  const renderForm = () => (
    <div className={`c-form ${form ? 'c-form--open' : ''}`}>
      <h2 id="modal-title">Meu Título</h2>
      <p id="modal-description">Minha Descrição</p>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <input type="hidden" id="id" value={form.id} />
          <FormControl fullWidth>
            <InputLabel htmlFor="name">Nome</InputLabel>
            <Input name="name" value={form.name} onChange={onChangeInput} />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="color">Cor</InputLabel>
            <Input name="color" value={form.color} onChange={onChangeInput} />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleButton} color="primary">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </div>
  )

  const renderRow = (row) => (
    <TableRow key={row.name}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.color}</TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary">
          <EditIcon onClick={() => findProductById(row.id)} />
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained">
          <FileCopyIcon />
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="secondary">
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  )

  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome do produto</TableCell>
            <TableCell align="right">Cor</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Duplicar</TableCell>
            <TableCell align="right">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data.map((row) => renderRow(row))}</TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <>
      {renderForm()}

      <button type="button" onClick={handleForm}>
        {openForm ? 'Fechar formulário' : 'Adicionar produto'}
      </button>

      {renderTable()}
    </>
  )
}

export default Index
