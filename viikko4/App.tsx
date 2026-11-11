
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import LoginForm from './LoginForm'
import { auth, logout } from './authService'
import './App.css'

function App() {
  const [codename, setCodename] = useState('')
  const [user, setUser] = useState<User | null>(null)

  function generateCodename() {
    const adjectives = ['salainen', 'rohkea', 'mystinen', 'nopea', 'veikeä']
    const animals = ['kettu', 'panda', 'tiikeri', 'saukko', 'karhu']

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const animal = animals[Math.floor(Math.random() * animals.length)]
    const number = Math.floor(Math.random() * 9000) + 1000

    return adjective + animal + number
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      const cachedName = localStorage.getItem(user.uid)

      if (cachedName) {
        setCodename(cachedName)
      } else {
        const newCodename = generateCodename()
        localStorage.setItem(user.uid, newCodename)
        setCodename(newCodename)
      }
    } else {
      setCodename('')
    }
  }, [user])

  function handleNewCodename() {
    if (user) {
      const newCodename = generateCodename()
      localStorage.setItem(user.uid, newCodename)
      setCodename(newCodename)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        {user ? (
          <>
            <h1>Tervetuloa, {codename}</h1>
            <p>Olet kirjautunut sisään osoitteella {user.email}</p>

            <button
              type="button"
              className="counter"
              onClick={handleNewCodename}
            >
              Luo uusi koodinimi!
            </button>

            <p>Sinun koodinimesi: {codename}</p>

            <button type="button" onClick={logout}>
              Kirjaudu ulos
            </button>
          </>
        ) : (
          <LoginForm />
        )}
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
