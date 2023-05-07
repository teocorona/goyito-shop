import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import useSWR from "swr";
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material'
import PeopleOutline from '@mui/icons-material/PeopleOutline'
import { AdminLayout } from '@components/layouts'
import { goyitoApi } from '../../axios-api';
import { roleType, UserType } from '@types';

const UsersPage: NextPage = () => {
  const { data, error, isLoading } = useSWR<UserType[]>('/api/admin/users')
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  if (isLoading) return <></>

  const onRoleUpdated = async (userId: string, newRole: roleType) => {
    const prevUsers = users.map(user => ({ ...user }))
    const updatedUsers = users.map(user => ({
      ...user,
      role: userId === user._id ? newRole : user.role
    }));
    setUsers(updatedUsers)
    try {
      await goyitoApi.put('/admin/users', { userId, role: newRole })
    } catch (error) {
      setUsers(prevUsers)
      alert('No se pudo actualizar el rol')
      console.log(error)
    }
  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre', width: 250 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={(event) => onRoleUpdated(row.id, event.target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value='client'>Client</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
          </Select>
        )
      }
    },
  ]
  const rows = users.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }))
  return (
    <AdminLayout
      title={'Usuarios'}
      subtitle={'Administracion de usuarios'}
      icon={<PeopleOutline />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default UsersPage