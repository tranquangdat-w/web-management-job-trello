import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  TextField,
  InputAdornment,
  Avatar,
  Switch,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Typography,
  Paper,
  Chip
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  fetchUsersAPI,
  updateUserRoleAPI,
  updateUserStatusAPI,
  selectAdminUsers,
  selectAdminUsersTotal,
  selectAdminUsersLimit,
  selectAdminUsersLoading
} from '~/redux/adminUsers/adminUsersSlice'

export const UserManagement = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAdminUsers)
  const total = useSelector(selectAdminUsersTotal)
  const limit = useSelector(selectAdminUsersLimit)
  const isLoading = useSelector(selectAdminUsersLoading)

  const [search, setSearch] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: limit })

  useEffect(() => {
    dispatch(fetchUsersAPI({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      search
    }))
  }, [dispatch, paginationModel, search])

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRoleAPI({ userId, role: newRole }))
  }

  const handleStatusToggle = (userId, currentStatus) => {
    dispatch(updateUserStatusAPI({ userId, isActive: !currentStatus }))
  }

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 80,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {params.value ? (
            <Avatar src={params.value} sx={{ width: 40, height: 40 }}>
              {params.row.username?.[0]?.toUpperCase()}
            </Avatar>
          ) : (
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
              {params.row.username?.[0]?.toUpperCase()}
            </Avatar>
          )}
        </Box>
      ),
      sortable: false,
      filterable: false
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 140,
      renderCell: (params) => (
        <FormControl size="small" fullWidth>
          <Select
            value={params.value}
            onChange={(e) => handleRoleChange(params.row._id, e.target.value)}
            startAdornment={
              params.value === 'admin' ? (
                <AdminPanelSettingsIcon sx={{ fontSize: 18, mr: 0.5, color: 'warning.main' }} />
              ) : (
                <PersonIcon sx={{ fontSize: 18, mr: 0.5, color: 'action.active' }} />
              )
            }
            sx={{
              '& .MuiSelect-select': {
                py: 0.75,
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            <MenuItem value="client">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon fontSize="small" />
                Client
              </Box>
            </MenuItem>
            <MenuItem value="admin">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AdminPanelSettingsIcon fontSize="small" color="warning" />
                Admin
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      )
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Switch
            checked={params.value}
            onChange={() => handleStatusToggle(params.row._id, params.value)}
            color="success"
            size="small"
          />
          <Chip
            icon={params.value ? <CheckCircleIcon /> : <CancelIcon />}
            label={params.value ? 'Active' : 'Inactive'}
            size="small"
            color={params.value ? 'success' : 'default'}
            variant="outlined"
            sx={{
              minWidth: 80,
              '& .MuiChip-icon': {
                fontSize: 16
              }
            }}
          />
        </Box>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
      renderCell: (params) => (
        <Typography variant="caption" color="text.secondary">
          {params.value ? new Date(params.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : '-'}
        </Typography>
      )
    }
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage user roles and account status
          </Typography>
        </Box>
        <Chip
          label={`${total} users`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: 320 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Box sx={{ width: '100%' }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={users.map(u => ({ ...u, id: u._id }))}
              columns={columns}
              paginationMode="server"
              rowCount={total}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              autoHeight
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  py: 1.5
                },
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#212f3d' : '#f7f9fc',
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 600,
                  fontSize: '0.875rem'
                },
                '& .MuiDataGrid-row:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`
                },
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none'
                },
                '& .MuiDataGrid-columnHeader:focus': {
                  outline: 'none'
                }
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  )
}
