import React, { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleLogin = () => {
    if (email === 'hlypow99@hotmail.com') {
      setIsLogged(true);
    } else {
      alert('E-posta tanınmadı.');
    }
  };

  const addBalance = () => {
    const amount = prompt('Kaç TL eklemek istiyorsun?');
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      setBalance(balance + value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
      {!isLogged ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Bakiye Paneli</h1>
          <input
            className="border p-2 rounded"
            placeholder="E-posta girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
            Giriş Yap
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Merhaba, {email}</h1>
          <p className="text-lg">Bakiyen: <strong>{balance.toFixed(2)} ₺</strong></p>
          <button onClick={addBalance} className="bg-green-500 text-white px-4 py-2 rounded">
            Bakiye Ekle
          </button>
        </div>
      )}
    </div>
  );
}
