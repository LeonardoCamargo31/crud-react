import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import notify from '../../utils/notify'
import api from '../../utils/api'

import RenderForm from './renderForm'

const INITIAL_FORM = { id: '', name: '', color: '' }
const INITIAL_LIST = []

const Index = () => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [data, setData] = useState(INITIAL_LIST)
  const [openForm, setOpenForm] = useState(true)

  const loadAllProducts = () => {
    api.get('/product').then((res) => {
      if (res.status === 200) {
        setData(res.data)
      } else {
        notify('error', 'Não foi possível carregar os produtos!')
      }
    })
  }

  useEffect(() => {
    loadAllProducts()
  }, [])

  const handleOpenForm = () => {
    setOpenForm(!openForm)
  }

  const onChangeInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const findProductById = (id) => {
    api.get(`/product/${id}`).then((res) => {
      if (res.status === 200) {
        setFormData(res.data)
        if (!openForm) {
          setOpenForm(!openForm)
        }
      }
    })
  }

  const duplicateProduct = (id) => {
    api.get(`/product/${id}`).then((resFind) => {
      if (resFind.status === 200) {
        const product = {
          name: resFind.data.name,
          color: resFind.data.color,
        }

        api.post('/product', product).then((resSave) => {
          if (resSave.status === 201) {
            loadAllProducts()
            notify('success', 'Produto duplicado com sucesso!')
          } else {
            notify('error', 'Não foi possível duplicar o produto!')
          }
        })
      }
    })
  }

  const deleteById = (id) => {
    api.delete(`/product/${id}`).then((res) => {
      if (res.status === 200) {
        setFormData(res.data)
        loadAllProducts()
        notify('success', 'Produto excluído com sucesso!')
      } else {
        notify('error', 'Não foi possível excluir o produto!')
      }
    })
  }

  const handleSubmitButton = () => {
    if (formData.name !== '' && formData.color !== '') {
      const id = document.getElementById('id').value
      if (id !== '') {
        api.put(`/product/${id}`, formData).then((res) => {
          if (res.status === 200) {
            setFormData(INITIAL_FORM)
            loadAllProducts()
            notify('success', 'Produto alterado com sucesso!')
          } else {
            notify('error', 'Não foi possível alterar o produto!')
          }
        })
      } else {
        api.post('/product', formData).then((res) => {
          if (res.status === 201) {
            setFormData(INITIAL_FORM)
            loadAllProducts()
            notify('success', 'Produto criado com sucesso!')
          } else {
            notify('error', 'Não foi possível criar o produto!')
          }
        })
      }
    }
  }

  const renderRow = (row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.color}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => findProductById(row.id)}
        >
          <EditIcon />
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={() => duplicateProduct(row.id)}>
          <FileCopyIcon />
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteById(row.id)}
        >
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
            <TableCell>Id</TableCell>
            <TableCell>Nome do produto</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Duplicar</TableCell>
            <TableCell align="center">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data.map((row) => renderRow(row))}</TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <>
      <Box pr={2} pl={2}>
        <Box mb={2}>
          <RenderForm
            onChangeInput={onChangeInput}
            openForm={openForm}
            formData={formData}
            handleSubmitButton={handleSubmitButton}
          />
        </Box>

        <Box mb={2}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleOpenForm}
          >
            {openForm ? 'Fechar formulário' : 'Adicionar produto'}
          </Button>
        </Box>
      </Box>
      <Box pr={2} pl={2}>
        {renderTable()}
      </Box>
    </>
  )
}

export default Index
