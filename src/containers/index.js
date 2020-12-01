import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

const Index = () => {
  const [data, setData] = useState([])
  const [form, setForm] = useState(false)

  function handleForm() {
    setForm(!form)
  }

  useEffect(() => {
    axios
      .get('https://crudcrud.com/api/3ccd06bb2291442d87fbd518ae92003e/product')
      .then((res) => {
        setData(res.data)
      })
  }, [])

  const renderForm = () => (
    <div className={`c-form ${form ? 'c-form--open' : ''}`}>
      <h2 id="modal-title">Meu Título</h2>
      <p id="modal-description">Minha Descrição</p>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
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
          <EditIcon />
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
        {form ? 'Fechar formulário' : 'Adicionar produto'}
      </button>

      {renderTable()}
    </>
  )
}

export default Index
