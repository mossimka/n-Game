import { useState } from 'react'
import './App.css'
import RotatingModel from './RotatingModel'

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('')

  const downloadGame = (platform: string) => {
    setSelectedPlatform(platform)
    const downloadLinks = {
      windows: '#download-windows',
      macos: '#download-macos',
      linux: '#download-linux'
    }
    console.log(`Скачивание для ${platform}:`, downloadLinks[platform as keyof typeof downloadLinks])
    alert(`Скачивание для ${platform} начнется в ближайшее время!`)
  }

  return (
    <div className="app">
      <div className="background">
        <div className="stars"></div>
        <div className="twinkling"></div>

        <header className="header">
          <div className="logo-container">
            <h1 className="title">СТАРТАП ВЫЖИВАНИЕ 2077</h1>
          </div>
          <div className="header-subtitle">
            <p>Виртуальный тир для прохождения на Демо-День</p>
          </div>
        </header>

        <img src="/logo.png" className="main-logo" alt="Your Logo" />

        <main className="main-content">
          <div className="story-section">
            <div className="neon-box">
              <h2 className="story-title">МИССИЯ: ДЕМО-ДЕНЬ</h2>
              <div className="story-text">
                <p>▶ <strong>Ты — стартапер из будущего</strong></p>
                <p>▶ После бессонных недель ты наконец-то добрался до последнего отбора перед Демо-Днём.</p>
                <p>⚠ Но система запуска глючит: менторы сошли с ума и пытаются тебя кикнуть.</p>
                <p>⯈ Чтобы пройти на Демо-День и вернуть свои <span className="money">200 000₸</span>, ты должен пройти через виртуальный тир!</p>
              </div>
            </div>
          </div>

          {/* 🎉 ВСТАВЛЯЕМ 3D МОДЕЛЬ */}
          <RotatingModel top="200" left="200" modelName="bernar"/>
          <RotatingModel top="200" left="1100" modelName="bakha"/>
          <RotatingModel top="700" left="1200" modelName="tamer"/>
          <RotatingModel top="700" left="200" modelName="shoq"/>
          {/* <RotatingModel /> --- IGNORE --- */}

          {/* СЕКЦИЯ СКАЧИВАНИЯ */}
          

          <div className="download-section">
            <div className="neon-box">
              <h2 className="download-title">СКАЧАТЬ ИГРУ</h2>
              <p className="download-subtitle">Выберите вашу платформу и начните путь к Демо-Дню!</p>

              <div className="download-buttons">
                <button
                  className={`download-btn windows ${selectedPlatform === 'windows' ? 'selected' : ''}`}
                  onClick={() => downloadGame('windows')}
                >
                  <div className="platform-icon">⊞</div>
                  <div className="platform-info">
                    <div className="platform-name">Windows</div>
                    <div className="platform-details">Windows 10/11 • x64</div>
                  </div>
                </button>

                <button
                  className={`download-btn macos ${selectedPlatform === 'macos' ? 'selected' : ''}`}
                  onClick={() => downloadGame('macos')}
                >
                  <div className="platform-icon">⌘</div>
                  <div className="platform-info">
                    <div className="platform-name">macOS</div>
                    <div className="platform-details">macOS 12+ • Intel/M1</div>
                  </div>
                </button>

                <button
                  className={`download-btn linux ${selectedPlatform === 'linux' ? 'selected' : ''}`}
                  onClick={() => downloadGame('linux')}
                >
                  <div className="platform-icon">🐧</div>
                  <div className="platform-info">
                    <div className="platform-name">Linux</div>
                    <div className="platform-details">Ubuntu 20.04+ • x64</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>© 2077 Future Startup Academy | Powered by Quantum React</p>
        </footer>
      </div>
    </div>
  )
}

export default App
