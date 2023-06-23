import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import { User } from '../graphql/generated/graphql'

interface IAuthContext {
  currentUser: User | null
  setCurrentUser: Dispatch<SetStateAction<User | null>>
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  setCurrentUser: () => {},
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>
  )
}
