interface MainFormRowData {
  id: number
  tags: Array<{ text: string }>
  accountType: 'local' | 'LDAP'
  credentials: MainFormRowDataCredentials
}

interface MainFormRowDataCredentials {
  login: string
  password: string | null
}

export type { MainFormRowData, MainFormRowDataCredentials }
