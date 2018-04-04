let backendHost

const hostname = window && window.location && window.location.hostname

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080'
} else if (hostname === 'radiant-shelf-54291.herokuapp.com') {
  backendHost = 'https://secure-lake-82403.herokuapp.com'
}

export const API_ROOT = backendHost
