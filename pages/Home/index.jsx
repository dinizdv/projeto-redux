import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import rootReducer from '../../redux/root-reducer'
import { deleteAddress, fetchUsers, fetchUserById } from '../../redux/user/slice'

export function Home() {
  const { user, users, loading } = useSelector((rootReducer) => rootReducer.user)
  const dispatch = useDispatch()
  
  // redux
  function handleDeleteAddress(){
    alert("Endereço deletado com sucesso!")
    dispatch(deleteAddress())
  }

  function handleFetchUserById(){
    const userId = 3;
    dispatch(fetchUserById(userId))
  }

  function handleFetchUsers(){
    dispatch(fetchUsers())
  }

  return (
    <>
    <Header/>
       <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? user.name : ' Visitante'}, bem vindo!
            </h1>

            { user && (
              <span>Email: {user.email}</span>
            )}

            { user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}></div>
                <p>{user.address.location}, n {user.address.number}</p>
                <button onClick={handleDeleteAddress}>Deletar endereço</button>
              </>
            )}

            <hr/>
            <br/>
            <h2>Users list</h2>
            <button onClick={handleFetchUserById}>Search user 1</button>
            <button onClick={handleFetchUsers}>Search users</button>
            {loading && <strong>Loading...</strong>}
            <br/>
            
            {!loading && users.map((user) => (
              <div key={user.id}>
                <p>ID: {user.id} | name: {user.name} | email: {user.email}</p>
              </div>
            ))}

          </div>

        </main>
      </div>
    </>
  )
}
