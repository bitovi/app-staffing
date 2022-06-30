const ErrorBoundaryContext = React.createContext(() => {});

const useErrorHandling = () => {
  return React.useContext(ErrorBoundaryContext)
}

