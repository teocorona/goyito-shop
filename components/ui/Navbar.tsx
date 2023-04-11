import { AppBar, Badge, Box, Button, IconButton, Input, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC, useContext, useState } from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { CartContext, UiContext } from '@context';
import InputAdornment from '@mui/material/InputAdornment';
import ClearOutlined from '@mui/icons-material/ClearOutlined';

interface Props {

}

export const Navbar: FC<Props> = () => {
  const { asPath, push } = useRouter()
  const { isMenuOpen, toggleMenu } = useContext(UiContext)
  const { cart } = useContext(CartContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`)
  }
  let totalProducts = 0
  cart.map(item => {
    totalProducts += item.quantity
  })

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

        <Box
          sx={{ display: isSearchVisible ? 'none' : { xs: 'none', md: 'flex' } }}
          className='fadeIn'
        >
          <NextLink href='/category/bites' passHref>
            <Link component='span'>
              <Button
                color={asPath === '/category/bites' ? 'primary' : 'info'}
              >
                Bites</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/pulpa' passHref>
            <Link component='span'>
              <Button
                color={asPath === '/category/pulpa' ? 'primary' : 'info'}
              >
                Pulpa</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/piquin' passHref>
            <Link component='span'>
              <Button
                color={asPath === '/category/piquin' ? 'primary' : 'info'}
              >
                Piquin</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/deshidratados' passHref>
            <Link component='span'>
              <Button
                color={asPath === '/category/deshidratados' ? 'primary' : 'info'}
              >
                Deshidratados</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />


        {isSearchVisible ? (
          <Input
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' ? onSearchTerm() : null}
            type='text'
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsSearchVisible(false)}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>)
        }

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleMenu}
          className='fadeIn'
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' passHref>
          <Link component='span'>
            <IconButton>
              {cart.length > 0 ? (
                <Badge badgeContent={totalProducts} color='secondary'>
                  <ShoppingCartOutlined />
                </Badge>
              ) : <ShoppingCartOutlined />}
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleMenu}>Menú</Button>

      </Toolbar>
    </AppBar>
  );
};

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
