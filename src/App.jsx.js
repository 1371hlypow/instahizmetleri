
import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "./components/ui/select";

const services = {
  instagram_followers: {
    name: "Instagram 20 Takipçi",
    price: 7
  },
  instagram_likes: {
    name: "Instagram 20 Like",
    price: 7
  }
};

export default function SmmPanel() {
  const [selectedService, setSelectedService] = useState("instagram_followers");
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedBalance = localStorage.getItem("userBalance");
    if (storedUser) {
      setIsLoggedIn(true);
      setBalance(parseFloat(storedBalance || "0"));
    }
  }, []);

  const handleLogin = () => {
    const userData = localStorage.getItem(`user-${loginForm.username}`);
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.password === loginForm.password) {
        localStorage.setItem("loggedInUser", loginForm.username);
        localStorage.setItem("userBalance", parsed.balance.toString());
        setBalance(parsed.balance);
        setIsLoggedIn(true);
      } else {
        alert("Şifre yanlış!");
      }
    } else {
      alert("Kullanıcı bulunamadı!");
    }
  };

  const handleRegister = () => {
    const userExists = localStorage.getItem(`user-${registerForm.username}`);
    if (userExists) {
      alert("Bu kullanıcı zaten var!");
      return;
    }
    const newUser = {
      password: registerForm.password,
      balance: 0
    };
    localStorage.setItem(`user-${registerForm.username}`, JSON.stringify(newUser));
    alert("Kayıt başarılı, şimdi giriş yapın.");
    setIsRegister(false);
  };

  const handleComplete = () => {
    const price = services[selectedService].price;
    if (balance >= price) {
      const newBalance = balance - price;
      setBalance(newBalance);
      localStorage.setItem("userBalance", newBalance.toString());
      const currentUser = localStorage.getItem("loggedInUser") || "";
      const userData = localStorage.getItem(`user-${currentUser}`);
      if (userData) {
        const parsed = JSON.parse(userData);
        parsed.balance = newBalance;
        localStorage.setItem(`user-${currentUser}`, JSON.stringify(parsed));
      }
      setMessage("Başarılı! Discord: hlypowx ulaşın.");
    } else {
      setMessage("Bakiye yetersiz!");
    }
  };

  const addBalance = () => {
    const currentUser = localStorage.getItem("loggedInUser") || "";
    const userData = localStorage.getItem(`user-${currentUser}`);
    if (userData) {
      const parsed = JSON.parse(userData);
      const newBalance = parsed.balance + 50;
      parsed.balance = newBalance;
      localStorage.setItem(`user-${currentUser}`, JSON.stringify(parsed));
      localStorage.setItem("userBalance", newBalance.toString());
      setBalance(newBalance);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <Card>
          <CardContent className="space-y-4">
            <h1 className="text-xl font-bold">{isRegister ? "Kayıt Ol" : "Giriş Yap"}</h1>
            <Input
              placeholder="Kullanıcı Adı"
              value={isRegister ? registerForm.username : loginForm.username}
              onChange={(e) =>
                isRegister
                  ? setRegisterForm({ ...registerForm, username: e.target.value })
                  : setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Şifre"
              value={isRegister ? registerForm.password : loginForm.password}
              onChange={(e) =>
                isRegister
                  ? setRegisterForm({ ...registerForm, password: e.target.value })
                  : setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            {isRegister ? (
              <Button onClick={handleRegister}>Kayıt Ol</Button>
            ) : (
              <Button onClick={handleLogin}>Giriş Yap</Button>
            )}
            <p
              className="text-sm text-blue-600 cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Giriş Yap" : "Hesabın yok mu? Kayıt ol"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="mb-4">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-bold">SMM Panel</h1>

          <Select onValueChange={setSelectedService} defaultValue={selectedService}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(services).map(([key, service]) => (
                <SelectItem key={key} value={key}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p>Fiyat: {services[selectedService].price} TL</p>

          <Input
            placeholder="Instagram kullanıcı adınız"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button onClick={handleComplete}>Tamamla</Button>

          <p className="text-sm text-gray-500">{message}</p>
        </CardContent>
      </Card>

      <div className="text-center text-sm">Bakiye: {balance} TL</div>
      <Button variant="outline" className="mt-2 w-full" onClick={addBalance}>Kurucu: Bakiye Yükle</Button>
    </div>
  );
}
