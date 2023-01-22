import {
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material"
import { toast, ToastContainer } from "react-toastify"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "../styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  // Redirects from login to home page if the user has an auth token in session storage
  useEffect(() => {
    const token = sessionStorage.getItem("AuthToken")
    const id = sessionStorage.getItem("LocalID")
    if (token != null && id != null) {
      navigate("/home")
    }
  }, [])

  // Will attempt to login with provided credentials
  const handleAuth = (url) => {
    console.log(`login with: ${username} : ${password}`)
    const options = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
    fetch(url, options)
      .then(async (res) => {
        const data = await res.json()
        return { ...data, ok: res.ok }
      })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          toast.success("Login successful", toastOptions)
          sessionStorage.setItem("AuthToken", res.token)
          sessionStorage.setItem("LocalID", res.id)
          navigate("/home")
        } else {
          // Convert this to toast
          toast.error(res.ErrorMessage, toastOptions)
          console.log(res.ErrorMessage)
        }
      })
  }

  return (
    <div className="background centered">
      <ToastContainer style={{ width: "500px", textAlign: "center" }} />
      <Container
        sx={{
          width: "25%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper elevation={10} sx={{ minHeight: "50vh" }}>
          <Container sx={{ pt: "20px", pb: 0, textAlign: "center" }}>
            <Typography variant="h3">Seafarers</Typography>
          </Container>
          <Container
            sx={{ display: "flex", flexDirection: "column", mt: "25px" }}
          >
            <TextField
              label="Username"
              variant="outlined"
              sx={{
                my: 2,
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              sx={{
                my: 2,
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              my: 3,
            }}
          >
            <Button
              className="submit"
              variant="contained"
              size="large"
              onClick={() => handleAuth("/api/register")}
              sx={{
                width: "45%",
                py: 2,
              }}
            >
              Register
            </Button>

            <Button
              className="submit"
              variant="contained"
              size="large"
              onClick={() => handleAuth("/api/login")}
              sx={{
                width: "45%",
                backgroundColor: "green",
                ":hover": { backgroundColor: "darkGreen" },
              }}
            >
              Login
            </Button>
          </Container>
        </Paper>
      </Container>
    </div>
  )
}

export default Login
