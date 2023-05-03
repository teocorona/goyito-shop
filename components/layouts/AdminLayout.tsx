import { FC, useContext } from "react";
import Head from "next/head"
import { SideMenu } from "@components/ui";
import { UiContext } from "@context";
import { AdminNavbar } from "@components/admin";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
  icon: JSX.Element,
  children: JSX.Element
}

export const AdminLayout: FC<Props> = ({ children, title, subtitle, icon }) => {
  const { isMenuOpen, toggleMenu } = useContext(UiContext)
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h1' component='h1'>
            {icon}
            {title}
          </Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box className='fadeIn'>
          {children}
        </Box>
      </main>
    </>
  )
}
