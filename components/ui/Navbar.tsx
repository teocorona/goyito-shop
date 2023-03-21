import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC } from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

interface Props {

}

export const Navbar: FC<Props> = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center' component='span'>
            <Typography variant='h6'>Goyito |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: {xs: 'none', md: 'flex'}}}>
          <NextLink href='/category/bites' passHref>
            <Link component='span'>
              <Button>Bites</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/pulpa' passHref>
            <Link component='span'>
              <Button>Pulpa</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/piquin' passHref>
            <Link component='span'>
              <Button>Piquín</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/deshidratados' passHref>
            <Link component='span'>
              <Button>Deshidratados</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart' passHref>
          <Link component='span'>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>Menú</Button>

      </Toolbar>
    </AppBar>
  );
};

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
