import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const FormLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === "" || user.password === "") {
      toast.error("Username dan Password Tidak Boleh Kosong!");
      return;
    } else if (user.password.length !== 5 || user.username !== "Kevin" || user.password !== "11655") {
      toast.error("Username dan Password harus 5 digit dan sama dengan 11231!");
      return;
    } else {
      const newUser = {
        ...user,
        loginAt: new Date(),
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Login berhasil!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
      <Alert variant="info">
        <strong>Info</strong> Username harus dengan nama depan dan password harus 5 digit NPM
      </Alert>
      <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
        <Form.Control type="text" placeholder="name@example.com" name="username" onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="position-relative">
        <Form.Control 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          name="password" 
          onChange={handleChange} 
          autoComplete="off" 
        />
        <div 
          onClick={togglePassword}
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 2
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </FloatingLabel>
      <Button variant="primary" type="submit" className="mt-3 w-100">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
