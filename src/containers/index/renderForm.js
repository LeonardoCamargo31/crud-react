import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const RenderForm = ({
  onChangeInput,
  openForm,
  formData,
  handleSubmitButton,
}) => (
  <div className={`c-form ${openForm ? 'c-form--open' : ''}`}>
    <h2 id="modal-title">
      {formData.id ? 'Atualizar produto' : 'Inserir novo produto'}
    </h2>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <input type="hidden" id="id" value={formData.id} />
        <FormControl fullWidth>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <Input name="name" value={formData.name} onChange={onChangeInput} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel htmlFor="color">Cor</InputLabel>
          <Input name="color" value={formData.color} onChange={onChangeInput} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          onClick={handleSubmitButton}
          variant="contained"
          color="primary"
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  </div>
)

RenderForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  handleSubmitButton: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
}

export default RenderForm
