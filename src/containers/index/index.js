import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import notify from '../../utils/notify'
import api from '../../utils/api'
import RenderForm from './renderForm'
import RenderTable from './renderTable'

const INITIAL_FORM = { id: '', name: '', color: '' }
const INITIAL_LIST = []

const Index = () => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [listProduct, setListProduct] = useState(INITIAL_LIST)
  const [openForm, setOpenForm] = useState(false)

  const loadAllProducts = () => {
    api.get('/product').then((res) => {
      if (res.status === 200) {
        setListProduct(res.data)
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
        console.log('Dados duplicar', formData)

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

  const deleteProduct = (id) => {
    console.log('Id do produto para excluir', id)
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
        console.log('Dados editar', formData)
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
        console.log('Dados salvar', formData)
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
        <RenderTable
          deleteProduct={deleteProduct}
          duplicateProduct={duplicateProduct}
          findProductById={findProductById}
          listProduct={listProduct}
        />
      </Box>
    </>
  )
}

export default Index
