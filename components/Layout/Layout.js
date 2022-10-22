import styles from '../../styles/Layout/Layout.module.css'
import Nav from './Nav'
import Header from './Header'

const Layout = ({children}) => {
    return (
        <>
        <Nav />
            <div className = {styles.container}>
                <Header />
                <main className = {styles.main}>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout
