interface MainFormRowData {
  id: number
  tags: Array<string>
  accountType: 'local' | 'LDAP'
  data: MainFormRowDataLocal | MainFormRowDataLDAP
}

interface MainFormRowDataLocal {
  login: string
  password: string
}

interface MainFormRowDataLDAP {
  login: string
}

export type { MainFormRowData, MainFormRowDataLocal, MainFormRowDataLDAP }
