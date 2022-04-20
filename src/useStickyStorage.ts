import React from 'react'

// based on code from Josh W Comeau ❤️: https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/#show-me-the-code
function useStickyState<T>(defaultValue: T, key: string) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key)

      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue
    })

    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
  }

  export default useStickyState