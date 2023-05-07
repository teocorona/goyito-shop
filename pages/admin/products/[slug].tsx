import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { categoryType, ProductType } from '@types';
import DriveFileRenameOutline from '@mui/icons-material/DriveFileRenameOutline';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import { getProductBySlug } from '@database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { goyitoApi } from '../../../axios-api';
import { Product } from '../../../models/Product';
import { useRouter } from 'next/router';


const validCategory = ['bites', 'pulpa', 'piquin', 'deshidratados']
const validVariation = ['original', 'picosito', 'fuego', 'mango', 'piña']

interface FormData {
  _id?: string;
  category: string[];
  description: string;
  variant: string[];
  images: string[];
  inStock: number;
  netWt: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
}

interface Props {
  product: ProductType;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm({
    defaultValues: product
  })
  const router = useRouter()
  const [newTagValue, setNewTagValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug = value.title?.trim()
          .replaceAll(' ', '_')
          .replaceAll("'", '')
          .toLocaleLowerCase() || ''
        setValue('slug', newSlug)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue])


  // const onChangeCategory = (category: string) => {
  //   const currentCategory = getValues('category');
  //   if (currentCategory.includes(category)) {
  //     return setValue('category', currentCategory.filter(c => c !== category), { shouldValidate: true })
  //   }
  //   setValue('category', [...currentCategory, category], { shouldValidate: true })
  // };

  const onTagChange = (tag: string) => {
    if (tag[tag.length - 1] === ' ') {
      onNewTag(tag.trim().toLocaleLowerCase())
      setNewTagValue('')
      return
    }
    setNewTagValue(tag)
  }
  const onNewTag = (tag: string) => {
    const currentTags = getValues('tags')
    if (currentTags.includes(tag)) return
    setValue('tags', [...currentTags, tag], { shouldValidate: true })
  }
  const onDeleteTag = (tag: string) => {
    setValue('tags', getValues('tags').filter(t => t !== tag), { shouldValidate: true })
  }
  const onFilesSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return
    try {
      for (const file of event.target.files) {
        const formData = new FormData()
        formData.append('file', file);
        const { data } = await goyitoApi.post<{ message: string }>('/admin/upload', formData)
        setValue('images', [...getValues('images'), data.message], { shouldValidate: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteImage = (image: string) => {
    setValue('images', getValues('images').filter(img => img !== image), { shouldValidate: true })
  }

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return alert('Mínimo dos imagenes')
    setIsSaving(true)
    try {
      const { data } = await goyitoApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form
      }) // se puede mandar como opcion returnnew para que regrese lo actualizado
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`)
      } else {
        setIsSaving(false)
      }
    } catch (error) {
      console.log(error)
      setIsSaving(false)
    }

  };
  return (
    <AdminLayout
      title={'Producto'}
      subtitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>

            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type='number'
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo 0' }
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type='number'
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo 0' }
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Categoría</FormLabel>
              <RadioGroup
                row
                value={getValues('category')}
                onChange={(event) => setValue('category', event.target.value as any, { shouldValidate: true })}
              >
                {
                  validCategory.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color='secondary' />}
                      label={capitalize(option)}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Sabor</FormLabel>
              <RadioGroup
                row
                value={getValues('variant')}
                onChange={(event) => setValue('variant', event.target.value as any, { shouldValidate: true })}
              >
                {
                  validVariation.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color='secondary' />}
                      label={capitalize(option)}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>

            {/* <FormGroup>
              <FormLabel>Other variation</FormLabel>
              {validCategory.map(category => (
                <FormControlLabel
                  key={category}
                  control={<Checkbox checked={getValues('category').includes(category)} />}
                  label={category}
                  onChange={() => onChangeCategory(category)}
                />))}
            </FormGroup> */}

          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'Este campo es requerido',
                validate: (val) => val.trim().includes(' ') ? 'no puede tener espacios' : undefined,
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              value={newTagValue}
              onChange={(event) => onTagChange(event?.target.value)}
            // onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
            />

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
              component="ul">
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size='small'
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Cargar imagen
              </Button>
              <input
                ref={fileInputRef}
                type='file'
                multiple
                accept='image/png, image/gif, image/jpeg, image/jpg'
                style={{ display: 'none' }}
                onChange={onFilesSelected}
              />

              <Chip
                label="Es necesario al 2 imagenes"
                color='error'
                variant='outlined'
                sx={{display: getValues('images').length < 2 ? 'flex' : 'none'}}
              />

              <Grid container spacing={2}>
                {getValues('images').map(img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component='img'
                        className='fadeIn'
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color="error" onClick={() => onDeleteImage(img)}>
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
                }
              </Grid>

            </Box>

          </Grid>

        </Grid>
      </form>
    </AdminLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const { slug = '' } = query;
  let product: ProductType | null
  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()))
    delete tempProduct._id
    tempProduct.images = ['img1.jpg', 'img2,jpg']
    product = tempProduct
  } else {
    product = await getProductBySlug(slug.toString());
  }


  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      }
    }
  }


  return {
    props: {
      product
    }
  }
}


export default ProductAdminPage