let backendHost

const hostname = window && window.location && window.location.hostname

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080'
} else if (hostname === 'sisteminha.herokuapp.com') {
  backendHost = 'https://sisteminha-backend.herokuapp.com'
}

export const API_ROOT = backendHost
