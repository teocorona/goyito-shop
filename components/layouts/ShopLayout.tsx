import { FC, ReactNode, useContext } from "react";
import Head from "next/head"
import { Navbar, SideMenu } from "@components/ui";
import { UiContext } from "@context";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  const { isMenuOpen, toggleMenu } = useContext(UiContext)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl ? (
          <meta name="og:image" content={imageFullUrl} />
        ) : null}
        {/* TODO: defaultimage  */}
      </Head>

      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>

      <footer>
        {/* TODO: footer */}
      </footer>
    </>
  )
}
