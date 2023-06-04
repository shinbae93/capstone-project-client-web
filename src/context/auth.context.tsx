import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import { User } from '../graphql/generated/graphql'

interface IAuthContext {
  currentUser: User
  setCurrentUser: Dispatch<SetStateAction<User>>
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: {} as User,
  setCurrentUser: () => {},
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User)

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>
  )
}
