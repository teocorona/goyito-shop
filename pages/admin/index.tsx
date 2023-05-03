import { SummaryTile } from '@components/admin';
import { AdminLayout } from '@components/layouts';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import { Grid } from '@mui/material';
import { NextPage } from 'next';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import CancelPresentationOutlined from '@mui/icons-material/CancelPresentationOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import ProductionQuantityLimitsOutlined from '@mui/icons-material/ProductionQuantityLimitsOutlined';
// import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import useSWR from 'swr'
import { DashboardSummaryType } from '../../types/dashboard';
import { useEffect, useState } from 'react';

interface Props {

}

const DashboardPage: NextPage<Props> = () => {
  const {data, error} = useSWR<DashboardSummaryType>('/api/admin/dashboard',{
    refreshInterval: 30000
  })
  const [refreshIn, setRefreshIn] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn -1 : 30)
    }, 1000);
  
    return () => {
      clearInterval(interval)
    }
  }, [])
  

  if(!error && !data) return <></>
  if(error) {
    console.log(error)
  }
  return (
    <AdminLayout
      title='Dashboard'
      subtitle='Estadisticas'
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={data?.numberOfOrders || 'Error'}
          subtitle='Ordenes totales'
          icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={data?.paidOrders || 'Error'}
          subtitle='Ordenes pagadas'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={data?.notPaidOrders || 'Error'}
          subtitle='Ordenes pendientes'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={data?.numberOfClients || 'Error'}
          subtitle='Clientes'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={data?.numberOfProducts || 'Error'}
          subtitle='Productos'
          icon={<CategoryOutlined color='primary' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={data?.productsWithNoInventory || 'Error'}
          subtitle='Sin Stock'
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={data?.productsWithLowInventory || 'Error'}
          subtitle='Bajo inventario'
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 64 }} />}
        />

        <SummaryTile
          title={refreshIn}
          subtitle='Actualizacion en'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 64 }} />}
        />

      </Grid>
    </AdminLayout>
  );
};


// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session: any = await getServerSession(req, res, authOptions)
//   console.log(session.user.role)
//   if (session.user.role !== 'admin') {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }


export default DashboardPage