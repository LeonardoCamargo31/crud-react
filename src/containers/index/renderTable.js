import React from 'react'
import PropTypes from 'prop-types'
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

const RenderTable = ({
  deleteProduct,
  duplicateProduct,
  findProductById,
  listProduct,
}) => {
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
          onClick={() => deleteProduct(row.id)}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  )

  return (
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
        <TableBody>{listProduct.map((row) => renderRow(row))}</TableBody>
      </Table>
    </TableContainer>
  )
}

RenderTable.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  duplicateProduct: PropTypes.func.isRequired,
  findProductById: PropTypes.func.isRequired,
  listProduct: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default RenderTable
