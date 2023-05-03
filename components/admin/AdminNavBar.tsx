import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC, useContext } from 'react';
import { UiContext } from '@context';
import Image from 'next/image';
import goyitoLogo from '../../public/goyitoLogo.png'

interface Props {

}

export const AdminNavbar: FC<Props> = () => {
  const { isMenuOpen, toggleMenu } = useContext(UiContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center' component='span'>
            {/* <Image src={goyitoLogo} alt='goyito logo' height={40}/> */}
            <Typography variant='h6'>Goyito |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toggleMenu}>Menú</Button>

      </Toolbar>
    </AppBar>
  );
};
