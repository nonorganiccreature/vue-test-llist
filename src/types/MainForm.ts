interface MainFormRowData {
  id: number
  tags: Array<MainFormRowDataTags>
  accountType: 'local' | 'LDAP'
  credentials: MainFormRowDataCredentials
}

interface MainFormRowDataTags {
  text: string
}

interface MainFormRowDataCredentials {
  login: string
  password: string | null
}

export type { MainFormRowData, MainFormRowDataCredentials, MainFormRowDataTags }
