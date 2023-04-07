import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined"
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings"
import CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined"
// import HorizontalRuleOutlined from "@mui/icons-material/HorizontalRuleOutlined"
import LoginOutlined from "@mui/icons-material/LoginOutlined"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined"
import { FC, useContext } from "react"
import { useRouter } from "next/router"
import { UiContext } from '@context'

interface Props {

}

export const SideMenu: FC<Props> = () => {
  const { isMenuOpen, toggleMenu } = useContext(UiContext)
  const router = useRouter()
  const navigateTo = (url: string) => {
    toggleMenu()
    router.push(url)
  }
  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mis Ordenes'} />
          </ListItem>


          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItem>

          <Divider />

          <ListItem
            button
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/bites')}
          >
            <ListItemIcon>
              {/* <HorizontalRuleOutlined /> */}
            </ListItemIcon>
            <ListItemText primary={' Bites'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/pulpa')}
          >
            <ListItemIcon>
              {/* <HorizontalRuleOutlined/> */}
            </ListItemIcon>
            <ListItemText primary={' Pulpa'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/piquin')}
          >
            <ListItemIcon>
              {/* <HorizontalRuleOutlined/> */}
            </ListItemIcon>
            <ListItemText primary={' Piquin'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', md: 'none' } }}
            onClick={() => navigateTo('/category/deshidratados')}
          >
            <ListItemIcon>
              {/* <HorizontalRuleOutlined/> */}
            </ListItemIcon>
            <ListItemText primary={' Deshidratados'} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ordenes'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}